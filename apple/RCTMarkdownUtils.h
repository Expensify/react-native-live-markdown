#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

const NSAttributedStringKey RCTLiveMarkdownBlockquoteAttributeName = @"RCTLiveMarkdownBlockquote";

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input withAttributes:(nullable NSDictionary<NSAttributedStringKey, id>*)attributes;

@end

NS_ASSUME_NONNULL_END
