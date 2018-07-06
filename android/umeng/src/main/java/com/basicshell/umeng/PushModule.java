package com.basicshell.umeng;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.umeng.message.MsgConstant;
import com.umeng.message.PushAgent;
import com.umeng.message.UTrack;
import com.umeng.message.common.UmengMessageDeviceConfig;
import com.umeng.message.common.inter.ITagManager;
import com.umeng.message.entity.UMessage;
import com.umeng.message.tag.TagManager;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class PushModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    protected static final String DidReceiveMessage = "DidReceiveMessage";
    protected static final String DidOpenMessage = "DidOpenMessage";

    //    private static Activity sActivity;
    private static Handler sSDKHandler = new Handler(Looper.getMainLooper());

    private final int SUCCESS = 200;
    private final int ERROR = 0;
    private final int CANCEL = -1;
    private ReactApplicationContext context;
    private UMengPushApplication application;
    private boolean isGameInited = false;
    private PushAgent pushAgent;

    public PushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        application = (UMengPushApplication) reactContext.getBaseContext();
        context.addLifecycleEventListener(this);
        pushAgent = PushAgent.getInstance(context);
    }

    public static void initPushSDK(Activity activity) {
//        sActivity = activity;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DidReceiveMessage, DidReceiveMessage);
        constants.put(DidOpenMessage, DidOpenMessage);
        return constants;
    }

    @Override
    public void onHostResume() {
        application.setPushModule(this);
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        application.setPushModule(null);
    }

    @Override
    public String getName() {
        return "UMPushModule";
    }

    private static void runOnMainThread(Runnable runnable) {
        sSDKHandler.postDelayed(runnable, 0);
    }

    @ReactMethod
    public void addTag(String tag, final Callback successCallback) {
        pushAgent.getTagManager().addTags(new TagManager.TCallBack() {
            @Override
            public void onMessage(final boolean isSuccess, final ITagManager.Result result) {


                if (isSuccess) {
                    successCallback.invoke(SUCCESS, result.remain);
                } else {
                    successCallback.invoke(ERROR, 0);
                }


            }
        }, tag);
    }

    @ReactMethod
    public void deleteTag(String tag, final Callback successCallback) {
        pushAgent.getTagManager().deleteTags(new TagManager.TCallBack() {
            @Override
            public void onMessage(boolean isSuccess, final ITagManager.Result result) {
                if (isSuccess) {
                    successCallback.invoke(SUCCESS, result.remain);
                } else {
                    successCallback.invoke(ERROR, 0);
                }
            }
        }, tag);
    }

    @ReactMethod
    public void listTag(final Callback successCallback) {
        pushAgent.getTagManager().getTags(new TagManager.TagListCallBack() {
            @Override
            public void onMessage(final boolean isSuccess, final List<String> result) {
                sSDKHandler.post(new Runnable() {
                    @Override
                    public void run() {
                        if (isSuccess) {
                            if (result != null) {

                                successCallback.invoke(SUCCESS, resultToList(result));
                            } else {
                                successCallback.invoke(ERROR, resultToList(result));
                            }
                        } else {
                            successCallback.invoke(ERROR, resultToList(result));
                        }

                    }
                });

            }
        });
    }

    @ReactMethod
    public void addAlias(String alias, String aliasType, final Callback successCallback) {
        pushAgent.addAlias(alias, aliasType, new UTrack.ICallBack() {
            @Override
            public void onMessage(final boolean isSuccess, final String message) {
                if (isSuccess) {
                    successCallback.invoke(SUCCESS);
                } else {
                    successCallback.invoke(ERROR);
                }


            }
        });
    }

    @ReactMethod
    public void addAliasType() {
//        Toast.makeText(sActivity, "function will come soon", Toast.LENGTH_LONG);
    }

    @ReactMethod
    public void addExclusiveAlias(String exclusiveAlias, String aliasType, final Callback successCallback) {
        pushAgent.setAlias(exclusiveAlias, aliasType, new UTrack.ICallBack() {
            @Override
            public void onMessage(final boolean isSuccess, final String message) {
                if (Boolean.TRUE.equals(isSuccess)) {
                    successCallback.invoke(SUCCESS);
                } else {
                    successCallback.invoke(ERROR);
                }


            }
        });
    }

    @ReactMethod
    public void deleteAlias(String alias, String aliasType, final Callback successCallback) {
        pushAgent.deleteAlias(alias, aliasType, new UTrack.ICallBack() {
            @Override
            public void onMessage(boolean isSuccess, String s) {
                if (Boolean.TRUE.equals(isSuccess)) {
                    successCallback.invoke(SUCCESS);
                } else {
                    successCallback.invoke(ERROR);
                }
            }
        });
    }

    @ReactMethod
    public void appInfo(final Callback successCallback) {
        String pkgName = context.getPackageName();
        String info = String.format("DeviceToken:%s\n" + "SdkVersion:%s\nAppVersionCode:%s\nAppVersionName:%s",
                pushAgent.getRegistrationId(), MsgConstant.SDK_VERSION,
                UmengMessageDeviceConfig.getAppVersionCode(context), UmengMessageDeviceConfig.getAppVersionName(context));
        successCallback.invoke("应用包名:" + pkgName + "\n" + info);
    }

    @ReactMethod
    public void getDeviceToken(Callback callback) {
        String registrationId = pushAgent.getRegistrationId();
        callback.invoke(TextUtils.isEmpty(registrationId) ? application.registrationId : registrationId);
    }

    private WritableMap resultToMap(ITagManager.Result result) {
        WritableMap map = Arguments.createMap();
        if (result != null) {
            map.putString("status", result.status);
            map.putInt("remain", result.remain);
            map.putString("interval", result.interval + "");
            map.putString("errors", result.errors);
            map.putString("last_requestTime", result.last_requestTime + "");
            map.putString("jsonString", result.jsonString);
        }
        return map;
    }

    private WritableArray resultToList(List<String> result) {
        WritableArray list = Arguments.createArray();
        if (result != null) {
            for (String key : result) {
                list.pushString(key);
            }
        }
        return list;
    }


    protected void sendEvent(String eventName, UMessage msg) {
        sendEvent(eventName, convertToWriteMap(msg));
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        if (context.hasActiveCatalystInstance()) {
            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } else {
            Log.i(getClass().getSimpleName(), "Don't have active CatalystInstance !");
        }
    }

    private WritableMap convertToWriteMap(UMessage msg) {
        WritableMap writableMap = Arguments.createMap();
        JSONObject jsonObject = msg.getRaw();
        Iterator<String> keys = jsonObject.keys();
        String key;
        while (keys.hasNext()) {
            key = keys.next();
            try {
                writableMap.putString(key, jsonObject.get(key).toString());
            } catch (Exception e) {
                Log.e(getClass().getSimpleName(), "UMeng convert to write map failed: " + e.getMessage());
            }
        }
        return writableMap;
    }
}