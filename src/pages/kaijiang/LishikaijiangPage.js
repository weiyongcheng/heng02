import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import float_bg_img from '../home/sources/float_bg.png';
import kaijiang_bg_img from '../home/sources/kaijiang_bg.png';
import Ball from "../home/components/Ball";

export default class LishikaijiangPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                {this._renderNavBar('历史开奖')}

                <View style={{width: __MAX_SCREEMT__, height: __PIXEL__, backgroundColor: '#FCFBFE'}} />

                <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#442CB3', justifyContent: 'center'}}>
                    <ImageBackground style={{width: 269, height: 268, justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 20}} source={kaijiang_bg_img} resizeMode={'stretch'}>

                        <ImageBackground style={{width: 250, height: 80, justifyContent: 'center'}} source={float_bg_img}>
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
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                (new Array(10).fill(0)).map((item, index) => {
                                    return (
                                        <View key={index} style={{width: 258, height: 80, borderTopWidth: __PIXEL__, justifyContent: 'center',
                                            alignItems: 'center', borderLeftWidth: __PIXEL__, borderRightWidth: __PIXEL__, borderColor: 'white', marginBottom: 10}}>

                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={{fontSize: 24, color: '#ffffff'}}>快乐8</Text>
                                                <Text style={{fontSize: 8, color: '#fbfbfb', marginLeft: 10}}>第20180513047期 05-13 16:43</Text>
                                            </View>

                                            <View style={{flexDirection: 'row', marginTop: 8}}>
                                                {
                                                    (new Array(8).fill(0)).map((item, index) => {
                                                        return <Ball style={{marginRight: 3}} key={index}/>
                                                    })
                                                }
                                            </View>

                                        </View>
                                    );
                                })
                            }
                        </ScrollView>


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
    }


}

const styles = StyleSheet.create({

    container: {
        width: __MAX_SCREEMT__,
        height: __MIN_SCREEMT__,
    }
});