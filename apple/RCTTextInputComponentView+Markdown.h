// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

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

#endif /* RCT_NEW_ARCH_ENABLED */
