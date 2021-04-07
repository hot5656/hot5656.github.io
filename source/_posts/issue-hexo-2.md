---
title: Hexo Issue
categories: Blog
tags:
  - hexo
  - issue
abbrlink: b076
date: 2021-03-14 14:13:53
---

## hexo d - "ERROR Deployer not found git"
### Install hexo-deployer-git 
``` bash
npm install hexo-deployer-git --save
```

<!--more-->

## Hexo - No layout index.html(theme-next)
### clone hexo-theme-next 
``` bash
git clone https://github.com/next-theme/hexo-theme-next themes/next
# if insyall by npm - unistall it
npm uninstall hexo-theme-next --save
```

## highlight(lang, code, ...args) has been deprecated
>Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
>Deprecated as of 10.7.0. Please use highlight(code, options) instead.
>https://github.com/highlightjs/highlight.js/issues/2277

### Install hexo-util
``` bash
npm install hexo-util --save
```

## Hexo localhost 打不開
http://localhost:4000

### port 被占用

### 查 port 被占用情形
``` bash
netstat -ano | findstr 0.0:4000
  TCP    0.0.0.0:4000           0.0.0.0:0              LISTENING       5976
```

### 查被誰占用
``` bash
tasklist | findstr 5976
  Code.exe                      5976 Console                    1     92,008 K
```
<!--more-->

### 變更連接埠
``` bash
hexo server -p 5000
```
<br> <br>

###  localhost 的 http 網站被強制導向 https(edge適用)

### 開啟瀏覽器
``` bash
chrome://net-internals/#hsts
edge://net-internals/#hsts
```

### 到最下方找到 Delete domain security policies 設定，輸入localhost按下Delete
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>