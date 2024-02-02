#import <react-native-live-markdown/MarkdownTextInputDecoratorViewManager.h>
#import <react-native-live-markdown/MarkdownTextInputDecoratorView.h>

@implementation MarkdownTextInputDecoratorViewManager

RCT_EXPORT_MODULE(MarkdownTextInputDecoratorView)

- (UIView *)view
{
  return [[MarkdownTextInputDecoratorView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(markdownStyle, NSDictionary, MarkdownTextInputDecoratorView)
{
#ifdef RCT_NEW_ARCH_ENABLED
  // implemented in MarkdownTextInputDecoratorView updateProps:
#else
  RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithDictionary:json];
  [view setMarkdownStyle:markdownStyle];
#endif /* RCT_NEW_ARCH_ENABLED */
}

@end
