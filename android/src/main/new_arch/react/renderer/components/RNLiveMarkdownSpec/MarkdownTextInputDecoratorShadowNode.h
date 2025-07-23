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
                                       ShadowNodeTraits traits);

  MarkdownTextInputDecoratorShadowNode(ShadowNode const &sourceShadowNode,
                                       ShadowNodeFragment const &fragment);

  void appendChild(const std::shared_ptr<const ShadowNode> &child) override;

  void replaceChild(const ShadowNode &oldChild,
                    const std::shared_ptr<const ShadowNode> &newChild,
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

  void makeChildNodeMutable();
};

} // namespace react
} // namespace facebook
