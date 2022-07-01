---
title: Put Hexo to GitHub(第二個)
categories: Blog
tags:
  - hexo
  - github
abbrlink: '1120'
date: 2021-03-14 08:41:44
---

### 預先安裝 Git 和 Node.js

### Install Hexo
``` bash
npm install -g hexo-cli
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

### Install all package for Blog
``` bash
cd blog
npm install
```

### GitHub generate a respsitory
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### 設定 GitHub respsitory 可執行(Setting --> GitHub Pages --> Source --> master --> Save) 
<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>

### 編輯部落格下檔案 _config.yml(for GitHub)
``` yaml
deploy:
  type: git
  repository: https://github.com/hot5656/blog.git
  branch: master
```

### 編輯部落格下檔案 _config.yml(for 圖片放於對應的目錄下)
``` yaml
post_asset_folder: true
```

### 編輯部落格下檔案 _config.yml(網址設定)
``` yaml
url: https://hot5656.github.io/blog/
root: /blog/
```

### install hexo-deployer-git(for _config.yml’s type: git)
``` bash
npm install hexo-deployer-git --save
```

### 建立新文章
``` bash
hexo new hexo-1
```

### md 檔案顯示圖片(含設定寬度)
``` html
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>
```

### 部署上 GitHub
``` bash
hexo d -g
// 新版修改
npx hexo d -g
```

### run web browser https://hot5656.github.io/blog/ (使用自己的帳號, respsitory 名稱 )

### 本地執行
``` bash
hexo server
```

### run web browser http://localhost:4000/blog/
