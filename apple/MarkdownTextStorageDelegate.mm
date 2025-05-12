#import <RNLiveMarkdown/MarkdownTextStorageDelegate.h>
#import "react_native_assert.h"

@implementation MarkdownTextStorageDelegate {
  RCTUITextView *_textView;
  RCTMarkdownUtils *_markdownUtils;
}

- (instancetype)initWithTextView:(nonnull RCTUITextView *)textView markdownUtils:(nonnull RCTMarkdownUtils *)markdownUtils
{
  if ((self = [super init])) {
    react_native_assert(textView != nil);
    react_native_assert(markdownUtils != nil);

    _textView = textView;
    _markdownUtils = markdownUtils;
  }
  return self;
}

- (void)textStorage:(NSTextStorage *)textStorage didProcessEditing:(NSTextStorageEditActions)editedMask range:(NSRange)editedRange changeInLength:(NSInteger)delta {
  react_native_assert(_textView.defaultTextAttributes != nil);

  [_markdownUtils applyMarkdownFormatting:textStorage withDefaultTextAttributes:_textView.defaultTextAttributes];
}

@end
