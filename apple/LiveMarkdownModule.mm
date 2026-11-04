#import "LiveMarkdownModule.h"

#import <RNLiveMarkdown/RuntimeDecorator.h>
#import <ReactCommon/RCTTurboModuleWithJSIBindings.h>
#import <jsi/jsi.h>

using namespace facebook;
using namespace expensify::livemarkdown;

@interface LiveMarkdownModule () <RCTTurboModuleWithJSIBindings>
@end

@implementation LiveMarkdownModule

RCT_EXPORT_MODULE()

// JSI bindings are injected in installJSIBindingsWithRuntime:callInvoker:, which RCTTurboModuleManager
// calls before the module is returned to JS, so there is nothing left to do here.
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
  return @(1);
}

- (void)installJSIBindingsWithRuntime:(jsi::Runtime &)runtime
                          callInvoker:(const std::shared_ptr<facebook::react::CallInvoker> &)callInvoker
{
  expensify::livemarkdown::injectJSIBindings(runtime);
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(
      params);
}

@end
