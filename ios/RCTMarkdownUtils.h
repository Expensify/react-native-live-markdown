#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSDictionary *> *blockquoteRangesAndLevels;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input;

@end

NS_ASSUME_NONNULL_END
