cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 20)

set(LIB_LITERAL RNLiveMarkdownSpec)
set(LIB_TARGET_NAME react_codegen_${LIB_LITERAL})

set(LIB_ANDROID_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../..)
set(LIB_CPP_DIR ${LIB_ANDROID_DIR}/../cpp)
set(LIB_CUSTOM_SOURCES_DIR ${LIB_CPP_DIR}/react/renderer/components/${LIB_LITERAL})
set(LIB_ANDROID_GENERATED_JNI_DIR ${LIB_ANDROID_DIR}/build/generated/source/codegen/jni)
set(LIB_ANDROID_GENERATED_COMPONENTS_DIR ${LIB_ANDROID_GENERATED_JNI_DIR}/react/renderer/components/${LIB_LITERAL})

file(GLOB LIB_MODULE_SRCS CONFIGURE_DEPENDS *.cpp)
file(GLOB LIB_CUSTOM_SRCS CONFIGURE_DEPENDS ${LIB_CUSTOM_SOURCES_DIR}/*.cpp)
file(GLOB LIB_CODEGEN_SRCS CONFIGURE_DEPENDS ${LIB_ANDROID_GENERATED_COMPONENTS_DIR}/*.cpp)

set(RN_DIR ${LIB_ANDROID_DIR}/../example/node_modules/react-native)

add_library(
        ${LIB_TARGET_NAME}
        SHARED
        ${LIB_MODULE_SRCS}
        ${LIB_CUSTOM_SRCS}
        ${LIB_CODEGEN_SRCS}
)

target_include_directories(
        ${LIB_TARGET_NAME}
        PUBLIC
        .
        ${LIB_ANDROID_GENERATED_JNI_DIR}
        ${LIB_ANDROID_GENERATED_COMPONENTS_DIR}
        ${LIB_CPP_DIR}
)

find_package(ReactAndroid REQUIRED CONFIG)

if (ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
  target_link_libraries(
          ${LIB_TARGET_NAME}
          ReactAndroid::reactnative
          ReactAndroid::jsi
          fbjni::fbjni
  )
elseif (ReactAndroid_VERSION_MINOR GREATER_EQUAL 75)
  target_link_libraries(
          ${LIB_TARGET_NAME}
          ReactAndroid::rrc_text
          ReactAndroid::rrc_textinput
          ReactAndroid::react_render_textlayoutmanager
          ReactAndroid::react_render_imagemanager
          ReactAndroid::reactnativejni
          ReactAndroid::mapbufferjni
          fabricjni
          fbjni
          folly_runtime
          glog
          jsi
          react_codegen_rncore
          react_debug
          react_nativemodule_core
          react_render_core
          react_render_debug
          react_render_graphics
          react_render_mapbuffer
          ReactAndroid::react_render_uimanager
          ReactAndroid::react_render_scheduler
          react_utils
          runtimeexecutor
          rrc_view
          turbomodulejsijni
          yoga
          android
          log
          mapbufferjni
          reactnativejni
          react_render_consistency
          react_performance_timeline
          react_render_observers_events
          react_featureflags
  )
else ()
  message(FATAL_ERROR "react-native-live-markdown requires react-native 0.75 or newer.")
endif ()

target_compile_options(
        ${LIB_TARGET_NAME}
        PRIVATE
        -DLOG_TAG=\"ReactNative\"
        -fexceptions
        -frtti
        -Wall
        -std=c++20
)

target_include_directories(
        ${CMAKE_PROJECT_NAME}
        PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}
)
