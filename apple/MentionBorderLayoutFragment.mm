#import <RNLiveMarkdown/MentionBorderLayoutFragment.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

static const CGFloat kCornerRadius = 5.0;

@implementation MentionBorderLayoutFragment

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
  if (self.textLineFragments.count == 0) {
    [super drawAtPoint:point inContext:ctx];
    return;
  }
  
  NSAttributedString *attributedString = [self.textLineFragments.firstObject attributedString];
  NSMutableArray<NSValue *> *mentionRanges = [NSMutableArray array];
  [attributedString enumerateAttribute:RCTLiveMarkdownMentionUserAttributeName
                               inRange:NSMakeRange(0, attributedString.length)
                               options:0
                            usingBlock:^(id value, NSRange range, BOOL *stop) {
    if (value) {
      [mentionRanges addObject:[NSValue valueWithRange:range]];
    }
  }];
  
  [_markdownUtils.markdownStyle.mentionUserBackgroundColor setFill];
  UIBezierPath *fullPath = [UIBezierPath new];
  
  [self.textLineFragments enumerateObjectsUsingBlock:^(NSTextLineFragment * _Nonnull lineFragment, NSUInteger idx, BOOL * _Nonnull stop) {
    if (lineFragment.characterRange.length == 0) {
      return;
    }
    
    CGRect lineBounds = lineFragment.typographicBounds;
    for (NSValue *rangeValue in mentionRanges) {
      NSRange mentionRange = [rangeValue rangeValue];
      NSRange intersection = NSIntersectionRange(lineFragment.characterRange, mentionRange);
      if (intersection.length == 0) {
        continue;
      }
      
      BOOL isStart = (intersection.location == mentionRange.location);
      BOOL isEnd = (NSMaxRange(intersection) == NSMaxRange(mentionRange));
      
      CGPoint startLocation = [lineFragment locationForCharacterAtIndex:intersection.location];
      CGPoint endLocation = [lineFragment locationForCharacterAtIndex:intersection.location + intersection.length];
      
      CGRect paddedRect = CGRectMake(startLocation.x,
                                     lineBounds.origin.y,
                                     endLocation.x - startLocation.x,
                                     lineBounds.size.height);
      
      UIRectCorner cornersToRound = 0;
      if (isStart && isEnd) {
        cornersToRound = UIRectCornerAllCorners;
      } else if (isStart) {
        cornersToRound = (UIRectCornerTopLeft | UIRectCornerBottomLeft);
      } else if (isEnd) {
        cornersToRound = (UIRectCornerTopRight | UIRectCornerBottomRight);
      }
      
      UIBezierPath *linePath;
      linePath = [UIBezierPath bezierPathWithRoundedRect:paddedRect
                                       byRoundingCorners:cornersToRound
                                             cornerRadii:CGSizeMake(kCornerRadius, kCornerRadius)];
      
      [fullPath appendPath:linePath];
    }
  }];
  
  [fullPath fill];
  [super drawAtPoint:point inContext:ctx];
}

@end
