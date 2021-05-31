---
title: JavaScript tricky
abbrlink: Coding
date: 2021-05-29 13:57:32
categories:
tags:
	- javascript
---

### excape HTML function
``` js
// escape HTML function
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", '"': "&quot;"}    
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}
```
<!--more-->

### JSON.parse 的處理 - 預防抓到不正確的資料
``` js
let json;
try {
  json = JSON.parse(str)
} catch(e) {
  console.log(e) // 錯誤處理
}
```
