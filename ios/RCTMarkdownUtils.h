#import <React/RCTBackedTextInputViewProtocol.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSValue *> *blockquoteRanges;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input;

// returns the most outer blockquote range that surrounds the given range; if there is no such range, it returns the passed range
- (NSRange)getCircumferencingBlockquoteRange:(NSRange)range;

// counts the number of ranges the given range is contained within
- (int)getBlockquoteNestLevel:(NSRange)range;

@end

NS_ASSUME_NONNULL_END
