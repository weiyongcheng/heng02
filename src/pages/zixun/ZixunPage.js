import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import NavBarComponent from "../../components/NavBarComponent";
import FengcheComponent from "../../components/FengcheComponent";

import bg_img from '../home/sources/bg.png';
import float_bg_img from '../home/sources/float_bg.png';

import tuijian_img from './sources/tuijian.png';
import xinwen_img from './sources/xinwen.png';
import tiyu_img from './sources/tiyu.png';
import gonglue_img from './sources/gonglue.png';
import shu_img from './sources/shu.png';
import heng_img from './sources/heng.png';
import info_bg_img from '../home/sources/info_bg.png';
import shuangseqiu_img from './sources/shuangseqiu.png';
import jiaodian_img from './sources/jiaodian.png';

export default class ZixunPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                <NavBarComponent title={'资讯'}/>

                        <ImageBackground source={bg_img} style={{width: __MAX_SCREEMT__, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__,
                            flexDirection: 'row', paddingTop: 11}} >

                            <ScrollView horizontal={true} style={{width: __MAX_SCREEMT__, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__}}>
                                <View style={{ marginLeft: 46.6, width: 258, height: 258, backgroundColor: '#5E4BEB', borderRadius: 5, paddingTop: 12}}>

                                    <View style={{flex: 1}}>
                                        <View style={{width: 258, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '专家推荐'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center'}}>
                                                    <Image source={tuijian_img} />
                                                    <Image source={heng_img} style={{marginTop: 12, width: 48, height: 3}}/>
                                                </View>
                                            </TouchableWithoutFeedback>


                                            <Image source={shu_img} style={{width: 2, height: 57, marginLeft: 20}}/>

                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '彩市新闻'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center', marginLeft: 20}}>
                                                    <Image source={xinwen_img} />
                                                    <Image source={heng_img} style={{marginTop: 12, width: 48, height: 3}}/>
                                                </View>
                                            </TouchableWithoutFeedback>


                                            <Image source={shu_img} style={{width: 2, height: 57, marginLeft: 20}}/>

                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '体育花边'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center', marginLeft: 20}}>
                                                    <Image source={tiyu_img} />
                                                    <Image source={heng_img} style={{marginTop: 12, width: 48, height: 3}}/>
                                                </View>
                                            </TouchableWithoutFeedback>

                                        </View>

                                        <View style={{width: 258, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 11}}>

                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '双色球'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center'}}>
                                                    <Image source={shuangseqiu_img} />
                                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 8}}>双色球</Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <Image source={shu_img} style={{width: 2, height: 57, marginLeft: 20}}/>

                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '焦点'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center', marginLeft: 20}}>
                                                    <Image source={jiaodian_img} />
                                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 8}}>焦点</Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                            <Image source={shu_img} style={{width: 2, height: 57, marginLeft: 20}}/>

                                            <TouchableWithoutFeedback onPress={() => {
                                                const {navigation} = this.props;
                                                navigation.navigate('ZixunListPage', {
                                                    title: '攻略'
                                                });
                                            }}>
                                                <View style={{alignItems: 'center', marginLeft: 20}}>
                                                    <Image source={gonglue_img} />
                                                </View>
                                            </TouchableWithoutFeedback>

                                        </View>
                                    </View>

                                    <ImageBackground style={{width: 258, paddingRight: 30, paddingLeft: 15,
                                        height: 80, justifyContent: 'center'}} source={float_bg_img}>
                                        <Text style={{fontSize: 8, color: '#d8d8d8'}}>欧冠焦点:</Text>
                                        <Text style={{fontSize: 12, color: '#ffffff', marginTop: 8}} numberOfLines={1}>欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点:</Text>
                                        <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 8}}>2018.05.02 09:09:00</Text>
                                    </ImageBackground>
                                </View>

                                {
                                    (new Array(10).fill(0)).map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback onPress={() => {
                                                this.props.navigation.navigate('ZixunDetail');
                                            }} key={index}>
                                                <View>
                                                    <ImageBackground style={{width: 141, height: 258, marginLeft: 10, justifyContent: 'flex-end'}} source={info_bg_img}>

                                                        {this._renderTipView(7, 7, '新闻资讯')}

                                                        <ImageBackground style={{width: 141, height: 80, paddingLeft: 5, paddingVertical: 8, paddingRight: 4}} source={float_bg_img}>
                                                            <Text style={{fontSize: 8, color: '#dbdbdb'}} numberOfLines={1}>欧冠焦点:</Text>
                                                            <Text style={{fontSize: 12, color: '#ffffff', marginTop: 6}} numberOfLines={2}>红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公</Text>
                                                            <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 6}} numberOfLines={1}>2018.05.02 09:09:00</Text>
                                                        </ImageBackground>
                                                    </ImageBackground>
                                                </View>
                                            </TouchableWithoutFeedback>


                                        );
                                    })
                                }

                                <View  style={{width: 20, height: 1}}/>
                            </ScrollView>


                        </ImageBackground>





                <FengcheComponent/>
            </View>
        );
    }

    _renderTipView = (top, right, title) => {
        return (
            <View style={{position: 'absolute', right, top, width: 60,
                height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7701F', borderRadius: 4}}>

                <Text style={{fontSize: 12, color: '#ffffff'}}>{title}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({

   container: {
       width: __MAX_SCREEMT__,
       height: __MIN_SCREEMT__
   }
});