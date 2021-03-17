---
title: git 使用
date: 2021-03-14 15:48:38
categories: 參考
tags: 
	- git
---

<style>
h2 {
  color: orange; 
}
</style>

### git init
``` bash
git init
```

### 建立新分支 backup
``` bash
git checkout -b backup
```
<!--more-->

### see branch
``` bash
# see local branch
git branch
# see remote branch
git branch -r
# see local nad remote branch
git branch -a
```

### checkout to branch
``` bash
git checkout backup
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
git commit -m "1st commit"
```

### dump commit 紀錄
``` bash
git log
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
git push -u origin backup
```

### fetch
``` bash
git fetch
```

### pull
``` bash
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

### change modify status
```
git status
```




