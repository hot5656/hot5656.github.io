---
title: hexo 備份
categories: 程序
tags:
  - hexo
  - github
abbrlink: '6610'
date: 2021-03-14 15:24:03
---

<!-- <style>
h2 {
  color: orange; 
}
</style> -->

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
git push -u origin backup
```

## pull 最新內容

### fetch
``` bash
git fetch
```

### pull
``` bash
git pull
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

## theme 備份

### 根目錄 .gitignore
``` bash
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
# ignore themes/next
themes/next/*
```

### 加入備分檔
``` 
git add -f themes\next\_config.yml
git add -f themes\next\layout\archive.njk
git add -f themes\next\.gitignore
```

### 若出現 fatal: Pathspec 'themes\next\_config.yml' is in submodule 'themes/next'
``` bash
git rm --cached themes/next/
```
