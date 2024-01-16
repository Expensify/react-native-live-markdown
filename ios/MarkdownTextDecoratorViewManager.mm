#import <react-native-live-markdown/MarkdownTextDecoratorViewManager.h>
#import <react-native-live-markdown/MarkdownTextDecoratorView.h>

@implementation MarkdownTextDecoratorViewManager

RCT_EXPORT_MODULE(MarkdownTextDecoratorView)

- (UIView *)view
{
  return [[MarkdownTextDecoratorView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(markdownStyle, NSDictionary, MarkdownTextDecoratorView)
{
#ifdef RCT_NEW_ARCH_ENABLED
  // implemented in MarkdownTextDecoratorView updateProps:
#else
  RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithDictionary:json];
  [view setMarkdownStyle:markdownStyle];
#endif /* RCT_NEW_ARCH_ENABLED */
}

@end
