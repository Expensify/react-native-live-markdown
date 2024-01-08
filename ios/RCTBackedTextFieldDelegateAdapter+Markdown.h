#import <React/RCTBackedTextInputDelegateAdapter.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBackedTextFieldDelegateAdapter (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_textFieldDidChange;

@end

NS_ASSUME_NONNULL_END
