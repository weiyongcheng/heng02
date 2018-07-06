/**
 * Created by shentu on 2017/11/16.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Text,
    View,
    Image,
    Platform,
    StatusBar,
    PixelRatio,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import BackIcon from './source/icon_header_back.png';
const MAX_SCREEMT = Math.max(Dimensions.get('window').width,Dimensions.get('window').height);
const MIN_SCREEMT = Math.min(Dimensions.get('window').width,Dimensions.get('window').height);
const IPHONEX = (MIN_SCREEMT === 375.00 && MAX_SCREEMT === 812.0);
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class XGNavigatorBar extends Component {

    static defaultProps = {

        title: '',

        leftNavImage: BackIcon,
        leftNavTitle: '',
        leftNavItemHidden: false,

        rightNavTitle: '',
        rightNavImage: null,
        rightNavItemHidden: false,

        hideNavBar: false,
        statusBarStyle: 'default',
        leftPressed: () => {
            console.warn('make sure you set leftPressed func~');
        },
        rightPressed: () => {
            console.warn('make sure you set rightPressed func~');
        },
    };

    static propTypes = {

        headerStyle: PropTypes.object,
        title: PropTypes.string,
        titleStyle: PropTypes.object,

        leftNavTitle: PropTypes.string,
        leftNavImage: PropTypes.any,
        leftNavItemHidden: PropTypes.bool,

        rightNavTitle: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.element,
        ]),
        rightNavImage: PropTypes.any,
        rightNavItemHidden: PropTypes.bool,

        hideNavBar: PropTypes.bool,
        statusBarStyle: PropTypes.string,
        leftPressed: PropTypes.func,
        rightPressed: PropTypes.func,
    };

    constructor(props) {
        super(props);
        const {
            title,
            leftNavItemHidden,
            rightNavItemHidden,
        } = this.props;
        this.state = {
            title,
            leftNavItemHidden,
            rightNavItemHidden,
        };
    }

    //修改bar title 然后回调
    changeTitle = (newTitle, callBack) => {
        this.setState({
            title: (newTitle && typeof newTitle === 'string') ? newTitle : ''
        }, () => {
            callBack && callBack();
        });
    };

    hiddenLeftItem = (hidden, callBack) => {
        this.setState({
            leftNavItemHidden: !!hidden
        }, () => {
            callBack && callBack();
        });
    };

    hiddenRightItem = (hidden, callBack) => {
        this.setState({
            rightNavItemHidden: !!hidden
        }, () => {
            callBack && callBack();
        });
    };


    _onLeftPressed = () => {
        this.props.leftPressed && this.props.leftPressed();
    };

    _onRightPressed = () => {
        this.props.rightPressed && this.props.rightPressed();
    };

    //左边item
    _renderLeftItem = () => {
        const {
            leftNavImage,
            leftNavTitle,
        } = this.props;

        if (this.state.leftNavItemHidden) {
            return null;
        }

        return (leftNavImage ?
            <TouchableOpacity style={[styles.left, { paddingLeft: 20 }]} onPress={this._onLeftPressed}>
                <Image
                    source={leftNavImage}
                    resizeMode={'stretch'}
                    style={{ height: 20, width: 20 }}
                />
            </TouchableOpacity> :
            (leftNavTitle && <TouchableOpacity style={styles.left} onPress={this._onLeftPressed}>
                <Text numberOfLines={1}
                      allowFontScaling={false}
                      style={styles.button}>
                    {leftNavTitle || ''}
                </Text>
            </TouchableOpacity>));
    };

    //右边item
    _renderRightItem = () => {
        const {
            rightNavImage,
            rightNavTitle,
        } = this.props;
        if (this.state.rightNavItemHidden || (!rightNavImage && !rightNavTitle)) {
            return null;
        }
        return (rightNavImage ?
            <TouchableOpacity style={styles.right} onPress={this._onRightPressed}>
                <View>
                    <Image source={rightNavImage}/>
                </View>
            </TouchableOpacity> :
            (rightNavTitle && <TouchableOpacity style={styles.right} onPress={this._onRightPressed}>
                <Text style={styles.button}>{rightNavTitle || ''}</Text>
            </TouchableOpacity>));
    };

    _renderTitle = () => {
        const {
            title,
        } = this.state;
        return (<Text style={styles.title} numberOfLines={1}>{title || ""}</Text>);
    };

    _renderStatusBar = () => {
        if (Platform.OS === 'android') {
            return null;
        }
        const {statusBarStyle} = this.props;
        const _statusBarStyle = (statusBarStyle && ['light-content', 'default'].indexOf(statusBarStyle) >= 0) ? statusBarStyle : 'default';
        return (<StatusBar barStyle={_statusBarStyle}/>);
    };

    render() {
        if (this.props.hideNavBar) {
            return null;
        }

        const {
            headerStyle,
        } = this.props;

        return (
            <View style={[styles.navBar,headerStyle]}>
                {this._renderStatusBar()}
                {this._renderLeftItem()}
                {this._renderTitle()}
                {this._renderRightItem()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    navBar: { //考虑适配 iPhone X
        width: SCREEN_WIDTH,
        height: Platform.OS === 'ios' ? (IPHONEX ? 88 : 64) : 44,
        paddingTop: Platform.OS === 'ios' ? (IPHONEX ? 44 : 20) : 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
        borderBottomWidth: 1.0 / PixelRatio.get(),
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 18,
        color: '#474747',
        fontWeight: '400',
        backgroundColor: 'transparent',
    },
    left: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? (IPHONEX ? 44 : 20) : 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    leftImage: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? (IPHONEX ? 44 : 20) : 0,
        left: 40,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    right: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? (IPHONEX ? 44 : 20) : 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    button: {
        color: '#333333',
        fontSize: 15,
    },
});

