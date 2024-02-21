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
  using ConcreteViewShadowNode::ConcreteViewShadowNode;

  void layout(LayoutContext layoutContext) override;
};

} // namespace react
} // namespace facebook
