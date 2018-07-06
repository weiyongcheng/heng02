/* eslint-disable camelcase */
/**
 * Created by nuomi on 2017/12/13.
 *
 * func: loadingShow(titleText,{timeout,bgColor,loadingTimeout}) 参数都是可以传递，可不传的
 *                   标题， 配置：超时时间，背景颜色，超时回调
 * func: dismiss 隐藏
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    Easing,
    Animated,
    Platform,
    Dimensions,
    StyleSheet,
} from 'react-native';
import LoadingImg from './source/toast_loading.png';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const LOADING_WIDTH = 150;
const LOADING_HEIGHT = 60;

export default class LoadingHub extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleText: null,
            isShow: false,
            bgColor: null,
            rotateValue: new Animated.Value(0),
        };
        this.timeout = null;          //超时时间
        this.timeoutCallBack = null;  //超时回调
        this.__timer__ = null;        //定时器
    }

    componentWillUnmount() {
        this._clearTimer();
    }

    //加载
    loadingShow(titleText = '加载中...', {timeout, bgColor, timeoutCallBack} = {}) {

        if (this.state.isShow) {
            return;
        }

        if (timeout && typeof timeout === 'number') {
            this.timeout = timeout;
        } else {
            this.timeout = null;
        }

        if (timeoutCallBack && typeof timeoutCallBack === 'function') {
            this.timeoutCallBack = timeoutCallBack;
        } else {
            this.timeout = null;
            this.timeoutCallBack = null;
        }

        this.setState({
            titleText: titleText || null,
            bgColor: bgColor || null,
            isShow: true,
        },this.startLoading);

        if (this.timeout && this.timeoutCallBack) {
            this.timer = setTimeout(() => {
                if (this.state.isShow) {
                    this.setState({isShow: false});
                    this.timeoutCallBack && this.timeoutCallBack();
                }
                this._clearTimer();
            }, this.timeout * 1000);
        }
    }

    // 开始动画
    startLoading = ()=>{
        this.state.rotateValue.setValue(0);//首先至为0位置
        Animated.parallel([
            Animated.timing(this.state.rotateValue, {
                toValue: 1,      //角度从0变1
                duration: 1000,  //从0到1的时间
                easing: Easing.out(Easing.linear),//线性变化，匀速旋转
            }),
        ]).start(() => this.judgeWhetherReload());
    };

    // 判断是否继续动画
    judgeWhetherReload = ()=>{
        if (this.state.isShow) {
            this.startLoading();
        } else {
            this.state.rotateValue.setValue(0)
        }
    };

    isLoadingShow = () => {
        return !!this.state.isShow;
    };

    //隐藏
    dismiss(callBack) {
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
    }

    //清空定时器
    _clearTimer = () => {
        if (this.__timer__) {
            clearInterval(this.__timer__);
            this.__timer__ = null;
        }
        this.loadingTimeout = null;
    };

    //loading部分
    _renderCircleProgress = () => {
        return (<Animated.Image style={{
            transform: [{
            rotateZ: this.state.rotateValue.interpolate({
                inputRange: [0,1],
                outputRange: ['0deg','360deg']
            })
        }]}} source={LoadingImg}/>);
    };

    //文字部分
    _renderTextContent = () => {
        if (!this.state.titleText || (typeof this.state.titleText !== 'string')) {
            return null;
        }
        return (<Text numberOfLines={1}
                      allowFontScaling={false}
                      style={styles.loadingText}>
            {this.state.titleText}
        </Text>);
    };


    render() {
        if (!this.state.isShow) {
            return null;
        }

        const backgroundColor = this.state.bgColor || 'transparent';
        return (
            <View style={[styles.container,{backgroundColor}]}>
                <View pointerEvents={'none'} style={styles.loadingBody}>
                    {this._renderCircleProgress()}
                    {this._renderTextContent()}
                </View>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingBody: {
        width: LOADING_WIDTH,
        height: LOADING_HEIGHT,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        padding: 10,
    },
    loadingText: {
        marginLeft: 10,
        color: 'white',
        fontSize: 14,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

