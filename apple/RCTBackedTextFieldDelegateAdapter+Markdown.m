#import <react-native-live-markdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

@implementation RCTBackedTextFieldDelegateAdapter (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown_textFieldDidChange
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    RCTUITextField *backedTextInputView = [self valueForKey:@"_backedTextInputView"];
    UITextRange *range = backedTextInputView.selectedTextRange;
    backedTextInputView.attributedText = [markdownUtils parseMarkdown:backedTextInputView.attributedText];
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
