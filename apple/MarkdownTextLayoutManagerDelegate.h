#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextLayoutManagerDelegate : NSObject <NSTextLayoutManagerDelegate>

@property (nonnull, atomic) NSTextStorage *textStorage;

@property (nonnull, atomic) RCTMarkdownUtils *markdownUtils;

@end

NS_ASSUME_NONNULL_END
