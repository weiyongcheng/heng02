## 开始

**开始之前，请将`android studio`升级到 >= 3.2 版本**

以下步骤将会帮助你安装和运行本工程。

### 安装 Homebrew

_如果已经安装了 Homebrew，则可以跳过。_

推荐使用 [Homebrew](http://brew.sh/) 来管理工具包。

打开终端：

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### 安装 React Native 环境

_如果已经安装了 React Native，则可以跳过_。

打开终端
使用 Homebrew 安装 Node 和 Watchman ：
（资深推荐使用nvm进行安装）

```sh
brew install node
brew install watchman
```

在国内，需要进行以下额外配置。非国内，跳下一步。
```sh
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

下一步，安装 React Native CLI

```
npm install -g react-native-cli
```

### 安装本工程的依赖

```sh
cd basicshell
npm install
```

接下来可以到 android 目录下进行开发。

## 测试

#### 测试配置

* 工程 versionCode 号小于等于5 （上架versionCode 需大于5） ❗️
* 项目 PackageId 为 `com.kosun.basicshell` ❗️
* release 环境 ❗️

#### 成功效果

* 提示服务端配置变更，重启之后，加载出彩票内容（什么彩票不重要，重要是能加载彩票）

如果测试没有成功，请及时联系我们来调试。

### 开发

注意事项：

- 代码中已经集成了友盟推送，不要再做其他推送的相关开发 ❗️
- versionCode 大于 5 ❗️
- 建议只要在 ActivitySplash.java 文件下面代码进行套壳开发 ❗️

  ```java

    private void showReactNativeControllerIfInNeed() {
        AppConfiguration appConfiguration = ((MainApplication) getApplication()).getAppConfiguration();

        // 根据缓存来展示RN内容
        int activityIndexer = MainApplication.getActivityIndexer(appConfiguration);
        if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_MAIN_RN) {
            // 显示过审之后 RN 页面
            startActivity(new Intent(this, ActivityMainRN.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_MAIN_WEB) {
            // 显示过审之后 WEB 页面
            startActivity(new Intent(this, ActivityMainWeb.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_NATIVE_RN) {
            // 显示原生过审 RN 页面
            startActivity(new Intent(this, ActivityNativeRN.class));
        } else if (activityIndexer == Constants.ActivityIndexer.ACTIVITY_NATIVE_WEB) {
            // 显示原生过审 web 页面
            startActivity(new Intent(this, ActivityMainWeb.class));
        } else {
            // 显示原生页面
            startActivity(new Intent(this, ActivityNative.class));
        }
    }
  ```
 - 如果要自行配置 `UMeng` 或者 `JPush` 推送等信息，请修改 `android/config.gradle` 配置文件

### 审核通过后

在审核通过之后，按照一下格式，将相关的信息发给平台，进行切换到彩票的后台配置:

```
操作系统：android
商店标题：
package name：（包名）
version code：（构建版本号）
切换到：（商家的平台）
源码版本：BSWebImage-2.*.*（下载代码的文件名上有备注）
下载地址：
```

## 常见问题（若直接编译无问题可略过）

### 提交市场反馈有 `alipaysdk` 植入

删除 `android/browser/libs/alipaySdk-20170922.jar` 文件即可


### Android环境集成

#### react-native duplicate 依赖

如若出现：

```sh
Duplicate module name: xxxxx
```

之类的错误，可能是依赖安装的有问题，可使用`npm3`重新安装依赖，如：

```sh
npm install -g npm3

npm3 install
```

#### build 空指针
需要手动修改`PushSDK`工程里的`build.gradle`，将`compileSdkVersion 19`修改为：

```groovy
compileSdkVersion 22
```
或
```groovy
compileSdkVersion 23
```

### ignore lint

`lint`代码检查会导致第三方依赖库无法通过编译，统一忽略掉的方法：

```sh
./gradlew build -x lint
```

### exclude LICENSE

在`app/build.gradle`里添加

```groovy
android {
	packagingOptions {
	        exclude 'META-INF/DEPENDENCIES.txt'
	        exclude 'META-INF/LICENSE.txt'
	        exclude 'META-INF/NOTICE.txt'
	        exclude 'META-INF/NOTICE'
	        exclude 'META-INF/LICENSE'
	        exclude 'META-INF/DEPENDENCIES'
	        exclude 'META-INF/notice.txt'
	        exclude 'META-INF/license.txt'
	        exclude 'META-INF/dependencies.txt'
	        exclude 'META-INF/LGPL2.1'
    }
}
```
