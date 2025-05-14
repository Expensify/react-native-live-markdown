#import <React/RCTUIKit.h>

#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownStyle : NSObject

@property (nonatomic) RCTUIColor *syntaxColor;
@property (nonatomic) RCTUIColor *linkColor;
@property (nonatomic) CGFloat h1FontSize;
@property (nonatomic) CGFloat emojiFontSize;
@property (nonatomic) NSString *emojiFontFamily;
@property (nonatomic) RCTUIColor *blockquoteBorderColor;
@property (nonatomic) CGFloat blockquoteBorderWidth;
@property (nonatomic) CGFloat blockquoteMarginLeft;
@property (nonatomic) CGFloat blockquotePaddingLeft;
@property (nonatomic) NSString *codeFontFamily;
@property (nonatomic) CGFloat codeFontSize;
@property (nonatomic) RCTUIColor *codeColor;
@property (nonatomic) RCTUIColor *codeBackgroundColor;
@property (nonatomic) NSString *preFontFamily;
@property (nonatomic) CGFloat preFontSize;
@property (nonatomic) RCTUIColor *preColor;
@property (nonatomic) RCTUIColor *preBackgroundColor;
@property (nonatomic) RCTUIColor *mentionHereColor;
@property (nonatomic) RCTUIColor *mentionHereBackgroundColor;
@property (nonatomic) RCTUIColor *mentionUserColor;
@property (nonatomic) RCTUIColor *mentionUserBackgroundColor;
@property (nonatomic) RCTUIColor *mentionReportColor;
@property (nonatomic) RCTUIColor *mentionReportBackgroundColor;

- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style;

@end

NS_ASSUME_NONNULL_END
