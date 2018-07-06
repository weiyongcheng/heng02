package com.basicshell.utils;

import android.content.Context;
import android.text.TextUtils;
import android.util.Base64;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.StreamCorruptedException;

public class ObjectUtils {

    public static <T extends Serializable> void writeObject(Context context, String key, T obj) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(baos);
            oos.writeObject(obj);
            String objString = new String(Base64.encode(baos.toByteArray(), Base64.DEFAULT));
            context.getSharedPreferences(key, Context.MODE_PRIVATE)
                    .edit()
                    .putString(key, objString)
                    .apply();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static <T extends Serializable> T readObject(Context context, String key) {
        T obj = null;
        try {
            String objString = context.getSharedPreferences(key, Context.MODE_PRIVATE).getString(key, null);
            if (!TextUtils.isEmpty(objString)) {
                ByteArrayInputStream bais = new ByteArrayInputStream(Base64.decode(objString, Base64.DEFAULT));
                ObjectInputStream bis = new ObjectInputStream(bais);
                obj = (T) bis.readObject();
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (StreamCorruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return obj;
    }
}
