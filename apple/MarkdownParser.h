#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownParser : NSObject

- (NSArray<MarkdownRange *> *)parse:(NSString *)text withParserId:(NSNumber *)parserId;

NS_ASSUME_NONNULL_END

@end
