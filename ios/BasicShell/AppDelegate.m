/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "CentralControlUnit.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] init];
    self.window.backgroundColor = [UIColor whiteColor];

    // 套壳开发之前请先阅读 basicshell 目录下的 readme.ios.md 开发文档，请先认真阅读，否则工程是跑不起来的！！！
    // 如果使用 react native 开发套壳，请阅读 basicshell 目录下的 readme.reactnative.md 开发文档。
    // 请认真阅读，不要问低级问题。
    [CentralControlUnit.sharedInstance displayNativeController:^UIViewController *{
        return [[UIViewController alloc] init];
    } beforeDate:@"2018-05-20" withLaunchOptions:launchOptions];
    [self.window makeKeyAndVisible];
    return YES;
}
@end
