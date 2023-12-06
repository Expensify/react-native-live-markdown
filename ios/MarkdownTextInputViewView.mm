#import <React/RCTUITextField.h>
#import <react/debug/react_native_assert.h>

#import <react-native-markdown-text-input/MarkdownTextInputViewView.h>
#import <react-native-markdown-text-input/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <react-native-markdown-text-input/RCTTextInputComponentView+Markdown.h>
#else
#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#endif /* RCT_NEW_ARCH_ENABLED */

@implementation MarkdownTextInputViewView {
#ifdef RCT_NEW_ARCH_ENABLED
  __weak RCTTextInputComponentView *_textInput;
#else
  __weak RCTBaseTextInputView *_textInput;
#endif /* RCT_NEW_ARCH_ENABLED */
  __weak RCTBackedTextFieldDelegateAdapter *_adapter;
  __weak RCTUITextView *_textView;
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
  if (_textInput != nil) {
    [_textInput setMarkdownEnabled:NO];
  }
  if (_adapter != nil) {
    [_adapter setMarkdownEnabled:NO];
  }
  if (_textView != nil) {
    [_textView setMarkdownEnabled:NO];
  }
}

- (void)didMoveToWindow {
#ifdef RCT_NEW_ARCH_ENABLED
  if (self.superview.superview == nil) {
    // happens on reload on Fabric
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
  react_native_assert([view isKindOfClass:[RCTTextInputComponentView class]] && "Previous sibling component is not an instance of RCTTextInputComponentView.");
  _textInput = (RCTTextInputComponentView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = [_textInput valueForKey:@"_backedTextInputView"];
#else
  react_native_assert([view isKindOfClass:[RCTBaseTextInputView class]] && "Previous sibling component is not an instance of RCTBaseTextInputView.");
  _textInput = (RCTBaseTextInputView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = _textInput.backedTextInputView;
#endif /* RCT_NEW_ARCH_ENABLED */

  [_textInput setMarkdownEnabled:YES];
  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)backedTextInputView;
    _adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [_adapter setMarkdownEnabled:YES];
  } else if ([backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    _textView = (RCTUITextView *)backedTextInputView;
    [_textView setMarkdownEnabled:YES];
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

// TODO: call setMarkdownEnabled:NO

@end
