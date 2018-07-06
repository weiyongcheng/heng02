/**
 * Created by nuomi on 2018/1/29.
 */

import React from 'react';

import {
    NullView,
    EmptyView,
    LoadingView,
    NetFailedView
} from '../baseview';

// 可枚举的页面数据加载状态
const PageLoadingState = {
    loading: "loading",
    empty: "empty",
    success: "success",
    fail: "fail",
    null: "null"
};

/**
 * 根据页面状态，返回不同加载状态的组件
 * @param loadingStateAndSetting 各种页面状态的配置参数
 * @param renderSuccessView 如果页面是加载成功状态时，渲染的组件 是一个函数，类似于render函数
 * @returns 返回渲染loadingStateAndSetting.loadingState 对应的组件
 */
function renderViewByLoadingState(loadingStateAndSetting, renderSuccessView) {
    if (!loadingStateAndSetting || typeof loadingStateAndSetting !== 'object') {
        __DEV__ && console.warn('Please check loadingStateAndSetting params of current page,' +
            'maybe you had set wrong format loadingStateAndSetting');
        return <NullView />;
    }
    const {
        loadingState,
        loadingProps = {},    //加载中样式
        netFailedProps = {},  //请求失败样式
        emptyProps = {}       //空数据样式
    } = loadingStateAndSetting;
    const successCallBack = (typeof renderSuccessView === 'function') ? renderSuccessView : () => {
            __DEV__ && console.warn('Please check renderViewByLoadingState`s second params ' +
                'which will be render when loading state success');
            return <NullView />;
        };
    switch (loadingState) {
        case PageLoadingState.loading:
            return <LoadingView {...loadingProps} />;
        case PageLoadingState.fail:
            return <NetFailedView {...netFailedProps} />;
        case PageLoadingState.empty:
            return <EmptyView {...emptyProps} />;
        case PageLoadingState.success:
            return successCallBack();
        case PageLoadingState.null:
        default:
            console.warn('make sure you set right state');
            return <NullView />;
    }
}

export {
    PageLoadingState,
    renderViewByLoadingState
};
