// This guard prevent this file to be compiled in the new architecture.
#ifndef RCT_NEW_ARCH_ENABLED

#import <React/RCTUITextField.h>
#import <RNLiveMarkdown/RCTUITextView+Markdown.h>
#import <RNLiveMarkdown/RCTBaseTextInputView+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTBaseTextInputView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText
{
  if (![self.backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
    if (markdownUtils != nil) {
      attributedText = [markdownUtils parseMarkdown:attributedText withAttributes:self.backedTextInputView.defaultTextAttributes];
    }
  }

  // Call the original method
  [self markdown_setAttributedText:attributedText];
}

- (BOOL)markdown_textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    return [newText isEqualToAttributedString:oldText];
  }

  return [self markdown_textOf:newText equals:oldText];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];

    {
      // swizzle setAttributedText
      SEL originalSelector = @selector(setAttributedText:);
      SEL swizzledSelector = @selector(markdown_setAttributedText:);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }

    {
      // swizzle textOf
      SEL originalSelector = @selector(textOf:equals:);
      SEL swizzledSelector = @selector(markdown_textOf:equals:);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
  });
}

@end

#endif /* RCT_NEW_ARCH_ENABLED */
