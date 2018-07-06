import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TextInput} from 'react-native';

import rectangle_img from '../sources/rectangle.png';
import fankuitianxie_img from '../sources/fankuitianxie.png';

export default class YijianComponent extends Component{

    render() {
        return (
            <View style={styles.container}>
                <View style={{width: 407, height: 201, borderRadius: 5, borderColor: '#3224AE',
                    backgroundColor: '#442CB3', borderWidth: 1, padding: 20}}>

                    <TextInput style={{flex: 1}}
                               placeholder={'请输入你的意见或建议'}
                               placeholderTextColor={'white'}
                               underlineColorAndroid="transparent"/>

                </View>

                <ImageBackground style={{width: 157, height: 50, flexDirection: 'row', alignItems: 'center', marginTop: 25, justifyContent: 'center'}}
                                 source={rectangle_img} resizeMode={'stretch'}>

                    <Image source={fankuitianxie_img} style={{width: 42, height: 38}} resizeMode={'stretch'} />
                    <Text style={{fontSize: 18, color: '#ffffff', marginLeft: 11}}>确认</Text>

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