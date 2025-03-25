#pragma once

#include <memory>
#include <react/renderer/core/ShadowNodeFamily.h>

namespace facebook {
namespace react {

class JSI_EXPORT MarkdownTextInputDecoratorState final {
public:
  using Shared = std::shared_ptr<const MarkdownTextInputDecoratorState>;

  MarkdownTextInputDecoratorState(){};

#ifdef ANDROID
  MarkdownTextInputDecoratorState(
      MarkdownTextInputDecoratorState const &previousState, folly::dynamic data){};
#endif

#ifdef ANDROID
  folly::dynamic getDynamic() const {
    return {};
  }
  MapBuffer getMapBuffer() const { return MapBufferBuilder::EMPTY(); };
#endif
};

} // namespace react
} // namespace facebook
