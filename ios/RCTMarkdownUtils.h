#import <React/RCTBackedTextInputViewProtocol.h>
#import <React/RCTTextView.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSValue *> *quoteRanges;
@property (weak, nonatomic) UIView<RCTBackedTextInputViewProtocol> *backedTextInputView;
@property (weak, nonatomic) RCTTextView *textView;

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (instancetype)initWithTextView:(RCTTextView *)textView;

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input;

@end
