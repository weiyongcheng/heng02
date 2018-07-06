import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';

import blue_bg from '../sources/blue_bg.png';
import red_bg from '../sources/red_bg.png';

export default class Ball extends Component {

    render() {
        return (
            <ImageBackground style={[styles.container, this.props.style]} source={blue_bg} resizeMode={'stretch'}>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: 24,
        height: 24
    }
});