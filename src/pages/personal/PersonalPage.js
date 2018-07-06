import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import float_bg_img from '../home/sources/float_bg.png';
import bg_img from '../home/sources/bg.png';

import fankui_img from './sources/fankui.png';
import aboutus_img from './sources/aboutus.png';
import qingchu_img from './sources/qingchuhuancun.png';
import cuowu_img from './sources/cuowu.png';
import banben_img from './sources/banben.png';
import gengxin_img from './sources/gengxin.png';

import YijianComponent from './components/YijianComponent';
import ZuixinbanbenComponent from './components/ZuixinbanbenComponent';
import Dangqianbanben from './components/Dangqianbanben';

export default class PersonalPage extends Component{

    state = {pos: 0};

    _onPress = (pos) => {
        this.setState({pos})
    };

    render() {
        const {pos} = this.state;
        return (
            <View style={styles.container}>
                {this._renderNavBar('个人设置')}

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <ImageBackground source={bg_img} style={{width: 159, height: __MIN_SCREEMT__ - 43}}>
                        <ScrollView style={{flex: 1}}>
                            <View style={{width: 1, height: 9}} />
                            <TouchableWithoutFeedback onPress={() => this._onPress(0)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 0 ? '#442CB3' : '#5845E0',
                                    borderRadius: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={fankui_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>意见反馈</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onPress(1)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 1 ? '#442CB3' : '#5845E0', borderRadius: 5,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={aboutus_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>关于我们</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onPress(2)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 2 ? '#442CB3' : '#5845E0', borderRadius: 5,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={qingchu_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>清楚缓存</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onPress(3)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 3 ? '#442CB3' : '#5845E0', borderRadius: 5,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={cuowu_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>错误上传</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onPress(4)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 4 ? '#442CB3' : '#5845E0', borderRadius: 5,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={banben_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>当前版本</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this._onPress(5)}>
                                <View style={{width: 141, height: 50, alignSelf: 'center', backgroundColor: pos === 5 ? '#442CB3' : '#5845E0', borderRadius: 5,
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 9}}>
                                    <Image source={gengxin_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                                    <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>更新版本</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </ScrollView>
                    </ImageBackground>

                    <View style={{flex: 1, backgroundColor: '#4B31C2'}}>
                        {pos === 0 &&  <YijianComponent/>}
                        {pos === 4 &&  <Dangqianbanben/>}
                        {pos === 5 &&  <ZuixinbanbenComponent/>}
                    </View>
                </View>

            </View>
        );
    }

    _renderNavBar = (title) => {
        return (
            <View style={{width: __MAX_SCREEMT__, height: 43, backgroundColor: '#442CB3', flexDirection: 'row', alignItems: 'center'}}>
                <TouchableWithoutFeedback onPress={() => {
                    const {navigation} = this.props;
                    navigation.pop();
                }}>
                    <View>
                        <ImageBackground source={rectangle_img} style={{width: 78, height: 42, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={return_img} style={{width: 29, height: 29}}/>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>



                <Text style={{fontSize: 14, color: '#ffffff', marginLeft: 11}}>{title}</Text>
            </View>
        );
    };

    _renderItem = (image, title) => {
        return (
            <View style={{width: 141, height: 50, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={image} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                <Text style={{fontSize: 16, color: '#ffffff', marginLeft: 9}}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: __MAX_SCREEMT__,
        height: __MIN_SCREEMT__,
    }
});