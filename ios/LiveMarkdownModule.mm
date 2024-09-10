#import "LiveMarkdownModule.h"
#import <RNLiveMarkdown/MarkdownCommitHook.h>
#import <RNLiveMarkdown/RuntimeDecorator.h>

#import <React/RCTBridge+Private.h>
#import <React/RCTScheduler.h>
#import <React/RCTSurfacePresenter.h>
#import <jsi/jsi.h>

using namespace facebook;

@implementation LiveMarkdownModule {
  BOOL installed_;
  std::shared_ptr<livemarkdown::MarkdownCommitHook> commitHook_;
  __weak RCTSurfacePresenter *surfacePresenter_;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
  RCTCxxBridge *cxxBridge = (RCTCxxBridge *)[RCTBridge currentBridge];
  jsi::Runtime &rt = *(jsi::Runtime *)cxxBridge.runtime;
  expensify::livemarkdown::injectJSIBindings(rt);
  
  RCTScheduler *scheduler = [surfacePresenter_ scheduler];
  commitHook_ = std::make_shared<livemarkdown::MarkdownCommitHook>(scheduler.uiManager);
  installed_ = YES;
  
  return @(1);
}

- (void)handleJavaScriptDidLoadNotification:(NSNotification *)notification
{
  surfacePresenter_ = self.bridge.surfacePresenter;
  [self install];
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

- (void)invalidate {
  MarkdownShadowFamilyRegistry::reset();
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  [super invalidate];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(params);
}
#endif // RCT_NEW_ARCH_ENABLED

@end
