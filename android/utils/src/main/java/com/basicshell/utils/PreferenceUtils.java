package com.basicshell.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

public class PreferenceUtils {
    public static String read(Context context, String fileName,
                              String key) {
        String value = null;
        SharedPreferences preferences = context.getSharedPreferences(fileName,
                Context.MODE_PRIVATE);
        if (preferences != null) {
            value = preferences.getString(key, null);
        }
        return value;
    }

    public static void write(Context context, String fileName,
                             String key, String value) {
        if (TextUtils.isEmpty(key)) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(fileName,
                Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(key, value);
        editor.apply();
    }

    public static int readInt(Context context, String fileName,
                              String key) {
        int value = -1;
        SharedPreferences preferences = context.getSharedPreferences(fileName,
                Context.MODE_PRIVATE);
        if (preferences != null) {
            value = preferences.getInt(key, -1);
        }
        return value;
    }

    public static int writeInt(Context context, String fileName,
                               String key, int versionNum) {
        int value = -1;
        SharedPreferences preferences = context.getSharedPreferences(fileName,
                Context.MODE_PRIVATE);
        if (preferences != null) {
            preferences.edit().putInt(key, versionNum).apply();
        }
        return value;
    }
}
