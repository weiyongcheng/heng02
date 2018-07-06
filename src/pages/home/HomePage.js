import React, {Component} from 'react';
import {StyleSheet, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';

import NavBarComponent from '../../components/NavBarComponent';
import FengcheComponent from '../../components/FengcheComponent';

import bg_img from './sources/bg.png';
import star_bg_img from './sources/star_bg.png';
import info_bg_img from './sources/info_bg.png';
import kaijiang_bg_img from './sources/kaijiang_bg.png';

import float_bg_img from './sources/float_bg.png';
import Ball from "./components/Ball";
import lanqiu_img from './sources/lanqiu.png';
import zuqiu_img from './sources/zuqiu.png';
import tuijian_img from './sources/tuijian.png';

export default class HomePage extends Component {

    render() {

        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>

                <NavBarComponent title={'首页'}/>

                <ImageBackground source={bg_img} style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}} >
                    <ImageBackground style={{width: 270, height: 268, justifyContent: 'flex-end', alignItems: 'flex-end'}} source={kaijiang_bg_img} resizeMode={'stretch'}>

                        {this._renderTipView(15, 14, '最新开奖')}

                        <ImageBackground style={{width: 258, height: 80, justifyContent: 'center'}} source={float_bg_img}>
                            <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 24, color: '#ffffff'}}>快乐8</Text>
                                <Text style={{fontSize: 8, color: '#fbfbfb', marginLeft: 13}}>第20180513047期开奖号</Text>
                                <Text style={{fontSize: 8, color: '#f0f0f0', marginLeft: 5}}>0513 16:43</Text>
                            </View>

                            <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 8}}>
                                {
                                    (new Array(8).fill(0)).map((item, index) => {
                                        return <Ball style={{marginRight: 3}} key={index}/>
                                    })
                                }
                            </View>
                        </ImageBackground>
                    </ImageBackground>

                    <View style={{marginLeft: 10, marginTop: 11}}>
                        <ImageBackground source={star_bg_img} style={{width: 141, height: 124, justifyContent: 'center', alignItems: 'center'}}>
                            {this._renderTipView(7, 6, '体育比赛')}

                            <View style={{flexDirection: 'row',}}>
                                <View>
                                    <Image source={lanqiu_img} />
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 6}}>热火</Text>
                                </View>
                                <Image source={lanqiu_img} style={{marginLeft: 9}}/>
                                <View  style={{marginLeft: 13}} >
                                    <Image source={zuqiu_img}/>
                                    <Text style={{fontSize: 12, color: '#ffffff', marginTop: 6}}>小牛</Text>
                                </View>
                            </View>

                            <ImageBackground style={{position: 'absolute', width: 140,
                                height: 24, bottom: 0, justifyContent: 'center'}} source={float_bg_img}>
                                <Text style={{fontSize: 8, color: 'white', marginLeft: 9}}>2018.05.02 周日 09:09 NBA</Text>
                            </ImageBackground>
                        </ImageBackground>

                        <View style={{height: 8}} />

                        <ImageBackground source={star_bg_img} style={{width: 141, height: 124, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={tuijian_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginTop: 16}}>号码推荐</Text>
                            <Text style={{fontSize: 8, color: '#ffffff', marginTop: 7}}>预测号码，娱乐选号</Text>
                        </ImageBackground>
                    </View>

                    <ImageBackground style={{width: 141, height: 258, marginLeft: 10, marginTop: 8, justifyContent: 'flex-end'}} source={info_bg_img}>

                        {this._renderTipView(7, 7, '新闻资讯')}

                        <ImageBackground style={{width: 141, height: 80, paddingLeft: 5, paddingVertical: 8, paddingRight: 4}} source={float_bg_img}>
                            <Text style={{fontSize: 8, color: '#dbdbdb'}} numberOfLines={1}>欧冠焦点:</Text>
                            <Text style={{fontSize: 12, color: '#ffffff', marginTop: 6}} numberOfLines={2}>红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公红狼主场对公</Text>
                            <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 6}} numberOfLines={1}>2018.05.02 09:09:00</Text>
                        </ImageBackground>
                    </ImageBackground>

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
        height: __MIN_SCREEMT__,
    },

});