#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewManager.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorView.h>

@implementation MarkdownTextInputDecoratorViewManager

RCT_EXPORT_MODULE(MarkdownTextInputDecoratorView)

- (UIView *)view
{
  return [[MarkdownTextInputDecoratorView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(markdownStyle, NSDictionary, MarkdownTextInputDecoratorView)
{
  // implemented in MarkdownTextInputDecoratorView updateProps:
}

RCT_CUSTOM_VIEW_PROPERTY(parserId, NSNumber, MarkdownTextInputDecoratorView)
{
  // implemented in MarkdownTextInputDecoratorView updateProps:
}

@end
