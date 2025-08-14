#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

API_AVAILABLE(ios(15.0))
@interface MarkdownTextLayoutFragment : NSTextLayoutFragment

@property (nonnull, atomic) RCTMarkdownUtils *markdownUtils;
@property (nonnull, atomic) NSNumber* depth;

@end

NS_ASSUME_NONNULL_END
