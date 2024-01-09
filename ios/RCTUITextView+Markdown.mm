#import <react-native-live-markdown/RCTUITextView+Markdown.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
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
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    UITextRange *range = self.selectedTextRange;
    super.attributedText = [markdownUtils parseMarkdown:self.attributedText];
    [super setSelectedTextRange:range]; // prevents cursor from jumping at the end when typing in the middle of the text
    self.typingAttributes = self.defaultTextAttributes; // removes indent in new line when typing after blockquote
  }

  // Call the original method
  [self markdown_textDidChange];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(textDidChange);
    SEL swizzledSelector = @selector(markdown_textDidChange);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end
