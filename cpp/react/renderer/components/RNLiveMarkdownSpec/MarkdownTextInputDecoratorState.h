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

#ifdef ANDROID
  MarkdownTextInputDecoratorState(
      MarkdownTextInputDecoratorState const &previousState, folly::dynamic data)
      : decoratorFamily(previousState.decoratorFamily){};
#endif

  const ShadowNodeFamily::Shared decoratorFamily;

#ifdef ANDROID
  folly::dynamic getDynamic() const {
    return folly::dynamic::object("decoratorFamily", "pointer should be here?");
  }
  MapBuffer getMapBuffer() const { return MapBufferBuilder::EMPTY(); };
#endif
};

} // namespace react
} // namespace facebook
