# project("livemarkdown")

# cmake_minimum_required(VERSION 3.13)

# set (CMAKE_CXX_STANDARD 20)
# # set (CMAKE_CXX_STANDARD 17)
# set(CMAKE_VERBOSE_MAKEFILE on)

# set(LIB_LITERAL RNLiveMarkdownSpec)
# set(LIB_TARGET_NAME react_codegen_${LIB_LITERAL})

# set(LIB_ANDROID_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../..)
# set(LIB_ANDROID_GENERATED_JNI_DIR ${LIB_ANDROID_DIR}/build/generated/source/codegen/jni)
# set(LIB_ANDROID_GENERATED_COMPONENTS_DIR ${LIB_ANDROID_GENERATED_JNI_DIR}/react/renderer/components/${LIB_LITERAL})


# set(REACT_NATIVE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../example/node_modules/react-native)

# include("${REACT_NATIVE_DIR}/ReactAndroid/cmake-utils/folly-flags.cmake")
# add_compile_options(${folly_FLAGS})
# add_compile_options(-fvisibility=hidden -fexceptions -frtti)

# file(GLOB livemarkdown_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)

# add_library(${LIB_TARGET_NAME} SHARED ${livemarkdown_SRC})

# # set(TEXT_INPUT_DIR ${REACT_NATIVE_DIR}/ReactCommon/react/renderer/components/textinput/androidtextinput)

# # target_include_directories(${LIB_TARGET_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR} ${TEXT_INPUT_DIR})

# target_include_directories(
#   ${LIB_TARGET_NAME}
#   PUBLIC
#   .
#   ${LIB_ANDROID_GENERATED_JNI_DIR}
#   ${LIB_ANDROID_GENERATED_COMPONENTS_DIR}
# )

# find_package(fbjni REQUIRED CONFIG)
# find_package(ReactAndroid REQUIRED CONFIG)
# find_package(hermes-engine REQUIRED CONFIG)

# target_link_libraries(
#         ${LIB_TARGET_NAME}
#         fbjni::fbjni
#         ReactAndroid::jsi
#         ReactAndroid::fabricjni
#         ReactAndroid::reactnativejni
#         ReactAndroid::folly_runtime
#         ReactAndroid::glog
#         ReactAndroid::react_debug
#         ReactAndroid::react_utils
#         ReactAndroid::react_render_core
#         ReactAndroid::react_render_debug
#         ReactAndroid::react_render_graphics
#         ReactAndroid::react_render_mapbuffer
#         ReactAndroid::react_render_mounting
#         ReactAndroid::react_render_scheduler
#         ReactAndroid::react_render_uimanager
#         ReactAndroid::rrc_view
#         ReactAndroid::yoga
#         ReactAndroid::turbomodulejsijni
#         ReactAndroid::react_nativemodule_core
#         ReactAndroid::react_codegen_rncore
#         hermes-engine::libhermes
# )

# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE ON)

set(LIB_LITERAL RNLiveMarkdownSpec)
set(LIB_TARGET_NAME react_codegen_${LIB_LITERAL})

set(LIB_ANDROID_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../..)
set(LIB_CPP_DIR ${LIB_ANDROID_DIR}/../cpp)
set(LIB_CUSTOM_SOURCES_DIR ${LIB_CPP_DIR}/react/renderer/components/${LIB_LITERAL})
set(LIB_ANDROID_GENERATED_JNI_DIR ${LIB_ANDROID_DIR}/build/generated/source/codegen/jni)
set(LIB_ANDROID_GENERATED_COMPONENTS_DIR ${LIB_ANDROID_GENERATED_JNI_DIR}/react/renderer/components/${LIB_LITERAL})

add_compile_options(
  -fexceptions
  -frtti
  -std=c++17
  -Wall
  -Wpedantic
  -Wno-gnu-zero-variadic-macro-arguments
)

file(GLOB LIB_MODULE_SRCS CONFIGURE_DEPENDS *.cpp)
file(GLOB LIB_CUSTOM_SRCS CONFIGURE_DEPENDS ${LIB_CUSTOM_SOURCES_DIR}/*.cpp)
file(GLOB LIB_CODEGEN_SRCS CONFIGURE_DEPENDS ${LIB_ANDROID_GENERATED_COMPONENTS_DIR}/*.cpp)

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

target_link_libraries(
  ${LIB_TARGET_NAME}
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
  react_utils
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
  -std=c++17
  -Wall
)

target_include_directories(
 ${CMAKE_PROJECT_NAME}
 PUBLIC
 ${CMAKE_CURRENT_SOURCE_DIR}
)