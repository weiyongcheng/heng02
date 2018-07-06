package com.basicshell.utils.cryptor;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESedeKeySpec;
import javax.crypto.spec.IvParameterSpec;

public class DES3Cryptor {

    private static final String ALGORITHM = "DESede";

    private Key desKey;
    private IvParameterSpec ivSpec;

    public DES3Cryptor(byte[] key, byte[] iv) throws Exception {
        DESedeKeySpec spec = new DESedeKeySpec(key);
        SecretKeyFactory keyfactory = SecretKeyFactory.getInstance(ALGORITHM);
        desKey = keyfactory.generateSecret(spec);
        ivSpec = new IvParameterSpec(iv);
    }

    public byte[] encrypt(byte[] data) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM + "/CBC/PKCS7PADDING");
        cipher.init(Cipher.ENCRYPT_MODE, desKey, ivSpec);
        byte[] bOut = cipher.doFinal(data);
        return bOut;
    }

    public byte[] decrypt(byte[] data) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM + "/CBC/PKCS7PADDING");
        cipher.init(Cipher.DECRYPT_MODE, desKey, ivSpec);

        byte[] bOut = cipher.doFinal(data);
        return bOut;
    }

    public DES3Cryptor setKeyAndIv(byte[] key, byte[] iv) throws Exception {
        DESedeKeySpec spec = new DESedeKeySpec(key);
        SecretKeyFactory keyfactory = SecretKeyFactory.getInstance(ALGORITHM);
        desKey = keyfactory.generateSecret(spec);
        ivSpec = new IvParameterSpec(iv);
        return this;
    }
}
