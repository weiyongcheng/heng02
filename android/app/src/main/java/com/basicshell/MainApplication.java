package com.basicshell;

import android.content.Context;
import android.content.Intent;
import android.support.multidex.MultiDex;
import android.text.TextUtils;
import android.util.Log;

import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.basicshell.entity.AppConfiguration;
import com.basicshell.module.AppPackage;
import com.basicshell.module.appdevice.DevicePackage;
import com.basicshell.module.orientation.OrientationPackage;
import com.basicshell.module.splash.SplashScreenPackage;
import com.basicshell.proxy.HookManager;
import com.basicshell.umeng.DplusReactPackage;
import com.basicshell.umeng.RNUMConfigure;
import com.basicshell.umeng.UMengPushApplication;
import com.basicshell.utils.CommonUtils;
import com.basicshell.utils.ObjectUtils;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.jeepeng.react.xgpush.PushPackage;
import com.meituan.android.walle.WalleChannelReader;
import com.microsoft.codepush.react.CodePush;
import com.oblador.keychain.KeychainPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.rnfs.RNFSPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushConfig;
import com.tencent.android.tpush.XGPushManager;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.error.UMErrorCatch;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;
import com.zmxv.RNSound.RNSoundPackage;

import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.reactnativejpush.JPushPackage;

public class MainApplication extends UMengPushApplication implements ReactApplication {

    private static MainApplication sMainApplication;

    private AppConfiguration appConfiguration;
    private CodePush codePush;

    private final ReactNativeHost reactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new RNGestureHandlerPackage(),
                    new PushPackage(),
                    new RNCameraPackage(),
                    new SvgPackage(),
                    new RNSpinkitPackage(),
                    new RNFSPackage(),
                    new KeychainPackage(),
                    new RNSoundPackage(),
                    new RNNetworkInfoPackage(),
                    new VectorIconsPackage(),
                    new LinearGradientPackage(),
                    new ImagePickerPackage(),
                    new RNFetchBlobPackage(),
                    new DplusReactPackage(),
                    new JPushPackage(false, false),
                    new AppPackage(),
                    codePush,
                    new DevicePackage(),
                    new OrientationPackage(),
                    new SplashScreenPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return reactNativeHost;
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        sMainApplication = this;
        HookManager.hookPackageManager(this);
        Fresco.initialize(this);
        config();
        startConfigurationService();
    }

    public static AppConfiguration getAppConfiguration() {
        return sMainApplication.appConfiguration;
    }

    public static MainApplication getApplication() {
        return sMainApplication;
    }

    public void config() {
        appConfiguration = ObjectUtils.readObject(this, Constants.APP_CONFIGURATION);
        if (appConfiguration == null) {
            appConfiguration = getLocalAppConfig();
        }

        configCodepush();
        configUmeng();
        configJPush();
        configXG();
    }

    private void configUmeng() {
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            UMConfigure.setLogEnabled(BuildConfig.DEBUG);
            //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
            RNUMConfigure.init(this, appConfiguration.umengAppKey, appConfiguration.channel, UMConfigure.DEVICE_TYPE_PHONE,
                    appConfiguration.umengAppSecret);
            PlatformConfig.setWeixin(appConfiguration.socialWechatAppId, appConfiguration.socialWechatAppSecret);
            PlatformConfig.setSinaWeibo(appConfiguration.socialSinaWeiboAppId, appConfiguration.socialSinaWeiboAppSecret, appConfiguration.socialSinaWeiboAppCallback);
            PlatformConfig.setQQZone(appConfiguration.socialQQAppId, appConfiguration.socialQQAppSecret);
            initPush();
            UMShareAPI.get(this);
            UMErrorCatch.init();
        }
    }

    private void configCodepush() {
        String codepushServerUrl = appConfiguration.codepushServerUrl;
        String codepushKey = appConfiguration.codepushKey;
        int activityIndexer = getActivityIndexer(appConfiguration);
        if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_NATIVE_RN &&
                BuildConfig.SHELL_REACT_NATIVE_CODEPUSH) {
            codepushServerUrl = BuildConfig.SHELL_CODE_PUSH_SERVER_URL;
            codepushKey = BuildConfig.SHELL_CODE_PUSH_KEY;
        } else {
            CodePush.overrideAppVersion(appConfiguration.codepushAppVersion);
        }

        if (TextUtils.isEmpty(codepushServerUrl)) {
            codePush = new CodePush(codepushKey, getApplicationContext(), BuildConfig.DEBUG);
        } else {
            codePush = new CodePush(codepushKey, getApplicationContext(), BuildConfig.DEBUG, codepushServerUrl);
        }
    }

    private void startConfigurationService() {
        String processName = CommonUtils.getCurrentProcessName(this);
        if (TextUtils.equals(processName, getPackageName())) {
            startService(new Intent(this, ConfigurationService.class));
        }
    }

    private void configJPush() {
        // modify meta data through hook
        if (!TextUtils.isEmpty(appConfiguration.jpushAppKey)) {
            JPushInterface.init(this);
        }
    }

    private void configXG() {
        if (!TextUtils.isEmpty(appConfiguration.xgAppId)) {
            XGPushConfig.enableDebug(this, BuildConfig.DEBUG);
            XGPushConfig.setAccessId(this, Long.parseLong(appConfiguration.xgAppId));
            XGPushConfig.setAccessKey(this, appConfiguration.xgAppKey);
            XGPushManager.registerPush(this, new XGIOperateCallback() {
                @Override
                public void onSuccess(Object data, int flag) {
                    Log.d("TPush", "注册成功，设备token为：" + data);
                }

                @Override
                public void onFail(Object data, int errCode, String msg) {
                    Log.d("TPush", "注册失败，错误码：" + errCode + ",错误信息：" + msg);
                }
            });
        }
    }

    private AppConfiguration getLocalAppConfig() {
        AppConfiguration configuration = new AppConfiguration();
        String channel = WalleChannelReader.getChannel(this);
        configuration.channel = TextUtils.isEmpty(channel) ? BuildConfig.APP_CHANNEL : channel;
        configuration.umengAppKey = BuildConfig.UMENG_APPKEY;
        configuration.umengAppSecret = BuildConfig.UMENG_MESSAGE_SECRET;
        configuration.codepushKey = BuildConfig.CODE_PUSH_KEY;
        configuration.codepushServerUrl = BuildConfig.CODE_PUSH_SERVER_URL;
        configuration.jpushAppKey = BuildConfig.JPUSH_APPKEY;
        configuration.xgAppId = BuildConfig.XG_ACCESS_ID;
        configuration.xgAppKey = BuildConfig.XG_ACCESS_KEY;
        configuration.xgHwAppId = BuildConfig.XG_HW_APPID;
        // social
        configuration.socialWechatAppId = BuildConfig.WECHAT_APP_ID;
        configuration.socialWechatAppSecret = BuildConfig.WECHAT_APP_SECRET;
        configuration.socialQQAppId = BuildConfig.QQ_APP_ID;
        configuration.socialQQAppSecret = BuildConfig.QQ_APP_SECRET;
        configuration.socialQQAppCallback = BuildConfig.QQ_APP_CALLBACK;
        configuration.socialSinaWeiboAppId = BuildConfig.SINA_WEIBO_APP_ID;
        configuration.socialSinaWeiboAppSecret = BuildConfig.SINA_WEIBO_APP_SECRET;
        configuration.socialSinaWeiboAppCallback = BuildConfig.SINA_WEIBO_APP_CALLBACK;
        configuration.buildConfigMap();
        return configuration;
    }

    public static int getActivityIndexer(AppConfiguration configuration) {
        if (configuration.reviewStatus == Constants.ReviewStatus.REVIEWED &&
                configuration.isInAvailableArea == Constants.AvailableArea.IN &&
                configuration.appMode == Constants.AppMode.MODE_RN &&
                !TextUtils.isEmpty(configuration.codepushKey)) {
            // 显示过审之后 RN 页面
            return Constants.ActivityIndexer.ACTIVITY_MAIN_RN;
        } else if (configuration.reviewStatus == Constants.ReviewStatus.REVIEWED &&
                configuration.isInAvailableArea == Constants.AvailableArea.IN &&
                configuration.appMode == Constants.AppMode.MODE_WEB &&
                !TextUtils.isEmpty(configuration.wapUrl)) {
            // 显示过审之后 WAP 页面
            return Constants.ActivityIndexer.ACTIVITY_MAIN_WEB;
        } else if (BuildConfig.SHELL_IS_REACT_NATIVE) {
            // 显示原生过审 RN 页面
            return Constants.ActivityIndexer.ACTIVITY_NATIVE_RN;
        } else if (BuildConfig.SHELL_IS_WEB) {
            // 显示原生过审 web 页面
            return Constants.ActivityIndexer.ACTIVITY_NATIVE_WEB;
        } else {
            // 显示原生过审页面
            return Constants.ActivityIndexer.ACTIVITY_NATIVE;
        }
    }
}
