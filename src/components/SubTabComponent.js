import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';

import tabbg_img from '../pages/home/sources/tab_bg.png';
import back_img from '../pages/personal/sources/back.png';

export default class SubTabComponent extends Component {

    render() {

        const {title = ''} = this.props;

        return (
            <View>
                <Image source={tabbg_img} style={styles.imageContainer} resizeMode={'stretch'}/>
                <View style={styles.content}>
                    <Text style={{fontSize: 20, color: '#d9c6c0', marginLeft: 90, fontWeight: 'bold'}}>{title}</Text>

                    <TouchableWithoutFeedback onPress={() => {
                        const {callback} = this.props;
                        callback && callback();
                    }}>
                        <Image source={back_img} style={[styles.image]} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    imageContainer: {
        width: __MAX_SCREEMT__
    },
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        position: 'absolute',
        left: 33,
        top: 20
    }
});