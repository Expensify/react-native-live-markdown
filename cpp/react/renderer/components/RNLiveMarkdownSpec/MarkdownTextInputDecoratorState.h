#pragma once

#include <memory>
#include <react/renderer/core/ShadowNodeFamily.h>

namespace facebook {
namespace react {

class JSI_EXPORT MarkdownTextInputDecoratorState final {
public:
  using Shared = std::shared_ptr<const MarkdownTextInputDecoratorState>;

  MarkdownTextInputDecoratorState(){};
  MarkdownTextInputDecoratorState(
      const bool appliedMarkdownFormatting_)
      : appliedMarkdownFormatting(appliedMarkdownFormatting_){};

#ifdef ANDROID
  MarkdownTextInputDecoratorState(
      MarkdownTextInputDecoratorState const &previousState, folly::dynamic data){};
#endif

    const bool appliedMarkdownFormatting{false};

#ifdef ANDROID
  folly::dynamic getDynamic() const {
    return folly::dynamic::object("decoratorFamily", "pointer should be here?");
  }
  MapBuffer getMapBuffer() const { return MapBufferBuilder::EMPTY(); };
#endif
};

} // namespace react
} // namespace facebook
