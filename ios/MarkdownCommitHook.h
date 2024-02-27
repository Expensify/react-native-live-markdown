#pragma once
#ifdef RCT_NEW_ARCH_ENABLED

#include <react/renderer/uimanager/UIManager.h>
#include <react/renderer/uimanager/UIManagerCommitHook.h>
#include <react/renderer/components/iostextinput/TextInputShadowNode.h>

#include <memory>

#include "MarkdownTextInputDecoratorShadowNode.h"

using namespace facebook::react;

namespace livemarkdown {

struct MarkdownTextInputDecoratorPair {
    const std::shared_ptr<const TextInputShadowNode> textInput;
    const std::shared_ptr<const MarkdownTextInputDecoratorShadowNode> decorator;
};

class MarkdownCommitHook : public UIManagerCommitHook {
 public:
    MarkdownCommitHook(const std::shared_ptr<UIManager> &uiManager);

  ~MarkdownCommitHook() noexcept override;

  void commitHookWasRegistered(UIManager const &) noexcept override {}

  void commitHookWasUnregistered(UIManager const &) noexcept override {}

  RootShadowNode::Unshared shadowTreeWillCommit(
      ShadowTree const &shadowTree,
      RootShadowNode::Shared const &oldRootShadowNode,
      RootShadowNode::Unshared const &newRootShadowNode)
      noexcept override;

 private:
    const std::shared_ptr<UIManager> uiManager_;
};

} // namespace reanimated

#endif // RCT_NEW_ARCH_ENABLED
