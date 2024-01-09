#ifdef RCT_NEW_ARCH_ENABLED
#import "MarkdownTextInputDecoratorView.h"

#import <react/renderer/components/RNLiveMarkdownSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#import <react/renderer/components/RNLiveMarkdownSpec/RCTComponentViewHelpers.h>

#import <react-native-live-markdown/MarkdownTextInputDecoratorViewView.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface MarkdownTextInputDecoratorView () <RCTMarkdownTextInputDecoratorViewViewProtocol>

@end

@implementation MarkdownTextInputDecoratorView {
  MarkdownTextInputDecoratorViewView *_view;
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

    _view = [[MarkdownTextInputDecoratorViewView alloc] init];

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
    return MarkdownTextInputDecoratorView.class;
}

@end
#endif
