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

- (void)textInputDidChangeSelection
{
  // Delegate the call to the original text input delegate
  [_originalTextInputDelegate textInputDidChangeSelection];

  // After adding a newline at the end of the blockquote, the typing attributes in the next line still contain
  // NSParagraphStyle with non-zero firstLineHeadIndent and headIntent added by `_updateTypingAttributes` call.
  // This causes the cursor to be shifted to the right instead of being located at the beginning of the line.
  // The following code resets firstLineHeadIndent and headIndent in NSParagraphStyle in typing attributes
  // in order to fix the position of the cursor.
  NSDictionary<NSAttributedStringKey, id> *typingAttributes = _textView.typingAttributes;
  if (typingAttributes[NSParagraphStyleAttributeName] != nil) {
    NSMutableDictionary *mutableTypingAttributes = [typingAttributes mutableCopy];
    NSMutableParagraphStyle *mutableParagraphStyle = [typingAttributes[NSParagraphStyleAttributeName] mutableCopy];
    mutableParagraphStyle.firstLineHeadIndent = 0;
    mutableParagraphStyle.headIndent = 0;
    mutableTypingAttributes[NSParagraphStyleAttributeName] = mutableParagraphStyle;
    _textView.typingAttributes = mutableTypingAttributes;
  }
}

// Delegate all remaining calls to the original text input delegate

- (void)textInputDidChange
{
  [_originalTextInputDelegate textInputDidChange];
}

- (void)textInputDidBeginEditing
{
  [_originalTextInputDelegate textInputDidBeginEditing];
}

- (void)textInputDidEndEditing
{
  [_originalTextInputDelegate textInputDidEndEditing];
}

- (void)textInputDidReturn
{
  [_originalTextInputDelegate textInputDidReturn];
}

- (BOOL)textInputShouldBeginEditing
{
  return [_originalTextInputDelegate textInputShouldBeginEditing];
}

- (nonnull NSString *)textInputShouldChangeText:(nonnull NSString *)text inRange:(NSRange)range
{
  return [_originalTextInputDelegate textInputShouldChangeText:text inRange:range];
}

- (BOOL)textInputShouldEndEditing
{
  return [_originalTextInputDelegate textInputShouldEndEditing];
}

- (BOOL)textInputShouldReturn
{
  return [_originalTextInputDelegate textInputShouldReturn];
}

- (BOOL)textInputShouldSubmitOnReturn
{
  return [_originalTextInputDelegate textInputShouldSubmitOnReturn];
}

@end
