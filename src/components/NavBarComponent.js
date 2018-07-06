import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import fengche_img from './sources/fengche.png';

export default class NavBarComponent extends Component {

    render() {
        const {title} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        height: 43,
        width: __MAX_SCREEMT__,
        backgroundColor: '#442CB3',
        justifyContent: 'center'
    },
    text: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 91,
    },
    fengche: {
        position: 'absolute',
        left: 0,
        top: 0
    }
});