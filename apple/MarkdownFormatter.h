#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

const NSAttributedStringKey RCTLiveMarkdownTextAttributeName = @"RCTLiveMarkdownText";

const NSAttributedStringKey RCTLiveMarkdownTextBackgroundAttributeName = @"RCTLiveMarkdownTextBackground";
@interface RCTMarkdownTextBackground : NSObject
  @property (nonatomic, strong) UIColor *color;
  @property (nonatomic, assign) CGFloat cornerRadius;
@end

const NSAttributedStringKey RCTLiveMarkdownBlockquoteDepthAttributeName = @"RCTLiveMarkdownBlockquoteDepth";

@interface MarkdownFormatter : NSObject

- (void)formatAttributedString:(nonnull NSMutableAttributedString *)attributedString
     withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
            withMarkdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
             withMarkdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle;

NS_ASSUME_NONNULL_END

@end
