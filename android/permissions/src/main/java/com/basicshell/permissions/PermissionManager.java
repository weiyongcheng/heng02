package com.basicshell.permissions;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.support.annotation.NonNull;

import com.github.dfqin.grantor.PermissionListener;
import com.github.dfqin.grantor.PermissionsUtil;

public class PermissionManager {
    /**
     * 启动所需的全部权限
     */
    public final static String[] NECESSARY_PERMISSIONS = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};

    /**
     * 定位的权限
     */
    public final static String[] LOCATION_PERMISSIONS = new String[]{Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS};

    /**
     * 存储权限
     */
    public final static String[] STORAGE_PERMISSIONS = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE};

    /**
     * 相机权限
     */
    public final static String[] CAMERA_PERMISSIONS = new String[]{Manifest.permission.CAMERA};

    /**
     * 手机权限
     */
    public final static String[] PHONE_PERMISSIONS = new String[]{Manifest.permission.READ_PHONE_STATE};

    /**
     * 麦克风权限
     */
    public final static String[] MICROPHONE_PERMISSIONS = new String[]{Manifest.permission.RECORD_AUDIO};

    /**
     * 传感器权限
     */
    public final static String[] SENSORS_PERMISSIONS = new String[]{Manifest.permission.BODY_SENSORS};

    /**
     * 联系人权限
     */
    public final static String[] CONTACTS_PERMISSIONS = new String[]{Manifest.permission.WRITE_CONTACTS,
            Manifest.permission.GET_ACCOUNTS,
            Manifest.permission.READ_CONTACTS};

    /**
     * 短信权限
     */
    public final static String[] SMS_PERMISSIONS = new String[]{Manifest.permission.READ_SMS,
            Manifest.permission.RECEIVE_WAP_PUSH,
            Manifest.permission.RECEIVE_MMS,
            Manifest.permission.RECEIVE_SMS,
            Manifest.permission.SEND_SMS};

    /**
     * 日历权限
     */
    public final static String[] CALENDAR_PERMISSIONS = new String[]{Manifest.permission.READ_CALENDAR,
            Manifest.permission.WRITE_CALENDAR};

    private static volatile PermissionManager sInstance = null;

    public static PermissionManager getInstance() {
        PermissionManager instance = sInstance;
        if (instance == null) {
            synchronized (PermissionManager.class) {
                instance = sInstance;
                if (instance == null) {
                    instance = new PermissionManager();
                    sInstance = instance;
                }
            }
        }
        return instance;
    }

    public boolean hasAllPermissions(Context context, String... permissions) {
        return PermissionsUtil.hasPermission(context, permissions);
    }

    public void requestPermissionsForce(final Activity activity, final OnGrantPermissionsListener listener, final String... permissions) {
        if (activity == null) {
            return;
        }
        if (hasAllPermissions(activity.getApplicationContext(), permissions)) {
            if (listener != null) {
                listener.onSuccess();
            }
            return;
        }

        PermissionsUtil.TipInfo tip = new PermissionsUtil.TipInfo("请求授权:", "亲，应用需要此权限来为您提供更好服务哦！", "残忍拒绝", "确认");
        PermissionsUtil.requestPermission(activity, new PermissionListener() {
            @Override
            public void permissionGranted(@NonNull String[] permissions) {
                if (listener != null) {
                    listener.onSuccess();
                }
            }

            @Override
            public void permissionDenied(@NonNull String[] permissions) {
                if (listener != null) {
                    listener.onFailure();
                }
            }
        }, permissions, true, tip);
    }

    public void requestPermissions(final Activity activity, final OnGrantPermissionsListener listener, final String... permissions) {
        if (activity == null) {
            return;
        }
        if (hasAllPermissions(activity.getApplicationContext(), permissions)) {
            if (listener != null) {
                listener.onSuccess();
            }
            return;
        }
        showApply4PermissionsDialog(activity, listener, permissions);
    }

    private void showApply4PermissionsDialog(final Activity activity, final OnGrantPermissionsListener listener, final String[] permissions) {
        new AlertDialog.Builder(activity).setTitle("权限请求")
                .setMessage("亲，应用需要此权限来为您提供更好服务哦！")
                .setCancelable(false)
                .setPositiveButton("我知道了", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        PermissionsUtil.requestPermission(
                                activity, new PermissionListener() {
                                    @Override
                                    public void permissionGranted(
                                            @NonNull String[] permissions) {
                                        if (listener != null) {
                                            listener.onSuccess();
                                        }
                                    }

                                    @Override
                                    public void permissionDenied(
                                            @NonNull String[] permissions) {
                                        if (listener != null) {
                                            listener.onFailure();
                                        }
                                    }
                                }, permissions);
                    }
                }).create().show();
    }

    /**
     * 授权结果回调监听器
     */
    public interface OnGrantPermissionsListener {
        void onSuccess();

        void onFailure();
    }
}
