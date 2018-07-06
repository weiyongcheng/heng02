package com.basicshell.umeng;

import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.os.Handler;

import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.UmengMessageHandler;
import com.umeng.message.UmengNotificationClickHandler;
import com.umeng.message.entity.UMessage;

public class UMengPushApplication extends Application {

    protected PushModule pushModule;
    protected String registrationId;
    protected PushAgent pushAgent;
    //应用退出时，打开推送通知时临时保存的消息
    private UMessage tmpMessage;
    private String tmpEvent;

    @Override
    public void onCreate() {
        super.onCreate();
    }

    protected void setPushModule(PushModule module) {
        pushModule = module;
        if (tmpMessage != null && tmpEvent != null && pushModule != null) {
            handleNotificationClick(tmpEvent, tmpMessage);
            tmpEvent = null;
            tmpMessage = null;
        }
    }

    protected void initPush() {
        pushAgent = PushAgent.getInstance(this);
        pushAgent.setResourcePackageName("com.basicshell.umeng");

        UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {
            @Override
            public void launchApp(Context context, UMessage msg) {
                super.launchApp(context, msg);
                handleNotificationClick(PushModule.DidOpenMessage, msg);
            }

            @Override
            public void openUrl(Context context, UMessage msg) {
                super.openUrl(context, msg);
                handleNotificationClick(PushModule.DidOpenMessage, msg);
            }

            @Override
            public void openActivity(Context context, UMessage msg) {
                super.openActivity(context, msg);
                handleNotificationClick(PushModule.DidOpenMessage, msg);
            }

            @Override
            public void dealWithCustomAction(Context context, UMessage msg) {
                super.dealWithCustomAction(context, msg);
                handleNotificationClick(PushModule.DidOpenMessage, msg);
            }
        };
        pushAgent.setNotificationClickHandler(notificationClickHandler);

        pushAgent.setMessageHandler(new UmengMessageHandler() {
            @Override
            public Notification getNotification(Context context, UMessage msg) {
                handleUMMessage(PushModule.DidReceiveMessage, msg);
                return super.getNotification(context, msg);
            }

            @Override
            public void dealWithCustomMessage(Context context, UMessage msg) {
                super.dealWithCustomMessage(context, msg);
                handleUMMessage(PushModule.DidReceiveMessage, msg);
            }
        });

        pushAgent.register(new IUmengRegisterCallback() {
            @Override
            public void onSuccess(String s) {
                registrationId = s;
            }

            @Override
            public void onFailure(String s, String s1) {

            }
        });
        pushAgent.onAppStart();

//        pushAgent.setNotificaitonOnForeground(false);
    }

    private void handleNotificationClick(final String event, final UMessage msg) {
        if (pushModule == null) {
            tmpEvent = event;
            tmpMessage = msg;
            return;
        }
        new Handler().postDelayed(new Runnable() {
            public void run() {
                pushModule.sendEvent(event, msg);
            }
        }, 500);
    }

    private void handleUMMessage(String event, UMessage msg) {
        if (pushModule == null) {
            return;
        }
        pushModule.sendEvent(event, msg);
    }
}
