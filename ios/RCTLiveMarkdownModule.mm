#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTScheduler.h>
#import <React/RCTSurfacePresenter.h>

#import "MarkdownCommitHook.h"
#import "MarkdownShadowFamilyRegistry.h"
#import "RCTLiveMarkdownModule.h"

// A turbomodule used to register the commit hook
// I think this is the easiest way to access the UIManager, which we need to
// actually register the hook

@implementation RCTLiveMarkdownModule {
  BOOL installed_;
  std::shared_ptr<livemarkdown::MarkdownCommitHook> commitHook_;
  __weak RCTSurfacePresenter *surfacePresenter_;
}

RCT_EXPORT_MODULE(@"LiveMarkdownModule")

- (NSNumber *)install {
  if (!installed_ && surfacePresenter_ != nil) {
    RCTScheduler *scheduler = [surfacePresenter_ scheduler];

    commitHook_ =
      std::make_shared<livemarkdown::MarkdownCommitHook>(scheduler.uiManager);
    installed_ = YES;
  }
  return @1;
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

@end

#endif // RCT_NEW_ARCH_ENABLED
