#import <React/RCTBackedTextInputDelegateAdapter.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBackedTextFieldDelegateAdapter (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_textFieldDidChange;

@end

NS_ASSUME_NONNULL_END
