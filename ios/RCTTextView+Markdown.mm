#import <react-native-live-markdown/RCTTextView+Markdown.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
#import <objc/message.h>

@implementation RCTTextView (Markdown)

- (void)setMarkdownUtils:(RCTMarkdownUtils *)markdownUtils {
  objc_setAssociatedObject(self, @selector(getMarkdownUtils), markdownUtils, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (RCTMarkdownUtils *)getMarkdownUtils {
  return objc_getAssociatedObject(self, @selector(getMarkdownUtils));
}

- (void)markdown_setTextStorage:(NSTextStorage *)textStorage
                   contentFrame:(CGRect)contentFrame
                descendantViews:(NSArray<UIView *> *)descendantViews
{
  RCTMarkdownUtils *markdownUtils = [self getMarkdownUtils];
  if (markdownUtils != nil) {
    NSRange range = NSMakeRange(0, [textStorage length]);
    NSAttributedString *input = [textStorage attributedSubstringFromRange:range];
    NSAttributedString *output = [markdownUtils parseMarkdown:input];
    [textStorage replaceCharactersInRange:range withAttributedString:output];
  }
    
  // Call the original method
  [self markdown_setTextStorage:textStorage contentFrame:contentFrame descendantViews:descendantViews];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class cls = [self class];
    SEL originalSelector = @selector(setTextStorage:contentFrame:descendantViews:);
    SEL swizzledSelector = @selector(markdown_setTextStorage:contentFrame:descendantViews:);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end
