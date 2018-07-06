import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TextInput} from 'react-native';

import rectangle_img from '../sources/rectangle.png';
import fankuitianxie_img from '../sources/fankuitianxie.png';
import gengxin_img from '../sources/gengxin.png';
import banben_img from '../sources/banben.png';

export default class Dangqianbanben extends Component{

    render() {
        return (
            <View style={styles.container}>

                <Image source={banben_img} />
                <Text style={{fontSize: 18, color: '#ffffff'}}>当前版本v1.0</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

   container: {
        flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row'
   }
});