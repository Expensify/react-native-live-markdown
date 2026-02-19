#import "MarkdownBackedTextInputDelegate.h"

#import <objc/message.h>

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

// This method is added as a patch in the New Expensify app.
// See https://github.com/Expensify/App/blob/9a0afa06d2c35d6ef1928d944cf7d28c17dd2bb4/patches/react-native/react-native%2B0.81.4%2B011%2BAdd-onPaste-to-TextInput.patch
- (void)textInputDidPaste:(NSString *)type withData:(NSString *)data
{
  void (*func)(id, SEL, NSString*, NSString*) = (void (*)(id, SEL, NSString*, NSString*))objc_msgSend;
  func(_originalTextInputDelegate, @selector(textInputDidPaste:withData:), type, data);
}


- (void)textInputDidPaste:(NSArray<NSDictionary<NSString *, NSString *> *> *)items
{
  void (*func)(id, SEL, NSArray<NSDictionary<NSString *, NSString *> *> *) = (void (*)(id, SEL, NSArray<NSDictionary<NSString *, NSString *> *> *))objc_msgSend;
  func(_originalTextInputDelegate, @selector(textInputDidPaste:), items);
}
@end
