#import "MarkdownParser.h"
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import <React/RCTLog.h>

@implementation MarkdownParser {
  NSString *_prevText;
  NSNumber *_prevParserId;
  NSArray<MarkdownRange *> *_prevMarkdownRanges;
  BOOL _asyncParseInFlight;
}

// Shared serial queue used to warm the memo cache off the main thread. A
// single queue is enough: parses are serialized by the markdown worklet
// runtime's own mutex anyway, and keeping it serial bounds duplicate work.
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
    if (_prevText != nil && _prevParserId != nil && [text isEqualToString:_prevText] &&
        [parserId isEqualToNumber:_prevParserId]) {
      return _prevMarkdownRanges;
    }
  }
  return nil;
}

- (void)warmCacheAsyncForText:(nonnull NSString *)text withParserId:(nonnull NSNumber *)parserId
{
  @synchronized (self) {
    if (_asyncParseInFlight) {
      // A warm-up is already queued. If it races with newer text, a later
      // measure pass will observe the miss and schedule again.
      return;
    }
    _asyncParseInFlight = YES;
  }

  NSString *textCopy = [text copy];
  __weak MarkdownParser *weakSelf = self;
  dispatch_async([MarkdownParser cacheWarmupQueue], ^{
    MarkdownParser *strongSelf = weakSelf;
    if (strongSelf == nil) {
      return;
    }
    [strongSelf parse:textCopy withParserId:parserId];
    @synchronized (strongSelf) {
      strongSelf->_asyncParseInFlight = NO;
    }
  });
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

  @synchronized (self) {
    _prevText = [text copy];
    _prevParserId = parserId;
    _prevMarkdownRanges = markdownRanges;
  }

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
