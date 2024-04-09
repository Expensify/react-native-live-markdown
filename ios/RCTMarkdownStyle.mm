#import <RNLiveMarkdown/RCTMarkdownStyle.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#else
#import <React/RCTConvert.h>
#endif /* RCT_NEW_ARCH_ENABLED */

@implementation RCTMarkdownStyle

#ifdef RCT_NEW_ARCH_ENABLED

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
  }

  return self;
}

#else

- (instancetype)initWithDictionary:(NSDictionary *)json
{
  if (self = [super init]) {
    _syntaxColor = [RCTConvert UIColor:json[@"syntax"][@"color"]];

    _linkColor = [RCTConvert UIColor:json[@"link"][@"color"]];

    _h1FontSize = [RCTConvert CGFloat:json[@"h1"][@"fontSize"]];

    _emojiFontSize = [RCTConvert CGFloat:json[@"emoji"][@"fontSize"]];

    _blockquoteBorderColor = [RCTConvert UIColor:json[@"blockquote"][@"borderColor"]];
    _blockquoteBorderWidth = [RCTConvert CGFloat:json[@"blockquote"][@"borderWidth"]];
    _blockquoteMarginLeft = [RCTConvert CGFloat:json[@"blockquote"][@"marginLeft"]];
    _blockquotePaddingLeft = [RCTConvert CGFloat:json[@"blockquote"][@"paddingLeft"]];

    _codeFontFamily = [RCTConvert NSString:json[@"code"][@"fontFamily"]];
    _codeFontSize = [RCTConvert CGFloat:json[@"code"][@"fontSize"]];
    _codeColor = [RCTConvert UIColor:json[@"code"][@"color"]];
    _codeBackgroundColor = [RCTConvert UIColor:json[@"code"][@"backgroundColor"]];

    _preFontFamily = [RCTConvert NSString:json[@"pre"][@"fontFamily"]];
    _preFontSize = [RCTConvert CGFloat:json[@"pre"][@"fontSize"]];
    _preColor = [RCTConvert UIColor:json[@"pre"][@"color"]];
    _preBackgroundColor = [RCTConvert UIColor:json[@"pre"][@"backgroundColor"]];

    _mentionHereColor = [RCTConvert UIColor:json[@"mentionHere"][@"color"]];
    _mentionHereBackgroundColor = [RCTConvert UIColor:json[@"mentionHere"][@"backgroundColor"]];

    _mentionUserColor = [RCTConvert UIColor:json[@"mentionUser"][@"color"]];
    _mentionUserBackgroundColor = [RCTConvert UIColor:json[@"mentionUser"][@"backgroundColor"]];
  }

  return self;
}

#endif /* RCT_NEW_ARCH_ENABLED */

@end
