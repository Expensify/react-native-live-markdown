#import <UIKit/UIKit.h>
#import <React/RCTUITextField.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextFieldObserver : NSObject

- (instancetype)initWithTextField:(nonnull RCTUITextField *)textField markdownUtils:(nonnull RCTMarkdownUtils *)markdownUtils;

- (void)textFieldDidChange:(UITextField *)textField;

- (void)textFieldDidEndEditing:(UITextField *)textField;

@end

NS_ASSUME_NONNULL_END
