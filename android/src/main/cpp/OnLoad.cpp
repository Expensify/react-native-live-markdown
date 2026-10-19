#include <fbjni/fbjni.h>

#include "LiveMarkdownModule.h"
#include "MarkdownParser.h"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
    return facebook::jni::initialize(vm, [] {
        expensify::livemarkdown::LiveMarkdownModule::registerNatives();
        expensify::livemarkdown::MarkdownParser::registerNatives();
    });
}
