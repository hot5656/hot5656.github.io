---
title: Flutter setup for Mac
abbrlink: '3778'
date: 2024-12-30 10:32:24
categories: Coding
tags:
  - mac
	- flutter
---

### install flutter
+ [download flutter](https://docs.flutter.dev/get-started/install/macos/mobile-android)
<div style="max-width:500px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

+ setup for flutter

``` bash
# add directory development
mkdir development

# move flutter to ~/development

# If it exists, open the Zsh environmental variable file ~/.zshenv in your text editor. If it doesn't, create ~/.zshenv.
# Copy the following line and paste it at the end of your ~/.zshenv file.
export PATH=$HOME/development/flutter/bin:$PATH

# open new terminal, check flutter
flutter --version
# check install list
flutter doctor
```

### Android Studio
#### Setting
##### Setting Emulator mode
<div style="max-width:500px">
	{% asset_img pic10.png pic10 %}
</div>

#### Homebrew install

1. install by brew
``` bash
# 使用 Homebrew 安裝
brew install --cask android-studio
```

2. check flutter 
``` bash
gaoyiping@gaoyipingdeMacBook-Pro ~ % flutter doctor                   
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.29.1, on macOS 15.3 24D60 darwin-arm64, locale
    zh-Hant-TW)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from:
      https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK
      components.
      (or visit https://flutter.dev/to/macos-android-setup for detailed
      instructions).
      If the Android SDK has been installed to a custom location, please use
      `flutter config --android-sdk` to update to that location.

[✓] Xcode - develop for iOS and macOS (Xcode 16.2)
[✓] Chrome - develop for the web
[✓] Android Studio (version 2024.3)
[✓] VS Code (version 1.97.2)
[✓] Connected device (3 available)
[✓] Network resources

! Doctor found issues in 1 category.
```

3. install Android sdk
Android Studio -> Settings -> Langues & Frameworks -> Android SDK --> Edit then "next run..." 
 or
Android Studio -> Tool -> SDK manager
<div style="max-width:500px">
	{% asset_img pic7.png pic7 %}
</div>

4. 修正 Android 其他問題
``` bash
# 缺少 cmdline-tools： cmdline-tools 組件缺失，需要安裝。你可以執行以下命令來安裝它：
#
# install by Android Studio
# Android Studio -> Tools -> SDK manager -> SDK Tools -> Android SDK Command-line Tool(latest)

# Android 許可狀態未知： 你需要接受 Android SDK 許可協議。可以透過執行以下命令來接受：
flutter doctor --android-licenses

# test
flutter doctor

# flutter config --android-sdk "/Applications/Android Studio.app/Contents"
```

#### Homebrew install --> remove
``` bash
brew uninstall android-studio
```

#### download install
1. [download Android Studio](https://developer.android.com/studio?source=post_page-----3adcc728273e--------------------------------&hl=zh-tw)
<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>

2. insatll and setup
``` bash
# 不加入之前設定
# select - Do not importtings

# Install Type - Standard
```


3. 修正 Android 問題
``` bash
flutter doctor
  [!] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
      ✗ cmdline-tools component is missing
        Run `path/to/sdkmanager --install "cmdline-tools;latest"`
        See https://developer.android.com/studio/command-line for more details.
      ✗ Android license status unknown.
        Run `flutter doctor --android-licenses` to accept the SDK licenses.
        See https://flutter.dev/to/macos-android-setup for more details.
# 缺少 cmdline-tools： cmdline-tools 組件缺失，需要安裝。你可以執行以下命令來安裝它：
#
# install by Android Studio
# Android Studio -> Tools -> SDK manager -> SDK Tools -> Android SDK Command-line Tool(latest)

# Android 許可狀態未知： 你需要接受 Android SDK 許可協議。可以透過執行以下命令來接受：
flutter doctor --android-licenses

# test
flutter doctor
```

#### download install --> remove
1. 關閉 Android Studio
2. Finder，進入 /Applications/
3. Android Studio.app
4. Library 相關資料：
``` bash
rm -rf ~/Library/Preferences/AndroidStudio*
rm -rf ~/Library/Application Support/AndroidStudio*
rm -rf ~/Library/Logs/AndroidStudio*
rm -rf ~/Library/Caches/AndroidStudio*
```
5. SDK（如果要完全重新安裝）：
``` bash
rm -rf ~/Library/Android
rm -rf ~/.android
```
6. Gradle 設定（如果要完全重置）：
``` bash
rm -rf ~/.gradle
  or
sudo rm -rf ~/.gradle 
```

#### simple test(Android)
+ Run Android studio
+ New Flutter Projevt
+ Project name modify
+ select: Android + iOS
+ select device management
+ create virtual device
+ Select device(create previous)
+ run main.dart 

#### simple test(iOS-need install Xcode and CocoaPods complete)
+ Run Android studio
+ Select device(open iOS simulator) 
+ Select device(select iPhone open) 
+ run main.dart 

### Xcode
#### install
+ install from app store
+ select mac OS 15.0, iSI 18.0, predictive Code Completion Model
+ 若 install 有失敗, Xcode -> Settings 選擇需安裝項目繼續安裝

#### 設定 Xcode
``` bash
# set path
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
# 首次啟動設置
sudo xcodebuild -runFirstLaunch
```

#### 安裝 CocoaPods
#### install(等很久不知是否執行) 
``` bash
# install
sudo gem install cocoapods
# check
pod --version
```

#### clone 再安裝
``` bash
# clone 較容易看到進度
git clone https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git ~/.cocoapods/repos/trunk

# 需安裝 ruby
ruby --version
# 未安裝,如下安裝 
brew install ruby
# 確認 CocoaPods 是否已正確安裝：
pod --version

# install
sudo gem install cocoapods
```

#### 修正安裝問題
``` bash
flutter doctor
  [!] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
      ✗ cmdline-tools component is missing
        Run `path/to/sdkmanager --install "cmdline-tools;latest"`
        See https://developer.android.com/studio/command-line for more details.
      ✗ Android license status unknown.
        Run `flutter doctor --android-licenses` to accept the SDK licenses.
        See https://flutter.dev/to/macos-android-setup for more details.
  [!] Xcode - develop for iOS and macOS (Xcode 16.2)
      ✗ CocoaPods not installed.
          CocoaPods is a package manager for iOS or macOS platform code.
          Without CocoaPods, plugins will not work on iOS or macOS.
          For more info, see https://flutter.dev/to/platform-plugins
        For installation instructions, see
        https://guides.cocoapods.org/using/getting-started.html#installation

gaoyiping@gaoyipingdeMacBook-Pro ~ % ruby --version
  ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin24]

gaoyiping@gaoyipingdeMacBook-Pro ~ % sudo gem install cocoapods
Password:
ERROR:  Error installing cocoapods:
	The last version of activesupport (>= 5.0, < 8) to support your Ruby & RubyGems was 6.1.7.10. Try installing it with `gem install activesupport -v 6.1.7.10` and then running the current command again
	activesupport requires Ruby version >= 3.1.0. The current ruby version is 2.6.10.210.

# 安裝或更新 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update

gaoyiping@gaoyipingdeMacBook-Pro ~ % brew --version
  Homebrew 4.4.13

# 使用 Homebrew 安裝最新版本的 Ruby
# brew install ruby
gaoyiping@gaoyipingdeMacBook-Pro ~ % brew install ruby
Warning: ruby 3.4.1 is already installed and up-to-date.
To reinstall 3.4.1, run:
  brew reinstall ruby

# check 設定
# ~/.zshrc（預設 zsh）
# export PATH="/opt/homebrew/bin:$PATH"

# 加載配置
source ~/.zshrc

# 重新執行安裝命令 CocoaPods
sudo gem install cocoapods

# error 
gaoyiping@gaoyipingdeMacBook-Pro ~ % sudo gem install cocoapods
Password:
ERROR:  Error installing cocoapods:
	The last version of activesupport (>= 5.0, < 8) to support your Ruby & RubyGems was 6.1.7.10. Try installing it with `gem install activesupport -v 6.1.7.10` and then running the current command again
	activesupport requires Ruby version >= 3.1.0. The current ruby version is 2.6.10.210.

# 問題仍然是由於 Ruby 的版本過低導致的。下面是更詳細的解決步驟，確保你能順利升級 Ruby 並安裝 CocoaPods。

# 使用 rbenv 升級 Ruby
# rbenv 是一個管理多個 Ruby 版本的工具，建議使用它來安裝和管理 Ruby。
# 安裝 rbenv 和 ruby-build
brew install rbenv ruby-build

# 添加 rbenv 到環境變數
# 編輯你的 Shell 配置檔案 ~/.zshrc
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"

# 執行
source ~/.zshrc 

# 確認 rbenv 是否已正確安裝：
rbenv -v
  rbenv 1.3.0

# 安裝 Ruby 3.1 或更新版本
# 使用 rbenv 安裝 Ruby：
rbenv install 3.2.2
rbenv global 3.2.2
# check version
ruby --version
  ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin24]

# 你的問題是因為即使安裝了 Ruby 3.2.2，你的終端仍在使用系統自帶的 Ruby 2.6.10。這通常是因為 rbenv 沒有正確配置或生效。

# 確認 rbenv 已正確安裝
# 檢查 rbenv 是否已被加到環境變數中：
echo $PATH
  /Users/gaoyiping/.rbenv/shims:/Users/gaoyiping/.rbenv/bin:/opt/homebrew/opt/ruby:/opt/homebrew/Cellar/pyenv-virtualenv/1.2.4/shims:/Users/gaoyiping/.pyenv/shims:/Users/gaoyiping/.pyenv/bin:/opt/homebrew/bin:/opt/homebrew/opt/ruby:/opt/homebrew/Cellar/pyenv-virtualenv/1.2.4/shims:/Users/gaoyiping/.pyenv/bin:/opt/homebrew/bin:/opt/homebrew/Cellar/pyenv-virtualenv/1.2.4/shims:/Users/gaoyiping/.pyenv/bin:/opt/homebrew/bin:/usr/local/bin:/System/Cryptexes/App/usr/bin:/usr/bin:/bin:/usr/sbin:/sbin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:/Library/Apple/usr/bin:/Users/gaoyiping/development/flutter/bin

# 確保輸出中有類似以下的路徑：
# /Users/gaoyiping/.rbenv/bin

# 確認 Ruby 版本
# 再次檢查目前正在使用的 Ruby 版本：
rbenv versions
    system
  * 3.2.2 (set by /Users/gaoyiping/.rbenv/version)
gaoyiping@gaoyipingdeMacBook-Pro ~ % ruby --version
  ruby 2.6.10p210 (2022-04-12 revision 67958) [universal.arm64e-darwin24]

# 刪除系統 Ruby 緩存
# 如果步驟 2 完成後還是無法正確使用，嘗試刪除舊的 Ruby 緩存：
hash -r
# 然後再次檢查：
ruby --version
  ruby 3.2.2 (2023-03-30 revision e51014f9c0) [arm64-darwin24]

# 重試 CocoaPods 安裝
# 如果 Ruby 已經成功切換到 3.2.2，現在可以嘗試安裝 CocoaPods：
sudo gem install cocoapods

# test
flutter doctor
  [!] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
      ✗ cmdline-tools component is missing
        Run `path/to/sdkmanager --install "cmdline-tools;latest"`
        See https://developer.android.com/studio/command-line for more details.
      ✗ Android license status unknown.
        Run `flutter doctor --android-licenses` to accept the SDK licenses.
        See https://flutter.dev/to/macos-android-setup for more details.
  [✓] Xcode - develop for iOS and macOS (Xcode 16.2)
```

### Run iOS simulator
1. In Xcode, go to Open Developer Tool > Simulator
<div style="max-width:500px">
	{% asset_img pic8.png pic8 %}
</div>

2. Search for "Simulator" in Spotlight
<div style="max-width:500px">
	{% asset_img pic9.png pic9 %}
</div>

3. open by VsCode or Android Studio


### Vs Code 
#### command
+ Cmd+Shift+P 

#### flutter special
+ Widget Wrap select : Control + Shift + R (click Right -> Refactor)

#### add Extension
+ Flutter
+ Flutter Widget Snippets
+ Awesome Flutter Snippets

### some option setting
#### change icon
##### generate icon
[App icon Generator](https://www.appicon.co/)

<div style="max-width:500px">
	{% asset_img pic4.png pic4 %}
</div>

##### replace icon - android(remove and move)

<div style="max-width:500px">
	{% asset_img pic5.png pic5 %}
</div>

##### replace icon - iOS(remove and move)

<div style="max-width:500px">
	{% asset_img pic6.png pic6 %}
</div>

##### stop -> run

### run on Android Physical Device
#### 無線偵錯
+ 設定 -> 開發人員選項 -> 無線偵錯 -> 使用配對碼配對裝置(show 配對碼,IP,通訊埠)  
+ run adb link
``` bash
adb pair 192.168.18.8:41133
  Enter pairing code: 970068
  Successfully paired to 192.168.18.8:41133 [guid=adb-RFCR10MGBFR-gLb6Jb]
```

+ 若 adb 未設定 path,如下設定
```bash
# add adb path
ls ~/Library/Android/sdk/platform-tools
  NOTICE.txt		lib64			package.xml
  adb			make_f2fs		source.properties
  etc1tool		make_f2fs_casefold	sqlite3
  fastboot		mke2fs
  hprof-conv		mke2fs.conf
adb version
  zsh: command not found: adb
nano ~/.zshrc
# 添加如下內容
export PATH=$PATH:~/Library/Android/sdk/platform-tools/
# 執行
source ~/.zshrc
adb version

# 測試 adb
adb devices
  List of devices attached
  emulator-5554	device
```

+ select device 點選連接手機 -> run "main.dart"
手機可看到執行

+ device manager 點選 Start Mirroring 可在 Mac 看到手機畫面

+ device manager 點選 Stop Mirroring 可在 Mac 上畫面消失

+ 斷開手機 
手機無線偵錯 disable

#### USB 偵錯  
+ 使用 USB 連接
+ 設定 -> 開發人員選項 -> USB 偵錯
+ ...

### flutter Map
+ Widget
  + [Basic Widgets](/2025/02/16/flutter-7/#Basic-Widgets)
  + [Widget-Example](/2025/02/16/flutter-7/#Widget-Example)
  + [Function](/2025/02/16/flutter-7/#Function)
+ Other  
  + [Condition process](/2025/02/16/flutter-7/#Condition-process)
  + [Plugin](/2025/02/16/flutter-7/#Plugin)


### flutter
#### flutter upgrade
``` bash
flutter upgrade
Upgrading Flutter to 3.29.0 from 3.27.1 in
/Users/gaoyiping/development/flutter...
Downloading Darwin arm64 Dart SDK from Flutter engine f73bfc4522dd0bc87bbcdb4bb3088082755c5e87...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
  0  205M    0  488k    0     0   496k      0  0:07:03 --:--:--  0:07:03  495k
  1  205M    1 3296k    0     0  1662k      0  0:02:06  0:00:01  0:02:05 1662k
  2  205M    2 6013k    0     0  2008k      0  0:01:44  0:00:02  0:01:42 2007k
  ...

Downloading darwin-arm64/font-subset tools...                    1,020ms

Flutter 3.29.0 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 35c388afb5 (5 天前) • 2025-02-10 12:48:41 -0800
Engine • revision f73bfc4522
Tools • Dart 3.7.0 • DevTools 2.42.2

Running flutter doctor...
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.29.0, on macOS 15.3 24D60 darwin-arm64, locale zh-Hant-TW)
[✓] Android toolchain - develop for Android devices (Android SDK version 35.0.0)
[✓] Xcode - develop for iOS and macOS (Xcode 16.2)
[✓] Chrome - develop for the web
[✓] Android Studio (version 2024.2)
[✓] VS Code (version 1.97.0)
[✓] Connected device (3 available)
[✓] Network resources

• No issues found!
```

#### create fulutter project
``` bash
# create flutter project goo_mood(content include Android, iOS, web..)  
flutter create go_mood
``` 

#### flutter clean
清除 Flutter 專案的暫存檔案與建置快取
當 Flutter 專案出現異常（如編譯錯誤、舊版檔案未更新等）時，這個指令可以幫助重建環境。
主要清除的項目：
+ build/ 資料夾（編譯產物）
+ .dart_tool/（Flutter 相關工具產生的暫存檔）
+ .packages（舊版 Dart 相依性資訊）
+ iOS 與 Android 的 Generated.xcconfig、Gradle build 產物

使用時機：
+ 修改 Flutter 原生代碼（Android 或 iOS）後，變更未生效
+ flutter run 或 flutter build 遇到奇怪的錯誤
+ 套件更新後，出現 相依性錯誤 或 不相容問題
+ 執行完 flutter clean 之後，通常需要重新下載套件：flutter pub get

#### flutter pub get
下載並安裝 pubspec.yaml 中的相依性套件
這個指令會讀取 pubspec.yaml 檔案，然後下載並安裝所有 Flutter & Dart 的相依性套件，並將資訊寫入 pubspec.lock。
主要影響的檔案：
+ 下載 pubspec.yaml 中定義的所有套件
+ 產生 pubspec.lock（鎖定的相依性版本）
+ 建立 .dart_tool/ 快取資料夾

使用時機：
+ 新增或修改 pubspec.yaml 的相依性 後，需要下載新套件
+ flutter clean 之後，需要重新取得所有套件
+ 團隊合作時，拉取新代碼後 需確保本地相依性與 pubspec.lock 相符

#### flutter pub outdated
檢查相依性套件是否有新版本
這個指令會比對當前專案安裝的套件版本 (pubspec.lock) 與 最新可用版本，並顯示哪些套件需要更新。
+ Current：目前安裝的版本（來自 pubspec.lock）
+ Upgradable：可以更新的版本（符合 pubspec.yaml 的版本範圍）
+ Resolvable：如果放寬 pubspec.yaml 限制，可以安裝的最高版本
+ Latest：目前可用的最新版本

``` bash
flutter pub outdated                                                 
  Changing current working directory to: /Users/gaoyiping/work/git/flutter-bootcamp-udemy/taskly
  Showing outdated packages.
  [*] indicates versions that are not the latest available.

  Package Name              Current  Upgradable  Resolvable  Latest  

  direct dependencies: all up-to-date.

  dev_dependencies: all up-to-date.

  transitive dependencies: 
  material_color_utilities  *0.11.1  *0.11.1     *0.11.1     0.12.0  

  transitive dev_dependencies:
  async                     *2.12.0  *2.12.0     *2.12.0     2.13.0  
  fake_async                *1.3.2   *1.3.2      *1.3.2      1.3.3   
  leak_tracker              *10.0.8  *10.0.8     *10.0.8     10.0.9  
  vm_service                *14.3.1  *14.3.1     *14.3.1     15.0.0  
  all dependencies are up-to-date.
```
### Tools
#### Java
``` bash
# install java
brew install openjdk@17
    ==> Downloading https://formulae.brew.sh/api/formula.jws.json
    ==> Downloading https://formulae.brew.sh/api/cask.jws.json
    ==> Downloading https://ghcr.io/v2/homebrew/core/openjdk/17/manifests/17.0.14-1
    ######################################################################################################################################################################################################################################################### 100.0%
    ==> Fetching openjdk@17
    ==> Downloading https://ghcr.io/v2/homebrew/core/openjdk/17/blobs/sha256:ad49acafe0bbbd4e5459f386239fb2dc44171965d69a5071e4d403f14ea61a2f
    ######################################################################################################################################################################################################################################################### 100.0%
    ==> Pouring openjdk@17--17.0.14.arm64_sequoia.bottle.1.tar.gz
    ==> Caveats
    For the system Java wrappers to find this JDK, symlink it with
      sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

    openjdk@17 is keg-only, which means it was not symlinked into /opt/homebrew,
    because this is an alternate version of another formula.

    If you need to have openjdk@17 first in your PATH, run:
      echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> /Users/gaoyiping/.zshrc

    For compilers to find openjdk@17 you may need to set:
      export CPPFLAGS="-I/opt/homebrew/opt/openjdk@17/include"
    ==> Summary
    🍺  /opt/homebrew/Cellar/openjdk@17/17.0.14: 636 files, 304.2MB
    ==> Running `brew cleanup openjdk@17`...
    Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
    Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).

# set env
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
echo 'export CPPFLAGS="-I/opt/homebrew/opt/openjdk@17/include"' >> ~/.zshrc
source ~/.zshrc

# show java version
gaoyiping@gaoyipingdeMacBook-Pro android % java -version
    openjdk version "17.0.14" 2025-01-21
    OpenJDK Runtime Environment Homebrew (build 17.0.14+0)
    OpenJDK 64-Bit Server VM Homebrew (build 17.0.14+0, mixed mode, sharing)
```
#### Gradle and Gradlew 
##### add dumpVersion in build.gradle.kts
``` bash
tasks.register("dumpVersion") {
    doLast {
        val versionFile = file("version.txt")
        versionFile.writeText("""
            Version Code: ${flutter.versionCode}
            Version Name: ${flutter.versionName}
            Min SDK: ${flutter.minSdkVersion}
            Target SDK: ${flutter.targetSdkVersion}
        """.trimIndent())
        println("Version information written to version.txt")
    }
}
``` 
##### Gradle
Gradle 是一種 開源的自動化建置工具（Build Automation Tool），主要用於：
+ 編譯 與 建置（Build）Java、Kotlin、Android 及其他語言的專案。
+ 管理依賴（Dependency Management）。
+ 執行測試、打包發佈（如產生 .jar、.apk）。
+ 任務自動化（如 CI/CD）。

``` bash
# install gradle (是何作用)
brew install gradle  # Mac 上安裝 Gradle

gradle --version     # 確保安裝成功
  Welcome to Gradle 8.13!

  Here are the highlights of this release:
  - Daemon JVM auto-provisioning
  - Enhancements for Scala plugin and JUnit testing
  - Improvements for build authors and plugin developers

  For more details see https://docs.gradle.org/8.13/release-notes.html


  ------------------------------------------------------------
  Gradle 8.13
  ------------------------------------------------------------

  Build time:    2025-02-25 09:22:14 UTC
  Revision:      073314332697ba45c16c0a0ce1891fa6794179ff

  Kotlin:        2.0.21
  Groovy:        3.0.22
  Ant:           Apache Ant(TM) version 1.10.15 compiled on August 25 2024
  Launcher JVM:  23.0.2 (Homebrew 23.0.2)
  Daemon JVM:    /opt/homebrew/Cellar/openjdk/23.0.2/libexec/openjdk.jdk/Contents/Home (no JDK specified, using current Java home)
  OS:            Mac OS X 15.3 aarch64

# run 
gaoyiping@gaoyipingdeMacBook-Pro android % gradle dumpVersion

> Task :app:dumpVersion
Version information written to version.txt

[Incubating] Problems report is available at: file:///Users/gaoyiping/work/git/flutter-bootcamp-udemy/taskly/build/reports/problems/problems-report.html

Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/8.13/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

BUILD SUCCESSFUL in 7s
6 actionable tasks: 6 executed

# version.txt(in file)
Version Code: 1
Version Name: 1.0.0
Min SDK: 21
Target SDK: 35

# check gradle by brew
aoyiping@gaoyipingdeMacBook-Pro android % brew list gradle
/opt/homebrew/Cellar/gradle/8.13/bin/gradle
/opt/homebrew/Cellar/gradle/8.13/libexec/bin/gradle
/opt/homebrew/Cellar/gradle/8.13/libexec/docs/ (11605 files)
/opt/homebrew/Cellar/gradle/8.13/libexec/lib/ (307 files)
/opt/homebrew/Cellar/gradle/8.13/libexec/src/ (10400 files)
/opt/homebrew/Cellar/gradle/8.13/sbom.spdx.json
gaoyiping@gaoyipingdeMacBook-Pro android % 

# uninsatll gradle
gaoyiping@gaoyipingdeMacBook-Pro android % brew uninstall gradle
Uninstalling /opt/homebrew/Cellar/gradle/8.13... (22,320 files, 461.5MB)
==> Autoremoving 1 unneeded formula:
openjdk
Uninstalling /opt/homebrew/Cellar/openjdk/23.0.2... (602 files, 337.4MB)

# check uninstall
gaoyiping@gaoyipingdeMacBook-Pro android % gradle -v            
zsh: command not found: gradle
gaoyiping@gaoyipingdeMacBook-Pro android % gradle --version                                                     
zsh: command not found: gradle
```

##### Gradlew
gradlew 是 Gradle Wrapper（Gradle 包裝工具），它的作用是：
+ 自動下載並管理 Gradle 版本，無需手動安裝 Gradle。
+ 確保團隊成員或 CI/CD 環境使用相同的 Gradle 版本，避免環境差異問題。
+ 允許在沒有安裝 Gradle 的環境中直接執行 Gradle 命令。

``` bash
# dump #1
gaoyiping@gaoyipingdeMacBook-Pro android % ./gradlew dumpVersion                                                  

    Welcome to Gradle 8.10.2!

    Here are the highlights of this release:
    - Support for Java 23
    - Faster configuration cache
    - Better configuration cache reports

    For more details see https://docs.gradle.org/8.10.2/release-notes.html

    Starting a Gradle Daemon, 1 incompatible Daemon could not be reused, use --status for details

    > Configure project :path_provider_android
    Your project is configured with Android NDK 26.3.11579264, but the following plugin(s) depend on a different Android NDK version:
    - path_provider_android requires Android NDK 27.0.12077973
    Fix this issue by using the highest Android NDK version (they are backward compatible).
    Add the following to /Users/gaoyiping/work/git/flutter-bootcamp-udemy/taskly/android/app/build.gradle.kts:

        android {
            ndkVersion = "27.0.12077973"
            ...
        }


    > Task :app:dumpVersion
    Version information written to version.txt

    Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

    You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

    For more on this, please refer to https://docs.gradle.org/8.10.2/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

    BUILD SUCCESSFUL in 15s
    7 actionable tasks: 7 executed

# dump #2
gaoyiping@gaoyipingdeMacBook-Pro android % ./gradlew dumpVersion
    > Task :app:dumpVersion
    Version information written to version.txt

    Deprecated Gradle features were used in this build, making it incompatible with Gradle 9.0.

    You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

    For more on this, please refer to https://docs.gradle.org/8.10.2/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

    BUILD SUCCESSFUL in 1s
    7 actionable tasks: 2 executed, 5 up-to-date

# version.txt(in file)
Version Code: 1
Version Name: 1.0.0
Min SDK: 21
Target SDK: 35
```

##### Gradle VS Gradlew 的差別
|  | Gradle (gradle)	|Gradlew (gradlew)| 
|----------------|-----------------|-------------------|
| 是否需手動安裝？	|是，需安裝 Gradle	| 否，自動下載 Gradle| 
| 確保版本一致？	|否，需手動安裝相同版本	| 是，專案內的 gradle-wrapper.properties 會指定版本| 
| 適用於 CI/CD？	|不推薦，需預裝 Gradle	| 推薦，確保環境一致| 
| 如何執行？	|gradle build	| ./gradlew build（Linux/macOS）或 gradlew.bat build（Windows）| 

##### 何時使用 Gradle vs. Gradlew？
+ 開發者環境：如果你已安裝 Gradle，且版本管理不是問題，可以用 gradle。
+ 團隊協作：建議使用 gradlew，確保大家用相同的 Gradle 版本。
+ CI/CD（如 GitHub Actions、Jenkins、GitLab CI）：使用 gradlew 來自動下載對應版本，避免環境不一致問題。
Gradle (gradle)：手動安裝，適合本地開發但版本管理麻煩。
Gradlew (gradlew)：專案內管理 Gradle 版本，推薦用於團隊開發與 CI/CD。
一般來說，建議 優先使用 gradlew，確保環境一致，減少兼容性問題！ 

### Issue
#### Your project is configured with Android NDK 26.3.11579264
``` bash
Launching lib/main.dart on sdk gphone64 arm64 in debug mode...
Your project is configured with Android NDK 26.3.11579264, but the following plugin(s) depend on a different Android NDK version:
- path_provider_android requires Android NDK 27.0.12077973
Fix this issue by using the highest Android NDK version (they are backward compatible).
Add the following to /Users/gaoyiping/work/git/flutter-bootcamp-udemy/taskly/android/app/build.gradle.kts:

    android {
        ndkVersion = "27.0.12077973"
        ...
    }

✓ Built build/app/outputs/flutter-apk/app-debug.apk
I/flutter (28980): [IMPORTANT:flutter/shell/platform/android/android_context_gl_impeller.cc(94)] Using the Impeller rendering backend (OpenGLES).
W/HWUI    (28980): Failed to choose config with EGL_SWAP_BEHAVIOR_PRESERVED, retrying without...
W/HWUI    (28980): Failed to initialize 101010-2 format, error = EGL_SUCCESS
I/Gralloc4(28980): mapper 4.x is not supported
Connecting to VM Service at ws://127.0.0.1:63311/mU9Fz3V7bms=/ws
Connected to the VM Service.
....
```

``` bash
# fix
# build.gradle.kts

android {
    namespace = "com.example.taskly"
    compileSdk = flutter.compileSdkVersion
    // kyp: change
    // ndkVersion = flutter.ndkVersion
    ndkVersion = "27.0.12077973"
    ......
}

# 或許需下以下命令
flutter clean
flutter pub get
flutter pub outdated
```

``` bash
# check ndk version
# android.ndkVersion 用來指定 Android NDK 版本，確保專案與原生 C/C++ 程式碼相容。
gaoyiping@gaoyipingdeMacBook-Pro android % cat ~/Library/Android/sdk/ndk/*/source.properties 
Pkg.Desc = Android NDK
Pkg.Revision = 26.3.11579264
Pkg.ReleaseName = r26d
Pkg.Desc = Android NDK
Pkg.Revision = 27.0.12077973
Pkg.BaseRevision = 27.0.12077973
Pkg.ReleaseName = r27
gaoyiping@gaoyipingdeMacBook-Pro android % cat ~/Library/Android/sdk/ndk/*/source.properties | grep Pkg.Revision
Pkg.Revision = 26.3.11579264
Pkg.Revision = 27.0.12077973
```
### Other
#### flutter map to Android version
``` bash
# Kotlin file build.gradle.kts
defaultConfig {
    applicationId = "com.example.taskly"
    minSdk = flutter.minSdkVersion        // 最低支援 Android API
    targetSdk = flutter.targetSdkVersion  // 目標 Android API
    versionCode = flutter.versionCode
    versionName = flutter.versionName
}

# dump 
# version.txt(in file)
Version Code: 1
Version Name: 1.0.0
Min SDK: 21      --> Android 5.0
Target SDK: 35   --> Android 14 (Upside Down Cake) 的後續版本
```

#### Android map to API Level 
| Android 版本	| API Level	| 發佈年份|
|--------------|-----------|--------|
| Android 15	 | 35	| 2024|
| Android 14	 | 34	| 2023|
| Android 13	 | 33	| 2022|
| Android 12L	 | 32	| 2022|
| Android 12	 | 31	| 2021|
| Android 11	 | 30	| 2020|
| Android 10	 | 29	| 2019|
| Android 9	   | 28	| 2018|
| Android 8.1	 | 27	| 2017|
| Android 8.0	 | 26	| 2017|
| Android 7.1	 | 25	| 2016|
| Android 7.0	 | 24	| 2016|
| Android 6.0	 | 23	| 2015|
| Android 5.1	 | 22	| 2015|
| Android 5.0	 | 21	| 2014|
| Android 4.4W | 20	| 2014|
| Android 4.4	 | 19	| 2013|
| Android 4.3	 | 18	| 2013|
| Android 4.2	 | 17	| 2012|
| Android 4.1	 | 16	| 2012|
| Android 4.0.3 - 4.0.4	| 15	| 2011|
| Android 4.0.1 - 4.0.2	| 14	| 2011|
| Android 3.2	| 13	| 2011|
| Android 3.1	| 12	| 2011|
| Android 3.0	| 11	| 2011|
| Android 2.3.3 - 2.3.7	| 10	| 2011|
| Android 2.3 - 2.3.2	| 9	| 2010|
| Android 2.2	| 8	| 2010|
| Android 2.1	| 7	| 2010|
| Android 2.0.1	| 6	| 2009|
| Android 2.0	| 5	| 2009|
| Android 1.6	| 4	| 2009|
| Android 1.5	| 3	| 2009|
| Android 1.1	| 2	| 2009|
| Android 1.0	| 1	| 2008|



### reference
+ [在 Mac 上準備 Flutter App 的開發環境](https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-flutter-app-%E9%96%8B%E7%99%BC%E5%95%8F%E9%A1%8C%E8%A7%A3%E7%AD%94%E9%9B%86/%E5%9C%A8-mac-%E4%B8%8A%E6%BA%96%E5%82%99-flutter-app-%E7%9A%84%E9%96%8B%E7%99%BC%E7%92%B0%E5%A2%83-3ccebbd3a0bd)
+ [在 mac 上安裝 Android Studio](https://apppeterpan.medium.com/在-mac-上安裝-android-studio-3adcc728273e)
+ [Flutter-Course-Resources](https://github.com/londonappbrewery/Flutter-Course-Resources)
+ [Flutter](https://docs.flutter.dev/)

