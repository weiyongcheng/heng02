/* eslint-disable camelcase */
/**
 * Created by nuomi on 2017/12/13.
 * Toast 弹框
 *
 * func: showToast(title , {duration,toastHiddenCallBack}) title 必传
 *                  标题， 子标题     配置：尺寸时间，隐藏回调
 * func: dismiss 隐藏
 *
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';
import SuccessImg from './source/toast_right.png';
// 自定义组件库
const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedDuration = 150;// 默认的动画持续时间
const ShowTimeDuration = 2.0;// 弹框展示时间，单位S秒,默认2.0S


export default class ToastView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            title: '',
            isShow: false,
            opacity: new Animated.Value(0),       //透明度
            bounceValue: new Animated.Value(0.7), //面板尺寸
        };
        this.__timer__ = null;
        this.toastHiddenCallBack = null;
    }

    // 组件消失的时候调用
    componentWillUnmount() {
        this._clearTimer();
    }


    /***
     * 弹框展示
     * @param title      主标题
     * @param duration   持续时间 默认2秒
     * @param toastHiddenCallBack toast在指定时间结束后的回调
     */
    showToast = (title, {duration, toastHiddenCallBack, type, icon}) => {

        if (this.state.isShow) {
            return;
        }

        if (!title || typeof title !== 'string') {
            console.warn(`showToast Error:\n title is required, type String`);
            return;
        }

        this._clearTimer();

        this.toastHiddenCallBack = toastHiddenCallBack && typeof toastHiddenCallBack === 'function' ? toastHiddenCallBack : null;
        duration = duration && typeof duration === 'number' ? duration : ShowTimeDuration;

        this.setState({
            title,
            type,
            icon,
            isShow: true,
        }, () => {
            this.state.opacity.setValue(0.5);
            Animated.parallel([
                Animated.spring(
                    this.state.bounceValue,
                    {
                        toValue: 1,
                        friction: 6,
                        tension: 60,
                    }
                ),
                Animated.timing(
                    this.state.opacity,
                    {
                        toValue: 1,
                        duration: AnimatedDuration,
                    }
                )
            ]).start();

            this.__timer__ = setInterval(() => {
                this.state.opacity.setValue(0);
                this.state.bounceValue.setValue(0.7);
                this.setState({isShow: false});
                if (this.toastHiddenCallBack) {
                    this.toastHiddenCallBack();
                }
                this._clearTimer();
            }, duration * 1000);
        });

    };

    // 隐藏toast
    dismiss = (callBack) => {
        this._clearTimer();
        if (this.state.isShow) {
            this.setState({
                isShow: false,
            }, () => {
                callBack && typeof callBack === 'function' && callBack();
            });
        } else {
            callBack && typeof callBack === 'function' && callBack();
        }
    };

    //是否正在展示
    isToastShow = () => {
        return !!this.state.isShow;
    };

    _clearTimer = () => {
        if (this.__timer__) {
            clearInterval(this.__timer__);
            this.__timer__ = null;
        }
    };

    render() {
        if (!this.state.isShow) {
            return null;
        }
        const {type,icon} = this.state;
        const hadIcon = (type === 'success') || !!icon;
        return (
            <View pointerEvents="none" style={styles.container}>
                <Animated.View style={[styles.sheetBlackPanel, {
          opacity: this.state.opacity,
          transform: [
            { scale: this.state.bounceValue },
          ],
        },hadIcon ? {
              height: 100,
                } : null]}
                >
                    {
                        hadIcon ? <Image source={ icon ? icon : SuccessImg}/> : null
                    }
                    <Text allowFontScaling={false}
                          style={[styles.title,hadIcon ? {marginTop: 8} : null]}
                          numberOfLines={2}>
                        {this.state.title || ''}
                    </Text>
                </Animated.View>
            </View>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetBlackPanel: {// 黑色背景
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        width: 200,
        height: 60,
        padding: 10,
    },
    title: {// 主title
        color: 'white',
        fontSize: 14,
        lineHeight: 18,
    },
});
