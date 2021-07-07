---
title: jQuery Issue
abbrlink: d937
date: 2021-07-07 08:59:24
categories: Coding
tags:
	- jquery
	- issue
---

### jquery 應用於 event e.target
``` js
// 正確
$(document).on('change', '.checkbox', function(e) {
	let element = $(e.target)
	....
}
// 錯誤
let element = $('e.target')
```

<!--more-->
