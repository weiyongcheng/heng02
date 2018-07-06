import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import mohu_bg from './sources/mohu.png';
import bg_img from '../home/sources/bg.png';
import bg1_img from './sources/bg1.png';
import huojian_img from './sources/huojian.png';
import float_img from '../home/sources/float_bg.png';

export default class PersonalPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                {this._renderNavBar('号码推荐')}

                <ImageBackground source={bg_img} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                    }} resizeMode={'stretch'}>
                    <Image source={mohu_bg} style={{position: 'absolute', right: 30}}/>

                    <View>
                        <Image source={bg1_img} />
                        <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
                            alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={huojian_img} />
                        </View>
                    </View>

                    <ImageBackground source={float_img} style={{width: 258, height: 80, marginLeft: 67,
                        justifyContent: 'center', alignItems: 'center'}}>

                        <Text style={{fontSize: 14, color: 'white'}}>正在为您预测推荐号，请耐心等待</Text>

                    </ImageBackground>
                </ImageBackground>
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