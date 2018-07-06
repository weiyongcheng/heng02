/**
 * Created by wjyx on 2017/7/22.
 *
 * 页面状态管理mobx
 */

import {observable, action} from 'mobx';
//可枚举的页面数据加载状态
// import PageLoadingState from '../PageLoadingState.json';
import {PageLoadingState} from './PageState';

class PageStateMobx {

    @observable //页面加载状态
    loadingState = PageLoadingState.loading;

    @observable //页面加载出错的原因，一般为ApiProvider的返回值或者error类型
    netFailedInfo = null;

    @observable //为空页面时候，控制 scrollView 是否处于 onRefresh 状态
    emptyViewIsRefresh = false;

    @action
    showEmptyView() {
        this.emptyViewIsRefresh = false;
        this.loadingState = PageLoadingState.empty;
    }

    @action
    showSuccess() {
        this.loadingState = PageLoadingState.success;
    }

    @action
    showLoading() {
        this.loadingState = PageLoadingState.loading;
    }

    @action  //页面加载失败的时候，仅仅处理ApiProvider的网络层返回值或者 .then中的Error类型
    showNetFail(netFailedInfo) {
        this.netFailedInfo = netFailedInfo;
        this.loadingState = PageLoadingState.fail;
    }


}

export default PageStateMobx;
