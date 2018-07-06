import { AppRegistry } from 'react-native';
import './src/common/Globals';
import ErrorUtils from 'ErrorUtils';
import App from './src';
ErrorUtils.setGlobalHandler((err) => {
    console.warn('捕获到了全局错误: ' + err);
});
AppRegistry.registerComponent('app', () => App);
