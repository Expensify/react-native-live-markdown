#ifdef RCT_NEW_ARCH_ENABLED
#import "MarkdownTextInputView.h"

#import <react/renderer/components/RNLiveMarkdownSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNLiveMarkdownSpec/EventEmitters.h>
#import <react/renderer/components/RNLiveMarkdownSpec/Props.h>
#import <react/renderer/components/RNLiveMarkdownSpec/RCTComponentViewHelpers.h>

#import <react-native-live-markdown/MarkdownTextInputViewView.h>
#import <react-native-live-markdown/RCTMarkdownStyle.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface MarkdownTextInputView () <RCTMarkdownTextInputViewViewProtocol>

@end

@implementation MarkdownTextInputView {
  MarkdownTextInputViewView *_view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<MarkdownTextInputViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const MarkdownTextInputViewProps>();
    _props = defaultProps;

    _view = [[MarkdownTextInputViewView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<MarkdownTextInputViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<MarkdownTextInputViewProps const>(props);

    // TODO: if (oldViewProps.markdownStyle != newViewProps.markdownStyle)
    RCTMarkdownStyle *markdownStyle = [[RCTMarkdownStyle alloc] initWithStruct:newViewProps.markdownStyle];
    [_view setMarkdownStyle:markdownStyle];

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> MarkdownTextInputViewCls(void)
{
    return MarkdownTextInputView.class;
}

@end
#endif
