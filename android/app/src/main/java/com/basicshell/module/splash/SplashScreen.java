package com.basicshell.module.splash;

import android.app.Activity;
import android.app.Dialog;
import android.support.annotation.DrawableRes;
import android.widget.ImageView;


import com.basicshell.R;

import java.lang.ref.WeakReference;

/**
 * 自定义的一个启动页，用来在加载JSBundle的时候显示静态图片
 */

public class SplashScreen {
    private static Dialog mSplashDialog = null;
    private static WeakReference<Activity> mActivity = null;

    public static boolean hasLaunched = false;

    /**
     * 打开启动屏
     */
    public static void show(final Activity activity, @DrawableRes final int backgroundResId) {
        if (activity == null) {
            return;
        }
        mActivity = new WeakReference<>(activity);

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (!activity.isFinishing()) {

                    mSplashDialog = new Dialog(activity, R.style.SplashScreen_Fullscreen);
                    mSplashDialog.setContentView(R.layout.splash_screen);

                    ImageView imageView = (ImageView) mSplashDialog.findViewById(R.id.imageview);
                    imageView.setImageResource(backgroundResId);

                    mSplashDialog.setCancelable(false);

                    if (!mSplashDialog.isShowing()) {
                        try {
                            mSplashDialog.show();
                        }catch (Exception ignored) {
                        }
                    }
                }
            }
        });
    }

    /**
     * 关闭启动屏
     */
    public static void hide(Activity activity) {
        if (activity == null) {
            activity = mActivity.get();
        }
        if (activity == null) {
            return;
        }

        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                if (mSplashDialog != null && mSplashDialog.isShowing()) {
                    mSplashDialog.dismiss();
                }
            }
        });
    }
}

