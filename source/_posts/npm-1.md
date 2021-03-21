---
title: npm 說明
categories: Front End
tags:
  - npm
  - node.js
abbrlink: f085
date: 2021-03-12 15:39:26
---

### Dump version

``` bash
npm -v
```

### Dump all npm installed models

``` bash
npm list
```
<!--more-->

### 檢查 node_modules 有相關資安漏洞
``` bash
npm audit
```

### 自動修正相關漏洞
``` bash
npm audit fix
```

### 更新可更新的 node_modules
``` bash
npm update
```

### 清理 node_modules 中不需要的檔案
``` bash
npm prune
```

### install module
``` bash
# 安裝最新版本：
npm install hexo-theme-next@latest
# 指定特定版本：
npm install hexo-theme-next@8.0.0
# 安裝目前版本：
npm install hexo-theme-next
```

### 專案 npm 初始化
``` bash
# 會要求你輸入關於這個專案的相關資訊
npm init
# 專案全部載入預設資料
npm init -y
```

### 本地、本機安裝(共用 module)
``` bash
npm install -g hexo-cli
or
npm install hexo-cli –g
```

### 專案 modle 安裝
``` bash
# dependencies (依賴套件): 專案 production or build 之後仍然會使用的套件，例如 jQuery、swiper 等等套件
npm install --save hexo-generator-feed
# devDependencies (開發依賴套件): devDependencies 就是只有在我們開發時，才會使用的套件，舉例來講 babel、esling 等
npm install --save-dev hexo-generator-feed
```

### 移除套件
``` bash
npm uninstall -g [套件名稱]
```

### 還原專案套件
``` bash
npm install
```