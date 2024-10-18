#import <RNLiveMarkdown/MarkdownTextLayoutManagerDelegate.h>
#import <RNLiveMarkdown/BlockquoteTextLayoutFragment.h>

@implementation MarkdownTextLayoutManagerDelegate

- (NSTextLayoutFragment *)textLayoutManager:(NSTextLayoutManager *)textLayoutManager textLayoutFragmentForLocation:(id <NSTextLocation>)location inTextElement:(NSTextElement *)textElement
API_AVAILABLE(ios(15.0)){
    NSInteger index = [textLayoutManager offsetFromLocation:textLayoutManager.documentRange.location toLocation:location];
    if (index < self.textStorage.length) {
        NSNumber *isBlockquote = [self.textStorage attribute:RCTLiveMarkdownBlockquoteAttributeName atIndex:index effectiveRange:nil];
        if ([isBlockquote boolValue]) {
            BlockquoteTextLayoutFragment *textLayoutFragment = [[BlockquoteTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
            textLayoutFragment.markdownUtils = _markdownUtils;
            return textLayoutFragment;
        }
    }
    return [[NSTextLayoutFragment alloc] initWithTextElement:textElement range:textElement.elementRange];
}

@end
