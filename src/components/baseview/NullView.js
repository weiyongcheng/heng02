/**
 * Created by nuomi on 2017/6/9.
 */
import React, {Component} from 'react';
import {
    View,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

export default class NullView extends Component {
    render() {
        const {
            style,
            children
        } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[styles.container, style]}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
});
