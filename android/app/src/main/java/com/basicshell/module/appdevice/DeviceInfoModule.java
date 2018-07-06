package com.basicshell.module.appdevice;

import android.Manifest;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.support.v4.app.ActivityCompat;
import android.telephony.TelephonyManager;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.content.Intent.FLAG_ACTIVITY_NEW_TASK;

public class DeviceInfoModule extends ReactContextBaseJavaModule {

    private Context mContext;

    public DeviceInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppDeviceInfo";
    }

    @ReactMethod
    public void getNetType(Promise promise) {

        if (mContext == null) {
            promise.resolve("");
            return;
        }

        String netType = NetUtil.getNetworkType(mContext).name();
        promise.resolve(netType);
    }


    @ReactMethod
    public void gotoMarket(Promise promise) {
        if (mContext == null) {
            return;
        }

        goToMarket(mContext, "com.szjspmaiqnzx");
    }

    @ReactMethod
    public void crash(String a, Promise promise) {
        promise.resolve(a.length());
    }

    @ReactMethod
    public void exitApp(Promise promise) {
        System.exit(0);
    }

    public static void goToMarket(Context context, String packageName) {
        Uri uri = Uri.parse("market://details?id=" + packageName);
        Intent goToMarket = new Intent(Intent.ACTION_VIEW, uri);
        goToMarket.setFlags(FLAG_ACTIVITY_NEW_TASK);
        try {
            context.startActivity(goToMarket);
        } catch (ActivityNotFoundException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void gotoMap(Promise promise) {

        try {
            String address = "彩票站";
            Uri mapUri = Uri.parse(getHtmlAddressUrl(address));
            Intent location = new Intent(Intent.ACTION_VIEW, mapUri);
            mContext.startActivity(location);
        } catch (Exception e) {

            try {
                Toast.makeText(mContext, "发生错误", Toast.LENGTH_LONG).show();

            } catch (Exception ignored) {
            }
        }
    }

    public static String getHtmlAddressUrl(String addr) {

        String strUrl = "http://api.map.baidu.com/geocoder?address=%1$s&output=html";

        return String.format(strUrl, addr);

    }

    @ReactMethod
    public void getICCID(Promise promise) {
        TelephonyManager mTelephonyMgr = (TelephonyManager) mContext.getSystemService(Context.TELEPHONY_SERVICE);
        if (ActivityCompat.checkSelfPermission(mContext, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        String imsi = mTelephonyMgr.getSimSerialNumber();
        promise.resolve(imsi);
    }
}
