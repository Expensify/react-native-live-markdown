#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTUIManager.h>
#import <React/RCTEventEmitter.h>
#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>


@interface RNLiveMarkdownModule : RCTEventEmitter <NativeMarkdownModuleSpec>

+ (void) registerFamilyForUpdates:(facebook::react::ShadowNodeFamily::Shared) family;
+ (void) unregisterFamilyForUpdates:(facebook::react::ShadowNodeFamily::Shared) family;
+ (void) runForEveryFamily:(std::function<void(facebook::react::ShadowNodeFamily::Shared family)>)fun;

@end

#endif // RCT_NEW_ARCH_ENABLED

