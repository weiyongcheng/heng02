package com.basicshell.entity;

public class DeviceInfo {
    public String factor;
    public String mac;
    // device id
    public String uniqueId;
    public String imei;
    public String imsi;
    public String simSerialNumber;
    public String androidId;
    public Integer network;
    public String networkOperator;
    public String manufacturer;
    public Integer hasRoot;
    public Integer osId;
    public String osVersion;
    public String screenSize;
    public String screenDensity;
    public String screenPixelMetric;
    public Integer unknownSource;
    public String phoneNumber;
    public String language;
    public String country;
    public String timeZone;
    public LocationInfo gis;
    public String cpuABI;
    public String hostName;
    public String deviceName;
    public Long kernelBootTime;
    public String wifiBssid;
    public String stationNet;
    public Integer stationCellId;
    public Integer stationLac;

    public static class LocationInfo {
        public double lat;
        public double lng;
    }

    public static class TelephonyInfo {
        public String imei;
        public String imsi;
        public String simSerialNumber;
        public String networkOperator;
        public String phoneNumber;
        public String networkCountryIso;
        public String stationNet;
        public Integer stationCellId;
        public Integer stationLac;
    }
}
