#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#endif /* RCT_NEW_ARCH_ENABLED */

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownStyle : NSObject

@property (nonatomic) UIColor *syntaxColor;
@property (nonatomic) UIColor *linkColor;
@property (nonatomic) CGFloat h1FontSize;
@property (nonatomic) UIColor *quoteBorderColor;
@property (nonatomic) CGFloat quoteBorderWidth;
@property (nonatomic) CGFloat quoteMarginLeft;
@property (nonatomic) CGFloat quotePaddingLeft;
@property (nonatomic) NSString *codeFontFamily;
@property (nonatomic) UIColor *codeColor;
@property (nonatomic) UIColor *codeBackgroundColor;
@property (nonatomic) NSString *preFontFamily;
@property (nonatomic) UIColor *preColor;
@property (nonatomic) UIColor *preBackgroundColor;
@property (nonatomic) UIColor *mentionHereBackgroundColor;
@property (nonatomic) UIColor *mentionUserBackgroundColor;

#ifdef RCT_NEW_ARCH_ENABLED
- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style;
#else
- (instancetype)initWithDictionary:(NSDictionary *)json;
#endif /* RCT_NEW_ARCH_ENABLED */

@end

NS_ASSUME_NONNULL_END
