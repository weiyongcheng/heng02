package com.basicshell;

import com.facebook.react.modules.network.OkHttpClientProvider;

import java.util.Arrays;

import okhttp3.OkHttpClient;
import okhttp3.Protocol;

/**
 * Fuck Stupid React Native
 */
public final class RNPatcher {


    public static void resetClientProvider() {
        OkHttpClient.Builder builder = OkHttpClientProvider.getOkHttpClient().newBuilder();
        builder.protocols(Arrays.asList(Protocol.HTTP_1_1));

        OkHttpClientProvider.replaceOkHttpClient(builder.build());
    }
}