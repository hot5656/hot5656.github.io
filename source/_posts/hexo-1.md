---
title: Put Hexo to GitHub
date: 2021-03-12 15:40:30
categories: 參考
tags:
	- hexo
---

## 基本設定

### Install Hexo

``` bash
npm install -g hexo-cli
```

### Dump version

``` bash
hexo version
```
<!--more-->

### inition Blog

``` bash
hexo init robert_blog
```

### Install all package for Blog

``` bash
cd robert_blog
npm install
```

### GitHub generate a respsitory(使用自己的帳號名稱)

``` bash
hot5656.github.io
```
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### 編輯部落格下檔案 _config.yml

``` md
deploy:
  type: git
  repository: 'https://github.com/hot5656/hot5656.github.io.git'
  branch: master
```
<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>

### install hexo-deployer-git(for _config.yml's type: git)

``` bash
npm install hexo-deployer-git --save
```


### 部署上 GitHub
``` bash
hexo d -g
```

### run web browser https://hot5656.github.io/
<div style="width:800px">
	{% asset_img pic3.png pic3 %}
</div>


### 本地執行
``` bash
hexo server
```
[http://localhost:4000/](http://localhost:4000/)
<div style="width:800px">
	{% asset_img pic4.png pic4 %}
</div>

### 建立新文章
``` bash
hexo new win7-1
```

<br>

## 設定檔案編輯(_config.yml)

###  網頁基本設定
``` yaml
# Site
title: Robert 雜記  # 部落格標題
subtitle: ''        # 副標題
description: ''     # 網站描述 
keywords:           # 網站關鍵字(以逗號隔開)，方便 SEO 
author: Robert Kao  # 姓名或暱稱
language: zh-TW     # 使用的語言
timezone: ''        # 留空以使用系統時間
```

### 設定使用顯示圖片
``` bash
post_asset_folder: true
```

### 設定 next theme
``` yaml
# theme: landscape
theme: next
```

<br>

## next theme _config.yml 設定

### 設置菜單
``` yaml
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

### 文章搜尋功能(github 上執行會有一個圓圈一直轉)
需安裝 hexo-generator-searchdb
```bash
npm install hexo-generator-searchdb --save
```
``` yaml
local_search:
  enable: true
```
<div style="width:500px">
	{% asset_img pic5.png pic5 %}
</div>

<br>

## 特定功能

### sitemap.xml 製作
安裝 hexo-generator-sitemap
``` bash
npm install hexo-generator-sitemap --save
```
hexo's _config.yml (新加入)
``` yaml
sitemap:
  path: sitemap.xml
```
部署至 github
``` bash
hexo d -g
```
檢查是否部署完成
[https://hot5656.github.io/sitemap.xml](https://hot5656.github.io/sitemap.xml)
<div style="width:500px">
	{% asset_img pic6.png pic6 %}
</div>

向Google Search Console提交 
[https://search.google.com/search-console/welcome](https://search.google.com/search-console/welcome)
... 待處理


<br>

## md檔 設定

### 顯示圖片(相關的圖片放於對應的目錄下)
``` bash
{% asset_img test.png This is an example image %}
```

### 顯示圖片(設定寬度)
``` bash
<div style="width:500px">
	{% asset_img pic3.png pic3 %}
</div>
```

### 顯示圖片(Markdown 規則-install hexo-image-link)
``` bash
npm install hexo-image-link --save
```

### 顯示圖片(Markdown 規則)
``` bash
![picture 1](hexo/test.png)
```
