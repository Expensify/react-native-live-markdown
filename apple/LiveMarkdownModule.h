#import <RNLiveMarkdownSpec/RNLiveMarkdownSpec.h>

#import <React/RCTEventEmitter.h>

// Without inheriting after RCTEventEmitter we don't get access to bridge
@interface LiveMarkdownModule : RCTEventEmitter <NativeLiveMarkdownModuleSpec>

@end
