#include <fbjni/fbjni.h>
#include <react/fabric/Binding.h>
#include <react/renderer/scheduler/Scheduler.h>

#include <string>

#include "NativeProxy.h"

namespace expensify {
namespace livemarkdown {

using namespace facebook;
using namespace react;

NativeProxy::NativeProxy(jni::alias_ref<NativeProxy::javaobject> jThis)
    : javaPart_(jni::make_global(jThis)) {}

NativeProxy::~NativeProxy() {}

void NativeProxy::registerNatives() {
  registerHybrid(
      {makeNativeMethod("initHybrid", NativeProxy::initHybrid),
       makeNativeMethod("createCommitHook", NativeProxy::createCommitHook)});
}

void NativeProxy::createCommitHook(
    jni::alias_ref<facebook::react::JFabricUIManager::javaobject>
        fabricUIManager) {
  const auto &globalUIManager = jni::make_global(fabricUIManager);

  this->commitHook_ = std::make_shared<MarkdownCommitHook>(globalUIManager);
}

jni::local_ref<NativeProxy::jhybriddata>
NativeProxy::initHybrid(jni::alias_ref<jhybridobject> jThis) {
  return makeCxxInstance(jThis);
}

} // namespace livemarkdown
} // namespace expensify
