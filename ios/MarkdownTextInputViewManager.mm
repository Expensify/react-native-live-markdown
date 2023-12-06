#import <react-native-markdown-text-input/MarkdownTextInputViewManager.h>
#import <react-native-markdown-text-input/MarkdownTextInputViewView.h>
#import <react-native-markdown-text-input/Utils.h>

@implementation MarkdownTextInputViewManager

RCT_EXPORT_MODULE(MarkdownTextInputView)

- (UIView *)view
{
  return [[MarkdownTextInputViewView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(color, NSString, UIView)
{
  [view setBackgroundColor: [Utils hexStringToColor:json]];
}

@end
