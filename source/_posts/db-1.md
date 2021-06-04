---
title: 資料庫
abbrlink: 6a62
date: 2021-06-03 14:22:48
categories: Back End
tags:
	- database
---

### 基本
+ schema : 結構
+ 編碼與排序 	: 建議 utf8_general_ci
+ Pimary Key(PK) : 主鍵
+ Unique : 在 table 內,資料唯一

<!--more-->

#### 種類
##### SQL 關聯資料語言
+ MySQL
+ PostgreSQL
+	MSSQL

##### NoSQL(Not only SQL)
如再存 log 使用
+ MongoDB

#### DB 管理程式
##### MySQL
+ phpMyAdmin


### mySQL
#### 基礎語法
一般 mySQL 命令都用大寫,較易識別

##### 查詢資料 Select
``` bash
# table 可用 反引號包住,也可以不加反引號
# class 所有資料
SELECT * FROM class
# 查 class 內, 欄位為 id 的資料
SELECT id FROM class
# 查 class 內, 欄位為 id,name 的資料
SELECT id, name FROM class
# 查 class 內, 欄位為 id 的資料,顯示欄位為 nameId 
SELECT id as nameId FROM class
# 查 class 內, id=2 的資料
SELECT * FROM class WHERE id = 2
# 查 class 內, id=2 name="Bill" 的資料
SELECT * FROM class WHERE id = 2 and name = "Bill"
```

##### 新增資料 Insert
``` bash
# 包欄位的單引號可以不加,除非是易稿混的名稱
INSERT INTO `my_class`(`name`, `content`) VALUES ('Jerry','where?')
INSERT INTO `my_class`(name, content) VALUES ('Jack','office')
```

##### 修改資料 Update
``` bash
# 指定要更動欄位
UPDATE my_class SET name='user01', content='content01' WHERE id=2
```

##### 刪除資料 Delete
``` bash
DELETE FROM `my_class` WHERE id=4
```

##### is_deleted 欄位(hide data for user)
MySQL沒有 boolean 型別, 設定 boolean 會自動轉成 tinyint(1)
``` bash
# 增加 is_deleted 欄位
# query data for user
SELECT * FROM `my_class` WHERE is_deleted=0
```