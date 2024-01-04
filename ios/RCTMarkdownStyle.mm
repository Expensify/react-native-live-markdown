#import <react-native-markdown-text-input/RCTMarkdownStyle.h>
#import <React-Core/React/RCTConvert.h>

static inline UIColor *parseColor(id value, UIColor *fallback) {
  return value != nil ? [RCTConvert UIColor:value] : fallback;
}

static inline CGFloat parseFloat(id value, CGFloat fallback) {
  return value != nil ? [value floatValue] : fallback;
}

@implementation RCTMarkdownStyle

- (instancetype)initWithDictionary:(nonnull NSDictionary *)json
{
  if (self = [super init]) {
    _syntaxColor = parseColor(json[@"syntax"][@"color"], [UIColor grayColor]);

    _linkColor = parseColor(json[@"link"][@"color"], [UIColor blueColor]);

    _headingFontSize = parseFloat(json[@"h1"][@"fontSize"], 25);

    _quoteBorderColor = parseColor(json[@"quote"][@"borderColor"], [UIColor grayColor]);
    _quoteBorderWidth = parseFloat(json[@"quote"][@"borderWidth"], 6);
    _quoteMarginLeft = parseFloat(json[@"quote"][@"marginLeft"], 6);
    _quotePaddingLeft = parseFloat(json[@"quote"][@"paddingLeft"], 6);

    _codeColor = parseColor(json[@"code"][@"color"], [UIColor blackColor]);
    _codeBackgroundColor = parseColor(json[@"code"][@"backgroundColor"], [UIColor lightGrayColor]);

    _preColor = parseColor(json[@"code"][@"color"], [UIColor blackColor]);
    _preBackgroundColor = parseColor(json[@"code"][@"backgroundColor"], [UIColor lightGrayColor]);

    _mentionHereBackgroundColor = parseColor(json[@"mentionHere"][@"backgroundColor"], [UIColor systemYellowColor]);

    _mentionUserBackgroundColor = parseColor(json[@"mentionUser"][@"backgroundColor"], [UIColor systemCyanColor]);
  }

  return self;
}

@end
