#import <React/RCTBaseTextInputView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBaseTextInputView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText;

- (BOOL)markdown_textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText;

- (void)markdown_updateLocalData;

@end

NS_ASSUME_NONNULL_END
