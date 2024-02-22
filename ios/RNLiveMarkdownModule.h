#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTUIManager.h>
#import <React/RCTEventEmitter.h>
#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>


@interface RNLiveMarkdownModule : RCTEventEmitter <NativeMarkdownModuleSpec>
@end

#endif // RCT_NEW_ARCH_ENABLED

