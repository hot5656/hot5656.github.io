---
title: Hexo 使用
date: 2021-03-14 08:41:49
categories: 參考
tags: 
	- hexo
---

## command

### Install Hexo
``` bash
Install Hexo
```

### Dump version
``` bash
hexo version
```

### inition Blog
``` bash
hexo init blog
```

### 產生靜態檔後部署
``` bash
hexo d -g 
```

### 產生靜態檔後預覽
``` bash
hexo s -g 
```

### 啟動伺服器
``` bash
hexo server (hexo s)
```

### 產生靜態檔案
``` bash
hexo generate (hexo g)
```

### 變更連接埠
``` bash
hexo server -p 5000
```

### 部署網站
``` bash
hexo deploy (hexo d)
```
<br> 

## npm 安裝

### install hexo-deployer-git(for _config.yml’s type: git)
``` bash
npm install hexo-deployer-git --save
```

### install hexo-image-link(Markdown 顯示圖片 規則)
``` bash
npm install hexo-image-link --save
```
<br> 

``` markdown
![picture 1](hexo/test.png)
```

## 設定檔案編輯

### _config.yml(for GitHub)
``` yml
deploy:
  type: git
  repository: 'https://github.com/hot5656/hot5656.github.io.git'
  branch: master
```

###  _config.yml(for 圖片放於對應的目錄下)
``` yml
post_asset_folder: true
```

###  _config.yml(for 網址設定)
``` yml
url: https://hot5656.github.io/blog/
root: /blog/
```
<br> 

## md檔 設定

###  顯示圖片(含設定寬度)
``` html
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>
```

