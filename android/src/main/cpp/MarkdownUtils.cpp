#include "MarkdownUtils.h"

#include <fbjni/fbjni.h>
#include <hermes/hermes.h>

using namespace facebook;

namespace markdowntextinput {
  std::shared_ptr<jsi::Runtime> MarkdownUtils::runtime_;

  void MarkdownUtils::nativeInitializeRuntime(
      jni::alias_ref<jhybridobject> jThis,
      jni::alias_ref<jni::JString> code) {
    assert(runtime_ == nullptr && "Markdown runtime is already initialized");
    runtime_ = facebook::hermes::makeHermesRuntime();
    auto codeBuffer = std::make_shared<const jsi::StringBuffer>(code->toStdString());
    runtime_->evaluateJavaScript(codeBuffer, "nativeInitializeRuntime");
  }

  jni::local_ref<jni::JString> MarkdownUtils::nativeParseMarkdown(
      jni::alias_ref<jhybridobject> jThis,
      jni::alias_ref<jni::JString> input) {
    jsi::Runtime &rt = *runtime_;
    auto func = rt.global().getPropertyAsFunction(rt, "parseExpensiMarkToRanges");
    auto output = func.call(rt, input->toStdString());
    auto json = rt.global().getPropertyAsObject(rt, "JSON").getPropertyAsFunction(rt, "stringify").call(rt, output).asString(rt).utf8(rt);
    return jni::make_jstring(json);
  }

  void MarkdownUtils::registerNatives() {
    registerHybrid({
        makeNativeMethod("nativeInitializeRuntime", MarkdownUtils::nativeInitializeRuntime),
        makeNativeMethod("nativeParseMarkdown", MarkdownUtils::nativeParseMarkdown)});
  }

} // namespace markdowntextinput
