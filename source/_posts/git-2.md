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

### 備份儲存庫到 GitHub

#### 備份到 GitHub
GitHub 應預先建立 儲存庫
``` bash
# set origin 
git remote add origin https://github.com/hot5656/rwd-pets.git
# 建立 master branch
git branch -M master
# push
git push -u origin master
```

#### 設定 GitHub 啟動靜態執行(若為網頁)
setting --> GitHub Pages --> source --> master branch --> Save

#### 網頁位址(若為網頁)
[https://hot5656.github.io/ajaxF2eCheckRegister/](https://hot5656.github.io/ajaxF2eCheckRegister/)



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

### 本地參考儲存庫
``` bash
git show-ref
	d9c9e57d12c9dbdc1b9445fa3333cd7e637c888d refs/heads/master
	d9c9e57d12c9dbdc1b9445fa3333cd7e637c888d refs/heads/serverfix
	7369a897219619143420b24c9df7383ddca643a2 refs/remotes/origin/HEAD
	7369a897219619143420b24c9df7383ddca643a2 refs/remotes/origin/master
	37d73f1a945ece85dffe798ba7ae43733bf1f4aa refs/remotes/team/master
```

### 提交的歷史記錄
#### 檢視提交的歷史記錄
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

#### 顯示每個指令的 SHA-1 值
``` bash
git reflog
	8ad28b8 (HEAD -> backup) HEAD@{0}: commit (amend): update 2021/3/23
	fe335c2 HEAD@{1}: reset: moving to fe335c2
	fe335c2 HEAD@{2}: reset: moving to fe335c2
	fe335c2 HEAD@{3}: reset: moving to fe335c2
	fe335c2 HEAD@{4}: reset: moving to fe335c2
	fe335c2 HEAD@{5}: reset: moving to fe335c2
	fe335c2 HEAD@{6}: commit (amend): update 2021/3/23
	58e7265 HEAD@{7}: commit (amend): update 2021/3/23
	d37689e HEAD@{8}: commit: update 2021/3/23
	155415a (origin/backup) HEAD@{9}: commit: update 2021/03/22
	5e79348 HEAD@{10}: pull: Fast-forward
	3d7d128 HEAD@{11}: commit: update 2021/03/19
	b115098 HEAD@{12}: commit: update 2021/03/18
	943a44a HEAD@{13}: pull: Fast-forward
	c16e900 HEAD@{14}: commit: update 1021/02/16
	7bf66fc HEAD@{15}: commit: add some hexo, categories and tags
	83a54ad HEAD@{16}: commit (initial): 1st commit
```

#### 使用圖形界面檢視歷史
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

#### 復原已被 staged 檔案
檔案要加路徑名,不然不會有反應
``` bash
git add .
git status
	On branch backup
	Your branch is ahead of 'origin/backup' by 1 commit.
	(use "git push" to publish your local commits)
	Changes to be committed:
	(use "git reset HEAD <file>..." to unstage)
			modified:   source/_posts/git-2.md
# git reset HEAD <file>
git reset HEAD source/_posts/git-2.md
git status
	On branch backup
	Your branch is ahead of 'origin/backup' by 1 commit.
	(use "git push" to publish your local commits)
	Changes to be committed:
	(use "git reset HEAD <file>..." to unstage)
			modified:   source/_posts/git-2.md
```

#### 復原已更動的檔案(discard unstaged 檔案)
``` bash
# git status 提供命令
git status
	On branch backup
	Your branch is ahead of 'origin/backup' by 1 commit.
		(use "git push" to publish your local commits)
	Changes not staged for commit:
		(use "git add <file>..." to update what will be committed)
		(use "git restore <file>..." to discard changes in working directory)
			modified:   source/_posts/git-2.md
			modified:   source/_posts/git-3.md
	no changes added to commit (use "git add" and/or "git commit -a")
# git restore <file>
git restore source/_posts/git-3.md
git status
	On branch backup
	Your branch is ahead of 'origin/backup' by 1 commit.
		(use "git push" to publish your local commits)

	Changes not staged for commit:
		(use "git add <file>..." to update what will be committed)
		(use "git restore <file>..." to discard changes in working directory)
			modified:   source/_posts/git-2.md
	no changes added to commit (use "git add" and/or "git commit -a")
```

### 遠端協同運作

#### 顯示遠端儲存庫
``` bash
# 顯示所有的遠端儲存庫
git remote
# 顯示所有的遠端儲存庫(顯示遠端儲存庫 url)
git remote -v
```

#### 增加遠端儲存庫
``` bash
git remote add origin2 https://github.com/hot5656/blog.git
```

#### 從遠端儲存庫擷取或合併
``` bash
# 抓回遠端分支
git fetch
# origin/master 分支 合併到 master 分支
git merge origin/master
# git pull = git fetch + git merge
git pull
```

#### 上傳至遠端儲存庫
``` bash
# -u 指遠端 branch
git push -u origin backup
# push local branch serverfix to remote serverfix
git push origin serverfix
# push local branch master to remote cat
git push origin master:cat
```

#### 監看遠端儲存庫
git pull 抓取遠端合併到 local
git push 將 local 內容更新至遠端
``` bash
git remote show origin
	* remote origin
	Fetch URL: https://github.com/hot5656/hot5656.github.io.git
	Push  URL: https://github.com/hot5656/hot5656.github.io.git
	HEAD branch: master
	Remote branches:
		backup tracked
		master tracked
	Local branch configured for 'git pull':
		backup merges with remote backup
	Local ref configured for 'git push':
		backup pushes to backup (fast-forwardable)
```

#### 移除或更名遠端儲存庫
``` bash
# 更改 遠端儲存庫
git remote rename pb paul
# 移除 遠端儲存庫
git remote rm paul
```

### 標籤
#### 列出標籤
``` bash
git tag
# 列出特定標籤
git tag -l 'v1.4.2.*'
# 顯示指定標籤的資料與對應的commit
git show v1.4
```

#### 建立標籤
```bash
# 含附註的標籤
git tag -a v1.4 -m 'my version 1.4'
# 建立輕量級的標籤 - 只保存commit檢查碼的文件
git tag v1.4-lw
git tag
	v0.1
	v1.3
	v1.4
	v1.4-lw
	v1.5
```

#### 追加標籤
```
# 入該次commit的檢查碼(或前幾碼即可)
git tag -a v1.2 9fceb02
```

#### 標籤傳至遠端儲存庫
```
# 單一標籤
git push origin v1.5
# 所有標籤
git push origin --tags
```

### 分支(branch)

#### HEAD 為指向當前所在的分支的指標

```
# 新建分支
git branch testing
# 切換分支
git checkout testing
# 新建同時切換分支
git checkout -b iss53
# 合併分支 hotfix
git merge hotfix
# 刪除 hotfix 分支
git branch -d hotfix
# 列出所有分支
git branch
# 列出各分支最後提交資訊
git branch -v
# 列出已併入分支
git branch --merged
# 列出未併入分支
git branch --no-merged
# 刪除選端分支 serverfix
git push origin :serverfix
```

#### 遠端分支處理

##### 建立模擬儲存庫
``` bash
# 建立新的 儲存庫
mkdir remote_test
cd remote_test
git init
# 第一次提交
echo init file > branch_test.txt
git add .
git commit -m "1st commit"
# 上傳至遠端儲存庫 (遠端儲存庫已預先建立)
git remote add origin https://github.com/hot5656/remote_test.git
git push origin master
# 2nd update 上傳至遠端儲存庫
echo 1st change >> branch_test.txt
git add -A
git commit -m "2nd update"
git push origin master
# 上傳至遠端儲存庫2 (遠端儲存庫已預先建立)
git remote add team https://github.com/hot5656/remote_test2.git
git push team master
# 3rd update 上傳至 origin 遠端儲存庫
echo 3rd update >> branch_test.txt
git add -A
git commit -m "3rd update"
git push origin master
```

##### 設定 computer 本地儲存庫
``` bash
# clone computer 儲存庫, 並刪除兩個 commit, fetch from team
git clone https://github.com/hot5656/remote_test.git remote_test_computer
cd remote_test_computer
git reset HEAD^^ --hard
git reset HEAD^^ --hard
git remote add team https://github.com/hot5656/remote_test2.git
git fetch team
# computer add 2 commit
echo modify 1st update >> branch_test.txt
git add -A
git commit -m "modify 1st update"
echo modify 2nd update >> branch_test.txt
git add -A
git commit -m "modify 2nd update"
```

``` bash
# 分支圖
# remote-test(origin)
1f0aa12 --> 37d73f1 --> 7369a89(mastetr)

# remote-test1(team)
1f0aa12 --> 37d73f1(master)

# computer
1f0aa12 --> 37d73f1        --> 7369a89(origin/mastetr)
            (team/master)      (origin/mastetr)
        --> 9161f8d        --> d9c9e57(master)
```

##### 將更改傳至遠端 serverfix

``` bash
# 將 computer 更改傳至 origin(branch serverfix)
git checkout -b serverfix
git push origin serverfix
```

``` bash
# 分支圖
# remote-test(origin)
1f0aa12 --> 37d73f1 --> 7369a89(mastetr)
        --> 9161f8d --> d9c9e57(serverfix)

# remote-test1(team)
1f0aa12 --> 37d73f1(master)

# computer
1f0aa12 --> 37d73f1        --> 7369a89(origin/mastetr)
            (team/master)      (origin/mastetr)
        --> 9161f8d        --> d9c9e57(master, serverfix, origin/serverfix)
```

##### 刪除遠端 serverfix
```bash
git push origin :serverfix
	To https://github.com/hot5656/remote_test.git
	- [deleted]         serverfix
```

#### 分支的合併(merge)
{% asset_img pic4.png pic4 %}

``` bash
$ git checkout master
$ git merge issue13
```

#### 分支的衍合(rebase)
{% asset_img pic5.png pic5 %}

##### 準備
``` bash
# 增加 branch issue13
# brnach master modify + commit
git branch issue13
echo mastet rebase 1 >> branch_test.txt
git add -A
git commit -m "master wait rebase 1"
# brnach issue13 modify + commit
git checkout issue13
echo issue13 rebase 1 >> branch_test.txt
git add -A
git commit -m "issue13 wait rebase 1"
```

##### rebase
把另外一個分支的變更，當成這個分支的基礎(修改後併到主線)
``` bash
git checkout issue13
git rebase master
# 若有衝突會要求處理,再用 git add 加入,在執行 git rebase --continue
git add -A
# 會要求修改最後 commit 內容
git rebase --continue
```


## 未知內容
+ git mergetool : git merge tool 
+ opendiff : one merge tool



## <font color=#555555>參考文件</font>
+ [Pro Git(中文)](http://iissnan.com/progit/index.zh-tw.html)