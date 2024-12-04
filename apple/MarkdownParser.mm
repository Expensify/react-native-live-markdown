#import "MarkdownParser.h"
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import <React/RCTLog.h>
#import <mutex>

@implementation MarkdownParser {
  NSString *_prevText;
  NSNumber *_prevParserId;
  NSArray<MarkdownRange *> *_prevMarkdownRanges;
}

- (NSArray<MarkdownRange *> *)parse:(NSString *)text withParserId:(nonnull NSNumber *)parserId {
  @synchronized (self) {
    if ([text isEqualToString:_prevText] && [parserId isEqualToNumber:_prevParserId]) {
      return _prevMarkdownRanges;
    }

    static std::mutex workletRuntimeMutex; // this needs to be global since the worklet runtime is also global
    const auto lock = std::lock_guard<std::mutex>(workletRuntimeMutex);

    const auto &markdownRuntime = expensify::livemarkdown::getMarkdownRuntime();
    jsi::Runtime &rt = markdownRuntime->getJSIRuntime();

    const auto &markdownWorklet = expensify::livemarkdown::getMarkdownWorklet([parserId intValue]);

    const auto &input = jsi::String::createFromUtf8(rt, [text UTF8String]);

    jsi::Value output;
    try {
      output = markdownRuntime->runGuarded(markdownWorklet, input);
    } catch (const jsi::JSError &error) {
      // Skip formatting, runGuarded will show the error in LogBox
      _prevText = text;
      _prevParserId = parserId;
      _prevMarkdownRanges = @[];
      return _prevMarkdownRanges;
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

        NSRange range = NSMakeRange(start, length);
        MarkdownRange *markdownRange = [[MarkdownRange alloc] initWithType:@(type.c_str()) range:range depth:depth];
        [markdownRanges addObject:markdownRange];
      }
    } catch (const jsi::JSError &error) {
      RCTLogWarn(@"[react-native-live-markdown] Incorrect schema of worklet parser output: %s", error.getMessage().c_str());
      _prevText = text;
      _prevParserId = parserId;
      _prevMarkdownRanges = @[];
      return _prevMarkdownRanges;
    }

    _prevText = text;
    _prevParserId = parserId;
    _prevMarkdownRanges = markdownRanges;
    return _prevMarkdownRanges;
  }
}

@end
