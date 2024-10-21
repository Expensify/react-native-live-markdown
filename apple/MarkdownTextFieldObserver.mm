#import <RNLiveMarkdown/MarkdownTextFieldObserver.h>
#import "react_native_assert.h"

@implementation MarkdownTextFieldObserver

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
  react_native_assert(_textField != nil);

  if (_active && ([keyPath isEqualToString:@"text"] || [keyPath isEqualToString:@"attributedText"])) {
    [self textFieldDidChange:_textField];
  }
}

- (void)textFieldDidChange:(__unused UITextField *)textField {
  react_native_assert(_markdownUtils != nil);
  react_native_assert(_textField != nil);
  react_native_assert(_textField.defaultTextAttributes != nil);

  if (_textField.markedTextRange != nil) {
    return; // skip formatting during multi-stage input to avoid breaking internal state
  }

  NSMutableAttributedString *attributedText = [textField.attributedText mutableCopy];
  [_markdownUtils applyFormatting:attributedText withDefaultTextAttributes:_textField.defaultTextAttributes];

  UITextRange *textRange = _textField.selectedTextRange;
  _active = NO; // prevent recursion
  _textField.attributedText = attributedText;
  _active = YES;
  [_textField setSelectedTextRange:textRange notifyDelegate:NO];
}

@end
