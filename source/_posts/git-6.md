---
title: Git Issue
abbrlink: 8f5
date: 2021-04-19 13:40:04
categories: Coding
tags:
	- git
	- issue
---

### stdin is not a tty (Windows Git Bash)
#### 先進入 bash 再執行
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

#### 其他執行方法
``` bash
cat input.txt | env node lioj_1014.js
cat input.txt | command node lioj_1014.js
```
