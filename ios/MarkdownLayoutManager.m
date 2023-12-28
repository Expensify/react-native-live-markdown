#import <react-native-markdown-text-input/MarkdownLayoutManager.h>

@implementation MarkdownLayoutManager

- (void)drawBackgroundForGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin {
  [super drawBackgroundForGlyphRange:glyphsToShow atPoint:origin];

  [self enumerateLineFragmentsForGlyphRange:glyphsToShow usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
    __block BOOL isQuote = NO;
    RCTMarkdownUtils *markdownUtils = [self valueForKey:@"markdownUtils"];
    [markdownUtils.quoteRanges enumerateObjectsUsingBlock:^(NSValue *item, NSUInteger idx, BOOL * _Nonnull stop) {
      NSRange range = [item rangeValue];
      NSUInteger start = range.location;
      NSUInteger end = start + range.length;
      NSUInteger location = glyphRange.location;
      if (location >= start && location < end) {
        isQuote = YES;
        *stop = YES;
      }
    }];
    if (isQuote) {
      CGRect lineRect = CGRectMake(5, rect.origin.y + 5, 5, rect.size.height);
      [[UIColor lightGrayColor] setFill];
      UIRectFill(lineRect);
    }
  }];
}

@end
