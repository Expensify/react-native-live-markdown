#import <RNLiveMarkdown/MarkdownTextLayoutManagerDelegate.h>
#import <RNLiveMarkdown/MarkdownTextLayoutFragment.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

@implementation MarkdownTextLayoutManagerDelegate

- (NSTextLayoutFragment *)textLayoutManager:(NSTextLayoutManager *)textLayoutManager textLayoutFragmentForLocation:(id <NSTextLocation>)location inTextElement:(NSTextElement *)textElement
API_AVAILABLE(ios(15.0)){
  NSInteger index = [textLayoutManager offsetFromLocation:textLayoutManager.documentRange.location toLocation:location];
  if (index < self.textStorage.length) {
    NSNumber *depth = [self.textStorage attribute:RCTLiveMarkdownBlockquoteDepthAttributeName atIndex:index effectiveRange:nil];
    BOOL hasMention = [self hasMention:textElement];
    
    if (depth != nil || hasMention) {
      MarkdownTextLayoutFragment *textLayoutFragment = [[MarkdownTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
      textLayoutFragment.markdownUtils = _markdownUtils;
      textLayoutFragment.depth = depth;
      return textLayoutFragment;
    }
  }
  return [[NSTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
}

- (BOOL)hasMention:(NSTextElement *)textElement {
  NSTextParagraph *paragraph = (NSTextParagraph *)textElement;
  NSAttributedString *attributedString = [paragraph attributedString];
  
  __block BOOL hasMention = NO;
  [attributedString enumerateAttribute:RCTLiveMarkdownMentionAttributeName
                               inRange:NSMakeRange(0, attributedString.length)
                               options:0
                            usingBlock:^(id value, NSRange range, BOOL *stop) {
    if (value) {
      hasMention = YES;
      *stop = YES;
    }
  }];
  
  return hasMention;
}

@end
