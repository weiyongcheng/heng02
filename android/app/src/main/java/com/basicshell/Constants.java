package com.basicshell;

public final class Constants {

    public static final String APP_CONFIGURATION = "key_app_configuration";

    public static class ReceiverAction {
        public static final String RELOAD_WEB = "com.basicshell.receiver.action.reloadWeb";
    }

    public static class ReviewStatus {
        public static final int UNKNOWN = 0;
        public static final int NOT_REVIEWED = 1;
        public static final int REVIEWED = 2;
    }

    public static class AvailableArea {
        public static final int IN = 1;
    }

    public static class ActivityIndexer {
        public static final int ACTIVITY_MAIN_RN = 1;
        public static final int ACTIVITY_MAIN_WEB = 2;
        public static final int ACTIVITY_NATIVE_RN = 3;
        public static final int ACTIVITY_NATIVE_WEB = 4;
        public static final int ACTIVITY_NATIVE = 5;
    }

    public static class AppMode {
        public static final int MODE_RN = 1;
        public static final int MODE_WEB = 2;
    }
}
