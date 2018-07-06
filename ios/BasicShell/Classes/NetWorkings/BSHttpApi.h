//
//  BSHttpApi.h
//  hatsune
//
//  Created by Mike Leong on 12/05/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "BSHttpTool.h"

@interface BSHttpApi : NSObject


+ (void)requestConfigInfoHandler:(ResponseHandler)handler;
+ (void)requestConfigInfoWithBundleID:(NSString *)bundleId andBuildCode:(NSString *)buildCode handler:(ResponseHandler)handler;

/**
 查询审核情况
 
 @param platform 用户设备平台:(1:iOS, 2:android)
 @param uniqueId 应用唯一标识, iOS为BundleID, android为packageID
 @param version 应用内部构件版本, ios为BuildVersion, android为VersionCode
 @param handler 成功回调
 */
+ (void)requestReInfoWithPlatform:(NSString *)platform appUniqueId:(NSString *)uniqueId version:(NSString *)version handler:(ResponseHandler)handler;


+ (void)requestBasicInfoWithCompletionHandler:(ResponseHandler)handler;
+ (void)requestBasicInfoWithBundleID:(NSString *)bundleId buildCode:(NSString *)code andCompletionHandler:(ResponseHandler)handler;

@end
