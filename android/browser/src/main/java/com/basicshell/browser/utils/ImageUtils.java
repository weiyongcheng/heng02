package com.basicshell.browser.utils;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.view.Display;
import android.view.View;
import android.widget.Toast;

import com.facebook.common.executors.CallerThreadExecutor;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;

import java.io.File;
import java.io.FileOutputStream;

public class ImageUtils {

    public static boolean captureActivityView(Activity activity) {
        try {
            View decorView = activity.getWindow().getDecorView();
            decorView.buildDrawingCache();
            Rect rect = new Rect();
            decorView.getWindowVisibleDisplayFrame(rect);
            int statusBarHeight = rect.top;
            Display display = activity.getWindowManager().getDefaultDisplay();
            int width = display.getWidth();
            int height = display.getHeight();
            decorView.setDrawingCacheEnabled(true);
            Bitmap bitmap = Bitmap.createBitmap(decorView.getDrawingCache(), 0,
                    statusBarHeight, width, height - statusBarHeight);
            decorView.destroyDrawingCache();

            if (saveImage(activity, activity.getLocalClassName(), bitmap)) {
                toast(activity.getApplicationContext(), "保存图片成功！");
                return true;
            } else {
                toast(activity.getApplicationContext(), "保存图片失败！");
            }
        } catch (Exception e) {
            toast(activity.getApplicationContext(), "截屏发生异常！");
            e.printStackTrace();
        }
        return false;
    }

    public static void downloadImage(final Context context, final String imageUrl) {
        ImageRequest imageRequest = ImageRequestBuilder
                .newBuilderWithSource(Uri.parse(imageUrl))
                .setProgressiveRenderingEnabled(true)
                .build();
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        DataSource<CloseableReference<CloseableImage>> dataSource = imagePipeline.fetchDecodedImage(imageRequest, context);

        dataSource.subscribe(new BaseBitmapDataSubscriber() {

            @Override
            public void onNewResultImpl(Bitmap bitmap) {
                if (bitmap == null) {
                    toast(context, "保存图片失败,无法下载图片！");
                }
                if (saveImage(context, imageUrl, bitmap)) {
                    toast(context, "保存图片成功！");
                } else {
                    toast(context, "保存图片失败！");
                }
            }

            @Override
            public void onFailureImpl(DataSource dataSource) {
                toast(context, "保存图片失败,无法下载图片！");
            }
        }, CallerThreadExecutor.getInstance());
    }

    private static void toast(final Context context, final String msg) {
        new Handler(Looper.getMainLooper()).post(new Runnable() {
            @Override
            public void run() {
                Toast.makeText(context, msg, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private static boolean saveImage(Context context, String imageUrl, Bitmap bitmap) {
        try {
            File appDir = new File(Environment.getExternalStorageDirectory(), "CoolBrowser");
            if (!appDir.exists()) {
                appDir.mkdir();
            }

            String fileName = MD5Utils.byteToString(MD5Utils.md5(imageUrl));
            if (TextUtils.isEmpty(fileName)) {
                fileName = System.currentTimeMillis() + "";
            }
            fileName += ".jpg";

            File file = new File(appDir, fileName);
            FileOutputStream fos = new FileOutputStream(file);
            assert bitmap != null;
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
            fos.flush();
            fos.close();

            Uri uri = Uri.fromFile(file);
            Intent scannerIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, uri);
            context.sendBroadcast(scannerIntent);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
