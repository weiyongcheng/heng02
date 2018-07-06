import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';

import select_bg_img from '../pages/home/sources/select_bg.png';
import un_select_bg_img from '../pages/home/sources/un_select_bg.png';
import personal_img from '../pages/home/sources/personal.png';

import shouye_img from '../pages/home/sources/shouye.png';
import kaijiang_img from '../pages/home/sources/kaijiang.png';
import zixun_img from '../pages/home/sources/zixun.png';
import bisai_img from '../pages/home/sources/bisai.png';
import gongjuxiang_img from '../pages/home/sources/gongjuxiang.png';

export default class BottomBar extends Component{

    state = {pos: 0};

    render() {

        const {pos} = this.state;

        return (
            <View style={{width: __MAX_SCREEMT__, flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        pos: 0
                    });
                    this.props.callback(0);
                }}>
                    <View>
                        <ImageBackground style={styles.imgContainer} source={pos === 0 ? select_bg_img : un_select_bg_img}>
                            <Image source={shouye_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>首页</Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{width: __PIXEL__, height: 43 * __MIN_PIXEL__, backgroundColor: 'white'}} />

                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        pos: 1
                    });
                    this.props.callback(1);
                }}>
                    <View>
                        <ImageBackground style={styles.imgContainer} source={pos === 1 ? select_bg_img : un_select_bg_img}>
                            <Image source={kaijiang_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>开奖</Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{width: __PIXEL__, height: 43 * __MIN_PIXEL__, backgroundColor: 'white'}} />

                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        pos: 2
                    });
                    this.props.callback(2);
                }}>
                    <View>
                        <ImageBackground style={styles.imgContainer} source={pos === 2 ? select_bg_img : un_select_bg_img}>
                            <Image source={zixun_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>资讯</Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{width: __PIXEL__, height: 43 * __MIN_PIXEL__, backgroundColor: 'white'}} />

                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        pos: 3
                    });
                    this.props.callback(3);
                }}>
                    <View>
                        <ImageBackground style={styles.imgContainer} source={pos === 3 ? select_bg_img : un_select_bg_img}>
                            <Image source={bisai_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>比赛</Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{width: __PIXEL__, height: 43 * __MIN_PIXEL__, backgroundColor: 'white'}} />

                <TouchableWithoutFeedback onPress={() => {
                    this.setState({
                        pos: 4
                    });
                    this.props.callback(4);
                }}>
                    <View>
                        <ImageBackground style={styles.imgContainer} source={pos === 4 ? select_bg_img : un_select_bg_img}>
                            <Image source={gongjuxiang_img} />
                            <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>工具箱</Text>
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>


                <View style={{width: __PIXEL__, height: 43 * __MIN_PIXEL__, backgroundColor: 'white'}} />

                <TouchableWithoutFeedback onPress={() => {
                    this.props.callback(5);
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#442CB3'}}>
                        <Image source={personal_img} style={{width: __MAX_SCREEMT__ - 600 * __MAX_PIXEL__ - 25.5,
                            height: __MAX_SCREEMT__ - 600 * __MAX_PIXEL__ - 25.5}} />
                    </View>
                </TouchableWithoutFeedback>

            </View>
        );
    }
}

const styles = StyleSheet.create({

   imgContainer: {
       width: 120 * __MAX_PIXEL__,
       height: 43 * __MIN_PIXEL__,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
   }
});