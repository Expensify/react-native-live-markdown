#include <React/RCTUtils.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/textlayoutmanager/RCTAttributedTextUtils.h>
#include <react/utils/ManagedObjectWrapper.h>

#include "MarkdownCommitHook.h"
#include "MarkdownShadowFamilyRegistry.h"
#include "RCTMarkdownStyle.h"

using namespace facebook::react;

namespace expensify {
namespace livemarkdown {

MarkdownCommitHook::MarkdownCommitHook(
    const std::shared_ptr<UIManager> &uiManager)
    : uiManager_(uiManager) {
  uiManager_->registerCommitHook(*this);
}

MarkdownCommitHook::~MarkdownCommitHook() noexcept {
  uiManager_->unregisterCommitHook(*this);
}

RCTMarkdownUtils *MarkdownCommitHook::getMarkdownUtils(
    const MarkdownTextInputDecoratorShadowNode &decorator) {
  const auto decoratorState = std::static_pointer_cast<
      const ConcreteState<MarkdownTextInputDecoratorState>>(
      decorator.getState());
  const auto memoizedUtils = (RCTMarkdownUtils *)unwrapManagedObject(
      decoratorState->getData().markdownUtils);
  return memoizedUtils;
}

RCTMarkdownUtils *MarkdownCommitHook::getOrCreateMarkdownUtils(
    const MarkdownTextInputDecoratorShadowNode &decorator) {
  const auto memoizedUtils = MarkdownCommitHook::getMarkdownUtils(decorator);

  if (memoizedUtils != nullptr) {
    return memoizedUtils;
  } else {
    return [[RCTMarkdownUtils alloc] init];
  }
}

RootShadowNode::Unshared MarkdownCommitHook::shadowTreeWillCommit(
    ShadowTree const &, RootShadowNode::Shared const &,
    RootShadowNode::Unshared const &newRootShadowNode) noexcept {
  auto rootNode = newRootShadowNode->ShadowNode::clone(ShadowNodeFragment{});

  // A preface to why we do the weird thing below:
  // On the new architecture there are two ways of measuring text on iOS: by
  // value and by pointer. When done by value, the attributed string to be
  // measured is created on the c++ side. We cannot modify this process as we do
  // not extend TextInputShadowNode. We also cannot really change the layout
  // manager used to do this, since it's a private field (ok, we can but in a
  // not very nice way). But also, the logic for parsing and applying markdown
  // is written in JS/ObjC and we really wouldn't want to reimplement it in c++.
  //
  // Nice thing is that it can also be done by pointer to NSAttributedString,
  // which is the platform's way to handle styled text, and is also used by Live
  // Markdown. On this path, the measurement is done by the OS APIs. The thing
  // we want to make sure of, is that markdown-decorated text input always uses
  // this path and uses a pointer to a string with markdown styles applied.
  // Thankfully, RN provides nice utility functions that allow to convert
  // between the RN's AttributedString and iOS's NSAttributedString. The logic
  // below does exactly that.

  // In order to properly apply markdown formatting to the text input, we need
  // to update the TextInputShadowNode's state with styled string, but we only
  // have access to the ShadowNodeFamilies of the decorator components. We also
  // know that a markdown decorator is always preceded with the TextInput to
  // decorate, so we need to take the sibling.
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
              std::dynamic_pointer_cast<const TextInputShadowNode>(
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
        *std::static_pointer_cast<const ConcreteState<TextInputState>>(
            nodes.textInput->getState());
    const auto &stateData = textInputState.getData();
    const auto fontSizeMultiplier =
        newRootShadowNode->getConcreteProps().layoutContext.fontSizeMultiplier;

    RCTMarkdownUtils *usedUtils = nil;

    // We only want to update the shadow node when the attributed string is
    // stored by value If it's stored by pointer, the markdown formatting should
    // already by applied to it, since the only source of that pointer (besides
    // this commit hook) is RCTTextInputComponentView, which has the relevant
    // method swizzled to make sure the markdown styles are always applied
    // before updating state. There are two caveats:
    // 1. On the first render the swizzled method will not apply markdown since
    // the native component
    //   is not mounted yet. In that case we save the tag to update in the
    //   method applying markdown formatting and apply it here instead,
    //   preventing wrong layout on reloads.
    // 2. When the markdown style prop is changed, the native state needs to be
    // updated to reflect
    //    them. In that case the relevant tag is saved in the registry when the
    //    new shadow node is created.
    if (stateData.attributedStringBox.getMode() ==
            AttributedStringBox::Mode::Value ||
        MarkdownShadowFamilyRegistry::shouldForceUpdate(
            nodes.textInput->getTag())) {
      rootNode = rootNode->cloneTree(
          nodes.textInput->getFamily(),
          [&nodes, &textInputState, &stateData, &usedUtils,
           fontSizeMultiplier](const ShadowNode &node) {
            const auto &markdownProps = *std::static_pointer_cast<
                MarkdownTextInputDecoratorViewProps const>(
                nodes.decorator->getProps());
            const auto &textInputProps =
                *std::static_pointer_cast<TextInputProps const>(
                    nodes.textInput->getProps());

            const auto defaultTextAttributes =
                textInputProps.getEffectiveTextAttributes(fontSizeMultiplier);
            const auto defaultNSTextAttributes =
                RCTNSTextAttributesFromTextAttributes(defaultTextAttributes);

            // this can possibly be optimized
            RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc]
                initWithStruct:markdownProps.markdownStyle];
            usedUtils =
                MarkdownCommitHook::getOrCreateMarkdownUtils(*nodes.decorator);
            [usedUtils setMarkdownStyle:markdownStyle];
            [usedUtils setParserId:@(markdownProps.parserId)];

            // convert the attibuted string stored in state to
            // NSAttributedString
            auto nsAttributedString =
                RCTNSAttributedStringFromAttributedStringBox(
                    stateData.attributedStringBox);

            // Handles the first render, where the text stored in props is
            // different than the one stored in state. The one in state is
            // empty, while the one in props is passed from JS. If we don't
            // update the state here, we'll end up with a one-default-line-sized
            // text input
            if (textInputState.getRevision() == State::initialRevisionValue) {
              auto plainStringFromState =
                  std::string([[nsAttributedString string] UTF8String]);

              if (plainStringFromState != textInputProps.text) {
                // creates new AttributedString from props, adapted from
                // TextInputShadowNode (ios one, text inputs are
                // platform-specific)
                auto attributedString = AttributedString{};
                attributedString.appendFragment(AttributedString::Fragment{
                    textInputProps.text, defaultTextAttributes});

                auto attachments = BaseTextShadowNode::Attachments{};
                BaseTextShadowNode::buildAttributedString(
                    defaultTextAttributes, *nodes.textInput, attributedString,
                    attachments);

                // convert the newly created attributed string to
                // NSAttributedString
                nsAttributedString =
                    RCTNSAttributedStringFromAttributedStringBox(
                        AttributedStringBox{attributedString});
              }
            }

            // apply markdown
            auto newString = [usedUtils parseMarkdown:nsAttributedString
                            withDefaultTextAttributes:defaultNSTextAttributes];

            // create a clone of the old TextInputState and update the
            // attributed string box to point to the string with markdown
            // applied
            auto newStateData = std::make_shared<TextInputState>(stateData);
            newStateData->attributedStringBox =
                RCTAttributedStringBoxFromNSAttributedString(newString);

            // clone the text input with the new state
            return node.clone({
                .state = std::make_shared<const ConcreteState<TextInputState>>(
                    newStateData, textInputState),
            });
          });
    } else if (stateData.attributedStringBox.getMode() ==
               AttributedStringBox::Mode::OpaquePointer) {
      rootNode = rootNode->cloneTree(
          nodes.textInput->getFamily(),
          [&nodes, &textInputState, &stateData, &usedUtils,
           fontSizeMultiplier](const ShadowNode &node) {
            const auto &markdownProps = *std::static_pointer_cast<
                MarkdownTextInputDecoratorViewProps const>(
                nodes.decorator->getProps());
            const auto &textInputProps =
                *std::static_pointer_cast<TextInputProps const>(
                    nodes.textInput->getProps());

            const auto defaultTextAttributes =
                textInputProps.getEffectiveTextAttributes(fontSizeMultiplier);
            const auto defaultNSTextAttributes =
                RCTNSTextAttributesFromTextAttributes(defaultTextAttributes);

            // this can possibly be optimized
            RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc]
                initWithStruct:markdownProps.markdownStyle];
            usedUtils =
                MarkdownCommitHook::getOrCreateMarkdownUtils(*nodes.decorator);
            [usedUtils setMarkdownStyle:markdownStyle];
            [usedUtils setParserId:@(markdownProps.parserId)];

            // convert the attibuted string stored in state to
            // NSAttributedString
            auto nsAttributedString =
                RCTNSAttributedStringFromAttributedStringBox(
                    stateData.attributedStringBox);

            // apply markdown
            auto newString = [usedUtils parseMarkdown:nsAttributedString
                            withDefaultTextAttributes:defaultNSTextAttributes];

            // create a clone of the old TextInputState and update the
            // attributed string box to point to the string with markdown
            // applied
            auto newStateData = std::make_shared<TextInputState>(stateData);
            newStateData->attributedStringBox =
                RCTAttributedStringBoxFromNSAttributedString(newString);

            // clone the text input with the new state
            return node.clone({
                .state = std::make_shared<const ConcreteState<TextInputState>>(
                    newStateData, textInputState),
            });
          });
    }

    // if usedUtils is not nil, then we did some work on the TextInput
    // ShadowNode, we may need to update the decorator as well
    if (usedUtils != nil) {
      const auto ancestors =
          nodes.decorator->getFamily().getAncestors(*rootNode);
      const auto parentInfo = ancestors.back();
      const auto decoratorNode =
          std::static_pointer_cast<const MarkdownTextInputDecoratorShadowNode>(
              parentInfo.first.get().getChildren().at(parentInfo.second));

      // if usedUtils is defferent from the one kept in the decorator state, it
      // needs to be updated to ensure memoization works correctly
      if (usedUtils != MarkdownCommitHook::getMarkdownUtils(*decoratorNode)) {
        const auto oldDecoratorState = *std::static_pointer_cast<
            const ConcreteState<MarkdownTextInputDecoratorState>>(
            decoratorNode->getState());
        const auto newDecoratorState =
            std::make_shared<const MarkdownTextInputDecoratorState>(
                oldDecoratorState.getData().decoratorFamily,
                wrapManagedObject(usedUtils));
        const auto newDecoratorNode = decoratorNode->clone(
            {.state = std::make_shared<
                 const ConcreteState<MarkdownTextInputDecoratorState>>(
                 newDecoratorState, oldDecoratorState)});

        // since we did clone the path to the text input, parent node is mutable
        // at this point - no need to clone the entire path
        const auto mutableParent =
            const_cast<ShadowNode *>(&parentInfo.first.get());
        mutableParent->replaceChild(*decoratorNode, newDecoratorNode);
      }
    }
  }

  return std::static_pointer_cast<RootShadowNode>(rootNode);
}

} // namespace livemarkdown
} // namespace expensify
