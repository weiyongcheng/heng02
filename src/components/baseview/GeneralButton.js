/**
 * Created by wjyx on 2017/6/5.
 *
 * 通用按钮组件
 * 1：withoutFeedback 为true表示该按钮没有高亮状态
 * 2：默认高亮状态下背景颜色和字体颜色参考defaultProps
 * 3：禁止通过ref直接控制本按钮是否不可用
 * 4: 本按钮默认高度是45px,有需要的自己通过style修改
 */

/*
 * sample
 *
 * <GeneralButton
 * withoutFeedback={false}
 * disabled={this.state.payButtonDisabled}
 * click={this.clickPayButton}
 * style={styles.payButton}
 * title={'点击我'}/>
 * */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import innerConfig from './Config';

export default class GeneralButton extends Component {

    static propTypes = {

        title: PropTypes.string,//按钮标题
        click: PropTypes.func,//点击按钮回调函数

        highlightBgColor: PropTypes.string,   //按钮高亮背景颜色 (withoutFeedback false时无效)
        highlightTitleColor: PropTypes.string,//按钮高亮文字颜色 (withoutFeedback false时无效)

        disabledBgColor: PropTypes.string,//不可用状态下，按钮背景颜色
        disabledTitleColor: PropTypes.string,//不可用状态下，按钮文字颜色

        withoutFeedback: PropTypes.bool, //无高亮效果
        disabled: PropTypes.bool,        //按钮是否可用

        style: PropTypes.any,//按钮样式
        textStyle: PropTypes.any,//按钮文字样式
    };

    static defaultProps = {
        click: () => {
            console.warn('Warn: Check whether set click function on GeneralButton~');
        },

        withoutFeedback: false,
        disabled: false,

        highlightTitleColor: '#ffffff',
        //
        disabledTitleColor: '#ffffff',

    };

    constructor(props) {
        super(props);
        this.state = ({
            highLight: false,
        });
    }


    onPress = () => {
        //添加节流500ms   0.5S内仅仅响应第一次点击操作，防止操作过于频繁
        if (this.__timer__) return;
        this.__timer__ = setTimeout(() => {
            clearTimeout(this.__timer__);
            this.__timer__ = null;
        }, 500);
        this.props.click();
    };

    componentWillUnmount() {
        this.__timer__ && clearTimeout(this.__timer__);
    }

    // 没有高亮状态的按钮
    renderWithoutFeedbackButton = () => {
        const {
            title,
            style,
            textStyle,
            disabled,
            disabledBgColor,
            disabledTitleColor,
        } = this.props;

        // 设置不可用状态样式
        const btnContainer = [styles.btnContainer];
        btnContainer.push({
            backgroundColor: innerConfig.themeColor || '#62BEC5',
        });
        btnContainer.push(style);
        disabled && btnContainer.push({
            backgroundColor: disabledBgColor || innerConfig.disableThemeColor || '#C6E7EA',
        });
        const titleTextStyle = [styles.textStyle, textStyle,];
        disabled && disabledTitleColor && titleTextStyle.push({
            color: disabledTitleColor
        });

        return (<TouchableOpacity activeOpacity={1}
                                  style={btnContainer}
                                  disabled={disabled}
                                  onPress={this.onPress}>
            <Text style={titleTextStyle}>
                {title}
            </Text>
        </TouchableOpacity>);
    };

    render() {
        if (this.props.withoutFeedback === true) {
            return this.renderWithoutFeedbackButton();
        }

        const {
            title,
            style,
            textStyle,
            disabled,
            highlightBgColor,
            highlightTitleColor,
            disabledBgColor,
            disabledTitleColor,
        } = this.props;

        const btnContainer = [styles.btnContainer];
        btnContainer.push({
            backgroundColor: innerConfig.themeColor || '#62BEC5',
        });
        btnContainer.push(style);
        // 不可用状态
        disabled && btnContainer.push({
            backgroundColor: disabledBgColor || innerConfig.disableThemeColor || '#C6E7EA',
        });
        const underlayColor = highlightBgColor || innerConfig.highlightBgColor || '#C6E7EA';

        const titleTextStyle = [styles.textStyle,textStyle];
        // 高亮状态
        this.state.highLight && highlightTitleColor && titleTextStyle.push({
            color: highlightTitleColor,
        });
        // 不可用状态
        disabled && disabledTitleColor && titleTextStyle.push({
            color: disabledTitleColor
        });

        return (<TouchableHighlight underlayColor={underlayColor}
                                    disabled={disabled}
                                    style={[btnContainer, this.props.style]}
                                    onShowUnderlay={()=>{
                                        this.setState({highLight: true});
                                    }}
                                    onHideUnderlay={()=>{
                                        this.setState({highLight: false});
                                    }}
                                    onPress={this.onPress}>
            <View>
                <Text style={titleTextStyle}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>);
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        height: 45,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#ffffff',
        fontSize: 16,
    }
});
