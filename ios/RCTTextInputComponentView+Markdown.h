// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTTextInputComponentView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTTextInputComponentView (Markdown)

@property(nonatomic, getter=isMarkdownEnabled) BOOL markdownEnabled;

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString;

@end

NS_ASSUME_NONNULL_END

#endif /* RCT_NEW_ARCH_ENABLED */
