#import <React/RCTUITextField.h>
#import <React/RCTUITextView.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTUITextField (AdaptiveImageGlyph)
- (void)liveMarkdown_insertAdaptiveImageGlyph:(id)glyph replacementRange:(NSRange)replacementRange;
@end

@interface RCTUITextView (AdaptiveImageGlyph)
- (void)liveMarkdown_insertAdaptiveImageGlyph:(id)glyph replacementRange:(NSRange)replacementRange;
@end

NS_ASSUME_NONNULL_END
