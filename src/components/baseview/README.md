# XGBaseview
RN容器-基础组件库

## 功能
基础组件库
提供组件组件：
    LoadingHub,     //loading指示器
    ToastView,      //toast指示器
    AlertView,      //alert弹框
    // 通用组件
    CheckBox,       //复选框
    EmptyView,      //为空页
    NullView,       //什么都不展示的页面
    LoadingView,    //加载页面
    GeneralButton,  //按钮（内置0.5s节流）
    NetFailedView,  //网络加载失败页

## 安装

### 私有库操作

```
nrm ls
```
如果提示nrm命令不存在,如下操作

```
npm install -g nrm
```
然后增加私有库地址并使用:

```

nrm add xgnpm  http://172.16.2.71:4873/
nrm use xgnpm
npm install
```


### 安装依赖
````
$ yarn add xgrn-baseview
````

### JS使用教程

````
// 在项目入口根文件处，进行全局配置。
import {XGBaseViewConfig} from 'xgrn-baseview';
XGBaseViewConfig({
    themeColor: '#62BEC5',          //主题色
    highlightBgColor: '#C6E7EA',    //高亮颜色
    disableThemeColor: '#C6E7EA',   //不可用颜色
    loadingGif: null,               //Gif加载图
    netNotConnectImage: null,       //网络未连接图片
    serverErrorImage: null,         //数据异常图片
    checkBoxSelectedIcon: null,     //复选框选中图片
    checkBoxUnSelectedIcon: null,   //复选框非选中图片
});

import {
    CheckBox,
    EmptyView,
    NetFailedView,
    NullView,
    LoadingView,
    GeneralButton,
} from 'xgrn-baseview';

        //渲染按钮
        return (
            <View>
                <GeneralButton
                    withoutFeedback={true}
                    disabled={false}
                    title={'无高亮'}
                    click={this._clickBtn}/>
                <GeneralButton
                    style={{marginTop: 20}}
                    withoutFeedback={false}
                    disabled={false}
                    title={'有高亮'}
                    click={this._clickBtn}/>
                <GeneralButton
                    style={{marginTop: 20}}
                    withoutFeedback={false}
                    disabled={true}
                    title={'无高亮-不可用状态'}
                    click={this._clickBtn}/>

                <GeneralButton
                    style={{marginTop: 20}}
                    withoutFeedback={true}
                    disabled={true}
                    title={'有高亮-不可用状态'}
                    click={this._clickBtn}/>
            </View>);

    // 渲染复选框
    renderCheckBox = ()=>{
        return (<CheckBox isSelected={this.state.isSelected} onClick={()=>{
            this.setState({
                isSelected: !this.state.isSelected
            });
        }}/>)
    };

    // 渲染网络异常页面
    renderNetFailedView = ()=>{
        return (<NetFailedView
            netFailedInfo={new Error('23432')}
            callback={()=>{
                alert('重新加载');
            }}/>);
    };

    // 渲染为空页面
    renderEmptyView = ()=>{
        return (<EmptyView description={'描述信息'} />);
        或者更多配置如下
        return （<EmptyView
            style={'这里是style，可以自定义'}
            source={'自定义图片资源'}
            imageStyle={'这里自定义图片的样式'}
            description={'描述信息'}
            subDescription={'副描述信息，如果有值会显示，没值不显示'}
            isScrollViewContainer={'是否包含下拉刷新组件'}
            isRefresh={'标记是否处于刷新状态'}
            onRefresh={'包含下拉刷新组件时，下拉刷新调用'}
        />);

    };
````








