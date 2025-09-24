#import <Foundation/Foundation.h>

@interface RCTMarkdownTextBackground : NSObject

@property (nonatomic, strong) UIColor *color;

@property (nonatomic, assign) CGFloat borderRadius;

@end


@interface RCTMarkdownTextBackgroundWithRange : NSObject

@property (nonnull, atomic) RCTMarkdownTextBackground *textBackground;

@property NSRange range;

@end
