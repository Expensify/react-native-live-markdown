#pragma once

#include <react/renderer/components/iostextinput/TextInputShadowNode.h>
#include <react/renderer/uimanager/UIManager.h>
#include <react/renderer/uimanager/UIManagerCommitHook.h>

#include <memory>

#include "MarkdownTextInputDecoratorShadowNode.h"
#include "RCTMarkdownUtils.h"

using namespace facebook::react;

namespace expensify {
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
      RootShadowNode::Unshared const &newRootShadowNode) noexcept override;

private:
  static RCTMarkdownUtils *
  getMarkdownUtils(const MarkdownTextInputDecoratorShadowNode &decorator);
  static RCTMarkdownUtils *getOrCreateMarkdownUtils(
      const MarkdownTextInputDecoratorShadowNode &decorator);
  const std::shared_ptr<UIManager> uiManager_;
};

} // namespace livemarkdown
} // namespace expensify
