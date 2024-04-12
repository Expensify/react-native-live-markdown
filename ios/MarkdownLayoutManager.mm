#import <RNLiveMarkdown/MarkdownLayoutManager.h>

@implementation MarkdownLayoutManager

- (BOOL)isRange:(NSRange)smallerRange inRange:(NSRange)largerRange {
    NSUInteger start = smallerRange.location;
    NSUInteger end = start + smallerRange.length;
    NSUInteger location = largerRange.location;
    return location >= start && location < end;
}

- (CGRect)rectByAddingPadding:(CGFloat)padding toRect:(CGRect)rect {
    rect.origin.x -= padding;
    rect.origin.y -= padding;
    rect.size.width += padding * 2;
    rect.size.height += padding * 2;
    return rect;
}

- (void)drawBackgroundForGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin {
    [super drawBackgroundForGlyphRange:glyphsToShow atPoint:origin];

    RCTMarkdownStyle *style = [_markdownUtils markdownStyle];
    [self drawBlockquotesForRanges:[_markdownUtils blockquoteRangesAndLevels] andGlyphRange:glyphsToShow atPoint:origin withColor:[style blockquoteBorderColor] width:[style blockquoteBorderWidth] margin:[style blockquoteMarginLeft] andPadding:[style blockquotePaddingLeft]];
    [self drawPreBackgroundForRanges:[_markdownUtils preRanges] atPoint:origin withColor:[style preBackgroundColor] borderColor:[style preBorderColor] borderWidth:[style preBorderWidth] borderRadius:[style preBorderRadius] andPadding:[style prePadding]];
    [self drawCodeBackgroundForRanges:[_markdownUtils codeRanges] atPoint:origin withColor:[style codeBackgroundColor] borderColor:[style codeBorderColor] borderWidth:[style codeBorderWidth] borderRadius:[style codeBorderRadius] andPadding:[style codePadding]];
}

- (void)drawBlockquotesForRanges:(NSArray<NSDictionary*>*)ranges andGlyphRange:(NSRange)glyphsToShow atPoint:(CGPoint)origin withColor:(UIColor*)color width:(CGFloat)width margin:(CGFloat)margin andPadding:(CGFloat)padding {
    [self enumerateLineFragmentsForGlyphRange:glyphsToShow usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
        __block BOOL isBlockquote = NO;
        __block int currentDepth = 0;

        [ranges enumerateObjectsUsingBlock:^(NSDictionary *item, NSUInteger idx, BOOL * _Nonnull stop) {
            NSRange range = [[item valueForKey:@"range"] rangeValue];
            currentDepth = [[item valueForKey:@"depth"] unsignedIntegerValue];
            if ([self isRange:range inRange:glyphRange]) {
                isBlockquote = YES;
                *stop = YES;
            }
        }];
        if (isBlockquote) {
            CGFloat paddingLeft = origin.x;
            CGFloat paddingTop = origin.y;
            CGFloat y = paddingTop + rect.origin.y;
            CGFloat height = rect.size.height;
            CGFloat shift = margin + width + padding;
            for (int level = 0; level < currentDepth; level++) {
                CGFloat x =  paddingLeft + (level * shift) + margin;
                CGRect lineRect = CGRectMake(x, y, width, height);
                [color setFill];
                UIRectFill(lineRect);
            }
        }
    }];
}

- (void)drawPreBackgroundForRanges:(NSArray<NSValue*>*)ranges atPoint:(CGPoint)origin withColor:(UIColor*)backgroundColor borderColor:(UIColor*)borderColor borderWidth:(CGFloat)borderWidth borderRadius:(CGFloat)borderRadius andPadding:(CGFloat)padding {
    __block CGRect preRect = CGRectNull;
    [ranges enumerateObjectsUsingBlock:^(NSValue *item, NSUInteger idx, BOOL * _Nonnull stop) {
        NSRange range = [item rangeValue];
        range.location += 1;
        range.length -= 1;

        [self enumerateLineFragmentsForGlyphRange:range usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
            if (CGRectIsNull(preRect)) {
                preRect = usedRect;
                CGFloat paddingLeft = origin.x;
                preRect.origin.x += paddingLeft;
                CGFloat paddingTop = origin.y;
                preRect.origin.y += paddingTop;
            } else {
                CGFloat usedWidth = usedRect.size.width;
                if (usedWidth > preRect.size.width) {
                    preRect.size.width = usedWidth;
                }
                preRect.size.height += usedRect.size.height;
            }
        }];

        if (!CGRectIsNull(preRect)) {
            preRect = [self rectByAddingPadding:padding toRect:preRect];
            [self drawBackgroundWithColor:backgroundColor borderColor:borderColor borderWidth:borderWidth andBorderRadius:borderRadius forRect:preRect isLeftOpen:NO isRightOpen:NO];
            preRect = CGRectNull;
        }
    }];
}

- (void)drawCodeBackgroundForRanges:(NSArray<NSValue*>*)ranges atPoint:(CGPoint)origin withColor:(UIColor*)backgroundColor borderColor:(UIColor*)borderColor borderWidth:(CGFloat)borderWidth borderRadius:(CGFloat)borderRadius andPadding:(CGFloat)padding {
    [ranges enumerateObjectsUsingBlock:^(NSValue *item, NSUInteger idx, BOOL * _Nonnull stop) {
        NSRange range = [item rangeValue];
        [self enumerateLineFragmentsForGlyphRange:range usingBlock:^(CGRect rect, CGRect usedRect, NSTextContainer * _Nonnull textContainer, NSRange glyphRange, BOOL * _Nonnull stop) {
            BOOL isLeftSideOpen = YES;
            BOOL isRightSideOpen = YES;

            NSRange adjustedRange = glyphRange;
            if (range.location > adjustedRange.location) {
                adjustedRange.length -= range.location - adjustedRange.location;
                adjustedRange.location = range.location;
                isLeftSideOpen = NO;
            }

            NSUInteger rangeEndLocation = range.location + range.length;
            NSUInteger adjustedRangeEndLocation = adjustedRange.location + adjustedRange.length;
            if (rangeEndLocation < adjustedRangeEndLocation) {
                adjustedRange.length -= adjustedRangeEndLocation - rangeEndLocation;
                isRightSideOpen = NO;
            }

            CGRect codeRect = [self boundingRectForGlyphRange:adjustedRange inTextContainer:textContainer];
            CGFloat paddingLeft = origin.x;
            codeRect.origin.x += paddingLeft;
            CGFloat paddingTop = origin.y;
            codeRect.origin.y += paddingTop;
            codeRect = [self rectByAddingPadding:padding toRect:codeRect];
            [self drawBackgroundWithColor:backgroundColor borderColor:borderColor borderWidth:borderWidth andBorderRadius:borderRadius forRect:codeRect isLeftOpen:isLeftSideOpen isRightOpen:isRightSideOpen];
        }];
    }];
}

- (void)drawBackgroundWithColor:(UIColor*)backgroundColor borderColor:(UIColor*)borderColor borderWidth:(CGFloat)borderWidth andBorderRadius:(CGFloat)radius forRect:(CGRect)rect isLeftOpen:(BOOL)isLeftOpen isRightOpen:(BOOL)isRightOpen {
    UIRectCorner corners = 0;
    if (!isLeftOpen) {
        corners |= UIRectCornerTopLeft | UIRectCornerBottomLeft;
    }
    if (!isRightOpen) {
        corners |= UIRectCornerTopRight | UIRectCornerBottomRight;
    }
    UIBezierPath *path = [UIBezierPath bezierPathWithRoundedRect:rect byRoundingCorners:corners cornerRadii:CGSizeMake(radius, radius)];

    [backgroundColor setFill];
    [path fill];
    [borderColor setStroke];
    [path setLineWidth:borderWidth];
    [path stroke];

    if (isLeftOpen) {
        [self openSideForRect:rect withBorderWidth:borderWidth isLeft:YES];
    }
    if (isRightOpen) {
        [self openSideForRect:rect withBorderWidth:borderWidth isLeft:NO];
    }
}

- (void)openSideForRect:(CGRect)rect withBorderWidth:(CGFloat)borderWidth isLeft:(BOOL)isLeft {
    UIBezierPath *path = [[UIBezierPath alloc] init];
    CGFloat x = isLeft ? CGRectGetMinX(rect) : CGRectGetMaxX(rect);
    [path moveToPoint:CGPointMake(x, CGRectGetMinY(rect) - borderWidth)];
    [path addLineToPoint:CGPointMake(x, CGRectGetMaxY(rect) + borderWidth)];
    [[UIColor clearColor] setStroke];
    [path setLineWidth:borderWidth + 1];
    [path strokeWithBlendMode:kCGBlendModeClear alpha:1.0];
}

@end
