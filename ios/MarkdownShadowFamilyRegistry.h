#pragma once
#ifdef RCT_NEW_ARCH_ENABLED

#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <mutex>
#include <set>

// A registry to store pointers to the ShadowNodeFamilies of markdown
// decorators. The only place we can _legally_ access the family of shadow node
// is in the constructor and we need it inside commit hook. To achieve it, we
// use this simple registry where families are registered when nodes are created
// and cleaned up when native view is removed from window or when a turbomodule
// is deallocated.

class MarkdownShadowFamilyRegistry {
public:
  static void
  registerFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family);
  static void
  unregisterFamilyForUpdates(facebook::react::ShadowNodeFamily::Shared family);
  static void reset();
  static void runForEveryFamily(
      std::function<void(facebook::react::ShadowNodeFamily::Shared family)>
          fun);
  static void forceNextStateUpdate(facebook::react::Tag tag);
  static bool shouldForceUpdate(facebook::react::Tag tag);

private:
  static std::set<facebook::react::ShadowNodeFamily::Shared> familiesToUpdate_;
  static std::set<facebook::react::Tag> forcedUpdates_;
  static std::mutex mutex_;
};

#endif
