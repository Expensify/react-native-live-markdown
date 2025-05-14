#include "MarkdownTextInputDecoratorShadowNode.h"

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
  // Setting display: contents style results in ForceFlattenView trait being set
  // on the shadow node. This trait causes the node not to have a host view. By
  // removing the trait, it's possible to force RN to create a host view, layout
  // of which can then be customized.
  ShadowNode::traits_.unset(ShadowNodeTraits::ForceFlattenView);
}

void MarkdownTextInputDecoratorShadowNode::overwriteMeasureCallbackConnector() {
  const auto &children = getChildren();
  if (children.empty()) {
    return;
  }
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView received more than one child");

  const auto child = std::dynamic_pointer_cast<const TextInputShadowNode>(children[0]);
  react_native_assert(
      child != nullptr &&
      "MarkdownTextInputDecoratorView received child other than a TextInput");
  child->ensureUnsealed();

  // This is obviously not correct, but since both MarkdownTextInputDecoratorShadowNode and
  // TextInputShadowNode inherit from YogaLayoutableShadowNode by doing this cast it's
  // possible to access protected members from TextInputShadowNode like yogaNode_.
  // As only things from YogaLayoutableShadowNode are accessed, it should be safe,
  // since the vtable should be the same between them.
  const auto &nodeWithAccessibleYogaNode =
      std::reinterpret_pointer_cast<const MarkdownTextInputDecoratorShadowNode>(child);

  // decorator node cannot have a measure function since it's not a leaf node
  // but we can redirect measuring of the child input to call measureContent
  // on the decorator
  const auto &yogaNode = &nodeWithAccessibleYogaNode->yogaNode_;
  YGNodeSetMeasureFunc(yogaNode, yogaNodeMeasureCallbackConnector);
}

void MarkdownTextInputDecoratorShadowNode::appendChild(
    const ShadowNode::Shared &child) {
  YogaLayoutableShadowNode::appendChild(child);

  overwriteMeasureCallbackConnector();
}

void MarkdownTextInputDecoratorShadowNode::replaceChild(
    const ShadowNode &oldChild, const ShadowNode::Shared &newChild,
    size_t suggestedIndex) {
  YogaLayoutableShadowNode::replaceChild(oldChild, newChild, suggestedIndex);

  overwriteMeasureCallbackConnector();
};

Size MarkdownTextInputDecoratorShadowNode::measureContent(
    const LayoutContext &layoutContext,
    const LayoutConstraints &layoutConstraints) const {
  const auto &children = getChildren();
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView received wrong number of children");

  const auto child =
      std::static_pointer_cast<const TextInputShadowNode>(children[0]);

  child->ensureUnsealed();

  // apply markdown formatting before measuring the child
  const auto &mutableChild =
      std::const_pointer_cast<TextInputShadowNode>(child);
  applyMarkdownFormattingToTextInputState(mutableChild, layoutContext);

  const auto childWithMeasureContentAccess =
      std::static_pointer_cast<const YogaLayoutableShadowNode>(child);
  return childWithMeasureContentAccess->measureContent(layoutContext, layoutConstraints);
}

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
  YogaLayoutableShadowNode::layout(layoutContext);

  const auto &children = getChildren();
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView didn't receive exactly one child");

  const auto child =
      std::static_pointer_cast<const TextInputShadowNode>(children[0]);

  child->ensureUnsealed();

  const auto &mutableChild =
      std::const_pointer_cast<TextInputShadowNode>(child);

  // TODO: this may not be the correct way to do this
  // Since nodes with display: contents are skipped during layout, they have
  // zero-layout. To properly display the view, assign the layout metrics from
  // the child (text input, which was calculated by Yoga) to the decorator view.
  auto childMetrics = child->getLayoutMetrics();
  setLayoutMetrics(childMetrics);

  // Then, it's also needed to update the metrics on the child as the position
  // is relative to the parent, which was just moved above. By zeroing the
  // origin, the child is effectively moved to the same position it was before
  // the manipulation here.
  childMetrics.frame.origin = Point{};
  mutableChild->setLayoutMetrics(childMetrics);
}

void MarkdownTextInputDecoratorShadowNode::applyMarkdownFormattingToTextInputState(
    std::shared_ptr<TextInputShadowNode> textInput,
    const LayoutContext &layoutContext) const {

  const auto &textInputState =
      *std::static_pointer_cast<const react::ConcreteState<TextInputState>>(
          textInput->getState());
  const auto &stateData = textInputState.getData();
  const auto fontSizeMultiplier = layoutContext.fontSizeMultiplier;

  const auto &decoratorProps =
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
      [[RCTMarkdownStyle alloc] initWithStruct:decoratorProps.markdownStyle];
  RCTMarkdownUtils *utils = [[RCTMarkdownUtils alloc] init];
  [utils setMarkdownStyle:markdownStyle];
  [utils setParserId:[NSNumber numberWithInt:decoratorProps.parserId]];

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
    NSMutableAttributedString *newString = [nsAttributedString mutableCopy];
    [utils applyMarkdownFormatting:newString withDefaultTextAttributes:defaultNSTextAttributes];

    // create a clone of the old TextInputState and update the
    // attributed string box to point to the string with markdown
    // applied
    newStateData.attributedStringBox =
        RCTAttributedStringBoxFromNSAttributedString(newString);
  } else if (stateData.attributedStringBox.getMode() ==
             AttributedStringBox::Mode::OpaquePointer) {

    // apply markdown
    NSMutableAttributedString *newString = [nsAttributedString mutableCopy];
    [utils applyMarkdownFormatting:newString withDefaultTextAttributes:defaultNSTextAttributes];

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

  // This is where changes begin compared to the copied code
  const auto &decoratorYogaNode = YGNodeGetParent(const_cast<YGNodeRef>(yogaNode));
  const auto &decoratorShadowNode = shadowNodeFromContext(decoratorYogaNode);

  LayoutContext context{};
  context.fontSizeMultiplier = RCTFontSizeMultiplier();

  const auto size = decoratorShadowNode.measureContent(context, {minimumSize, maximumSize});

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
