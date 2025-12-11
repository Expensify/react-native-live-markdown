project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)
set(CMAKE_CXX_STANDARD 20)

include("${REACT_NATIVE_ROOT_DIR}/ReactAndroid/cmake-utils/folly-flags.cmake")
add_compile_options(${folly_FLAGS})

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

string(APPEND CMAKE_CXX_FLAGS " -DREACT_NATIVE_MINOR_VERSION=${REACT_NATIVE_MINOR_VERSION}")

set(CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../../cpp")

file(GLOB ANDROID_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)
file(GLOB CPP_SRC CONFIGURE_DEPENDS "${CPP_DIR}/*.cpp")

add_library(${CMAKE_PROJECT_NAME} SHARED ${ANDROID_SRC} ${CPP_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR} ${CPP_DIR} "${REACT_NATIVE_ROOT_DIR}/ReactCommon/jsiexecutor")

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(react-native-worklets REQUIRED CONFIG)

target_link_libraries(
        ${CMAKE_PROJECT_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
        ReactAndroid::reactnative
        react-native-worklets::worklets
)
