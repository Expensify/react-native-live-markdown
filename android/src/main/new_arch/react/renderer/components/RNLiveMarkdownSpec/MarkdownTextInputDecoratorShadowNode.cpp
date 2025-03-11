#include "MarkdownTextInputDecoratorShadowNode.h"

#include <fbjni/fbjni.h>
#include <react/fabric/JFabricUIManager.h>
#include <react/jni/ReadableNativeMap.h>
#include <react/renderer/components/androidtextinput/AndroidTextInputState.h>
#include <react/renderer/components/view/conversions.h>
#include <react/renderer/core/ComponentDescriptor.h>
#include <yoga/Yoga.h>

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

void MarkdownTextInputDecoratorShadowNode::tryUpdateCustomContextContainer() {
  const auto markdownStyle =
      this->getProps()->rawProps["markdownStyle"];
  const auto currentParserId =
      this->getProps()->rawProps["parserId"].asInt();

  if (currentParserId != previousParserId_ || markdownStyle != previousMarkdownStyle_) {
    createCustomContextContainer();
  }
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
      std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(children.at(0)) &&
      "MarkdownTextInputDecoratorView received child other than a TextInput");

  const auto child = std::dynamic_pointer_cast<const AndroidTextInputShadowNode>(
      children.at(0));
  const auto mutableChild = std::const_pointer_cast<AndroidTextInputShadowNode>(child);
  mutableChild->setTextLayoutManager(
      std::make_shared<TextLayoutManager>(customContextContainer_));
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
}

void MarkdownTextInputDecoratorShadowNode::layout(LayoutContext layoutContext) {
  YogaLayoutableShadowNode::layout(layoutContext);

  const auto &children = getChildren();
  react_native_assert(
      children.size() == 1 &&
      "MarkdownTextInputDecoratorView didn't receive exactly one child");

  auto child = std::static_pointer_cast<const YogaLayoutableShadowNode>(getChildren()[0]);
  child->ensureUnsealed();
  auto mutableChild = std::const_pointer_cast<YogaLayoutableShadowNode>(child);

  // TODO: this may not be the correct way to do this
  setLayoutMetrics(child->getLayoutMetrics());

  auto childMetrics = child->getLayoutMetrics();
  childMetrics.frame.origin = Point{};
  mutableChild->setLayoutMetrics(childMetrics);
}

} // namespace react
} // namespace facebook
