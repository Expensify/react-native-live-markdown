#ifdef RCT_NEW_ARCH_ENABLED

#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUIManager.h>

NS_ASSUME_NONNULL_BEGIN

// Without inheriting after RCTEventEmitter we don't get access to bridge
@interface RCTLiveMarkdownModule
    : RCTEventEmitter <NativeLiveMarkdownModuleSpec>
@end

NS_ASSUME_NONNULL_END

#endif // RCT_NEW_ARCH_ENABLED
