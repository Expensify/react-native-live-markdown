#import <UIKit/UIKit.h>
#import <React/RCTUITextField.h>
#import <RNLiveMarkdown/RCTMarkdownUtils.h>

NS_ASSUME_NONNULL_BEGIN

@interface MarkdownTextFieldObserver : NSObject

@property (nonatomic, nullable, strong) RCTMarkdownUtils *markdownUtils;

@property (nonatomic, nullable, strong) RCTUITextField *textField;

@property (nonatomic) BOOL active;

- (void)textFieldDidChange:(UITextField *)textField;

@end

NS_ASSUME_NONNULL_END
