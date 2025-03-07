#import <React/RCTTextInputComponentView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTTextInputComponentView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString;

- (BOOL)markdown__textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText;

- (void)_setAttributedString:(NSAttributedString *)attributedString;

@end

NS_ASSUME_NONNULL_END
