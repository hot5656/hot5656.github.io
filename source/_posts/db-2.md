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

### 000webhost
#### Cannot modify header information
``` php
// 執行以下程式發生
header('Location: index.php');

// .htaccess file in the root directory 設定以下內容
php_value output_buffering 1
```

#### A non-numeric value encountered in ...
``` php
// 原程式
echo '<a href="index.php?page=' . $page+1 . '">下一頁</a>' ;

// 修正後程式
echo '<a href="index.php?page=' . strval($page+1) . '">下一頁</a>' ;
```

#### Field 'deleted' doesn't have a default value
``` php
// 命令如下, deleted欄位未加入,也未設定 default 值
insert into comment(username, content) values('aa', 'i am here')

// 設定 table 欄位 default 為 NULL
// query 如下以取得含 欄位 default 為 NULL 之資料
select * from comment where deleted=0 or deleted is NULL
```