project("livemarkdown")

cmake_minimum_required(VERSION 3.13)

set(CMAKE_VERBOSE_MAKEFILE on)

set(NODE_MODULES_DIR "${REACT_NATIVE_ROOT_DIR}/..")
set(REACT_NATIVE_WORKLETS_DIR "${NODE_MODULES_DIR}/react-native-worklets")
set(REACT_NATIVE_REANIMATED_DIR "${NODE_MODULES_DIR}/react-native-reanimated")

if(EXISTS "${REACT_NATIVE_WORKLETS_DIR}")
  set(IS_WORKLETS TRUE)
endif()

if(EXISTS "${REACT_NATIVE_REANIMATED_DIR}")
  set(IS_REANIMATED TRUE)
endif()

if(IS_WORKLETS)
  include("${REACT_NATIVE_ROOT_DIR}/ReactAndroid/cmake-utils/folly-flags.cmake")
  add_compile_options(${folly_FLAGS})
endif()

add_compile_options(-fvisibility=hidden -fexceptions -frtti)

string(APPEND CMAKE_CXX_FLAGS " -DREACT_NATIVE_MINOR_VERSION=${REACT_NATIVE_MINOR_VERSION}")

set(CPP_DIR "${CMAKE_CURRENT_SOURCE_DIR}/../../../../cpp")

file(GLOB ANDROID_SRC CONFIGURE_DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/*.cpp)
file(GLOB CPP_SRC CONFIGURE_DEPENDS "${CPP_DIR}/*.cpp")

add_library(${CMAKE_PROJECT_NAME} SHARED ${ANDROID_SRC} ${CPP_SRC})

target_include_directories(${CMAKE_PROJECT_NAME} PRIVATE ${CMAKE_CURRENT_SOURCE_DIR} ${CPP_DIR} "${REACT_NATIVE_ROOT_DIR}/ReactCommon/jsiexecutor")

find_package(fbjni REQUIRED CONFIG)
find_package(ReactAndroid REQUIRED CONFIG)

if(IS_REANIMATED)
  find_package(react-native-reanimated CONFIG QUIET)
endif()
if(IS_WORKLETS)
  find_package(react-native-worklets REQUIRED CONFIG)
  add_definitions(-DIS_WORKLETS)
endif()

target_link_libraries(
        ${CMAKE_PROJECT_NAME}
        fbjni::fbjni
        ReactAndroid::jsi
        ReactAndroid::reactnative
        react-native-worklets::worklets
)

if(IS_REANIMATED)
  target_link_libraries(${CMAKE_PROJECT_NAME} react-native-reanimated::worklets)
elseif(IS_WORKLETS)
  target_link_libraries(${CMAKE_PROJECT_NAME} react-native-worklets::worklets)
endif()
