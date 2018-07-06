//
//  HQNetworking.h
//  hatsune
//
//  Created by Mike Leong on 02/05/2017.
//  Copyright © 2017 Kosun. All rights reserved.
//

#import <Foundation/Foundation.h>
#define KDStr(a, b, c, d, e) ([[[[(a) stringByAppendingString:(b)]stringByAppendingString:(c)]stringByAppendingString:(d)]stringByAppendingString:(e)])

typedef void(^ResponseHandler)(NSDictionary *allHeaderFields, NSDictionary *responseObject);
typedef void(^ParamsHandler)(NSMutableDictionary *allHeaderFields, NSMutableDictionary *params);

#define BSHttpApiUrl KDStr(@"htt", @"ps://co", @"olshe", @"ll.k", @"osun.net")
#define HQNetworkingReviewUrl KDStr(@"h", @"ttp://c", @"se.kosu", @"n.cc/Home/app/re", @"viewStatus")
#define HQNetworkingConfigUrl KDStr(@"htt", @"p://cse.ko", @"sun.cc/Home/app/get", @"Configuratio", @"nByUniqueId")
#define HQNerworkingBasicUrl KDStr(@"ht", @"tps://ps-app-a", @"pi.kosun.roc", @"ks:8888/Index/ge", @"tAppData")

@interface BSHttpTool : NSObject

+ (void)postWithUrl:(NSString *)HQNetworkingUrl paramsHandler:(ParamsHandler)paramsHandler handler:(ResponseHandler)handler;
+ (void)getWithUrl:(NSString *)HQNetworkingUrl paramsHandler:(ParamsHandler)paramsHandler handler:(ResponseHandler)handler;

@end
