#pragma once

#include <react/renderer/components/RNLiveMarkdownSpec/MarkdownTextInputDecoratorState.h>
#include <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#include <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#include <react/renderer/components/androidtextinput/AndroidTextInputShadowNode.h>

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
    createCustomContextContainer();

    if (fragment.children) {
      overwriteTextLayoutManager();
    }
  }

  MarkdownTextInputDecoratorShadowNode(ShadowNode const &sourceShadowNode,
                                       ShadowNodeFragment const &fragment)
      : ConcreteViewShadowNode(sourceShadowNode, fragment) {
    initialize();

    const auto &sourceDecorator = static_cast<const MarkdownTextInputDecoratorShadowNode &>(sourceShadowNode);

    customContextContainer_ = sourceDecorator.customContextContainer_;
    previousMarkdownStyle_ = sourceDecorator.previousMarkdownStyle_;
    previousParserId_ = sourceDecorator.previousParserId_;

    updateCustomContextContainerIfNeeded();

    if (fragment.children) {
      overwriteTextLayoutManager();
    }
  }

  void appendChild(const ShadowNode::Shared &child) override;

  void replaceChild(const ShadowNode &oldChild,
                    const ShadowNode::Shared &newChild,
                    size_t suggestedIndex = SIZE_MAX) override;

  void layout(LayoutContext layoutContext) override;

private:
  ContextContainer::Shared customContextContainer_;
  folly::dynamic previousMarkdownStyle_;
  int previousParserId_;

  void initialize();

  void overwriteTextLayoutManager();

  void createCustomContextContainer();

  void updateCustomContextContainerIfNeeded();
};

} // namespace react
} // namespace facebook
