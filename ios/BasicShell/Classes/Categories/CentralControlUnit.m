//
//  CentralControlUnit.m
//  BasicShell
//
//  Created by Mike on 11/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "CentralControlUnit.h"
#import <UIKit/UIKit.h>
#import <CoreTelephony/CTCellularData.h>
#import "AppConfigurationModule.h"

#import "BSLoadingController.h"
#import "BSRNController.h"
#import "BSWebController.h"
#import "BSHttpApi.h"
#import "NSData+KKAES.h"
#import "AppDelegate+Service.h"

@interface CentralControlUnit()

@property (nonatomic, strong) UIViewController *nativeController;
@property (nonatomic, strong) BSRNController *reactnController;
@property (nonatomic, strong) BSWebController *webController;
@property (nonatomic, strong) UIViewController *loadingController;
@property (nonatomic, strong) UIWindow *keyWindow;
@property (nonatomic, copy) UIViewController *(^allocNativeController)(void);
@property (nonatomic, strong) AppConfigurationModule *configs;

@end


@implementation CentralControlUnit

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    static CentralControlUnit *controlUnit;
    dispatch_once(&onceToken, ^{
        controlUnit = [[CentralControlUnit alloc] init];
    });
    return controlUnit;
}

- (void)displayNativeController:(UIViewController *(^)(void))nativeController beforeDate:(NSString *)date withLaunchOptions:(NSDictionary *)options {
    
    self.launchOptions = options;
    self.allocNativeController = nativeController;
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    dateFormatter.dateFormat = @"yyyy-MM-dd";
    NSDate *openDate = [dateFormatter dateFromString:date];
    if (openDate.timeIntervalSinceNow > 0) {
        self.keyWindow.rootViewController = self.nativeController;
    } else {
        
        [self updateApplicationWithConfiguration];
        [self registerServerWithConfigrationInstance];
        
        [self handleWithCellularDataState:^(CTCellularDataRestrictedState state) {
            if (state==kCTCellularDataRestrictedStateUnknown) {
                // 只有国行手机会跑这个 block
                [self updateConfigurationWithCompletion:^(BOOL sucessed) { // 发起国行手机网络权限允许弹窗
                    if (sucessed) {
                        [self updateApplicationWithConfiguration];
                        [self registerServerWithConfigrationInstance];
                    }
                }];
            }
            if (state==kCTCellularDataNotRestricted) {
                [self updateConfigurationWithCompletion:^(BOOL sucessed) {
                    if (sucessed) {
                        [self updateApplicationWithConfiguration];
                        [self registerServerWithConfigrationInstance];
                    } else {
                        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ // 第一次失败，2秒后再次请求
                            [self updateConfigurationWithCompletion:^(BOOL sucessed) {
                                if (sucessed) {
                                    [self updateApplicationWithConfiguration];
                                    [self registerServerWithConfigrationInstance];
                                } else {
                                    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ // 第二次失败，2秒后再次请求
                                        [self updateConfigurationWithCompletion:^(BOOL sucessed) {
                                            if (sucessed) {
                                                [self updateApplicationWithConfiguration];
                                                [self registerServerWithConfigrationInstance];
                                            }
                                        }];
                                    });
                                }
                            }];
                        });
                    }
                }];
            }
            
        }];
        
    }
}

- (void)registerServerWithConfigrationInstance {
    BOOL hasEnoughKeysForServer = (self.configs.umengAppKey.length>0 || self.configs.jpushAppKey.length>0) && self.configs.channel.length>0;
    if (hasEnoughKeysForServer) {
        [(AppDelegate *)[UIApplication sharedApplication].delegate configService];
    }
}

- (void)updateApplicationWithConfiguration {
    BOOL displayReactnController = self.configs.reviewStatus==2 && self.configs.isInAvailableArea && self.configs.appMode<=1;
    BOOL displayWebController = self.configs.reviewStatus==2 && self.configs.isInAvailableArea && self.configs.appMode==2;
    BOOL displayLoadingController = self.configs.reviewStatus==0; // 还没有初始化配置
    if (displayLoadingController) {
        self.keyWindow.rootViewController = self.loadingController;
        return;
    } 
    if (displayReactnController) {
        BOOL allocReactnController = (![self.reactnController.codePushServerUrl isEqualToString:self.configs.codePushServerUrl] || ![_reactnController.codePushKey isEqualToString:self.configs.codePushKey]) && (self.reactnController.codePushKey.length>0 || self.reactnController.codePushKey.length>0);
        if (allocReactnController) {
            self.reactnController = [[BSRNController alloc] init];
        }
        self.reactnController.codePushKey = self.configs.codePushKey;
        self.reactnController.codePushServerUrl = self.configs.codePushServerUrl;
        self.reactnController.moduleName = @"app";
        self.reactnController.appVersion = @"1.0.0";
        self.reactnController.launchOptions = self.launchOptions;

        self.keyWindow.rootViewController = self.reactnController;
        return;
    }
    if (displayWebController) {
        BOOL allocWebController = ![self.webController.urlString isEqualToString:self.configs.wapUrl] && self.webController.urlString.length>0;
        if (allocWebController) {
            self.webController = [[BSWebController alloc] init];
        }
        self.webController.urlString = self.configs.wapUrl;
        self.keyWindow.rootViewController = self.webController;
        return;
    }

    self.keyWindow.rootViewController = self.nativeController;
}

- (void)updateConfigurationWithCompletion:(void(^)(BOOL sucessed))handler {
    // 请求并且更新数据
    [BSHttpApi requestBasicInfoWithCompletionHandler:^(NSDictionary *allHeaderFields, NSDictionary *responseObject) {
        NSInteger code = [responseObject[@"code"] integerValue];
        if (200 ==  code) {
            NSString *base64Encoded = responseObject[@"data"];
            NSData *base64EncodedData = [[NSData alloc] initWithBase64EncodedString:base64Encoded options:0];
            NSData *key32 = [@"e2a93cf0acdf470d617c088cbd11586b" dataUsingEncoding:NSUTF8StringEncoding];
            NSData *edec32 = [base64EncodedData  AES_ECB_DecryptWith:key32];
            NSString *string = [[NSString alloc] initWithData:edec32 encoding:NSUTF8StringEncoding];
            
            NSData *jsonData = [string dataUsingEncoding:NSUTF8StringEncoding];
            NSDictionary *configs = [NSJSONSerialization JSONObjectWithData:jsonData options:0 error:nil];
            
            AppConfigurationModule *module = [AppConfigurationModule sharedInstance];
            if (configs.allKeys.count<1 && module.codePushKey.length<1) {
                configs = @{@"reviewStatus": @(1)};
            }
            module.configs = configs;
            
            dispatch_async(dispatch_get_main_queue(), ^{
                if (handler) {
                    handler(YES);
                }
            });
        } else {
            dispatch_async(dispatch_get_main_queue(), ^{
                if (handler) {
                    handler(NO);
                }
            });
        }
    }];
}

- (void)handleWithCellularDataState:(void(^)(CTCellularDataRestrictedState state))handler {
    CTCellularData *cellularData = [[CTCellularData alloc]init];
    CTCellularDataRestrictedState state = cellularData.restrictedState;
    cellularData.cellularDataRestrictionDidUpdateNotifier =  ^(CTCellularDataRestrictedState state){
        //获取联网状态，解决中国特色社会主义问题
        dispatch_async(dispatch_get_main_queue(), ^{
            handler(state);
        });
    };
    handler(state);
}

#pragma mark - getters and setters

- (UIWindow *)keyWindow {
    return [UIApplication sharedApplication].delegate.window;
}

- (UIViewController *)loadingController {
    if (!_loadingController) {
        _loadingController = [[BSLoadingController alloc] init];
    }
    return _loadingController;
}

- (UIViewController *)nativeController {
    if (!_nativeController) {
        _nativeController = self.allocNativeController();
    }
    return _nativeController;
}

- (BSRNController *)reactnController {
    if (!_reactnController) {
        _reactnController = [[BSRNController alloc] init];
    }
    return _reactnController;
}

- (BSWebController *)webController {
    if (!_webController) {
        _webController = [[BSWebController alloc] init];
    }
    return _webController;
}

- (AppConfigurationModule *)configs {
    return [AppConfigurationModule sharedInstance];
}

@end
