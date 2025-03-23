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
        ReactAndroid::reactnative
        react-native-reanimated::worklets
)
