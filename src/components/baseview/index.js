import LoadingHub from './LoadingHub';
import ToastView from './ToastView';
import AlertView from './AlertView';
import CheckBox from './CheckBox';
import EmptyView from './EmptyView';
import NetFailedView from './NetFailedView';
import NullView from './NullView';
import LoadingView from './LoadingView';
import GeneralButton from './GeneralButton';
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

import innerConfig from './Config';//配置项
export function XGBaseViewConfig(configObj = {}) {
    innerConfig.themeColor = configObj.themeColor;                      // 主题色（主要指按钮的颜色）
    innerConfig.highlightBgColor = configObj.highlightBgColor;          // 高亮色（主要指按钮的高亮颜色）
    innerConfig.disableThemeColor = configObj.disableThemeColor;        // 主题色不可用状态（主要指按钮的不可用颜色）
    innerConfig.loadingGif = resolveAssetSource(configObj.loadingGif);  // loading页面图片（必须为gif格式）
    innerConfig.emptyImage = configObj.emptyImage;                      // 默认的为空页面图片
    innerConfig.netNotConnectImage = configObj.netNotConnectImage;      // 网络失败-断网状态图片
    innerConfig.serverErrorImage = configObj.serverErrorImage;          // 网络失败-HTTP或业务错误图片
    innerConfig.checkBoxSelectedIcon = configObj.checkBoxSelectedIcon;  // 复选框选中icon
    innerConfig.checkBoxUnSelectedIcon = configObj.checkBoxUnSelectedIcon;// 复选框非选中icon
}

export {
    // 目前专用于导航库（开发同学不要自己用）
    LoadingHub,     //loading指示器
    ToastView,      //toast指示器
    AlertView,      //alert弹框
    // 通用组件
    CheckBox,       //复选框
    EmptyView,      //为空页
    NullView,       //什么都不展示的页面
    LoadingView,    //加载页面
    GeneralButton,  //按钮
    NetFailedView,  //网络加载失败页
};
