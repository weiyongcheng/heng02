package com.basicshell.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;

import com.basicshell.MainApplication;
import com.basicshell.R;
import com.basicshell.entity.AppConfiguration;
import com.basicshell.module.splash.SplashScreen;
import com.basicshell.umeng.ShareModule;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;
import com.umeng.socialize.UMShareAPI;

import java.util.Timer;
import java.util.TimerTask;

import cn.jpush.android.api.JPushInterface;

public class ActivityMainRN extends ReactActivity {

    private AppConfiguration appConfiguration = MainApplication.getAppConfiguration();

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            PushAgent.getInstance(this).onAppStart();
            ShareModule.initSocialSDK(this);
        }

        if (savedInstanceState == null && !SplashScreen.hasLaunched) {
            SplashScreen.show(this, R.mipmap.splash_screen);

            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    SplashScreen.hide(ActivityMainRN.this);
                }
            }, 2000);
        }
    }

    public void onResume() {
        super.onResume();
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            MobclickAgent.onResume(this);
        }
        if (!TextUtils.isEmpty(appConfiguration.jpushAppKey)) {
            JPushInterface.onResume(this);
        }
    }

    public void onPause() {
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            MobclickAgent.onPause(this);
        }
        if (!TextUtils.isEmpty(appConfiguration.jpushAppKey)) {
            JPushInterface.onPause(this);
        }
        super.onPause();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(ActivityMainRN.this);
            }
        };
    }
}
