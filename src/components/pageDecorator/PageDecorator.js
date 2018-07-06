/**
 * Created by nuomi on 2017/12/13.
 * 页面修饰器.
 * 动态地在页面的原型链添加方法和属性,方法均带有xg_前缀，防止函数名或者变量名冲突。
 * 使用该修饰器，本质上会污染页面组件的命名空间。需要注意，避免冲突。
 *
 * demo examples:
 *
 * loading demo
 * this.xg_loadingShow();    //弹出loading 参数全部可省
 * this.xg_loadingDismiss(); //隐藏loading
 * this.xg_isLoadingShow();  //return loding是否在展示
 * //参数配置 loading时间 背景颜色 超时回调
 * this.xg_loadingShow('加载中...');
 * this.xg_loadingShow('加载中...',{timeout: 1,bgColor: 'rgba(0,0,0,0.5)',loadingTimeout: ()=>{
 *     alert(1);
 * }});
 * this.xg_loadingDismiss(()=>{alert('隐藏结束')});
 *
 * toast demo  参数：主标题，次标题，详细配置（持续时间，隐藏回调）
 * this.xg_toastShow('网络错误');
 * this.xg_toastShow('网络错误','请重新刷新');
 * this.xg_toastShow('网络错误','请重新刷新',{duration: 2 ,toastHiddenCallBack:()=>{
 *     alert(1);
 * }});
 * this.xg_toastDismiss();
 * this.xg_toastDismiss(()=>{alert('隐藏结束')});
 *
 * alert demo
 *
 * static xgNavigationBarOptions PropTypes.object
 * statusBarStyle   PropTypes.string.isRequired,
 * title            PropTypes.string.isRequired,
 * rightNavImage:   PropTypes.any,
 * leftNavImage:    PropTypes.any,
 * leftNavTitle:    PropTypes.string,
 * rightNavTitle:   PropTypes.string,
 * hideNavBar:      PropTypes.bool,
 *
 * page rewrite following API
 * xg_NavigationBarLeftPressed:      func,
 * xg_NavigationBarRightPressed:    func,
 * xg_NavigationBarLeftItem          func return react Component
 * xg_NavigationBarRightItem         func return react Component
 * xg_NavigationBarHiddenLeftItem()  func
 * xg_NavigationBarHiddenRightItem() func
 * xg_NavigationBarResetTitle('')    func 修改页面标题
 */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import XGNavigatorBar from '../Views/XGNavigatorBar/index';
import {
    LoadingHub,
    ToastView,
    AlertView
} from '../baseview';

import {renderViewByLoadingState} from './PageState';
const PageDecorator = (ComponentClass) => {

  const target = ComponentClass;
  if (!ComponentClass.xgNavigationBarOptions){
    console.warn('Error: YOU MAY MISS static xgNavigationBarOptions config');
  }
  const xgNavigationBarOptions = ComponentClass.xgNavigationBarOptions || {};

  /* -------------toast-------------  */
  target.prototype.xg_toastShow = function (title, params) {
    if (!this.xg_toast) {
      return;
    }
    this.xg_toast.showToast(title, params || {});
  };
  target.prototype.xg_toastDismiss = function (callBack) {
    if (!this.xg_toast) return;
    this.xg_toast.dismiss(typeof callBack === 'function' ? callBack : null);
  };
  target.prototype.xg_isToastShow = function () {
    if (!this.xg_toast) return false;
    return this.xg_toast.isToastShow();
  };


  /* -------------loading----------  */
  target.prototype.xg_loadingShow = function (msg, params) {
    if (!this.xg_loadingHub) return;
    this.xg_toastDismiss();
    this.xg_loadingHub.loadingShow(msg, params || {});
  };
  target.prototype.xg_loadingDismiss = function (callBack) {
    if (!this.xg_loadingHub) return;
    this.xg_loadingHub.dismiss(typeof callBack === 'function' ? callBack : null);
  };
  target.prototype.xg_isLoadingShow = function () {
    if (!this.xg_loadingHub) return false;
    return this.xg_loadingHub.isLoadingShow();
  };


  /* -------------alert----------  */
  target.prototype.xg_alertShow = function (params) {
    this.xg_alertView && this.xg_alertView.alertShow(params);
  };
  target.prototype.xg_alertDismiss = function (callBack) {
    this.xg_alertView &&  this.xg_alertView.dismiss(callBack);
  };
  target.prototype.xg_isAlertShow = function () {
    if (!this.xg_alertView) return false;
    return this.xg_alertView.isAlertShow();
  };



  /* -------------XGNavigatorBar-------------  */
  target.prototype.xg_NavigationBarHiddenLeftItem = function (hidden, callBack) {
    //隐藏左边item
    if (!this.xg_navigatorBar) return;
    this.xg_navigatorBar.hiddenLeftItem(hidden, callBack);
  };
  target.prototype.xg_NavigationBarHiddenRightItem = function (hidden, callBack) {
    //隐藏右边item
    if (!this.xg_navigatorBar) return;
    this.xg_navigatorBar.hiddenRightItem(hidden, callBack);
  };
  target.prototype.xg_NavigationBarResetTitle = function (newTitle, callBack) {
    //更换title
    if (!this.xg_navigatorBar) return;
    this.xg_navigatorBar.changeTitle(newTitle, callBack);
  };


  /*------------------所有函数的封装------------------*/
  target.prototype.xg_getAllFunc = function () {
      return {
          xg_toastShow: this.xg_toastShow.bind(this),
          xg_toastDismiss: this.xg_toastDismiss.bind(this),
          xg_isToastShow: this.xg_isToastShow.bind(this),

          xg_loadingShow: this.xg_loadingShow.bind(this),
          xg_loadingDismiss: this.xg_loadingDismiss.bind(this),
          xg_isLoadingShow: this.xg_isLoadingShow.bind(this),

          xg_alertShow: this.xg_alertShow.bind(this),
          xg_alertDismiss: this.xg_alertDismiss.bind(this),
          xg_isAlertShow: this.xg_isAlertShow.bind(this),

          xg_NavigationBarHiddenLeftItem: this.xg_NavigationBarHiddenLeftItem.bind(this),
          xg_NavigationBarHiddenRightItem: this.xg_NavigationBarHiddenRightItem.bind(this),
          xg_NavigationBarResetTitle: this.xg_NavigationBarResetTitle.bind(this),
      };
  };

  const targetRender = ComponentClass.prototype.render;
  ComponentClass.prototype.render = function () {

    const {renderByPageState} = xgNavigationBarOptions;

    let controlParams = null;

    if (renderByPageState) {
      try {
        controlParams = this.xg_getPageStateOptions();
      } catch (error) {
        console.warn('when you set true, you need implementation xg_getPageStateOptions function to return your page state');
        controlParams = {};
      }
    }

    const that = this;

    return (<View style={styles.container}>

      <XGNavigatorBar {...xgNavigationBarOptions}
        leftPressed={()=> (this.xg_NavigationBarLeftPressed || xgNavigationBarDefaultLeftPressed).call(this)}
        rightPressed={()=>(this.xg_NavigationBarRightPressed || xgNavigationBarDefaultRightPressed).call(this)}
        ref={(bar)=>{this.xg_navigatorBar = bar;}}/>

      {
        renderByPageState ? renderViewByLoadingState(controlParams, () => {
          return targetRender.call(that);
        }) : targetRender.call(this)
      }

      <AlertView ref={(alertView) => {this.xg_alertView = alertView;}}/>

      <ToastView ref={(toast) => {this.xg_toast = toast;}}/>

      <LoadingHub ref={(loadingHub) => {this.xg_loadingHub = loadingHub;}}/>

    </View>);
  };
};

// 左右按钮默认的点击效果
function xgNavigationBarDefaultLeftPressed(callBack) {
  try {
    this.props.navigation.pop();
    callBack && callBack();
  } catch (error) {
    console.warn('xgNavigationBarDefaultLeftPressed error ');
    console.warn(error);
  }
}

function xgNavigationBarDefaultRightPressed() {
  console.warn('mark sure you had set xg_NavigationBarRightPressed func');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PageDecorator;
