#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSDictionary *> *blockquoteRangesAndLevels;

- (void)applyFormatting:(nonnull NSMutableAttributedString *)attributedString withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey,id> *)defaultTextAttributes;

@end

NS_ASSUME_NONNULL_END
