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
            : ConcreteViewShadowNode(static_cast<ShadowNodeFragment>(updateFragmentState(fragment, family)), family, traits) {}

        MarkdownTextInputDecoratorShadowNode(
            ShadowNode const &sourceShadowNode,
            ShadowNodeFragment const &fragment)
            : ConcreteViewShadowNode(sourceShadowNode, fragment) {}
        
 private:
        static const ShadowNodeFragment::Value updateFragmentState(ShadowNodeFragment const &fragment, ShadowNodeFamily::Shared const &family);
};

} // namespace react
} // namespace facebook
