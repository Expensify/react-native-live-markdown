#import <react-native-live-markdown/MarkdownTextInputViewManager.h>
#import <react-native-live-markdown/MarkdownTextInputViewView.h>

@implementation MarkdownTextInputViewManager

RCT_EXPORT_MODULE(MarkdownTextInputView)

- (UIView *)view
{
  return [[MarkdownTextInputViewView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(markdownStyle, NSDictionary, MarkdownTextInputViewView)
{
#ifdef RCT_NEW_ARCH_ENABLED
  // implemented in MarkdownTextInputView updateProps:
#else
  RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithDictionary:json];
  [view setMarkdownStyle:markdownStyle];
#endif /* RCT_NEW_ARCH_ENABLED */
}

@end
