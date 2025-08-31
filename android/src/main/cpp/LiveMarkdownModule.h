#pragma once

#include <ReactCommon/BindingsInstallerHolder.h>
#include <fbjni/fbjni.h>

using namespace facebook;

namespace expensify::livemarkdown {

class LiveMarkdownModule : public jni::JavaClass<LiveMarkdownModule> {
 public:
  static constexpr auto kJavaDescriptor =
      "Lcom/expensify/livemarkdown/LiveMarkdownModule;";

  LiveMarkdownModule() = default;

  static void registerNatives();

 private:
  static jni::local_ref<react::BindingsInstallerHolder::javaobject>
  getBindingsInstaller(jni::alias_ref<LiveMarkdownModule> jobj);
};

} // namespace expensify::livemarkdown
