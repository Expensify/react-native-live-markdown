#import <RNLiveMarkdown/MarkdownTextStorageDelegate.h>

@implementation MarkdownTextStorageDelegate

- (void)textStorage:(NSTextStorage *)textStorage didProcessEditing:(NSTextStorageEditActions)editedMask range:(NSRange)editedRange changeInLength:(NSInteger)delta {
  react_native_assert(_markdownUtils != nil);
  react_native_assert(_textView != nil);
  react_native_assert(_textView.defaultTextAttributes != nil);

  [_markdownUtils applyFormatting:textStorage withDefaultTextAttributes:_textView.defaultTextAttributes];

  // TODO: fix cursor position when adding newline after a blockquote (probably not here though)
  // TODO: fix spellcheck not working for any of previous words when component value is controlled and contains bold (probably not here though)
}

@end
