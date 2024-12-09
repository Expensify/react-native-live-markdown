#import <RNLiveMarkdown/MarkdownTextFieldObserver.h>
#import "react_native_assert.h"

@implementation MarkdownTextFieldObserver {
  RCTUITextField *_textField;
  RCTMarkdownUtils *_markdownUtils;
  BOOL _active;
}

- (instancetype)initWithTextField:(nonnull RCTUITextField *)textField markdownUtils:(nonnull RCTMarkdownUtils *)markdownUtils
{
  if ((self = [super init])) {
    react_native_assert(textField != nil);
    react_native_assert(markdownUtils != nil);

    _textField = textField;
    _markdownUtils = markdownUtils;
    _active = YES;
  }
  return self;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
  if (_active && ([keyPath isEqualToString:@"text"] || [keyPath isEqualToString:@"attributedText"])) {
    [self textFieldDidChange:_textField];
  }
}

- (void)textFieldDidChange:(__unused UITextField *)textField {
  react_native_assert(_textField.defaultTextAttributes != nil);

  if (_textField.markedTextRange != nil) {
    return; // skip formatting during multi-stage input to avoid breaking internal state
  }

  NSMutableAttributedString *attributedText = [textField.attributedText mutableCopy];
  [_markdownUtils applyMarkdownFormatting:attributedText withDefaultTextAttributes:_textField.defaultTextAttributes];

  UITextRange *textRange = _textField.selectedTextRange;
  _active = NO; // prevent recursion
  _textField.attributedText = attributedText;
  _active = YES;
  [_textField setSelectedTextRange:textRange notifyDelegate:NO];
}

@end
