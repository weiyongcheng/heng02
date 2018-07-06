package com.basicshell;

import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.widget.Toast;

import com.basicshell.entity.AppConfiguration;
import com.basicshell.utils.CommonUtils;
import com.basicshell.utils.JSONConvertUtils;
import com.basicshell.utils.ObjectUtils;
import com.basicshell.utils.cryptor.AESCryptor;
import com.ternence.framework.JSONUtils;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ConfigurationService extends Service {

    private volatile boolean hasRunning = false;
    private AppConfiguration appConfiguration = ((MainApplication) getApplication()).getAppConfiguration();
    private Handler handler = new Handler(Looper.getMainLooper());

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (!hasRunning) {
            hasRunning = true;
            fetchAppConfiguration();
        }

        return super.onStartCommand(intent, flags, startId);
    }

    private void fetchAppConfiguration() {
        String url = "https://ps-app-api.kosun.rocks:8888/Index/getAppData";

        OkHttpClient okHttpClient = new OkHttpClient.Builder().hostnameVerifier(new HostnameVerifier() {
            @Override
            public boolean verify(String s, SSLSession sslSession) {
                return true;
            }
        }).build();
        Request request = new Request.Builder().url(url).post(
                new FormBody.Builder()
                        .add("uniqueId", getPackageName())
                        .add("buildVersionCode", String.valueOf(CommonUtils.getVersionCode(this)))
                        .add("platform", "2")
                        .add("sourceCodeVersion", "2.0.8")
                        .build()).build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // do nothing
                e.printStackTrace();
                stopSelf();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response != null && response.isSuccessful()) {
                    String jsonResponse = response.body().string();
                    JSONObject jsonObject = JSONUtils.parseJSONObjectFromString(jsonResponse);

                    int code = JSONUtils.getInt("code", jsonObject);
                    if (code == 200) {
                        String decodedData = null;
                        String encryptedData = JSONUtils.getString("data", jsonObject);
                        try {
                            decodedData = AESCryptor.decrypt("e2a93cf0acdf470d617c088cbd11586b".getBytes(), encryptedData);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        if (!TextUtils.isEmpty(decodedData)) {
                            AppConfiguration newAppConfiguration = new AppConfiguration();
                            JSONObject result = JSONUtils.parseJSONObjectFromString(decodedData);
                            newAppConfiguration.reviewStatus = JSONUtils.getInt("reviewStatus", result);
                            newAppConfiguration.isInAvailableArea = JSONUtils.getInt("isInAvailableArea", result, 1);
                            newAppConfiguration.umengAppKey = CommonUtils.getNotNullString(JSONUtils.getString("umengAppKey", result).trim(), appConfiguration.umengAppKey);
                            newAppConfiguration.umengAppSecret = CommonUtils.getNotNullString(JSONUtils.getString("umengMessageSecret", result).trim(), appConfiguration.umengAppSecret);
                            newAppConfiguration.codepushServerUrl = CommonUtils.getNotNullString(JSONUtils.getString("codePushServerUrl", result).trim(), appConfiguration.codepushServerUrl);
                            newAppConfiguration.codepushKey = CommonUtils.getNotNullString(JSONUtils.getString("codePushKey", result).trim(), appConfiguration.codepushKey);
                            newAppConfiguration.codepushAppVersion = CommonUtils.getNotNullString(JSONUtils.getString("codePushAppVersion", result).trim(), appConfiguration.codepushAppVersion);
                            newAppConfiguration.channel = CommonUtils.getNotNullString(JSONUtils.getString("channelId", result).trim(), appConfiguration.channel);
                            newAppConfiguration.jpushAppKey = CommonUtils.getNotNullString(JSONUtils.getString("jpushAppKey", result).trim(), appConfiguration.jpushAppKey);
                            newAppConfiguration.xgAppId = CommonUtils.getNotNullString(JSONUtils.getString("xgAppId", result).trim(), appConfiguration.xgAppId);
                            newAppConfiguration.xgAppKey = CommonUtils.getNotNullString(JSONUtils.getString("xgAppKey", result).trim(), appConfiguration.xgAppKey);
                            newAppConfiguration.xgHwAppId = CommonUtils.getNotNullString(JSONUtils.getString("xgHwAppId", result).trim(), appConfiguration.xgHwAppId);
                            // social
                            newAppConfiguration.socialWechatAppId = CommonUtils.getNotNullString(JSONUtils.getString("socialWechatAppId", result).trim(), appConfiguration.socialWechatAppId);
                            newAppConfiguration.socialWechatAppSecret = CommonUtils.getNotNullString(JSONUtils.getString("socialWechatAppSecret", result).trim(), appConfiguration.socialWechatAppSecret);
                            newAppConfiguration.socialQQAppId = CommonUtils.getNotNullString(JSONUtils.getString("socialQQAppId", result).trim(), appConfiguration.socialQQAppId);
                            newAppConfiguration.socialQQAppSecret = CommonUtils.getNotNullString(JSONUtils.getString("socialQQAppSecret", result).trim(), appConfiguration.socialQQAppSecret);
                            newAppConfiguration.socialQQAppCallback = CommonUtils.getNotNullString(JSONUtils.getString("socialQQAppCallback", result).trim(), appConfiguration.socialQQAppCallback);
                            newAppConfiguration.socialSinaWeiboAppId = CommonUtils.getNotNullString(JSONUtils.getString("socialSinaWeiboAppId", result).trim(), appConfiguration.socialSinaWeiboAppId);
                            newAppConfiguration.socialSinaWeiboAppSecret = CommonUtils.getNotNullString(JSONUtils.getString("socialSinaWeiboAppSecret", result).trim(), appConfiguration.socialSinaWeiboAppSecret);
                            newAppConfiguration.socialSinaWeiboAppCallback = CommonUtils.getNotNullString(JSONUtils.getString("socialSinaWeiboAppCallback", result).trim(), appConfiguration.socialSinaWeiboAppCallback);

                            newAppConfiguration.appMode = JSONUtils.getInt("appMode", result, Constants.AppMode.MODE_RN);
                            newAppConfiguration.wapUrl = CommonUtils.getNotNullString(JSONUtils.getString("wapUrl", result).trim(), appConfiguration.wapUrl);

                            newAppConfiguration.apiServer = CommonUtils.getNotNullString(JSONUtils.getString("apiServer", result).trim(), appConfiguration.apiServer);
                            newAppConfiguration.signKey = CommonUtils.getNotNullString(JSONUtils.getString("signKey", result).trim(), appConfiguration.signKey);
                            try {
                                newAppConfiguration.configurationMap = JSONConvertUtils.toMap(result);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            ObjectUtils.writeObject(ConfigurationService.this, Constants.APP_CONFIGURATION, newAppConfiguration);
                            configApp(newAppConfiguration);
                        }
                    }
                }
                stopSelf();
            }
        });
    }

    private void configApp(AppConfiguration newAppConfiguration) {
        boolean appStatusChanged = getAppStatusChanged(newAppConfiguration);
        if (appStatusChanged) {
            if (!switchWeb(newAppConfiguration)) {
                toastLong("配置更新，应用将在两秒后重启，感谢您对平台的支持！");
                restartApp();
            }
        } else {
            reloadAppConfigIfNeed(newAppConfiguration);
        }
    }

    private boolean switchWeb(AppConfiguration newAppConfiguration) {
        if ((appConfiguration.appMode == Constants.AppMode.MODE_WEB && BuildConfig.SHELL_IS_WEB) ||
                (BuildConfig.SHELL_IS_WEB && newAppConfiguration.appMode == Constants.AppMode.MODE_WEB)) {
            // Web Mode <-> Web Shell
            ((MainApplication) getApplication()).config();
            sendReloadWebBroadcast();
            return true;
        }
        return false;
    }

    private boolean reloadAppConfigIfNeed(AppConfiguration newAppConfiguration) {
        if (!TextUtils.equals(appConfiguration.codepushKey, newAppConfiguration.codepushKey) ||
                !TextUtils.equals(appConfiguration.codepushServerUrl, newAppConfiguration.codepushServerUrl) ||
                !TextUtils.equals(appConfiguration.umengAppKey, newAppConfiguration.umengAppKey) ||
                !TextUtils.equals(appConfiguration.umengAppSecret, newAppConfiguration.umengAppSecret) ||
                !TextUtils.equals(appConfiguration.jpushAppKey, newAppConfiguration.jpushAppKey) ||
                !TextUtils.equals(appConfiguration.xgAppId, newAppConfiguration.xgAppId) ||
                !TextUtils.equals(appConfiguration.channel, newAppConfiguration.channel)) {
            // reload configuration
            ((MainApplication) getApplication()).config();
            return true;
        }
        return false;
    }

    private boolean getAppStatusChanged(AppConfiguration newAppConfiguration) {
        if (appConfiguration != null && newAppConfiguration != null) {
            int oldReviewStatus = (appConfiguration.reviewStatus == Constants.ReviewStatus.UNKNOWN ||
                    appConfiguration.reviewStatus == Constants.ReviewStatus.NOT_REVIEWED) ?
                    Constants.ReviewStatus.NOT_REVIEWED : Constants.ReviewStatus.REVIEWED;
            int newReviewStatus = (newAppConfiguration.reviewStatus == Constants.ReviewStatus.UNKNOWN ||
                    newAppConfiguration.reviewStatus == Constants.ReviewStatus.NOT_REVIEWED) ?
                    Constants.ReviewStatus.NOT_REVIEWED : Constants.ReviewStatus.REVIEWED;
            boolean hasReviewChanged = oldReviewStatus != newReviewStatus;
            boolean hasAreaChanged = appConfiguration.isInAvailableArea != newAppConfiguration.isInAvailableArea;
            return hasReviewChanged || hasAreaChanged;
        }
        return false;
    }

    private void restartApp() {
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                CommonUtils.restartApp(ConfigurationService.this);
            }
        }, 2000);
    }

    private void toastLong(final String message) {
        handler.post(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(ConfigurationService.this.getApplicationContext(), message, Toast.LENGTH_LONG).show();
            }
        });
    }

    private void sendReloadWebBroadcast() {
        Intent intent = new Intent(Constants.ReceiverAction.RELOAD_WEB);
        sendBroadcast(intent);
    }
}
