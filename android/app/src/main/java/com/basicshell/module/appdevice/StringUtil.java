package com.basicshell.module.appdevice;

/**
 * Created by xmmac on 2018/5/28.
 */

public class StringUtil {

    /**
     * Check if the string is empty
     *
     * @param input string to be checked
     * @return true if input is not null and length>0, otherwise false
     */
    public static boolean isEmpty(String input) {
        return input == null || input.length() == 0;
    }

    /**
     * 打开地图App 有经纬度
     * @param lat
     * @param lng
     * @param addr
     * @return
     */
    public static String getAddressDetailUrl(String lat, String lng, String addr) {

        String strUrl = "geo:%1$s,%2$s?q=%3$s";

        return String.format(strUrl, lat, lng ,addr);

    }

    /**
     * 打开地图App 只有地址信息
     * @param addr
     * @return
     */
    public static String getAddressUrl(String addr) {

        String strUrl = "geo:q=%1$s";

        return String.format(strUrl,addr);

    }


    /**
     * 网页版地图 有经纬度
     * @param lat
     * @param lng
     * @param addr
     * @return
     */
    public static String getHtmlAddressDetailUrl(String lat, String lng, String addr) {

        String strUrl = "http://api.map.baidu.com/marker?location=%1$s,%2$s&title=%3$s&content=%4$s&output=html";

        return String.format(strUrl, lat, lng, addr ,addr);

    }

    /**
     * 网页版地图  只有地址
     * @param addr
     * @return
     */
    public static String getHtmlAddressUrl(String addr) {

        String strUrl = "http://api.map.baidu.com/geocoder?address=%1$s&output=html";

        return String.format(strUrl,addr);

    }
}
