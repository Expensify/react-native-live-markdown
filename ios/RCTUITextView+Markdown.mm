#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTUITextView (Markdown)

- (void)setMarkdownEnabled:(BOOL)markdownEnabled {
  NSNumber *markdownEnabledNumber = [NSNumber numberWithBool:markdownEnabled];
  objc_setAssociatedObject(self, @selector(isMarkdownEnabled), markdownEnabledNumber, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)isMarkdownEnabled {
  NSNumber *markdownEnabledNumber = objc_getAssociatedObject(self, @selector(isMarkdownEnabled));
  return [markdownEnabledNumber boolValue];
}

- (void)markdown_textDidChange
{
  if ([self isMarkdownEnabled]) {
    UITextRange *range = self.selectedTextRange;
    super.attributedText = [RCTMarkdownUtils parseMarkdown:self.attributedText.string];
    [super setSelectedTextRange:range]; // prevents cursor from jumping at the end when typing in the middle of the text

    if ([self.attributedText length] > 0) {
      UIFont *font = [self.attributedText attribute:NSFontAttributeName atIndex:0 effectiveRange:NULL];
      self.typingAttributes = @{NSFontAttributeName:font}; // removes indent in new line when typing after quote
    }
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
