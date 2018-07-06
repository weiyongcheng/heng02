package com.basicshell.utils;

import android.Manifest;
import android.content.Context;
import android.location.Location;
import android.location.LocationManager;
import android.os.Build;
import android.os.SystemClock;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.view.WindowManager;

import com.basicshell.entity.DeviceInfo;

import java.util.Locale;
import java.util.TimeZone;
import java.util.UUID;

public class DeviceUtils {

    static class PreferenceConfig {
        public static final String PREF_FILE = "d";
        public static final String KEY_DEVICE_FACTOR = "kdf";
    }

    public static DeviceInfo getDeviceInfo(Context context) {
        boolean hasPermission = PermissionUtils.hasPermission(context,
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.ACCESS_NETWORK_STATE);
        if (!hasPermission) {
            throw new RuntimeException(
                    "Lack of permission: READ_PHONE_STATE, ACCESS_NETWORK_STATE");
        }

        DeviceInfo device = new DeviceInfo();
        try {
            DeviceInfo.TelephonyInfo telephonyInfo = TelephonyUtils
                    .getTelephonyInfo(context);
            WindowManager windowManager = (WindowManager) context
                    .getSystemService(Context.WINDOW_SERVICE);

            DeviceUuidFactory.init(context);
            device.uniqueId = DeviceUuidFactory.getUuid().toString();
            device.factor = getDeviceFactor(context);
            device.mac = NetworkUtils.getLocalMacAddress(context);
            device.imei = telephonyInfo.imei;
            device.imsi = telephonyInfo.imsi;
            device.simSerialNumber = telephonyInfo.simSerialNumber;
            device.androidId = Settings.Secure.getString(
                    context.getContentResolver(), Settings.Secure.ANDROID_ID);
            device.networkOperator = telephonyInfo.networkOperator;
            device.manufacturer = Build.MANUFACTURER;
            device.hasRoot = 0;
            device.osId = Build.VERSION.SDK_INT;
            device.osVersion = Build.VERSION.RELEASE;
            device.screenSize = windowManager.getDefaultDisplay().getWidth()
                    + "_" + windowManager.getDefaultDisplay().getHeight();
            device.screenDensity = String.valueOf(context.getResources()
                    .getDisplayMetrics().density);
            device.screenPixelMetric = getPixelMetric(context);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                device.unknownSource = Settings.Global.getInt(
                        context.getContentResolver(),
                        Settings.Global.INSTALL_NON_MARKET_APPS);
            } else { // OS < 17
                device.unknownSource = Settings.Secure.getInt(
                        context.getContentResolver(),
                        Settings.Secure.INSTALL_NON_MARKET_APPS);
            }

            device.phoneNumber = telephonyInfo.phoneNumber;
            device.language = context.getResources().getConfiguration().locale.getLanguage();
            String country = telephonyInfo.networkCountryIso;
            device.country = !TextUtils.isEmpty(country) ? country : Locale
                    .getDefault().getLanguage();
            device.timeZone = TimeZone.getDefault().getID();
            // device.model = Build.MODEL;
            device.gis = getLocation(context);
            device.cpuABI = Build.CPU_ABI;
            device.network = NetworkUtils.getNetworkType(context);
            device.hostName = Settings.Secure.getString(
                    context.getContentResolver(), "net.hostname");
            device.deviceName = Build.DEVICE;
            device.kernelBootTime = SystemClock.elapsedRealtime();
            device.wifiBssid = NetworkUtils.getWifiBssid(context);
            device.stationNet = telephonyInfo.stationNet;
            device.stationCellId = telephonyInfo.stationCellId;
            device.stationLac = telephonyInfo.stationLac;
        } catch (Settings.SettingNotFoundException e) {
            e.printStackTrace();
        }
        return device;
    }

    private static synchronized String getDeviceFactor(Context context) {
        String factor = PreferenceUtils.read(context, PreferenceConfig.PREF_FILE, PreferenceConfig.KEY_DEVICE_FACTOR);
        if (TextUtils.isEmpty(factor)) {
            factor = UUID.randomUUID().toString().replaceAll("-", "");
            PreferenceUtils.write(context, PreferenceConfig.PREF_FILE, PreferenceConfig.KEY_DEVICE_FACTOR, factor);
        }
        return factor;
    }

    private static String getPixelMetric(Context context) {
        DisplayMetrics dm = context.getResources().getDisplayMetrics();
        if (dm != null) {
            return dm.widthPixels + "*" + dm.heightPixels + "*" + dm.density;
        }
        return "";
    }

    @SuppressWarnings({"MissingPermission"})
    private static DeviceInfo.LocationInfo getLocation(Context context) {
        DeviceInfo.LocationInfo gis = new DeviceInfo.LocationInfo();
        gis.lat = 0;
        gis.lng = 0;

        Location location = null;
        try {
            LocationManager locationManager = ((LocationManager) context
                    .getSystemService(Context.LOCATION_SERVICE));
            if (PermissionUtils.hasPermission(context,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {
                location = locationManager
                        .getLastKnownLocation(LocationManager.GPS_PROVIDER);
                if (location == null) {
                    location = locationManager
                            .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                }
            } else if (PermissionUtils.hasPermission(context,
                    Manifest.permission.ACCESS_COARSE_LOCATION)) {
                location = locationManager
                        .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        if (null != location) {
            gis.lat = location.getLatitude();
            gis.lng = location.getLongitude();
        }
        return gis;
    }
}