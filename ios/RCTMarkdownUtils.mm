#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownGlobal.h>
#import "react_native_assert.h"
#import <React/RCTAssert.h>
#import <React/RCTFont.h>
#include <jsi/jsi.h>

@implementation RCTMarkdownUtils {
  NSString *_prevInputString;
  NSAttributedString *_prevAttributedString;
  NSDictionary<NSAttributedStringKey, id> *_prevTextAttributes;
  __weak RCTMarkdownStyle *_prevMarkdownStyle;
}

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input withAttributes:(nullable NSDictionary<NSAttributedStringKey,id> *)attributes
{
    @synchronized (self) {
        if (input == nil) {
            return nil;
        }

        NSString *inputString = [input string];
        if ([inputString isEqualToString:_prevInputString] && [attributes isEqualToDictionary:_prevTextAttributes] && [_markdownStyle isEqual:_prevMarkdownStyle]) {
            return _prevAttributedString;
        }

        auto markdownRuntime = expensify::livemarkdown::getMarkdownRuntime();
        jsi::Runtime &rt = markdownRuntime->getJSIRuntime();

        auto markdownWorklet = expensify::livemarkdown::getMarkdownWorklet();

        auto text = jsi::String::createFromUtf8(rt, [inputString UTF8String]);
        auto output = markdownRuntime->runGuarded(markdownWorklet, text);
        react_native_assert(!output.isUndefined());

        auto json = rt.global().getPropertyAsObject(rt, "JSON").getPropertyAsFunction(rt, "stringify").call(rt, output).asString(rt).utf8(rt);
        NSData *data = [NSData dataWithBytes:json.data() length:json.length()];
        NSError *error = nil;
        NSArray *ranges = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
        if (error != nil) {
          return input;
        }

        NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:inputString attributes:attributes];
        [attributedString beginEditing];

        // If the attributed string ends with underlined text, blurring the single-line input imprints the underline style across the whole string.
        // It looks like a bug in iOS, as there is no underline style to be found in the attributed string, especially after formatting.
        // This is a workaround that applies the NSUnderlineStyleNone to the string before iterating over ranges which resolves this problem.
        [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleNone] range:NSMakeRange(0, attributedString.length)];

        _blockquoteRangesAndLevels = [NSMutableArray new];

        [ranges enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            NSDictionary *item = obj;
            NSString *type = [item valueForKey:@"type"];
            NSInteger location = [[item valueForKey:@"start"] unsignedIntegerValue];
            NSInteger length = [[item valueForKey:@"length"] unsignedIntegerValue];
            NSInteger depth = [[item valueForKey:@"depth"] unsignedIntegerValue] ?: 1;
            NSRange range = NSMakeRange(location, length);

            if ([type isEqualToString:@"bold"] || [type isEqualToString:@"italic"] || [type isEqualToString:@"code"] || [type isEqualToString:@"pre"] || [type isEqualToString:@"h1"] || [type isEqualToString:@"emoji"]) {
                UIFont *font = [attributedString attribute:NSFontAttributeName atIndex:location effectiveRange:NULL];
                if ([type isEqualToString:@"bold"]) {
                    font = [RCTFont updateFont:font withWeight:@"bold"];
                } else if ([type isEqualToString:@"italic"]) {
                    font = [RCTFont updateFont:font withStyle:@"italic"];
                } else if ([type isEqualToString:@"code"]) {
                    font = [RCTFont updateFont:font withFamily:_markdownStyle.codeFontFamily
                                                          size:[NSNumber numberWithFloat:_markdownStyle.codeFontSize]
                                                        weight:nil
                                                         style:nil
                                                       variant:nil
                                               scaleMultiplier:0];
                } else if ([type isEqualToString:@"pre"]) {
                    font = [RCTFont updateFont:font withFamily:_markdownStyle.preFontFamily
                                                          size:[NSNumber numberWithFloat:_markdownStyle.preFontSize]
                                                        weight:nil
                                                        style:nil
                                                      variant:nil
                                              scaleMultiplier:0];
                } else if ([type isEqualToString:@"h1"]) {
                    font = [RCTFont updateFont:font withFamily:nil
                                                          size:[NSNumber numberWithFloat:_markdownStyle.h1FontSize]
                                                        weight:@"bold"
                                                         style:nil
                                                       variant:nil
                                               scaleMultiplier:0];
                } else if ([type isEqualToString:@"emoji"]) {
                    font = [RCTFont updateFont:font withFamily:nil
                                                          size:[NSNumber numberWithFloat:_markdownStyle.emojiFontSize]
                                                        weight:nil
                                                         style:nil
                                                       variant:nil
                                               scaleMultiplier:0];
                }
                [attributedString addAttribute:NSFontAttributeName value:font range:range];
            }

            if ([type isEqualToString:@"syntax"]) {
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.syntaxColor range:range];
            } else if ([type isEqualToString:@"strikethrough"]) {
                [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
            } else if ([type isEqualToString:@"code"]) {
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.codeColor range:range];
                [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.codeBackgroundColor range:range];
            } else if ([type isEqualToString:@"mention-here"]) {
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionHereColor range:range];
                [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionHereBackgroundColor range:range];
            } else if ([type isEqualToString:@"mention-user"]) {
                // TODO: change mention color when it mentions current user
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionUserColor range:range];
                [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionUserBackgroundColor range:range];
            } else if ([type isEqualToString:@"mention-report"]) {
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionReportColor range:range];
                [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionReportBackgroundColor range:range];
            } else if ([type isEqualToString:@"link"]) {
                [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.linkColor range:range];
            } else if ([type isEqualToString:@"blockquote"]) {
                CGFloat indent = (_markdownStyle.blockquoteMarginLeft + _markdownStyle.blockquoteBorderWidth + _markdownStyle.blockquotePaddingLeft) * depth;
                NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
                paragraphStyle.firstLineHeadIndent = indent;
                paragraphStyle.headIndent = indent;
                [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
                [_blockquoteRangesAndLevels addObject:@{
                    @"range": [NSValue valueWithRange:range],
                    @"depth": @(depth)
                }];
            } else if ([type isEqualToString:@"pre"]) {
                [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.preColor range:range];
                NSRange rangeForBackground = [inputString characterAtIndex:range.location] == '\n' ? NSMakeRange(range.location + 1, range.length - 1) : range;
                [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.preBackgroundColor range:rangeForBackground];
                // TODO: pass background color and ranges to layout manager
            } else if ([type isEqualToString:@"h1"]) {
                NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
                NSRange rangeWithHashAndSpace = NSMakeRange(range.location - 2, range.length + 2); // we also need to include prepending "# "
                [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:rangeWithHashAndSpace];
            }
        }];

        RCTApplyBaselineOffset(attributedString);

        [attributedString endEditing];

        _prevInputString = inputString;
        _prevAttributedString = attributedString;
        _prevTextAttributes = attributes;
        _prevMarkdownStyle = _markdownStyle;

        return attributedString;

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
