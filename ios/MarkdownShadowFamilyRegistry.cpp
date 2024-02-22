#include "MarkdownShadowFamilyRegistry.h"

std::set<facebook::react::ShadowNodeFamily::Shared> MarkdownShadowFamilyRegistry::_familiesToUpdate;
std::mutex MarkdownShadowFamilyRegistry::_familiesMutex;

void MarkdownShadowFamilyRegistry::registerFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_familiesMutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.insert(family);
}

void MarkdownShadowFamilyRegistry::unregisterFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_familiesMutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.erase(family);
}

void MarkdownShadowFamilyRegistry::clearRegisteredFamilies() {
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_familiesMutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.clear();
}

void MarkdownShadowFamilyRegistry::runForEveryFamily(std::function<void (facebook::react::ShadowNodeFamily::Shared)> fun)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_familiesMutex);
    for (auto &family : MarkdownShadowFamilyRegistry::_familiesToUpdate) {
        fun(family);
    }
}
