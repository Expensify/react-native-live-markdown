#import <React/RCTBackedTextInputViewProtocol.h>

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) NSMutableArray<NSValue *> *quoteRanges;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

@end
