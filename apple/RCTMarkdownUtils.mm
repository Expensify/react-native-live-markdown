#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import <RNLiveMarkdown/MarkdownParser.h>
#import <RNLiveMarkdown/MarkdownFormatter.h>

@implementation RCTMarkdownUtils {
  MarkdownParser *_markdownParser;
  MarkdownFormatter *_markdownFormatter;
}

- (instancetype)init
{
  if (self = [super init]) {
    _markdownParser = [MarkdownParser new];
    _markdownFormatter = [MarkdownFormatter new];
  }

  return self;
}

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
{
  // `_markdownStyle` and `_parserId` may not be initialized immediately due to the order of mount instructions
  // props update will be executed after the view hierarchy is initialized.
  if (_markdownStyle == nil || _parserId == nil) {
    return;
  }

  NSArray<MarkdownRange *> *markdownRanges = [_markdownParser parse:attributedString.string withParserId:_parserId];

  [_markdownFormatter formatAttributedString:attributedString
                   withDefaultTextAttributes:defaultTextAttributes
                          withMarkdownRanges:markdownRanges
                           withMarkdownStyle:_markdownStyle];
}

@end
