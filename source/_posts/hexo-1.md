---
title: Put Hexo to GitHub
date: 2021-03-12 15:40:30
categories: 參考
tags:
	- hexo
---

### Install Hexo

``` bash
npm install -g hexo-cli
```

### Dump version

``` bash
hexo version
```

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

### run web browser http://localhost:4000/
<div style="width:800px">
	{% asset_img pic4.png pic4 %}
</div>

### 建立新文章
``` bash
hexo new win7-1
```

### 顯示圖片(set _config.yml's  post_asset_folder: true)
``` bash
post_asset_folder: true
```

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
