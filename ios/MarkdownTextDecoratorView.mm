#import <React/RCTTextView.h>
#import <react/debug/react_native_assert.h>

//#import <react-native-live-markdown/MarkdownLayoutManager.h>
#import <react-native-live-markdown/MarkdownTextDecoratorView.h>
#import <react-native-live-markdown/RCTMarkdownUtils.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>
//#import <react-native-live-markdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-live-markdown/RCTTextView+Markdown.h>

//#ifdef RCT_NEW_ARCH_ENABLED
//#import <react-native-live-markdown/RCTTextComponentView+Markdown.h>
//#else
//#import <react-native-live-markdown/RCTBaseTextView+Markdown.h>
//#endif /* RCT_NEW_ARCH_ENABLED */

#import <objc/runtime.h>

@implementation MarkdownTextDecoratorView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
// #ifdef RCT_NEW_ARCH_ENABLED
//   __weak RCTTextComponentView *_text;
// #else
  __weak RCTTextView *_text;
// #endif /* RCT_NEW_ARCH_ENABLED */
//   __weak RCTBackedTextFieldDelegateAdapter *_adapter;
//   __weak RCTUITextView *_textView;
}

- (void)didMoveToWindow {
#ifdef RCT_NEW_ARCH_ENABLED
  if (self.superview.superview == nil) {
    return;
  }
#else
  if (self.superview == nil) {
    return;
  }
#endif /* RCT_NEW_ARCH_ENABLED */

#ifdef RCT_NEW_ARCH_ENABLED
  NSArray *viewsArray = self.superview.superview.subviews;
  NSUInteger currentIndex = [viewsArray indexOfObject:self.superview];
#else
  NSArray *viewsArray = self.superview.subviews;
  NSUInteger currentIndex = [viewsArray indexOfObject:self];
#endif /* RCT_NEW_ARCH_ENABLED */

  react_native_assert(currentIndex != 0 && currentIndex != NSNotFound && "Error while finding current component.");
  UIView *view = [viewsArray objectAtIndex:currentIndex - 1];

 #ifdef RCT_NEW_ARCH_ENABLED
//   react_native_assert([view isKindOfClass:[RCTTextComponentView class]] && "Previous sibling component is not an instance of RCTTextComponentView.");
//   _text = (RCTTextComponentView *)view;
//   UIView<RCTBackedTextViewProtocol> *backedTextView = [_text valueForKey:@"_backedTextView"];
 #else
   react_native_assert([view isKindOfClass:[RCTTextView class]] && "Previous sibling component is not an instance of RCTTextView.");
   _text = (RCTTextView *)view;
 #endif /* RCT_NEW_ARCH_ENABLED */

   _markdownUtils = [[RCTMarkdownUtils alloc] initWithTextView:_text];
   react_native_assert(_markdownStyle != nil);
   [_markdownUtils setMarkdownStyle:_markdownStyle];

   [_text setMarkdownUtils:_markdownUtils];
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
  // if (_text != nil) {
  //   [_text setMarkdownUtils:nil];
  // }
  // if (_adapter != nil) {
  //   [_adapter setMarkdownUtils:nil];
  // }
  // if (_textView != nil) {
  //   [_textView setMarkdownUtils:nil];
  //   if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
  //     [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
  //     object_setClass(_textView.layoutManager, [NSLayoutManager class]);
  //   }
  // }
}

- (void)setMarkdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
{
  _markdownStyle = markdownStyle;
  [_markdownUtils setMarkdownStyle:markdownStyle];
  // [_text textDidChange]; // trigger attributed text update
}

@end
