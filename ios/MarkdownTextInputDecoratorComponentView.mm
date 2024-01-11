// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <react/renderer/components/RNLiveMarkdownSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>

#import <react-native-live-markdown/MarkdownTextInputDecoratorComponentView.h>
#import <react-native-live-markdown/MarkdownTextInputDecoratorView.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@implementation MarkdownTextInputDecoratorComponentView {
  MarkdownTextInputDecoratorView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<MarkdownTextInputDecoratorViewComponentDescriptor>();
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

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MarkdownTextInputDecoratorViewProps const>(props);

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
