#import <react-native-live-markdown/MarkdownLayoutManager.h>

@implementation MarkdownLayoutManager

- (void)drawBackgroundForGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin {
  [super drawBackgroundForGlyphRange:glyphsToShow atPoint:origin];

  [self enumerateLineFragmentsForGlyphRange:glyphsToShow usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
    __block int nestingLevel = 0;
    RCTMarkdownUtils *markdownUtils = [self valueForKey:@"markdownUtils"];
    [markdownUtils.blockquoteRanges enumerateObjectsUsingBlock:^(NSValue *item, NSUInteger idx, BOOL * _Nonnull stop) {
      NSRange range = [item rangeValue];
      NSUInteger start = range.location - (nestingLevel * 2); // compensate for the `>` syntax which is not included in range (with optional space after `>`)
      NSUInteger end = start + range.length;
      NSUInteger location = glyphRange.location;
      if (location >= start && location < end) {
          nestingLevel++;
      }
    }];
    if (nestingLevel > 0) {
      CGFloat paddingLeft = markdownUtils.backedTextInputView.textContainerInset.left;
      CGFloat paddingTop = markdownUtils.backedTextInputView.textContainerInset.top;
      CGFloat x = paddingLeft + markdownUtils.markdownStyle.blockquoteMarginLeft;
      CGFloat y = paddingTop + rect.origin.y;
      CGFloat width = markdownUtils.markdownStyle.blockquoteBorderWidth;
      CGFloat height = rect.size.height;

      CGFloat nestShift = paddingLeft + width + markdownUtils.markdownStyle.blockquoteMarginLeft;
        
      for(int strip = 0; strip < nestingLevel; strip++) {
        CGRect lineRect = CGRectMake(x + (strip * nestShift), y, width, height);
        [markdownUtils.markdownStyle.blockquoteBorderColor setFill];
        UIRectFill(lineRect);
      }
    }
  }];
}

@end
