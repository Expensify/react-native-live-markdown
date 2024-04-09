#import <RNLiveMarkdown/RCTMarkdownUtils.h>
#import "react_native_assert.h"
#import <React/RCTAssert.h>
#import <React/RCTFont.h>
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
    NSString *path = [[NSBundle mainBundle] pathForResource:@"react-native-live-markdown-parser" ofType:@"js"];
    assert(path != nil && "[react-native-live-markdown] Markdown parser bundle not found");
    NSString *content = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
    assert(content != nil && "[react-native-live-markdown] Markdown parser bundle is empty");
    ctx = [[JSContext alloc] init];
    [ctx evaluateScript:content];
    function = ctx[@"parseExpensiMarkToRanges"];
  }

  JSValue *result = [function callWithArguments:@[inputString]];
  NSArray *ranges = [result toArray];

  NSMutableAttributedString *attributedString = [[NSMutableAttributedString alloc] initWithString:inputString attributes:_backedTextInputView.defaultTextAttributes];
  [attributedString beginEditing];

  // If the attributed string ends with underlined text, blurring the single-line input imprints the underline style across the whole string.
  // It looks like a bug in iOS, as there is no underline style to be found in the attributed string, especially after formatting.
  // This is a workaround that applies the NSUnderlineStyleNone to the string before iterating over ranges which resolves this problem.
  [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleNone] range:NSMakeRange(0, attributedString.length)];

  _blockquoteRangesAndLevels = [NSMutableArray new];

  [ranges enumerateObjectsUsingBlock:^(id _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    NSDictionary *item = obj;
    NSString *type = [item valueForKey:@"type"];
    NSInteger location = [[item valueForKey:@"start"] unsignedIntegerValue];
    NSInteger length = [[item valueForKey:@"length"] unsignedIntegerValue];
    NSInteger depth = [[item valueForKey:@"depth"] unsignedIntegerValue] ?: 1;
    NSRange range = NSMakeRange(location, length);

    if ([type isEqualToString:@"bold"] || [type isEqualToString:@"italic"] || [type isEqualToString:@"code"] || [type isEqualToString:@"pre"] || [type isEqualToString:@"h1"] || [type isEqualToString:@"emoji"]) {
      UIFont *font = [attributedString attribute:NSFontAttributeName atIndex:location effectiveRange:NULL];
      if ([type isEqualToString:@"bold"]) {
        font = [RCTFont updateFont:font withWeight:@"bold"];
      } else if ([type isEqualToString:@"italic"]) {
        font = [RCTFont updateFont:font withStyle:@"italic"];
      } else if ([type isEqualToString:@"code"]) {
        font = [RCTFont updateFont:font withFamily:_markdownStyle.codeFontFamily
                                              size:[NSNumber numberWithFloat:_markdownStyle.codeFontSize]
                                            weight:nil
                                             style:nil
                                           variant:nil
                                   scaleMultiplier:0];
      } else if ([type isEqualToString:@"pre"]) {
        font = [RCTFont updateFont:font withFamily:_markdownStyle.preFontFamily
                                              size:[NSNumber numberWithFloat:_markdownStyle.preFontSize]
                                            weight:nil
                                             style:nil
                                           variant:nil
                                   scaleMultiplier:0];
      } else if ([type isEqualToString:@"h1"]) {
        font = [RCTFont updateFont:font withFamily:nil
                                              size:[NSNumber numberWithFloat:_markdownStyle.h1FontSize]
                                            weight:@"bold"
                                             style:nil
                                           variant:nil
                                   scaleMultiplier:0];
      } else if ([type isEqualToString:@"emoji"]) {
        font = [RCTFont updateFont:font withFamily:nil
                                              size:[NSNumber numberWithFloat:_markdownStyle.emojiFontSize]
                                            weight:nil
                                             style:nil
                                           variant:nil
                                   scaleMultiplier:0];
      }
      [attributedString addAttribute:NSFontAttributeName value:font range:range];
    }

    if ([type isEqualToString:@"syntax"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.syntaxColor range:range];
    } else if ([type isEqualToString:@"strikethrough"]) {
      [attributedString addAttribute:NSStrikethroughStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
    } else if ([type isEqualToString:@"code"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.codeColor range:range];
      [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.codeBackgroundColor range:range];
    } else if ([type isEqualToString:@"mention-here"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionHereColor range:range];
      [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionHereBackgroundColor range:range];
    } else if ([type isEqualToString:@"mention-user"]) {
      // TODO: change mention color when it mentions current user
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.mentionUserColor range:range];
      [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.mentionUserBackgroundColor range:range];
    } else if ([type isEqualToString:@"link"]) {
      [attributedString addAttribute:NSUnderlineStyleAttributeName value:[NSNumber numberWithInteger:NSUnderlineStyleSingle] range:range];
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.linkColor range:range];
    } else if ([type isEqualToString:@"blockquote"]) {
      CGFloat indent = (_markdownStyle.blockquoteMarginLeft + _markdownStyle.blockquoteBorderWidth + _markdownStyle.blockquotePaddingLeft) * depth;
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      paragraphStyle.firstLineHeadIndent = indent;
      paragraphStyle.headIndent = indent;
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:range];
      [_blockquoteRangesAndLevels addObject:@{
        @"range": [NSValue valueWithRange:range],
        @"depth": @(depth)
      }];
    } else if ([type isEqualToString:@"pre"]) {
      [attributedString addAttribute:NSForegroundColorAttributeName value:_markdownStyle.preColor range:range];
      NSRange rangeForBackground = [inputString characterAtIndex:range.location] == '\n' ? NSMakeRange(range.location + 1, range.length - 1) : range;
      [attributedString addAttribute:NSBackgroundColorAttributeName value:_markdownStyle.preBackgroundColor range:rangeForBackground];
      // TODO: pass background color and ranges to layout manager
    } else if ([type isEqualToString:@"h1"]) {
      NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
      NSRange rangeWithHashAndSpace = NSMakeRange(range.location - 2, range.length + 2); // we also need to include prepending "# "
      [attributedString addAttribute:NSParagraphStyleAttributeName value:paragraphStyle range:rangeWithHashAndSpace];
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
