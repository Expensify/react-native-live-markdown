#include <react/renderer/core/LayoutContext.h>

#include "MarkdownTextInputDecoratorShadowNode.h"
#include "MarkdownShadowFamilyRegistry.h"

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] = "MarkdownTextInputDecoratorView";

const ShadowNodeFragment::Value MarkdownTextInputDecoratorShadowNode::updateFragmentState(ShadowNodeFragment const &fragment, ShadowNodeFamily::Shared const &family) {
    const auto newStateData = std::make_shared<MarkdownTextInputDecoratorState>(family);

    MarkdownShadowFamilyRegistry::registerFamilyForUpdates(family);
    
    return ShadowNodeFragment::Value({
        .props = fragment.props,
        .children = fragment.children,
        .state = std::make_shared<const ConcreteState>(newStateData, *fragment.state),
    });
}

} // namespace react
} // namespace facebook
