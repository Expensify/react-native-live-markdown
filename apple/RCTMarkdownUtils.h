#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSNumber *parserId;

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes;

// Sets the style/parser and applies formatting using the given values.
// Use this from the shadow node measure path, where one RCTMarkdownUtils
// instance is shared across shadow node clones and may be accessed from
// concurrent Fabric commits/layout passes.
// NOTE: on the main thread this formats only from the parser's memo cache and
// never enters the worklet runtime; on a cache miss it schedules an async
// warm-up and leaves the string unformatted for that measure pass. This keeps
// the main thread from blocking on runtime-bound locks during Yoga measure
// (Sentry APP-EF1 watchdog kills).
- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                  markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
                       parserId:(nonnull NSNumber *)parserId;

@end

NS_ASSUME_NONNULL_END
