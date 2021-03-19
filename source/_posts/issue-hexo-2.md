---
title: 'hexo http://localhost:4000 打不開'
categories: Issue
tags:
  - hexo
abbrlink: b076
date: 2021-03-14 14:13:53
---

<style>
h2 {
  color: orange; 
}
</style>

## port 被占用

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

##  localhost 的 http 網站被強制導向 https(edge適用)

### 開啟瀏覽器
``` bash
chrome://net-internals/#hsts
edge://net-internals/#hsts
```

### 到最下方找到 Delete domain security policies 設定，輸入localhost按下Delete
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>