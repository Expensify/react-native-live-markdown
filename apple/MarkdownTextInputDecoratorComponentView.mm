#import <react/debug/react_native_assert.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTUITextField.h>
#import <React/RCTUITextView.h>
#import <React/RCTTextInputComponentView.h>

#import <RNLiveMarkdown/MarkdownBackedTextInputDelegate.h>
#import <RNLiveMarkdown/MarkdownLayoutManager.h>
#import <RNLiveMarkdown/MarkdownShadowFamilyRegistry.h>
#import <RNLiveMarkdown/MarkdownTextFieldObserver.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorComponentView.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewComponentDescriptor.h>
#import <RNLiveMarkdown/MarkdownTextStorageDelegate.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

#import <objc/runtime.h>

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
  NSNumber *_parserId;
  MarkdownBackedTextInputDelegate *_markdownBackedTextInputDelegate;
  MarkdownTextStorageDelegate *_markdownTextStorageDelegate;
  MarkdownTextFieldObserver *_markdownTextFieldObserver;
  __weak RCTUITextView *_textView;
  __weak RCTUITextField *_textField;
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
  RCTTextInputComponentView *textInputComponentView = (RCTTextInputComponentView *)view;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = [textInputComponentView valueForKey:@"_backedTextInputView"];

  _markdownUtils = [[RCTMarkdownUtils alloc] init];
  react_native_assert(_markdownStyle != nil);
  [_markdownUtils setMarkdownStyle:_markdownStyle];
  [_markdownUtils setParserId:_parserId];

  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    _textField = (RCTUITextField *)backedTextInputView;

    // make sure `adjustsFontSizeToFitWidth` is disabled, otherwise formatting will be overwritten
    react_native_assert(_textField.adjustsFontSizeToFitWidth == NO);

    _markdownTextFieldObserver = [[MarkdownTextFieldObserver alloc] initWithTextField:_textField markdownUtils:_markdownUtils];

    // register observers for future edits
    [_textField addTarget:_markdownTextFieldObserver action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
    [_textField addTarget:_markdownTextFieldObserver action:@selector(textFieldDidEndEditing:) forControlEvents:UIControlEventEditingDidEnd];
    [_textField addObserver:_markdownTextFieldObserver forKeyPath:@"text" options:NSKeyValueObservingOptionNew context:NULL];
    [_textField addObserver:_markdownTextFieldObserver forKeyPath:@"attributedText" options:NSKeyValueObservingOptionNew context:NULL];

    // format initial value
    [_markdownTextFieldObserver textFieldDidChange:_textField];

    // TODO: register blockquotes layout manager
    // https://github.com/Expensify/react-native-live-markdown/issues/87
  } else if ([backedTextInputView isKindOfClass:[RCTUITextView class]]) {
    _textView = (RCTUITextView *)backedTextInputView;

    // register delegate for future edits
    react_native_assert(_textView.textStorage.delegate == nil);
    _markdownTextStorageDelegate = [[MarkdownTextStorageDelegate alloc] initWithTextView:_textView markdownUtils:_markdownUtils];
    _textView.textStorage.delegate = _markdownTextStorageDelegate;

    // register delegate for fixing cursor position
    _markdownBackedTextInputDelegate = [[MarkdownBackedTextInputDelegate alloc] initWithTextView:_textView];

    // format initial value
    [_textView.textStorage setAttributedString:_textView.attributedText];

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
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
  if (_textView != nil) {
    if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
      [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
      object_setClass(_textView.layoutManager, [NSLayoutManager class]);
    }
    _markdownBackedTextInputDelegate = nil;
    _markdownTextStorageDelegate = nil;
    _textView.textStorage.delegate = nil;
    _textView = nil;
  }

  if (_textField != nil) {
    [_textField removeTarget:_markdownTextFieldObserver action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
    [_textField removeTarget:_markdownTextFieldObserver action:@selector(textFieldDidEndEditing:) forControlEvents:UIControlEventEditingDidEnd];
    [_textField removeObserver:_markdownTextFieldObserver forKeyPath:@"text" context:NULL];
    [_textField removeObserver:_markdownTextFieldObserver forKeyPath:@"attributedText" context:NULL];
    _markdownTextFieldObserver = nil;
    _textField = nil;
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
    [_textView.textStorage setAttributedString:_textView.attributedText];
  }
  if (_textField != nil) {
    [_markdownTextFieldObserver textFieldDidChange:_textField];
  }
}

Class<RCTComponentViewProtocol> MarkdownTextInputDecoratorViewCls(void)
{
  return MarkdownTextInputDecoratorComponentView.class;
}

@end
