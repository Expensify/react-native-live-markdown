#pragma once

#include <fbjni/fbjni.h>
#include <react/fabric/JFabricUIManager.h>

#include <string>

#include "MarkdownCommitHook.h"

namespace expensify {
namespace livemarkdown {

using namespace facebook;
using namespace facebook::jni;

class NativeProxy : public jni::HybridClass<NativeProxy> {
public:
  static auto constexpr kJavaDescriptor =
      "Lcom/expensify/livemarkdown/NativeProxy;";
  static jni::local_ref<jhybriddata>
  initHybrid(jni::alias_ref<jhybridobject> jThis);
  static void registerNatives();

  ~NativeProxy();

private:
  friend HybridBase;
  jni::global_ref<NativeProxy::javaobject> javaPart_;
  std::shared_ptr<MarkdownCommitHook> commitHook_;

  explicit NativeProxy(jni::alias_ref<NativeProxy::javaobject> jThis);

  void
  createCommitHook(jni::alias_ref<facebook::react::JFabricUIManager::javaobject>
                       fabricUIManager);
};

} // namespace livemarkdown
} // namespace expensify
