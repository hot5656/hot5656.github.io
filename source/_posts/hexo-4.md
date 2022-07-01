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

### 簡短顯示 commit 
``` bash
git log --oneline
	4f52de2 (HEAD -> backup, origin/backup) update 2021/03/28-2
	9bb92eb update 2021/03/28
	5a09926 update 2021/03/25
	aabcf2b update 2021/3/24
	8ad28b8 update 2021/3/23
	155415a update 2021/03/22
	5e79348 update 2021/3/21
	0d82e9b update 2021/03/20
	3d7d128 update 2021/03/19
	b115098 update 2021/03/18
	943a44a update 2021/2/17
	c16e900 update 1021/02/16
	7bf66fc add some hexo, categories and tags
	83a54ad 1st commit
```

### 顯示所有 respsitory
``` bash
git show-ref
	4f52de2bb6a363eed5ff816aed641b26722d2b07 refs/heads/backup
	4f52de2bb6a363eed5ff816aed641b26722d2b07 refs/remotes/origin/backup
	ee599a173055bef88086941c5a96277a2cc34340 refs/remotes/origin/master
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
// 新版修改
npx hexo s -g 
```


