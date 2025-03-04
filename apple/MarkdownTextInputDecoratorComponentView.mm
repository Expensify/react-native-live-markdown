// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>

#import <RNLiveMarkdown/MarkdownTextInputDecoratorComponentView.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewComponentDescriptor.h>
#import "RCTFabricComponentsPlugins.h"

#import <React/RCTUITextField.h>
#import "react_native_assert.h"

#import <RNLiveMarkdown/MarkdownLayoutManager.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorView.h>
#import <RNLiveMarkdown/RCTBackedTextFieldDelegateAdapter+Markdown.h>
#import <RNLiveMarkdown/RCTUITextView+Markdown.h>

#import <RNLiveMarkdown/RCTTextInputComponentView+Markdown.h>

#import <objc/runtime.h>

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
    RCTMarkdownUtils *_markdownUtils;
    RCTMarkdownStyle *_markdownStyle;
    NSNumber *_parserId;
  #ifdef RCT_NEW_ARCH_ENABLED
    __weak RCTTextInputComponentView *_textInput;
  #else
    __weak RCTBaseTextInputView *_textInput;
  #endif /* RCT_NEW_ARCH_ENABLED */
    __weak UIView<RCTBackedTextInputViewProtocol> *_backedTextInputView;
    __weak RCTBackedTextFieldDelegateAdapter *_adapter;
    __weak RCTUITextView *_textView;
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

- (void)didAddSubview:(UIView *)subview
{
  react_native_assert([subview isKindOfClass:[RCTTextInputComponentView class]] && "Previous sibling component is not an instance of RCTTextInputComponentView.");
  _textInput = (RCTTextInputComponentView *)subview;
  _backedTextInputView = [_textInput valueForKey:@"_backedTextInputView"];

  _markdownUtils = [[RCTMarkdownUtils alloc] init];
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
  } else {
    react_native_assert(false && "Cannot enable Markdown for this type of TextInput.");
  }
}

- (void)willMoveToWindow:(UIWindow *)newWindow
{
    if (newWindow == nil) {
        if (_textInput != nil) {
            [_textInput setMarkdownUtils:nil];
        }
        if (_adapter != nil) {
            [_adapter setMarkdownUtils:nil];
        }
        if (_textView != nil) {
            [_textView setMarkdownUtils:nil];
            if (_textView.layoutManager != nil && [object_getClass(_textView.layoutManager) isEqual:[MarkdownLayoutManager class]]) {
                [_textView.layoutManager setValue:nil forKey:@"markdownUtils"];
                object_setClass(_textView.layoutManager, [NSLayoutManager class]);
            }
        }
    }
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(props);

    if (oldViewProps.parserId != newViewProps.parserId) {
      _parserId = [NSNumber numberWithInt:newViewProps.parserId];
      [_markdownUtils setParserId:_parserId];
    }

    // TODO: if (oldViewProps.markdownStyle != newViewProps.markdownStyle)
    RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithStruct:newViewProps.markdownStyle];
    _markdownStyle = markdownStyle;
    [_markdownUtils setMarkdownStyle:markdownStyle];

    if (_textView != nil) {
      // We want to use `textStorage` for applying markdown when possible. Currently it's only available for UITextView
      [_textView textDidChange];
    } else {
      // apply new styles
      [_textInput _setAttributedString:_backedTextInputView.attributedText];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> MarkdownTextInputDecoratorViewCls(void)
{
  return MarkdownTextInputDecoratorComponentView.class;
}

@end
#endif
