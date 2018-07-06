//
//  CentralControlUnit.h
//  BasicShell
//
//  Created by Mike on 11/06/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface CentralControlUnit : NSObject

+ (instancetype)sharedInstance;
- (void)displayNativeController:(UIViewController *(^)(void))controller beforeDate:(NSString *)date withLaunchOptions:(NSDictionary *)options;
@property (nonatomic, strong) NSDictionary *launchOptions;

@end
