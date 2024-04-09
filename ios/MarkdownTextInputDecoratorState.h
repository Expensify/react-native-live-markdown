#pragma once

#include <react/renderer/core/ShadowNodeFamily.h>

namespace facebook {
namespace react {

class JSI_EXPORT MarkdownTextInputDecoratorState final {
public:
  using Shared = std::shared_ptr<const MarkdownTextInputDecoratorState>;

  MarkdownTextInputDecoratorState() : decoratorFamily(nullptr){};
  MarkdownTextInputDecoratorState(
      const ShadowNodeFamily::Shared textInputFamily_)
      : decoratorFamily(textInputFamily_){};

  const ShadowNodeFamily::Shared decoratorFamily;
};

} // namespace react
} // namespace facebook
