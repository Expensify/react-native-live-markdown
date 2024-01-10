project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

file(GLOB livemarkdown_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)

add_library(${CMAKE_PROJECT_NAME} SHARED ${livemarkdown_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR})

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)

target_link_libraries(${CMAKE_PROJECT_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
        ReactAndroid::reactnativejni
        hermes-engine::libhermes)
