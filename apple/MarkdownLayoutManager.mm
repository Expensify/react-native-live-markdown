#import <RNLiveMarkdown/MarkdownLayoutManager.h>

@implementation MarkdownLayoutManager

- (void)drawBackgroundForGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin {
  [super drawBackgroundForGlyphRange:glyphsToShow atPoint:origin];

  NSTextStorage *textStorage = self.textStorage;

  [self enumerateLineFragmentsForGlyphRange:glyphsToShow usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
    NSNumber *depth = [textStorage attribute:RCTLiveMarkdownBlockquoteDepthAttributeName atIndex:glyphRange.location effectiveRange:nil];
    if (depth == nil) {
      return; // not a blockquote
    }

    RCTMarkdownUtils *markdownUtils = [self valueForKey:@"markdownUtils"];
    CGFloat paddingLeft = origin.x;
    CGFloat paddingTop = origin.y;
    CGFloat y = paddingTop + rect.origin.y;
    CGFloat width = markdownUtils.markdownStyle.blockquoteBorderWidth;
    CGFloat height = rect.size.height;
    CGFloat shift = markdownUtils.markdownStyle.blockquoteMarginLeft + markdownUtils.markdownStyle.blockquoteBorderWidth + markdownUtils.markdownStyle.blockquotePaddingLeft;
  
    for (NSUInteger level = 0; level < [depth unsignedIntValue]; level++) {
      CGFloat x = paddingLeft + (level * shift) + markdownUtils.markdownStyle.blockquoteMarginLeft;
      CGRect lineRect = CGRectMake(x, y, width, height);
      [markdownUtils.markdownStyle.blockquoteBorderColor setFill];
      UIRectFill(lineRect);
    }
  }];
}

@end
