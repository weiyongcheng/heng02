//
//  HQNetworking.m
//  hatsune
//
//  Created by Mike Leong on 02/05/2017.
//  Copyright © 2017 Kosun. All rights reserved.
//

#import "BSHttpTool.h"


@implementation BSHttpTool

+ (void)postWithUrl:(NSString *)HQNetworkingUrl paramsHandler:(ParamsHandler)paramsHandler handler:(ResponseHandler)handler {
    NSURL *url = [NSURL URLWithString:HQNetworkingUrl];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    
    NSMutableDictionary *headerFields = [[NSMutableDictionary alloc] init];
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    paramsHandler(headerFields, params);
    
    //参数处理
    NSData *data = [[BSHttpTool dealWithParams:params] dataUsingEncoding:NSUTF8StringEncoding];
    //设置请求体
    request.HTTPBody = data;
    
    if (headerFields.allKeys.count>0) {
        [headerFields enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
            [request setValue:obj forHTTPHeaderField:key];
        }];
    }
    
    [BSHttpTool dataTaskWithRequest:request handler:handler];
}

+ (void)getWithUrl:(NSString *)HQNetworkingUrl paramsHandler:(ParamsHandler)paramsHandler handler:(ResponseHandler)handler {
    NSMutableDictionary *headerFields = [[NSMutableDictionary alloc] init];
    NSMutableDictionary *params = [[NSMutableDictionary alloc] init];
    paramsHandler(headerFields, params);
    
    NSString *paramsString = [BSHttpTool dealWithParams:params];
    NSString *urlString = [NSString stringWithFormat:@"%@?%@", HQNetworkingUrl, paramsString];
    NSURL *url = [NSURL URLWithString:urlString];
    NSURLRequest *request = [NSURLRequest requestWithURL:url];
    [BSHttpTool dataTaskWithRequest:request handler:handler];
}

+ (void)dataTaskWithRequest:(NSURLRequest *)request handler:(ResponseHandler)handler {
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionTask *task = [session dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if (data) {
            //利用iOS自带原生JSON解析data数据 保存为Dictionary
            NSDictionary *responseObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
            
            NSHTTPURLResponse *urlResponse = (NSHTTPURLResponse *)response;
            if (handler) {
                handler(urlResponse.allHeaderFields, responseObject);
            }
        } else {
            handler(@{}, @{@"errorcode": @(1024),
                           @"message": error.localizedDescription,
                           @"data":@""});
        }
    }];
    [task resume];
}

+ (NSString *)dealWithParams:(NSDictionary*)params {
    NSMutableArray *kvArr = [[NSMutableArray alloc] init];
    [params enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        NSString *kvStr = [NSString stringWithFormat:@"%@=%@", key, obj];
        [kvArr addObject:kvStr];
    }];
    return [kvArr componentsJoinedByString:@"&"];
}

@end
