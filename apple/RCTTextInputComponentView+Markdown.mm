#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>
#import <objc/message.h>

@implementation RCTTextInputComponentView (Markdown)

- (BOOL)markdown__textOf:(NSAttributedString *)newText equals:(NSAttributedString *)oldText
{
  __block BOOL isMarkdownTextInput = false;
  [oldText enumerateAttribute:RCTLiveMarkdownTextAttributeName
                      inRange:NSMakeRange(0, oldText.length)
                      options:0
                   usingBlock:^(id value, NSRange range, BOOL *stop) {
                     if (value) {
                       isMarkdownTextInput = true;
                       *stop = YES;
                     }
                   }];
  if (isMarkdownTextInput) {
    return [newText.string isEqualToString:oldText.string];
  }

  return [self markdown__textOf:newText equals:oldText];
}

+ (void)load
{
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    // swizzle _textOf
    Class cls = [self class];
    SEL originalSelector = @selector(_textOf:equals:);
    SEL swizzledSelector = @selector(markdown__textOf:equals:);
    Method originalMethod = class_getInstanceMethod(cls, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(cls, swizzledSelector);
    method_exchangeImplementations(originalMethod, swizzledMethod);
  });
}

@end
