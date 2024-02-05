#import <React/RCTBackedTextInputViewProtocol.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSMutableArray<NSValue *> *blockquoteRanges;
@property (weak, nonatomic) RCTUIView<RCTBackedTextInputViewProtocol> *backedTextInputView;

- (instancetype)initWithBackedTextInputView:(RCTUIView<RCTBackedTextInputViewProtocol> *)backedTextInputView;

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input;

@end

NS_ASSUME_NONNULL_END
