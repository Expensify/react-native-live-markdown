#import "LiveMarkdownModule.h"

#import <RNLiveMarkdown/RuntimeDecorator.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <RNLiveMarkdown/MarkdownCommitHook.h>
#endif // RCT_NEW_ARCH_ENABLED

#import <React/RCTBridge+Private.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTScheduler.h>
#import <React/RCTSurfacePresenter.h>
#endif // RCT_NEW_ARCH_ENABLED

#import <jsi/jsi.h>

using namespace facebook;
using namespace expensify::livemarkdown;

// A turbomodule used to register the commit hook
// I think this is the easiest way to access the UIManager, which we need to
// actually register the hook

@implementation LiveMarkdownModule {
#ifdef RCT_NEW_ARCH_ENABLED
  std::shared_ptr<MarkdownCommitHook> commitHook_;
  __weak RCTSurfacePresenter *surfacePresenter_;
#endif // RCT_NEW_ARCH_ENABLED
}

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)self.bridge;
  jsi::Runtime &rt = *(jsi::Runtime *)cxxBridge.runtime;
  expensify::livemarkdown::injectJSIBindings(rt);

#ifdef RCT_NEW_ARCH_ENABLED
  RCTScheduler *scheduler = [surfacePresenter_ scheduler];
  commitHook_ = std::make_shared<MarkdownCommitHook>(scheduler.uiManager);
#endif // RCT_NEW_ARCH_ENABLED

  return @(1);
}

#ifdef RCT_NEW_ARCH_ENABLED

- (void)handleJavaScriptDidLoadNotification:(NSNotification *)notification
{
  surfacePresenter_ = self.bridge.surfacePresenter;
}

- (void)setBridge:(RCTBridge *)bridge
{
  [super setBridge:bridge];

  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleJavaScriptDidLoadNotification:)
                                               name:RCTJavaScriptDidLoadNotification
                                             object:nil];

  // only within the first loading `self.bridge.surfacePresenter` exists
  // during the reload `self.bridge.surfacePresenter` is null
  if (self.bridge.surfacePresenter) {
    surfacePresenter_ = self.bridge.surfacePresenter;
  }
}

/*
 * Taken from RCTNativeAnimatedTurboModule:
 * This selector is invoked via BridgelessTurboModuleSetup.
 */
- (void)setSurfacePresenter:(id<RCTSurfacePresenterStub>)surfacePresenter
{
  surfacePresenter_ = surfacePresenter;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(
      params);
}

- (void)invalidate {
  MarkdownShadowFamilyRegistry::reset();
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  [super invalidate];
}

#endif // RCT_NEW_ARCH_ENABLED

@end
