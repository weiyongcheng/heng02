package com.basicshell.utils;

import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import android.util.Log;

public class CommonUtils {

    private static final String TAG = "CommonUtils";

    public static void restartApp(Context context) {
        try {
            //check if the context is given
            if (context != null) {
                //fetch the packagemanager so we can get the default launch activity
                // (you can replace this intent with any other activity if you want
                PackageManager packageManager = context.getPackageManager();
                //check if we got the PackageManager
                if (packageManager != null) {
                    //create the intent with the default start activity for your application
                    Intent launchIntentForPackage = packageManager.getLaunchIntentForPackage(
                            context.getPackageName()
                    );
                    if (launchIntentForPackage != null) {
                        launchIntentForPackage.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        //create a pending intent so the application is restarted after System.exit(0) was called.
                        // We use an AlarmManager to call this intent in 100ms
                        int pendingIntentId = android.R.drawable.ic_notification_overlay;
                        PendingIntent pendingIntent = PendingIntent
                                .getActivity(context, pendingIntentId, launchIntentForPackage,
                                        PendingIntent.FLAG_CANCEL_CURRENT);
                        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
                        alarmManager.set(AlarmManager.RTC, System.currentTimeMillis() + 100, pendingIntent);
                        //kill the application
                        System.exit(0);
                    } else {
                        Log.e(TAG, "Was not able to restart application, launchIntentForPackage null");
                    }
                } else {
                    Log.e(TAG, "Was not able to restart application, PM null");
                }
            } else {
                Log.e(TAG, "Was not able to restart application, Context null");
            }
        } catch (Exception ex) {
            Log.e(TAG, "Was not able to restart application");
        }
    }

    public static int getVersionCode(Context context) {
        try {
            PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            return packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            return 0;
        }
    }

    public static String getCurrentProcessName(Context context) {
        int pid = android.os.Process.myPid();
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo appProcess : activityManager.getRunningAppProcesses()) {
            if (appProcess.pid == pid) {
                return appProcess.processName;
            }
        }
        return null;
    }

    public static String getNotNullString(String string, String defaultString) {
        return TextUtils.isEmpty(string) ? defaultString : string;
    }
}
