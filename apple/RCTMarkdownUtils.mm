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

- (void)applyMarkdownFormatting:(nonnull NSMutableAttributedString *)attributedString
      withDefaultTextAttributes:(nonnull NSDictionary<NSAttributedStringKey, id> *)defaultTextAttributes
                  markdownStyle:(nonnull RCTMarkdownStyle *)markdownStyle
                       parserId:(nonnull NSNumber *)parserId
{
  // Keep the style/parserId assignment and the parse+format together under a
  // single lock. The shadow node shares one instance across clones, and Fabric
  // runs commits/layout optimistically on multiple threads, so without this the
  // setters could interleave with another thread's parse/format and apply the
  // wrong parserId/style for a frame. `@synchronized` is recursive, so nesting
  // with `MarkdownParser`'s own `@synchronized(self)` in `parse:` is safe.
  @synchronized (self) {
    _markdownStyle = markdownStyle;
    _parserId = parserId;
    [self applyMarkdownFormatting:attributedString withDefaultTextAttributes:defaultTextAttributes];
  }
}

@end
