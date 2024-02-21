#pragma once

#include "MarkdownTextInputDecoratorState.h"
#include <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#include <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#include <react/renderer/components/view/ConcreteViewShadowNode.h>
#include <react/renderer/components/iostextinput/TextInputShadowNode.h>
#include <jsi/jsi.h>

namespace facebook {
namespace react {

JSI_EXPORT extern const char MarkdownTextInputDecoratorViewComponentName[];

static const ShadowNodeFragment::Value createFirstState(ShadowNodeFragment const &fragment, ShadowNodeFamily::Shared const &family) {
    const auto newStateData = std::make_shared<MarkdownTextInputDecoratorState>(family);

    return ShadowNodeFragment::Value({
        .props = fragment.props,
        .children = fragment.children,
        .state = std::make_shared<const ConcreteState<MarkdownTextInputDecoratorState>>(newStateData, *fragment.state),
    });
}

class JSI_EXPORT MarkdownTextInputDecoratorShadowNode final : public ConcreteViewShadowNode<
    MarkdownTextInputDecoratorViewComponentName,
    MarkdownTextInputDecoratorViewProps,
    MarkdownTextInputDecoratorViewEventEmitter,
    MarkdownTextInputDecoratorState> {
 public:
        MarkdownTextInputDecoratorShadowNode(
            ShadowNodeFragment const &fragment,
            ShadowNodeFamily::Shared const &family,
            ShadowNodeTraits traits)
            : ConcreteViewShadowNode(static_cast<ShadowNodeFragment>(createFirstState(fragment, family)), family, traits) {}

        MarkdownTextInputDecoratorShadowNode(
            ShadowNode const &sourceShadowNode,
            ShadowNodeFragment const &fragment)
            : ConcreteViewShadowNode(sourceShadowNode, fragment) {}
};

} // namespace react
} // namespace facebook
