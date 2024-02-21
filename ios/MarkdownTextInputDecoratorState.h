#pragma once

#include <react/renderer/core/ShadowNodeFamily.h>

namespace facebook {
namespace react {

class JSI_EXPORT MarkdownTextInputDecoratorState final {
 public:
  using Shared = std::shared_ptr<const MarkdownTextInputDecoratorState>;

  MarkdownTextInputDecoratorState() : textInputFamily() {};
  MarkdownTextInputDecoratorState(const ShadowNodeFamily *textInputFamily_) : textInputFamily(textInputFamily_) {};

  const ShadowNodeFamily* textInputFamily;

#pragma mark - Getters
};

} // namespace react
} // namespace facebook
