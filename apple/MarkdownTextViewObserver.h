#import <UIKit/UIKit.h>
#import <React/RCTUITextView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextViewObserver : NSObject

- (instancetype)initWithTextView:(nonnull RCTUITextView *)textView markdownUtils:(nonnull RCTMarkdownUtils *)markdownUtils;

@end

NS_ASSUME_NONNULL_END
