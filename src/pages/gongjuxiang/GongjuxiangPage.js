import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';

import NavBarComponent from '../../components/NavBarComponent';
import FengcheComponent from '../../components/FengcheComponent';

import bg_img from '../home/sources/bg.png';
import star_bg from '../home/sources/star_bg.png';
import tuijian_img from './sources/tuijian.png';
import xuerang_img from './sources/xuetang.png';
import redu_img from './sources/redu.png';
import jisuan_img from './sources/jisuan.png';
import caipiaozhan_img from './sources/caipiaozhan.png';
import jingqingqidai_img from './sources/jingqingqidai.png';
import JiangjinjisuanPage from "./JiangjinjisuanPage";

export default class GongjuxiangPage extends Component {

    render() {

        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>

                <NavBarComponent title={'工具箱'}/>

                <ImageBackground source={bg_img} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} >

                    <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('HaommatuijianPage')
                        }}>
                            <View>
                                <ImageBackground source={star_bg} style={{width: 141, height: 124, alignItems: 'center', justifyContent: 'center'}} resizeMode={'stretch'}>
                                    <Image source={tuijian_img} />
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 16}}>号码推荐</Text>
                                    <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>预测号码，娱乐选号</Text>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('XuetangPage')
                        }}>
                            <View>
                                <ImageBackground source={star_bg} style={{width: 141, height: 124,
                                    alignItems: 'center', justifyContent: 'center', marginLeft: 18}} resizeMode={'stretch'}>
                                    <Image source={xuerang_img} />
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 16}}>彩票学堂</Text>
                                    <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>教你玩转彩票规则</Text>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>


                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('TouzhureduPage')
                        }}>
                            <View>
                                <ImageBackground source={star_bg} style={{width: 141, height: 124,
                                    alignItems: 'center', justifyContent: 'center', marginLeft: 18}} resizeMode={'stretch'}>
                                    <Image source={redu_img} />
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 16}}>号码热度</Text>
                                    <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>查看下注号码热度</Text>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('JiangjinjisuanPage')
                        }}>
                            <View>
                                <ImageBackground source={star_bg} style={{width: 141, height: 124, alignItems: 'center', justifyContent: 'center'}} resizeMode={'stretch'}>
                                    <Image source={jisuan_img} />
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 16}}>奖金计算</Text>
                                    <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>算算中了多少钱</Text>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>


                        <ImageBackground source={star_bg} style={{width: 141, height: 124,
                            alignItems: 'center', justifyContent: 'center', marginLeft: 18}} resizeMode={'stretch'}>
                            <Image source={caipiaozhan_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginTop: 10}}>彩票站</Text>
                            <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>附近的彩票站</Text>
                        </ImageBackground>

                        <ImageBackground source={star_bg} style={{width: 141, height: 124,
                            alignItems: 'center', justifyContent: 'center', marginLeft: 18}} resizeMode={'stretch'}>
                            <Image source={jingqingqidai_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginTop: 10}}>敬请期待</Text>
                            <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 7}}>下次会有更多工具哦</Text>
                        </ImageBackground>
                    </View>

                </ImageBackground>
                <FengcheComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: __MAX_SCREEMT__,
        height: __MIN_SCREEMT__ - 43 * __MIN_PIXEL__,
    },

});