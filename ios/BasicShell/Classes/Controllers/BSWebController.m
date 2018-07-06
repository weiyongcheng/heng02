//
//  WebViewController.m
//  BasicShell
//
//  Created by Mike on 02/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BSWebController.h"
#import <WebKit/WebKit.h>
#import <Photos/Photos.h>

@interface BSWebController ()<WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>

@property (nonatomic, strong) WKWebView *webView;
@property (weak, nonatomic) IBOutlet UIView *safeView;

@property (nonatomic, assign) NSInteger orientation;

@end

@implementation BSWebController

- (instancetype)init {
    self = [super init];
    if (self) {
        self.orientation = 1;
    }
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
    [config.userContentController addScriptMessageHandler:self name:@"setOrientation"];
    [config.userContentController addScriptMessageHandler:self name:@"downloadImage"];
    [config.userContentController addScriptMessageHandler:self name:@"openBrowser"];
    [config.userContentController addScriptMessageHandler:self name:@"openApp"];
    [config.userContentController addScriptMessageHandler:self name:@"captureScreen"];
    
    self.webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:config];
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    self.webView.allowsBackForwardNavigationGestures = YES;
    
    [self.view addSubview:self.webView];
    
    self.webView.translatesAutoresizingMaskIntoConstraints = NO;
    UILayoutGuide *guide = self.view.layoutMarginsGuide;
    [NSLayoutConstraint activateConstraints:@[[self.webView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
                                              [self.webView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
                                              [self.webView.topAnchor constraintEqualToAnchor:guide.topAnchor],
                                              [self.webView.bottomAnchor constraintEqualToAnchor:guide.bottomAnchor]]];
    
    
    NSURL *url = [NSURL URLWithString:self.urlString];
    
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [self.webView loadRequest:request];

    [self.navigationController setNavigationBarHidden:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    if (self.orientation == 1) {
        return UIInterfaceOrientationMaskPortrait;
    } else {
        return UIInterfaceOrientationMaskLandscape;
    }
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    if (navigationAction.targetFrame == nil) {
        [webView loadRequest:navigationAction.request];
    }
    
    NSURL *url = navigationAction.request.URL;
    if (![url.absoluteString hasPrefix:@"http"] && [url.absoluteString containsString:@"://"]) {
        NSLog(@"%@", navigationAction.request.URL.absoluteString);
        [[UIApplication sharedApplication] openURL:navigationAction.request.URL];
        decisionHandler(WKNavigationActionPolicyCancel);
    } else {
        decisionHandler(WKNavigationActionPolicyAllow);
    }
}

- (WKWebView *)webView:(WKWebView *)webView createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration forNavigationAction:(WKNavigationAction *)navigationAction windowFeatures:(WKWindowFeatures *)windowFeatures {
    [self.webView loadRequest:navigationAction.request];
    return nil;
}

- (void)userContentController:(nonnull WKUserContentController *)userContentController didReceiveScriptMessage:(nonnull WKScriptMessage *)message {
    if ([message.name isEqualToString:@"setOrientation"]) {
        // 横竖屏
        NSInteger orientation = [message.body integerValue];
        self.orientation = orientation;
        [[UIDevice currentDevice] setValue:@(orientation?UIInterfaceOrientationPortrait:UIInterfaceOrientationLandscapeLeft) forKey:@"orientation"];
        [UIViewController attemptRotationToDeviceOrientation];
    }
    
    if ([message.name isEqualToString:@"downloadImage"]) {
        NSString *url = message.body;
        NSLog(@"downloadImage %@", url);
        [self saveImageWithUrl:url];
    }
    
    if ([message.name isEqualToString:@"openBrowser"]) {
        NSLog(@"openBrowser");
        NSString *url = message.body;
        if (![url hasPrefix:@"http"] && ![url containsString:@"://"]) {
            url = [NSString stringWithFormat:@"http://%@", url];
        }
        [self openScheme:url];
    }
    
    if ([message.name isEqualToString:@"openApp"]) {
        NSString *url = message.body;
        if (![url containsString:@"://"]) {
            url = [NSString stringWithFormat:@"%@://", url];
        }
        [self openScheme:url];
    }
    
    if ([message.name isEqualToString:@"captureScreen"]) {
        UIImage *screenShot = [self screenShot];
        [self saveImage:screenShot];
    }
}

- (UIImage *)screenShot{
    CGRect screenRect = [UIScreen mainScreen].bounds;
    
    if ([[UIScreen mainScreen] respondsToSelector:@selector(scale)]){
        UIGraphicsBeginImageContextWithOptions(screenRect.size, NO, [UIScreen mainScreen].scale);
    } else {
        UIGraphicsBeginImageContext(screenRect.size);
    }
    
    UIGraphicsGetCurrentContext();
    [self.view.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();        //image就是截取的图片
    UIGraphicsEndImageContext();
    return image;
}

- (void)openScheme:(NSString *)url {
    NSURL *URL = [NSURL URLWithString:url];
    UIApplication *app = [UIApplication sharedApplication];
    if ([app canOpenURL:URL]) {
        [app openURL:URL];
    }
}

- (void)saveImageWithUrl:(NSString *)url
{
    [self saveImageIfAuthorized:^{
        UIAlertController *alert = [self alertForStatusWithMessage:@"现在保存图片，请稍等..."];
        [self showAlert:alert];
        
        dispatch_queue_t globalQueue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);
        dispatch_async(globalQueue, ^{
            NSData *data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
            UIImage *image = [UIImage imageWithData:data];
            dispatch_async(dispatch_get_main_queue(), ^{
                
                NSError *error = nil;
                [[PHPhotoLibrary sharedPhotoLibrary] performChangesAndWait:^{
                    [PHAssetChangeRequest creationRequestForAssetFromImage:image];
                } error:&error];
                
                if (error) {
                    alert.message = @"保存失败";
                    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                        [alert dismissViewControllerAnimated:YES completion:nil];
                    });
                } else {
                    alert.message = @"保存成功";
                    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                        [alert dismissViewControllerAnimated:YES completion:nil];
                    });
                }
                
            });
        });
    }];
}

- (void)saveImage:(UIImage *)image {
    [self saveImageIfAuthorized:^{
        UIAlertController *alert = [self alertForStatusWithMessage:@"现在保存图片，请稍等..."];
        [self showAlert:alert];
        
        NSError *error = nil;
        [[PHPhotoLibrary sharedPhotoLibrary] performChangesAndWait:^{
            [PHAssetChangeRequest creationRequestForAssetFromImage:image];
        } error:&error];
        
        if (error) {
            alert.message = @"保存失败";
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [alert dismissViewControllerAnimated:YES completion:nil];
            });
        } else {
            alert.message = @"保存成功";
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [alert dismissViewControllerAnimated:YES completion:nil];
            });
        }
    }];
}

- (void)saveImageIfAuthorized:(void(^)())saveAction {
    PHAuthorizationStatus lastStatus = [PHPhotoLibrary authorizationStatus];
    [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
        //回到主线程
        dispatch_async(dispatch_get_main_queue(), ^{
            
            if(status == PHAuthorizationStatusDenied) //用户拒绝（可能是之前拒绝的，有可能是刚才在系统弹框中选择的拒绝）
            {
                if (lastStatus == PHAuthorizationStatusNotDetermined) {
                    //说明，用户之前没有做决定，在弹出授权框中，选择了拒绝
                    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                        UIAlertController *alert = [self alertForStatusWithMessage:@"保存失败"];
                        [self showAlert:alert];
                    });
                    return;
                }
                // 说明，之前用户选择拒绝过，现在又点击保存按钮，说明想要使用该功能，需要提示用户打开授权
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    UIAlertController *alert = [self alertForStatusWithMessage:@"失败！请在系统设置中开启访问相册权限"];
                    [self showAlert:alert];
                });
            }
            else if(status == PHAuthorizationStatusAuthorized) //用户允许
            {
                if (saveAction) {
                    saveAction();
                }
            }
            else if (status == PHAuthorizationStatusRestricted)
            {
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.75 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    UIAlertController *alert = [self alertForStatusWithMessage:@"系统原因，无法访问相册"];
                    [self showAlert:alert];
                });
            }
        });
    }];
}

- (void)showAlert:(UIAlertController *)controller {
    [self presentViewController:controller animated:YES completion:nil];
}

- (UIAlertController *)alertForStatusWithMessage:(NSString *)message {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"" message:message preferredStyle:UIAlertControllerStyleAlert];
    return alert;
}

@end
