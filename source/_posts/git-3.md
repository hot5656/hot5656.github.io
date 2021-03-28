---
title: Git 在windows 下中文亂碼的問題
abbrlink: b35
date: 2021-03-23 11:10:02
categories: Coding
tags:
	- git
	- issue
---

### gitk 中文亂碼 
``` bash
git config --global core.quotepath false   		 #顯示status編碼
git config --global gui.encoding utf-8			 #圖形界面編碼
git config --global i18n.commit.encoding utf-8   	 #提交信息編碼
git config --global i18n.logoutputencoding utf-8	 #輸出log編碼
```
<!--more-->
### warning: LF will be replaced by CRLF in xxxxx
``` bash
git config --global core.autocrlf false
```

### hexo d or git commit -m 含中文 Warning
Warning: Your console font probably doesn't support Unicode.
``` bash
git config --global core.quotepath off
git config --global --unset i18n.logoutputencoding
git config --global --unset i18n.commitencoding
```


### 參考文件
+ [解决 Git 在windows 下中文亂碼的問題](https://gist.github.com/nightire/5069597)
