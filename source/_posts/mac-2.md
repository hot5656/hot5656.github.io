---
title: Ｍac App 設定與使用
abbrlink: aede
date: 2024-12-29 17:47:59
categories: OS
tags:
  - mac
---

### ＶSCode
#### 快捷鍵
option + Up/Down : 行前後移
Ｃmd + X : 剪下
Cmd + C : 複製
Cmd + V : 貼上
Cmd + Z : 取消

<!--more-->

Cmd + S : 存檔
Cmd + / : 註釋設定或取消
Ｃmd + Left/Right : 跳至行最前/最後
Cmd + F : 搜尋
Cmd + Ｕp/Down : 跳至檔案最前/最後
Cmd + ]/[ : 縮排加/減
control + G : 跳至指定行
Cmd + K : 清除終端機
control + Cmd + F : 全螢幕
shift + Cmd + P : 命令列

### 截圖
Ｓhift + Cmd + 3 : 截圖螢幕
Ｓhift + Cmd + 4 : 截圖選取
Ｓhift + Cmd + 4 + Sapce : 截圖視窗
Ｓhift + Cmd + 5 : 截圖選擇功能

### Command line tools
#### install 
``` bash
# install
xcode-select --install
# test
xcode-select -p
# or belower command
xcode-select --print-path
# 是一條在 macOS 上配置 Xcode 命令行工具（Command Line Tools）使用路徑的命令
# 若有需要再執行
# sudo xcode-select --switch /Library/Developer/CommandLineTools


# if not success, check below
ls /Library/Developer
# if need, check macOS update
softwareupdate --list
softwareupdate --install -a
```

#### remove Command line tools(if need for reinstall)
``` bash
sudo xcode-select --reset
sudo rm -rf /Library/Developer/CommandLineTools
```

### Homebrew
#### install
``` bash
# install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# Apple Silicon (M1/M2 芯片),將以下內容添加到 ~/.zshrc 文件中：
export PATH="/opt/homebrew/bin:$PATH"
# 更新配置
source ~/.zshrc
# check path
ls /opt/homebrew/bin/brew
# check 
brew --version
# can check path setting
echo $PATH
``` 

### git
#### install
``` bash
brew install git
```

#### command
``` bash
# change brecnch
git checkout brecnch_name
```

### node.js
#### install 
``` bash
# down mac version the install
# check instelled complete
node --version
npm --version
```

### hexo
#### install
``` bash
npm install -g hexo-cli
# check
hex version
```

### python
#### install
``` bash
# install pyenv
brew install pyenv
pyenv --version
# check support version
pyenv install --list
# install/uninstall python
pyenv install 3.10.12
pyenv uninstall 3.10.12
# check version
python --version    
  Python 3.10.12
pyenv version
  3.10.12 (set by /Users/gaoyiping/.pyenv/version)
# show all install 
pyenv versions
  system
* 3.10.12 (set by /Users/gaoyiping/.pyenv/version)
  3.11.6
  3.11.6/envs/my3116
  my3116 --> /Users/gaoyiping/.pyenv/versions/3.11.6/envs/my3116
# change python's version
pyenv global 3.11.6
pyenv versions     
  system
  3.10.12
* 3.11.6 (set by /Users/gaoyiping/.pyenv/version)
  3.11.6/envs/my3116
  my3116 --> /Users/gaoyiping/.pyenv/versions/3.11.6/envs/my3116
python --version
  Python 3.11.6
# install pyenv-virtualenv
brew install pyenv-virtualenv
# add env
pyenv virtualenv 3.1.16 my3116
# switch env
gaoyiping@gaoyipingdeMacBook-Pro ~ % pyenv activate my3116
(my3116) gaoyiping@gaoyipingdeMacBook-Pro ~ % pyenv versions       
  system
  3.10.12
  3.11.6
  3.11.6/envs/my3116
* my3116 --> /Users/gaoyiping/.pyenv/versions/3.11.6/envs/my3116 (set by PYENV_VERSION environment variable)
(my3116) gaoyiping@gaoyipingdeMacBook-Pro ~ % python --version     
  Python 3.11.6
```

#### set VS Code python version
Shift + Cmd + P

<div style="max-width:500px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>


### nano
+ control + O : 儲存
+ control + X : 離開程式 

### 滑鼠運行(修正滑鼠滑動方向)
<div style="max-width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### 參考資料
+ [vscode常用快捷键](https://blog.csdn.net/qq_38282362/article/details/139044434)