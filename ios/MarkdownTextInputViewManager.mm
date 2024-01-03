#import <react-native-markdown-text-input/MarkdownTextInputViewManager.h>
#import <react-native-markdown-text-input/MarkdownTextInputViewView.h>

@implementation MarkdownTextInputViewManager

RCT_EXPORT_MODULE(MarkdownTextInputView)

- (UIView *)view
{
  return [[MarkdownTextInputViewView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(markdownStyle, NSDictionary, MarkdownTextInputViewView)
{
  [view setMarkdownStyle:json];
}

@end
