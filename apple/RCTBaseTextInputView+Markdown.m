#import <react-native-live-markdown/RCTBaseTextInputView+Markdown.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
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
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    attributedText = [markdownUtils parseMarkdown:attributedText];
  }

  // Call the original method
  [self markdown_setAttributedText:attributedText];
}

- (void)markdown_updateLocalData
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    UITextRange *range = self.backedTextInputView.selectedTextRange;
    NSAttributedString *attributedText = [markdownUtils parseMarkdown:self.backedTextInputView.attributedText];
    [self.backedTextInputView setAttributedText:attributedText];
    [self.backedTextInputView setSelectedTextRange:range notifyDelegate:YES];
  }

  // Call the original method
  [self markdown_updateLocalData];
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
      // swizzle updateLocalData
      SEL originalSelector = @selector(updateLocalData);
      SEL swizzledSelector = @selector(markdown_updateLocalData);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
  });
}

@end
