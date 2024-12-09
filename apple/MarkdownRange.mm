#import "MarkdownRange.h"

@implementation MarkdownRange

- (instancetype)initWithType:(NSString *)type range:(NSRange)range depth:(NSUInteger)depth {
    self = [super init];
    if (self) {
        _type = type;
        _range = range;
        _depth = depth;
    }
    return self;
}

@end
