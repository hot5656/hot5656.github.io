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

### 建立新分支 backup
``` bash
# 建立新分支 issue1
git branch issue1
# 建立新分支 backup 同時切過去
git checkout -b backup
```
<!--more-->

### see branch
``` bash
# see local branch
git branch
# see remote branch
git branch -r
# see local and remote branch
git branch -a
```

### 刪除 branch
```
git branch -d work1
```

### checkout to branch
``` bash
git checkout backup
### checkout 某一個 commit
git checkout 1f0aa12
```

### add all file
``` bash
git add .
```

### 加入全部異動檔案
不論檔案狀態是 Untracked files 或是 Changes not staged for commit（紅色），都會一口氣變成 Changes to be committed（綠色）
``` bash
git add -A
git add --all 
```

### add commit
``` bash
# commit
git commit -m "1st commit"
# add modify and commit
# 僅加入修改,不會加入新檔案
git commit -am "update 2021/04/12"
```

### dump commit 紀錄
``` bash
git log
# 每一個 commint 僅列一行
git log --oneline
```

### list commit
``` bash
# list remote commit
git rev-list --remotes
# list all commit
git rev-list -–all
```

### add origin
``` bash
git remote add origin https://github.com/hot5656/blog.git
```

### push origin to remote
``` bash
# 若 remote 無 backup
git push -u origin backup
# 若 remote 有 backup
git push origin backup
```

### fetch
``` bash
# 抓回遠端分支
git fetch
```

### pull
``` bash
# git pull = git fetch + git merge
git pull
```


### dump remote server setting
``` bash
git remote -v
```

### change origin setting
``` bash
git remote set-url origin https://github.com/hot5656/blog.git
```

### dump modify status
``` bash
git status
```

### list all file
``` bash
git ls-files
```

### 復原已staged的檔案 unstage
``` bash
# 單一檔案
git reset HEAD <file>
# 所有檔案
git reset
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



