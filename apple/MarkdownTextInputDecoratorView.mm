#import <React/RCTUITextField.h>
#import <react/debug/react_native_assert.h>

#import <react-native-live-markdown/MarkdownLayoutManager.h>
#import <react-native-live-markdown/MarkdownTextInputDecoratorView.h>
#import <react-native-live-markdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-live-markdown/RCTUITextView+Markdown.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <react-native-live-markdown/RCTTextInputComponentView+Markdown.h>
#else
#import <react-native-live-markdown/RCTBaseTextInputView+Markdown.h>
#endif /* RCT_NEW_ARCH_ENABLED */

#import <objc/runtime.h>

@implementation MarkdownTextInputDecoratorView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
#ifdef RCT_NEW_ARCH_ENABLED
  __weak RCTTextInputComponentView *_textInput;
#else
  __weak RCTBaseTextInputView *_textInput;
#endif /* RCT_NEW_ARCH_ENABLED */
  __weak RCTBackedTextFieldDelegateAdapter *_adapter;
  __weak RCTUITextView *_textView;
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
  RCTUIView *view = [viewsArray objectAtIndex:currentIndex - 1];

#ifdef RCT_NEW_ARCH_ENABLED
  react_native_assert([view isKindOfClass:[RCTTextInputComponentView class]] && "Previous sibling component is not an instance of RCTTextInputComponentView.");
  _textInput = (RCTTextInputComponentView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = [_textInput valueForKey:@"_backedTextInputView"];
#else
  react_native_assert([view isKindOfClass:[RCTBaseTextInputView class]] && "Previous sibling component is not an instance of RCTBaseTextInputView.");
  _textInput = (RCTBaseTextInputView *)view;
  RCTUIView<RCTBackedTextInputViewProtocol> *backedTextInputView = _textInput.backedTextInputView;
#endif /* RCT_NEW_ARCH_ENABLED */

  _markdownUtils = [[RCTMarkdownUtils alloc] initWithBackedTextInputView:backedTextInputView];
  react_native_assert(_markdownStyle != nil);
  [_markdownUtils setMarkdownStyle:_markdownStyle];

  [_textInput setMarkdownUtils:_markdownUtils];
  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)backedTextInputView;
    _adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [_adapter setMarkdownUtils:_markdownUtils];
  } else if ([backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    _textView = (RCTUITextView *)backedTextInputView;
    [_textView setMarkdownUtils:_markdownUtils];
    NSLayoutManager *layoutManager = _textView.layoutManager; // switching to TextKit 1 compatibility mode
    layoutManager.allowsNonContiguousLayout = NO; // workaround for onScroll issue
    object_setClass(layoutManager, [MarkdownLayoutManager class]);
    objc_setAssociatedObject(layoutManager, @selector(markdownUtils), _markdownUtils, OBJC_ASSOCIATION_RETAIN);
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)willMoveToWindow:(NSWindow *)newWindow
{
  if (_textInput != nil) {
    [_textInput setMarkdownUtils:nil];
  }
  if (_adapter != nil) {
    [_adapter setMarkdownUtils:nil];
  }
  if (_textView != nil) {
    [_textView setMarkdownUtils:nil];
    NSLayoutManager *layoutManager = _textView.layoutManager;
    if (layoutManager != nil && [object_getClass(layoutManager) isEqual:[MarkdownLayoutManager class]]) {
      objc_setAssociatedObject(layoutManager, @selector(markdownUtils), nil, OBJC_ASSOCIATION_RETAIN);
      object_setClass(layoutManager, [NSLayoutManager class]);
    }
  }
}

- (void)setMarkdownStyle:(RCTMarkdownStyle *)markdownStyle
{
  _markdownStyle = markdownStyle;
  [_markdownUtils setMarkdownStyle:markdownStyle];
  [_textInput textInputDidChange]; // trigger attributed text update
}

@end
