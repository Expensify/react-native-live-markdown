#import <react-native-live-markdown/RCTMarkdownStyle.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#else
#import <React-Core/React/RCTConvert.h>
#endif /* RCT_NEW_ARCH_ENABLED */

@implementation RCTMarkdownStyle

#ifdef RCT_NEW_ARCH_ENABLED

- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style
{
  if (self = [super init]) {
    _syntaxColor = RCTUIColorFromSharedColor(style.syntax.color);

    _linkColor = RCTUIColorFromSharedColor(style.link.color);

    _h1FontSize = style.h1.fontSize;

    _blockquoteBorderColor = RCTUIColorFromSharedColor(style.blockquote.borderColor);
    _blockquoteBorderWidth = style.blockquote.borderWidth;
    _blockquoteMarginLeft = style.blockquote.marginLeft;
    _blockquotePaddingLeft = style.blockquote.paddingLeft;

    _codeFontFamily = RCTNSStringFromString(style.code.fontFamily);
    _codeColor = RCTUIColorFromSharedColor(style.code.color);
    _codeBackgroundColor = RCTUIColorFromSharedColor(style.code.backgroundColor);

    _preFontFamily = RCTNSStringFromString(style.pre.fontFamily);
    _preColor = RCTUIColorFromSharedColor(style.pre.color);
    _preBackgroundColor = RCTUIColorFromSharedColor(style.pre.backgroundColor);

    _mentionHereBackgroundColor = RCTUIColorFromSharedColor(style.mentionHere.backgroundColor);

    _mentionUserBackgroundColor = RCTUIColorFromSharedColor(style.mentionUser.backgroundColor);
  }

  return self;
}

#else

- (instancetype)initWithDictionary:(nonnull NSDictionary *)json
{
  if (self = [super init]) {
    _syntaxColor = [RCTConvert UIColor:json[@"syntax"][@"color"]];

    _linkColor = [RCTConvert UIColor:json[@"link"][@"color"]];

    _h1FontSize = [RCTConvert CGFloat:json[@"h1"][@"fontSize"]];

    _quoteBorderColor = [RCTConvert UIColor:json[@"blockquote"][@"borderColor"]];
    _quoteBorderWidth = [RCTConvert CGFloat:json[@"blockquote"][@"borderWidth"]];
    _quoteMarginLeft = [RCTConvert CGFloat:json[@"blockquote"][@"marginLeft"]];
    _quotePaddingLeft = [RCTConvert CGFloat:json[@"blockquote"][@"paddingLeft"]];

    _codeFontFamily = [RCTConvert NSString:json[@"code"][@"fontFamily"]];
    _codeColor = [RCTConvert UIColor:json[@"code"][@"color"]];
    _codeBackgroundColor = [RCTConvert UIColor:json[@"code"][@"backgroundColor"]];

    _preFontFamily = [RCTConvert NSString:json[@"pre"][@"fontFamily"]];
    _preColor = [RCTConvert UIColor:json[@"pre"][@"color"]];
    _preBackgroundColor = [RCTConvert UIColor:json[@"pre"][@"backgroundColor"]];

    _mentionHereBackgroundColor = [RCTConvert UIColor:json[@"mentionHere"][@"backgroundColor"]];

    _mentionUserBackgroundColor = [RCTConvert UIColor:json[@"mentionUser"][@"backgroundColor"]];
  }

  return self;
}

#endif /* RCT_NEW_ARCH_ENABLED */

@end
