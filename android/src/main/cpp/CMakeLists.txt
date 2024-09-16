project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

string(APPEND CMAKE_CXX_FLAGS " -DREACT_NATIVE_MINOR_VERSION=${REACT_NATIVE_MINOR_VERSION}")

set(CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../../cpp")

file(GLOB ANDROID_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)
file(GLOB CPP_SRC CONFIGURE_DEPENDS "${CPP_DIR}/*.cpp")

add_library(${CMAKE_PROJECT_NAME} SHARED ${ANDROID_SRC} ${CPP_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR} ${CPP_DIR})

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(react-native-reanimated REQUIRED CONFIG)

target_link_libraries(
        ${CMAKE_PROJECT_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
        react-native-reanimated::worklets
)

if (ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
  target_link_libraries(${CMAKE_PROJECT_NAME} ReactAndroid::reactnative)
elseif (ReactAndroid_VERSION_MINOR GREATER_EQUAL 75)
  target_link_libraries(
          ${CMAKE_PROJECT_NAME}
          ReactAndroid::react_nativemodule_core
          ReactAndroid::reactnativejni
          ReactAndroid::runtimeexecutor
  )
else ()
  message(FATAL_ERROR "react-native-live-markdown requires react-native 0.75 or newer.")
endif ()
