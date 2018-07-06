package com.basicshell.activities;

import android.os.Bundle;

import com.basicshell.BuildConfig;
import com.basicshell.R;
import com.basicshell.module.splash.SplashScreen;
import com.facebook.react.ReactActivity;

import java.util.Timer;
import java.util.TimerTask;

public class ActivityNativeRN extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (savedInstanceState == null && !SplashScreen.hasLaunched) {
            SplashScreen.show(this, R.mipmap.splash_screen);

            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    SplashScreen.hide(ActivityNativeRN.this);
                }
            }, 2000);
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return BuildConfig.SHELL_RN_COMPONENT_NAME;
    }

    public void onResume() {
        super.onResume();
    }

    public void onPause() {
        super.onPause();
    }
}
