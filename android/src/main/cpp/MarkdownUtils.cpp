#include "MarkdownUtils.h"
#include "MarkdownGlobal.h"

#include <fbjni/fbjni.h>

using namespace facebook;

namespace expensify {
namespace livemarkdown {
  jni::local_ref<jni::JString> MarkdownUtils::nativeParseMarkdown(
      jni::alias_ref<jhybridobject> jThis,
      jni::alias_ref<jni::JString> input,
      int parserId) {
    const auto markdownRuntime = expensify::livemarkdown::getMarkdownRuntime();
    jsi::Runtime &rt = markdownRuntime->getJSIRuntime();

    const auto markdownWorklet = expensify::livemarkdown::getMarkdownWorklet(parserId);

    const auto text = jsi::String::createFromUtf8(rt, input->toStdString());
    const auto result = markdownRuntime->runGuarded(markdownWorklet, text);

    const auto json = rt.global().getPropertyAsObject(rt, "JSON").getPropertyAsFunction(rt, "stringify").call(rt, result).asString(rt).utf8(rt);
    return jni::make_jstring(json);
  }

  void MarkdownUtils::registerNatives() {
    registerHybrid({
        makeNativeMethod("nativeParseMarkdown", MarkdownUtils::nativeParseMarkdown)});
  }

} // namespace livemarkdown
} // namespace expensify
