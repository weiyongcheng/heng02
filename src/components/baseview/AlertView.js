/**
 * Created by nuomi on 2017/12/13.
 * 自定义弹框
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Modal,
    Animated,
    Keyboard,
    Dimensions,
    PixelRatio,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AlertView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',      // 标题
            titleColor: null,
            titleStyle: null,
            subTitle: '',   // 子标题
            subTitleColor: null,
            subTitleStyle: null,
            message: '',    // 内容
            messageColor: null,
            messageStyle: null,
            isCancelShow: true,
            okCallBack: null,
            cancelCallBack: null,
            confirmText: '确定',
            cancelText: '取消',
            cancelTextColor: '#999',
            confirmTextColor: '#333',
            backOpacity: new Animated.Value(0), // 背景颜色
            bounceValue: new Animated.Value(0.85), // plane 尺寸
            bottom: new Animated.Value(0), // plane 尺寸
            isShow: false,
        };
    }


    // 展示弹框
    alertShow = (obj = {}) => {
        Keyboard.dismiss();
        if (this.state.isShow) { // 已显示状态下，直接隐藏
            return;
        }
        const {
            title = '',
            subTitle = '',
            subTitleColor = null,
            subTitleStyle = null,
            message = '',
            messageColor = '#6B6B76',
            confirmText = '确定',
            confirmTextColor = '#333',
            cancelText = '取消',
            cancelTextColor = '#999',
            okCallBack,
            isCancelShow,
            cancelCallBack,
        } = obj;

        if (this.state.bottom._value !== 0) {
            this.state.bottom.setValue(0);
        }

        this.setState({
            title: title || message,
            message: title ? message : null,
            messageColor,
            subTitle,
            subTitleColor,
            subTitleStyle,
            isCancelShow: isCancelShow !== false,
            confirmText,
            cancelText,
            confirmTextColor,
            cancelTextColor,
            isShow: true,
            okCallBack,
            cancelCallBack,
        }, () => {
            Animated.parallel([
                Animated.timing(
                    this.state.backOpacity,
                    {
                        toValue: 1,
                        duration: 120,
                    }
                ),
                Animated.spring(
                    this.state.bounceValue,
                    {
                        toValue: 1,
                        friction: 6,
                        tension: 60,
                    }
                ),
            ]).start();
        });
    };


    // 隐藏弹框
    dismiss = (callBack) => {
        if (this.state.isShow) {
            this.setState({
                isShow: false,
            }, () => {
                this.state.backOpacity.setValue(0);
                this.state.bounceValue.setValue(0.85);
                callBack && callBack();
            });
        } else {
            callBack && callBack();
        }
    };

    isAlertShow = () => !!this.state.isShow;


    // title
    renderTitleView = (title, message) => {
        if (!title) {
            return null;
        }
        const style = {minHeight: 65, alignItems: 'center', justifyContent: 'center'};
        const scrollView = {flex: 1, minHeight: 0, maxHeight: 91};
        if (!message) {
            return (
                <View style={style}>
                    <ScrollView showsVerticalScrollIndicator={false}
                                style={scrollView}
                                bounces={false}>
                        <View style={style}>
                            <Text allowFontScaling={false}
                                  style={[styles.title, {textAlign: 'center'}]}>
                                {title}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            );
        }
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text allowFontScaling={false}
                      numberOfLines={1} style={[styles.title,this.state.message ? {marginBottom: 12} : null]}>
                    {title}
                </Text>
            </View>
        );
    };

    //子标题
    renderSubTitleView = (subTitle) => {
        if (!subTitle) {
            return null;
        }
        return (
            <Text allowFontScaling={false}
                  numberOfLines={2} style={
        [styles.desc,
          {textAlign: 'left'},
          this.state.message ? {marginBottom: 12} : null]
      }>
                {subTitle}
            </Text>
        );
    };

    // 描述
    renderDescView = (message) => {
        if (!message) {
            return null;
        }
        const style = {minHeight: 36, alignItems: 'center', justifyContent: 'center'};
        //如果有子标题的时候，修改样式
        if (this.state.subTitle) {
            style.backgroundColor = '#F6F6F6';
            style.padding = 10;
            style.paddingVertical = 8;
        }
        const colorStyle = this.state.messageColor ? {color: this.state.messageColor} : null;
        return (<ScrollView showsVerticalScrollIndicator={false}
                            style={[styles.scrollView, {maxHeight: 82}]}
                            bounces={false}>
            <View style={style}>
                <Text allowFontScaling={false}
                      style={[styles.desc, colorStyle]}>
                    {message}
                </Text>
            </View>
        </ScrollView>);
    };

    // 取消按钮
    renderCancelBtn = () => {
        if (!this.state.isCancelShow) {
            return null;
        }
        return (<TouchableHighlight
            underlayColor={'rgba(0,0,0,0.1)'}
            onPress={this._clickCancelBtn}
            style={styles.buttonItemsContainer}>
            <View>
                <Text
                    allowFontScaling={false}
                    style={[styles.buttonItems, {color: this.state.cancelTextColor || '#6B6B76'}]}
                >{this.state.cancelText}
                </Text>
            </View>
        </TouchableHighlight>);
    };


    // 安卓返回关闭
    _onRequestClose = ()=>{
        if(this.state.isCancelShow === false) return;
        this._clickCancelBtn();
    };

    //点击取消
    _clickCancelBtn = () => {
        this.state.cancelCallBack && this.state.cancelCallBack();
        this.dismiss();
    };

    //点击确定
    _clickOkBtn = () => {
        this.state.okCallBack && this.state.okCallBack();
        this.dismiss();
    };


    // 渲染确认按钮
    renderOkBtn = () => {
        let btnDisabled = false;

        const isCancelShowStyle = {
            borderLeftWidth: 1.0 / PixelRatio.get(),
            borderLeftColor: '#e5e5e5',
        };

        return (<TouchableHighlight
            underlayColor={'rgba(0,0,0,0.1)'}
            disabled={btnDisabled}
            onPress={this._clickOkBtn}
            style={[styles.buttonItemsContainer, this.state.isCancelShow ? isCancelShowStyle : null]}
        >
            <View>
                <Text
                    allowFontScaling={false}
                    style={[styles.buttonItems, {color: btnDisabled ? '#bbbbbb' : this.state.confirmTextColor}]}
                >
                    {this.state.confirmText}
                </Text>
            </View>
        </TouchableHighlight>);
    };


    //渲染主题内容
    _renderContent = () => {

        let subTitleContent = this.renderSubTitleView(this.state.subTitle);

        return (<View
            style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 20,justifyContent: 'center',}}>

            {this.renderTitleView(this.state.title, this.state.message)}
            {subTitleContent}
            {this.renderDescView(this.state.message)}
        </View>);
    };


    render() {
        if (!this.state.isShow) { // 隐藏弹框
            return null;
        }
        const opacity = this.state.backOpacity;
        return (<Modal onRequestClose={this._onRequestClose} transparent={true}>
            <Animated.View style={[styles.container, {opacity}]}>
                <Animated.View style={[styles.whitePanel, {
              transform: [{
                  scale: this.state.bounceValue,
              }]
          }]}>
                    {this._renderContent()}
                    <View style={{backgroundColor: '#e5e5e5', height: 1.0 / PixelRatio.get(),}}/>
                    <View style={styles.buttonContainers}>
                        {this.renderCancelBtn()}
                        {this.renderOkBtn()}
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>);
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // backgroundColor: 'rgba(0,0,0,0.5)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //白色底面板
    whitePanel: {
        width: (290 / 375) * SCREEN_WIDTH,
        minHeight: (150 / 667) * SCREEN_WIDTH,
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
    },
    //内容
    titleDesc: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'PingFangSC-Regular',
        letterSpacing: 1 / PixelRatio.get(),
    },
    scrollView: {
        minHeight: 36,
        maxHeight: 73,
    },
    desc: {
        fontSize: 14,
        color: '#6B6B76',
        textAlign: 'left',
        lineHeight: 18,
        fontFamily: 'PingFangSC-Regular',
        letterSpacing: 1 / PixelRatio.get(),
    },
    //按钮
    buttonContainers: {
        height: 45,
        flexDirection: 'row',
        borderTopColor: '#e5e5e5',
        borderTopWidth: 1.0 / PixelRatio.get(),
    },
    buttonItemsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonItems: {
        fontSize: 16,
        color: '#474747',
        textAlign: 'center',
    }
});
