#ifdef ANDROID
#pragma once

#include "MarkdownTextInputDecoratorState.h"
#include "OwningShadowNodeFragment.h"
#include <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#include <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#include <react/renderer/components/androidtextinput/AndroidTextInputShadowNode.h>

#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/core/LayoutContext.h>

using namespace expensify::livemarkdown;

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
    createCustomContextContainer();

    if (fragment.children) {
      adoptChildren();
    }
  }

  MarkdownTextInputDecoratorShadowNode(ShadowNode const &sourceShadowNode,
                                       ShadowNodeFragment const &fragment)
      : ConcreteViewShadowNode(sourceShadowNode, fragment) {
    initialize();

    if (fragment.children) {
      adoptChildren();
    }

    const auto &sourceDecorator = static_cast<const MarkdownTextInputDecoratorShadowNode &>(sourceShadowNode);

    customContextContainer_ = sourceDecorator.customContextContainer_;
    previousMarkdownStyle_ = sourceDecorator.previousMarkdownStyle_;
    previousParserId_ = sourceDecorator.previousParserId_;

    tryUpdateCustomContextContainer();
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
  ContextContainer::Shared customContextContainer_;
  folly::dynamic previousMarkdownStyle_;
  int previousParserId_;

  void initialize();

  void adoptChildren();

  void createCustomContextContainer();

  void tryUpdateCustomContextContainer();

  void applyMarkdown(std::shared_ptr<AndroidTextInputShadowNode> node,
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

#endif
