#pragma once

#include <react/renderer/components/RNLiveMarkdownSpec/MarkdownTextInputDecoratorState.h>
#include <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#include <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/core/LayoutContext.h>

#include <atomic>
#include <memory>

namespace facebook {
namespace react {

JSI_EXPORT extern const char MarkdownTextInputDecoratorViewComponentName[];

class JSI_EXPORT MarkdownTextInputDecoratorShadowNode final
    : public ConcreteViewShadowNode<MarkdownTextInputDecoratorViewComponentName,
                                    MarkdownTextInputDecoratorViewProps,
                                    MarkdownTextInputDecoratorViewEventEmitter,
                                    MarkdownTextInputDecoratorState> {
public:
  MarkdownTextInputDecoratorShadowNode(ShadowNodeFragment const &fragment,
                                       ShadowNodeFamily::Shared const &family,
                                       ShadowNodeTraits traits);

  MarkdownTextInputDecoratorShadowNode(ShadowNode const &sourceShadowNode,
                                       ShadowNodeFragment const &fragment);

  void appendChild(const std::shared_ptr<const ShadowNode> &child) override;
  void replaceChild(const ShadowNode &oldChild,
                    const std::shared_ptr<const ShadowNode> &newChild,
                    size_t suggestedIndex = SIZE_MAX) override;
  void layout(LayoutContext layoutContext) override;
  Size
  measureContent(const LayoutContext &layoutContext,
                 const LayoutConstraints &layoutConstraints) const override;

private:
  void initialize();
  void overwriteMeasureCallbackConnector();
  void makeChildNodeMutable();
  void applyMarkdownFormattingToTextInputState(std::shared_ptr<TextInputShadowNode> node,
                     const LayoutContext &layoutContext) const;
  static YGSize yogaNodeMeasureCallbackConnector(YGNodeConstRef yogaNode,
                                                 float width,
                                                 YGMeasureMode widthMode,
                                                 float height,
                                                 YGMeasureMode heightMode);
  static YogaLayoutableShadowNode &
  shadowNodeFromContext(YGNodeConstRef yogaNode);

  // Shared between shadow node clones, so the parser cache survives all the
  // cloning that happens during layout instead of being thrown away on every
  // call to applyMarkdownFormattingToTextInputState.
  mutable std::shared_ptr<void> markdownUtils_;

  // Set from any thread when a background parse finishes.
  // overwriteMeasureCallbackConnector then marks the child's Yoga node dirty so
  // it gets measured again with markdown. Passed along with markdownUtils_.
  mutable std::shared_ptr<std::atomic_bool> needsRemeasure_;
};

} // namespace react
} // namespace facebook
