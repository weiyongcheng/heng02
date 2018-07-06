import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import fengche_img from './sources/fengche.png';

export default class FengcheComponent extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={fengche_img}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        left: 0,
        top: 0
    }
});