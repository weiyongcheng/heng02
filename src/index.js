import {StackNavigator, TabNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';

import SplashPage from './pages/SplashPage';

import HomePage from './pages/home/HomePage';
import KaijiangPage from './pages/kaijiang/KaijiangPage';
import ZixunPage from './pages/zixun/ZixunPage';
import BisaiPage from './pages/bisai/BisaiPage';
import GongjuxiangPage from './pages/gongjuxiang/GongjuxiangPage';
import PersonalPage from './pages/personal/PersonalPage';
import ZixunListPage from './pages/zixun/ZixunListPage';
import WanfajieshaoPage from './pages/kaijiang/WanfajieshaoPage';
import LishikaijiangPage from './pages/kaijiang/LishikaijiangPage';
import WanfajiqiaoPage from './pages/kaijiang/WanfajiqiaoPage';
import ZoushiPage from './pages/kaijiang/ZoushiPage';
import KaijiangxiangqingPage from './pages/kaijiang/KaijiangxiangqingPage';
import YucePage from './pages/kaijiang/YucePage';
import ZixunDetail from './pages/zixun/ZixunDetail';
import BisaiDetailPage from './pages/bisai/BisaiDetailPage';
import HaommatuijianPage from './pages/gongjuxiang/HaomatuijianPage';
import TouzhureduPage from './pages/gongjuxiang/TouzhureduPage';
import JiangjinjisuanPage from './pages/gongjuxiang/JiangjinjisuanPage';
import XuetangPage from './pages/gongjuxiang/XuetangPage';

import BottomBar from './components/BottomBar';
import UpdateView from './components/UpdateView';

class App extends Component{

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={{flex: 1}} horizontal={true} ref={sl => this.sl = sl}
                            scrollEnabled={false} showsHorizontalScrollIndicator={false}>
                    <HomePage navigation={this.props.navigation}/>
                    <KaijiangPage navigation={this.props.navigation}/>
                    <ZixunPage navigation={this.props.navigation}/>
                    <BisaiPage navigation={this.props.navigation}/>
                    <GongjuxiangPage navigation={this.props.navigation}/>
                </ScrollView>
                <BottomBar callback={(pos) => {
                    if (pos >= 5) {
                        this.props.navigation.navigate('PersonalPage');
                    }
                    this.sl && this.sl.scrollTo({x: __MAX_SCREEMT__ * pos, y: 0, animated: true})
                }}/>
            </View>
        );
    }
}

const AppRoute = StackNavigator({
    SplashPage: {
        screen: SplashPage
    },
    App: {
      screen: App
    },
    ZixunListPage: {
        screen: ZixunListPage
    },
    WanfajieshaoPage: {
        screen: WanfajieshaoPage
    },
    LishikaijiangPage: {
        screen: LishikaijiangPage
    },
    WanfajiqiaoPage: {
        screen: WanfajiqiaoPage
    },
    ZoushiPage: {
        screen: ZoushiPage
    },
    KaijiangxiangqingPage: {
        screen: KaijiangxiangqingPage
    },
    YucePage: {
        screen: YucePage
    },
    ZixunDetail: {
        screen: ZixunDetail
    },
    BisaiDetailPage: {
        screen: BisaiDetailPage
    },
    PersonalPage: {
        screen: PersonalPage
    },
    HaommatuijianPage: {
        screen: HaommatuijianPage
    },
    TouzhureduPage: {
        screen: TouzhureduPage
    },
    JiangjinjisuanPage: {
        screen: JiangjinjisuanPage
    },
    XuetangPage: {
        screen: XuetangPage
    }
}, {
    headerMode: 'none',
});

export default class AppRouter extends Component{

    render() {
        return (
            <View style={{flex: 1}}>
                <AppRoute/>

                <UpdateView />
            </View>
        );
    }
}