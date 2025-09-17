#import <RNLiveMarkdown/MarkdownTextLayoutFragment.h>
#import <RNLiveMarkdown/RCTMarkdownTextBackgroundUtils.h>

@implementation MarkdownTextLayoutFragment

#pragma mark - overriding class methods

- (CGRect)renderingSurfaceBounds {
  if (self.depth == 0) {
    return [super renderingSurfaceBounds];
  }
  return CGRectUnion(self.boundingRect, [super renderingSurfaceBounds]);
}

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
  if (self.textLineFragments.count == 0) {
    [super drawAtPoint:point inContext:ctx];
    return;
  }
  
  [self drawBlockquoteRibbons];
  [self drawMentions];
  
  [super drawAtPoint:point inContext:ctx];
}

#pragma mark - drawing custom elements

- (void)drawBlockquoteRibbons {
  if (self.depth == 0) {
    return;
  }
  
  CGFloat marginLeft = _markdownUtils.markdownStyle.blockquoteMarginLeft;
  CGFloat borderWidth = _markdownUtils.markdownStyle.blockquoteBorderWidth;
  CGFloat paddingLeft = _markdownUtils.markdownStyle.blockquotePaddingLeft;
  CGFloat shift = marginLeft + borderWidth + paddingLeft;
  
  [_markdownUtils.markdownStyle.blockquoteBorderColor setFill];
  
  CGRect boundingRect = self.boundingRect;
  for (NSUInteger level = 0; level < _depth; ++level) {
    CGFloat x = boundingRect.origin.x + level * shift;
    CGRect ribbonRect = CGRectMake(x, boundingRect.origin.y, borderWidth, boundingRect.size.height);
    UIRectFill(ribbonRect);
  }
}

- (void)drawMentions {
  if (self.mentions.count == 0) {
    return;
  }
  
  [self.textLineFragments enumerateObjectsUsingBlock:^(NSTextLineFragment * _Nonnull lineFragment, NSUInteger idx, BOOL * _Nonnull stop) {
    if (lineFragment.characterRange.length == 0) {
      return;
    }
    
    CGRect lineBounds = lineFragment.typographicBounds;
    for (RCTMarkdownTextBackgroundWithRange *mention in self.mentions) {
      NSRange intersection = NSIntersectionRange(lineFragment.characterRange, mention.range);
      if (intersection.length == 0) {
        continue;
      }
      
      CGPoint startLocation = [lineFragment locationForCharacterAtIndex:intersection.location];
      CGPoint endLocation = [lineFragment locationForCharacterAtIndex:intersection.location + intersection.length];
      CGFloat width = endLocation.x - startLocation.x;
      CGFloat x = lineBounds.origin.x + startLocation.x;
      
      CGRect backgroundRect = CGRectMake(x,
                                         lineBounds.origin.y,
                                         width,
                                         lineBounds.size.height);
      
      BOOL isStart = (intersection.location == mention.range.location);
      BOOL isEnd = (NSMaxRange(intersection) == NSMaxRange(mention.range));
      UIRectCorner cornersToRound = 0;
      if (isStart) {
        cornersToRound |= UIRectCornerTopLeft | UIRectCornerBottomLeft;
      }
      if (isEnd) {
        cornersToRound |= UIRectCornerTopRight | UIRectCornerBottomRight;
      }
      
      UIBezierPath *linePath = (cornersToRound == 0)
      ? [UIBezierPath bezierPathWithRect:backgroundRect]
      : [UIBezierPath bezierPathWithRoundedRect:backgroundRect
                              byRoundingCorners:cornersToRound
                                    cornerRadii:CGSizeMake(mention.textBackground.borderRadius,
                                                           mention.textBackground.borderRadius)];
      
      [mention.textBackground.color setFill];
      [linePath fill];
    }
  }];
}

#pragma mark - helper functions

- (CGRect)boundingRect {
  CGRect fragmentTextBounds = CGRectNull;
  for (NSTextLineFragment *lineFragment in self.textLineFragments) {
    if (lineFragment.characterRange.length == 0) {
      continue;
    }
    CGRect lineFragmentBounds = lineFragment.typographicBounds;
    if (CGRectIsNull(fragmentTextBounds)) {
      fragmentTextBounds = lineFragmentBounds;
    } else {
      fragmentTextBounds = CGRectUnion(fragmentTextBounds, lineFragmentBounds);
    }
  }
  
  CGFloat marginLeft = _markdownUtils.markdownStyle.blockquoteMarginLeft;
  CGFloat borderWidth = _markdownUtils.markdownStyle.blockquoteBorderWidth;
  CGFloat paddingLeft = _markdownUtils.markdownStyle.blockquotePaddingLeft;
  CGFloat shift = marginLeft + borderWidth + paddingLeft;
  
  fragmentTextBounds.origin.x -= (paddingLeft + borderWidth) + shift * (_depth - 1);
  fragmentTextBounds.size.width = borderWidth + shift * (_depth - 1);
  
  return fragmentTextBounds;
}

@end
