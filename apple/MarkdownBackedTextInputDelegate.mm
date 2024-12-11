#import "MarkdownBackedTextInputDelegate.h"

@implementation MarkdownBackedTextInputDelegate {
  __weak RCTUITextView *_textView;
  id<RCTBackedTextInputDelegate> _originalTextInputDelegate;
}

- (instancetype)initWithTextView:(RCTUITextView *)textView
{
  if (self = [super init]) {
    _textView = textView;
    _originalTextInputDelegate = _textView.textInputDelegate;
    _textView.textInputDelegate = self;
  }
  return self;
}

- (void)dealloc
{
  // Restore original text input delegate
  _textView.textInputDelegate = _originalTextInputDelegate;
}

- (void)textInputDidChange
{
  // After adding a newline at the end of the blockquote, the typing attributes in the new line
  // still contain NSParagraphStyle with non-zero firstLineHeadIndent and headIntent.
  // This causes the cursor to be shifted to the right instead of being located at the beginning of the line.
  // Also, if the previous line of the text ends with a link, there will be underline blinks visible while typing.
  // The following code resets default text attributes to fix both problems at once.
  // It seems like the setter performs deep comparision, so we differentiate the new value using a counter,
  // otherwise this trick would work only once.
  static NSAttributedStringKey RCTLiveMarkdownForceUpdateAttributeName = @"RCTLiveMarkdownForceUpdate";
  static NSUInteger counter = 0;
  NSMutableDictionary *defaultTextAttributes = [_textView.defaultTextAttributes mutableCopy];
  defaultTextAttributes[RCTLiveMarkdownForceUpdateAttributeName] = @(counter++);
  _textView.defaultTextAttributes = defaultTextAttributes;

  // Delegate the call to the original text input delegate
  [_originalTextInputDelegate textInputDidChange];
}

// Delegate all remaining calls to the original text input delegate

- (void)textInputDidBeginEditing {
  [_originalTextInputDelegate textInputDidBeginEditing];
}

- (void)textInputDidChangeSelection {
  [_originalTextInputDelegate textInputDidChangeSelection];
}

- (void)textInputDidEndEditing {
  [_originalTextInputDelegate textInputDidEndEditing];
}

- (void)textInputDidReturn {
  [_originalTextInputDelegate textInputDidReturn];
}

- (BOOL)textInputShouldBeginEditing {
  return [_originalTextInputDelegate textInputShouldBeginEditing];
}

- (nonnull NSString *)textInputShouldChangeText:(nonnull NSString *)text inRange:(NSRange)range {
  return [_originalTextInputDelegate textInputShouldChangeText:text inRange:range];
}

- (BOOL)textInputShouldEndEditing {
  return [_originalTextInputDelegate textInputShouldEndEditing];
}

- (BOOL)textInputShouldReturn {
  return [_originalTextInputDelegate textInputShouldReturn];
}

- (BOOL)textInputShouldSubmitOnReturn {
  return [_originalTextInputDelegate textInputShouldSubmitOnReturn];
}

@end
