#import <UIKit/UIKit.h>
#import <React/RCTUITextView.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTUITextView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_textDidChange;

@end

NS_ASSUME_NONNULL_END
