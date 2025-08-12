#import <RNLiveMarkdown/MentionBorderLayoutFragment.h>

static const CGFloat kCornerRadius = 5.0;

@implementation MentionBorderLayoutFragment

- (void)drawAtPoint:(CGPoint)point inContext:(CGContextRef)ctx {
    if (self.textLineFragments.count == 0) {
        [super drawAtPoint:point inContext:ctx];
        return;
    }

    [_markdownUtils.markdownStyle.mentionUserBackgroundColor setFill];

    UIBezierPath *fullPath = [UIBezierPath new];
    NSUInteger lineCount = self.textLineFragments.count;

    [self.textLineFragments enumerateObjectsUsingBlock:^(NSTextLineFragment * _Nonnull lineFragment, NSUInteger idx, BOOL * _Nonnull stop) {
        if (lineFragment.characterRange.length == 0) {
            return;
        }

        CGRect lineBounds = lineFragment.typographicBounds;
        CGRect paddedRect = CGRectInset(lineBounds, 0, 0);

        UIRectCorner cornersToRound = 0;
        if (lineCount == 1) {
            cornersToRound = UIRectCornerAllCorners;
        } else if (idx == 0) {
            cornersToRound = UIRectCornerTopLeft | UIRectCornerBottomLeft;
        } else if (idx == lineCount - 1) {
            cornersToRound = UIRectCornerTopRight | UIRectCornerBottomRight;
        }

        UIBezierPath *linePath = [UIBezierPath bezierPathWithRoundedRect:paddedRect
                                                       byRoundingCorners:cornersToRound
                                                             cornerRadii:CGSizeMake(kCornerRadius, kCornerRadius)];
        [fullPath appendPath:linePath];
    }];

    [fullPath fill];
    [super drawAtPoint:point inContext:ctx];
}

@end
