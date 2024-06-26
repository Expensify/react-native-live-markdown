#import <UIKit/UIKit.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownLayoutManager : NSLayoutManager

@property(nonatomic) RCTMarkdownUtils *markdownUtils;

@end

NS_ASSUME_NONNULL_END
