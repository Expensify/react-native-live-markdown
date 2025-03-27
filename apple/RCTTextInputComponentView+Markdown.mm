#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <React/RCTUITextView.h>
#import <objc/message.h>

@implementation RCTTextInputComponentView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (RCTUITextView *)getBackedTextInputView {
  RCTUITextView *backedTextInputView = [self valueForKey:@"wView"];
  return backedTextInputView;
}

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  RCTUITextView *backedTextInputView = [self getBackedTextInputView];
  if (markdownUtils != nil && backedTextInputView != nil) {
    attributedString = [markdownUtils parseMarkdown:attributedString withDefaultTextAttributes:backedTextInputView.defaultTextAttributes];
  }

  // Call the original method
  [self markdown__setAttributedString:attributedString];
  
  if (markdownUtils != nil && backedTextInputView != nil) {
    // After adding a newline at the end of the blockquote, the typing attributes in the next line still contain
    // NSParagraphStyle with non-zero firstLineHeadIndent and headIntent added by `_updateTypingAttributes` call.
    // This causes the cursor to be shifted to the right instead of being located at the beginning of the line.
    // The following code resets firstLineHeadIndent and headIndent in NSParagraphStyle in typing attributes
    // in order to fix the position of the cursor.
    NSDictionary<NSAttributedStringKey, id> *typingAttributes = backedTextInputView.typingAttributes;
    if (typingAttributes[NSParagraphStyleAttributeName] != nil) {
      NSMutableDictionary *mutableTypingAttributes = [typingAttributes mutableCopy];
      NSMutableParagraphStyle *mutableParagraphStyle = [typingAttributes[NSParagraphStyleAttributeName] mutableCopy];
      mutableParagraphStyle.firstLineHeadIndent = 0;
      mutableParagraphStyle.headIndent = 0;
      mutableTypingAttributes[NSParagraphStyleAttributeName] = mutableParagraphStyle;
      backedTextInputView.typingAttributes = mutableTypingAttributes;
    }
  }
}

- (BOOL)markdown__textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText
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

  return [self markdown__textOf:newText equals:oldText];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    {
      // swizzle _setAttributedString
      Class cls = [self class];
      SEL originalSelector = @selector(_setAttributedString:);
      SEL swizzledSelector = @selector(markdown__setAttributedString:);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }

    {
      // swizzle _textOf
      Class cls = [self class];
      SEL originalSelector = @selector(_textOf:equals:);
      SEL swizzledSelector = @selector(markdown__textOf:equals:);
      Method originalMethod = class_getInstanceMethod(cls, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
  });
}

@end
