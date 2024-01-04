@interface RCTMarkdownStyle : NSObject

@property (nonatomic) UIColor *syntaxColor;
@property (nonatomic) UIColor *linkColor;
@property (nonatomic) CGFloat headingFontSize;
@property (nonatomic) UIColor *quoteBorderColor;
@property (nonatomic) CGFloat quoteBorderWidth;
@property (nonatomic) CGFloat quoteMarginLeft;
@property (nonatomic) CGFloat quotePaddingLeft;
@property (nonatomic) UIColor *codeColor;
@property (nonatomic) UIColor *codeBackgroundColor;
@property (nonatomic) UIColor *preColor;
@property (nonatomic) UIColor *preBackgroundColor;
@property (nonatomic) UIColor *mentionHereBackgroundColor;
@property (nonatomic) UIColor *mentionUserBackgroundColor;

- (instancetype)initWithDictionary:(NSDictionary *)json;

@end
