#ifdef ANDROID

#include "AndroidMarkdownTextInputDecoratorShadowNode.h"

#include <react/renderer/components/androidtextinput/AndroidTextInputState.h>

#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <yoga/Yoga.h>

using namespace expensify::livemarkdown;

namespace facebook {
namespace react {

extern const char MarkdownTextInputDecoratorViewComponentName[] =
    "MarkdownTextInputDecoratorView";

void MarkdownTextInputDecoratorShadowNode::initialize() {
  ShadowNode::traits_.unset(ShadowNodeTraits::ForceFlattenView);
}

void MarkdownTextInputDecoratorShadowNode::adoptChildren() {
//  const auto &children = getChildren();
//  if (children.size() == 0) {
//    return;
//  }
////  react_native_assert(
////      children.size() != 1 &&
////      "MarkdownTextInputDecoratorView received more than one child");
//
//  if (const auto child = std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(
//          children.at(0))) {
//    // don't mind this :)
//    const auto &nodeWithAccessibleYogaNode =
//        reinterpret_cast<const MarkdownTextInputDecoratorShadowNode *>(&*child);
//
//    // decorator node cannot have a measure function since it's not a leaf node
//    // but we can redirect measuring of the child input to call measureContent
//    // on the decorator
//    YGNodeSetMeasureFunc(&nodeWithAccessibleYogaNode->yogaNode_,
//                         yogaNodeMeasureCallbackConnector);
//  }
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
      std::static_pointer_cast<const AndroidTextInputShadowNode>(children.at(0));

  child->ensureUnsealed();

  // apply markdown formatting before measuring the child
  const auto &mutableChild =
      std::const_pointer_cast<AndroidTextInputShadowNode>(child);
  applyMarkdown(mutableChild, layoutContext);

  return child->measureContent(layoutContext, layoutConstraints);
}

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
  YogaLayoutableShadowNode::layout(layoutContext);

  auto child = std::static_pointer_cast<const YogaLayoutableShadowNode>(getChildren()[0]);
  auto mutableChild = std::const_pointer_cast<YogaLayoutableShadowNode>(child);

  // TODO: figure out the correct way to setup metrics between wrapper and the child
  auto metrics = child->getLayoutMetrics();
  metrics.frame = child->getLayoutMetrics().frame;
  setLayoutMetrics(metrics);

  auto childMetrics = child->getLayoutMetrics();
  childMetrics.frame.origin = Point{};
  mutableChild->setLayoutMetrics(childMetrics);

//  const auto &children = getChildren();
//  react_native_assert(
//      children.size() <= 1 &&
//      "MarkdownTextInputDecoratorView received more than one child");
//
//  if (children.size() == 1) {
//    react_native_assert(
//        std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(children.at(0)) &&
//        "MarkdownTextInputDecoratorView received a child that's not a "
//        "TextInput");
//    const auto child =
//        std::static_pointer_cast<const AndroidTextInputShadowNode>(children.at(0));
//
//    child->ensureUnsealed();
//
//    const auto &mutableChild =
//        std::const_pointer_cast<AndroidTextInputShadowNode>(child);
//
//    // apply markdown after updating layout metrics on the child, since text
//    // input updates its state inside its layout method
//    applyMarkdown(mutableChild, layoutContext);
//  }
}

void MarkdownTextInputDecoratorShadowNode::applyMarkdown(
    std::shared_ptr<AndroidTextInputShadowNode> textInput,
    const LayoutContext &layoutContext) const {


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

//  context.fontSizeMultiplier = RCTFontSizeMultiplier();

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

#endif
