package com.basicshell.utils;

import android.Manifest;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Environment;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Base64;

import com.basicshell.utils.cryptor.DES3Cryptor;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.UUID;

public final class DeviceUuidFactory {
    private static final String PREFS_FILE = "dev.xml";
    private static final String DEVICE_UUID_FILE_NAME = ".dev";
    private static final String PREFS_DEVICE_ID = "dev";
    private static final String KEY = "woBpxoLw8GXeW794764XUFA7";
    private static final String IV = "g4QvvFK7";
    private static UUID sUUID;

    public static void init(Context context) {
        if (sUUID == null) {
            synchronized (DeviceUuidFactory.class) {
                if (sUUID == null) {
                    final SharedPreferences prefs = context.getSharedPreferences(PREFS_FILE, 0);
                    final String id = prefs.getString(PREFS_DEVICE_ID, null);
                    if (id != null) {
                        sUUID = UUID.fromString(id);
                    } else {
                        if (recoverDeviceUuidFromSD() != null) {
                            sUUID = UUID.fromString(recoverDeviceUuidFromSD());
                        } else {
                            final String androidId = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
                            try {
                                DES3Cryptor des3Cryptor = new DES3Cryptor(KEY.getBytes(), IV.getBytes());

                                if (!"9774d56d682e549c".equals(androidId)) {
                                    sUUID = UUID.nameUUIDFromBytes(androidId.getBytes("utf8"));
                                    try {
                                        saveDeviceUuidToSD(new String(Base64.encode(des3Cryptor.encrypt(sUUID.toString().getBytes()), Base64.NO_WRAP)));
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                } else {
                                    String deviceId = null;
                                    if (PermissionUtils.hasPermission(context, Manifest.permission.READ_PHONE_STATE)) {
                                        deviceId = ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
                                    }
                                    sUUID = !TextUtils.isEmpty(deviceId) ? UUID.nameUUIDFromBytes(deviceId.getBytes("utf8")) : UUID.randomUUID();
                                    try {
                                        saveDeviceUuidToSD(new String(Base64.encode(des3Cryptor.encrypt(sUUID.toString().getBytes()), Base64.NO_WRAP)));
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                            } catch (UnsupportedEncodingException e) {
                                throw new RuntimeException(e);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        prefs.edit().putString(PREFS_DEVICE_ID, sUUID.toString()).apply();
                    }
                }
            }
        }
    }

    private static String recoverDeviceUuidFromSD() {
        try {
            String dirPath = Environment.getExternalStorageDirectory().getAbsolutePath();
            File dir = new File(dirPath);
            File uuidFile = new File(dir, DEVICE_UUID_FILE_NAME);
            if (!dir.exists() || !uuidFile.exists()) {
                return null;
            }
            FileReader fileReader = new FileReader(uuidFile);
            StringBuilder sb = new StringBuilder();
            char[] buffer = new char[100];
            int readCount;
            while ((readCount = fileReader.read(buffer)) > 0) {
                sb.append(buffer, 0, readCount);
            }
            UUID uuid = UUID.fromString(new String(new DES3Cryptor(KEY.getBytes(), IV.getBytes()).decrypt(Base64.decode(sb.toString().getBytes(), Base64.NO_WRAP))));
            return uuid.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void saveDeviceUuidToSD(String uuid) {
        String dirPath = Environment.getExternalStorageDirectory().getAbsolutePath();
        File targetFile = new File(dirPath, DEVICE_UUID_FILE_NAME);
        if (!targetFile.exists()) {
            OutputStreamWriter osw;
            try {
                osw = new OutputStreamWriter(new FileOutputStream(targetFile), "utf-8");
                try {
                    osw.write(uuid);
                    osw.flush();
                    osw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
    }

    public static UUID getUuid() {
        return sUUID;
    }
}
