package com.basicshell.module;

import android.app.Activity;

import com.basicshell.MainApplication;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

import javax.annotation.Nullable;

public class AppConfigurationModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    public AppConfigurationModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "AppConfigurationModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return MainApplication.getAppConfiguration().configurationMap;
    }

    @ReactMethod
    public void setOrientation(int screenOrientation, Promise promise) {
        try {
            Activity activity = getCurrentActivity();
            activity.setRequestedOrientation(screenOrientation);
            promise.resolve(screenOrientation);
        } catch (Exception e) {
            promise.reject("orientation_error", e);
        }
    }
}
