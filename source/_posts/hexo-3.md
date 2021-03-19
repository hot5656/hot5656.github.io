---
title: Hexo 使用
categories: 參考
tags:
  - hexo
abbrlink: c588
date: 2021-03-14 08:41:49
---

<style>
h2 {
  color: orange; 
}
</style>

## command

### Install Hexo
``` bash
Install Hexo
```

### Dump version
``` bash
hexo version
```
<!--more-->

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

### 清除靜態檔案與快取
``` bash
hexo clean
```

###  產生文章
```bash
hexo new post_name
```

###  產生草稿
```bash
hexo new draft "new draft"
# 啟動看到草稿文章
hexo server --drafts
# 草稿變成文章
hexo publish [layout] <filename>
```

###  產生 page
```bash
hexo new page about
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

``` markdown
![picture 1](hexo/test.png)
```

### instrall 管理文章的後台插件(不好用,也會產生很多 npm vulnerabilities-漏洞)
``` bash
npm install hexo-admin --save
```
[http://localhost:4000/admin](http://localhost:4000/admin)

<br> 

## 設定檔案編輯

### _config.yml(for GitHub)
``` yaml
deploy:
  type: git
  repository: 'https://github.com/hot5656/hot5656.github.io.git'
  branch: master
```

###  _config.yml(for 圖片放於對應的目錄下)
``` yaml
post_asset_folder: true
```

###  _config.yml(for 網址設定)
``` yaml
url: https://hot5656.github.io/blog/
root: /blog/
```

###  _config.yml(for 網頁基本設定)
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

###  _config.yml(for 首頁一頁要顯示幾篇文章)
``` yaml
index_generator:
  path: ''
  per_page: 10  #一頁顯示的文章量 (0 = 關閉分頁功能)
  order_by: -date
```
<br> 

## md檔 設定

###  顯示圖片(含設定寬度)
``` html
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>
```

###  加入 繼續閱讀 截斷文章
``` html
<!--more-->
```

###  page 改成一般 HTML 格式

#### index.md change to index.html

#### 整頁完全受page layout 影響(填入以下)
``` html
---
layout:false
---

```






