#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSNumber *parserId;

// Called on a background queue once a background parse has finished and the
// ranges are cached. The owner should mark the layout as out of date so the
// text is measured again, this time with markdown. Otherwise the size measured
// from plain text stays until something else triggers a new layout.
@property (atomic, copy, nullable) void (^onAsyncFormattingReady)(void);

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes;

// Sets the style/parser and formats using the values passed in. Use this from
// the shadow node measure path, where one instance is shared between clones and
// several Fabric threads can call it at the same time.
//
// On the main thread this only uses ranges that are already cached and never
// runs the parser. If they are not there, the text is left unformatted for this
// pass and parsed in the background, then `onAsyncFormattingReady` is called so
// the node can be measured again (see Sentry APP-EF1).
- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                  markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
                       parserId:(nonnull NSNumber *)parserId;

@end

NS_ASSUME_NONNULL_END
