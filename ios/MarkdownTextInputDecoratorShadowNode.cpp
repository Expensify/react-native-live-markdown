#include "MarkdownTextInputDecoratorShadowNode.h"

#include <react/renderer/core/LayoutContext.h>

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] = "MarkdownTextInputDecoratorView";

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
    for (auto it = layoutContext.affectedNodes->rbegin(); it != layoutContext.affectedNodes->rend(); ++it) {
        if (const TextInputShadowNode* tiNode = dynamic_cast<const TextInputShadowNode*>(*it)) {
            auto state =
                    std::static_pointer_cast<const MarkdownTextInputDecoratorShadowNode::ConcreteState>(
                        getState());
            const auto& textInputFamily = tiNode->getFamily();
            
            if (state->getData().textInputFamily != &textInputFamily) {
                this->dirtyLayout();
                state->updateState(MarkdownTextInputDecoratorState(&textInputFamily));
            }
            break;
        }
    }
    
    ConcreteShadowNode::layout(layoutContext);
}

} // namespace react
} // namespace facebook
