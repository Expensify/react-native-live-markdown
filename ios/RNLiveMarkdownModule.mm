#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTSurfacePresenter.h>
#import <React/RCTScheduler.h>

#import "RNLiveMarkdownModule.h"
#import "MarkdownCommitHook.h"

@implementation RNLiveMarkdownModule {
    BOOL installed_;
    std::shared_ptr<livemarkdown::MarkdownCommitHook> commitHook_;
}

static std::set<facebook::react::ShadowNodeFamily::Shared> _familiesToUpdate;

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
    @synchronized (self) {
        _familiesToUpdate.clear();
    }
    
    [super invalidate];
}

+ (void) registerFamilyForUpdates:(facebook::react::ShadowNodeFamily::Shared)family
{
    @synchronized (self) {
        _familiesToUpdate.insert(family);
    }
}

+ (void)unregisterFamilyForUpdates:(facebook::react::ShadowNodeFamily::Shared)family
{
    @synchronized (self) {
        _familiesToUpdate.erase(family);
    }
}

+ (void)runForEveryFamily:(std::function<void (facebook::react::ShadowNodeFamily::Shared)>)fun
{
    @synchronized (self) {
        for (auto &family : _familiesToUpdate) {
            fun(family);
        }
    }
}

@end

#endif // RCT_NEW_ARCH_ENABLED

