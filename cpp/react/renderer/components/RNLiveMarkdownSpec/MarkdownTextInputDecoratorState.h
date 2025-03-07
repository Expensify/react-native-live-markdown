#pragma once

#include <memory>
#include <react/renderer/core/ShadowNodeFamily.h>

namespace facebook {
namespace react {

class JSI_EXPORT MarkdownTextInputDecoratorState final {
public:
  using Shared = std::shared_ptr<const MarkdownTextInputDecoratorState>;

  MarkdownTextInputDecoratorState()
      : decoratorFamily(nullptr), markdownUtils(nullptr){};
  MarkdownTextInputDecoratorState(
      const ShadowNodeFamily::Shared textInputFamily_)
      : decoratorFamily(textInputFamily_), markdownUtils(nullptr){};
  MarkdownTextInputDecoratorState(
      const ShadowNodeFamily::Shared textInputFamily_,
      const std::shared_ptr<void> markdownUtils_)
      : decoratorFamily(textInputFamily_), markdownUtils(markdownUtils_){};

#ifdef ANDROID
  MarkdownTextInputDecoratorState(
      MarkdownTextInputDecoratorState const &previousState, folly::dynamic data)
      : decoratorFamily(previousState.decoratorFamily),
        markdownUtils(nullptr){};
#endif

  const ShadowNodeFamily::Shared decoratorFamily;
  const std::shared_ptr<void> markdownUtils;

#ifdef ANDROID
  folly::dynamic getDynamic() const {
    return folly::dynamic::object("decoratorFamily", "pointer should be here?");
  }
  MapBuffer getMapBuffer() const { return MapBufferBuilder::EMPTY(); };
#endif
};

} // namespace react
} // namespace facebook
