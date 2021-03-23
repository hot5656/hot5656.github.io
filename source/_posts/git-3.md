---
title: Git 在windows 下中文亂碼的問題
abbrlink: b35
date: 2021-03-23 11:10:02
categories: Coding
tags:
	- git
	- issue
---

### 設定 config
``` bash
git config --global core.quotepath false   		 #顯示status編碼
git config --global gui.encoding utf-8			 #圖形界面編碼
git config --global i18n.commit.encoding utf-8	 #提交信息編碼
git config --global i18n.logoutputencoding utf-8	 #輸出log編碼
```

### 參考文件
+ [解决 Git 在windows 下中文亂碼的問題](https://gist.github.com/nightire/5069597)
