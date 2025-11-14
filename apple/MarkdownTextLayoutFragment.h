#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/RCTMarkdownTextBackgroundWithRange.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

API_AVAILABLE(ios(15.0))
@interface MarkdownTextLayoutFragment : NSTextLayoutFragment

@property (nonnull, atomic) RCTMarkdownUtils *markdownUtils;

@property NSUInteger depth;

@property NSMutableArray<RCTMarkdownTextBackgroundWithRange *> *mentions;

@end

NS_ASSUME_NONNULL_END
