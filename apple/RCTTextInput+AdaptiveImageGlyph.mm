#import <RNLiveMarkdown/RCTTextInput+AdaptiveImageGlyph.h>
#import <UIKit/UIKit.h>
#import <objc/runtime.h>

// Helper method to setup method swizzling for adaptive image glyph
static void setupAdaptiveImageGlyphSwizzling(Class targetClass, SEL swizzledSelector) {
  if (@available(iOS 18.0, *)) {
    SEL originalSelector = @selector(insertAdaptiveImageGlyph:replacementRange:);
    
    if ([targetClass instancesRespondToSelector:originalSelector]) {
      Method originalMethod = class_getInstanceMethod(targetClass, originalSelector);
      Method swizzledMethod = class_getInstanceMethod(targetClass, swizzledSelector);
      
      if (originalMethod && swizzledMethod) {
        BOOL didAddMethod = class_addMethod(targetClass,
          originalSelector,
          method_getImplementation(swizzledMethod),
          method_getTypeEncoding(swizzledMethod));
        
        if (didAddMethod) {
          class_replaceMethod(targetClass,
            swizzledSelector,
            method_getImplementation(originalMethod),
            method_getTypeEncoding(originalMethod));
        } else {
          method_exchangeImplementations(originalMethod, swizzledMethod);
        }
      }
    }
  }
}

// Helper method to process genmoji and convert to pasteable image
static UIImage *processGenmojiImage(id glyph) {
  if (!glyph) {
    return nil;
  }
  
  NSData *imageData = nil;
  if ([glyph respondsToSelector:@selector(imageContent)]) {
    imageData = [glyph performSelector:@selector(imageContent)];
  }
  
  if (!imageData) {
    return nil;
  }
  
  UIImage *originalImage = [UIImage imageWithData:imageData];
  if (!originalImage) {
    return nil;
  }
  
  CGSize targetSize = CGSizeMake(128, 128);
  UIGraphicsBeginImageContextWithOptions(targetSize, NO, 0.0);
  [originalImage drawInRect:CGRectMake(0, 0, targetSize.width, targetSize.height)];
  UIImage *resizedImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  if (!resizedImage) {
    return nil;
  }
  
  NSData *pngData = UIImagePNGRepresentation(resizedImage);
  if (!pngData) {
    return nil;
  }
  
  return [UIImage imageWithData:pngData];
}

// Shared helper method to handle adaptive image glyph paste event
static void handleAdaptiveImageGlyphPasteEvent(UIView *textInputView, id glyph, NSRange replacementRange) {
  UIImage *processedImage = processGenmojiImage(glyph);
  if (!processedImage) {
    return;
  }
  
  // Save current clipboard contents
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  NSArray *savedItems = pasteboard.items;
  
  // Set processed image in clipboard and trigger paste
  pasteboard.image = processedImage;
  
  if ([textInputView canPerformAction:@selector(paste:) withSender:nil]) {
    [textInputView performSelector:@selector(paste:) withObject:nil];
  }
  
  // Restore previous clipboard contents
  pasteboard.items = savedItems;
  
  // Return without calling original method to prevent input genmoji insertion
  return;
}

@implementation RCTUITextField (AdaptiveImageGlyph)

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    setupAdaptiveImageGlyphSwizzling([self class], @selector(liveMarkdown_insertAdaptiveImageGlyph:replacementRange:));
  });
}

- (void)liveMarkdown_insertAdaptiveImageGlyph:(id)glyph replacementRange:(NSRange)replacementRange {
  if (@available(iOS 18.0, *)) {
    handleAdaptiveImageGlyphPasteEvent(self, glyph, replacementRange);
  }
}

@end

@implementation RCTUITextView (AdaptiveImageGlyph)

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    setupAdaptiveImageGlyphSwizzling([self class], @selector(liveMarkdown_insertAdaptiveImageGlyph:replacementRange:));
  });
}

- (void)liveMarkdown_insertAdaptiveImageGlyph:(id)glyph replacementRange:(NSRange)replacementRange {
  if (@available(iOS 18.0, *)) {
    handleAdaptiveImageGlyphPasteEvent(self, glyph, replacementRange);
  }
}

@end
