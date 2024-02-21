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
      CGFloat x = paddingLeft + markdownUtils.markdownStyle.blockquoteMarginLeft;
      CGFloat y = paddingTop + rect.origin.y;
      CGFloat width = markdownUtils.markdownStyle.blockquoteBorderWidth;
      CGFloat height = rect.size.height;
      CGFloat shift = paddingLeft + width + markdownUtils.markdownStyle.blockquoteMarginLeft;

      for(int level = 0; level < currentDepth; level++) {
        CGRect lineRect = CGRectMake(x + (level * shift), y, width, height);
        [markdownUtils.markdownStyle.blockquoteBorderColor setFill];
        UIRectFill(lineRect);
      }
    }
  }];
}

@end
