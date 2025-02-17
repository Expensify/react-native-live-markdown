#include "MarkdownParser.h"
#include "MarkdownGlobal.h"

#include <fbjni/fbjni.h>

using namespace facebook;

namespace expensify {
namespace livemarkdown {
  jni::local_ref<jni::JString> MarkdownParser::nativeParse(
      jni::alias_ref<jhybridobject> jThis,
      jni::alias_ref<jni::JString> text,
      const int parserId) {
    const auto markdownRuntime = expensify::livemarkdown::getMarkdownRuntime();
    jsi::Runtime &rt = markdownRuntime->getJSIRuntime();

    const auto markdownWorklet = expensify::livemarkdown::getMarkdownWorklet(parserId);

    const auto input = jsi::String::createFromUtf8(rt, text->toStdString());
    const auto output = markdownRuntime->runGuarded(markdownWorklet, input);

    const auto json = rt.global().getPropertyAsObject(rt, "JSON").getPropertyAsFunction(rt, "stringify").call(rt, output).asString(rt).utf8(rt);
    return jni::make_jstring(json);
  }

  void MarkdownParser::registerNatives() {
    registerHybrid({
        makeNativeMethod("nativeParse", MarkdownParser::nativeParse)});
  }

} // namespace livemarkdown
} // namespace expensify
