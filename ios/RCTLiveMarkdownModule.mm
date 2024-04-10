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
}

RCT_EXPORT_MODULE(@"LiveMarkdownModule")

- (NSNumber *)install {
  if (!installed_) {
    installed_ = YES;

    RCTBridge *bridge = self.bridge;
    RCTSurfacePresenter *surfacePresenter = bridge.surfacePresenter;
    RCTScheduler *scheduler = [surfacePresenter scheduler];

    commitHook_ =
        std::make_shared<livemarkdown::MarkdownCommitHook>(scheduler.uiManager);
  }
  return @1;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLiveMarkdownModuleSpecJSI>(
      params);
}

- (void)invalidate {
  MarkdownShadowFamilyRegistry::reset();
  [super invalidate];
}

@end

#endif // RCT_NEW_ARCH_ENABLED
