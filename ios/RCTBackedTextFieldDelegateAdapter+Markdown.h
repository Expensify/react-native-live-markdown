#import <React/RCTBackedTextInputDelegateAdapter.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBackedTextFieldDelegateAdapter (Markdown)

@property(nonatomic, getter=isMarkdownEnabled) BOOL markdownEnabled;

- (void)markdown_textFieldDidChange;

@end

NS_ASSUME_NONNULL_END
