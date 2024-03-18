#include <react/fabric/Binding.h>
#include <react/jni/ReadableNativeMap.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/scheduler/Scheduler.h>

#include "MarkdownCommitHook.h"
#include "react/renderer/components/RNLiveMarkdownSpec/MarkdownShadowFamilyRegistry.h"

#include <android/Log.h>

using namespace facebook;
using namespace react;

namespace livemarkdown {

MarkdownCommitHook::MarkdownCommitHook(jni::global_ref<facebook::react::JFabricUIManager::javaobject> fabricUIManager) : fabricUIManager_(fabricUIManager), uiManager_(fabricUIManager->getBinding()->getScheduler()->getUIManager()) {
  uiManager_->registerCommitHook(*this);
}

MarkdownCommitHook::~MarkdownCommitHook() noexcept {
  uiManager_->unregisterCommitHook(*this);
}

RootShadowNode::Unshared MarkdownCommitHook::shadowTreeWillCommit(
    ShadowTree const &,
    RootShadowNode::Shared const &,
    RootShadowNode::Unshared const &newRootShadowNode) noexcept {
        auto rootNode = newRootShadowNode->ShadowNode::clone(ShadowNodeFragment{});

        // A preface to why we do the weird thing below:
        // On the new architecture there are two ways of measuring text on iOS: by value and by pointer.
        // When done by value, the attributed string to be measured is created on the c++ side. We cannot
        // modify this process as we do not extend TextInputShadowNode. We also cannot really change the
        // layout manager used to do this, since it's a private field (ok, we can but in a not very nice way).
        // But also, the logic for parsing and applying markdown is written in JS/ObjC and we really wouldn't
        // want to reimplement it in c++.
        //
        // Nice thing is that it can also be done by pointer to NSAttributedString, which is the platform's
        // way to handle styled text, and is also used by Live Markdown. On this path, the measurement is done
        // by the OS APIs. The thing we want to make sure of, is that markdown-decorated text input always uses
        // this path and uses a pointer to a string with markdown styles applied. Thankfully, RN provides nice
        // utility functions that allow to convert between the RN's AttributedString and iOS's NSAttributedString.
        // The logic below does exactly that.

        // In order to properly apply markdown formatting to the text input, we need to update the TextInputShadowNode's
        // state with styled string, but we only have access to the ShadowNodeFamilies of the decorator components.
        // We also know that a markdown decorator is always preceded with the TextInput to decorate, so we need to take
        // the sibling.
        std::vector<MarkdownTextInputDecoratorPair> nodesToUpdate;
        MarkdownShadowFamilyRegistry::runForEveryFamily([&rootNode, &nodesToUpdate](ShadowNodeFamily::Shared family) {
         // get the path from the root to the node from the decorator family
         const auto ancestors = family->getAncestors(*rootNode);

         if (!ancestors.empty()) {
             auto &parentNode = ancestors.back().first.get();
             auto index = ancestors.back().second;

             // this is node represented by one of the registered families and since we only register markdown decorator
             // shadow families, static casting should be safe here
             const auto& decoratorNode =
                std::static_pointer_cast<const MarkdownTextInputDecoratorShadowNode>(parentNode.getChildren().at(index));
             // text input always precedes the decorator component
             const auto& previousSibling = parentNode.getChildren().at(index - 1);

             if (const auto& textInputNode = std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(previousSibling)) {
                 // store the pair of text input and decorator to update in the next step
                 // we need both, decorator to get markdown style and text input to update it
                 nodesToUpdate.push_back({
                    textInputNode,
                    decoratorNode,
                 });
             }
         }
         });

        for (const auto &nodes : nodesToUpdate) {
            const auto &textInputState = *std::static_pointer_cast<const ConcreteState<AndroidTextInputState>>(nodes.textInput->getState());
            const auto &stateData = textInputState.getData();

            rootNode = rootNode->cloneTree(nodes.textInput->getFamily(), [this, &stateData, &textInputState, &nodes](ShadowNode const& node) {
                auto newStateData = std::make_shared<AndroidTextInputState>(stateData);
                newStateData->cachedAttributedStringId = 0;

                // clone the text input with the new state
                auto newNode = node.clone({
                    .state = std::make_shared<const ConcreteState<AndroidTextInputState>>(newStateData, textInputState),
                });

                auto const decoratorPropsRNM = ReadableNativeMap::newObjectCxxArgs(nodes.decorator->getProps()->rawProps);
                auto const decoratorPropsRM = jni::make_local(reinterpret_cast<ReadableMap::javaobject>(decoratorPropsRNM.get()));

                static auto customUIManagerClass = jni::findClassStatic("com/expensify/livemarkdown/CustomFabricUIManager");
                if (!textLayoutManagers_.contains(nodes.textInput->getTag())) {
                    static auto createCustomUIManager =
                            customUIManagerClass
                                    ->getStaticMethod<JFabricUIManager::javaobject(
                                            JFabricUIManager::javaobject,
                                            ReadableMap::javaobject)>("create");

                    const auto customUIManager = jni::make_global(createCustomUIManager(customUIManagerClass, fabricUIManager_.get(), decoratorPropsRM.get()));
                    const ContextContainer::Shared contextContainer = std::make_shared<ContextContainer const>();
                    contextContainer->insert("FabricUIManager", customUIManager);
                    textLayoutManagers_[nodes.textInput->getTag()] = std::make_shared<TextLayoutManager>(contextContainer);
                    customUIManagers_[nodes.textInput->getTag()] = customUIManager;
                } else {
                    static auto setMarkdownProps =
                            customUIManagerClass
                                    ->getStaticMethod<void(
                                            JFabricUIManager::javaobject,
                                            ReadableMap::javaobject)>("setDecoratorProps");

                    auto customUIManager = customUIManagers_[nodes.textInput->getTag()];
                    setMarkdownProps(customUIManagerClass, customUIManager.get(), decoratorPropsRM.get());
                }

                auto newTextInputShadowNode = std::static_pointer_cast<AndroidTextInputShadowNode>(newNode);
                newTextInputShadowNode->setTextLayoutManager(textLayoutManagers_[nodes.textInput->getTag()]);

                return newNode;
            });
        }

  return std::static_pointer_cast<RootShadowNode>(rootNode);
}

} // namespace livemarkdown
