// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED

#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <React/RCTUITextField.h>
#import <objc/message.h>

#import "MarkdownShadowFamilyRegistry.h"

@implementation RCTTextInputComponentView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);

  if (markdownUtils != nil) {
    // force Markdown formatting on first render because `_setAttributedText` is called before `setMarkdownUtils`
    RCTUITextField *backedTextInputView = [self getBackedTextInputView];
    backedTextInputView.attributedText = [markdownUtils parseMarkdown:backedTextInputView.attributedText withAttributes:backedTextInputView.defaultTextAttributes];
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
    attributedString = [markdownUtils parseMarkdown:attributedString withAttributes:backedTextInputView.defaultTextAttributes];
  } else {
    // If markdownUtils is undefined, the text input hasn't been mounted yet. It will
    // update its state with the unformatted attributed string, we want to prevent displaying
    // this state by applying markdown in the commit hook where we can read markdown styles
    // from decorator props.
    MarkdownShadowFamilyRegistry::forceNextStateUpdate((facebook::react::Tag)self.tag);
  }

  // Call the original method
  [self markdown__setAttributedString:attributedString];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(_setAttributedString:);
    SEL swizzledSelector = @selector(markdown__setAttributedString:);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end

#endif /* RCT_NEW_ARCH_ENABLED */
