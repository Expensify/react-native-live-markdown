#import <react-native-markdown-text-input/RCTMarkdownStyle.h>
#import <React-Core/React/RCTConvert.h>

@implementation RCTMarkdownStyle

- (instancetype)init
{
  if (self = [super init]) {
    _linkColor = [UIColor blueColor];
  }

  return self;
}

- (void)update:(NSDictionary *)json
{
  _linkColor = json[@"link"][@"color"] != nil
    ? [RCTConvert UIColor:json[@"link"][@"color"]]
    : [UIColor blueColor]; // TODO: remove code duplication
}

@end
