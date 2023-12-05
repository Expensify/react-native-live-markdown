#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTUITextView (Markdown)

- (void)markdown_textDidChange
{
  UITextRange *range = self.selectedTextRange;
  super.attributedText = [RCTMarkdownUtils parseMarkdown:self.attributedText.string];
  [super setSelectedTextRange:range]; // prevents cursor from jumping at the end when typing in the middle of the text
  self.typingAttributes = @{NSFontAttributeName: [UIFont boldSystemFontOfSize:20]}; // removes indent in new line when typing after quote

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
