package com.basicshell.module.splash;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 自定义的一个启动页，用来在加载JSBundle的时候显示静态图片
 */

public class SplashScreenModule extends ReactContextBaseJavaModule {
    SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }

    /**
     * 关闭启动屏
     */
    @ReactMethod
    public void hide() {
        SplashScreen.hide(getCurrentActivity());
        SplashScreen.hasLaunched = true;
    }
}
