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
    attributedText = [markdownUtils parseMarkdown:attributedText withDefaultTextAttributes:self.backedTextInputView.defaultTextAttributes];
  }

  // Call the original method
  [self markdown_setAttributedText:attributedText];
}

- (BOOL)markdown_textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    // Emoji characters are automatically assigned an AppleColorEmoji NSFont and the original font is moved to NSOriginalFont
    // We need to remove these attributes before comparison
    NSMutableAttributedString *newTextCopy = [newText mutableCopy];
    NSMutableAttributedString *oldTextCopy = [oldText mutableCopy];
    [newTextCopy removeAttribute:@"NSFont" range:NSMakeRange(0, newTextCopy.length)];
    [oldTextCopy removeAttribute:@"NSFont" range:NSMakeRange(0, oldTextCopy.length)];
    [oldTextCopy removeAttribute:@"NSOriginalFont" range:NSMakeRange(0, oldTextCopy.length)];
    return [newTextCopy isEqualToAttributedString:oldTextCopy];
  }

  return [self markdown_textOf:newText equals:oldText];
}

- (void)markdown_updateLocalData
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    id<RCTBackedTextInputViewProtocol> backedTextInputView = self.backedTextInputView;
    NSAttributedString *oldAttributedText = backedTextInputView.attributedText;
    NSAttributedString *newAttributedText = [markdownUtils parseMarkdown:oldAttributedText withDefaultTextAttributes:backedTextInputView.defaultTextAttributes];
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
