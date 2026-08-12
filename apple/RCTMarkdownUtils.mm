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
  // Only protect the shared ivar updates with the lock. Holding
  // `@synchronized(self)` across parse+format caused a lock-order inversion:
  // `MarkdownParser parse:` synchronously enters the shared worklet runtime
  // (recursive_mutex), so a background Fabric layout thread could hold this
  // lock while blocked on the runtime mutex, leaving the main thread stuck in
  // objc_sync_enter during Yoga measure until the watchdog killed the app
  // (Sentry APP-EF1). Per-call consistency of style/parserId is preserved by
  // formatting with the local parameters instead of re-reading the ivars.
  @synchronized (self) {
    _markdownStyle = markdownStyle;
    _parserId = parserId;
  }

  NSString *text = attributedString.string;
  NSArray<MarkdownRange *> *markdownRanges = [_markdownParser cachedRangesForText:text withParserId:parserId];

  if (markdownRanges == nil) {
    if ([NSThread isMainThread]) {
      // Never enter the worklet runtime from the main thread during Yoga
      // measure. If the runtime is busy (e.g. a background Fabric layout is
      // parsing, or a worklet is blocked on another runtime), the wait can
      // exceed the ~2s watchdog limit and iOS kills the app (Sentry APP-EF1).
      // Parse asynchronously and measure with unformatted text for this pass;
      // `onAsyncFormattingReady` then triggers a re-measure once the ranges are
      // cached, so the temporarily wrong metrics (h1 font size, code/pre font,
      // blockquote indent, emoji size) cannot persist.
      // In practice the main thread usually hits the cache here: text changes
      // are committed (and parsed) on background threads first.
      __weak RCTMarkdownUtils *weakSelf = self;
      [_markdownParser warmCacheAsyncForText:text
                                withParserId:parserId
                                  completion:^{
        // Runs on the parser's warm-up queue, only for the newest requested
        // text. Cannot spin: the re-measure it asks for hits the cache and stops
        // scheduling warm-ups (or the text changed again, in which case the new
        // text needs a re-measure anyway).
        void (^handler)(void) = weakSelf.onAsyncFormattingReady;
        if (handler != nil) {
          handler();
        }
      }];
      return;
    }
    // Background Fabric layout threads may parse synchronously: the watchdog
    // only monitors the main thread, and parse no longer holds any lock the
    // main-thread measure path can block on.
    markdownRanges = [_markdownParser parse:text withParserId:parserId];
  }

  [_markdownFormatter formatAttributedString:attributedString
                   withDefaultTextAttributes:defaultTextAttributes
                          withMarkdownRanges:markdownRanges
                           withMarkdownStyle:markdownStyle];
}

@end
