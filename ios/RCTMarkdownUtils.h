#import <React/RCTBackedTextInputViewProtocol.h>

@interface RCTMarkdownUtils : NSObject

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

@end
