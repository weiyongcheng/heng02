package com.basicshell.utils;

import java.net.URI;

public final class HostUtils {

    public static String getHost(String url) {
        if (!(StringUtils.startsWithIgnoreCase(url, "http://") ||
                StringUtils.startsWithIgnoreCase(url, "https://"))) {
            url = "http://" + url;
        }
        String returnVal = "";
        try {
            URI uri = new URI(url);
            returnVal = uri.getHost();
        } catch (Exception e) {
        }
        if ((StringUtils.endsWithIgnoreCase(returnVal, ".html") ||
                StringUtils.endsWithIgnoreCase(returnVal, ".htm"))) {
            returnVal = "";
        }
        return returnVal.toLowerCase();
    }
}
