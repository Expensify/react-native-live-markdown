#import "MarkdownParser.h"
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import <React/RCTLog.h>

// The main thread can only use ranges that are already cached (see
// RCTMarkdownUtils), and one entry was not enough: two texts taking turns kept
// overwriting each other, so the main thread never found what it needed. A few
// entries cover that case (typing then undoing, or an input echoing back older
// text), and the list is still small enough to scan one by one.
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
  // Check the parser id first - comparing numbers is cheaper than strings.
  return [_parserId isEqualToNumber:parserId] && [_text isEqualToString:text];
}

@end

// Everything below is only read and written inside `@synchronized (self)`.
@implementation MarkdownParser {
  // Newest entry first, at index 0.
  NSMutableArray<MarkdownParserCacheEntry *> *_cache;

  // The next text to parse in the background, if there is one.
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

// One background queue for parsing off the main thread. A serial queue is
// enough: the worklet runtime only runs one parse at a time anyway, and this
// keeps us from doing the same work twice.
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
        // Move it to the front, so the text we keep asking for is not the one
        // we throw away next.
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
    // Keep only the newest request: replace anything that is waiting but
    // hasn't started, so old text can never win over newer text. The replaced
    // completion goes with it, since the new request will report instead.
    _pendingText = [text copy];
    _pendingParserId = parserId;
    _pendingCompletion = completion;

    if (_warmupScheduled) {
      // A background loop is already running and will pick this up.
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

  // Parse WITHOUT holding an Objective-C lock. Running the parser waits for the
  // worklet runtime, and holding a lock while waiting is what froze the app
  // (Sentry APP-EF1): a background thread held this lock and waited on the
  // runtime, so the main thread was stuck waiting for the lock while measuring,
  // until iOS killed the app.
  //
  // Two threads may end up parsing the same text at the same time. That is
  // fine: they run one after the other and produce the same result.
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
