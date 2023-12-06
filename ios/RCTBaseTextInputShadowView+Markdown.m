#import <react-native-markdown-text-input/RCTBaseTextInputShadowView+Markdown.h>
#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <React/RCTUIManager.h>
#import <objc/message.h>

@implementation RCTBaseTextInputShadowView (Markdown)

- (NSAttributedString *)markdown_measurableAttributedText
{
  // TODO: find a better way to check if Markdown is enabled
  RCTBridge *bridge = [self valueForKey:@"_bridge"];
  RCTUIManager *uiManager = [bridge moduleForClass:[RCTUIManager class]];
  __block NSNumber *markdownEnabledNumber = @NO;
  NSNumber *reactTag = self.reactTag;
  RCTUnsafeExecuteOnMainQueueSync(^{
    UIView *view = [uiManager viewForReactTag:reactTag];
    if ([view isKindOfClass:[RCTBaseTextInputView class]]) {
      RCTBaseTextInputView *textInput = (RCTBaseTextInputView *)view;
      if ([textInput isMarkdownEnabled]) {
        markdownEnabledNumber = @YES;
      }
    }
  });

  // Call the original method
  NSAttributedString *output = [self markdown_measurableAttributedText];

  if ([markdownEnabledNumber boolValue]) {
    output = [RCTMarkdownUtils parseMarkdown:output.string];
  }

  return output;
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(measurableAttributedText);
    SEL swizzledSelector = @selector(markdown_measurableAttributedText);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end
