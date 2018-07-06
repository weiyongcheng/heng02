package com.basicshell.entity;

public class App {
    public String name;
    public String packageName;
    public String version;
    public Integer versionCode;
    public Integer isSystemApp;

    @Override
    public boolean equals(Object obj) {
        if (obj != null && obj instanceof App) {
            App app = (App) obj;
            if (this.packageName != null && this.version != null) {
                return this.packageName.equals(app.packageName) && this.version
                        .equals(app.version);
            }
        }
        return false;
    }
}
