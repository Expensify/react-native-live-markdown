#import <UIKit/UIKit.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextInputDecoratorView : UIView

- (void)setMarkdownStyle:(RCTMarkdownStyle *)markdownStyle;

- (void)setParserId:(NSNumber *)parserId;

@end

NS_ASSUME_NONNULL_END
