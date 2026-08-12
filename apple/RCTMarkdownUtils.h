#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSNumber *parserId;

// Invoked from a background queue after an async parse scheduled by a
// main-thread measure pass has landed in the parser cache. The owner is expected
// to invalidate layout for the affected node so the text gets measured again,
// this time with markdown applied. Without it, the unformatted measurement taken
// during the cache miss could stick until something else dirtied layout.
// Thread-safe to set and read (atomic).
@property (atomic, copy, nullable) void (^onAsyncFormattingReady)(void);

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes;

// Sets the style/parser and applies formatting using the given values.
// Use this from the shadow node measure path, where one RCTMarkdownUtils
// instance is shared across shadow node clones and may be accessed from
// concurrent Fabric commits/layout passes.
// NOTE: on the main thread this formats only from the parser's cache and never
// enters the worklet runtime; on a cache miss it schedules an async parse and
// leaves the string unformatted for that measure pass, then calls
// `onAsyncFormattingReady` once the ranges are available so the node can be
// measured again. This keeps the main thread from blocking on runtime-bound
// locks during Yoga measure (Sentry APP-EF1 watchdog kills).
- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                  markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
                       parserId:(nonnull NSNumber *)parserId;

@end

NS_ASSUME_NONNULL_END
