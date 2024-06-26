#include "MarkdownUtils.h"

#include <fbjni/fbjni.h>
#include <hermes/hermes.h>

using namespace facebook;

namespace expensify {
namespace livemarkdown {
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
    auto arg = input->toStdString();
    jsi::Value result;
    try {
      result = func.call(rt, arg);
    } catch (jsi::JSError e) {
      result = jsi::Array(rt, 0);
    }
    auto json = rt.global().getPropertyAsObject(rt, "JSON").getPropertyAsFunction(rt, "stringify").call(rt, result).asString(rt).utf8(rt);
    return jni::make_jstring(json);
  }

  void MarkdownUtils::registerNatives() {
    registerHybrid({
        makeNativeMethod("nativeInitializeRuntime", MarkdownUtils::nativeInitializeRuntime),
        makeNativeMethod("nativeParseMarkdown", MarkdownUtils::nativeParseMarkdown)});
  }

} // namespace livemarkdown
} // namespace expensify
