#import <React/RCTBaseTextInputView.h>
#import <React/RCTUITextField.h>

#import <react-native-markdown-text-input/MarkdownTextInputViewView.h>
#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#import <react-native-markdown-text-input/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>

@implementation MarkdownTextInputViewView

- (void)didMoveToWindow {
  NSArray *viewsArray = self.superview.subviews;
  NSUInteger currentIndex = [viewsArray indexOfObject:self];
  if (currentIndex == 0 || currentIndex == NSNotFound) {
    return;
  }
  UIView *view = [viewsArray objectAtIndex:currentIndex - 1];
  if (![view isKindOfClass:[RCTBaseTextInputView class]]) {
    return;
  }
  RCTBaseTextInputView *textInput = (RCTBaseTextInputView *)view;
  [textInput setMarkdownEnabled:YES];
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = textInput.backedTextInputView;
  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)backedTextInputView;
    RCTBackedTextFieldDelegateAdapter *adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [adapter setMarkdownEnabled:YES];
  } else if ([backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    RCTUITextView *textView = (RCTUITextView *)backedTextInputView;
    [textView setMarkdownEnabled:YES];
  } else {
    NSLog(@"Cannot enable Markdown for this type of TextInput.");
  }
}

// TODO: call setMarkdownEnabled:NO

@end
