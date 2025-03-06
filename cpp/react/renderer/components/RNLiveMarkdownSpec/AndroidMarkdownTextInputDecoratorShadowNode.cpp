#ifdef ANDROID

#include <fbjni/fbjni.h>
#include <react/fabric/JFabricUIManager.h>
#include <react/jni/ReadableNativeMap.h>

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

void MarkdownTextInputDecoratorShadowNode::createCustomContextContainer() {
  static auto customUIManagerClass = jni::findClassStatic(
      "com/expensify/livemarkdown/CustomFabricUIManager");
  static auto createCustomUIManager =
      customUIManagerClass
          ->getStaticMethod<JFabricUIManager::javaobject(
              JFabricUIManager::javaobject, ReadableMap::javaobject, int)>(
              "create");

  const auto markdownStyle =
      this->getProps()->rawProps["markdownStyle"];
  const auto currentParserId =
      this->getProps()->rawProps["parserId"].asInt();

  auto const decoratorPropsRNM =
      ReadableNativeMap::newObjectCxxArgs(markdownStyle);
  auto const decoratorPropsRM =
      jni::make_local(reinterpret_cast<ReadableMap::javaobject>(
                          decoratorPropsRNM.get()));

  const JFabricUIManager::javaobject &fabricUIManager =
      this->getContextContainer()->at<JFabricUIManager::javaobject>("FabricUIManager");


  const auto customUIManager = jni::make_global(createCustomUIManager(
      customUIManagerClass, fabricUIManager,
      decoratorPropsRM.get(), currentParserId));
  const ContextContainer::Shared contextContainer =
      std::make_shared<ContextContainer const>();
  contextContainer->insert("FabricUIManager", customUIManager);

  customContextContainer_ = contextContainer;
  previousMarkdownStyle_ = markdownStyle;
  previousParserId_ = currentParserId;
}

void MarkdownTextInputDecoratorShadowNode::updateCustomContextContainer() {
  static auto customUIManagerClass = jni::findClassStatic(
      "com/expensify/livemarkdown/CustomFabricUIManager");
  static auto updateCustomUIManager =
      customUIManagerClass
          ->getStaticMethod<void(
              JFabricUIManager::javaobject, ReadableMap::javaobject, int)>(
              "update");

  const auto markdownStyle =
      this->getProps()->rawProps["markdownStyle"];
  const auto currentParserId =
      this->getProps()->rawProps["parserId"].asInt();

  auto const decoratorPropsRNM =
      ReadableNativeMap::newObjectCxxArgs(markdownStyle);
  auto const decoratorPropsRM =
      jni::make_local(reinterpret_cast<ReadableMap::javaobject>(
                          decoratorPropsRNM.get()));
  // TODO: Create new one instead of updating? Old nodes would have unmodified one this way but does that matter?
  // This would only work if custom context container is kept in nodes and not in state.
  if (currentParserId != previousParserId_ || markdownStyle != previousMarkdownStyle_) {
    const JFabricUIManager::javaobject &customUIManager =
        this->customContextContainer_->at<JFabricUIManager::javaobject>("FabricUIManager");

    updateCustomUIManager(customUIManagerClass, customUIManager, decoratorPropsRM.get(),
                          currentParserId);

    previousMarkdownStyle_ = markdownStyle;
    previousParserId_ = currentParserId;
  }
}

void MarkdownTextInputDecoratorShadowNode::adoptChildren() {
  const auto &children = getChildren();
  if (children.size() == 0) {
    return;
  }
//  react_native_assert(
//      children.size() != 1 &&
//      "MarkdownTextInputDecoratorView received more than one child");

  if (const auto child = std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(
      children.at(0))) {
    const auto mutableChild = std::const_pointer_cast<AndroidTextInputShadowNode>(child);
    mutableChild->setTextLayoutManager(
        std::make_shared<TextLayoutManager>(customContextContainer_));
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
