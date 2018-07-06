import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import float_bg_img from '../home/sources/float_bg.png';
import kaijiang_bg_img from '../home/sources/kaijiang_bg.png';
import Ball from "../home/components/Ball";

export default class KaijiangxiangqingPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                {this._renderNavBar('开奖详情')}

                <View style={{width: __MAX_SCREEMT__, height: __PIXEL__, backgroundColor: '#FCFBFE'}}/>

                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#442CB3', justifyContent: 'center'}}>
                    <ImageBackground style={{
                        width: 269,
                        height: 268,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 20
                    }} source={kaijiang_bg_img} resizeMode={'stretch'}>

                        <ImageBackground style={{width: 250, height: 80, justifyContent: 'center'}}
                                         source={float_bg_img}>
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

                    <View style={{marginTop: 25, marginLeft: 47}}>

                        <View style={{
                            width: 258,
                            height: 41,
                            borderTopWidth: __PIXEL__,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderLeftWidth: __PIXEL__,
                            borderRightWidth: __PIXEL__,
                            borderColor: 'white',
                            marginBottom: 20,
                            flexDirection: 'row',
                        }}>

                            <Text style={{fontSize: 24, color: 'white'}}>124513245358</Text>
                            <Text style={{marginLeft: 13, fontSize: 8, color: '#FBFBFB'}}>124513245358</Text>

                        </View>

                        <View style={{
                            width: 258,
                            height: 198,
                            borderTopWidth: __PIXEL__,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderLeftWidth: __PIXEL__,
                            borderRightWidth: __PIXEL__,
                            borderColor: 'white',
                            marginBottom: 20,
                        }}>

                                {this._renderRowCell('奖项', '注数', '投注金额')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}
                                {this._renderRowCell('一等奖', '20注', '10000')}


                        </View>
                    </View>
                </View>

            </View>
        );
    }

    _renderRowCell = (leftTitlle, title, rightTitle, isHeader) => {

        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: isHeader ? 10 : 12, color: 'white'}}>{leftTitlle}</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: isHeader ? 10 : 12, color: 'white'}}>{title}</Text>

                </View>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: isHeader ? 10 : 12, color: 'white'}}>{rightTitle}</Text>

                </View>
            </View>
        );
    };

    _renderNavBar = (title) => {
        return (
            <View style={{
                width: __MAX_SCREEMT__,
                height: 43,
                backgroundColor: '#442CB3',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableWithoutFeedback onPress={() => {
                    const {navigation} = this.props;
                    navigation.pop();
                }}>
                    <View>
                        <ImageBackground source={rectangle_img} style={{
                            width: 78,
                            height: 42,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={return_img} style={{width: 29, height: 29}}/>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <Text style={{fontSize: 14, color: '#ffffff', marginLeft: 11}}>{title}</Text>
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