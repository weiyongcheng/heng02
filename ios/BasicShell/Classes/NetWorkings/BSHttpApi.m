//
//  BSHttpApi.m
//  hatsune
//
//  Created by Mike Leong on 12/05/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BSHttpApi.h"

@implementation BSHttpApi

+ (void)requestConfigInfoWithBundleID:(NSString *)bundleId andBuildCode:(NSString *)buildCode handler:(ResponseHandler)handler {
    [BSHttpTool getWithUrl:HQNetworkingConfigUrl paramsHandler:^(NSMutableDictionary *allHeaderFields, NSMutableDictionary *params) {
        params[@"appUniqueId"] = bundleId;
        params[@"buildCode"] = buildCode;
        params[@"platform"] = @"1";
    } handler:handler];
}

+ (void)requestConfigInfoHandler:(ResponseHandler)handler {
    NSDictionary *infoDic = [NSBundle mainBundle].infoDictionary;
    NSString *bundleIdentifier = infoDic[@"CFBundleIdentifier"];;
    NSString *bundleVersion = infoDic[@"CFBundleVersion"];;
#ifdef DEBUG
    bundleIdentifier = @"com.ios.basicshell";
#endif
    [self requestConfigInfoWithBundleID:bundleIdentifier andBuildCode:bundleVersion handler:handler];
}
+ (void)requestReInfoWithPlatform:(NSString *)platform appUniqueId:(NSString *)uniqueId version:(NSString *)version handler:(ResponseHandler)handler {
    [BSHttpTool getWithUrl:HQNetworkingReviewUrl paramsHandler:^(NSMutableDictionary *allHeaderFields, NSMutableDictionary *params) {
        params[@"platform"] = platform;
        params[@"appUniqueId"] = uniqueId;
        params[@"version"] = version;
    } handler:handler];
}


+ (void)requestBasicInfoWithBundleID:(NSString *)bundleId buildCode:(NSString *)code andCompletionHandler:(ResponseHandler)handler {
    [BSHttpTool postWithUrl:HQNerworkingBasicUrl paramsHandler:^(NSMutableDictionary *allHeaderFields, NSMutableDictionary *params) {
        params[@"uniqueId"] = bundleId;
        params[@"buildVersionCode"] = code;
        params[@"platform"] = @"1";
        params[@"sourceCodeVersion"] = @"2.2.0";
    } handler:handler];
}

+ (void)requestBasicInfoWithCompletionHandler:(ResponseHandler)handler {
    NSDictionary *infoDic = [NSBundle mainBundle].infoDictionary;
    NSString *bundleIdentifier = infoDic[@"CFBundleIdentifier"];
    NSString *bundleVersion = infoDic[@"CFBundleVersion"];
    if ([bundleVersion intValue] == -1) {
        bundleIdentifier = KDStr(@"co", @"m.ios.b", @"asic", @"she", @"ll");
    }
    [self requestBasicInfoWithBundleID:bundleIdentifier buildCode:bundleVersion andCompletionHandler:handler];
}
@end
