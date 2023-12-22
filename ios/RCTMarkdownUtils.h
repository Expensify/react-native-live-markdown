#import <React/RCTBackedTextInputViewProtocol.h>

@interface RCTMarkdownUtils : NSObject

@property(nonatomic) NSMutableArray<NSValue *> *quoteRanges;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

@end
