---
title: hexo 更換 theme(主題)
categories: 程序
tags:
  - hexo
abbrlink: b0cd
date: 2021-03-15 14:05:03
---

<style>
h2 {
  color: orange; 
}
</style>

## next 

### clone next theme
``` bash
npm install hexo-theme-next
# copy next config to local
cp node_modules/hexo-theme-next/_config.yml _config.next.yml
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