---
title: Mac 基本設定與使用
abbrlink: af9e
date: 2024-12-29 17:47:52
categories: OS
tags:
  - mac
---

### 基本操作
#### 觸控軌跡板

<!--more-->

##### 設定
+ 設定點選 : 系統設定 -> 觸控軌跡板 -> 點一下來選
+ 三指拉動 : 系統設定 -> 輔助功能 -> 觸控軌跡板選項 -> 使用觸控式軌跡板來拖移 + 拖移樣式：三指拖移
+ 
##### 使用
+ 拖移 : 三指拉動
+ 選 : 點一下

#### App 操作
+ 退出 : Cmd + Q
+ 隱藏視窗 : Cmd + H
+ 切換同 App 不同視窗 : Cmd + ~
+ 跳出/進入 全螢幕 : Control + Cmd + F
+ 關掉 Finder 視窗 : Cmd + W 
+ 切換 App : Cmd + Tab
+ show 所有執行 App : control + Up / F3


#### 其他 
+ option + Cmd + Esc : 跳出強制結束應用程式視窗
+ 移除 App :Ｆinder -> 應用程式 -> 點選 App -> Cmd + Del
+ 查使用 shell 
``` bash
(my3116) gaoyiping@gaoyipingdeMacBook-Pro ~ % echo $SHELL
  /bin/zsh
```

### 設定
#### .zshenv 與 .zshrc 有何差異
##### .zshenv
+ 作用：.zshenv 用於設定 Zsh shell 的環境變數和基本配置，它會在每次啟動 Zsh 時被加載，包括 登錄 shell 和 交互式 shell。
+ 加載時機：無論是登錄 shell（如開機後第一次進入 terminal）還是交互式 shell（如開啟新的 terminal 視窗），都會加載 .zshenv。
+ 適用場景：這個檔案通常用來設定環境變數、路徑 ($PATH)，或者其他系統層面的配置，這些配置在所有的 Zsh 執行環境中都應該存在。
+ .zshenv 會在所有的 Zsh shell（登錄式與非登錄式）啟動時加載，這意味著它是最先加載的配置檔案。
+ .zshenv：用於設定環境變數、路徑等通用設置，對所有 shell 都有效（包括非交互式 shell）。
+ 範例
``` bash
export PATH=$HOME/bin:/usr/local/bin:$PATH
``` 
這段配置會設置一個新的命令別名 ll，以及定義顯示提示符的樣式。

##### .zshrc
+ 作用：.zshrc 是用來設定交互式 shell 的配置檔案，主要包括定制命令提示符、別名、函數、PS1 提示符設置、命令歷史配置等。
+ 加載時機：只有當你啟動 交互式 shell 時，.zshrc 才會被加載。這包括你打開一個新的終端窗口，或者在終端中執行 zsh 命令啟動一個新的 Zsh shell。
+ 適用場景：.zshrc 是用來設置交互式命令行環境的地方，適合放置你希望在日常使用中經常訪問的配置，例如別名、提示符樣式、快捷命令等。
+ .zshrc 只有在啟動交互式 shell 時才會加載，這意味著它在 .zshenv 之後加載。
+ .zshrc：用於設定交互式 shell 的特定配置，如命令提示符、別名、函數等，只在交互式 shell 中加載。
+ 範例
``` bash
alias ll='ls -l'
export PS1='%n@%m %1~ %# '
```
這些檔案的加載順序和用途取決於你使用的是登錄 shell 還是非登錄 shell。