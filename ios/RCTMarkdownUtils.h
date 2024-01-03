#import <React/RCTBackedTextInputViewProtocol.h>
#import <react-native-markdown-text-input/RCTMarkdownStyle.h>

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) NSMutableArray<NSValue *> *quoteRanges;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

@end
