package com.basicshell.utils.cryptor;

import android.util.Base64;

import org.spongycastle.crypto.engines.AESFastEngine;
import org.spongycastle.crypto.modes.CBCBlockCipher;
import org.spongycastle.crypto.paddings.PaddedBufferedBlockCipher;
import org.spongycastle.crypto.params.KeyParameter;
import org.spongycastle.crypto.params.ParametersWithIV;

import java.security.AlgorithmParameters;
import java.security.SecureRandom;
import java.security.Security;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class AESCryptor {
    static {
        Security.insertProviderAt(new org.spongycastle.jce.provider.BouncyCastleProvider(), 1);
    }

    // Look at this
    // https://gist.github.com/dealforest/1949873

    // KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
    // keyGenerator.init(256);
    // SecretKey key = keyGenerator.generateKey();
    // keyBytes = key.getEncoded()

    // // existing key
    // key = new SecretKeySpec(keyBytes, 0, keyBytes.length, "AES");

    // FIXME not match with decrypt
    public static String encrypt(byte[] key, String cleartext) throws Exception {
        byte[] result = encrypt(key, cleartext.getBytes());
        return new String(result);
    }

    private static byte[] encrypt(byte[] key, byte[] clear) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        AlgorithmParameters params = cipher.getParameters();
        byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();
        byte[] encrypted = cipher.doFinal(clear);
        // base64 encode and return
        return Base64.encode(encrypted, Base64.DEFAULT);
    }

    public static String decrypt(byte[] key, String encryptedBase64) throws Exception {
        byte[] encrypted = Base64.decode(encryptedBase64, Base64.DEFAULT);
        byte[] result = decrypt(key, encrypted);
        return new String(result);
    }

    private static byte[] decrypt(byte[] key, byte[] encrypted) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES"); // /ECB/PKCS7Padding", "SC");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        byte[] decrypted = cipher.doFinal(encrypted);
        return decrypted;
    }

    private static byte[] encryptSpongy(byte[] key, byte[] clear) {
        try {
            PaddedBufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(new AESFastEngine()));
            SecureRandom rng = new SecureRandom();
            byte[] ivBytes = new byte[16];
            rng.nextBytes(ivBytes);

            cipher.init(true, new ParametersWithIV(new KeyParameter(key), ivBytes));
            byte[] outBuf = new byte[cipher.getOutputSize(clear.length)];
            int processed = cipher.processBytes(clear, 0, clear.length, outBuf, 0);
            processed += cipher.doFinal(outBuf, processed);
            byte[] outBuf2 = new byte[processed + 16];
            System.arraycopy(ivBytes, 0, outBuf2, 0, 16);
            System.arraycopy(outBuf, 0, outBuf2, 16, processed);

            return outBuf2;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static byte[] decryptSpongy(byte[] key, byte[] encrypted) {
        try {
            PaddedBufferedBlockCipher cipher = new PaddedBufferedBlockCipher(new CBCBlockCipher(new AESFastEngine()));
            byte[] ivBytes = new byte[16];
            System.arraycopy(encrypted, 0, ivBytes, 0, ivBytes.length); // Get iv from data
            byte[] dataonly = new byte[encrypted.length - ivBytes.length];
            System.arraycopy(encrypted, ivBytes.length, dataonly, 0, encrypted.length - ivBytes.length);

            cipher.init(false, new ParametersWithIV(new KeyParameter(key), ivBytes));
            byte[] clear = new byte[cipher.getOutputSize(dataonly.length)];
            int len = cipher.processBytes(dataonly, 0, dataonly.length, clear, 0);
            len += cipher.doFinal(clear, len);
            return clear;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}