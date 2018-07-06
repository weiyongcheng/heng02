import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TextInput} from 'react-native';

import rectangle_img from '../sources/rectangle.png';
import fankuitianxie_img from '../sources/fankuitianxie.png';
import gengxin_img from '../sources/gengxin.png';

export default class ZuixinbanbenComponent extends Component{

    render() {
        return (
            <View style={styles.container}>

                <View style={{flexDirection: 'row'}}>
                    <Image source={gengxin_img} />
                    <Text style={{fontSize: 18, color: '#ffffff', marginLeft: 5}}>最新版本v1.0</Text>
                </View>

                <ImageBackground style={{width: 157, height: 50, flexDirection: 'row', alignItems: 'center', marginTop: 27, justifyContent: 'center'}}
                                 source={rectangle_img} resizeMode={'stretch'}>

                    <Text style={{fontSize: 18, color: '#ffffff', marginLeft: 11}}>已是最新版本</Text>

                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({

   container: {
        flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
   }
});