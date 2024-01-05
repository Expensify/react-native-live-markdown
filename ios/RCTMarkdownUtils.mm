#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <React/RCTAssert.h>
#import <JavaScriptCore/JavaScriptCore.h>

static UIColor *syntaxColor = [UIColor grayColor];
static UIColor *linkColor = [UIColor blueColor];
static UIColor *codeForegroundColor = [[UIColor alloc] initWithRed:6/255.0 green:25/255.0 blue:109/255.0 alpha:1.0];
static UIColor *codeBackgroundColor = [[UIColor alloc] initWithRed:0.95 green:0.95 blue:0.95 alpha:1.0];
static UIColor *mentionHereColor = [[UIColor alloc] initWithRed:252/255.0 green:232/255.0 blue:142/255.0 alpha:1.0];
static UIColor *mentionUserColor = [[UIColor alloc] initWithRed:176/255.0 green:217/255.0 blue:255/255.0 alpha:1.0];
static CGFloat headingFontSize = 25;

@implementation RCTMarkdownUtils {
  NSString *_prevInputString;
  NSAttributedString *_prevAttributedString;
  NSDictionary<NSAttributedStringKey, id> *_prevTextAttributes;
}

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView
{
  if (self = [super init]) {
    _backedTextInputView = backedTextInputView;
  }
  return self;
}

- (NSAttributedString *)parseMarkdown:(NSAttributedString *)input
{
  RCTAssertMainQueue();

  if (input == nil) {
    return nil;
  }

  NSString *inputString = [input string];
  if ([inputString isEqualToString:_prevInputString] && [_backedTextInputView.defaultTextAttributes isEqualToDictionary:_prevTextAttributes]) {
    return _prevAttributedString;
  }

  static JSContext *ctx = nil;
  static JSValue *function = nil;
  if (ctx == nil) {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"out" ofType:@"js"];
    assert(path != nil && "[react-native-markdown-text-input] Markdown parser bundle not found");
    NSString *content = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
    assert(content != nil && "[react-native-markdown-text-input] Markdown parser bundle is empty");
    ctx = [[JSContext alloc] init];
    [ctx evaluateScript:content];
    function = ctx[@"parseMarkdownToTextAndRanges"];
  }

  JSValue *result = [function callWithArguments:@[inputString]];
  NSString *outputString = [result[0] toString];
  NSArray *ranges = [result[1] toArray];

  if (![outputString isEqualToString:inputString]) {
    return input;
  }

  NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:inputString attributes:_backedTextInputView.defaultTextAttributes];
  [attributedString beginEditing];

  _quoteRanges = [NSMutableArray new];

  [ranges enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSArray *item = obj;
    NSString *type = item[0];
    NSUInteger location = [item[1] unsignedIntegerValue];
    NSUInteger length = [item[2] unsignedIntegerValue];
    NSRange range = NSMakeRange(location, length);

    UIFont *font = [attributedString attribute:NSFontAttributeName atIndex:location effectiveRange:NULL];
    UIFontDescriptor *fontDescriptor = [font fontDescriptor];
    UIFontDescriptorSymbolicTraits existingTraits = fontDescriptor.symbolicTraits;
    UIFontDescriptorSymbolicTraits desiredTraits = UIFontDescriptorClassMask;

    if ([type isEqualToString:@"bold"] || [type isEqualToString:@"mention"] || [type isEqualToString:@"h1"] || [type isEqualToString:@"mention-user"]) {
      desiredTraits = existingTraits | UIFontDescriptorTraitBold;
    } else if ([type isEqualToString:@"italic"]) {
      desiredTraits = existingTraits | UIFontDescriptorTraitItalic;
    } else if ([type isEqualToString:@"code"] || [type isEqualToString:@"pre"]) {
      desiredTraits = existingTraits | UIFontDescriptorTraitMonoSpace;
    } else if ([type isEqualToString:@"syntax"]) {
      desiredTraits = UIFontDescriptorTraitBold; // TODO: remove italic in nested bold+italic
    } else {
      // keep existing traits regardless of current item type
      desiredTraits = existingTraits;
    }

    UIFontDescriptor *newFontDescriptor = [fontDescriptor fontDescriptorWithSymbolicTraits:desiredTraits];
    CGFloat size = 0; // Passing 0 to size keeps the existing size
    if ([type isEqualToString:@"h1"]) {
      size = headingFontSize;
    }
    UIFont *newFont = [UIFont fontWithDescriptor:newFontDescriptor size:size];
    [attributedString addAttribute:NSFontAttributeName value:newFont range:range];

    if ([type isEqualToString:@"syntax"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:syntaxColor range:range];
    } else if ([type isEqualToString:@"strikethrough"]) {
      [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
    } else if ([type isEqualToString:@"code"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:codeForegroundColor range:range];
      [attributedString addAttribute:NSBackgroundColorAttributeName value:codeBackgroundColor range:range];
    } else if ([type isEqualToString:@"mention"]) {
        [attributedString addAttribute:NSBackgroundColorAttributeName value:mentionHereColor range:range];
    } else if ([type isEqualToString:@"mention-user"]) {
        // TODO: change mention color when it mentions current user
        [attributedString addAttribute:NSBackgroundColorAttributeName value:mentionUserColor range:range];
    } else if ([type isEqualToString:@"link"]) {
      [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
      [attributedString addAttribute:NSForegroundColorAttributeName value:linkColor range:range];
    } else if ([type isEqualToString:@"blockquote"]) {
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      [_quoteRanges addObject:[NSValue valueWithRange:range]];
      NSRange circumferencingRange = [self getCircumferencingBlockquoteRange:range];
      int blockquoteNestLevel = [self getBlockquoteNestLevel:range];
      paragraphStyle.firstLineHeadIndent = 11 * blockquoteNestLevel;
      paragraphStyle.headIndent = 11 * blockquoteNestLevel;
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:circumferencingRange];
    } else if ([type isEqualToString:@"pre"]) {
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      paragraphStyle.firstLineHeadIndent = 5;
      paragraphStyle.headIndent = 5;
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
    } else if ([type isEqualToString:@"h1"]) {
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      NSRange range2 = NSMakeRange(range.location - 2, range.length + 2);
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range2];
    }
  }];

  [attributedString endEditing];

  _prevInputString = inputString;
  _prevAttributedString = attributedString;
  _prevTextAttributes = _backedTextInputView.defaultTextAttributes;

  return attributedString;
}

- (NSRange)getCircumferencingBlockquoteRange:(NSRange)range
{
  for (NSValue *quoteRange in _quoteRanges) {
    NSRange quoteRangeValue = [quoteRange rangeValue];
    if (quoteRangeValue.location < range.location && quoteRangeValue.location + quoteRangeValue.length >= range.location + range.length) {
      return quoteRangeValue;
    }
  }
  return range;
}

- (int)getBlockquoteNestLevel:(NSRange)range
{
  int nestLevel = 1;
  for (NSValue *quoteRange in _quoteRanges) {
    NSRange quoteRangeValue = [quoteRange rangeValue];
    if (quoteRangeValue.location < range.location && quoteRangeValue.location + quoteRangeValue.length >= range.location + range.length) {
      nestLevel++;
    }
  }
  return nestLevel;
}

@end
