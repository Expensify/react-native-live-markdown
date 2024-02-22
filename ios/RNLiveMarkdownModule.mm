#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTSurfacePresenter.h>
#import <React/RCTScheduler.h>

#import "RNLiveMarkdownModule.h"
#import "MarkdownCommitHook.h"
#import "MarkdownShadowFamilyRegistry.h"

@implementation RNLiveMarkdownModule {
    BOOL installed_;
    std::shared_ptr<livemarkdown::MarkdownCommitHook> commitHook_;
}

RCT_EXPORT_MODULE(@"RNLiveMarkdownModule")

- (NSNumber*)install
{
    if (!installed_) {
        installed_ = YES;
        
        RCTBridge *bridge = self.bridge;
        RCTSurfacePresenter *surfacePresenter = bridge.surfacePresenter;
        RCTScheduler *scheduler = [surfacePresenter scheduler];
        
        commitHook_ = std::make_shared<livemarkdown::MarkdownCommitHook>(scheduler.uiManager);
    }
    return @1;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeMarkdownModuleSpecJSI>(params);
}

- (void)invalidate
{
    MarkdownShadowFamilyRegistry::clearRegisteredFamilies();
    [super invalidate];
}

@end

#endif // RCT_NEW_ARCH_ENABLED

