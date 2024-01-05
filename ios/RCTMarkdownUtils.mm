#import <react-native-markdown-text-input/RCTMarkdownUtils.h>
#import <react/debug/react_native_assert.h>
#import <React/RCTAssert.h>
#import <JavaScriptCore/JavaScriptCore.h>

@implementation RCTMarkdownUtils {
  NSString *_prevInputString;
  NSAttributedString *_prevAttributedString;
  NSDictionary<NSAttributedStringKey, id> *_prevTextAttributes;
  __weak RCTMarkdownStyle *_prevMarkdownStyle;
}

- (instancetype)initWithBackedTextInputView:(UIView<RCTBackedTextInputViewProtocol> *)backedTextInputView
{
  if (self = [super init]) {
    _backedTextInputView = backedTextInputView;
  }
  return self;
}

- (NSAttributedString *)parseMarkdown:(nullable NSAttributedString *)input
{
  RCTAssertMainQueue();

  if (input == nil) {
    return nil;
  }

  NSString *inputString = [input string];
  if ([inputString isEqualToString:_prevInputString] && [_backedTextInputView.defaultTextAttributes isEqualToDictionary:_prevTextAttributes] && [_markdownStyle isEqual:_prevMarkdownStyle]) {
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
      size = _markdownStyle.h1FontSize;
    }
    UIFont *newFont = [UIFont fontWithDescriptor:newFontDescriptor size:size];
    [attributedString addAttribute:NSFontAttributeName value:newFont range:range];

    if ([type isEqualToString:@"syntax"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.syntaxColor range:range];
    } else if ([type isEqualToString:@"strikethrough"]) {
      [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
    } else if ([type isEqualToString:@"code"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.codeColor range:range];
      [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.codeBackgroundColor range:range];
    } else if ([type isEqualToString:@"mention"]) {
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionHereBackgroundColor range:range];
    } else if ([type isEqualToString:@"mention-user"]) {
        // TODO: change mention color when it mentions current user
        [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionUserBackgroundColor range:range];
    } else if ([type isEqualToString:@"link"]) {
      [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.linkColor range:range];
    } else if ([type isEqualToString:@"blockquote"]) {
      CGFloat indent = _markdownStyle.quoteMarginLeft + _markdownStyle.quoteBorderWidth + _markdownStyle.quotePaddingLeft;
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      paragraphStyle.firstLineHeadIndent = indent;
      paragraphStyle.headIndent = indent;
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
      [_quoteRanges addObject:[NSValue valueWithRange:range]];
    } else if ([type isEqualToString:@"pre"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.preColor range:range];
      // TODO: pass background color and ranges to layout manager
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
  _prevMarkdownStyle = _markdownStyle;

  return attributedString;
}

@end
