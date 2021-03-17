---
title: hexo 備份
date: 2021-03-14 15:24:03
categories: 程序
tags: 
	- hexo 
	- github
---

<style>
h2 {
  color: orange; 
}
</style>

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

