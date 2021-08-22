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

### git log 中文亂碼
``` bash
git log --oneline
9a4c0ad (HEAD -> master) add react/todolist-simulate
67e1fd1 (origin/master) add home/week17/draw for lottery api
83067f7 1. add be2 add ex2,ex3  by express 2. add home/week17/blog by expres
03332c5 b02 add bootstrap
eb2da5b add be2
8d22b8d update 2021/7/30 for some mysql DB update
9064c08 1. week11/blog fix issue strtval() and add sftp.json
78725c8 1. gulp, sass, webpack practice 2. blog change to scss 3. week8/hw2 change to fetch 4. add comment_api plogin
39285c6 Todo List BS4 update 2021/7/7-2
2668226 1. Todo List BS4 update 2021/7/7 2. comment_api <E5><85><8D><E8><A8><BB><E5><86><8A><E7><95><99><E8><A8><80><E6><9D><BF>(API) update 2021/7/7
c8362fe Todo List BS4 update fix some issue
6c1e5c9 comment_api <E5><85><8D><E8><A8><BB><E5><86><8A><E7><95><99><E8><A8><80><E6><9D><BF>(API) update 2021/7/6
4332e80 Todo List BS4 modify checkbox change event'
b57753b Todo List BS4 add todo edit
d8cf243 1. add comment_api <E5><85><8D><E8><A8><BB><E5><86><8A><E7><95><99><E8>
<A8><80><E6><9D><BF>(API) 2. add BS4 todo list
489779a add jQuery and Bootstrap 4 practice
a164f76 update blog 1. <E9><A6><96><E9><A0><81>,<E5><88><86><E9><A1><9E>,more
<E9><A0><81><E9><9D><A2><E5><8A><A0><E7><B7><A8><E8><BC><AF><E5><8A><9F><E8><83><BD> 2. Header <E6><8F><90><E5><87><BA><E4><BE><86><E6><88><90><E5><8F><A6><E4>
<B8><80><E5><80><8B><E6><AA><94><E6><A1><88> 3. edit <E5><B0><8E><E8><87><B3>
```

``` bash
set LC_ALL=C.UTF-8
```

``` bash
D:\work_google\share\li>git log --oneline
9a4c0ad (HEAD -> master) add react/todolist-simulate
67e1fd1 (origin/master) add home/week17/draw for lottery api
83067f7 1. add be2 add ex2,ex3  by express 2. add home/week17/blog by expres
03332c5 b02 add bootstrap
eb2da5b add be2
8d22b8d update 2021/7/30 for some mysql DB update
9064c08 1. week11/blog fix issue strtval() and add sftp.json
78725c8 1. gulp, sass, webpack practice 2. blog change to scss 3. week8/hw2 change to fetch 4. add comment_api plogin
39285c6 Todo List BS4 update 2021/7/7-2
2668226 1. Todo List BS4 update 2021/7/7 2. comment_api 免註冊留言板(API) update 2021/7/7
c8362fe Todo List BS4 update fix some issue
6c1e5c9 comment_api 免註冊留言板(API) update 2021/7/6
4332e80 Todo List BS4 modify checkbox change event'
b57753b Todo List BS4 add todo edit
d8cf243 1. add comment_api 免註冊留言板(API) 2. add BS4 todo list
489779a add jQuery and Bootstrap 4 practice
a164f76 update blog 1. 首頁,分類,more頁面加編輯功能 2. Header 提出來成另一個檔案 3. edit 導至原進入網頁 4. 顯示部分限制 by php md_substr()
2e826fe update blog 1. add CKEditor 2. 分類功能 3. 分頁功能 4. 關於我頁面
b0b349c blog add php code
655cc8f add blog
5280ef3 commit 權限管理改為可彈性設定
```

### 參考文件
+ [解决 Git 在windows 下中文亂碼的問題](https://gist.github.com/nightire/5069597)
