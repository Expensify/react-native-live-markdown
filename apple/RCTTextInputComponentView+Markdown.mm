#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

#import "MarkdownShadowFamilyRegistry.h"

using namespace expensify::livemarkdown;

@implementation RCTTextInputComponentView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  if (markdownUtils != nil) {
    // force Markdown formatting on first render because `_setAttributedText` is called before `setMarkdownUtils`
    RCTUITextField *backedTextInputView = [self getBackedTextInputView];
    backedTextInputView.attributedText = [markdownUtils parseMarkdown:backedTextInputView.attributedText withDefaultTextAttributes:backedTextInputView.defaultTextAttributes];
  }
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (RCTUITextField *)getBackedTextInputView {
  RCTUITextField *backedTextInputView = [self valueForKey:@"_backedTextInputView"];
  return backedTextInputView;
}

- (void)markdown__setAttributedString:(NSAttributedString *)attributedString
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  RCTUITextField *backedTextInputView = [self getBackedTextInputView];
  if (markdownUtils != nil && backedTextInputView != nil) {
    attributedString = [markdownUtils parseMarkdown:attributedString withDefaultTextAttributes:backedTextInputView.defaultTextAttributes];
  } else {
    // If markdownUtils is undefined, the text input hasn't been mounted yet. It will
    // update its state with the unformatted attributed string, we want to prevent displaying
    // this state by applying markdown in the commit hook where we can read markdown styles
    // from decorator props.
    MarkdownShadowFamilyRegistry::forceNextStateUpdate((facebook::react::Tag)self.tag);
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
