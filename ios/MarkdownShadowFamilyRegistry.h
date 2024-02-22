#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <mutex>

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
