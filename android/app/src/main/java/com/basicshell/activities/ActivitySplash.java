package com.basicshell.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;

import com.basicshell.Constants;
import com.basicshell.MainApplication;
import com.basicshell.entity.AppConfiguration;

public class ActivitySplash extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        showReactNativeControllerIfInNeed();
        finish();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    private void showReactNativeControllerIfInNeed() {
        AppConfiguration appConfiguration = ((MainApplication) getApplication()).getAppConfiguration();

        // 根据缓存来展示RN内容
        int activityIndexer = MainApplication.getActivityIndexer(appConfiguration);
        if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_MAIN_RN) {
            // 显示过审之后 RN 页面
            startActivity(new Intent(this, ActivityMainRN.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_MAIN_WEB) {
            // 显示过审之后 WEB 页面
            startActivity(new Intent(this, ActivityMainWeb.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_NATIVE_RN) {
            // 显示原生过审 RN 页面
            startActivity(new Intent(this, ActivityNativeRN.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_NATIVE_WEB) {
            // 显示原生过审 web 页面
            startActivity(new Intent(this, ActivityMainWeb.class));
        } else {
            // 显示原生页面
            startActivity(new Intent(this, ActivityNative.class));
        }
    }
}