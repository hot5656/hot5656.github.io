---
title: GitHub 使用
abbrlink: 9b5
date: 2021-04-14 11:34:12
categories: Coding
tags:
	- git
	- github
---


### Show History
<div style="width:700px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

+ 顯示修改內容

<div style="width:700px">
	{% asset_img pic2.png pic2 %}
</div>
<div style="width:700px">
	{% asset_img pic3.png pic3 %}
</div>

### Put code to GitHub
#### GitHub generate a respsitory
<div style="width:700px">
	{% asset_img pic31.png pic31 %}
</div>

####  Create a new repository on the command line
``` bash
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/hot5656/html_demo.git
git push -u origin master
```

#### Push an existing repository from the command line
``` bash
git remote add origin https://github.com/hot5656/html_demo.git
git push -u origin master
```

#### generate API key
<div style="width:200px">
	{% asset_img pic41.png pic41 %}
</div>

<div style="width:500px">
	{% asset_img pic42.png pic42 %}
</div>

<div style="width:500px">
	{% asset_img pic43.png pic43 %}
</div>

<div style="width:500px">
	{% asset_img pic44.png pic44 %}
</div>

<div style="width:500px">
	{% asset_img pic45.png pic45 %}
</div>

<div style="width:500px">
	{% asset_img pic46.png pic46 %}
</div>

<div style="width:500px">
	{% asset_img pic47.png pic47 %}
</div>

<div style="width:500px">
	{% asset_img pic48.png pic48 %}
</div>

<div style="width:500px">
	{% asset_img pic49.png pic49 %}
</div>


### Pull Request（PR）

#### Setting request

> Compare & pull request
<div style="width:700px">
	{% asset_img pic21.png pic21 %}
</div>
<div style="width:700px">
	{% asset_img pic22.png pic22 %}
</div>

#### Checking merge status

<div style="width:700px">
	{% asset_img pic23.png pic23 %}
</div>

> Nwe pull request : 未加入等待 merge
> Open   : 待 merge
> Merged : merge 完成
<div style="width:700px">
	{% asset_img pic24.png pic24 %}
</div>


#### Complete merge

<div style="width:700px">
	{% asset_img pic25.png pic25 %}
</div>
<div style="width:700px">
	{% asset_img pic26.png pic26 %}
</div>

> Check modify 
<div style="width:700px">
	{% asset_img pic27.png pic27 %}
</div>
<div style="width:700px">
	{% asset_img pic28.png pic28 %}
</div>

> Run merge  
<div style="width:700px">
	{% asset_img pic29.png pic29 %}
</div>
<div style="width:700px">
	{% asset_img pic2a.png pic2a %}
</div>
<div style="width:700px">
	{% asset_img pic2b.png pic2b %}
</div>

### 參考資料
[使用 Pull Request（PR）](https://gitbook.tw/chapters/github/pull-request.html)
[GitHub flow](https://guides.github.com/introduction/flow/)
[使用 Git Hooks 驗證 local commit 資料](https://dotblogs.com.tw/AceLee/2020/04/07/002126)