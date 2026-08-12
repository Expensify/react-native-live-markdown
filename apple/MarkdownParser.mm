#import "MarkdownParser.h"
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import <React/RCTLog.h>

// Number of (text, parserId) results kept in the cache.
//
// The main-thread measure path can only format from this cache, because it must
// never enter the worklet runtime (see RCTMarkdownUtils). With a single entry
// that fast path was unreliable: two alternating text values thrashed the entry
// and every main-thread measure missed, falling back to measuring unformatted
// text. A handful of entries absorbs alternating values (e.g. typing then
// undoing, or a controlled input echoing back an older value) and is still
// cheap to scan linearly.
static const NSUInteger kMarkdownParserCacheCapacity = 4;

@interface MarkdownParserCacheEntry : NSObject

@property (nonatomic, readonly, nonnull) NSString *text;
@property (nonatomic, readonly, nonnull) NSNumber *parserId;
@property (nonatomic, readonly, nonnull) NSArray<MarkdownRange *> *markdownRanges;

- (instancetype)initWithText:(nonnull NSString *)text
                    parserId:(nonnull NSNumber *)parserId
              markdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges;

- (BOOL)matchesText:(nonnull NSString *)text parserId:(nonnull NSNumber *)parserId;

@end

@implementation MarkdownParserCacheEntry

- (instancetype)initWithText:(nonnull NSString *)text
                    parserId:(nonnull NSNumber *)parserId
              markdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
{
  if (self = [super init]) {
    _text = [text copy];
    _parserId = parserId;
    _markdownRanges = markdownRanges;
  }

  return self;
}

- (BOOL)matchesText:(nonnull NSString *)text parserId:(nonnull NSNumber *)parserId
{
  // Compare the parser id first, it is much cheaper than a string comparison.
  return [_parserId isEqualToNumber:parserId] && [_text isEqualToString:text];
}

@end

@implementation MarkdownParser {
  // Most-recently-used first; index 0 is the newest entry. Guarded by
  // `@synchronized (self)`.
  NSMutableArray<MarkdownParserCacheEntry *> *_cache;

  // Latest-wins coalescing state for background warm-ups. Guarded by
  // `@synchronized (self)`.
  NSString *_pendingText;
  NSNumber *_pendingParserId;
  void (^_pendingCompletion)(void);
  BOOL _warmupScheduled;
}

- (instancetype)init
{
  if (self = [super init]) {
    _cache = [[NSMutableArray alloc] initWithCapacity:kMarkdownParserCacheCapacity];
  }

  return self;
}

// Shared serial queue used to warm the cache off the main thread. A single queue
// is enough: parses are serialized by the markdown worklet runtime's own mutex
// anyway, and keeping it serial bounds duplicate work.
+ (dispatch_queue_t)cacheWarmupQueue
{
  static dispatch_queue_t queue;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    dispatch_queue_attr_t attr = dispatch_queue_attr_make_with_qos_class(
        DISPATCH_QUEUE_SERIAL, QOS_CLASS_USER_INITIATED, 0);
    queue = dispatch_queue_create("com.expensify.livemarkdown.parser-cache-warmup", attr);
  });
  return queue;
}

- (nullable NSArray<MarkdownRange *> *)cachedRangesForText:(nonnull NSString *)text
                                              withParserId:(nonnull NSNumber *)parserId
{
  @synchronized (self) {
    for (NSUInteger i = 0, n = _cache.count; i < n; i++) {
      MarkdownParserCacheEntry *entry = _cache[i];
      if (![entry matchesText:text parserId:parserId]) {
        continue;
      }
      if (i != 0) {
        // Refresh recency so the entry the measure path keeps asking for is not
        // the one that gets evicted.
        [_cache removeObjectAtIndex:i];
        [_cache insertObject:entry atIndex:0];
      }
      return entry.markdownRanges;
    }
  }

  return nil;
}

- (void)cacheMarkdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
                    forText:(nonnull NSString *)text
               withParserId:(nonnull NSNumber *)parserId
{
  MarkdownParserCacheEntry *entry = [[MarkdownParserCacheEntry alloc] initWithText:text
                                                                         parserId:parserId
                                                                   markdownRanges:markdownRanges];

  @synchronized (self) {
    for (NSUInteger i = 0, n = _cache.count; i < n; i++) {
      if ([_cache[i] matchesText:text parserId:parserId]) {
        [_cache removeObjectAtIndex:i];
        break;
      }
    }
    [_cache insertObject:entry atIndex:0];
    while (_cache.count > kMarkdownParserCacheCapacity) {
      [_cache removeLastObject];
    }
  }
}

- (void)warmCacheAsyncForText:(nonnull NSString *)text
                 withParserId:(nonnull NSNumber *)parserId
                   completion:(nullable void (^)(void))completion
{
  @synchronized (self) {
    // Latest-wins: overwrite whatever was queued but has not started yet, so a
    // stale request can never win over newer text. The completion of the
    // superseded request is dropped together with it; its result would be stale
    // and the newer request reports for itself.
    _pendingText = [text copy];
    _pendingParserId = parserId;
    _pendingCompletion = completion;

    if (_warmupScheduled) {
      // A drain loop is already running (or queued) and will pick this up.
      return;
    }
    _warmupScheduled = YES;
  }

  __weak MarkdownParser *weakSelf = self;
  dispatch_async([MarkdownParser cacheWarmupQueue], ^{
    [weakSelf drainPendingWarmups];
  });
}

- (void)drainPendingWarmups
{
  while (true) {
    NSString *text;
    NSNumber *parserId;
    void (^completion)(void);

    @synchronized (self) {
      if (_pendingText == nil) {
        _warmupScheduled = NO;
        return;
      }
      text = _pendingText;
      parserId = _pendingParserId;
      completion = _pendingCompletion;
      _pendingText = nil;
      _pendingParserId = nil;
      _pendingCompletion = nil;
    }

    [self parse:text withParserId:parserId];

    BOOL superseded;
    @synchronized (self) {
      superseded = _pendingText != nil;
    }
    if (completion != nil && !superseded) {
      completion();
    }
  }
}

- (NSArray<MarkdownRange *> *)parse:(nonnull NSString *)text
                       withParserId:(nonnull NSNumber *)parserId
{
  NSArray<MarkdownRange *> *cached = [self cachedRangesForText:text withParserId:parserId];
  if (cached != nil) {
    return cached;
  }

  // Run the worklet parse WITHOUT holding any Objective-C lock. Entering the
  // shared worklet runtime acquires its recursive_mutex, and holding an ObjC
  // lock across that boundary is what created the APP-EF1 lock-order
  // inversion: the main thread got stuck in objc_sync_enter during Yoga
  // measure while a background Fabric layout thread held the lock and waited
  // on the runtime mutex, until the iOS watchdog killed the app. Concurrent
  // cache misses may parse the same text twice; the runtime serializes them,
  // the results are identical, and last-writer-wins on the cache is safe.
  NSArray<MarkdownRange *> *markdownRanges = [self parseUncached:text withParserId:parserId];

  [self cacheMarkdownRanges:markdownRanges forText:text withParserId:parserId];

  return markdownRanges;
}

- (NSArray<MarkdownRange *> *)parseUncached:(nonnull NSString *)text
                               withParserId:(nonnull NSNumber *)parserId
{
  const auto &markdownRuntime = expensify::livemarkdown::getMarkdownRuntime();
  jsi::Runtime &rt = markdownRuntime->getJSIRuntime();

  std::shared_ptr<SerializableWorklet> markdownWorklet;
  try {
    markdownWorklet = expensify::livemarkdown::getMarkdownWorklet([parserId intValue]);
  } catch (const std::out_of_range &error) {
    return @[];
  }

  const auto &input = jsi::String::createFromUtf8(rt, [text UTF8String]);

  jsi::Value output;
  try {
    output = markdownRuntime->runGuarded(markdownWorklet, input);
  } catch (const jsi::JSError &error) {
    // Skip formatting, runGuarded will show the error in LogBox
    return @[];
  }

  NSMutableArray<MarkdownRange *> *markdownRanges = [[NSMutableArray alloc] init];
  try {
    const auto &ranges = output.asObject(rt).asArray(rt);
    for (size_t i = 0, n = ranges.size(rt); i < n; ++i) {
      const auto &item = ranges.getValueAtIndex(rt, i).asObject(rt);
      const auto &type = item.getProperty(rt, "type").asString(rt).utf8(rt);
      const auto &start = static_cast<int>(item.getProperty(rt, "start").asNumber());
      const auto &length = static_cast<int>(item.getProperty(rt, "length").asNumber());
      const auto &depth = item.hasProperty(rt, "depth") ? static_cast<int>(item.getProperty(rt, "depth").asNumber()) : 1;

      if (length == 0 || start + length > text.length) {
        continue;
      }

      NSRange range = NSMakeRange(start, length);
      MarkdownRange *markdownRange = [[MarkdownRange alloc] initWithType:@(type.c_str()) range:range depth:depth];
      [markdownRanges addObject:markdownRange];
    }
  } catch (const jsi::JSError &error) {
    RCTLogWarn(@"[react-native-live-markdown] Incorrect schema of worklet parser output: %s", error.getMessage().c_str());
    return @[];
  }

  return markdownRanges;
}

@end
