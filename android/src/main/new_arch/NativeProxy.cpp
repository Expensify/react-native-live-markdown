#include <android/log.h>
#include <fbjni/fbjni.h>
// #include <react/fabric/Binding.h>

#include <string>

#include "NativeProxy.h"

namespace livemarkdown {

using namespace facebook;
using namespace react;

NativeProxy::NativeProxy(jni::alias_ref<NativeProxy::javaobject> jThis)
  : javaPart_(jni::make_global(jThis)) {

}

NativeProxy::~NativeProxy() {

}

void NativeProxy::registerNatives() {
  registerHybrid(
      {makeNativeMethod("initHybrid", NativeProxy::initHybrid),
       makeNativeMethod("createCommitHook", NativeProxy::createCommitHook)});
}

void NativeProxy::createCommitHook(jni::alias_ref<facebook::react::JFabricUIManager::javaobject> fabricUIManager) {
    // const auto &uiManager =
    //         fabricUIManager->getBinding()->getScheduler()->getUIManager();

   __android_log_print(ANDROID_LOG_ERROR, "MDWN", "createCommitHook called");
}

jni::local_ref<NativeProxy::jhybriddata> NativeProxy::initHybrid(jni::alias_ref<jhybridobject> jThis) {
  return makeCxxInstance(jThis);
}

} // namespace livemarkdown
