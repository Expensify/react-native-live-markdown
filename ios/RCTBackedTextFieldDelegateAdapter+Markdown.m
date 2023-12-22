#import <react-native-markdown-text-input/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

@implementation RCTBackedTextFieldDelegateAdapter (Markdown)

- (void)setMarkdownEnabled:(BOOL)markdownEnabled {
  NSNumber *markdownEnabledNumber = [NSNumber numberWithBool:markdownEnabled];
  objc_setAssociatedObject(self, @selector(isMarkdownEnabled), markdownEnabledNumber, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)isMarkdownEnabled {
  NSNumber *markdownEnabledNumber = objc_getAssociatedObject(self, @selector(isMarkdownEnabled));
  return [markdownEnabledNumber boolValue];
}

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown_textFieldDidChange
{
  if ([self isMarkdownEnabled]) {
    RCTUITextField *backedTextInputView = [self valueForKey:@"_backedTextInputView"];
    UITextRange *range = backedTextInputView.selectedTextRange;
    backedTextInputView.attributedText = [[self getMarkdownUtils] parseMarkdown:backedTextInputView.attributedText];
    [backedTextInputView setSelectedTextRange:range notifyDelegate:YES];
  }

  // Call the original method
  [self markdown_textFieldDidChange];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(textFieldDidChange);
    SEL swizzledSelector = @selector(markdown_textFieldDidChange);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end
