import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';

import tabbg_img from '../pages/home/sources/tab_bg.png';

import dengdaikaijiang_img from './sources/dengdaikaijiang.png';
import faqibisai_img from './sources/faqibisai.png';
import home_img from './sources/home.png';
import info_img from './sources/info.png';
import personal_img from './sources/personal.png';

import dengdaikaijiang_select_img from './sources/dengdaikaijiang_select.png';
import faqibisai_select_img from './sources/faqibisai_select.png';
import home_select_img from './sources/home_select.png';
import info_select_img from './sources/info_select.png';
import personal_select_img from './sources/personal_select.png';

export default class TabComponent extends Component {

    state = {pos: 0};

    _onPress = (pos) => {

        const {callback} = this.props;
        this.setState({
            pos
        });
        callback && callback(pos);
    };

    render() {

        const {isHidden} = this.props;

        const {pos} = this.state;

        const homeIcon = pos === 0 ? home_select_img : home_img;
        const dengdaiIcon = pos === 1 ? dengdaikaijiang_select_img : dengdaikaijiang_img;
        const infoIcon = pos === 2 ? info_select_img : info_img;
        const faqiIcon = pos === 3 ? faqibisai_select_img : faqibisai_img;
        const personalIcon = pos === 4 ? personal_select_img : personal_img;

        let title = '';
        switch (pos) {
            case 0:
                title = '首页';
                break;
            case 1:
                title = '最新开奖';
                break;
            case 2:
                title = '资讯';
                break;
            case 3:
                title = '最新赛况';
                break;
            case 4:
                title = '个人';
                break;
        }

        return (
            <View>
                <Image source={tabbg_img} style={styles.imageContainer} resizeMode={'stretch'}/>
                {
                    !isHidden ? <View style={styles.content}>

                        <TouchableWithoutFeedback onPress={() => this._onPress(0)}>
                            <Image source={homeIcon} style={styles.image} />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => this._onPress(1)}>
                            <Image source={dengdaiIcon} style={styles.image} />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => this._onPress(2)}>
                            <Image source={infoIcon} style={styles.image} />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => this._onPress(3)}>
                            <Image source={faqiIcon} style={styles.image} />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => this._onPress(4)}>
                            <Image source={personalIcon} style={styles.image} />
                        </TouchableWithoutFeedback>

                        <View style={{flex: 1}} />

                        <Text style={{fontSize: 19, color: '#c9c1ba', marginRight: 25}}>{title}</Text>
                    </View> : null
                }

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
        marginLeft: 25
    }
});