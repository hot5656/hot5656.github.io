---
title: Git 說明
abbrlink: cbf4
date: 2021-03-22 11:16:18
categories: Coding
tags:
  - git
---

## 基本原理

### Git儲存每次專案更新時的快照
檔案沒有變更，Git不會再度儲存該檔案，而是記錄到前一次的相同檔案的連結。
<div style="width:500px">
	{% asset_img pic1.jpg pic1 %}
</div>

### 三種狀態
已修改(modified),已暫存(staged)及已提交(committed)
<div style="width:500px">
	{% asset_img pic2.jpg pic2 %}
</div>



## config 設定

### config 種類及位置(windows)
project > global > system
+ system - C:\ProgramData\Git\config
+ global - C:\Users\\$YourName\\.gitconfig
+ project - .git/config

### config 命令

#### global
``` bash
# 設定 global 用戶名稱/電子郵件
git config --global user.name "Robert Kao"
git config --global user.email robert@example.com
# 顯示 global 用戶名稱/電子郵件
git config --global --get user.name
git config --global --get user.email
git config --global user.name
git config --global user.email
# 顯示 global 設定內容
git config --global --list
```

#### project
``` bash
# 設定 project 用戶名稱/電子郵件
git config user.name "Your project specific name"
git config user.email "your@project-specific-email.com"
# 顯示 project 用戶名稱/電子郵件
git config --get user.name
git config --get user.email
git config user.name
git config user.email
```

#### 檢查所有設定值
``` bash
git config --list
```

#### 指定編輯器(本人少用)
Git會使用系統預設的編輯器，一般來說是Vi或Vim(commit 未加 -m 時使用)
``` bash
# 如指定 Emacs
git config --global core.editor emacs
```

#### 指定合併工具(本人未用)
解決合併失敗時，讀者慣用的合併工具
Git能接受kdiff3、tkdiff、meld、xxdiff、emerge、vimdiff、gvimdiff、ecmerge及opendiff做為合併工具
``` bash
# 假設讀者想使用vimdiff
git config --global merge.tool vimdiff
```

## 基本操作

### 在現有目錄初始化儲存庫(repository)
``` bash
# 初始化儲存庫
git init
# 加入要加入的檔案
git add *.c
# 也可加入所有檔案
git add .
# 提交
 git commit -m 'initial project version'
```

### 複製現有的儲存庫
``` bash
# 使用 default 目錄名稱
git clone https://github.com/hot5656/rwd-pets.git
# 使用 自定 目錄名稱
git clone https://github.com/hot5656/rwd-pets.git rwd-web
```

### 提交更新到儲存庫
<div style="width:500px">
	{% asset_img pic3.png pic3 %}
</div>

``` bash
# 檢視檔案的狀態
git status
# --> 若檔案未加入的狀態為 untracked 
# 加入後狀態為 staged
git add git-2.md
# --> 若修改已被追蹤的檔案,狀態會變成unstaged(modify) 
# 加入後狀態為 staged
git add benchmarks.rb
# commit 後,原 staged 檔案就會變成 unmodified
 git commit -m 'update 2021/02/22'
``` 

### 忽略某些檔案 
.gitignore 可標示忽略檔案
``` bash
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

### 檢視提交的歷史記錄
從新到舊的順序列出儲存庫的提交的歷史記錄
``` bash
git log
# -p 顯示更新差異
# -2 顯示最後兩筆更新
git log -p -2
# -U1 僅顯示有更動的部分
# --word-diff 顯示差異性
git log -U1 --word-diff
# 列出被更動的檔案、有多少檔案被更動，以及有多行列被加入或移出該檔案。 也會在最後印出摘要的訊息
git log --stat
# 選項 --pretty :　oneline, short, full, fuller
# oneline 選項將每一個更新印到單獨一行
git log --pretty=oneline
# format，允許讀者指定自訂的輸出格式。 當需要輸出給機器分析時特別有用
git log --pretty=format:"%h - %an, %ar : %s"
# --graph 的選項特別有用。 該選項以 ASCII 畫出分支的分歧及合併的歷史
git log --pretty=format:"%h %s" --graph
# --since 及 --until 限制時間的選項
# 列出最近兩週的更新
git log --since=2.weeks
```

format 支援的選項
``` bash
# 作者 是完成該工作的人，而 提交者 則是最後將該工作提交出來的人
選項	選項的說明
%H	該更新的SHA1雜湊值
%h	該更新的簡短SHA1雜湊值
%T	存放該更新的根目錄的Tree物件的SHA1雜湊值
%t	存放該更新的根目錄的Tree物件的簡短SHA1雜湊值
%P	該更新的父更新的SHA1雜湊值
%p	該更新的父更新的簡短SHA1雜湊值
%an	作者名字
%ae	作者電子郵件
%ad	作者的日期 (格式依據 date 選項而不同)
%ar	相對於目前時間的作者的日期
%cn	提交者的名字
%ce	提交者的電子郵件
%cd	提交的日期
%cr	相對於目前時間的提交的日期
%s	標題 
```

目前涵蓋的及一些可能有用的格式選項
``` bash
選項	選項的說明
-p	顯示每個更新與上一個的差異。
--word-diff	使用 word diff 格式顯示 patch 內容。
--stat	顯示每個更新更動的檔案的統計及摘要資訊。
--shortstat	僅顯示--stat提供的的訊息中關於更動、插入、刪除的文字。
--name-only	在更新的訊息後方顯示更動的檔案列表。
--name-status	顯示新增、更動、刪除的檔案列表。
--abbrev-commit	僅顯示SHA1查核值的前幾位數，而不是顯示全部的40位數。
--relative-date	以相對於目前時間方式顯示日期（例如：“2 weeks ago”），而不是完整的日期格式。
--graph	以 ASCII 在 log 輸出旁邊畫出分支的分歧及合併。
--pretty	以其它格式顯示更新。 可用的選項包含oneline、short、full、fuller及可自訂格式的format。
--oneline	`--pretty=oneline --abbrev-commit` 的簡短用法。
```

其它常見選項
``` bash
選項	選項的說明文字
-(n)	僅顯示最後 n 個更新
--since, --after	列出特定日期後的更新。
--until, --before	列出特定日期前的更新。
--author	列出作者名稱符合指定字串的更新。
--committer	列出提交者名稱符合指定字串的更新
```

### 使用圖形界面檢視歷史
基本上就是 git log 的圖形界面版本
``` bash
gitk
```
### 復原
#### 更動最後一筆 commit(--amend)
可更改 commit 說明 或 加入檔案
```bash
git commit -m 'initial commit'
git add forgotten_file
git commit --amend
```




## <font color=#555555>參考文件</font>
+ [Pro Git(中文)](http://iissnan.com/progit/index.zh-tw.html)