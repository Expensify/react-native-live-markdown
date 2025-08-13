#import <RNLiveMarkdown/MentionBorderLayoutFragment.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

static const CGFloat kCornerRadius = 5.0;

@implementation MentionBorderLayoutFragment

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
    if (self.textLineFragments.count == 0) {
        [super drawAtPoint:point inContext:ctx];
        return;
    }

    [_markdownUtils.markdownStyle.mentionUserBackgroundColor setFill];

    UIBezierPath *fullPath = [UIBezierPath new];

    [self.textLineFragments enumerateObjectsUsingBlock:^(NSTextLineFragment * _Nonnull lineFragment, NSUInteger idx, BOOL * _Nonnull stop) {
        if (lineFragment.characterRange.length == 0) {
            return;
        }

        NSAttributedString *attributedString = [lineFragment attributedString];
        NSMutableArray<NSValue *> *rangesWithAttribute = [NSMutableArray array];
        [attributedString enumerateAttribute:RCTLiveMarkdownMentionUserAttributeName
                                     inRange:lineFragment.characterRange
                                     options:0
                                  usingBlock:^(id value, NSRange range, BOOL *stop) {
            if ([attributedString attribute:RCTLiveMarkdownMentionUserAttributeName atIndex:range.location effectiveRange:nil]) {
                [rangesWithAttribute addObject:[NSValue valueWithRange:range]];
            }
        }];

      for (NSValue *rangeValue in rangesWithAttribute) {
        NSRange range = [rangeValue rangeValue];
        CGRect lineBounds = lineFragment.typographicBounds;

        CGPoint startLocation = [lineFragment locationForCharacterAtIndex:range.location];
        CGPoint endLocation = [lineFragment locationForCharacterAtIndex:range.location + range.length];
        startLocation.y = idx*lineBounds.size.height;
        CGRect paddedRect = CGRect(startLocation, CGSize(endLocation.x-startLocation.x, lineBounds.size.height));

        UIRectCorner cornersToRound = UIRectCornerAllCorners;

        UIBezierPath *linePath = [UIBezierPath bezierPathWithRoundedRect:paddedRect
                                                       byRoundingCorners:cornersToRound
                                                             cornerRadii:CGSizeMake(kCornerRadius, kCornerRadius)];
        [fullPath appendPath:linePath];
      }
    }];

    [fullPath fill];
    [super drawAtPoint:point inContext:ctx];
}

@end
