#pragma once

#ifdef ANDROID
#include "AndroidMarkdownTextInputDecoratorShadowNode.h"
#else
#include "IOSMarkdownTextInputDecoratorShadowNode.h"
#endif

#include <react/debug/react_native_assert.h>
#include <react/renderer/core/ConcreteComponentDescriptor.h>

namespace facebook {
namespace react {

class MarkdownTextInputDecoratorViewComponentDescriptor final
    : public ConcreteComponentDescriptor<MarkdownTextInputDecoratorShadowNode> {
public:
  using ConcreteComponentDescriptor::ConcreteComponentDescriptor;
};

} // namespace react
} // namespace facebook
