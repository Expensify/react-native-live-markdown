#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownRange : NSObject

@property (nonatomic, strong) NSString *type;
@property (nonatomic) NSRange range;
@property (nonatomic) NSUInteger depth;

- (instancetype)initWithType:(NSString *)type range:(NSRange)range depth:(NSUInteger)depth;

NS_ASSUME_NONNULL_END

@end
