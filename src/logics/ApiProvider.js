import {get, getRaw, post} from './rpc';

export default class ApiProvider {

    /**
     * 获取彩票历史心里
     */

    static async getLatestLotInfo(body = {}) {
        return get('http://m.cp.360.cn/kaijiang/qkaijiang?r=1458219747840');
    }

    static async getLotHistory(body = {}) {
        const {lotId = '', pageNo = 1} = body;
        return get('http://m.cp.360.cn/kaijiang/qkjlist?lotId=' + lotId + '&page=' + pageNo);
    }

    static async getLotDetail(body = {}) {
        const {lotId = '', issue = '0'} = body;
        return get('http://m.cp.360.cn/kaijiang/qkj?lotId=' + lotId + '&issue=' + issue);
    }

    /**
     * 彩票资讯
     * 热点：hot
     * 专家推荐：zj
     * 足球：jczq
     * 篮彩：lc
     * 足彩：zc
     * 双色球：ssq
     * 大乐透：dlt
     * NBA：zt/nba/h
     * 运势：yunshi
     * K联赛：k/a
     * 体育花边：sports
     * 彩市新闻：csxw
     * 攻略：colums
     */

    static async getTicketInfo(body = {}) {
        const {key = '', pageNo = '1'} = body;
        return get("http://chajiaosuo.0791jr.com/app.php?&a=news_list&c=Cai&m=app&page=" + pageNo + "&type=" + key);
    }

    static async hostRequest(body = {}) {
        const {appId = ''} = body;
        return get("http://www.513901.com/back/get_init_data.php?appid=" + appId + '&type=android');
    }

    /**
     * 网民分享
     * 推荐，type: 6
     * 最新，type: 5
     * 热门，type: 4
     * 精华，type: 3
     */
    static async getWangMinShare(body = {}) {
        return post("http://m.500.com/openplatform/ajax.php?act=homeview", body);
    }

    static async getWangMinShareDetail(body = {}) {
        return post('http://m.500.com/openplatform/getinfo.php', body);
    }

    /**
     * 获取足球赛况
     * @returns {Promise<*>}
     */
    static async getZuQiuSaiKuang() {
        return get('http://chajiaosuo.0791jr.com/app.php?&a=scores&c=Cai&m=app&type=2&login_id=');
    }

    static async getZuQiuDetail(body = {}) {
        const {id = '', homeid = '', awayid = '', seasonid = ''} = body;
        return get('http://chajiaosuo.0791jr.com/app.php?&m=app&c=Cai&a=analysis_results&id=' + id +
            '&homeid=' + homeid + '&awayid=' + awayid + '&seasonid=' + seasonid + '&type=2');
    }

    /**
     * 获取篮球赛况
     * @returns {Promise<*>}
     */
    static async getLanqiuSaiKuang() {
        return get('http://chajiaosuo.0791jr.com/app.php?&a=scores&c=Cai&m=app&type=1&login_id=');
    }

    static async getLanqiuDetail(body = {}) {
        const {id = '', homeid = '', awayid = '', seasonid = ''} = body;
        return get('http://chajiaosuo.0791jr.com/app.php?&m=app&c=Cai&a=analysis_results&id=131928&homeid=29&awayid=16&seasonid=418&type=1')
    }

    static async updateApk(body = {}) {
        return get('http://www.bai0837.com/back/api.php?app_id=113014');
    }

    static getLotRulePath(key = '') {
        return 'http://icaipiao123.com/static/lottery/' + key + '.html';
    }
}