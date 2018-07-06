import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback} from 'react-native';
import FengcheComponent from "../../components/FengcheComponent";
import NavBarComponent from "../../components/NavBarComponent";

import bg_img from '../home/sources/bg.png';
import star_bg_img from '../home/sources/star_bg.png';
import lanqiu_img from '../home/sources/lanqiu.png';
import zuqiu_img from '../home/sources/zuqiu.png';
import float_bg_img from '../home/sources/float_bg.png';
import rectangle_img from './sources/rectangle.png';

export default class BisaiPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                <NavBarComponent title={'比赛'}/>

                <ImageBackground source={bg_img} style={{width: __MAX_SCREEMT__, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__, flexDirection: 'row'}} >

                    <View style={{width: 161,height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__, paddingVertical: 15, paddingLeft: 10}}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                (new Array(10).fill(0)).map((item, index) => {
                                    const marginTop = index === 0 ? 0 : 12;
                                    return(
                                        <ImageBackground source={star_bg_img} style={{width: 141, height: 124, justifyContent: 'center',
                                            alignItems: 'center', marginTop}} key={index}>
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

                                            <ImageBackground style={{position: 'absolute', width: 134,
                                                height: 24, bottom: 0, justifyContent: 'center'}} source={float_bg_img}>
                                                <Text style={{fontSize: 8, color: 'white', marginLeft: 9}}>2018.05.02 周日 09:09 NBA</Text>
                                            </ImageBackground>
                                        </ImageBackground>
                                    );
                                })
                            }
                        </ScrollView>

                    </View>

                    <View style={{width: __MAX_SCREEMT__ - 161, height: __MIN_SCREEMT__ - 43 - 43 * __MIN_PIXEL__, backgroundColor: '#4B31C2'}}>

                        <ScrollView>
                            {
                                (new Array(10).fill(0)).map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => {
                                            this.props.navigation.navigate('BisaiDetailPage');
                                        }} key={index}>
                                            <View style={{width: __MAX_SCREEMT__ - 161}}>
                                                <Text style={{fontSize: 10, color: '#ffffff', marginLeft: 13, marginBottom: 4, marginTop: 14}}>06年13日</Text>
                                                {
                                                    (new Array(3).fill(0)).map((item, index) => {
                                                        const marginTop = index === 0 ? 0 : 10;
                                                        return (
                                                            <View style={{width: __MAX_SCREEMT__ - 161 - 22, alignSelf: 'center', flexDirection: 'row', marginTop}} key={index}>
                                                                <ImageBackground style={{width: 120, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} source={rectangle_img}>
                                                                    <Text style={{fontSize: 18, color: '#ffffff'}}>19:00</Text>
                                                                    <Text style={{fontSize: 8, color: '#d0d0d0', marginLeft: 8}}>周日</Text>
                                                                </ImageBackground>
                                                                <View style={{flex: 1, backgroundColor: '#3224AE', flexDirection: 'row', alignItems: 'center'}}>
                                                                    <Image source={lanqiu_img} style={{marginLeft: 20}}/>
                                                                    <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 11}}>热火</Text>
                                                                    <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 29.5}}>24:89</Text>
                                                                    <Image source={lanqiu_img} style={{marginLeft: 30.5}} />
                                                                    <Text style={{fontSize: 12, color: '#ffffff', marginLeft: 10}}>小牛</Text>
                                                                    <View style={{flex: 1, height: 1}}/>
                                                                    <Text style={{fontSize: 12, color: '#ffffff', marginRight: 29}}>已结束</Text>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                }
                                            </View>
                                        </TouchableWithoutFeedback>

                                    );
                                })
                            }
                            <View style={{width: __MAX_SCREEMT__ - 16, height: 14}} />
                        </ScrollView>



                    </View>

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