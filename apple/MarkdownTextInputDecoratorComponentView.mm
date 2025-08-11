#import <react/debug/react_native_assert.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTUITextField.h>
#import <React/RCTUITextView.h>
#import <React/RCTTextInputComponentView.h>

#import <RNLiveMarkdown/MarkdownBackedTextInputDelegate.h>
#import <RNLiveMarkdown/MarkdownLayoutManager.h>
#import <RNLiveMarkdown/MarkdownTextLayoutManagerDelegate.h>
#import <RNLiveMarkdown/MarkdownTextFieldObserver.h>
#import <RNLiveMarkdown/MarkdownTextViewObserver.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorComponentView.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewComponentDescriptor.h>
#import <RNLiveMarkdown/MarkdownTextStorageDelegate.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>
#import <RNLiveMarkdown/RCTTextInput+AdaptiveImageGlyph.h>

#import <objc/runtime.h>

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
  RCTMarkdownUtils *_markdownUtils;
  RCTMarkdownStyle *_markdownStyle;
  NSNumber *_parserId;
  MarkdownTextLayoutManagerDelegate *_markdownTextLayoutManagerDelegate;
  MarkdownBackedTextInputDelegate *_markdownBackedTextInputDelegate;
  MarkdownTextStorageDelegate *_markdownTextStorageDelegate;
  MarkdownTextViewObserver *_markdownTextViewObserver;
  MarkdownTextFieldObserver *_markdownTextFieldObserver;
  __weak RCTUITextView *_textView;
  __weak RCTUITextField *_textField;
  bool _observersAdded;
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
    _observersAdded = false;
    _markdownUtils = [[RCTMarkdownUtils alloc] init];
  }

  return self;
}

- (void)didAddSubview:(UIView *)subview
{
  [super didAddSubview:subview];
  [self addTextInputObservers];
}

- (void)willRemoveSubview:(UIView *)subview
{
  [self removeTextInputObservers];
  [super willRemoveSubview:subview];
}

- (void)addTextInputObservers
{
  react_native_assert(!_observersAdded && "MarkdownTextInputDecoratorComponentView tried to add TextInput observers while they were attached");
  react_native_assert(self.subviews.count > 0 && "MarkdownTextInputDecoratorComponentView is mounted without any children");
  UIView* childView = self.subviews[0];
  react_native_assert([childView isKindOfClass:[RCTTextInputComponentView class]] && "Child component of MarkdownTextInputDecoratorComponentView is not an instance of RCTTextInputComponentView.");
  RCTTextInputComponentView *textInputComponentView = (RCTTextInputComponentView *)childView;
  UIView<RCTBackedTextInputViewProtocol> *backedTextInputView = [textInputComponentView valueForKey:@"_backedTextInputView"];
 
  _observersAdded = true;

  if ([backedTextInputView isKindOfClass:[RCTUITextField class]]) {
    _textField = (RCTUITextField *)backedTextInputView;

    // make sure `adjustsFontSizeToFitWidth` is disabled, otherwise formatting will be overwritten
    react_native_assert(_textField.adjustsFontSizeToFitWidth == NO);

    // Enable TextField AdaptiveImageGlyph support for iOS 18.0+
    [self enableAdaptiveImageGlyphSupport:_textField];

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

    // Enable TextView AdaptiveImageGlyph support for iOS 18.0+
    [self enableAdaptiveImageGlyphSupport:_textView];

    // register delegate for future edits
    react_native_assert(_textView.textStorage.delegate == nil);
    _markdownTextStorageDelegate = [[MarkdownTextStorageDelegate alloc] initWithTextView:_textView markdownUtils:_markdownUtils];
    _textView.textStorage.delegate = _markdownTextStorageDelegate;

    // register observer for default text attributes
    _markdownTextViewObserver = [[MarkdownTextViewObserver alloc] initWithTextView:_textView markdownUtils:_markdownUtils];
    [_textView addObserver:_markdownTextViewObserver forKeyPath:@"defaultTextAttributes" options:NSKeyValueObservingOptionNew context:NULL];

    // format initial value
    [_textView.textStorage setAttributedString:_textView.attributedText];

    if (@available(iOS 16.0, *)) {
      _markdownTextLayoutManagerDelegate = [[MarkdownTextLayoutManagerDelegate alloc] init];
      _markdownTextLayoutManagerDelegate.textStorage = _textView.textStorage;
      _markdownTextLayoutManagerDelegate.markdownUtils = _markdownUtils;
      _textView.textLayoutManager.delegate = _markdownTextLayoutManagerDelegate;
    } else {
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
    }

    // register delegate for fixing cursor position after blockquote
    _markdownBackedTextInputDelegate = [[MarkdownBackedTextInputDelegate alloc] initWithTextView:_textView];
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)enableAdaptiveImageGlyphSupport:(UIView *)textInputView {
  if (@available(iOS 18.0, *)) {
    if ([textInputView respondsToSelector:@selector(setSupportsAdaptiveImageGlyph:)]) {
      [textInputView setValue:@YES forKey:@"supportsAdaptiveImageGlyph"];
    }
  }
}

- (void)disableAdaptiveImageGlyphSupport:(UIView *)textInputView {
  if (@available(iOS 18.0, *)) {
    if ([textInputView respondsToSelector:@selector(setSupportsAdaptiveImageGlyph:)]) {
      [textInputView setValue:@NO forKey:@"supportsAdaptiveImageGlyph"];
    }
  }
}

- (void)removeTextInputObservers
{
  react_native_assert(_observersAdded && "MarkdownTextInputDecoratorComponentView tried to remove TextInput observers while they were detached");
  _observersAdded = false;

  if (_textView != nil) {
    if (@available(iOS 16.0, *)) {
      _textView.textLayoutManager.delegate = nil;
    } else if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
      [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
      object_setClass(_textView.layoutManager, [NSLayoutManager class]);
    }
    _markdownBackedTextInputDelegate = nil;
    [_textView removeObserver:_markdownTextViewObserver forKeyPath:@"defaultTextAttributes" context:NULL];
    [self disableAdaptiveImageGlyphSupport:_textView];
    _markdownTextViewObserver = nil;
    _markdownTextStorageDelegate = nil;
    _textView.textStorage.delegate = nil;
    _textView = nil;
  }

  if (_textField != nil) {
    [_textField removeTarget:_markdownTextFieldObserver action:@selector(textFieldDidChange:) forControlEvents:UIControlEventEditingChanged];
    [_textField removeTarget:_markdownTextFieldObserver action:@selector(textFieldDidEndEditing:) forControlEvents:UIControlEventEditingDidEnd];
    [_textField removeObserver:_markdownTextFieldObserver forKeyPath:@"text" context:NULL];
    [_textField removeObserver:_markdownTextFieldObserver forKeyPath:@"attributedText" context:NULL];
    [self disableAdaptiveImageGlyphSupport:_textField];
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

- (void)prepareForRecycle
{
  react_native_assert(!_observersAdded && "MarkdownTextInputDecoratorComponentView was being recycled with TextInput observers still attached");
  [super prepareForRecycle];
  
  static const auto defaultProps = std::make_shared<const MarkdownTextInputDecoratorViewProps>();
  _props = defaultProps;
  _markdownUtils = [[RCTMarkdownUtils alloc] init];
}

Class<RCTComponentViewProtocol> MarkdownTextInputDecoratorViewCls(void)
{
  return MarkdownTextInputDecoratorComponentView.class;
}

@end
