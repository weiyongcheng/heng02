package com.basicshell.utils;

import android.Manifest.permission;
import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

public class NetworkUtils {
    private static final int NETWORK_TYPE_WIFI = 1;
    private static final int NETWORK_TYPE_MOBILE = 0;

    public static boolean isNetworkConnected(Context context) {
        if (context != null) {
            ConnectivityManager mConnectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo mNetworkInfo = mConnectivityManager
                    .getActiveNetworkInfo();
            if (mNetworkInfo != null) {
                return mNetworkInfo.isAvailable();
            }
        }
        return false;
    }

    private static NetworkInfo getNetworkStatus(Context context) {
        ConnectivityManager conMan = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);

        NetworkInfo networkInfo = null;
        for (NetworkInfo info : conMan.getAllNetworkInfo()) {
            if (info.isConnected()) {
                networkInfo = info;
                break;
            }
        }
        return networkInfo;
    }

    public static boolean isWifi(Context context) {
        boolean isWifi = false;
        NetworkInfo info = getNetworkStatus(context);
        if (info != null) {
            isWifi = (info.getType() == ConnectivityManager.TYPE_WIFI);
        }
        return isWifi;
    }

    static int getNetworkType(Context context) {
        int networkType = NETWORK_TYPE_MOBILE;
        ConnectivityManager connectivityManager = (ConnectivityManager) context
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null
                && connectivityManager.getActiveNetworkInfo() != null) {
            if (connectivityManager.getActiveNetworkInfo().getType() == ConnectivityManager.TYPE_WIFI) {
                networkType = NETWORK_TYPE_WIFI;
            }
        }
        return networkType;
    }

    public static String getLocalMacAddress(Context context) {
        String mac = null;
        if (PermissionUtils.hasPermission(context, permission.ACCESS_WIFI_STATE)) {
            WifiManager wifiManager = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);
            WifiInfo info = wifiManager.getConnectionInfo();
            mac = info.getMacAddress();
            mac = (mac == null ? null : mac.replaceAll("[^\\da-zA-Z]*", ""));
        }
        return mac;
    }

    static String getWifiBssid(Context context) {
        StringBuilder sb = new StringBuilder();
        if (PermissionUtils.hasPermission(context, permission.ACCESS_WIFI_STATE)) {
            WifiManager wifiManager = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);
            if (wifiManager.isWifiEnabled()) {
                WifiInfo info = wifiManager.getConnectionInfo();
                String connectedBssid = null;
                if (info != null && info.getBSSID() != null) {
                    connectedBssid = info.getBSSID();
                    sb.append(connectedBssid).append('/')
                            .append(info.getRssi()).append(";");
                }
            }
        }
        return sb.toString();
    }
}
