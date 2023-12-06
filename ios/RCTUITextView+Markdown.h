#import <UIKit/UIKit.h>

#import <React/RCTUITextView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTUITextView (Markdown)

@property(nonatomic, getter=isMarkdownEnabled) BOOL markdownEnabled;

- (void)markdown_textDidChange;

@end

NS_ASSUME_NONNULL_END
