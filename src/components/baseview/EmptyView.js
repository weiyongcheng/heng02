/**
 * 数据为空，常用与跟列表有关的页面中去
 * 稳定版
 * 使用示例：
 * <EmptyView
 *      style={'这里是style，可以自定义'}
 *      source={'自定义图片资源'}
 *      imageStyle={'这里自定义图片的样式'}
 *      description={'为空页面主描述信息'}
 *      subDescription={'副描述信息，如果有值会显示，没值不显示'}
 *      isScrollViewContainer={'是否含有下拉刷新功能'}
 *      isRefresh={'标记当前是否处于下拉刷新状态'}
 *      onRefresh={'包含下拉刷新组件时，下拉刷新调用'}
 * />
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    Keyboard,
    ScrollView,
    StyleSheet,
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native';
import EmptyImage from './source/img_search.png';
import innerConfig from './Config';//配置项

export default class EmptyView extends Component {
    static propTypes = {
        description: PropTypes.string, // 标题描述
        subDescription: PropTypes.string, // 副描述信息
        source: PropTypes.any, // 图片
        imageStyle: PropTypes.any, // 图片样式
        // 含有刷新功能
        isScrollViewContainer: PropTypes.bool,//是否允许下拉刷新
        isRefresh: PropTypes.bool, // 仅仅在isScrollViewContainer 为true时 生效
        onRefresh: PropTypes.func, // 仅仅在isScrollViewContainer 为true时会触发
    };

    static defaultProps = {
        description: '暂无数据', // 标题
        subDescription: '', // 副描述
        isScrollViewContainer: false,
        isRefresh: false,
        onRefresh: () => {
            console.warn('Warn: Check whether set click onRefresh on EmptyView~');
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    // 获取scrollView容器宽高。
    _scrollViewOnLayout = (event) => {
        const {width, height} = event.nativeEvent.layout;
        this.setState({width, height});
    };


    // 渲染正常为空页面
    renderNormalEmptyView = () => {
        const {
            style,
            source,
            imageStyle,
            description,
            subDescription,
        } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, style]}>
                    <Image source={this._getImgSource()} style={[imageStyle]}/>
                    <Text style={styles.description}>{description}</Text>
                    {subDescription ? <Text style={styles.subDescription}>
                            {subDescription}
                        </Text> : null}
                </View>
            </TouchableWithoutFeedback>
        );
    };


    _getImgSource = ()=>{
        const {source} = this.props;
        return source || innerConfig.emptyImage || EmptyImage;
    };

    // 渲染含有下拉刷新的为空页面
    renderScrollViewContainerEmptyView = () => {
        const {
            style,
            source,
            imageStyle,
            description,
            subDescription,
        } = this.props;
        const {width, height} = this.state
        return (
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onLayout={this._scrollViewOnLayout}
                refreshControl={this.renderRefreshControl()}
                style={[styles.scrollViewContainer, style]}
            >

                <View style={[styles.container, { width, height }]}>
                    <Image
                        source={this._getImgSource()}
                        style={[imageStyle]}
                    />
                    <Text style={styles.description}>
                        {description}
                    </Text>
                    {subDescription ? <Text style={styles.subDescription}>{subDescription}</Text> : null}
                </View>

            </ScrollView>
        );
    };

    // 刷新组件头
    renderRefreshControl = () => (<RefreshControl
        refreshing={this.props.isRefresh}
        onRefresh={this.props.onRefresh}
        progressBackgroundColor="#ffffff"
        colors={[innerConfig.themeColor || '#62BEC5']}
    />);

    render() {
        // 根据是否需要支持下拉刷新决定渲染何种类型空页面
        const {isScrollViewContainer} = this.props;
        if (isScrollViewContainer) {
            return this.renderScrollViewContainerEmptyView();
        }
        return this.renderNormalEmptyView();
    }
}


const styles = StyleSheet.create({
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontSize: 13,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
    subDescription: {
        fontSize: 14,
        color: '#bbbbbb',
        marginTop: 9,
    },
});
