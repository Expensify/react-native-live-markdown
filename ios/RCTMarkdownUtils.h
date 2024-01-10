#import <React/RCTBackedTextInputViewProtocol.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSValue *> *quoteRanges;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

// returns the most outer blockquote range that surrounds the given range; if there is no such range, it returns the passed range
- (NSRange)getCircumferencingBlockquoteRange:(NSRange)range;

// counts the number of ranges the given range is contained within
- (int)getBlockquoteNestLevel:(NSRange)range;

@end
