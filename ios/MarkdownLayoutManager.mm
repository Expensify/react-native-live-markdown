#import <RNLiveMarkdown/MarkdownLayoutManager.h>

@implementation MarkdownLayoutManager

- (void)drawBackgroundForGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin {
  [super drawBackgroundForGlyphRange:glyphsToShow atPoint:origin];

  [self enumerateLineFragmentsForGlyphRange:glyphsToShow usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
    __block BOOL isBlockquote = NO;
    __block int currentDepth = 0;
    RCTMarkdownUtils *markdownUtils = [self valueForKey:@"markdownUtils"];
    [markdownUtils.leveledBlockquoteRanges enumerateObjectsUsingBlock:^(NSDictionary *item, NSUInteger idx, BOOL * _Nonnull stop) {
      NSRange range = [[item valueForKey:@"range"] rangeValue];
      currentDepth = [[item valueForKey:@"depth"] unsignedIntegerValue];
      NSUInteger start = range.location;
      NSUInteger end = start + range.length;
      NSUInteger location = glyphRange.location;
      if (location >= start && location < end) {
        isBlockquote = YES;
        *stop = YES;
      }
    }];
    if (isBlockquote) {
      CGFloat paddingLeft = markdownUtils.backedTextInputView.textContainerInset.left;
      CGFloat paddingTop = markdownUtils.backedTextInputView.textContainerInset.top;
      CGFloat y = paddingTop + rect.origin.y;
      CGFloat width = markdownUtils.markdownStyle.blockquoteBorderWidth;
      CGFloat height = rect.size.height;
      CGFloat shift = markdownUtils.markdownStyle.blockquoteMarginLeft + markdownUtils.markdownStyle.blockquoteBorderWidth + markdownUtils.markdownStyle.blockquotePaddingLeft;
      for(int level = 0; level < currentDepth; level++) {
        CGFloat x = paddingLeft + markdownUtils.markdownStyle.blockquoteMarginLeft + (level * shift);
        CGRect lineRect = CGRectMake(x, y, width, height);
        [markdownUtils.markdownStyle.blockquoteBorderColor setFill];
        UIRectFill(lineRect);
      }
    }
  }];
}

@end
