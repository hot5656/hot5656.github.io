---
title: Hexo 使用
categories: Blog
tags:
  - hexo
abbrlink: c588
date: 2021-03-14 08:41:49
---

<style>
.post-image {
	border: 1px solid black;
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
// 新版修改
npx hexo version
```
<!--more-->

### inition Blog
``` bash
hexo init blog
```

### 產生靜態檔後部署
``` bash
hexo d -g
// 新版修改
npx hexo d -g 
```

### 產生靜態檔後預覽
``` bash
hexo s -g 
// 新版修改
npx hexo s -g 
```

### 啟動伺服器
``` bash
hexo server (hexo s)
```

### 啟動伺服器(含 debug data)
``` bash
hexo s --debug
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
hexo server --draft
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

###  _config.next.yml (for 列出所有搜尋結果)
``` yaml
  # Show top n results per article, show all results by setting to -1
  # top_n_per_article: 1
  # change show all result
  top_n_per_article: -1
```

<br> 

## md檔 設定


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

### 設定 Hexo 本地連結
`{% post_link filename [title] [escape] %}`

#### show hexo's post title
``` md
{% post_link hexo-1 %}
```
{% post_link hexo-1 %}

#### show 指定文字
``` md
{% post_link hexo-1 'Hexo 製作部落格' %}
```
{% post_link hexo-1 'Hexo 製作部落格' %}

#### Escape title(don't care tag)
``` md
{% post_link hexo-1 '<b>Hexo</b> 製作部落格' %}
```
{% post_link hexo-1 '<b>Hexo</b> 製作部落格' %}

#### Do not Escape title(care tag)
``` md
{% post_link hexo-1 '<b>Hexo</b> 製作部落格' false %}
```
{% post_link hexo-1 '<b>Hexo</b> 製作部落格' false %}

### 顯示圖檔

#### default 顯示
``` md
{% asset_img pic2.jpg pic2 %}
```
{% asset_img pic2.jpg pic2 %}

####  設定外框寬度(可靠左或縮小圖片)
``` html
<div style="width:500px">
	{% asset_img pic2.jpg pic2"%}
</div>
```
<div style="width:500px">
	{% asset_img pic2.jpg pic2"%}
</div>

#### 加入自訂 class
``` html
<style>
.post-image {
	border: 1px solid black;
}
</style>

{% asset_img post-image pic2.jpg pic2"%}
```
{% asset_img post-image pic2.jpg pic2"%}

#### 指定寬度,高度
``` md
{% asset_img pic2.jpg 300 300 "pic2"%}
```
{% asset_img pic2.jpg 300 300 "pic2"%}

#### 指定寬度(自動調整高度)
``` md
{% asset_img pic2.jpg 300 "pic2"%}
```
{% asset_img pic2.jpg 300 "pic2"%}

#### 指定 Title & Alt
> alt 圖片替代文字
> title 滑鼠移經顯示文字標示
``` md
{% asset_img pic2.jpg "pic2 title'pic2 alt'" %}
```
{% asset_img pic2.jpg "pic2 title'pic2 alt'" %}

### 自訂 css(文字過長自動換行,識別空格換行)
#### setting
``` bash
# source/_data/styles.styl
// 自訂 css
.wrap-code {
		display: block;
		background-color: rgb(34, 34, 34);
		color: rgb(192, 192, 192);
		line-height: 1.6;
		padding: 10px;
		margin-top: 20px;
		text-align: left;
    white-space: pre-wrap; /* 保留空格並允許換行 */
    text-indent: 20px; /* 在段落開頭添加縮排 */
    word-wrap: break-word; /* 在單字過長時進行換行 */
}
```

#### use in .md(可顯示 {% raw %}{{niche}}{% endraw %}})
``` md
<code class="wrap-code">
You are an experienced email classification assistant who accurately categorized emails based on their content and potential impact
</code>
```







