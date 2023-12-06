#import <React/RCTUITextField.h>

#import <react-native-markdown-text-input/MarkdownTextInputViewView.h>
#import <react-native-markdown-text-input/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <react-native-markdown-text-input/RCTTextInputComponentView+Markdown.h>
#else
#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#endif /* RCT_NEW_ARCH_ENABLED */

@implementation MarkdownTextInputViewView

- (void)didMoveToWindow {
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
  RCTTextInputComponentView *textInput = (RCTTextInputComponentView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = [textInput valueForKey:@"_backedTextInputView"];
#else
  react_native_assert([view isKindOfClass:[RCTBaseTextInputView class]] && "Previous sibling component is not an instance of RCTBaseTextInputView.");
  RCTBaseTextInputView *textInput = (RCTBaseTextInputView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = textInput.backedTextInputView;
#endif /* RCT_NEW_ARCH_ENABLED */

  [textInput setMarkdownEnabled:YES];
  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)backedTextInputView;
    RCTBackedTextFieldDelegateAdapter *adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [adapter setMarkdownEnabled:YES];
  } else if ([backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    RCTUITextView *textView = (RCTUITextView *)backedTextInputView;
    [textView setMarkdownEnabled:YES];
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

// TODO: call setMarkdownEnabled:NO

@end
