#import "LiveMarkdownModule.h"
#import <RNLiveMarkdown/RuntimeDecorator.h>

#import <React/RCTBridge+Private.h>
#import <jsi/jsi.h>

using namespace facebook;

@implementation LiveMarkdownModule {
  BOOL installed_;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)[RCTBridge currentBridge];
  jsi::Runtime &rt = *(jsi::Runtime *)cxxBridge.runtime;
  expensify::livemarkdown::injectJSIBindings(rt);
  return @(1);
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(params);
}
#endif // RCT_NEW_ARCH_ENABLED

@end
