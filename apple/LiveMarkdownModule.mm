#import "LiveMarkdownModule.h"

#import <RNLiveMarkdown/RuntimeDecorator.h>
#import <React/RCTBridge+Private.h>
#import <jsi/jsi.h>

using namespace facebook;
using namespace expensify::livemarkdown;

@implementation LiveMarkdownModule

RCT_EXPORT_MODULE()

- (void)installJSIBindingsWithRuntime:(facebook::jsi::Runtime &)runtime
                          callInvoker:(const std::shared_ptr<facebook::react::CallInvoker> &)callinvoker
{
  expensify::livemarkdown::injectJSIBindings(runtime);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(
      params);
}

@end
