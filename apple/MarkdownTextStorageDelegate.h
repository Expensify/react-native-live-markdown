#import <UIKit/UIKit.h>
#import <React/RCTUITextView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextStorageDelegate : NSObject <NSTextStorageDelegate>

@property(nonatomic, nullable) RCTMarkdownUtils *markdownUtils;

@property(nonatomic, nullable, strong) RCTUITextView *textView;

@end

NS_ASSUME_NONNULL_END
