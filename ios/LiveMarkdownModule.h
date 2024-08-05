#ifdef RCT_NEW_ARCH_ENABLED
#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>
#else
#import <React/RCTBridgeModule.h>
#endif // RCT_NEW_ARCH_ENABLED

#import <React/RCTEventEmitter.h>

// Without inheriting after RCTEventEmitter we don't get access to bridge
@interface LiveMarkdownModule : RCTEventEmitter
#ifdef RCT_NEW_ARCH_ENABLED
                                <NativeLiveMarkdownModuleSpec>
#else
                                <RCTBridgeModule>
#endif // RCT_NEW_ARCH_ENABLED
@end
