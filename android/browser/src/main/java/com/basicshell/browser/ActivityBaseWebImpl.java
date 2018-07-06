package com.basicshell.browser;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.widget.Toolbar;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.TextView;
import android.widget.Toast;

import com.basicshell.browser.utils.ClipboardUtils;
import com.basicshell.browser.utils.ImageUtils;
import com.basicshell.permissions.PermissionManager;

public class ActivityBaseWebImpl extends AbsActivityBaseWeb {

    private TextView titleTextView;
    protected Toolbar toolbar;
    protected FloatingActionButton floatingHome;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_app_web);

        toolbar = (Toolbar) this.findViewById(R.id.toolbar);
        toolbar.setTitleTextColor(Color.WHITE);
        toolbar.setTitle("");
        titleTextView = (TextView) this.findViewById(R.id.toolbar_title);
        this.setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        }
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ActivityBaseWebImpl.this.finish();
            }
        });

        floatingHome = findViewById(R.id.floating_home);
        floatingHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                loadUrl(getUrl());
            }
        });
        agentWeb.getJsInterfaceHolder().addJavaObject("android", new AndroidInterface(agentWeb, this));
        setWebViewLongClickListener();
    }

    @NonNull
    @Override
    protected ViewGroup getAgentWebParent() {
        return (ViewGroup) this.findViewById(R.id.container);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (agentWeb != null && agentWeb.handleKeyEvent(keyCode, event)) {
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void setTitle(WebView view, String title) {
        titleTextView.setText(title);
    }

    @Nullable
    @Override
    protected String getUrl() {
        return "about:blank";
    }

    protected void setWebViewLongClickListener() {
        WebView webView = getCurrentWebView();
        webView.setOnLongClickListener(new View.OnLongClickListener() {
            public boolean onLongClick(View v) {
                WebView.HitTestResult result = getCurrentWebView().getHitTestResult();
                if (result == null) {
                    return false;
                }
                int type = result.getType();
                String extra = result.getExtra();
                switch (type) {
                    case WebView.HitTestResult.EDIT_TEXT_TYPE:
                        break;
                    case WebView.HitTestResult.PHONE_TYPE:
                        break;
                    case WebView.HitTestResult.EMAIL_TYPE:
                        break;
                    case WebView.HitTestResult.GEO_TYPE:
                        break;
                    case WebView.HitTestResult.SRC_ANCHOR_TYPE:
                        showAnchorOperationDialog(extra);
                        return true;
                    case WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE:
                    case WebView.HitTestResult.IMAGE_TYPE:
                        showImageOperationDialog(extra);
                        return true;
                    case WebView.HitTestResult.UNKNOWN_TYPE: //未知
                        break;

                }
                return false;
            }
        });
    }

    private void showAnchorOperationDialog(final String content) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("操作选择");
        final String[] items = {"复制链接地址"};
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int index) {
                if (index == 0) {
                    ClipboardUtils.clipContent(getApplicationContext(), content);
                    Toast.makeText(getApplicationContext(), "复制成功！", Toast.LENGTH_SHORT).show();
                }
            }
        });
        builder.setCancelable(true);
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void showImageOperationDialog(final String imageUrl) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("操作选择");
        final String[] items = {"保存图片到本地"};
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int index) {
                if (index == 0) {
                    downloadImage(imageUrl);
                }
            }
        });
        builder.setCancelable(true);
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void downloadImage(final String imageUrl) {
        PermissionManager.getInstance().requestPermissionsForce(this, new PermissionManager.OnGrantPermissionsListener() {
            @Override
            public void onSuccess() {
                ImageUtils.downloadImage(getApplicationContext(), imageUrl);
            }

            @Override
            public void onFailure() {
                Toast.makeText(getApplicationContext(), "无法完成下载，请先授权！", Toast.LENGTH_SHORT).show();
            }
        }, PermissionManager.STORAGE_PERMISSIONS);
    }
}
