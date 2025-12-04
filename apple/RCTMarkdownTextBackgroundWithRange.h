#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/RCTMarkdownTextBackground.h>

@interface RCTMarkdownTextBackgroundWithRange : NSObject

@property (nonnull, atomic) RCTMarkdownTextBackground *textBackground;

@property NSRange range;

@end
