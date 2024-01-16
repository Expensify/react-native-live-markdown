#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#endif /* RCT_NEW_ARCH_ENABLED */

@interface RCTMarkdownStyle : NSObject

@property (nonatomic, nonnull) UIColor *syntaxColor;
@property (nonatomic, nonnull) UIColor *linkColor;
@property (nonatomic) CGFloat h1FontSize;
@property (nonatomic, nonnull) UIColor *blockquoteBorderColor;
@property (nonatomic) CGFloat blockquoteBorderWidth;
@property (nonatomic) CGFloat blockquoteMarginLeft;
@property (nonatomic) CGFloat blockquotePaddingLeft;
@property (nonatomic, nonnull) NSString *codeFontFamily;
@property (nonatomic, nonnull) UIColor *codeColor;
@property (nonatomic, nonnull) UIColor *codeBackgroundColor;
@property (nonatomic, nonnull) NSString *preFontFamily;
@property (nonatomic, nonnull) UIColor *preColor;
@property (nonatomic, nonnull) UIColor *preBackgroundColor;
@property (nonatomic, nonnull) UIColor *mentionHereBackgroundColor;
@property (nonatomic, nonnull) UIColor *mentionUserBackgroundColor;

#ifdef RCT_NEW_ARCH_ENABLED
- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style;
#else
- (instancetype)initWithDictionary:(NSDictionary *)json;
#endif /* RCT_NEW_ARCH_ENABLED */

@end
