import {observable, computed, action} from 'mobx';

class WinnerMobx {

    @observable
    data = {};

    @action
    setDatas(datas = {}) {
        this.data = datas;
    }
}

export default new WinnerMobx();