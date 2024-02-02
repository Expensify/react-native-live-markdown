// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

#import <react-native-live-markdown/RCTTextInputComponentView+Markdown.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

@implementation RCTTextInputComponentView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  if (markdownUtils != nil) {
    // force Markdown formatting on first render because `_setAttributedText` is called before `setMarkdownUtils`
    RCTUITextField *backedTextInputView = [self valueForKey:@"_backedTextInputView"];
    backedTextInputView.attributedText = [markdownUtils parseMarkdown:backedTextInputView.attributedText];
  }
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    attributedString = [markdownUtils parseMarkdown:attributedString];
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
