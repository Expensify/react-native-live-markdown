// This guard prevent this file to be compiled in the new architecture.
#ifndef RCT_NEW_ARCH_ENABLED

#import <React/RCTBaseTextInputView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBaseTextInputView (Private)
- (BOOL)textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText;
@end

@interface RCTBaseTextInputView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText;

- (BOOL)markdown_textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText;

@end

NS_ASSUME_NONNULL_END

#endif /* RCT_NEW_ARCH_ENABLED */
