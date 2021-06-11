---
title: DATABASE Issue
abbrlink: 6b22
date: 2021-06-10 11:53:28
categories: Back End
tags:
	- issue
	- database
	- mysql
---

### mySQL
#### 使用 SeidiSQl 連接 XAMPP,選使用者出現錯誤
**1030 - Got error 176 “Read page with wrong checksum” from storage engine Aria**
<!--more-->

+ 發現是執行 FLUSH PRIVILEGES; 出錯
+ 開啟 phpmyadmin
+ 選 mysql database
+ 點選 全選, 再選擇 修復資料表, 修復完即 ok

<div style="width:800px">
	{% asset_img pic1.png pic1 %}
</div>
