// /**
//  * Created by yuanyuan on 17-8-15.
// import {
//     PageStateMobx,
//     PageLoadingState,
//     renderViewByLoadingState,
// } from 'BaseComponents';

import PageStateMobx from './PageStateMobx';
import {PageLoadingState, renderViewByLoadingState} from './PageState';

export default function pageState(config = {}) {

    return (ComponentClass) => {
        const target = ComponentClass;
        target.prototype.pageStateMobx = new PageStateMobx();
        target.prototype.pageStateMobx.loadingState = PageLoadingState.loading;
        const targetRender = target.prototype.render;
        target.prototype.render = function () {

            const {netFailedCallbackName = ''} = config;
            let netFailedCallback = this[netFailedCallbackName];
            if (!netFailedCallback) {
                netFailedCallback = () => {};
            }

            return renderViewByLoadingState({
                loadingState: this.pageStateMobx.loadingState,
                netFailedProps: {
                    netFailedInfo: this.pageStateMobx.netFailedInfo,
                    callback: netFailedCallback
                },
            }, () => {
                return targetRender && targetRender.call(this);
            });
        };
    };
}
