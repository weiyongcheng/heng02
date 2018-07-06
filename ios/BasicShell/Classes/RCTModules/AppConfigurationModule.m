//
//  ConfigurationKeys.m
//  angelia
//
//  Created by Mike on 05/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "AppConfigurationModule.h"
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import "BSRNController.h"
#import "BSWebController.h"

@interface AppConfigurationModule ()

@property (nonatomic, strong) NSUserDefaults *userDefaults;

@end

@implementation AppConfigurationModule

RCT_EXPORT_MODULE();

@synthesize configs = _configs;

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSDictionary<NSString *, id> *)constantsToExport {
    AppConfigurationModule *module = [AppConfigurationModule sharedInstance];
    return module.configs;
}

- (void)setValue:(id)value forUndefinedKey:(NSString *)key {
    NSLog(@"⚠️ undefine %@", key);
}

- (void)setConfigs:(NSDictionary *)configs {
    _configs = configs;
    [self.userDefaults setObject:configs forKey:@"configs"];
    [self setValuesForKeysWithDictionary:configs];
}

- (NSDictionary *)configs {
    _configs = [self.userDefaults dictionaryForKey:@"configs"];
    return _configs;
}

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    static AppConfigurationModule *module;
    dispatch_once(&onceToken, ^{
        module = [[AppConfigurationModule alloc] init];
        module.userDefaults = [NSUserDefaults standardUserDefaults];
        [module setValuesForKeysWithDictionary:module.configs];
    });
    return module;
}

RCT_REMAP_METHOD(setOrientation,
                 orientation:(NSInteger)orientation Resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    //landscape -> 0; protrait -> 1;
    
    dispatch_async(dispatch_get_main_queue(), ^{
        AppConfigurationModule *module = [AppConfigurationModule sharedInstance];
        module.orientation = orientation;
        id rootController = [UIApplication sharedApplication].delegate.window.rootViewController;
        if ([rootController isKindOfClass:[BSRNController class]]) {
            [[UIDevice currentDevice] setValue:@(module.orientation?UIInterfaceOrientationPortrait:UIInterfaceOrientationLandscapeLeft) forKey:@"orientation"];
            [UIViewController attemptRotationToDeviceOrientation];
            resolve(@(orientation));
        } else {
            NSError *error = [NSError errorWithDomain:@"" code:0 userInfo:@{}];
            reject(@"orientation_error", @"orientation_error", error);
        }
    });
    
}

- (NSInteger)orientation {
    if ([self.userDefaults objectForKey:@"reactNativeOrientation"] == nil) {
        [self.userDefaults setInteger:1 forKey:@"reactNativeOrientation"];
    }
    return [self.userDefaults integerForKey:@"reactNativeOrientation"];
}

- (void)setOrientation:(NSInteger)orientation {
    [self.userDefaults setInteger:orientation forKey:@"reactNativeOrientation"];
}

@end
