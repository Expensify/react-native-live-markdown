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
  // The following code removes NSParagraphStyle from typing attributes to fix the position of the cursor.
  NSParagraphStyle *paragraphStyle = _textView.typingAttributes[NSParagraphStyleAttributeName];
  if (paragraphStyle != nil && paragraphStyle.firstLineHeadIndent != 0) {
    NSMutableDictionary *newTypingAttributes = [_textView.typingAttributes mutableCopy];
    NSMutableParagraphStyle *newParagraphStyle = [paragraphStyle mutableCopy];
    newParagraphStyle.firstLineHeadIndent = 0;
    newParagraphStyle.headIndent = 0;
    newTypingAttributes[NSParagraphStyleAttributeName] = newParagraphStyle;
    _textView.typingAttributes = newTypingAttributes;
  }

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
