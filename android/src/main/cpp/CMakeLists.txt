project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

string(APPEND CMAKE_CXX_FLAGS " -DREACT_NATIVE_MINOR_VERSION=${REACT_NATIVE_MINOR_VERSION}")

file(GLOB livemarkdown_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)

add_library(${CMAKE_PROJECT_NAME} SHARED ${livemarkdown_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)

if (REACT_NATIVE_MINOR_VERSION GREATER_EQUAL 76)
  target_link_libraries(${CMAKE_PROJECT_NAME}
          fbjni::fbjni
          ReactAndroid::jsi
          ReactAndroid::reactnative
          hermes-engine::libhermes)
elseif (REACT_NATIVE_MINOR_VERSION GREATER_EQUAL 75)
  target_link_libraries(${CMAKE_PROJECT_NAME}
          fbjni::fbjni
          ReactAndroid::jsi
          ReactAndroid::reactnativejni
          hermes-engine::libhermes)
else ()
  message(FATAL_ERROR "react-native-live-markdown requires react-native 0.75 or newer.")
endif ()
