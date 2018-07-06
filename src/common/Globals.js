import React, {Component} from 'react';
import {
    Platform,
    PixelRatio,
    Dimensions,
} from 'react-native';

global.__SCREEN_WIDTH__ = Dimensions.get('window').width;
global.__SCREEN_HEIGHT__ = Dimensions.get('window').height;
global.__PIXEL__ = 1.0 / PixelRatio.get();

const MAX_SCREEMT = Math.max(Dimensions.get('window').width,Dimensions.get('window').height);
const MIN_SCREEMT = Math.min(Dimensions.get('window').width,Dimensions.get('window').height);

global.__MAX_SCREEMT__ = MAX_SCREEMT;
global.__MIN_SCREEMT__ = MIN_SCREEMT;

global.__MAX_PIXEL__ = MAX_SCREEMT / 667.0;
global.__MIN_PIXEL__ = MIN_SCREEMT / 375.0;

global.__IOS__ = Platform.OS === 'ios';
global.__ANDROID__ = Platform.OS === 'android';
global.__IPHONEX__ = (Platform.OS === 'ios') && (MIN_SCREEMT === 375.00 && MAX_SCREEMT === 812.0);

global.__WIFI_CONNET__ = false;
global.__LOGIN_SUCCESS = true;