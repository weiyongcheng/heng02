//
//  ReactNativeViewController.m
//  hatsune
//
//  Created by Mike on 09/11/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "BSRNController.h"
#import "CodePush.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "AppConfigurationModule.h"

@interface BSRNController ()

@end

@implementation BSRNController

- (void)loadView {
    [super loadView];
    
    if (self.moduleName.length<1) {
        return;
    }
    
    NSURL *jsCodeLocation;
    
    CodePushConfig *config = [CodePushConfig current];
    
    config.appVersion    = self.appVersion;
    if (self.codePushServerUrl.length>0) {
        config.serverURL     = self.codePushServerUrl;
    }
    config.deploymentKey = self.codePushKey;
    
//#if (TARGET_OS_SIMULATOR)
//    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//#else
    if (self.codePushKey.length>0) {
        jsCodeLocation = [CodePush bundleURL];
    } else {
        jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
    }
//#endif
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:self.moduleName
                                                 initialProperties:nil
                                                     launchOptions:self.launchOptions];
    rootView.backgroundColor = [UIColor whiteColor];
    self.view = rootView;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    AppConfigurationModule *module = [AppConfigurationModule sharedInstance];
    if (module.orientation == 1) {
        return UIInterfaceOrientationMaskPortrait;
    } else {
        return UIInterfaceOrientationMaskLandscape;
    }
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
