#ifdef RCT_NEW_ARCH_ENABLED

#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTUIManager.h>

// Without inheriting after RCTEventEmitter we don't get access to bridge
@interface RCTLiveMarkdownModule
    : RCTEventEmitter <NativeLiveMarkdownModuleSpec>
@end

#endif // RCT_NEW_ARCH_ENABLED
