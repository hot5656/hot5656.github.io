---
title: hexo 備份
categories: Blog
tags:
  - hexo
  - github
abbrlink: '6610'
date: 2021-03-14 15:24:03
---

## 第一次備份

### git init
``` bash
cd blog
git init
```

### 建立新分支 backup
``` bash
git checkout -b backup
```
<!--more-->

### hexo 本身已建立 .gitignore
``` bash
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

### add file and commit
``` bash
git add .
git commit -m "1st commit"
```

### push to remote 
``` bash
git remote add origin https://github.com/hot5656/blog.git
git push -u origin backup
```

## 修改更新

### 查看修改內容
``` bash
git status
  On branch backup
  Your branch is up to date with 'origin/backup'.
  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)
          modified:   source/_posts/hexo-1.md
          modified:   source/_posts/hexo-4.md
  no changes added to commit (use "git add" and/or "git commit -a")
```

### 加入全部異動檔案
``` bash
git add -A
```

### add commit
``` bash
git commit -m "update 2021/03/16"
```

### push origin to remote
``` bash
git push origin backup
```

## 同步遠端 最新內容

### fetch + merge
``` bash
# 抓回遠端分支
git fetch origin backup
# merge 遠端分支
git merge origin/backup
```

## 備份 clone

### clone
``` bash
git clone https://github.com/hot5656/blog.git
```

### check to backup
``` bash
cd blog
git branch -a
git checkout backup
```

### Install Hexo
``` bash
npm install -g hexo-cli
```

### Install all package for Blog
``` bash
npm install
```

### 產生靜態檔 + 本地執行
``` bash
hexo s -g
```


