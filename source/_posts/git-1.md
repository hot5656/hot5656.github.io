---
title: Git 使用參考
categories: Coding
tags:
  - git
abbrlink: 41d6
date: 2021-03-14 15:48:38
---

## git 命令

### git init
``` bash
git init
```

### Branch
#### 建立新分支 backup
``` bash
# 建立新分支 issue1
git branch issue1
# 建立新分支 backup 同時切過去
git checkout -b backup
```
<!--more-->

#### see branch
``` bash
# see local branch
git branch
# see remote branch
git branch -r
# see local and remote branch
git branch -a
# see branch 詳細
git branch -v 
```

#### 本地參考儲存庫
``` branch
git show-ref
	d9c9e57d12c9dbdc1b9445fa3333cd7e637c888d refs/heads/master
	d9c9e57d12c9dbdc1b9445fa3333cd7e637c888d refs/heads/serverfix
	7369a897219619143420b24c9df7383ddca643a2 refs/remotes/origin/HEAD
	7369a897219619143420b24c9df7383ddca643a2 refs/remotes/origin/master
	37d73f1a945ece85dffe798ba7ae43733bf1f4aa refs/remotes/team/master
```

#### 更改 branch 名稱
``` bash
# m 大小寫皆可
git branch -M main
git branch -m main
```

#### 刪除 branch
``` bash
git branch -d work1
```

#### checkout to branch
``` bash
git checkout backup
### checkout 某一個 commit
git checkout 1f0aa12
```


### Commit
#### add all file
``` bash
# 所有這個目錄(含子層)
git add .
# 所有專案(兩個命令相同)
git add -A
git add --all 
```

#### 還原檔案修改
``` bash
git checkout -- branch_test.txt
```

#### add commit
``` bash
# commit
git commit -m "1st commit"
# add modify and commit
# 僅加入修改,不會加入新檔案
git commit -am "update 2021/04/12"
```

#### 更動最後一筆 commit 說明
``` bash
git commit --amend
```

#### 移除最後一次 commit
``` bash
# 移除最後一次 commit,檔案修改不保留
git reset HEAD^ --hard
# 移除最後一次 commit,保留檔案修改
# 兩個命令完全一樣
git reset HEAD^ --soft
git reset HEAD^
```

#### list commit 
> 但只列出雜湊碼,所以不清楚
``` bash
# list remote commit
git rev-list --remotes
# list all commit
git rev-list -–all
```

#### dump modify status
``` bash
git status
```

#### list all file
``` bash
git ls-files
```

#### 復原已staged的檔案 unstage
``` bash
# 單一檔案
git reset HEAD <file>
# 所有檔案
git reset
```

#### 查看被修改檔案的內容
``` bash
git diff source/_posts/os-1.md
```


### Remote

#### push origin to remote
``` bash
# 若 remote 無 backup
git push -u origin backup
# 若 remote 有 backup
git push origin backup
```

#### fetch
``` bash
# 抓回遠端分支
git fetch
# 抓回遠端分支 origin/backup
git fetch origin backup
```

#### pull
``` bash
# git pull = git fetch + git merge
git pull
# pull 遠端分支 origin/backup
git pull origin/backup
```

#### add origin(remote server)
``` bash
git remote add origin https://github.com/hot5656/blog.git
```

#### change origin setting
``` bash
git remote set-url origin https://github.com/hot5656/blog.git
```

#### 更改 遠端儲存庫名
``` bash
git remote rename pb paul
```

#### 移除 遠端儲存庫
``` bash
git remote rm paul
```

#### dump remote server setting
``` bash
git remote -v
```

### Other 

#### dump log (commit 紀錄)
``` bash
git log
# 每一個 commint 僅列一行
git log --oneline
```

#### merge
``` bash
# merge 其他 branch
git merge new-feature
# origin/master 分支 合併到 master 分支
git merge origin/master
```

#### remove 刪除檔案
``` bash
git rm home/week6/hw1/css/index.css.map
# 若以改過要刪除
git rm -f home/week6/hw1/css/index.css.map
```

#### undo 1st commit - not lose data
``` bash
# 會刪除所有中間 commit 資料
git update-ref -d HEAD
```

#### undo 1 commit - not lose data
``` bash
git reset --soft HEAD~1
```

<br>

## git 相關檔案

### .gitignore
指定忽略的規則 : 資料庫的存取密碼, AWS 伺服器的存取金鑰, 或編譯產生檔案...
``` bash
# 忽略 secret.yml 檔案
secret.yml
# 忽略 config 目錄下的 database.yml 檔案
config/database.yml
# 忽略所有 db 目錄下附檔名是 .sqlite3 的檔案
/db/*.sqlite3
# 忽略所有附檔名是 .tmp 的檔案
*.tmp
```

### .gitkeep
可提交一個空目錄



