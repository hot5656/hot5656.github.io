---
title: HTML Issue
abbrlink: '1739'
date: 2021-06-04 11:52:10
categories:  Front End
tags:
	- html
	- issue
---

### favicon.ico Failed to load resource: the server responded with a status of 404 (Not Found)
``` html 
<!-- #1 將favicon.ico 放於根目錄 -->

<!-- #2 加入以下代碼 -->
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<!-- #3 加入以下代碼 -->
<link rel="shortcut icon" href="#"/>
```

<!--more-->



