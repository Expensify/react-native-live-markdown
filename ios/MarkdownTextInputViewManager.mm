#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "Utils.h"

#import <react-native-markdown-text-input/RCTMarkdownUtils.h>

@interface MarkdownTextInputView : UIView
@end

@implementation MarkdownTextInputView

- (void)didMoveToWindow {
  NSArray *viewsArray = self.superview.subviews;
  NSUInteger currentIndex = [viewsArray indexOfObject:self];
  if (currentIndex == 0 || currentIndex == NSNotFound) {
    return;
  }
  UIView *found = [viewsArray objectAtIndex:currentIndex - 1];
  // TODO: enable Markdown only for this specific view
  return;
}

@end

@interface MarkdownTextInputViewManager : RCTViewManager
@end

@implementation MarkdownTextInputViewManager

RCT_EXPORT_MODULE(MarkdownTextInputView)

- (UIView *)view
{
  return [[MarkdownTextInputView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(color, NSString, UIView)
{
  [view setBackgroundColor: [Utils hexStringToColor:json]];
}

@end
