package com.basicshell.proxy;


import android.content.Context;
import android.content.pm.PackageManager;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Fuck JPush
 */
public class HookManager {

    public static void hookPackageManager(Context context) {
        try {
            Class<?> activityThreadClass = Class.forName("android.app.ActivityThread");
            Method currentActivityThreadMethod = activityThreadClass.getDeclaredMethod("currentActivityThread");
            Object currentActivityThread = currentActivityThreadMethod.invoke(null);

            Field sPackageManagerField = activityThreadClass.getDeclaredField("sPackageManager");
            sPackageManagerField.setAccessible(true);
            Object sPackageManager = sPackageManagerField.get(currentActivityThread);

            Class<?> iPackageManagerInterface = Class.forName("android.content.pm.IPackageManager");
            Object proxy = Proxy.newProxyInstance(iPackageManagerInterface.getClassLoader(),
                    new Class<?>[]{iPackageManagerInterface},
                    new HookHandler(sPackageManager));

            sPackageManagerField.set(currentActivityThread, proxy);

            PackageManager pm = context.getPackageManager();
            Field pmField = pm.getClass().getDeclaredField("mPM");
            pmField.setAccessible(true);
            pmField.set(pm, proxy);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
