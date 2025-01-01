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
#### install
+ [download Android Studio](https://developer.android.com/studio?source=post_page-----3adcc728273e--------------------------------&hl=zh-tw)

<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>

+ insatll and setup

``` bash
# 不加入之前設定
# select - Do not importtings

# Install Type - Standard
```


+ 修正 Android 問題

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

### reference
+ [在 Mac 上準備 Flutter App 的開發環境](https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-flutter-app-%E9%96%8B%E7%99%BC%E5%95%8F%E9%A1%8C%E8%A7%A3%E7%AD%94%E9%9B%86/%E5%9C%A8-mac-%E4%B8%8A%E6%BA%96%E5%82%99-flutter-app-%E7%9A%84%E9%96%8B%E7%99%BC%E7%92%B0%E5%A2%83-3ccebbd3a0bd)
+ [在 mac 上安裝 Android Studio](https://apppeterpan.medium.com/在-mac-上安裝-android-studio-3adcc728273e)
+ [Flutter-Course-Resources](https://github.com/londonappbrewery/Flutter-Course-Resources)

