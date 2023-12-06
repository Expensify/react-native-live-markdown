#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTUITextField.h>
#import <React/RCTBaseTextInputView.h>
#import <objc/runtime.h>
#import "RCTBridge.h"
#import "Utils.h"

#import <react-native-markdown-text-input/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <react-native-markdown-text-input/RCTBaseTextInputView+Markdown.h>
#import <react-native-markdown-text-input/RCTUITextView+Markdown.h>
#import <react-native-markdown-text-input/RCTMarkdownUtils.h>

@interface MarkdownTextInputView : UIView
@end

@implementation MarkdownTextInputView

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

@interface MarkdownTextInputViewManager : RCTViewManager
@end

@implementation MarkdownTextInputViewManager

RCT_EXPORT_MODULE(MarkdownTextInputView)

- (UIView *)view
{
  return [[MarkdownTextInputView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(color, NSString, UIView)
{
  [view setBackgroundColor: [Utils hexStringToColor:json]];
}

@end
