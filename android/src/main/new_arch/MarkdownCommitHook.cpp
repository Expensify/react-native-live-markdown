#include <react/fabric/Binding.h>
#include <react/jni/ReadableNativeMap.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/scheduler/Scheduler.h>

#include "MarkdownCommitHook.h"
#include "react/renderer/components/RNLiveMarkdownSpec/MarkdownShadowFamilyRegistry.h"

using namespace facebook;
using namespace react;

namespace livemarkdown {

MarkdownCommitHook::MarkdownCommitHook(
    jni::global_ref<facebook::react::JFabricUIManager::javaobject>
        fabricUIManager)
    : fabricUIManager_(fabricUIManager),
      uiManager_(
          fabricUIManager->getBinding()->getScheduler()->getUIManager()) {
  uiManager_->registerCommitHook(*this);
}

MarkdownCommitHook::~MarkdownCommitHook() noexcept {
  uiManager_->unregisterCommitHook(*this);
}

RootShadowNode::Unshared MarkdownCommitHook::shadowTreeWillCommit(
    ShadowTree const &, RootShadowNode::Shared const &,
    RootShadowNode::Unshared const &newRootShadowNode) noexcept {
  auto rootNode = newRootShadowNode->ShadowNode::clone(ShadowNodeFragment{});

  // A preface to why we do the weird thing below:
  // On the new architecture there are two ways of measuring text on Android: by
  // passing a cache key, or by passing a measured text with attributes by a map
  // buffer. We could implement both, but that would increase the complexity of
  // the code and duplication between here and RN core, so we implement
  // measurement for map buffers since it's the independent one, and force RN to
  // use this path every time. It shouldn't have a negative performance impact,
  // since there is a cpp cache layer anyway.
  //
  // AndroidTextInputShadowNode is closed pretty tightly, but there's a one
  // place where we can insert ourselves (well, there are two but we really
  // shouldn't mess with vtable). The path to measurement looks like this:
  // AndroidTextInputShadowNode::measureContent ->
  // TextLayoutManager::measureAndroidComponentMapBuffer
  //  -> (jni) -> FabricUIManager::measureMapBuffer ->
  //  MountingManager::measureMapBuffer
  // We cannot modify the shadow node directly, but we can replace its
  // TextLayoutManager. Literally every method it has is linked statically so we
  // cannot override anything, but we can replace its ContextContainer where a
  // jni reference to the FabricUIManager is stored. Now `measureMapBuffer` is
  // private in the ui manager, but the only thing it does is calling
  // `measureMapBuffer` on MountingManager where it's public. At this point the
  // path forward is clear: we make a custom MountingManager that will perform
  // our measurement, then create a custom FabricUIManager which will direct
  // measurement to our MountingManager. Then we only need to create the
  // ContextContainer with our FabricUIManager, create the TextLayoutManager
  // with the newly created ContextContainer and replace the pointer to
  // TextLayoutManager inside the AndroidTextInputShadowNode.

  // In order to properly apply markdown formatting to the text input, we need
  // to update the TextInputShadowNode's state to reset the cache key and update
  // its TextLayoutManager reference, but we only have access to the
  // ShadowNodeFamilies of the decorator components. We also know that a
  // markdown decorator is always preceded with the TextInput to decorate, so we
  // need to take the sibling.
  std::vector<MarkdownTextInputDecoratorPair> nodesToUpdate;
  MarkdownShadowFamilyRegistry::runForEveryFamily([&rootNode, &nodesToUpdate](
                                                      ShadowNodeFamily::Shared
                                                          family) {
    // get the path from the root to the node from the decorator family
    const auto ancestors = family->getAncestors(*rootNode);

    if (!ancestors.empty()) {
      auto &parentNode = ancestors.back().first.get();
      auto index = ancestors.back().second;

      // this is node represented by one of the registered families and since we
      // only register markdown decorator shadow families, static casting should
      // be safe here
      const auto &decoratorNode =
          std::static_pointer_cast<const MarkdownTextInputDecoratorShadowNode>(
              parentNode.getChildren().at(index));
      // text input always precedes the decorator component
      const auto &previousSibling = parentNode.getChildren().at(index - 1);

      if (const auto &textInputNode =
              std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(
                  previousSibling)) {
        // store the pair of text input and decorator to update in the next step
        // we need both, decorator to get markdown style and text input to
        // update it
        nodesToUpdate.push_back({
            textInputNode,
            decoratorNode,
        });
      }
    }
  });

  for (const auto &nodes : nodesToUpdate) {
    const auto &textInputState =
        *std::static_pointer_cast<const ConcreteState<AndroidTextInputState>>(
            nodes.textInput->getState());
    const auto &stateData = textInputState.getData();

    rootNode = rootNode->cloneTree(
        nodes.textInput->getFamily(),
        [this, &stateData, &textInputState, &nodes](ShadowNode const &node) {
          std::shared_ptr<ShadowNode> newNode = nullptr;

          if (stateData.cachedAttributedStringId != 0) {
            auto newStateData =
                std::make_shared<AndroidTextInputState>(stateData);

            // force measurement of a map buffer
            newStateData->cachedAttributedStringId = 0;

            // setting -1 as the event counter makes sure that the update will be ignored by the java
            // part of the code, which is what we want as we don't change the attributed string here
            if (previousEventCount_.contains(nodes.textInput->getTag()) &&
              previousEventCount_[nodes.textInput->getTag()] == stateData.mostRecentEventCount) {
              newStateData->mostRecentEventCount = -1;
            } else {
              previousEventCount_[nodes.textInput->getTag()] = stateData.mostRecentEventCount;
            }

            auto newState = std::make_shared<const ConcreteState<AndroidTextInputState>>(
                newStateData, textInputState);

            newNode = node.clone({ .state = newState });
          } else {
            newNode = node.clone({});
          }

          const auto currentDecoratorProps =
              nodes.decorator->getProps()->rawProps["markdownStyle"];
          const auto currentParserId =
              nodes.decorator->getProps()->rawProps["parserId"].asInt();
          // if it's the first time we encounter this particular input or the
          // markdown styles have changed (in which case we need to reset the
          // cpp cache, to which we don't have a direct access), create a new
          // instance of TextLayoutManager that will be performing measurement
          // for this particular input
          if (!textLayoutManagers_.contains(nodes.textInput->getTag()) ||
              previousDecoratorProps_[nodes.textInput->getTag()] !=
                  currentDecoratorProps ||
              previousParserId_[nodes.textInput->getTag()] != currentParserId) {
            static auto customUIManagerClass = jni::findClassStatic(
                "com/expensify/livemarkdown/CustomFabricUIManager");
            static auto createCustomUIManager =
                customUIManagerClass
                    ->getStaticMethod<JFabricUIManager::javaobject(
                        JFabricUIManager::javaobject, ReadableMap::javaobject, int)>(
                        "create");

            auto const decoratorPropsRNM =
                ReadableNativeMap::newObjectCxxArgs(currentDecoratorProps);
            auto const decoratorPropsRM =
                jni::make_local(reinterpret_cast<ReadableMap::javaobject>(
                    decoratorPropsRNM.get()));

            const auto customUIManager = jni::make_global(createCustomUIManager(
                customUIManagerClass, fabricUIManager_.get(),
                decoratorPropsRM.get(), currentParserId));
            const ContextContainer::Shared contextContainer =
                std::make_shared<ContextContainer const>();
            contextContainer->insert("FabricUIManager", customUIManager);
            textLayoutManagers_[nodes.textInput->getTag()] =
                std::make_shared<TextLayoutManager>(contextContainer);
            previousDecoratorProps_[nodes.textInput->getTag()] =
                currentDecoratorProps;
            previousParserId_[nodes.textInput->getTag()] = currentParserId;
          }

          // we need to replace the TextLayoutManager every time to make sure
          // the correct measurement code is run
          auto newTextInputShadowNode =
              std::static_pointer_cast<AndroidTextInputShadowNode>(newNode);
          newTextInputShadowNode->setTextLayoutManager(
              textLayoutManagers_[nodes.textInput->getTag()]);

          return newNode;
        });
  }

  return std::static_pointer_cast<RootShadowNode>(rootNode);
}

} // namespace livemarkdown
