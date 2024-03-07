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
  ${RN_DIR}/ReactCommon/
  ${RN_DIR}/ReactCommon/react/renderer/components/textinput/androidtextinput
  ${RN_DIR}/ReactCommon/react/renderer/textlayoutmanager/platform/android
  /Users/jakubpiasecki/REACT_NATIVE_DOWNLOAD_DIR/boost_1_83_0
)

find_library(
  RRC_TEXT_LIB
  rrc_text
  PATHS ${CMAKE_CURRENT_SOURCE_DIR}/arm64-v8a
  NO_DEFAULT_PATH
  NO_CMAKE_FIND_ROOT_PATH
)

find_library(
  RRC_TEXTINPUT_LIB
  rrc_textinput
  PATHS ${CMAKE_CURRENT_SOURCE_DIR}/arm64-v8a
  NO_DEFAULT_PATH
  NO_CMAKE_FIND_ROOT_PATH
)

find_library(
  REACT_RENDER_TEXTLAYOUTMANAGER_LIB
  react_render_textlayoutmanager
  PATHS ${CMAKE_CURRENT_SOURCE_DIR}/arm64-v8a
  NO_DEFAULT_PATH
  NO_CMAKE_FIND_ROOT_PATH
)

find_package(ReactAndroid REQUIRED CONFIG)

target_link_libraries(
  ${LIB_TARGET_NAME}
  ${RRC_TEXT_LIB}
  ${RRC_TEXTINPUT_LIB}
  ${REACT_RENDER_TEXTLAYOUTMANAGER_LIB}
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
)

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