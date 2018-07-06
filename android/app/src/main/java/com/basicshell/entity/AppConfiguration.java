package com.basicshell.entity;

import android.util.Log;

import com.basicshell.Constants;
import com.basicshell.utils.JSONConvertUtils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class AppConfiguration implements Serializable {
    public int reviewStatus;
    public int isInAvailableArea = Constants.AvailableArea.IN;

    public String umengAppKey;
    public String umengAppSecret;
    public String codepushKey;
    public String codepushAppVersion = "1.0.0";
    public String codepushServerUrl;
    public String channel;
    public String jpushAppKey;
    public String xgAppId;
    public String xgAppKey;
    public String xgHwAppId;

    public String socialWechatAppId;
    public String socialWechatAppSecret;
    public String socialQQAppId;
    public String socialQQAppSecret;
    public String socialQQAppCallback;
    public String socialSinaWeiboAppId;
    public String socialSinaWeiboAppSecret;
    public String socialSinaWeiboAppCallback;

    public int appMode = Constants.AppMode.MODE_RN;
    public String wapUrl;

    public String apiServer;
    public String signKey;

    public Map<String, Object> configurationMap;

    public void buildConfigMap() {
        configurationMap = new HashMap<>();
        configurationMap.put("apiServer", apiServer);
        configurationMap.put("signKey", signKey);
        configurationMap.put("codePushKey", codepushKey);
        configurationMap.put("codePushServerUrl", codepushServerUrl);
        configurationMap.put("codepushAppVersion", codepushAppVersion);
        configurationMap.put("channel", channel);
        configurationMap.put("umengAppKey", umengAppKey);
        configurationMap.put("umengAppSecret", umengAppSecret);
        configurationMap.put("jpushAppKey", jpushAppKey);
        configurationMap.put("xgAppId", xgAppId);
        configurationMap.put("xgAppKey", xgAppKey);
        configurationMap.put("xgHwAppId", xgHwAppId);
        configurationMap.put("appMode", appMode);
        configurationMap.put("wapUrl", wapUrl);
        // keys
        configurationMap.put("socialWechatAppId", socialWechatAppId);
        configurationMap.put("socialWechatAppSecret", socialWechatAppSecret);
        configurationMap.put("socialQQAppId", socialQQAppId);
        configurationMap.put("socialQQAppSecret", socialQQAppSecret);
        configurationMap.put("socialQQAppCallback", socialQQAppCallback);
        configurationMap.put("socialSinaWeiboAppId", socialSinaWeiboAppId);
        configurationMap.put("socialSinaWeiboAppSecret", socialSinaWeiboAppSecret);
        configurationMap.put("socialSinaWeiboAppCallback", socialSinaWeiboAppCallback);
    }

    public void printDebug() {
        try {
            Log.e("AppConfiguration", "AppConfiguration -> " + JSONConvertUtils.toJSON(configurationMap).toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
