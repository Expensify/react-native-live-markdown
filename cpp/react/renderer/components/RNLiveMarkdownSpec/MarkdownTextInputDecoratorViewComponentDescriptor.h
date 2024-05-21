#pragma once
#if defined(RCT_NEW_ARCH_ENABLED) || defined(ANDROID)

#include "MarkdownTextInputDecoratorShadowNode.h"
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

#endif
