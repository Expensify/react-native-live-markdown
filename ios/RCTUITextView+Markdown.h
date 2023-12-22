#import <UIKit/UIKit.h>
#import <React/RCTUITextView.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTUITextView (Markdown)

@property(nonatomic, getter=isMarkdownEnabled) BOOL markdownEnabled;

@property(nonatomic, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_textDidChange;

@end

NS_ASSUME_NONNULL_END
