#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownTextBackgroundWithRange : NSObject
@property (nonatomic, assign) RCTMarkdownTextBackground *textBackground;
@property (nonatomic, assign) NSRange range;
@end

API_AVAILABLE(ios(15.0))
@interface MarkdownTextLayoutFragment : NSTextLayoutFragment

@property (nonnull, atomic) RCTMarkdownUtils *markdownUtils;
@property (nonnull, atomic) NSNumber* depth;

@end

NS_ASSUME_NONNULL_END
