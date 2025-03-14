#import "MarkdownFormatter.h"
#import <React/RCTFont.h>

@implementation MarkdownFormatter

- (nonnull NSAttributedString *)format:(nonnull NSString *)text
             withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                    withMarkdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
                     withMarkdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
{
  NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:text attributes:defaultTextAttributes];

  [attributedString beginEditing];

  // If the attributed string ends with underlined text, blurring the single-line input imprints the underline style across the whole string.
  // It looks like a bug in iOS, as there is no underline style to be found in the attributed string, especially after formatting.
  // This is a workaround that applies the NSUnderlineStyleNone to the string before iterating over ranges which resolves this problem.
  [attributedString addAttribute:NSUnderlineStyleAttributeName
                           value:[NSNumber numberWithInteger:NSUnderlineStyleNone]
                           range:NSMakeRange(0, attributedString.length)];

  for (MarkdownRange *markdownRange in markdownRanges) {
    [self applyRangeToAttributedString:attributedString
                                  type:std::string([markdownRange.type UTF8String])
                                 range:markdownRange.range
                                 depth:markdownRange.depth
                         markdownStyle:markdownStyle
                 defaultTextAttributes:defaultTextAttributes];
  }

  [attributedString.string enumerateSubstringsInRange:NSMakeRange(0, attributedString.length)
                                              options:NSStringEnumerationByLines | NSStringEnumerationSubstringNotRequired
                                           usingBlock:^(NSString * _Nullable substring, NSRange substringRange, NSRange enclosingRange, BOOL * _Nonnull stop) {
    RCTApplyBaselineOffset(attributedString, enclosingRange);
  }];

  [attributedString endEditing];

  return attributedString;
}

- (void)applyRangeToAttributedString:(NSMutableAttributedString *)attributedString
                                type:(const std::string)type
                               range:(const NSRange)range
                               depth:(const int)depth
                       markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
               defaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
{
  if (type == "bold" || type == "italic" || type == "code" || type == "pre" || type == "h1" || type == "emoji") {
    UIFont *font = [attributedString attribute:NSFontAttributeName atIndex:range.location effectiveRange:NULL];
    if (type == "bold") {
      font = [RCTFont updateFont:font withWeight:@"bold"];
    } else if (type == "italic") {
      font = [RCTFont updateFont:font withStyle:@"italic"];
    } else if (type == "code") {
      font = [RCTFont updateFont:font withFamily:markdownStyle.codeFontFamily
                                            size:[NSNumber numberWithFloat:markdownStyle.codeFontSize]
                                          weight:nil
                                            style:nil
                                          variant:nil
                                  scaleMultiplier:0];
    } else if (type == "pre") {
      font = [RCTFont updateFont:font withFamily:markdownStyle.preFontFamily
                                            size:[NSNumber numberWithFloat:markdownStyle.preFontSize]
                                          weight:nil
                                          style:nil
                                        variant:nil
                                scaleMultiplier:0];
    } else if (type == "h1") {
      font = [RCTFont updateFont:font withFamily:nil
                                            size:[NSNumber numberWithFloat:markdownStyle.h1FontSize]
                                          weight:@"bold"
                                            style:nil
                                          variant:nil
                                  scaleMultiplier:0];
    } else if (type == "emoji") {
      font = [RCTFont updateFont:font withFamily:nil
                                            size:[NSNumber numberWithFloat:markdownStyle.emojiFontSize]
                                          weight:nil
                                            style:nil
                                          variant:nil
                                  scaleMultiplier:0];
    }
    [attributedString addAttribute:NSFontAttributeName value:font range:range];
  }

  if (type == "syntax") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.syntaxColor range:range];
  } else if (type == "strikethrough") {
    [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
  } else if (type == "code") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.codeColor range:range];
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.codeBackgroundColor range:range];
  } else if (type == "mention-here") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.mentionHereColor range:range];
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.mentionHereBackgroundColor range:range];
  } else if (type == "mention-user") {
    // TODO: change mention color when it mentions current user
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.mentionUserColor range:range];
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.mentionUserBackgroundColor range:range];
  } else if (type == "mention-report") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.mentionReportColor range:range];
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.mentionReportBackgroundColor range:range];
  } else if (type == "link") {
    [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.linkColor range:range];
  } else if (type == "blockquote") {
    CGFloat indent = (markdownStyle.blockquoteMarginLeft + markdownStyle.blockquoteBorderWidth + markdownStyle.blockquotePaddingLeft) * depth;
    NSParagraphStyle *defaultParagraphStyle = defaultTextAttributes[NSParagraphStyleAttributeName];
    NSMutableParagraphStyle *paragraphStyle = defaultParagraphStyle != nil ? [defaultParagraphStyle mutableCopy] : [NSMutableParagraphStyle new];
    paragraphStyle.firstLineHeadIndent = indent;
    paragraphStyle.headIndent = indent;
    [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
    [attributedString addAttribute:RCTLiveMarkdownBlockquoteDepthAttributeName value:@(depth) range:range];
  } else if (type == "h1" && markdownStyle.h1LineHeight != -1) {
    __block BOOL found = NO;
    [attributedString enumerateAttribute:NSParagraphStyleAttributeName
                                 inRange:range
                                 options:0
                              usingBlock:^(NSParagraphStyle *paragraphStyle, NSRange paragraphRange, BOOL *stop) {
      if (paragraphStyle && [paragraphStyle isKindOfClass:[NSMutableParagraphStyle class]]) {
        NSMutableParagraphStyle *mutableParagraphStyle = (NSMutableParagraphStyle *)paragraphStyle;
        mutableParagraphStyle.minimumLineHeight = markdownStyle.h1LineHeight;
        mutableParagraphStyle.maximumLineHeight = markdownStyle.h1LineHeight;
        found = YES;
        *stop = YES;
      }
    }];
    if (!found) {
      NSParagraphStyle *defaultParagraphStyle = defaultTextAttributes[NSParagraphStyleAttributeName];
      NSMutableParagraphStyle *paragraphStyle = defaultParagraphStyle != nil ? [defaultParagraphStyle mutableCopy] : [NSMutableParagraphStyle new];
      paragraphStyle.minimumLineHeight = markdownStyle.h1LineHeight;
      paragraphStyle.maximumLineHeight = markdownStyle.h1LineHeight;
      NSRange rangeWithHashAndSpace = NSMakeRange(range.location - 2, range.length + 2);
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:rangeWithHashAndSpace];
    }
  } else if (type == "pre") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.preColor range:range];
    NSRange rangeForBackground = [[attributedString string] characterAtIndex:range.location] == '\n' ? NSMakeRange(range.location + 1, range.length - 1) : range;
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.preBackgroundColor range:rangeForBackground];
    // TODO: pass background color and ranges to layout manager
  }
}

static void RCTApplyBaselineOffset(NSMutableAttributedString *attributedText, NSRange attributedTextRange)
{
  __block CGFloat maximumLineHeight = 0;

  [attributedText enumerateAttribute:NSParagraphStyleAttributeName
                             inRange:attributedTextRange
                             options:NSAttributedStringEnumerationLongestEffectiveRangeNotRequired
                          usingBlock:^(NSParagraphStyle *paragraphStyle, __unused NSRange range, __unused BOOL *stop) {
    if (!paragraphStyle) {
      return;
    }

    maximumLineHeight = MAX(paragraphStyle.maximumLineHeight, maximumLineHeight);
  }];

  if (maximumLineHeight == 0) {
    // `lineHeight` was not specified, nothing to do.
    return;
  }

  __block CGFloat maximumFontLineHeight = 0;

  [attributedText enumerateAttribute:NSFontAttributeName
                             inRange:attributedTextRange
                             options:NSAttributedStringEnumerationLongestEffectiveRangeNotRequired
                          usingBlock:^(UIFont *font, NSRange range, __unused BOOL *stop) {
    if (!font) {
      return;
    }

    maximumFontLineHeight = MAX(font.lineHeight, maximumFontLineHeight);
  }];

  if (maximumLineHeight < maximumFontLineHeight) {
    return;
  }

  CGFloat baseLineOffset = (maximumLineHeight - maximumFontLineHeight) / 2.0;
  [attributedText addAttribute:NSBaselineOffsetAttributeName
                         value:@(baseLineOffset)
                         range:attributedTextRange];
}

@end
