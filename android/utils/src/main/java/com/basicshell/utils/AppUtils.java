package com.basicshell.utils;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;

import com.basicshell.entity.App;

import java.util.ArrayList;
import java.util.List;

public class AppUtils {

    public static List<ResolveInfo> getReceivers(Context context, String action, Uri data) {
        Intent intent = new Intent();
        intent.setAction(action);
        if (data != null) {
            intent.setData(data);
        }
        return context.getPackageManager().queryBroadcastReceivers(intent,
                PackageManager.GET_RESOLVED_FILTER);
    }

    public static List<ResolveInfo> getServices(Context context, String action, Uri data) {
        Intent intent = new Intent();
        intent.setAction(action);
        if (data != null) {
            intent.setData(data);
        }
        return context.getPackageManager().queryIntentServices(intent,
                PackageManager.GET_RESOLVED_FILTER);
    }

    public static synchronized List<App> getInstalledApps(Context context) {
        ArrayList<App> installedApps = new ArrayList<App>();
        if (installedApps.isEmpty()) {
            PackageManager manager = context.getPackageManager();
            List<ApplicationInfo> appinfos = manager
                    .getInstalledApplications(PackageManager.GET_META_DATA);
            for (ApplicationInfo info : appinfos) {
                App appinfo = getInstalledApp(context, info, manager);
                if (isSystemApp(info)) {
                    appinfo.isSystemApp = 1;
                }
                installedApps.add(appinfo);
            }
        }
        return installedApps;
    }

    private static App getInstalledApp(Context context, ApplicationInfo info, PackageManager manager) {
        App appinfo = new App();
        appinfo.name = (String) info.loadLabel(manager);
        appinfo.packageName = info.packageName;
        try {
            PackageInfo packInfo = manager.getPackageInfo(info.packageName, 0);
            appinfo.version = packInfo.versionName;
            appinfo.versionCode = packInfo.versionCode;
        } catch (PackageManager.NameNotFoundException ex) {
            ex.printStackTrace();
        }
        return appinfo;
    }

    private static boolean isSystemApp(ApplicationInfo appInfo) {
        boolean isUpdatedSystemApp = ((appInfo.flags & ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) != 0);
        boolean isNotSystemApps = ((appInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0);
        return !(isUpdatedSystemApp || isNotSystemApps);
    }
}
