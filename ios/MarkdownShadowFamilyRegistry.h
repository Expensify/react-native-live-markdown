#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <mutex>

// A registry to store pointers to the ShadowNodeFamilies of markdown decorators.
// The only place we can _legally_ access the family of shadow node is in the constructor
// and we need it inside commit hook. To achieve it, we use this simple registry where families
// are registered when nodes are created and cleaned up when native view is removed from window
// or when a turbomodule is deallocated.

class MarkdownShadowFamilyRegistry {
public:
    static void registerFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family);
    static void unregisterFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family);
    static void clearRegisteredFamilies();
    static void runForEveryFamily(std::function<void(facebook::react::ShadowNodeFamily::Shared family)> fun);

private:
    static std::set<facebook::react::ShadowNodeFamily::Shared> _familiesToUpdate;
    static std::mutex _familiesMutex;
};
