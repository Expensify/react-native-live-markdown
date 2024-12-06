#include "MarkdownTextInputDecoratorShadowNode.h"

#include <react/renderer/components/iostextinput/TextInputState.h>

#include <React/RCTUtils.h>
#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/textlayoutmanager/RCTAttributedTextUtils.h>
#include <yoga/Yoga.h>

#include "RCTMarkdownStyle.h"
#include "RCTMarkdownUtils.h"

using namespace expensify::livemarkdown;

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] =
    "MarkdownTextInputDecoratorView";

void MarkdownTextInputDecoratorShadowNode::initialize() {
  ShadowNode::traits_.unset(ShadowNodeTraits::ForceFlattenView);
}

void MarkdownTextInputDecoratorShadowNode::adoptChildren() {
  const auto &children = getChildren();
  react_native_assert(
      children.size() <= 1 &&
      "MarkdownTextInputDecoratorView received more than one child")

      if (children.size() == 0) {
    return;
  }

  if (const auto child = std::dynamic_pointer_cast<const TextInputShadowNode>(
          children.at(0))) {
    // don't mind this :)
    const auto &nodeWithAccessibleYogaNode =
        reinterpret_cast<const MarkdownTextInputDecoratorShadowNode *>(&*child);

    YGNodeSetMeasureFunc(&nodeWithAccessibleYogaNode->yogaNode_, yogaNodeMeasureCallbackConnector);
  }
}

void MarkdownTextInputDecoratorShadowNode::appendChild(
    const ShadowNode::Shared &child) {
  YogaLayoutableShadowNode::appendChild(child);

  adoptChildren();
}

void MarkdownTextInputDecoratorShadowNode::replaceChild(
    const ShadowNode &oldChild, const ShadowNode::Shared &newChild,
    size_t suggestedIndex) {
  YogaLayoutableShadowNode::replaceChild(oldChild, newChild, suggestedIndex);

  adoptChildren();
};

Size MarkdownTextInputDecoratorShadowNode::measureContent(
    const LayoutContext &layoutContext,
    const LayoutConstraints &layoutConstraints) const {
  const auto &children = getChildren();
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView received wrong number of children")

      const auto child =
          std::static_pointer_cast<const TextInputShadowNode>(children.at(0));

  if (doesOwn(*child)) {
    printf("good!\n");
  } else {
    printf("bad!\n");
  }

  const auto &mutableChild =
      std::const_pointer_cast<TextInputShadowNode>(child);
  applyMarkdown(mutableChild, layoutContext);

  return child->measureContent(layoutContext, layoutConstraints);
}

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
  const auto &children = getChildren();
  react_native_assert(
      children.size() <= 1 &&
      "MarkdownTextInputDecoratorView received more than one child")

      YogaLayoutableShadowNode::layout(layoutContext);

  if (children.size() > 0) {
    if (const auto child = std::dynamic_pointer_cast<const TextInputShadowNode>(
            children.at(0))) {
      // TODO: assert

      if (doesOwn(*child)) {
        printf("good!\n");
      } else {
        printf("bad!\n");
      }

      const auto &mutableChild =
          std::const_pointer_cast<TextInputShadowNode>(child);

      applyMarkdown(mutableChild, layoutContext);
    }
  }
}

void MarkdownTextInputDecoratorShadowNode::applyMarkdown(
    std::shared_ptr<TextInputShadowNode> textInput,
    const LayoutContext &layoutContext) const {

  const auto &textInputState =
      *std::static_pointer_cast<const react::ConcreteState<TextInputState>>(
          textInput->getState());
  const auto &stateData = textInputState.getData();
  const auto fontSizeMultiplier = layoutContext.fontSizeMultiplier;

  auto newStateData = TextInputState(stateData);

  if (stateData.attributedStringBox.getMode() ==
      AttributedStringBox::Mode::Value) {

    const auto &markdownProps =
        *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(
            getProps());
    const auto &textInputProps =
        *std::static_pointer_cast<TextInputProps const>(textInput->getProps());

    const auto defaultTextAttributes =
        textInputProps.getEffectiveTextAttributes(fontSizeMultiplier);
    const auto defaultNSTextAttributes =
        RCTNSTextAttributesFromTextAttributes(defaultTextAttributes);

    // this can possibly be optimized
    RCTMarkdownStyle *markdownStyle =
        [[RCTMarkdownStyle alloc] initWithStruct:markdownProps.markdownStyle];
    RCTMarkdownUtils *utils = [[RCTMarkdownUtils alloc] init];
    [utils setMarkdownStyle:markdownStyle];

    // convert the attibuted string stored in state to
    // NSAttributedString
    auto nsAttributedString = RCTNSAttributedStringFromAttributedStringBox(
        stateData.attributedStringBox);

    // Handles the first render, where the text stored in props is
    // different than the one stored in state. The one in state is empty,
    // while the one in props is passed from JS. If we don't update the
    // state here, we'll end up with a one-default-line-sized text input
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
            defaultTextAttributes, *textInput, attributedString, attachments);

        // convert the newly created attributed string to
        // NSAttributedString
        nsAttributedString = RCTNSAttributedStringFromAttributedStringBox(
            AttributedStringBox{attributedString});
      }
    }

    // apply markdown
    auto newString = [utils parseMarkdown:nsAttributedString
                           withAttributes:defaultNSTextAttributes];

    // create a clone of the old TextInputState and update the
    // attributed string box to point to the string with markdown
    // applied
    newStateData.attributedStringBox =
        RCTAttributedStringBoxFromNSAttributedString(newString);
  } else if (stateData.attributedStringBox.getMode() ==
             AttributedStringBox::Mode::OpaquePointer) {

    const auto &markdownProps =
        *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(
            getProps());
    const auto &textInputProps =
        *std::static_pointer_cast<TextInputProps const>(textInput->getProps());

    const auto defaultTextAttributes =
        textInputProps.getEffectiveTextAttributes(fontSizeMultiplier);
    const auto defaultNSTextAttributes =
        RCTNSTextAttributesFromTextAttributes(defaultTextAttributes);

    // this can possibly be optimized
    RCTMarkdownStyle *markdownStyle =
        [[RCTMarkdownStyle alloc] initWithStruct:markdownProps.markdownStyle];
    RCTMarkdownUtils *utils = [[RCTMarkdownUtils alloc] init];
    [utils setMarkdownStyle:markdownStyle];

    // convert the attibuted string stored in state to
    // NSAttributedString
    auto nsAttributedString = RCTNSAttributedStringFromAttributedStringBox(
        stateData.attributedStringBox);

    // apply markdown
    auto newString = [utils parseMarkdown:nsAttributedString
                           withAttributes:defaultNSTextAttributes];

    // create a clone of the old TextInputState and update the
    // attributed string box to point to the string with markdown
    // applied
    newStateData.attributedStringBox =
        RCTAttributedStringBoxFromNSAttributedString(newString);
  }

  textInput->setStateData(std::move(newStateData));
}

YGSize MarkdownTextInputDecoratorShadowNode::yogaNodeMeasureCallbackConnector(
    YGNodeConstRef yogaNode, float width, YGMeasureMode widthMode, float height,
    YGMeasureMode heightMode) {

  auto minimumSize = Size{0, 0};
  auto maximumSize = Size{std::numeric_limits<Float>::infinity(),
                          std::numeric_limits<Float>::infinity()};

  switch (widthMode) {
  case YGMeasureModeUndefined:
    break;
  case YGMeasureModeExactly:
    minimumSize.width = floatFromYogaFloat(width);
    maximumSize.width = floatFromYogaFloat(width);
    break;
  case YGMeasureModeAtMost:
    maximumSize.width = floatFromYogaFloat(width);
    break;
  }

  switch (heightMode) {
  case YGMeasureModeUndefined:
    break;
  case YGMeasureModeExactly:
    minimumSize.height = floatFromYogaFloat(height);
    maximumSize.height = floatFromYogaFloat(height);
    break;
  case YGMeasureModeAtMost:
    maximumSize.height = floatFromYogaFloat(height);
    break;
  }

  const auto parentNode = YGNodeGetParent(const_cast<YGNodeRef>(yogaNode));
  const auto &shadowNode = shadowNodeFromContext(parentNode);
  LayoutContext context = LayoutContext();

  context.fontSizeMultiplier = RCTFontSizeMultiplier();

  auto size = shadowNode.measureContent(context, {minimumSize, maximumSize});

  return YGSize{yogaFloatFromFloat(size.width),
                yogaFloatFromFloat(size.height)};
}

YogaLayoutableShadowNode &
MarkdownTextInputDecoratorShadowNode::shadowNodeFromContext(
    YGNodeConstRef yogaNode) {
  return dynamic_cast<YogaLayoutableShadowNode &>(
      *static_cast<ShadowNode *>(YGNodeGetContext(yogaNode)));
}

} // namespace react
} // namespace facebook
