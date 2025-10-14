#include <fbjni/fbjni.h>

#include "MarkdownParser.h"
#include "RuntimeDecorator.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    return facebook::jni::initialize(
            vm, [] { expensify::livemarkdown::MarkdownParser::registerNatives(); });
}

extern "C" JNIEXPORT void JNICALL Java_com_expensify_livemarkdown_LiveMarkdownModule_injectJSIBindings(JNIEnv *env, jobject thiz, jlong jsiRuntime) {
  jsi::Runtime &rt = *reinterpret_cast<jsi::Runtime*>(jsiRuntime);
  expensify::livemarkdown::injectJSIBindings(rt);
}
