#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownParser : NSObject

- (NSArray<MarkdownRange *> *)parse:(nonnull NSString *)text
                       withParserId:(nonnull NSNumber *)parserId;

// Returns the ranges for (text, parserId) if they are already in the cache, or
// nil if they aren't. This never runs the parser, so it is safe to call from
// the main thread while Yoga is measuring.
- (nullable NSArray<MarkdownRange *> *)cachedRangesForText:(nonnull NSString *)text
                                              withParserId:(nonnull NSNumber *)parserId;

// Parses in the background and puts the result in the cache, so the caller
// doesn't have to wait for the parser. Used by the main thread, which must
// never wait for it (see Sentry APP-EF1).
//
// Only the newest request matters: a new call replaces one that is still
// waiting. A parse that already started can't be stopped, but the newest text
// is parsed as soon as it finishes.
//
// `completion` runs on the background queue once the text is cached. It is
// skipped if a newer call replaced this one, since that call reports instead.
- (void)warmCacheAsyncForText:(nonnull NSString *)text
                 withParserId:(nonnull NSNumber *)parserId
                   completion:(nullable void (^)(void))completion;

@end

NS_ASSUME_NONNULL_END
