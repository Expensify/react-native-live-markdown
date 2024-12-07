#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import <RNLiveMarkdown/MarkdownParser.h>
#import "react_native_assert.h"
#import <React/RCTAssert.h>
#import <React/RCTFont.h>
#include <jsi/jsi.h>

@implementation RCTMarkdownUtils {
  MarkdownParser *_markdownParser;
  NSString *_prevInputString;
  NSAttributedString *_prevAttributedString;
  NSDictionary<NSAttributedStringKey, id> *_prevTextAttributes;
  __weak RCTMarkdownStyle *_prevMarkdownStyle;
  __weak NSNumber *_prevParserId;
}

- (instancetype)init
{
  if (self = [super init]) {
    _markdownParser = [MarkdownParser new];
  }

  return self;
}

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input withAttributes:(nullable NSDictionary<NSAttributedStringKey,id> *)attributes
{
    @synchronized (self) {
        if (input == nil) {
            return nil;
        }

        NSString *inputString = [input string];
        if ([inputString isEqualToString:_prevInputString] && [attributes isEqualToDictionary:_prevTextAttributes] && [_markdownStyle isEqual:_prevMarkdownStyle] && [_parserId isEqualToNumber:_prevParserId]) {
            return _prevAttributedString;
        }

        NSArray<MarkdownRange *> *markdownRanges = [_markdownParser parse:inputString withParserId:_parserId];

        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:inputString attributes:attributes];
        [attributedString beginEditing];

        // If the attributed string ends with underlined text, blurring the single-line input imprints the underline style across the whole string.
        // It looks like a bug in iOS, as there is no underline style to be found in the attributed string, especially after formatting.
        // This is a workaround that applies the NSUnderlineStyleNone to the string before iterating over ranges which resolves this problem.
        [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleNone] range:NSMakeRange(0, attributedString.length)];

        for (MarkdownRange *markdownRange in markdownRanges) {
            [self applyRangeToAttributedString:attributedString
                                          type:std::string([markdownRange.type UTF8String])
                                         range:markdownRange.range
                                         depth:markdownRange.depth];
        }

        RCTApplyBaselineOffset(attributedString);

        [attributedString endEditing];

        _prevInputString = inputString;
        _prevAttributedString = attributedString;
        _prevTextAttributes = attributes;
        _prevMarkdownStyle = _markdownStyle;
        _prevParserId = _parserId;

        return attributedString;
    }
}

- (void)applyRangeToAttributedString:(NSMutableAttributedString *)attributedString type:(const std::string)type range:(NSRange)range depth:(const int)depth {
    if (type == "bold" || type == "italic" || type == "code" || type == "pre" || type == "h1" || type == "emoji") {
        UIFont *font = [attributedString attribute:NSFontAttributeName atIndex:range.location effectiveRange:NULL];
        if (type == "bold") {
            font = [RCTFont updateFont:font withWeight:@"bold"];
        } else if (type == "italic") {
            font = [RCTFont updateFont:font withStyle:@"italic"];
        } else if (type == "code") {
            font = [RCTFont updateFont:font withFamily:_markdownStyle.codeFontFamily
                                                  size:[NSNumber numberWithFloat:_markdownStyle.codeFontSize]
                                                weight:nil
                                                 style:nil
                                               variant:nil
                                       scaleMultiplier:0];
        } else if (type == "pre") {
            font = [RCTFont updateFont:font withFamily:_markdownStyle.preFontFamily
                                                  size:[NSNumber numberWithFloat:_markdownStyle.preFontSize]
                                                weight:nil
                                                style:nil
                                              variant:nil
                                      scaleMultiplier:0];
        } else if (type == "h1") {
            font = [RCTFont updateFont:font withFamily:nil
                                                  size:[NSNumber numberWithFloat:_markdownStyle.h1FontSize]
                                                weight:@"bold"
                                                 style:nil
                                               variant:nil
                                       scaleMultiplier:0];
        } else if (type == "emoji") {
            font = [RCTFont updateFont:font withFamily:nil
                                                  size:[NSNumber numberWithFloat:_markdownStyle.emojiFontSize]
                                                weight:nil
                                                 style:nil
                                               variant:nil
                                       scaleMultiplier:0];
        }
        [attributedString addAttribute:NSFontAttributeName value:font range:range];
    }

    if (type == "syntax") {
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.syntaxColor range:range];
    } else if (type == "strikethrough") {
        [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
    } else if (type == "code") {
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.codeColor range:range];
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.codeBackgroundColor range:range];
    } else if (type == "mention-here") {
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionHereColor range:range];
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionHereBackgroundColor range:range];
    } else if (type == "mention-user") {
        // TODO: change mention color when it mentions current user
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionUserColor range:range];
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionUserBackgroundColor range:range];
    } else if (type == "mention-report") {
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionReportColor range:range];
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionReportBackgroundColor range:range];
    } else if (type == "link") {
        [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.linkColor range:range];
    } else if (type == "blockquote") {
        CGFloat indent = (_markdownStyle.blockquoteMarginLeft + _markdownStyle.blockquoteBorderWidth + _markdownStyle.blockquotePaddingLeft) * depth;
        NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
        paragraphStyle.firstLineHeadIndent = indent;
        paragraphStyle.headIndent = indent;
        [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
        [attributedString addAttribute:RCTLiveMarkdownBlockquoteDepthAttributeName value:@(depth) range:range];
    } else if (type == "pre") {
        [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.preColor range:range];
        NSRange rangeForBackground = [[attributedString string] characterAtIndex:range.location] == '\n' ? NSMakeRange(range.location + 1, range.length - 1) : range;
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.preBackgroundColor range:rangeForBackground];
        // TODO: pass background color and ranges to layout manager
    }
}

static void RCTApplyBaselineOffset(NSMutableAttributedString *attributedText)
{
  __block CGFloat maximumLineHeight = 0;

  [attributedText enumerateAttribute:NSParagraphStyleAttributeName
                             inRange:NSMakeRange(0, attributedText.length)
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
                             inRange:NSMakeRange(0, attributedText.length)
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
                         range:NSMakeRange(0, attributedText.length)];
}

@end
