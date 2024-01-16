#import <UIKit/UIKit.h>
#import <React/RCTTextView.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTTextView (Markdown)

@property(nonatomic, nullable, getter=getMarkdownUtils) RCTMarkdownUtils *markdownUtils;

- (void)markdown_setTextStorage:(NSTextStorage *)textStorage
                   contentFrame:(CGRect)contentFrame
                descendantViews:(NSArray<UIView *> *)descendantViews;

@end

NS_ASSUME_NONNULL_END
