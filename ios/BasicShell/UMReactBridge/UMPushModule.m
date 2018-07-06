//
//  PushModule.m
//  UMComponent
//
//  Created by wyq.Cloudayc on 11/09/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "UMPushModule.h"
#import <UMPush/UMessage.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>

static NSString * const DidReceiveMessage = @"DidReceiveMessage";
static NSString * const DidOpenMessage = @"DidOpenMessage";

@interface UMPushModule ()<UNUserNotificationCenterDelegate>

@property (nonatomic, strong) NSString *deviceToken;

@end

@implementation UMPushModule

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

//iOS10新增：处理前台收到通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler{
    NSDictionary * userInfo = notification.request.content.userInfo;
    if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //应用处于前台时的远程推送接受
        //关闭U-Push自带的弹出框
        [UMessage setAutoAlert:NO];
        //必须加这句代码
        [UMessage didReceiveRemoteNotification:userInfo];
        
    }else{
        //应用处于前台时的本地推送接受
    }
    //当应用处于前台时提示设置，需要哪个可以设置哪一个
    completionHandler(UNNotificationPresentationOptionSound|UNNotificationPresentationOptionBadge|UNNotificationPresentationOptionAlert);
}

//iOS10新增：处理后台点击通知的代理方法
-(void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler{
    NSDictionary * userInfo = response.notification.request.content.userInfo;
    if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
        //应用处于后台时的远程推送接受
        //必须加这句代码
        [UMessage didReceiveRemoteNotification:userInfo];
        
    }else{
        //应用处于后台时的本地推送接受
    }
}

+ (void)registerWithLaunchOptions:(NSDictionary *)launchOptions {
    UMessageRegisterEntity * entity = [[UMessageRegisterEntity alloc] init];
    //type是对推送的几个参数的选择，可以选择一个或者多个。默认是三个全部打开，即：声音，弹窗，角标等
    entity.types = UMessageAuthorizationOptionBadge|UMessageAuthorizationOptionAlert;
    [UNUserNotificationCenter currentNotificationCenter].delegate = [UMPushModule sharedInstance];
    [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
        if (granted) {
            // 用户选择了接收Push消息
        }else{
            // 用户拒绝接收Push消息
        }
    }];
    
    //由推送第一次打开应用时
    if (launchOptions[@"UIApplicationLaunchOptionsRemoteNotificationKey"]) {
        [self didReceiveRemoteNotificationWhenFirstLaunchApp:launchOptions[@"UIApplicationLaunchOptionsRemoteNotificationKey"]];
    }
}

+ (instancetype)sharedInstance {
    static dispatch_once_t onceToken;
    static UMPushModule *pushModule;
    dispatch_once(&onceToken, ^{
        pushModule = [[UMPushModule alloc] init];
    });
    return pushModule;
}

+ (void)application:(UIApplication *)application didRegisterDeviceToken:(NSData *)deviceToken {
    [UMPushModule sharedInstance].deviceToken = [[[[deviceToken description] stringByReplacingOccurrencesOfString: @"<" withString: @""]
                                                  stringByReplacingOccurrencesOfString: @">" withString: @""]
                                                 stringByReplacingOccurrencesOfString: @" " withString: @""];
    [UMessage registerDeviceToken:deviceToken];
}

- (NSDictionary<NSString *, id> *)constantsToExport {
    return @{
             DidReceiveMessage: DidReceiveMessage,
             DidOpenMessage: DidOpenMessage,
             };
}

- (void)didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [self.bridge.eventDispatcher sendAppEventWithName:DidReceiveMessage body:userInfo];
}

- (void)didOpenRemoteNotification:(NSDictionary *)userInfo {
    [self.bridge.eventDispatcher sendAppEventWithName:DidOpenMessage body:userInfo];
}

RCT_EXPORT_METHOD(setAutoAlert:(BOOL)value) {
    [UMessage setAutoAlert:value];
}

RCT_EXPORT_METHOD(getDeviceToken:(RCTResponseSenderBlock)callback) {
    NSString *deviceToken = self.deviceToken;
    if(deviceToken == nil) {
        deviceToken = @"";
    }
    callback(@[deviceToken]);
}

+ (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
    [UMessage setAutoAlert:NO];
    [UMessage didReceiveRemoteNotification:userInfo];
    //send event
    if (application.applicationState == UIApplicationStateInactive) {
        [[UMPushModule sharedInstance] didOpenRemoteNotification:userInfo];
    }
    else {
        [[UMPushModule sharedInstance] didReceiveRemoteNotification:userInfo];
    }
}

+ (void)didReceiveRemoteNotificationWhenFirstLaunchApp:(NSDictionary *)launchOptions {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), [self sharedMethodQueue], ^{
        //判断当前模块是否正在加载，已经加载成功，则发送事件
        if(![UMPushModule sharedInstance].bridge.isLoading) {
            [UMessage didReceiveRemoteNotification:launchOptions];
            [[UMPushModule sharedInstance] didOpenRemoteNotification:launchOptions];
        }
        else {
            [self didReceiveRemoteNotificationWhenFirstLaunchApp:launchOptions];
        }
    });
}

+ (dispatch_queue_t)sharedMethodQueue {
    static dispatch_queue_t methodQueue;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        methodQueue = dispatch_queue_create("com.kosun.react-native-umeng-push", DISPATCH_QUEUE_SERIAL);
    });
    return methodQueue;
}

//  /**未知错误*/
//  kUMessageErrorUnknown = 0,
//  /**响应出错*/
//  kUMessageErrorResponseErr = 1,
//  /**操作失败*/
//  kUMessageErrorOperateErr = 2,
//  /**参数非法*/
//  kUMessageErrorParamErr = 3,
//  /**条件不足(如:还未获取device_token，添加tag是不成功的)*/
//  kUMessageErrorDependsErr = 4,
//  /**服务器限定操作*/
//  kUMessageErrorServerSetErr = 5,
- (NSString *)checkErrorMessage:(NSInteger)code
{
    switch (code) {
        case 1:
            return @"响应出错";
            break;
        case 2:
            return @"操作失败";
            break;
        case 3:
            return @"参数非法";
            break;
        case 4:
            return @"条件不足(如:还未获取device_token，添加tag是不成功的)";
            break;
        case 5:
            return @"服务器限定操作";
            break;
        default:
            break;
    }
    return nil;
}

- (void)handleResponse:(id  _Nonnull)responseObject remain:(NSInteger)remain error:(NSError * _Nonnull)error completion:(RCTResponseSenderBlock)completion
{
    if (completion) {
        if (error) {
            NSString *msg = [self checkErrorMessage:error.code];
            if (msg.length == 0) {
                msg = error.localizedDescription;
            }
            completion(@[@(error.code), @(remain)]);
        } else {
            if ([responseObject isKindOfClass:[NSDictionary class]]) {
                NSDictionary *retDict = responseObject;
                if ([retDict[@"success"] isEqualToString:@"ok"]) {
                    completion(@[@200, @(remain)]);
                } else {
                    completion(@[@(-1), @(remain)]);
                }
            } else {
                completion(@[@(-1), @(remain)]);
            }
            
        }
    }
}

- (void)handleGetTagResponse:(NSSet * _Nonnull)responseTags remain:(NSInteger)remain error:(NSError * _Nonnull)error completion:(RCTResponseSenderBlock)completion
{
    if (completion) {
        if (error) {
            NSString *msg = [self checkErrorMessage:error.code];
            if (msg.length == 0) {
                msg = error.localizedDescription;
            }
            completion(@[@(error.code), @(remain), @[]]);
        } else {
            if ([responseTags isKindOfClass:[NSSet class]]) {
                NSArray *retList = responseTags.allObjects;
                completion(@[@200, @(remain), retList]);
            } else {
                completion(@[@(-1), @(remain), @[]]);
            }
        }
    }
}
- (void)handleAliasResponse:(id  _Nonnull)responseObject error:(NSError * _Nonnull)error completion:(RCTResponseSenderBlock)completion
{
    if (completion) {
        if (error) {
            NSString *msg = [self checkErrorMessage:error.code];
            if (msg.length == 0) {
                msg = error.localizedDescription;
            }
            completion(@[@(error.code)]);
        } else {
            if ([responseObject isKindOfClass:[NSDictionary class]]) {
                NSDictionary *retDict = responseObject;
                if ([retDict[@"success"] isEqualToString:@"ok"]) {
                    completion(@[@200]);
                } else {
                    completion(@[@(-1)]);
                }
            } else {
                completion(@[@(-1)]);
            }
            
        }
    }
}

RCT_EXPORT_METHOD(addTag:(NSString *)tag response:(RCTResponseSenderBlock)completion)
{
    [UMessage addTags:tag response:^(id  _Nonnull responseObject, NSInteger remain, NSError * _Nonnull error) {
        [self handleResponse:responseObject remain:remain error:error completion:completion];
    }];
}

RCT_EXPORT_METHOD(deleteTag:(NSString *)tag response:(RCTResponseSenderBlock)completion)
{
    [UMessage deleteTags:tag response:^(id  _Nonnull responseObject, NSInteger remain, NSError * _Nonnull error) {
        [self handleResponse:responseObject remain:remain error:error completion:completion];
    }];
}

RCT_EXPORT_METHOD(listTag:(RCTResponseSenderBlock)completion)
{
    [UMessage getTags:^(NSSet * _Nonnull responseTags, NSInteger remain, NSError * _Nonnull error) {
        [self handleGetTagResponse:responseTags remain:remain error:error completion:completion];
    }];
}

RCT_EXPORT_METHOD(addAlias:(NSString *)name type:(NSString *)type response:(RCTResponseSenderBlock)completion)
{
    [UMessage addAlias:name type:type response:^(id  _Nonnull responseObject, NSError * _Nonnull error) {
        [self handleAliasResponse:responseObject error:error completion:completion];
    }];
}

RCT_EXPORT_METHOD(addExclusiveAlias:(NSString *)name type:(NSString *)type response:(RCTResponseSenderBlock)completion)
{
    [UMessage setAlias:name type:type response:^(id  _Nonnull responseObject, NSError * _Nonnull error) {
        [self handleAliasResponse:responseObject error:error completion:completion];
    }];
}

RCT_EXPORT_METHOD(deleteAlias:(NSString *)name type:(NSString *)type response:(RCTResponseSenderBlock)completion)
{
    [UMessage removeAlias:name type:type response:^(id  _Nonnull responseObject, NSError * _Nonnull error) {
        [self handleAliasResponse:responseObject error:error completion:completion];
    }];
}



@end
