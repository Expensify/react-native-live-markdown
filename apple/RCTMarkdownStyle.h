#import <UIKit/UIKit.h>

#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownStyle : NSObject

@property (nonatomic) UIColor *syntaxColor;
@property (nonatomic) UIColor *linkColor;
@property (nonatomic) CGFloat h1FontSize;
@property (nonatomic) CGFloat emojiFontSize;
@property (nonatomic) UIColor *blockquoteBorderColor;
@property (nonatomic) CGFloat blockquoteBorderWidth;
@property (nonatomic) CGFloat blockquoteMarginLeft;
@property (nonatomic) CGFloat blockquotePaddingLeft;
@property (nonatomic) NSString *codeFontFamily;
@property (nonatomic) CGFloat codeFontSize;
@property (nonatomic) UIColor *codeColor;
@property (nonatomic) UIColor *codeBackgroundColor;
@property (nonatomic) NSString *preFontFamily;
@property (nonatomic) CGFloat preFontSize;
@property (nonatomic) UIColor *preColor;
@property (nonatomic) UIColor *preBackgroundColor;
@property (nonatomic) UIColor *mentionHereColor;
@property (nonatomic) UIColor *mentionHereBackgroundColor;
@property (nonatomic) UIColor *mentionUserColor;
@property (nonatomic) UIColor *mentionUserBackgroundColor;
@property (nonatomic) UIColor *mentionReportColor;
@property (nonatomic) UIColor *mentionReportBackgroundColor;

- (instancetype)initWithStruct:(const facebook::react::MarkdownTextInputDecoratorViewMarkdownStyleStruct &)style;

@end

NS_ASSUME_NONNULL_END
