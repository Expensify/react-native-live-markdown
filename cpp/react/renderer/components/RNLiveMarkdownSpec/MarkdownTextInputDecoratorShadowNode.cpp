#ifdef RCT_NEW_ARCH_ENABLED

#include "MarkdownTextInputDecoratorShadowNode.h"

using namespace expensify::livemarkdown;

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] =
    "MarkdownTextInputDecoratorView";

const OwningShadowNodeFragment
MarkdownTextInputDecoratorShadowNode::updateFragmentState(
    ShadowNodeFragment const &fragment,
    ShadowNodeFamily::Shared const &family) {
  const auto newStateData =
      std::make_shared<MarkdownTextInputDecoratorState>(family);

  MarkdownShadowFamilyRegistry::registerFamilyForUpdates(family);

  // we pass the pointer to the ShadowNodeFamily in the initial state, so it's
  // propagated on every clone we need it to clear the reference in the registry
  // when the view is removed from window it cannot be done in the destructor,
  // as multiple shadow nodes for the same family may be created
  return OwningShadowNodeFragment{
      .props = fragment.props,
      .children = fragment.children,
      .state =
          std::make_shared<const ConcreteState>(newStateData, *fragment.state),
  };
}

} // namespace react
} // namespace facebook

#endif // RCT_NEW_ARCH_ENABLED
