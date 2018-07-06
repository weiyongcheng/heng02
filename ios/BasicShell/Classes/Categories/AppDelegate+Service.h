//
//  AppDelegate+Service.h
//  BasicShell
//
//  Created by Mike on 29/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "AppDelegate.h"

#import "UMPushModule.h"
#import <UMCommon/UMCommon.h>
#import <UMAnalytics/MobClick.h>
#import <UMPush/UMessage.h>
#import <UMShare/UMSocialManager.h>
#import <UMErrorCatch/UMErrorCatch.h>

#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

#import <React/RCTLinkingManager.h>

@interface AppDelegate (Service)<UNUserNotificationCenterDelegate, JPUSHRegisterDelegate, UNUserNotificationCenterDelegate>

- (void)configService;

@end
