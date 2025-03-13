#pragma once

#include <react/renderer/components/RNLiveMarkdownSpec/MarkdownTextInputDecoratorState.h>
#include <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#include <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/core/LayoutContext.h>

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
                                       ShadowNodeTraits traits)
      : ConcreteViewShadowNode(fragment, family, traits) {
    initialize();

    if (fragment.children) {
      overwriteMeasureCallbackConnector();
    }
  }

  MarkdownTextInputDecoratorShadowNode(ShadowNode const &sourceShadowNode,
                                       ShadowNodeFragment const &fragment)
      : ConcreteViewShadowNode(sourceShadowNode, fragment) {
    initialize();

    if (fragment.children) {
      overwriteMeasureCallbackConnector();
    }
  }

  void appendChild(const ShadowNode::Shared &child) override;
  void replaceChild(const ShadowNode &oldChild,
                    const ShadowNode::Shared &newChild,
                    size_t suggestedIndex = SIZE_MAX) override;
  void layout(LayoutContext layoutContext) override;
  Size
  measureContent(const LayoutContext &layoutContext,
                 const LayoutConstraints &layoutConstraints) const override;

private:
  void initialize();
  void overwriteMeasureCallbackConnector();
  void applyMarkdownFormattingToTextInputState(std::shared_ptr<TextInputShadowNode> node,
                     const LayoutContext &layoutContext) const;
  static YGSize yogaNodeMeasureCallbackConnector(YGNodeConstRef yogaNode,
                                                 float width,
                                                 YGMeasureMode widthMode,
                                                 float height,
                                                 YGMeasureMode heightMode);
  static YogaLayoutableShadowNode &
  shadowNodeFromContext(YGNodeConstRef yogaNode);
};

} // namespace react
} // namespace facebook
