#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownParser.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

@implementation RCTMarkdownUtils {
  MarkdownParser *_markdownParser;
  MarkdownFormatter *_markdownFormatter;
}

- (instancetype)init
{
  if (self = [super init]) {
    _markdownParser = [MarkdownParser new];
    _markdownFormatter = [MarkdownFormatter new];
  }

  return self;
}

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
{
  // `_markdownStyle` and `_parserId` may not be initialized immediately due to the order of mount instructions
  // props update will be executed after the view hierarchy is initialized.
  if (_markdownStyle == nil || _parserId == nil) {
    return;
  }

  NSArray<MarkdownRange *> *markdownRanges = [_markdownParser parse:attributedString.string withParserId:_parserId];

  [_markdownFormatter formatAttributedString:attributedString
                   withDefaultTextAttributes:defaultTextAttributes
                          withMarkdownRanges:markdownRanges
                           withMarkdownStyle:_markdownStyle];
}

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                  markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
                       parserId:(nonnull NSNumber *)parserId
{
  // The lock only covers the two shared fields. Holding it while parsing and
  // formatting froze the app (Sentry APP-EF1): parsing waits for the worklet
  // runtime, so a background thread could hold this lock while waiting, leaving
  // the main thread stuck on the lock while measuring. The formatting below
  // uses the arguments instead of the fields, so every call still gets a
  // matching style and parserId.
  @synchronized (self) {
    _markdownStyle = markdownStyle;
    _parserId = parserId;
  }

  NSString *text = attributedString.string;
  NSArray<MarkdownRange *> *markdownRanges = [_markdownParser cachedRangesForText:text withParserId:parserId];

  if (markdownRanges == nil) {
    if ([NSThread isMainThread]) {
      // Never run the parser from the main thread while measuring. If the
      // worklet runtime is busy, the wait can pass the ~2s limit and iOS kills
      // the app (Sentry APP-EF1). Parse in the background instead and measure
      // plain text for now; `onAsyncFormattingReady` asks for a new measure
      // once the ranges are ready, so the wrong sizes (h1 font, code font,
      // blockquote indent, emoji) do not stay. This rarely happens - text
      // changes are usually parsed on a background thread first, so the main
      // thread finds the ranges in the cache.
      __weak RCTMarkdownUtils *weakSelf = self;
      [_markdownParser warmCacheAsyncForText:text
                                withParserId:parserId
                                  completion:^{
        // This only runs for the newest text, so it can't loop forever: the new
        // measure finds the ranges in the cache (or the text changed again, and
        // then a new measure was needed anyway).
        void (^handler)(void) = weakSelf.onAsyncFormattingReady;
        if (handler != nil) {
          handler();
        }
      }];
      return;
    }
    // Background threads can parse right here: the ~2s limit only applies to
    // the main thread, and parsing no longer holds a lock the main thread
    // waits on.
    markdownRanges = [_markdownParser parse:text withParserId:parserId];
  }

  [_markdownFormatter formatAttributedString:attributedString
                   withDefaultTextAttributes:defaultTextAttributes
                          withMarkdownRanges:markdownRanges
                           withMarkdownStyle:markdownStyle];
}

@end
