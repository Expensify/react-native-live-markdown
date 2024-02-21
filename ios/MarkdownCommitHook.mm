
#ifdef RCT_NEW_ARCH_ENABLED

#include <react/renderer/core/ComponentDescriptor.h>
#import <react/renderer/textlayoutmanager/RCTAttributedTextUtils.h>

#include "MarkdownCommitHook.h"
#include "RCTMarkdownStyle.h"
#include "RCTMarkdownUtils.h"
#include "RNLiveMarkdownModule.h"

using namespace facebook::react;

namespace livemarkdown {

MarkdownCommitHook::MarkdownCommitHook(const std::shared_ptr<UIManager> &uiManager) : uiManager_(uiManager) {
  uiManager_->registerCommitHook(*this);
}

MarkdownCommitHook::~MarkdownCommitHook() noexcept {
  uiManager_->unregisterCommitHook(*this);
}

RootShadowNode::Unshared MarkdownCommitHook::shadowTreeWillCommit(
    ShadowTree const &,
    RootShadowNode::Shared const &,
    RootShadowNode::Unshared const &newRootShadowNode) const noexcept {
        auto rootNode = newRootShadowNode->ShadowNode::clone(ShadowNodeFragment{});

        std::vector<MarkdownTextInputNode> nodesToUpdate;
        
        [RNLiveMarkdownModule runForEveryFamily:[&rootNode, &nodesToUpdate](ShadowNodeFamily::Shared family) {
         auto ancestors = family->getAncestors(*rootNode);
         
         if (!ancestors.empty()) {
             auto &parentNode = ancestors.back().first.get();
             auto index = ancestors.back().second;
             
             auto markdownNode = parentNode.getChildren().at(index);
             auto previousSibling = parentNode.getChildren().at(index - 1);
             
             if (auto textInputNode = std::dynamic_pointer_cast<const TextInputShadowNode>(previousSibling)) {
                 nodesToUpdate.push_back({
                    textInputNode,
                    std::dynamic_pointer_cast<const MarkdownTextInputDecoratorShadowNode>(markdownNode),
                 });
             }
         }
         }];
        
        for (auto &nodes : nodesToUpdate) {
            auto tag = nodes.textInput->getTag();
            rootNode = rootNode->cloneTree(nodes.textInput->getFamily(), [&nodes](const ShadowNode& node){
                const auto &textInputState = *std::static_pointer_cast<const ConcreteState<TextInputState>>(nodes.textInput->getState());
                const auto &stateData = textInputState.getData();
                if (stateData.attributedStringBox.getMode() == AttributedStringBox::Mode::Value) {
                    const auto &markdownProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(nodes.decorator->getProps());
                    RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithStruct:markdownProps.markdownStyle];
                    RCTMarkdownUtils *utils = [[RCTMarkdownUtils alloc] initWithBackedTextInputView:nil];
                    [utils setMarkdownStyle:markdownStyle];
                    
                    auto nsAttributedString = RCTNSAttributedStringFromAttributedStringBox(stateData.attributedStringBox);
                    auto newString = [utils parseMarkdownWithPreviousAttributes:nsAttributedString];
                    
                    auto newStateData = std::make_shared<TextInputState>(stateData);
                    newStateData->attributedStringBox = RCTAttributedStringBoxFromNSAttributedString(newString);
                    
                    return node.clone({
                        .state = std::make_shared<const ConcreteState<TextInputState>>(newStateData, textInputState),
                    });
                }
                
                return node.clone({});
            });
        }

  return std::static_pointer_cast<RootShadowNode>(rootNode);
}

} // namespace livemarkdown

#endif // RCT_NEW_ARCH_ENABLED
