// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

#import <react-native-markdown-text-input/RCTTextInputComponentView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

@implementation RCTTextInputComponentView (Markdown)

- (void)setMarkdownEnabled:(BOOL)markdownEnabled {
  NSNumber *markdownEnabledNumber = [NSNumber numberWithBool:markdownEnabled];
  objc_setAssociatedObject(self, @selector(isMarkdownEnabled), markdownEnabledNumber, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
 
  if (markdownEnabled) {
    // force Markdown formatting on first render because `_setAttributedText` is called before `setMarkdownEnabled`
    RCTUITextField *backedTextInputView = [self valueForKey:@"_backedTextInputView"];
    backedTextInputView.attributedText = [RCTMarkdownUtils parseMarkdown:backedTextInputView.attributedText.string];
  }
}

- (BOOL)isMarkdownEnabled {
  NSNumber *markdownEnabledNumber = objc_getAssociatedObject(self, @selector(isMarkdownEnabled));
  return [markdownEnabledNumber boolValue];
}

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString
{
  if ([self isMarkdownEnabled] && attributedString != nil) {
    attributedString = [RCTMarkdownUtils parseMarkdown:attributedString.string];
  }

  // Call the original method
  [self markdown__setAttributedString:attributedString];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(_setAttributedString:);
    SEL swizzledSelector = @selector(markdown__setAttributedString:);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end

#endif /* RCT_NEW_ARCH_ENABLED */
