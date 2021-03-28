---
title: hexo 更換 theme(主題)
categories: Blog
tags:
  - hexo
abbrlink: b0cd
date: 2021-03-15 14:05:03
---

## next 

### clone next theme
``` bash
npm install hexo-theme-next
# copy next config to local
# windows command
copy node_modules\hexo-theme-next\_config.yml _config.next.yml
# linux command
cp node_modules/hexo-theme-next/_config.yml _config.next.yml
```
### _config.yml 設定

#### 設定 theme
``` yaml
# theme: landscape
theme: next
```
<!--more-->

### _config.next.yml 設定

#### 設置菜單
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

####  更改外觀
``` yaml
# Schemes 外觀
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini
```

#### 設定側欄

+ left - 靠左放置
+ right - 靠右放置

``` yaml
sidebar:
  # Sidebar Position.
  position: left
  #position: right
```

#### 設置側欄顯示的時機(only for Muse | Mist)
+ post - 默認行為，在文章頁面（擁有目錄列表）時顯示
+ always - 在所有頁面中都顯示
+ hide - 在所有頁面中都隱藏（可以手動展開）
+ remove - 完全移除

``` yaml
  # Sidebar Display (only for Muse | Mist), available values:
  #  - post    expand on posts automatically. Default.
  #  - always  expand for all pages automatically.
  #  - hide    expand only when click on the sidebar toggle icon.
  #  - remove  totally remove sidebar including sidebar toggle.
  display: post
```

#### 設置頭像
放於 source/images/
``` yaml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  url: /images/head.png #/images/avatar.gif
```

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