#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTBaseTextInputView (Markdown)

- (void)setMarkdownEnabled:(BOOL)markdownEnabled {
  NSNumber *markdownEnabledNumber = [NSNumber numberWithBool:markdownEnabled];
  objc_setAssociatedObject(self, @selector(isMarkdownEnabled), markdownEnabledNumber, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (BOOL)isMarkdownEnabled {
  NSNumber *markdownEnabledNumber = objc_getAssociatedObject(self, @selector(isMarkdownEnabled));
  return [markdownEnabledNumber boolValue];
}

- (void)markdown_setAttributedText:(NSAttributedString *)attributedText
{
  if ([self isMarkdownEnabled] && attributedText != nil) {
    attributedText = [RCTMarkdownUtils parseMarkdown:attributedText.string];
  }

  // Call the original method
  [self markdown_setAttributedText:attributedText];
}

- (void)markdown_updateLocalData
{
  if ([self isMarkdownEnabled]) {
    NSAttributedString *postParseString = [RCTMarkdownUtils parseMarkdown:self.backedTextInputView.attributedText.string];
    [self.backedTextInputView setAttributedText:postParseString];
  }

  // Call the original method
  [self markdown_updateLocalData];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    // swizzle setAttributedText
    Class cls = [self class];
    SEL originalSelectorSetAttributedText = @selector(setAttributedText:);
    SEL swizzledSelectorSetAttributedText = @selector(markdown_setAttributedText:);
    Method originalSetAttributedText = class_getInstanceMethod(cls, originalSelectorSetAttributedText);
    Method swizzledSetAttributedText = class_getInstanceMethod(cls, swizzledSelectorSetAttributedText);
    method_exchangeImplementations(originalSetAttributedText, swizzledSetAttributedText);

    // swizzle updateLocalData
    SEL originalSelectorUpdateLocalData = @selector(updateLocalData);
    SEL swizzledSelectorUpdateLocalData = @selector(markdown_updateLocalData);
    Method originalUpdateLocalData = class_getInstanceMethod(cls, originalSelectorUpdateLocalData);
    Method swizzledUpdateLocalData = class_getInstanceMethod(cls, swizzledSelectorUpdateLocalData);
    method_exchangeImplementations(originalUpdateLocalData, swizzledUpdateLocalData);
  });
}

@end
