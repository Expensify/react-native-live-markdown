#import <RNLiveMarkdown/MarkdownTextLayoutManagerDelegate.h>
#import <RNLiveMarkdown/BlockquoteTextLayoutFragment.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>
#import <RNLiveMarkdown/MentionBorderLayoutFragment.h>

@implementation MarkdownTextLayoutManagerDelegate

- (NSTextLayoutFragment *)textLayoutManager:(NSTextLayoutManager *)textLayoutManager textLayoutFragmentForLocation:(id <NSTextLocation>)location inTextElement:(NSTextElement *)textElement
API_AVAILABLE(ios(15.0)){
  NSInteger index = [textLayoutManager offsetFromLocation:textLayoutManager.documentRange.location toLocation:location];
  if (index < self.textStorage.length) {
    NSNumber *depth = [self.textStorage attribute:RCTLiveMarkdownBlockquoteDepthAttributeName atIndex:index effectiveRange:nil];
    if (depth != nil) {
      BlockquoteTextLayoutFragment *textLayoutFragment = [[BlockquoteTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
      textLayoutFragment.markdownUtils = _markdownUtils;
      textLayoutFragment.depth = [depth unsignedIntValue];
      return textLayoutFragment;
    }

    NSNumber *isMentionUser = [self.textStorage attribute:RCTLiveMarkdownMentionUserAttributeName atIndex:index effectiveRange:nil];
    if (isMentionUser) {
      MentionBorderLayoutFragment *textLayoutFragment = [[MentionBorderLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
      textLayoutFragment.markdownUtils = _markdownUtils;
      return textLayoutFragment;
    }
  }
  return [[NSTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
}

@end
