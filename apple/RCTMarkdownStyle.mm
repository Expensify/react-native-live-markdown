#import <RNLiveMarkdown/RCTMarkdownStyle.h>

#import <React/RCTConversions.h>

@implementation RCTMarkdownStyle

- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style
{
  if (self = [super init]) {
    _syntaxColor = RCTUIColorFromSharedColor(style.syntax.color);

    _linkColor = RCTUIColorFromSharedColor(style.link.color);

    _h1FontSize = style.h1.fontSize;

    _emojiFontSize = style.emoji.fontSize;

    _blockquoteBorderColor = RCTUIColorFromSharedColor(style.blockquote.borderColor);
    _blockquoteBorderWidth = style.blockquote.borderWidth;
    _blockquoteMarginLeft = style.blockquote.marginLeft;
    _blockquotePaddingLeft = style.blockquote.paddingLeft;

    _codeFontFamily = RCTNSStringFromString(style.code.fontFamily);
    _codeFontSize = style.code.fontSize;
    _codeColor = RCTUIColorFromSharedColor(style.code.color);
    _codeBackgroundColor = RCTUIColorFromSharedColor(style.code.backgroundColor);

    _preFontFamily = RCTNSStringFromString(style.pre.fontFamily);
    _preFontSize = style.pre.fontSize;
    _preColor = RCTUIColorFromSharedColor(style.pre.color);
    _preBackgroundColor = RCTUIColorFromSharedColor(style.pre.backgroundColor);

    _mentionHereColor = RCTUIColorFromSharedColor(style.mentionHere.color);
    _mentionHereBackgroundColor = RCTUIColorFromSharedColor(style.mentionHere.backgroundColor);

    _mentionUserColor = RCTUIColorFromSharedColor(style.mentionUser.color);
    _mentionUserBackgroundColor = RCTUIColorFromSharedColor(style.mentionUser.backgroundColor);

    _mentionReportColor = RCTUIColorFromSharedColor(style.mentionReport.color);
    _mentionReportBackgroundColor = RCTUIColorFromSharedColor(style.mentionReport.backgroundColor);
  }

  return self;
}

@end
