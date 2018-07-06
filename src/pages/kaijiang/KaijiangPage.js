import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import NavBarComponent from "../../components/NavBarComponent";
import FengcheComponent from "../../components/FengcheComponent";

import bg_img from '../home/sources/bg.png';
import rectangle_bg from './source/Rectangle.png';
import wan_bg from './source/wan_bg.png';
import mohu_img from './source/mohu.png';
import kaijiang_bg_img from '../home/sources/kaijiang_bg.png';
import float_bg_img from './source/float_bg.png';
import Ball from "../home/components/Ball";
import lingxing_img from './source/lingxing.png';
import lingxing_select_img from './source/lingxing_select.png';

import zoushi_img from './source/zoushi.png';
import yuce_img from './source/yuce.png';
import xiangqing_img from './source/xiangqing.png';
import xinwen_img from './source/xinwen.png';
import lishi_img from './source/lishi.png';
import wanfa_img from './source/wanfa.png';
import jiqiao_img from './source/jiqiao.png';

import kuaileba_img from './source/kuaileba.png';
import shanghaishiyixuanwu_img from './source/shanghaishiyixuanwu.png';
import shiwuxuanwu_img from './source/shiwuxuanwu.png';
import qilecai_img from './source/qilecai.png';
import jingcaizuqiu from './source/jingcaizuqiu.png';
import yello_select_img from './source/yellow_select.png';

export default class KaijiangPage extends Component{

    state = {pos: 0};

    _leftPress = (pos) => {
        switch (pos) {
            case 0: {
                this.props.navigation.navigate('ZoushiPage');
                break;
            }
            case 1: {
                this.props.navigation.navigate('YucePage');
                break;
            }
            case 2: {
                this.props.navigation.navigate('KaijiangxiangqingPage');
                break;
            }
            case 4: {
                this.props.navigation.navigate('LishikaijiangPage');
                break;
            }
            case 5: {
                this.props.navigation.navigate('WanfajieshaoPage');
                break;
            }
            case 6: {
                this.props.navigation.navigate('WanfajiqiaoPage');
                break;
            }
        }
    };

    _rightPress = (pos) => {
        this.setState({
            pos
        })
    };

    render() {
        const {pos} = this.state;
        return (
            <View style={styles.container}>
                <NavBarComponent title={'开奖'}/>

                <ImageBackground source={bg_img} style={{width: __MAX_SCREEMT__, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__, flexDirection: 'row', justifyContent: 'space-between'}} >
                    <ImageBackground source={rectangle_bg} style={{width: 149, flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{marginLeft: 10}}>
                            <TouchableWithoutFeedback onPress={() => {this._leftPress(0)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={zoushi_img} style={{width: 30, height: 30}} resizeMode={'stretch'}/>
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>走势</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => {this._leftPress(1)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, marginTop: 8, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={yuce_img} style={{width: 30, height: 30}} resizeMode={'stretch'}/>
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>预测</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => {this._leftPress(2)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, marginTop: 8, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={xiangqing_img} style={{width: 30, height: 30}} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>详情</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>

                        <View>
                            <TouchableWithoutFeedback onPress={() => {this._leftPress(3)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={xinwen_img} style={{width: 30, height: 30}} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>新闻</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => {this._leftPress(4)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, marginTop: 8, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={lishi_img} style={{width: 30, height: 30}} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>历史开奖</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => {this._leftPress(5)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, marginTop: 8, justifyContent: 'center', alignItems: 'center'}} source={lingxing_select_img}>
                                        <Image source={wanfa_img} style={{width: 30, height: 30}} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>玩法介绍</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => {this._leftPress(6)}}>
                                <View>
                                    <ImageBackground style={{width: 61, height: 61, marginTop: 8, justifyContent: 'center', alignItems: 'center'}} source={lingxing_img}>
                                        <Image source={jiqiao_img} style={{width: 30, height: 30}} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 8, color: 'white', marginTop: 3}}>玩法技巧</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>

                    </ImageBackground>

                    <View style={{width: __MAX_SCREEMT__ - 149 - 152, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__,
                        justifyContent: 'center', alignItems: 'center'}} >

                        <ImageBackground style={{width: 270, height: 268, justifyContent: 'flex-end', alignItems: 'flex-end'}} source={kaijiang_bg_img} resizeMode={'stretch'}>

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

                        <Image source={mohu_img} style={{position: 'absolute', right: -5, top: 0}} />
                    </View>

                    <ImageBackground style={{width: 152, flex: 1}} source={wan_bg}>
                        <View style={{marginLeft: 55, marginTop: 8}}>
                            <TouchableWithoutFeedback onPress={() => {this._rightPress(0)}}>
                                <View>
                                    <ImageBackground style={{width: 54.6, height: 54.6, justifyContent: 'center', alignItems: 'center'}} source={pos === 0 ? yello_select_img : lingxing_select_img}>
                                        <Image source={kuaileba_img} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 6, color: 'white', marginTop: 3}}>快乐8</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{marginLeft: 70, marginTop: 8}}>
                            <TouchableWithoutFeedback onPress={() => {this._rightPress(1)}}>
                                <View>
                                    <ImageBackground style={{width: 54.6, height: 54.6, justifyContent: 'center', alignItems: 'center'}} source={pos === 1 ? yello_select_img : lingxing_select_img}>
                                        <Image source={shanghaishiyixuanwu_img} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 6, color: 'white', marginTop: 3}}>上海11选5</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{marginLeft: 85, marginTop: 8}}>
                            <TouchableWithoutFeedback onPress={() => {this._rightPress(2)}}>
                                <View>
                                    <ImageBackground style={{width: 54.6, height: 54.6, justifyContent: 'center', alignItems: 'center'}} source={pos === 2 ? yello_select_img : lingxing_select_img}>
                                        <Image source={shiwuxuanwu_img} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 6, color: 'white', marginTop: 3}}>15选5</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{marginLeft: 70, marginTop: 8}}>
                            <TouchableWithoutFeedback onPress={() => {this._rightPress(3)}}>
                                <View>
                                    <ImageBackground style={{width: 54.6, height: 54.6, justifyContent: 'center', alignItems: 'center'}} source={pos === 3 ? yello_select_img : lingxing_select_img}>
                                        <Image source={qilecai_img} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 6, color: 'white', marginTop: 3}}>七乐彩</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={{marginLeft: 55, marginTop: 8}}>
                            <TouchableWithoutFeedback onPress={() => {this._rightPress(4)}}>
                                <View>
                                    <ImageBackground style={{width: 54.6, height: 54.6, justifyContent: 'center', alignItems: 'center'}} source={pos === 4 ? yello_select_img : lingxing_select_img}>
                                        <Image source={jingcaizuqiu} resizeMode={'stretch'} />
                                        <Text style={{fontSize: 6, color: 'white', marginTop: 3}}>竞彩足球</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </ImageBackground>
                </ImageBackground>

                <FengcheComponent/>
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