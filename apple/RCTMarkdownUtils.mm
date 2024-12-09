#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownParser.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

@implementation RCTMarkdownUtils {
  MarkdownParser *_markdownParser;
  MarkdownFormatter *_markdownFormatter;
  NSString *_prevInputString;
  NSAttributedString *_prevAttributedString;
  NSDictionary<NSAttributedStringKey, id> *_prevTextAttributes;
  __weak RCTMarkdownStyle *_prevMarkdownStyle;
  __weak NSNumber *_prevParserId;
}

- (instancetype)init
{
  if (self = [super init]) {
    _markdownParser = [MarkdownParser new];
    _markdownFormatter = [MarkdownFormatter new];
  }

  return self;
}

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input
            withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
{
  @synchronized (self) {
    if (input == nil) {
      return nil;
    }

    NSString *inputString = [input string];
    if ([inputString isEqualToString:_prevInputString] && [attributes isEqualToDictionary:_prevTextAttributes] && [_markdownStyle isEqual:_prevMarkdownStyle] && [_parserId isEqualToNumber:_prevParserId]) {
      return _prevAttributedString;
    }

    NSArray<MarkdownRange *> *markdownRanges = [_markdownParser parse:inputString withParserId:_parserId];

    NSAttributedString *attributedString = [_markdownFormatter format:inputString
                                                       withAttributes:attributes
                                                   withMarkdownRanges:markdownRanges
                                                    withMarkdownStyle:_markdownStyle];
    _prevInputString = inputString;
    _prevAttributedString = attributedString;
    _prevTextAttributes = attributes;
    _prevMarkdownStyle = _markdownStyle;
    _prevParserId = _parserId;

    return attributedString;
  }
}

@end
