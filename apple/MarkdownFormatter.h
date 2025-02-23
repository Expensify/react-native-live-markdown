#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

const NSAttributedStringKey RCTLiveMarkdownBlockquoteDepthAttributeName = @"RCTLiveMarkdownBlockquoteDepth";

@interface MarkdownFormatter : NSObject

- (nonnull NSAttributedString *)format:(nonnull NSString *)text
             withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                    withMarkdownRanges:(nonnull NSArray<MarkdownRange *> *)markdownRanges
                     withMarkdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle;

NS_ASSUME_NONNULL_END

@end
