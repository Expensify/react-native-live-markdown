#import <React/RCTBackedTextInputViewProtocol.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTMarkdownUtils : NSObject

@property (nonatomic) RCTMarkdownStyle *markdownStyle;
@property (nonatomic) NSNumber *parserId;
@property (nonatomic) NSMutableArray<NSDictionary *> *blockquoteRangesAndLevels;

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input withAttributes:(nullable NSDictionary<NSAttributedStringKey, id>*)attributes;

@end

NS_ASSUME_NONNULL_END
