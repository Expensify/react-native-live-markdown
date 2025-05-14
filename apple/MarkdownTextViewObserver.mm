#import <RNLiveMarkdown/MarkdownTextViewObserver.h>
#import "react_native_assert.h"

@implementation MarkdownTextViewObserver {
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

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSKeyValueChangeKey,id> *)change context:(void *)context
{
  if ([keyPath isEqualToString:@"defaultTextAttributes"]) {
    [_textView.textStorage setAttributedString:_textView.attributedText];
  }
}

@end
