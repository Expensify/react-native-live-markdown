#include "MarkdownTextInputDecoratorShadowNode.h"

#include <react/renderer/components/iostextinput/TextInputState.h>

#include <React/RCTUtils.h>
#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <react/renderer/textlayoutmanager/RCTAttributedTextUtils.h>
#include <yoga/Yoga.h>

#include "RCTMarkdownStyle.h"
#include "RCTMarkdownUtils.h"

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] =
    "MarkdownTextInputDecoratorView";

void MarkdownTextInputDecoratorShadowNode::initialize() {
  ShadowNode::traits_.unset(ShadowNodeTraits::ForceFlattenView);
}

void MarkdownTextInputDecoratorShadowNode::adoptChildren() {
  const auto &children = getChildren();
  if (children.empty()) {
    return;
  }
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView received more than one child");
  react_native_assert(
      std::dynamic_pointer_cast<const TextInputShadowNode>(children.at(0)) &&
      "MarkdownTextInputDecoratorView received child other than a TextInput");

  if (const auto child = std::dynamic_pointer_cast<const TextInputShadowNode>(
          children.at(0))) {
    // don't mind this :)
    const auto &nodeWithAccessibleYogaNode =
        reinterpret_cast<const MarkdownTextInputDecoratorShadowNode *>(&*child);

    // decorator node cannot have a measure function since it's not a leaf node
    // but we can redirect measuring of the child input to call measureContent
    // on the decorator
    YGNodeSetMeasureFunc(&nodeWithAccessibleYogaNode->yogaNode_,
                         yogaNodeMeasureCallbackConnector);
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
      "MarkdownTextInputDecoratorView received wrong number of children");

  const auto child =
      std::static_pointer_cast<const TextInputShadowNode>(children.at(0));

  child->ensureUnsealed();

  // apply markdown formatting before measuring the child
  const auto &mutableChild =
      std::const_pointer_cast<TextInputShadowNode>(child);
  applyMarkdown(mutableChild, layoutContext);

  return child->measureContent(layoutContext, layoutConstraints);
}

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
  YogaLayoutableShadowNode::layout(layoutContext);

  const auto &children = getChildren();
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView didn't receive exactly one child");

  const auto child =
      std::static_pointer_cast<const TextInputShadowNode>(children.at(0));

  child->ensureUnsealed();

  const auto &mutableChild =
      std::const_pointer_cast<TextInputShadowNode>(child);

  // apply markdown after updating layout metrics on the child, since text
  // input updates its state inside its layout method
  applyMarkdown(mutableChild, layoutContext);

  // TODO: this may not be the correct way to do this
  auto childMetrics = child->getLayoutMetrics();
  setLayoutMetrics(childMetrics);

  childMetrics.frame.origin = Point{};
  mutableChild->setLayoutMetrics(childMetrics);
}

void MarkdownTextInputDecoratorShadowNode::applyMarkdown(
    std::shared_ptr<TextInputShadowNode> textInput,
    const LayoutContext &layoutContext) const {

  const auto &textInputState =
      *std::static_pointer_cast<const react::ConcreteState<TextInputState>>(
          textInput->getState());
  const auto &stateData = textInputState.getData();
  const auto fontSizeMultiplier = layoutContext.fontSizeMultiplier;

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
  [utils setParserId:[NSNumber numberWithInt:markdownProps.parserId]];

  // convert the attibuted string stored in state to
  // NSAttributedString
  auto nsAttributedString = RCTNSAttributedStringFromAttributedStringBox(
      stateData.attributedStringBox);

  auto newStateData = TextInputState(stateData);

  if (stateData.attributedStringBox.getMode() ==
      AttributedStringBox::Mode::Value) {

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
                withDefaultTextAttributes:defaultNSTextAttributes];

    // create a clone of the old TextInputState and update the
    // attributed string box to point to the string with markdown
    // applied
    newStateData.attributedStringBox =
        RCTAttributedStringBoxFromNSAttributedString(newString);
  } else if (stateData.attributedStringBox.getMode() ==
             AttributedStringBox::Mode::OpaquePointer) {

    // apply markdown
    auto newString = [utils parseMarkdown:nsAttributedString
                withDefaultTextAttributes:defaultNSTextAttributes];

    // create a clone of the old TextInputState and update the
    // attributed string box to point to the string with markdown
    // applied
    newStateData.attributedStringBox =
        RCTAttributedStringBoxFromNSAttributedString(newString);
  }

  textInput->setStateData(std::move(newStateData));
}

// this is private in YogaLayoutableShadowNode
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

// this is private in YogaLayoutableShadowNode
YogaLayoutableShadowNode &
MarkdownTextInputDecoratorShadowNode::shadowNodeFromContext(
    YGNodeConstRef yogaNode) {
  return dynamic_cast<YogaLayoutableShadowNode &>(
      *static_cast<ShadowNode *>(YGNodeGetContext(yogaNode)));
}

} // namespace react
} // namespace facebook
