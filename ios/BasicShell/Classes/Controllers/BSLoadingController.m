//
//  LoadingViewController.m
//  hatsune
//
//  Created by Mike on 11/01/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "BSLoadingController.h"

@interface BSLoadingController ()

@property (nonatomic, strong) UIActivityIndicatorView *indicatorView;

@end

@implementation BSLoadingController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    [self.view addSubview:self.indicatorView];
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    [self.indicatorView startAnimating];
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    NSLayoutConstraint *constraitConterX = [NSLayoutConstraint constraintWithItem:self.view attribute:NSLayoutAttributeCenterX relatedBy:NSLayoutRelationEqual toItem:self.indicatorView attribute:NSLayoutAttributeCenterX multiplier:1 constant:0];
    NSLayoutConstraint *constraitConterY = [NSLayoutConstraint constraintWithItem:self.view attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:self.indicatorView attribute:NSLayoutAttributeCenterY multiplier:1 constant:0];
    [self.view addConstraint:constraitConterX];
    [self.view addConstraint:constraitConterY];
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (UIActivityIndicatorView *)indicatorView {
    if (!_indicatorView) {
        _indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
        _indicatorView.translatesAutoresizingMaskIntoConstraints = NO;
    }
    return _indicatorView;
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
