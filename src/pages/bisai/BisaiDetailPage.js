import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import float_bg_img from '../home/sources/float_bg.png';
import peilv_img from './sources/peilv.png';
import saikuang_img from './sources/saikuang.png';
import fenxi_img from './sources/fenxi.png';

export default class BisaiDetailPage extends Component{

    render() {

        return (
            <View style={styles.container}>
                {this._renderNavBar('比赛详情')}

                <View style={{width: __MAX_SCREEMT__, height: __PIXEL__, backgroundColor: '#FCFBFE'}} />

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 319, height: __MIN_SCREEMT__ - 43, backgroundColor: '#442CB3'}}>

                    </View>

                    <View style={{width: __PIXEL__, height: __MIN_SCREEMT__ - 43, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} />

                    <View style={{flex: 1, backgroundColor: '#4B31C2'}}>

                    </View>
                </View>

            </View>
        );
    }

    _renderNavBar = (title) => {
        return (
            <View style={{width: __MAX_SCREEMT__, height: 43, backgroundColor: '#442CB3', flexDirection: 'row', alignItems: 'center'}}>

                <View style={{width: 319, height: 43, flexDirection: 'row', alignItems: 'center', borderRightWidth: __PIXEL__, borderColor: '#FCFBFE'}}>
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

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: __PIXEL__, borderColor: '#FCFBFE', height: 43}}>
                        <Image source={saikuang_img} style={{width: 28, height: 28}} resizeMode={'stretch'} />
                        <Text style={{marginLeft: 13, color: '#ffffff', fontSize: 12}}>赛况</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: __PIXEL__, borderColor: '#FCFBFE', height: 43}}>
                        <Image source={peilv_img} style={{width: 28, height: 28}} resizeMode={'stretch'} />
                        <Text style={{marginLeft: 13, color: '#ffffff', fontSize: 12}}>赔率</Text>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={fenxi_img} style={{width: 28, height: 28}} resizeMode={'stretch'} />
                        <Text style={{marginLeft: 13, color: '#ffffff', fontSize: 12}}>分析</Text>
                    </View>
                </View>

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