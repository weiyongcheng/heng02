/**
 * Created by james on 12/26/17.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import codePush from "react-native-code-push"

export default class App extends Component {

    constructor(props) {
        super(props)
        this.checkUpdate = this.checkUpdate.bind(this)
        this.state = {
            updateInfo: '正在检测更新'
        }
    }

    componentWillMount() {
        this.checkUpdate()
    }

    codePushStatusDidChange(status) {
        switch (status) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({
                    updateInfo: '正在检查新配置'
                })
                break
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                break
            case codePush.SyncStatus.INSTALLING_UPDATE:
                break
            case codePush.SyncStatus.UP_TO_DATE:
                this.setState({
                    updateInfo: '正在安装配置内容'
                })
                break
            case codePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({
                    updateInfo: '将重新打开应用'
                })
                break
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({
            updateInfo: `正在下载新配置${(progress.receivedBytes / progress.totalBytes * 100).toFixed(2)}%`
        })
    }

    checkUpdate() {

        codePush.checkForUpdate().then((update) => {
            console.log('update', update)
            if (!update) {
                this.setState({updateInfo: '当前是最新配置'})
            } else {
                codePush.sync(
                    {installMode: codePush.InstallMode.IMMEDIATE},
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this)
                ).catch((e) => {
                    console.log(e)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
        codePush.notifyAppReady()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎
                </Text>
                <Text style={styles.instructions}>
                    {this.state.updateInfo}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});