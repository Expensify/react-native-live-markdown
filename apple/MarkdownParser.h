#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownParser : NSObject

- (NSArray<MarkdownRange *> *)parse:(nonnull NSString *)text
                       withParserId:(nonnull NSNumber *)parserId;

// Returns the memoized ranges for (text, parserId) if they are still in the
// cache, otherwise nil. Never enters the worklet runtime and only takes a brief
// internal lock, so it is safe to call from the Yoga measure path on the main
// thread.
- (nullable NSArray<MarkdownRange *> *)cachedRangesForText:(nonnull NSString *)text
                                              withParserId:(nonnull NSNumber *)parserId;

// Requests a parse on a background queue to populate the cache without blocking
// the calling thread. Used when the main thread needs ranges during layout but
// must not wait on the worklet runtime (see Sentry APP-EF1).
//
// Requests are coalesced latest-wins: the most recent (text, parserId) always
// wins, and any earlier request that has not started executing yet is dropped.
// A parse that is already inside the worklet runtime cannot be cancelled, but
// the newest request is picked up as soon as it returns, so the newest text is
// always parsed.
//
// `completion` runs on the warm-up queue once `text` has been parsed and
// cached. It is skipped when the request was superseded by a newer one, since
// the newer request invokes its own completion.
- (void)warmCacheAsyncForText:(nonnull NSString *)text
                 withParserId:(nonnull NSNumber *)parserId
                   completion:(nullable void (^)(void))completion;

@end

NS_ASSUME_NONNULL_END
