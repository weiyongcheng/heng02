/**
 * Created by nuomi on 2017/12/29.
 * 稳定版
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import innerConfig from './Config';//配置项
import AgreeIcon from './source/register_agree.png';//同意按钮选中
import NoAgreeIcon from './source/register_no_agree.png';//同意按钮非选中

export default class CheckBox extends Component {

    static propTypes = {
        selectedIcon: PropTypes.any,   // 选中icon
        unSelectedIcon: PropTypes.any, // 非选中icon
        onClick: PropTypes.func.isRequired,       // 点击回调
        isSelected: PropTypes.bool.isRequired,     // 是否选中
        style: PropTypes.any,          // 样式
        iconStyle: PropTypes.any,      // icon样式
    };

    state = {
        bounceValue: new Animated.Value(1),//logo 尺寸
    };

    //点击事件
    _clickAgree = ()=>{
        const {onClick} = this.props;
        onClick && onClick();
        Animated.sequence([
            Animated.timing(
                this.state.bounceValue,
                {
                    toValue: 1.15,
                    duration: 200,
                }
            ),
            Animated.timing(
                this.state.bounceValue,
                {
                    toValue: 1,
                    duration: 200,
                }
            )
        ]).start();
    };

    render() {
        let {
            style,
            iconStyle,
            isSelected,
            selectedIcon,
            unSelectedIcon,
        } = this.props;
        selectedIcon = selectedIcon || innerConfig.checkBoxSelectedIcon || AgreeIcon;
        unSelectedIcon = unSelectedIcon || innerConfig.checkBoxUnSelectedIcon || NoAgreeIcon;
        const source = isSelected ? selectedIcon : unSelectedIcon;
        const transform = [{scale: this.state.bounceValue}];
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this._clickAgree}>
              <View style={[styles.container,style]}>
                <Animated.Image style={[iconStyle,{transform}]}
                                source={source} />
              </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
});
