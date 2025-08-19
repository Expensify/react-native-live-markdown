#import <RNLiveMarkdown/MarkdownTextLayoutManagerDelegate.h>
#import <RNLiveMarkdown/MarkdownTextLayoutFragment.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

@implementation MarkdownTextLayoutManagerDelegate

- (NSTextLayoutFragment *)textLayoutManager:(NSTextLayoutManager *)textLayoutManager textLayoutFragmentForLocation:(id <NSTextLocation>)location inTextElement:(NSTextElement *)textElement
API_AVAILABLE(ios(15.0)){
  NSInteger index = [textLayoutManager offsetFromLocation:textLayoutManager.documentRange.location toLocation:location];
  if (index < self.textStorage.length) {
    NSNumber *depth = [self.textStorage attribute:RCTLiveMarkdownBlockquoteDepthAttributeName atIndex:index effectiveRange:nil];
    
    NSAttributedString *attributedString = [(NSTextParagraph *)textElement attributedString];
    NSMutableArray<RCTMarkdownTextBackgroundWithRange *> *mentions = [NSMutableArray array];
    [attributedString enumerateAttribute:RCTLiveMarkdownTextBackgroundAttributeName
                                 inRange:NSMakeRange(0, attributedString.length)
                                 options:0
                              usingBlock:^(id value, NSRange range, BOOL *stop) {
      if (value) {
        RCTMarkdownTextBackgroundWithRange *textBackgroundWithRange = [[RCTMarkdownTextBackgroundWithRange alloc] init];
        textBackgroundWithRange.textBackground = value;
        textBackgroundWithRange.range = range;
        
        [mentions addObject:textBackgroundWithRange];
      }
    }];
    
    if (depth != nil || mentions.count > 0) {
      MarkdownTextLayoutFragment *textLayoutFragment = [[MarkdownTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
      textLayoutFragment.markdownUtils = _markdownUtils;
      textLayoutFragment.depth = depth != nil ? [depth unsignedIntValue] : 0;
      textLayoutFragment.mentions = mentions;
      return textLayoutFragment;
    }
  }
  return [[NSTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
}

@end
