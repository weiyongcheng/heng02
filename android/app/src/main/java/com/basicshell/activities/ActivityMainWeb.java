package com.basicshell.activities;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.basicshell.BuildConfig;
import com.basicshell.Constants;
import com.basicshell.MainApplication;
import com.basicshell.browser.ActivityBaseWebImpl;
import com.basicshell.entity.AppConfiguration;
import com.basicshell.umeng.ShareModule;
import com.basicshell.utils.HostUtils;
import com.basicshell.utils.StringUtils;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;
import com.umeng.socialize.UMShareAPI;

import cn.jpush.android.api.JPushInterface;

public class ActivityMainWeb extends ActivityBaseWebImpl {

    private static final long DURATION = 3000;
    private long latestTimeMillis;
    private String sourceUrl;
    private String sourceHost;
    private AppConfiguration appConfiguration = MainApplication.getAppConfiguration();

    BroadcastReceiver webReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if (intent.getAction().equals(Constants.ReceiverAction.RELOAD_WEB)) {
                appConfiguration = MainApplication.getAppConfiguration();
                resetUrl();
            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            PushAgent.getInstance(this).onAppStart();
            ShareModule.initSocialSDK(this);
        }
        sourceUrl = getUrl();
        sourceHost = HostUtils.getHost(sourceUrl);
        registerReceiver();
    }

    private void registerReceiver() {
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Constants.ReceiverAction.RELOAD_WEB);
        registerReceiver(webReceiver, intentFilter);
    }

    public void resetUrl() {
        String newUrl = getUrl();
        if (!sourceUrl.equals(newUrl)) {
            sourceUrl = newUrl;
            sourceHost = HostUtils.getHost(sourceUrl);
            getCurrentWebView().clearHistory();
            loadUrl(newUrl);
        }
    }

    @Override
    public String getUrl() {
        String url = null;
        if (showWebMode()) {
            url = appConfiguration.wapUrl;
        } else if (BuildConfig.SHELL_IS_WEB) {
            url = BuildConfig.SHELL_WEB_URL;
        }
        if (TextUtils.isEmpty(url)) {
            url = super.getUrl();
        }
        return url;
    }

    public boolean showWebMode() {
        return appConfiguration.reviewStatus == Constants.ReviewStatus.REVIEWED &&
                appConfiguration.isInAvailableArea == Constants.AvailableArea.IN &&
                appConfiguration.appMode == Constants.AppMode.MODE_WEB;
    }

    @Override
    public void onResume() {
        super.onResume();
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            MobclickAgent.onResume(this);
        }
        if (!TextUtils.isEmpty(appConfiguration.jpushAppKey)) {
            JPushInterface.onResume(this);
        }
    }

    @Override
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
    protected void onDestroy() {
        unregisterReceiver(webReceiver);
        super.onDestroy();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        boolean result = false;
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            result = agentWeb.back();
            if (!result) {
                long now = System.currentTimeMillis();
                if (now - latestTimeMillis > DURATION) {
                    latestTimeMillis = now;
                    Toast.makeText(this, "再按一下就退出了哦！", Toast.LENGTH_SHORT).show();
                    result = true;
                }
            }
        }
        if (!result) {
            result = super.onKeyDown(keyCode, event);
        }
        return result;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (!TextUtils.isEmpty(appConfiguration.umengAppKey)) {
            UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    protected WebViewClient getWebViewClient() {
        WebViewClient webViewClient = new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (!StringUtils.startsWithIgnoreCase(url, "http")) {
                    try {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        if (intent.resolveActivity(getPackageManager()) == null) {
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    Toast.makeText(getApplicationContext(), "应用未安装", Toast.LENGTH_SHORT).show();
                                }
                            });
                        } else {
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
                            startActivity(intent);
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return true;
                }
                return super.shouldOverrideUrlLoading(view, url);
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                if (showWebMode() && !TextUtils.isEmpty(sourceHost)) {
                    String host = HostUtils.getHost(url);
                    if (TextUtils.isEmpty(host) || sourceHost.equals(host) || sourceHost.contains(host) || host.contains(sourceHost)) {
                        floatingHome.setVisibility(View.GONE);
                    } else {
                        floatingHome.setVisibility(View.VISIBLE);
                    }
                }
                super.onPageStarted(view, url, favicon);
            }
        };
        return webViewClient;
    }
}
