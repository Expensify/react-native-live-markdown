#include "RuntimeDecorator.h"
#include "MarkdownGlobal.h"

using namespace facebook;
using namespace worklets;

namespace expensify {
namespace livemarkdown {

void injectJSIBindings(jsi::Runtime &rt) {

  rt.global().setProperty(rt, "jsi_setMarkdownRuntime", jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, "jsi_setMarkdownRuntime"),
      1,
      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
        setMarkdownRuntime(extractWorkletRuntime(rt, args[0]));
        return jsi::Value::undefined();
      }));

  rt.global().setProperty(rt, "jsi_registerMarkdownWorklet", jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, "jsi_registerMarkdownWorklet"),
      1,
      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
        const auto parserId = registerMarkdownWorklet(extractSerializableOrThrow<SerializableWorklet>(rt, args[0]));
        return jsi::Value(parserId);
      }));

  rt.global().setProperty(rt, "jsi_unregisterMarkdownWorklet", jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, "jsi_unregisterMarkdownWorklet"),
      1,
      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
        auto parserId = static_cast<int>(args[0].asNumber());
        unregisterMarkdownWorklet(parserId);
        return jsi::Value::undefined();
      }));

}

} // namespace livemarkdown
} // namespace expensify
