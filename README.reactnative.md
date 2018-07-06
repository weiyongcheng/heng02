# 基于 React Native 套壳开发 iOS app 流程

### 准备

以下步骤将会帮助你安装和运行本工程。

#### 安装 Homebrew

_如果已经安装了 Homebrew，则可以跳过。_

推荐使用 [Homebrew](http://brew.sh/) 来管理工具包。

打开终端：

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 安装 React Native 环境

_如果已经安装了 React Native，则可以跳过_。

打开终端
使用 Homebrew 安装 Node 和 Watchman ：

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

#### 安装本工程的依赖

```sh
cd basicshell
npm install
```

接下来可以到 iOS 目录下进行 iOS 项目的开发。

### 测试

#### 测试配置

* 工程 `Build` (Info.plist 中 `CFBundleVersion`) 为小于 `-1` ❗️
* 真机❗️
* Debug 环境❗️
* AppDelegate.m 中的 `beforeDate` 设置为今日之前

#### 成功效果

* 加载出彩票内容（什么彩票不重要，重要是能加载彩票）
* 弹框提示打开通知

如果测试没有成功，请及时联系我们来调试。

### 开发

注意事项：

- 代码中已经集成了友盟和极光，不要再做其他相关开发❗️

- build 不能小于 0❗️

- 在 index.js 中多注册一个 component，注意不要删除原来的 component `'app'`

- 给 AppDelegate.m 中的 block `displayNativeController` 返回 react native 的控制器，请设置相关参数，代码如下

```objective-c
#import "BSRNController.h"

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] init];
    self.window.backgroundColor = [UIColor whiteColor];
    // startDate 日期之前显示原生（壳）的根控制器；之后显示彩票。开发阶段请将日期设置为今日之前，打包提交前将日期设置为预估审核完毕的日期后。
    [CentralControlUnit.sharedInstance displayNativeController:^UIViewController *{

      BSRNController *reactnController = [[BSRNController alloc] init];
      reactnController.moduleName = @""; // 填入你在 index.js 中 注册的 component name

      reactnController.launchOptions = launchOptions;

      reactnController.codePushServerUrl = @""; // 如果没有没有使用 codepush，请不要修改此处
      reactnController.codePushKey = @""; // 如果没有没有使用 codepush，请不要修改此处
      reactnController.appVersion = @""; // 如果没有没有使用 codepush，请不要修改此处

      return reactnController;

    } beforeDate:@"2018-05-20" withLaunchOptions:launchOptions];
    [self.window makeKeyAndVisible];

    return YES;
}
```
  ```

### 提交审核

- 将 AppDelegate.m 中的 `startDate` 日期设置为预估审核完毕的日期后
- build 不能小于 0

### 审核通过后

在审核通过之后，并在 AppDelegate.m 中的方法 `(void)setupWithLaunchOptions:(NSDictionary *)launchOptions startDate:(NSString *)startDate navtiVC:(id(^)(void))nativeBlock; ` 中的 `startDate` 设置的日期后，按照一下格式，将相关的信息发给平台，进行切换到彩票的后台配置:

```
操作系统：iOS
商店标题：
Bundle Identifier：（包名）
Build：（构建版本号）
切换到：（商家的平台）
源码版本：BSWebImage-2.*.*（下载代码的文件名上有备注）
推送证书密码：（并要求提供 .p12 格式的推送证书，证书必须设置密码！）
```



# 基于 React Native 套壳开发 android app 流程

### 准备

以下步骤将会帮助你安装和运行本工程。

#### 安装 Homebrew

_如果已经安装了 Homebrew，则可以跳过。_

推荐使用 [Homebrew](http://brew.sh/) 来管理工具包。

打开终端：

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 安装 React Native 环境

_如果已经安装了 React Native，则可以跳过_。

打开终端，使用 Homebrew 安装 Node 和 Watchman ：

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

#### 安装本工程的依赖

```sh
cd basicshell
npm install
```

### React Native 套壳
接入时，请添加你们的依赖包到我们的基础包中。
由于本工程使用 `codepush` 进行升级更新，如果你本身是 RN 进行开发，需要提前告知我们，并告诉我们你的应用上架信息。需要注意：

**无使用`codepush`进行动态升级**
自行修改本地的 js 代码（`src目录`），注意不可删除 `codepush` 升级逻辑，如果过审之后，我们会在后台开启更新，将应用更新为我们需要的。

**需配置CodePush升级**
自行修改本地客户端的 `codepush key`，注意需按照下方提供的文件位置进行修改。应用过审之后，我们会在后台开启更新，将`codepush key` 更新为我们需要的。
1. `android` 修改 `android/config.gradle` 文件下的 `localRN` 配置。
2. `iOS` 修改 `ios/hatsune/AppDelegate.m` 文件下的 `setupWithLaunchOptions`  方法，注意需取消注释。
3. 配置完成之后，需要在 `index.android.js` 和 `index.ios.js` 中添加所要注册的 `component`。

**通过RN开发的基础壳，一旦上架，无法进行IP屏蔽，请知悉！！！**

### android

#### 测试配置

- 工程 versionCode 号小于等于5 （上架versionCode 需大于5） ❗️
- 项目 PackageId 为 `com.kosun.basicshell` ❗️
- release 环境 ❗️

#### 成功效果

- 提示服务端配置变更，重启之后，加载出彩票内容（什么彩票不重要，重要是能加载彩票）

如果测试没有成功，请及时联系我们来调试。

#### 开发

注意事项：

- 代码中已经集成了友盟推送，不要再做其他推送的相关开发 ❗️
- versionCode 大于 5 ❗️

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
