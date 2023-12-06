#import <React/RCTBaseTextInputView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTBaseTextInputView (Markdown)

@property(nonatomic, getter=isMarkdownEnabled) BOOL markdownEnabled;

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText;

@end

NS_ASSUME_NONNULL_END
