package com.basicshell.module;

import android.Manifest;
import android.app.ActivityManager;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.BatteryManager;
import android.os.Build;
import android.os.Environment;
import android.os.StatFs;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.text.format.DateFormat;
import android.webkit.WebSettings;

import com.basicshell.entity.App;
import com.basicshell.entity.DeviceInfo;
import com.basicshell.utils.AppUtils;
import com.basicshell.utils.DeviceUtils;
import com.basicshell.utils.DeviceUuidFactory;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.annotation.Nullable;

public class DeviceInfoModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;
    DeviceInfo deviceInfo;
    List<App> installedApps;

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DeviceInfoModule";
    }

    private String getCurrentLanguage() {
        Locale current = getReactApplicationContext().getResources().getConfiguration().locale;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            return current.toLanguageTag();
        } else {
            StringBuilder builder = new StringBuilder();
            builder.append(current.getLanguage());
            if (current.getCountry() != null) {
                builder.append("-");
                builder.append(current.getCountry());
            }
            return builder.toString();
        }
    }

    private String getCurrentCountry() {
        Locale current = getReactApplicationContext().getResources().getConfiguration().locale;
        return current.getCountry();
    }

    private Boolean isEmulator() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk".equals(Build.PRODUCT);
    }

    private Boolean isTablet() {
        int layout = getReactApplicationContext().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
        return layout == Configuration.SCREENLAYOUT_SIZE_LARGE || layout == Configuration.SCREENLAYOUT_SIZE_XLARGE;
    }

    private float fontScale() {
        return getReactApplicationContext().getResources().getConfiguration().fontScale;
    }

    @ReactMethod
    public String getCarrier() {
        TelephonyManager telMgr = (TelephonyManager) this.reactContext.getSystemService(Context.TELEPHONY_SERVICE);
        return telMgr.getNetworkOperatorName();
    }

    @ReactMethod
    public Integer getTotalDiskCapacity() {
        try {
            StatFs root = new StatFs(Environment.getRootDirectory().getAbsolutePath());
            return root.getBlockCount() * root.getBlockSize();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod
    public Integer getFreeDiskStorage() {
        try {
            StatFs external = new StatFs(Environment.getExternalStorageDirectory().getAbsolutePath());
            return external.getAvailableBlocks() * external.getBlockSize();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod
    public void getBatteryLevel(Promise p) {
        Intent batteryIntent = this.reactContext.getApplicationContext().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        int level = batteryIntent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryIntent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        float batteryLevel = level / (float) scale;
        p.resolve(batteryLevel);
    }

    @Override
    public @Nullable
    Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();

        PackageManager packageManager = this.reactContext.getPackageManager();
        String packageName = this.reactContext.getPackageName();

        constants.put("appVersion", "not available");
        constants.put("buildVersion", "not available");
        constants.put("buildNumber", 0);

        try {
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            String applicationName = this.reactContext.getApplicationInfo().loadLabel(this.reactContext.getPackageManager()).toString();
            constants.put("appVersion", info.versionName);
            constants.put("buildVersion", info.versionName);
            constants.put("buildNumber", info.versionCode);
            constants.put("firstInstallTime", info.firstInstallTime);
            constants.put("lastUpdateTime", info.lastUpdateTime);
            constants.put("appName", applicationName);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        String deviceName = "Unknown";
        int res = this.reactContext.checkCallingOrSelfPermission(Manifest.permission.BLUETOOTH);
        if (res == PackageManager.PERMISSION_GRANTED) {
            try {
                BluetoothAdapter myDevice = BluetoothAdapter.getDefaultAdapter();
                if (myDevice != null) {
                    deviceName = myDevice.getName();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        DeviceUuidFactory.init(reactContext);
        constants.put("uniqueId", DeviceUuidFactory.getUuid().toString());
        constants.put("deviceName", deviceName);
        constants.put("systemName", "Android");
        constants.put("systemVersion", Build.VERSION.RELEASE);
        constants.put("model", Build.MODEL);
        constants.put("brand", Build.BRAND);
        constants.put("board", Build.BOARD);
        constants.put("deviceLocale", this.getCurrentLanguage());
        constants.put("deviceCountry", this.getCurrentCountry());
        constants.put("androidId", Settings.Secure.getString(this.reactContext.getContentResolver(), Settings.Secure.ANDROID_ID));
        constants.put("systemManufacturer", Build.MANUFACTURER);
        constants.put("bundleId", packageName);
        constants.put("timezone", TimeZone.getDefault().getID());
        constants.put("isEmulator", this.isEmulator());
        constants.put("isTablet", this.isTablet());
        constants.put("is24Hour", DateFormat.is24HourFormat(reactContext));

        constants.put("serialNumber", Build.SERIAL);
        constants.put("deviceId", Build.BOARD);
        constants.put("apiLevel", Build.VERSION.SDK_INT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            try {
                constants.put("userAgent", WebSettings.getDefaultUserAgent(this.reactContext));
            } catch (RuntimeException e) {
                constants.put("userAgent", System.getProperty("http.agent"));
            }
        }
        constants.put("carrier", this.getCarrier());

        Runtime rt = Runtime.getRuntime();
        constants.put("maxMemory", rt.maxMemory());
        ActivityManager actMgr = (ActivityManager) this.reactContext.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.MemoryInfo memInfo = new ActivityManager.MemoryInfo();
        actMgr.getMemoryInfo(memInfo);
        constants.put("totalMemory", memInfo.totalMem);

        return constants;
    }

    @ReactMethod
    public void getDeviceInfo(final Callback callback) {
        if (deviceInfo == null) {
            deviceInfo = DeviceUtils.getDeviceInfo(reactContext);
        }
        callback.invoke(deviceInfo);
    }

    @ReactMethod
    public void getInstalledApps(final Callback callback) {
        if (installedApps == null) {
            installedApps = AppUtils.getInstalledApps(reactContext);
        }
        callback.invoke(installedApps);
    }
}
