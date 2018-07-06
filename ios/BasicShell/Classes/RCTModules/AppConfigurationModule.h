//
//  AppConfigurationModule.h
//  angelia
//
//  Created by Mike on 05/12/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

#define KDStr(a, b, c, d, e) ([[[[(a) stringByAppendingString:(b)]stringByAppendingString:(c)]stringByAppendingString:(d)]stringByAppendingString:(e)])
@interface AppConfigurationModule : NSObject <RCTBridgeModule>

+ (instancetype)sharedInstance;

@property (nonatomic, strong) NSString *apiServer;
@property (nonatomic, strong) NSString *channel;
@property (nonatomic, strong) NSString *umengAppKey;
@property (nonatomic, strong) NSString *umengMessageSecret;
@property (nonatomic, strong) NSString *jpushAppKey;
@property (nonatomic, strong) NSString *xgAppId;
@property (nonatomic, strong) NSString *xgAppKey;

@property (nonatomic, strong) NSString *codePushKey;
@property (nonatomic, strong) NSString *codePushServerUrl;
@property (nonatomic, strong) NSString *codePushAppVersion;

@property (nonatomic, assign) NSInteger reviewStatus;
@property (nonatomic, assign) BOOL isInAvailableArea;

@property (nonatomic, assign) NSInteger appMode;
@property (nonatomic, strong) NSString *wapUrl;

@property (nonatomic, strong) NSDictionary *configs;

@property (nonatomic, assign) NSInteger orientation;

@end
