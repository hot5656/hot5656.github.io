---
title: hexo 備份 clone
date: 2021-03-14 19:04:50
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
<!--more-->

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

