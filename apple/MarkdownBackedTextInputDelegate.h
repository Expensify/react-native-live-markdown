#import <React/RCTBackedTextInputDelegate.h>
#import <React/RCTUITextView.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownBackedTextInputDelegate : NSObject <RCTBackedTextInputDelegate>

- (instancetype)initWithTextView:(RCTUITextView *)textView;

@end

NS_ASSUME_NONNULL_END
