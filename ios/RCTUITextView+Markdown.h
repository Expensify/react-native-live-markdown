#import <UIKit/UIKit.h>
#import <React/RCTUITextView.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTUITextView (Private)
- (void)textDidChange;
- (void)setSelectedTextRange:(UITextRange *)selectedTextRange notifyDelegate:(BOOL)notifyDelegate;
@end

@interface RCTUITextView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_textDidChange;

@end

NS_ASSUME_NONNULL_END
