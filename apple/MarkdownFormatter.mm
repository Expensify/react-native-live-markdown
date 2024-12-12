#import "MarkdownFormatter.h"
#import <React/RCTFont.h>

@implementation MarkdownFormatter

- (void)formatAttributedString:(nonnull NSMutableAttributedString *)attributedString
     withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
            withMarkdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
             withMarkdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
{
  NSRange fullRange = NSMakeRange(0, attributedString.length);

  [attributedString beginEditing];

  [attributedString removeAttribute:NSParagraphStyleAttributeName range:fullRange];
  [attributedString removeAttribute:RCTLiveMarkdownBlockquoteDepthAttributeName range:fullRange];

  [attributedString addAttributes:defaultTextAttributes range:fullRange];

  for (MarkdownRange *markdownRange in markdownRanges) {
    [self applyRangeToAttributedString:attributedString
                                  type:std::string([markdownRange.type UTF8String])
                                 range:markdownRange.range
                                 depth:markdownRange.depth
                         markdownStyle:markdownStyle];
  }

  RCTApplyBaselineOffset(attributedString);

  /*
  Calling `[attributedString addAttributes:defaultTextAttributes range:fullRange]` breaks the font for emojis.
  Before, NSFont attribute is ".SFUI-Regular" and NSOriginalFont attribute is ".AppleColorEmoji".
  After the call, both are set to ".SFUI-Regular" which makes emoji invisible and zero-width.
  Calling `fixAttributesInRange:` fixes this problem.
  */
  [attributedString fixAttributesInRange:fullRange];

  /*
  When updating MarkdownTextInput's `style` property without changing `markdownStyle`,
  React Native calls `[RCTTextInputComponentView _setAttributedString:]` which skips update if strings are equal.
  See https://github.com/facebook/react-native/blob/287e20033207df5e59d199a347b7ae2b4cd7a59e/packages/react-native/React/Fabric/Mounting/ComponentViews/TextInput/RCTTextInputComponentView.mm#L680-L684
  The attributed strings are compared using `[RCTTextInputComponentView _textOf:equals:]` which compares only raw strings
  if NSOriginalFont attribute is present. So we purposefully remove this attribute to force update.
  See https://github.com/facebook/react-native/blob/287e20033207df5e59d199a347b7ae2b4cd7a59e/packages/react-native/React/Fabric/Mounting/ComponentViews/TextInput/RCTTextInputComponentView.mm#L751-L784
  */
  [attributedString removeAttribute:@"NSOriginalFont" range:fullRange];

  [attributedString endEditing];
}

- (void)applyRangeToAttributedString:(NSMutableAttributedString *)attributedString
                                type:(const std::string)type
                               range:(const NSRange)range
                               depth:(const int)depth
                       markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle {
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
    NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
    paragraphStyle.firstLineHeadIndent = indent;
    paragraphStyle.headIndent = indent;
    [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
    [attributedString addAttribute:RCTLiveMarkdownBlockquoteDepthAttributeName value:@(depth) range:range];
  } else if (type == "pre") {
    [attributedString addAttribute:NSForegroundColorAttributeName value:markdownStyle.preColor range:range];
    NSRange rangeForBackground = [[attributedString string] characterAtIndex:range.location] == '\n' ? NSMakeRange(range.location + 1, range.length - 1) : range;
    [attributedString addAttribute:NSBackgroundColorAttributeName value:markdownStyle.preBackgroundColor range:rangeForBackground];
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
