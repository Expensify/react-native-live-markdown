// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>

#import <RNLiveMarkdown/MarkdownTextInputDecoratorComponentView.h>
#import <RNLiveMarkdown/MarkdownTextInputDecoratorView.h>
#import <RNLiveMarkdown/RCTMarkdownStyle.h>

#import <RNLiveMarkdown/MarkdownTextInputDecoratorViewComponentDescriptor.h>
#import "MarkdownShadowFamilyRegistry.h"
#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
  MarkdownTextInputDecoratorView *_view;
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

    _view = [[MarkdownTextInputDecoratorView alloc] init];

    self.contentView = _view;
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

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(props);

    if (oldViewProps.parserId != newViewProps.parserId) {
      [_view setParserId:@(newViewProps.parserId)];
    }

    // TODO: if (oldViewProps.markdownStyle != newViewProps.markdownStyle)
    RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithStruct:newViewProps.markdownStyle];
    [_view setMarkdownStyle:markdownStyle];

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> MarkdownTextInputDecoratorViewCls(void)
{
  return MarkdownTextInputDecoratorComponentView.class;
}

@end
#endif
