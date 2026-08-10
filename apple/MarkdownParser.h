#import <Foundation/Foundation.h>
#import <RNLiveMarkdown/MarkdownRange.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownParser : NSObject

- (NSArray<MarkdownRange *> *)parse:(nonnull NSString *)text
                       withParserId:(nonnull NSNumber *)parserId;

// Returns the memoized ranges for (text, parserId) if they match the last
// completed parse, otherwise nil. Never enters the worklet runtime and only
// takes a brief internal lock, so it is safe to call from the Yoga measure
// path on the main thread.
- (nullable NSArray<MarkdownRange *> *)cachedRangesForText:(nonnull NSString *)text
                                              withParserId:(nonnull NSNumber *)parserId;

// Schedules a parse on a background queue to populate the memo cache without
// blocking the calling thread. Used when the main thread needs ranges during
// layout but must not wait on the worklet runtime (see Sentry APP-EF1).
- (void)warmCacheAsyncForText:(nonnull NSString *)text
                 withParserId:(nonnull NSNumber *)parserId;

NS_ASSUME_NONNULL_END

@end
