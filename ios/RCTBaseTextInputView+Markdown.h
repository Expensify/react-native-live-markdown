#import <React/RCTBaseTextInputView.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBaseTextInputView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText;

- (void)markdown_updateLocalData;

@end

NS_ASSUME_NONNULL_END
