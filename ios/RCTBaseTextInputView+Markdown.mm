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
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    attributedText = [markdownUtils parseMarkdown:attributedText withAttributes:self.backedTextInputView.defaultTextAttributes];
  }

  // Call the original method
  [self markdown_setAttributedText:attributedText];
}

- (void)markdown_updateLocalData
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    id<RCTBackedTextInputViewProtocol> backedTextInputView = self.backedTextInputView;
    NSAttributedString *oldAttributedText = backedTextInputView.attributedText;
    NSAttributedString *newAttributedText = [markdownUtils parseMarkdown:oldAttributedText withAttributes:backedTextInputView.defaultTextAttributes];
    UITextRange *range = backedTextInputView.selectedTextRange;

    // update attributed text without emitting onSelectionChange event
    id<RCTBackedTextInputDelegate> delegate = backedTextInputView.textInputDelegate;
    backedTextInputView.textInputDelegate = nil;
    [backedTextInputView setAttributedText:newAttributedText];
    backedTextInputView.textInputDelegate = delegate;

    // restore original selection and emit onSelectionChange event
    [backedTextInputView setSelectedTextRange:range notifyDelegate:YES];
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
