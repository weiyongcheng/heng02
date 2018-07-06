import React, {Component} from 'react';
import {StyleSheet, View, Text, ImageBackground, Image, TouchableWithoutFeedback, ScrollView} from 'react-native';

import rectangle_img from '../zixun/sources/Rectangle.png';
import return_img from '../zixun/sources/return.png';
import float_bg_img from '../home/sources/float_bg.png';

export default class ZoushiPage extends Component{

    render() {
        return (
            <View style={styles.container}>
                {this._renderNavBar('玩法技巧')}

                <View style={{width: __MAX_SCREEMT__, height: __PIXEL__, backgroundColor: '#FCFBFE'}} />

                <View style={{flex: 1, backgroundColor: '#442CB3'}}>

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