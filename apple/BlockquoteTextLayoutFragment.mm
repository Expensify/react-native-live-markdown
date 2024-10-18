#import <RNLiveMarkdown/BlockquoteTextLayoutFragment.h>

@implementation BlockquoteTextLayoutFragment

- (CGRect)ribbonRect {
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
  fragmentTextBounds.origin.x -= _markdownUtils.markdownStyle.blockquoteMarginLeft + _markdownUtils.markdownStyle.blockquoteBorderWidth + _markdownUtils.markdownStyle.blockquotePaddingLeft;
  fragmentTextBounds.size.width = _markdownUtils.markdownStyle.blockquoteBorderWidth;
  // TODO: draw multiple ribbons for nested blockquotes
  return fragmentTextBounds;
}

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
  [[UIColor blueColor] setFill];
  UIRectFill(self.ribbonRect);
  [super drawAtPoint:point inContext:ctx];
}

- (CGRect)renderingSurfaceBounds {
  return CGRectUnion(self.ribbonRect, [super renderingSurfaceBounds]);
}

@end
