#if defined(RCT_NEW_ARCH_ENABLED) || defined(ANDROID)

#include "MarkdownShadowFamilyRegistry.h"

namespace expensify {
namespace livemarkdown {

std::set<facebook::react::ShadowNodeFamily::Shared>
    MarkdownShadowFamilyRegistry::familiesToUpdate_;
std::set<facebook::react::Tag> MarkdownShadowFamilyRegistry::forcedUpdates_;
std::mutex MarkdownShadowFamilyRegistry::mutex_;

void MarkdownShadowFamilyRegistry::registerFamilyForUpdates(
    facebook::react::ShadowNodeFamily::Shared family) {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  MarkdownShadowFamilyRegistry::familiesToUpdate_.insert(family);
}

void MarkdownShadowFamilyRegistry::unregisterFamilyForUpdates(
    facebook::react::ShadowNodeFamily::Shared family) {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  MarkdownShadowFamilyRegistry::familiesToUpdate_.erase(family);
}

void MarkdownShadowFamilyRegistry::reset() {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  MarkdownShadowFamilyRegistry::familiesToUpdate_.clear();
  MarkdownShadowFamilyRegistry::forcedUpdates_.clear();
}

void MarkdownShadowFamilyRegistry::runForEveryFamily(
    std::function<void(facebook::react::ShadowNodeFamily::Shared)> fun) {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  for (auto &family : MarkdownShadowFamilyRegistry::familiesToUpdate_) {
    fun(family);
  }
}

void MarkdownShadowFamilyRegistry::forceNextStateUpdate(
    facebook::react::Tag tag) {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  forcedUpdates_.insert(tag);
}

bool MarkdownShadowFamilyRegistry::shouldForceUpdate(facebook::react::Tag tag) {
  auto lock =
      std::unique_lock<std::mutex>(MarkdownShadowFamilyRegistry::mutex_);
  bool force = forcedUpdates_.contains(tag);
  if (force) {
    forcedUpdates_.erase(tag);
    return true;
  }
  return false;
}

} // namespace livemarkdown
} // namespace expensify

#endif
