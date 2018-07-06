package com.basicshell.browser;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.basicshell.browser.utils.ImageUtils;
import com.basicshell.permissions.PermissionManager;
import com.basicshell.utils.StringUtils;
import com.just.agentweb.AgentWeb;

public class AndroidInterface {
    private Handler deliver = new Handler(Looper.getMainLooper());
    private AgentWeb agentWeb;
    private Activity activity;

    public AndroidInterface(AgentWeb agentWeb, Activity activity) {
        this.agentWeb = agentWeb;
        this.activity = activity;
    }

    @JavascriptInterface
    public void setOrientation(final int screenOrientation) {
        deliver.post(new Runnable() {
            @Override
            public void run() {
                try {
                    activity.setRequestedOrientation(screenOrientation);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    @JavascriptInterface
    public void downloadImage(final String imageUrl) {
        PermissionManager.getInstance().requestPermissionsForce(activity, new PermissionManager.OnGrantPermissionsListener() {
            @Override
            public void onSuccess() {
                ImageUtils.downloadImage(activity.getApplicationContext(), imageUrl);
            }

            @Override
            public void onFailure() {
                Toast.makeText(activity.getApplicationContext(), "无法完成下载，请先授权！", Toast.LENGTH_SHORT).show();
            }
        }, PermissionManager.STORAGE_PERMISSIONS);
    }

    @JavascriptInterface
    public boolean openBrowser(String url) {
        try {
            Intent intent = new Intent();
            intent.setAction(Intent.ACTION_VIEW);
            Uri uri = Uri.parse(url);
            intent.setData(uri);
            activity.startActivity(Intent.createChooser(intent, "请选择浏览器"));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @JavascriptInterface
    public boolean openApp(String scheme) {
        if (StringUtils.startsWithIgnoreCase(scheme, "http")) {
            return openBrowser(scheme);
        } else {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(scheme));
                if (intent.resolveActivity(activity.getPackageManager()) == null) {
                    activity.runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            Toast.makeText(activity.getApplicationContext(), "应用未安装", Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
                    activity.startActivity(intent);
                }
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    @JavascriptInterface
    public void captureScreen() {
        PermissionManager.getInstance().requestPermissionsForce(activity, new PermissionManager.OnGrantPermissionsListener() {
            @Override
            public void onSuccess() {
                ImageUtils.captureActivityView(activity);
            }

            @Override
            public void onFailure() {
                Toast.makeText(activity.getApplicationContext(), "无法完成截图，请先授权！", Toast.LENGTH_SHORT).show();
            }
        }, PermissionManager.STORAGE_PERMISSIONS);
    }
}
