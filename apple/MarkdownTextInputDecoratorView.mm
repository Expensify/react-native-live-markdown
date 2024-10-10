#import <React/RCTUITextField.h>
#import "react_native_assert.h"

#import <RNLiveMarkdown/MarkdownLayoutManager.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorView.h>
#import <RNLiveMarkdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <RNLiveMarkdown/RCTUITextView+Markdown.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#else
#import <RNLiveMarkdown/RCTBaseTextInputView+Markdown.h>
#endif /* RCT_NEW_ARCH_ENABLED */

#import <objc/runtime.h>

@implementation MarkdownTextInputDecoratorView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
  NSNumber *_parserId;
#ifdef RCT_NEW_ARCH_ENABLED
  __weak RCTTextInputComponentView *_textInput;
#else
  __weak RCTBaseTextInputView *_textInput;
#endif /* RCT_NEW_ARCH_ENABLED */
  __weak UIView<RCTBackedTextInputViewProtocol> *_backedTextInputView;
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
  UIView *view = [viewsArray objectAtIndex:currentIndex - 1];

#ifdef RCT_NEW_ARCH_ENABLED
  react_native_assert([view isKindOfClass:[RCTTextInputComponentView class]] && "Previous sibling component is not an instance of RCTTextInputComponentView.");
  _textInput = (RCTTextInputComponentView *)view;
  _backedTextInputView = [_textInput valueForKey:@"_backedTextInputView"];
#else
  react_native_assert([view isKindOfClass:[RCTBaseTextInputView class]] && "Previous sibling component is not an instance of RCTBaseTextInputView.");
  _textInput = (RCTBaseTextInputView *)view;
  _backedTextInputView = _textInput.backedTextInputView;
#endif /* RCT_NEW_ARCH_ENABLED */

  _markdownUtils = [[RCTMarkdownUtils alloc] init];
  react_native_assert(_markdownStyle != nil);
  [_markdownUtils setMarkdownStyle:_markdownStyle];
  [_markdownUtils setParserId:_parserId];

  [_textInput setMarkdownUtils:_markdownUtils];
  if ([_backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)_backedTextInputView;
    _adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [_adapter setMarkdownUtils:_markdownUtils];
  } else if ([_backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    _textView = (RCTUITextView *)_backedTextInputView;
    [_textView setMarkdownUtils:_markdownUtils];
    NSLayoutManager *layoutManager = _textView.layoutManager; // switching to TextKit 1 compatibility mode

    // Correct content height in TextKit 1 compatibility mode. (See https://github.com/Expensify/App/issues/41567)
    // Consider removing this fix if it is no longer needed after migrating to TextKit 2.
    CGSize contentSize = _textView.contentSize;
    CGRect textBounds = [layoutManager usedRectForTextContainer:_textView.textContainer];
    contentSize.height = textBounds.size.height + _textView.textContainerInset.top + _textView.textContainerInset.bottom;
    [_textView setContentSize:contentSize];

    layoutManager.allowsNonContiguousLayout = NO; // workaround for onScroll issue
    object_setClass(layoutManager, [MarkdownLayoutManager class]);
    [layoutManager setValue:_markdownUtils forKey:@"markdownUtils"];
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
  if (_textInput != nil) {
    [_textInput setMarkdownUtils:nil];
  }
  if (_adapter != nil) {
    [_adapter setMarkdownUtils:nil];
  }
  if (_textView != nil) {
    [_textView setMarkdownUtils:nil];
    if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
      [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
      object_setClass(_textView.layoutManager, [NSLayoutManager class]);
    }
  }
}

- (void)setMarkdownStyle:(RCTMarkdownStyle *)markdownStyle
{
  _markdownStyle = markdownStyle;
  [_markdownUtils setMarkdownStyle:markdownStyle];
  [self applyNewStyles];
}

- (void)setParserId:(NSNumber *)parserId
{
  _parserId = parserId;
  [_markdownUtils setParserId:parserId];
  [self applyNewStyles];
}

- (void)applyNewStyles
{
  if (_textView != nil) {
    // We want to use `textStorage` for applying markdown when possible. Currently it's only available for UITextView
    [_textView textDidChange];
  } else {
    // apply new styles
#ifdef RCT_NEW_ARCH_ENABLED
    [_textInput _setAttributedString:_backedTextInputView.attributedText];
#else
    [_textInput setAttributedText:_textInput.attributedText];
#endif /* RCT_NEW_ARCH_ENABLED */
  }
}

@end
