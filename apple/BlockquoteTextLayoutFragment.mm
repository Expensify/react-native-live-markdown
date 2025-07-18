#import <RNLiveMarkdown/BlockquoteTextLayoutFragment.h>

@implementation BlockquoteTextLayoutFragment

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

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
  CGFloat marginLeft = _markdownUtils.markdownStyle.blockquoteMarginLeft;
  CGFloat borderWidth = _markdownUtils.markdownStyle.blockquoteBorderWidth;
  CGFloat paddingLeft = _markdownUtils.markdownStyle.blockquotePaddingLeft;
  CGFloat shift = marginLeft + borderWidth + paddingLeft;

  [_markdownUtils.markdownStyle.blockquoteBorderColor setFill];

  CGRect boundingRect = self.boundingRect;
  for (NSUInteger i = 0; i < _depth; ++i) {
    CGRect ribbonRect = CGRectMake(boundingRect.origin.x + i * shift, boundingRect.origin.y, borderWidth, boundingRect.size.height);
    UIRectFill(ribbonRect);
  }

  [super drawAtPoint:point inContext:ctx];
}

- (CGRect)renderingSurfaceBounds {
  return CGRectUnion(self.boundingRect, [super renderingSurfaceBounds]);
}

@end
