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
    [self applyMarkdownFormatting];
  }
}

- (void)textFieldDidChange:(__unused UITextField *)textField
{
  [self applyMarkdownFormatting];
}

- (void)textFieldDidEndEditing:(__unused UITextField *)textField
{
  // In order to prevent iOS from applying underline to the whole text if text ends with a link on blur,
  // we need to update `defaultTextAttributes` which at this point doesn't contain NSUnderline attribute yet.
  // It seems like the setter performs deep comparision, so we differentiate the new value using a counter,
  // otherwise this trick would work only once.
  static NSAttributedStringKey RCTLiveMarkdownForceUpdateAttributeName = @"RCTLiveMarkdownForceUpdate";
  static NSUInteger counter = 0;
  NSMutableDictionary *defaultTextAttributes = [_textField.defaultTextAttributes mutableCopy];
  defaultTextAttributes[RCTLiveMarkdownForceUpdateAttributeName] = @(counter++);
  _textField.defaultTextAttributes = defaultTextAttributes;
  [self applyMarkdownFormatting];
}

- (void)applyMarkdownFormatting
{
  react_native_assert(_textField.defaultTextAttributes != nil);

  if (_textField.markedTextRange != nil) {
    return; // skip formatting during multi-stage input to avoid breaking internal state
  }

  NSMutableAttributedString *attributedText = [_textField.attributedText mutableCopy];
  [_markdownUtils applyMarkdownFormatting:attributedText withDefaultTextAttributes:_textField.defaultTextAttributes];

  UITextRange *textRange = _textField.selectedTextRange;

  _active = NO; // prevent recursion
  _textField.attributedText = attributedText;
  _active = YES;
  
  // Restore cursor position
  [_textField setSelectedTextRange:textRange notifyDelegate:NO];

  // Eliminate underline blinks while typing if previous text ends with a link
  _textField.typingAttributes = _textField.defaultTextAttributes;
}

@end
