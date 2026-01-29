#include "LiveMarkdownModule.h"
#include "RuntimeDecorator.h"

namespace expensify::livemarkdown {

// static
void LiveMarkdownModule::registerNatives() {
  javaClassLocal()->registerNatives({
      makeNativeMethod(
          "getBindingsInstaller",
          LiveMarkdownModule::getBindingsInstaller),
  });
}

// static
jni::local_ref<react::BindingsInstallerHolder::javaobject>
LiveMarkdownModule::getBindingsInstaller(
    jni::alias_ref<LiveMarkdownModule> /*jobj*/) {
  return react::BindingsInstallerHolder::newObjectCxxArgs(
      [](jsi::Runtime& runtime, const std::shared_ptr<react::CallInvoker>&) {
        expensify::livemarkdown::injectJSIBindings(runtime);
      });
}

} // namespace expensify::livemarkdown
