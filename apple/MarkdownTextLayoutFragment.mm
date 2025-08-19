#import <RNLiveMarkdown/MarkdownTextLayoutFragment.h>

@implementation MarkdownTextLayoutFragment

#pragma mark - overriding class methods

- (CGRect)renderingSurfaceBounds {
  if (self.depth == nil) {
    return [super renderingSurfaceBounds];
  }
  return CGRectUnion(self.boundingRect, [super renderingSurfaceBounds]);
}

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
  if (self.textLineFragments.count == 0) {
    [super drawAtPoint:point inContext:ctx];
    return;
  }
  
  [self drawRibbon];
  [self drawMentions];
  
  [super drawAtPoint:point inContext:ctx];
}

#pragma mark - drawing custom elements

- (void)drawRibbon {
  if (self.depth == nil) {
    return;
  }
  
  CGFloat marginLeft = _markdownUtils.markdownStyle.blockquoteMarginLeft;
  CGFloat borderWidth = _markdownUtils.markdownStyle.blockquoteBorderWidth;
  CGFloat paddingLeft = _markdownUtils.markdownStyle.blockquotePaddingLeft;
  CGFloat shift = marginLeft + borderWidth + paddingLeft;
  
  [_markdownUtils.markdownStyle.blockquoteBorderColor setFill];
  
  CGRect boundingRect = self.boundingRect;
  for (NSUInteger i = 0; i < [_depth unsignedIntValue]; ++i) {
    CGRect ribbonRect = CGRectMake(boundingRect.origin.x + i * shift, boundingRect.origin.y, borderWidth, boundingRect.size.height);
    UIRectFill(ribbonRect);
  }
}

- (void)drawMentions {
  NSMutableArray<RCTMarkdownTextBackgroundWithRange *> *mentions = [self getMentions];
  
  [self.textLineFragments enumerateObjectsUsingBlock:^(NSTextLineFragment * _Nonnull lineFragment, NSUInteger idx, BOOL * _Nonnull stop) {
    if (lineFragment.characterRange.length == 0) {
      return;
    }
    
    CGRect lineBounds = lineFragment.typographicBounds;
    for (RCTMarkdownTextBackgroundWithRange *mention in mentions) {
      NSRange intersection = NSIntersectionRange(lineFragment.characterRange, mention.range);
      if (intersection.length == 0) {
        continue;
      }
      
      BOOL isStart = (intersection.location == mention.range.location);
      BOOL isEnd = (NSMaxRange(intersection) == NSMaxRange(mention.range));
      
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
                                             cornerRadii:CGSizeMake(mention.textBackground.cornerRadius, mention.textBackground.cornerRadius)];
      
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
  
  fragmentTextBounds.origin.x -= (paddingLeft + borderWidth) + shift * ([_depth unsignedIntValue] - 1);
  fragmentTextBounds.size.width = borderWidth + shift * ([_depth unsignedIntValue] - 1);
  
  return fragmentTextBounds;
}

- (NSMutableArray<RCTMarkdownTextBackgroundWithRange *>*)getMentions {
  NSTextParagraph *paragraph = (NSTextParagraph *)self.textElement;
  NSAttributedString *attributedString = [paragraph attributedString];
  
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
  
  return mentions;
}

@end
