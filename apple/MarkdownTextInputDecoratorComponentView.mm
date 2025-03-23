#import <react/debug/react_native_assert.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTUITextField.h>

#import <RNLiveMarkdown/MarkdownBackedTextInputDelegate.h>
#import <RNLiveMarkdown/MarkdownLayoutManager.h>
#import <RNLiveMarkdown/MarkdownShadowFamilyRegistry.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorComponentView.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewComponentDescriptor.h>
#import <RNLiveMarkdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>
#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>
#import <RNLiveMarkdown/RCTUITextView+Markdown.h>

#import <objc/runtime.h>

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
  NSNumber *_parserId;
  MarkdownBackedTextInputDelegate *_markdownBackedTextInputDelegate;
  __weak RCTTextInputComponentView *_textInput;
  __weak UIView<RCTBackedTextInputViewProtocol> *_backedTextInputView;
  __weak RCTBackedTextFieldDelegateAdapter *_adapter;
  __weak RCTUITextView *_textView;
  ShadowNodeFamily::Shared _decoratorFamily;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<MarkdownTextInputDecoratorViewComponentDescriptor>();
}

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
  [super load];
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const MarkdownTextInputDecoratorViewProps>();
    _props = defaultProps;
  }

  return self;
}

- (void)updateState:(const facebook::react::State::Shared &)state oldState:(const facebook::react::State::Shared &)oldState
{
    auto data = std::static_pointer_cast<MarkdownTextInputDecoratorShadowNode::ConcreteState const>(state)->getData();

    if (_decoratorFamily != nullptr) {
        MarkdownShadowFamilyRegistry::unregisterFamilyForUpdates(_decoratorFamily);
    }

    _decoratorFamily = data.decoratorFamily;
    MarkdownShadowFamilyRegistry::registerFamilyForUpdates(_decoratorFamily);
}

- (void)willMoveToSuperview:(UIView *)newSuperview {
    if (newSuperview == nil) {
        MarkdownShadowFamilyRegistry::unregisterFamilyForUpdates(_decoratorFamily);
      _decoratorFamily = nullptr;
    }

    [super willMoveToSuperview:newSuperview];
}

- (void)didMoveToWindow {
  if (self.superview == nil) {
    return;
  }

  NSArray *viewsArray = self.superview.subviews;
  NSUInteger currentIndex = [viewsArray indexOfObject:self];

  react_native_assert(currentIndex != 0 && currentIndex != NSNotFound && "Error while finding current component.");
  UIView *view = [viewsArray objectAtIndex:currentIndex - 1];

  react_native_assert([view isKindOfClass:[RCTTextInputComponentView class]] && "Previous sibling component is not an instance of RCTTextInputComponentView.");
  _textInput = (RCTTextInputComponentView *)view;
  _backedTextInputView = [_textInput valueForKey:@"_backedTextInputView"];

  _markdownUtils = [[RCTMarkdownUtils alloc] init];
  react_native_assert(_markdownStyle != nil);
  [_markdownUtils setMarkdownStyle:_markdownStyle];
  [_markdownUtils setParserId:_parserId];

  [_textInput setMarkdownUtils:_markdownUtils];
  if ([_backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    RCTUITextField *textField = (RCTUITextField *)_backedTextInputView;
    _adapter = [textField valueForKey:@"textInputDelegateAdapter"];
    [_adapter setMarkdownUtils:_markdownUtils];
  } else if ([_backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    _textView = (RCTUITextView *)_backedTextInputView;
    [_textView setMarkdownUtils:_markdownUtils];
    NSLayoutManager *layoutManager = _textView.layoutManager; // switching to TextKit 1 compatibility mode

    // Correct content height in TextKit 1 compatibility mode. (See https://github.com/Expensify/App/issues/41567)
    // Consider removing this fix if it is no longer needed after migrating to TextKit 2.
    CGSize contentSize = _textView.contentSize;
    CGRect textBounds = [layoutManager usedRectForTextContainer:_textView.textContainer];
    contentSize.height = textBounds.size.height + _textView.textContainerInset.top + _textView.textContainerInset.bottom;
    [_textView setContentSize:contentSize];

    layoutManager.allowsNonContiguousLayout = NO; // workaround for onScroll issue
    object_setClass(layoutManager, [MarkdownLayoutManager class]);
    [layoutManager setValue:_markdownUtils forKey:@"markdownUtils"];

    // register delegate for fixing cursor position after blockquote
    _markdownBackedTextInputDelegate = [[MarkdownBackedTextInputDelegate alloc] initWithTextView:_textView];
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
  if (_textInput != nil) {
    [_textInput setMarkdownUtils:nil];
  }
  if (_adapter != nil) {
    [_adapter setMarkdownUtils:nil];
  }
  if (_textView != nil) {
    _markdownBackedTextInputDelegate = nil;
    [_textView setMarkdownUtils:nil];
    if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
      [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
      object_setClass(_textView.layoutManager, [NSLayoutManager class]);
    }
  }
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(props);

    if (oldViewProps.parserId != newViewProps.parserId) {
      _parserId = @(newViewProps.parserId);
      [_markdownUtils setParserId:_parserId];
    }

    // TODO: if (oldViewProps.markdownStyle != newViewProps.markdownStyle)
    _markdownStyle = [[RCTMarkdownStyle alloc] initWithStruct:newViewProps.markdownStyle];
    [_markdownUtils setMarkdownStyle:_markdownStyle];

    // TODO: call applyNewStyles only if needed
    [self applyNewStyles];

    [super updateProps:props oldProps:oldProps];
}

- (void)applyNewStyles
{
  if (_textView != nil) {
    // We want to use `textStorage` for applying markdown when possible. Currently it's only available for UITextView
    [_textView textDidChange];
  } else {
    // apply new styles
    [_textInput _setAttributedString:_backedTextInputView.attributedText];
  }
}

Class<RCTComponentViewProtocol> MarkdownTextInputDecoratorViewCls(void)
{
  return MarkdownTextInputDecoratorComponentView.class;
}

@end
