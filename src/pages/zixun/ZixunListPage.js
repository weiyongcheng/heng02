import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from './sources/Rectangle.png';
import return_img from './sources/return.png';
import float_bg_img from './sources/float_bg.png';

export default class ZixunListPage extends Component{

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');
        return (
            <View style={styles.container}>
                {this._renderNavBar(title)}

                <View style={{width: __MAX_SCREEMT__, height: __PIXEL__, backgroundColor: '#FCFBFE'}} />

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: 205, height: __MIN_SCREEMT__ - 43, backgroundColor: '#442CB3',
                        paddingTop: 9}}>
                        <ScrollView>

                            <ImageBackground style={{width: 197,height: 110, alignSelf: 'center', marginBottom: 8}} source={rectangle_img} resizeMode={'stretch'}>
                                <ImageBackground style={{position: 'absolute', width: 179,
                                    height: 51, bottom: 4, justifyContent: 'center', alignSelf: 'center'}} source={float_bg_img}>
                                    <Text style={{fontSize: 8, color: 'white'}} numberOfLines={1}>欧冠焦点：</Text>
                                    <Text style={{fontSize: 12, color: 'white'}} numberOfLines={2}>欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点欧冠焦点</Text>
                                </ImageBackground>
                            </ImageBackground>

                            {
                                (new Array(10).fill(0)).map((item, index) => {
                                    return (
                                        <View key={index} style={{width: 197, height: 80, alignSelf: 'center', marginBottom: 8,
                                            flexDirection: 'row', alignItems: 'center', borderRadius: 5, borderWidth: __PIXEL__, borderColor: '#FEFEFE'}}>
                                            <Image style={{width: 64, height: 64, marginLeft: 7}} source={rectangle_img} resizeMode={'stretch'}/>
                                            <View style={{marginLeft: 6, marginRight: 12, width: 197 - 64 - 7 - 6}}>
                                                <Text style={{fontSize: 8, color: '#d8d8d8'}} numberOfLines={1}>放假啦空手道解放了333333333333就是独立房间</Text>
                                                <Text style={{fontSize: 12, color: '#ffffff', marginTop: 2}} numberOfLines={2}>放假啦空33333333333333333手放假啦空手道解放了就是独立房间道解放了就是独立房间</Text>
                                                <Text style={{fontSize: 8, color: '#d8d8d8', marginTop: 2}} numberOfLines={1}>2018.05.02 09:09:00</Text>
                                            </View>
                                        </View>
                                    );
                                })
                            }
                        </ScrollView>
                    </View>

                    <View style={{width: __PIXEL__, height: __MIN_SCREEMT__ - 43, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} />

                    <View style={{flex: 1, backgroundColor: '#4B31C2'}}>
                        <View style={{marginTop: 15, marginLeft: 7, flexDirection: 'row', alignItems: 'center', marginBottom: 21}}>
                            <Image source={rectangle_img} style={{width: 3, height: 12}}/>
                            <Text style={{fontSize: 10, color: '#ffffff', marginLeft: 5}}>最新资讯</Text>
                        </View>

                        <ScrollView>
                            {
                                (new Array(10).fill(0)).map((item, index) => {
                                    return (
                                        <TouchableWithoutFeedback key={index} >
                                            <View style={{marginBottom: 8}}>
                                                <View style={{width: __MAX_SCREEMT__ - 205 - __PIXEL__ - 26,
                                                    marginLeft: 14, height: 88, flexDirection: 'row'}}>

                                                    <View style={{width: __MAX_SCREEMT__ - 205 - __PIXEL__ - 26 - 168 - 15, justifyContent: 'center'}}>
                                                        <Text style={{fontSize: 12, color: '#ffffff'}} numberOfLines={1}>红狼注册考试来得及发了就开始垫付货款收到回复可见对的</Text>
                                                        <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 6}} numberOfLines={2}>红狼注册考试来得及发了就红狼注册考试来得及发了就开始垫付货款收到回复可见对的红狼注册考试来得及发了就开始垫付货款收到回复可见对的开始垫付货款收到回复可见对的</Text>
                                                        <Text style={{fontSize: 8, color: '#e1e1e1', marginTop: 6}} numberOfLines={1}>2018.05.02 09:09:00</Text>
                                                    </View>

                                                    <Image style={{width: 168, height: 88, marginLeft: 15, backgroundColor: 'skyblue'}}  source={rectangle_img}/>
                                                </View>

                                                <View style={{marginTop: 8, width: __MAX_SCREEMT__ - 205 - __PIXEL__ - 26,
                                                    height: __PIXEL__, backgroundColor: 'white', marginLeft: 14}} />
                                            </View>
                                        </TouchableWithoutFeedback>

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