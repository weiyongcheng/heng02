/**
 * 网络错误控件
 *
 * a.后台接口或http网络层级的错误，此时netFailedInfo 为网络库的返回值
 * b.业务代码catch到的错误  此时netFailedInfo 为try-catch中的error
 *
 * //最简使用示例：
 * <NetFailedView callback={点击重新加载的回调函数} netFailedInfo={'出错的信息'}/>
 *
 * //高度自定义示例：
 * <NetFailedView
 *      style={'这里是style，可以自定义'}
 *      imageStyle={'这里自定义图片的样式'}
 *      source={'自定义图片资源'}
 *      showReloadBtn={'是否展示重新加载按钮'}
 *      netFailedInfo={'出错的信息'}
 *      callback={() => {console.warn('在这里做点击回调，回调包括后面的参数都是可省的，不传使用默认');}}
 *      title={'这是错误页面的title，在错误图片下方  可以不传，也尽量不要传'}
 *      buttonText={'这是按钮上的文字'}
 * />
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import innerConfig from './Config';//配置项
import NetNotConnectImage from './source/net_error.png'; //用于断网，超时展示
import ServerErrorImage from './source/server_error.png'; //用于其他网络请求展示
const BugErrorCode = -666000;       //异常错误，请稍后再试 js bug error
const UnKnowErrorCode = -666001;    //未知错误 (netFailedInfo为空)
const NetUnKnowErrorCode = -666002; //未知错误,请稍后再试 (网络错误，但是没有错误码)

export default class NetFailedView extends Component {

    static propTypes = {
        netFailedInfo: PropTypes.object.isRequired,// 错误，来自ApiProvider 或者 标准error
        callback: PropTypes.func.isRequired,       // 点击加载的回调函数
        showReloadBtn: PropTypes.bool,// 是否展示重新加载按钮
        title: PropTypes.string,        // 标题展示内容
        buttonText: PropTypes.string,   // 重新加载按钮title
        //图片以及样式
        style: PropTypes.any,           // 样式
        source: PropTypes.any,          // 图片素材
        imageStyle: PropTypes.any,      // 图片样式
    };

    // 默认属性
    static defaultProps = {
        buttonText: '重新加载', // 重新加载按钮title
        showReloadBtn: true,
        callback: () => {
            console.warn('Warn: Check whether set callback function on NetFailedView~');
        },
    };


    //重新加载
    _onPress = async() => {
        const {callback} = this.props;
        callback && callback();
    };


    // 解析失败原因
    _getErrorInfo = ()=>{
        const {
            netFailedInfo = {
                resultCode: UnKnowErrorCode,
                resultDesc: '未知错误',
            },// 没有设置出错信息
        } = this.props;

        if (netFailedInfo instanceof Error) {
            return {
                resultCode: BugErrorCode,
                resultDesc: '异常错误，请稍后再试',
            };
        } else {
            return {
                resultCode: netFailedInfo.resultCode || NetUnKnowErrorCode,
                resultDesc: netFailedInfo.resultDesc || '未知错误,请稍后再试',
            };
        }
    };


    // 获取需要展示的图片资源,如果是网络问题，展示断网图片，否则返回外部设置的，或者默认的错误图片
    _getImgSource = (source,resultCode)=>{
        const {
            netNotConnectImage,
            serverErrorImage
        } = innerConfig;
        if (Platform.OS === 'ios'){
            // ios -1001 连接超时 -1009 网络无连接
            return (resultCode === -1001 || resultCode === -1009) ? (netNotConnectImage || NetNotConnectImage) : (source || serverErrorImage || ServerErrorImage);
        } else {
            // android 1006 连接超时 1007 网络无连接
            return (resultCode === 1006 || resultCode === 1007) ? (netNotConnectImage || NetNotConnectImage) : (source || serverErrorImage || ServerErrorImage);
        }
    };

    render() {
        const {
            title,
            style,
            source,
            imageStyle,
            buttonText,
            showReloadBtn
        } = this.props;
        const {
            resultCode,
            resultDesc
        } = this._getErrorInfo();

        const btnStyle = [styles.btn];
        innerConfig.themeColor && btnStyle.push({
            backgroundColor: innerConfig.themeColor
        });

        return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.container, style]}>

            <Image source={this._getImgSource(source,resultCode)} style={imageStyle}/>

            <Text style={styles.titleStyle}>
                {title || resultDesc}
            </Text>

              {/*  如果网络连接成功，但是出错。此时显示错误码，方便通过错误码查询问题  */}
              {resultCode ? <Text numberOfLines={4} style={styles.errorCodeStyle}>
                      {BugErrorCode === resultCode ? this.props.netFailedInfo.toString()  : `（错误码：${resultCode}）`}
                  </Text> : null}

              {showReloadBtn ? <TouchableOpacity activeOpacity={0.5} style={btnStyle} onPress={this._onPress}>
                    <Text style={styles.btnText}>
                        {buttonText}
                    </Text>
                  </TouchableOpacity> : null}

          </View>
        </TouchableWithoutFeedback>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 13,
        color: '#888888',
        marginTop: 40,
    },
    errorCodeStyle: {
        fontSize: 11,
        color: '#bbbbbb',
        marginTop: 8,
        maxWidth: Dimensions.get('window').width - 60,
    },
    btn: {
        height: 40,
        marginTop: 20,
        borderRadius: 6,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#62BEC5',
    },
    btnText: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
    },
});
