#include "MarkdownShadowFamilyRegistry.h"

std::set<facebook::react::ShadowNodeFamily::Shared> MarkdownShadowFamilyRegistry::_familiesToUpdate;
std::set<facebook::react::Tag> MarkdownShadowFamilyRegistry::_forcedUpdates;
std::mutex MarkdownShadowFamilyRegistry::_mutex;

void MarkdownShadowFamilyRegistry::registerFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.insert(family);
}

void MarkdownShadowFamilyRegistry::unregisterFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.erase(family);
}

void MarkdownShadowFamilyRegistry::reset() {
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    MarkdownShadowFamilyRegistry::_familiesToUpdate.clear();
    MarkdownShadowFamilyRegistry::_forcedUpdates.clear();
}

void MarkdownShadowFamilyRegistry::runForEveryFamily(std::function<void (facebook::react::ShadowNodeFamily::Shared)> fun)
{
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    for (auto &family : MarkdownShadowFamilyRegistry::_familiesToUpdate) {
        fun(family);
    }
}

void MarkdownShadowFamilyRegistry::forceNextStateUpdate(facebook::react::Tag tag) {
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    _forcedUpdates.insert(tag);
}

bool MarkdownShadowFamilyRegistry::shouldForceUpdate(facebook::react::Tag tag) {
    auto lock = std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::_mutex);
    bool force = _forcedUpdates.contains(tag);
    if (force) {
        _forcedUpdates.erase(tag);
        return true;
    }
    return false;
}
