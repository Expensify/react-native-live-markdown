#pragma once

#include <fbjni/fbjni.h>
#include <react/fabric/JFabricUIManager.h>

#include <react/renderer/components/androidtextinput/AndroidTextInputShadowNode.h>
#include <react/renderer/uimanager/UIManager.h>
#include <react/renderer/uimanager/UIManagerCommitHook.h>

#include <memory>
#include <unordered_map>

#include "react/renderer/components/RNLiveMarkdownSpec/MarkdownTextInputDecoratorShadowNode.h"

using namespace facebook;
using namespace react;

namespace livemarkdown {

struct MarkdownTextInputDecoratorPair {
  const std::shared_ptr<const AndroidTextInputShadowNode> textInput;
  const std::shared_ptr<const MarkdownTextInputDecoratorShadowNode> decorator;
};

class MarkdownCommitHook : public UIManagerCommitHook {
public:
  MarkdownCommitHook(
      jni::global_ref<facebook::react::JFabricUIManager::javaobject>
          fabricUIManager);

  ~MarkdownCommitHook() noexcept override;

  void commitHookWasRegistered(UIManager const &) noexcept override {}

  void commitHookWasUnregistered(UIManager const &) noexcept override {}

  RootShadowNode::Unshared shadowTreeWillCommit(
      ShadowTree const &shadowTree,
      RootShadowNode::Shared const &oldRootShadowNode,
      RootShadowNode::Unshared const &newRootShadowNode) noexcept override;

private:
  const jni::global_ref<facebook::react::JFabricUIManager::javaobject>
      fabricUIManager_;
  const std::shared_ptr<UIManager> uiManager_;
  std::unordered_map<facebook::react::Tag, SharedTextLayoutManager>
      textLayoutManagers_;
  std::unordered_map<facebook::react::Tag, folly::dynamic>
      previousDecoratorProps_;
  std::unordered_map<facebook::react::Tag, int>
      previousParserId_;
  std::unordered_map<facebook::react::Tag, int64_t>
      previousEventCount_;
};

} // namespace livemarkdown
