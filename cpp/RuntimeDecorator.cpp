#include "RuntimeDecorator.h"
#include "MarkdownGlobal.h"

using namespace facebook;

namespace expensify {
namespace livemarkdown {

void injectJSIBindings(jsi::Runtime &rt) {

  rt.global().setProperty(rt, "setMarkdownRuntime", jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, "setMarkdownRuntime"),
      1,
      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
        setMarkdownRuntime(reanimated::extractWorkletRuntime(rt, args[0]));
        return jsi::Value::undefined();
      }));

  rt.global().setProperty(rt, "registerMarkdownWorklet", jsi::Function::createFromHostFunction(
      rt,
      jsi::PropNameID::forAscii(rt, "registerMarkdownWorklet"),
      1,
      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
        setMarkdownWorklet(reanimated::extractShareableOrThrow<ShareableWorklet>(rt, args[0]));
        return jsi::Value(1);
      }));

//  rt.global().setProperty(rt, "unregisterMarkdownWorklet", jsi::Function::createFromHostFunction(
//      rt,
//      jsi::PropNameID::forAscii(rt, "unregisterMarkdownWorklet"),
//      1,
//      [](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value {
//        auto parserId = static_cast<int>(args[0].asNumber());
//        (void)parserId;
//        return jsi::Value::undefined();
//      }));

}

} // namespace livemarkdown
} // namespace expensify
