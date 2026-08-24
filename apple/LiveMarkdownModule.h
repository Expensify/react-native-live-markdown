#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>

#import <React/RCTEventEmitter.h>
#import <ReactCommon/RCTTurboModuleWithJSIBindings.h>

// Without inheriting after RCTEventEmitter we don't get access to bridge
@interface LiveMarkdownModule : RCTEventEmitter <NativeLiveMarkdownModuleSpec, RCTTurboModuleWithJSIBindings>

@end
