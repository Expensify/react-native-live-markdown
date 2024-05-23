#import <RNLiveMarkdown/RCTUITextView+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTUITextView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown_textDidChange
{
  auto markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    [markdownUtils parseMarkdown:self.textStorage];
  }

  // Call the original method
  [self markdown_textDidChange];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (int)offsetFromTextPosition:(UITextPosition *)textPosition {
  return [self offsetFromPosition:self.beginningOfDocument toPosition:textPosition];
}

- (void)markdown_setSelectedTextRange:(UITextRange *)selectedTextRange notifyDelegate:(BOOL)notifyDelegate
{
  // Workaround for `Invalid parameter not satisfying: pos` crash on Fabric when selecting all text and replacing it with single character.
  if ([self offsetFromTextPosition:selectedTextRange.start] <= 0 && [self offsetFromTextPosition:selectedTextRange.end] <= 0) {
    return;
  }

  // Call the original method
  [self markdown_setSelectedTextRange:selectedTextRange notifyDelegate:notifyDelegate];
}
#endif /* RCT_NEW_ARCH_ENABLED */

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];

    {
      SEL originalSelector = @selector(textDidChange);
      SEL swizzledSelector = @selector(markdown_textDidChange);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }

#ifdef RCT_NEW_ARCH_ENABLED
    {
      SEL originalSelector = @selector(setSelectedTextRange:notifyDelegate:);
      SEL swizzledSelector = @selector(markdown_setSelectedTextRange:notifyDelegate:);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
#endif /* RCT_NEW_ARCH_ENABLED */
  });
}

@end
