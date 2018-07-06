/**
 * Created by wjyx on 2017/5/25.
 * 后期可根据项目中使用的
 * loading展示页面
 * 使用示例：
 * <LoadingView style={'这里是style，可以自定义'}/>
 * <LoadingView style={'这里是style，可以自定义'} source={GifImg} imgStyle={{width: 100, height: 100}}/>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import loading from './source/loading.gif'; //loading gif 图片


export default class LoadingView extends Component {

    static propTypes = {
        style: PropTypes.any,    // 样式
        source: PropTypes.any,   // loading-gif图片
        imgStyle: PropTypes.any, // gif样式
    };


    // 渲染Gif图片或者系统自带的loading图片
    _renderLoading = (source,imgStyle)=>{
      if (source){
        return (<Image style={imgStyle} source={source}/>);
      } else {
        return (<ActivityIndicator
            animating={true}
            color={'gray'}
            size={'small'}
        />);
      }
    };

    render() {
      const {
          style,
          source,
          imgStyle
      } = this.props;
      return (<View style={[styles.container,style]}>
        {this._renderLoading(source,imgStyle)}
      </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
    },
});

