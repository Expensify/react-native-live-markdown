#import <React/RCTUIKit.h> // [macOS]

#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#endif /* RCT_NEW_ARCH_ENABLED */

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownStyle : NSObject

@property (nonatomic) RCTUIColor *syntaxColor;
@property (nonatomic) RCTUIColor *linkColor;
@property (nonatomic) CGFloat h1FontSize;
@property (nonatomic) RCTUIColor *blockquoteBorderColor;
@property (nonatomic) CGFloat blockquoteBorderWidth;
@property (nonatomic) CGFloat blockquoteMarginLeft;
@property (nonatomic) CGFloat blockquotePaddingLeft;
@property (nonatomic) NSString *codeFontFamily;
@property (nonatomic) RCTUIColor *codeColor;
@property (nonatomic) RCTUIColor *codeBackgroundColor;
@property (nonatomic) NSString *preFontFamily;
@property (nonatomic) RCTUIColor *preColor;
@property (nonatomic) RCTUIColor *preBackgroundColor;
@property (nonatomic) RCTUIColor *mentionHereColor;
@property (nonatomic) RCTUIColor *mentionHereBackgroundColor;
@property (nonatomic) RCTUIColor *mentionUserColor;
@property (nonatomic) RCTUIColor *mentionUserBackgroundColor;

#ifdef RCT_NEW_ARCH_ENABLED
- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style;
#else
- (instancetype)initWithDictionary:(NSDictionary *)json;
#endif /* RCT_NEW_ARCH_ENABLED */

@end

NS_ASSUME_NONNULL_END
