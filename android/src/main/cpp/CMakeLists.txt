project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

file(GLOB android_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)
file(GLOB cpp_SRC CONFIGURE_DEPENDS /Users/tomekzaw/Expensify/react-native-live-markdown/cpp/*.cpp)

add_library(${CMAKE_PROJECT_NAME} SHARED ${android_SRC} ${cpp_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR} /Users/tomekzaw/Expensify/react-native-live-markdown/cpp)

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)
find_package(react-native-reanimated REQUIRED CONFIG)

target_link_libraries(${CMAKE_PROJECT_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
        ReactAndroid::reactnativejni
        hermes-engine::libhermes
        react-native-reanimated::reanimated
        ReactAndroid::react_nativemodule_core)
