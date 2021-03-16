---
title: hexo 更換 theme(主題)
date: 2021-03-15 14:05:03
categories: 程序
tags:
	- hexo
---

## next

### clone next theme
``` bash
git clone https://github.com/next-theme/hexo-theme-next themes/next
```

### _config.yml 設定 theme
``` yaml
# theme: landscape
theme: next
```
<!--more-->

### thmems/next/_config.yml 設置菜單
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

## inside

### install inside theme
``` bash
npm install hexo-theme-inside
```

### _config.yml 設定 theme
``` yaml
# theme: landscape
theme: inside
```