---
title: DATABASE
abbrlink: 6a62
date: 2021-06-03 14:22:48
categories: Back End
tags:
	- database
	- mysql
---

### 基本
+ schema : 結構
+ 編碼與排序 	: 建議 utf8_general_ci 
+ Pimary Key(PK) : 主鍵
+ Unique : 在 table 內,資料唯一
+ CRUD : 新增(Create)、讀取(Read)、更新(Update)、刪除(Delete)
+ 類型 
	+ InnoDB
	+ MyISAM 不支援 Transaction(交易)


<!--more-->

#### 種類
##### SQL 關聯資料語言
+ MySQL
+ PostgreSQL
+	MSSQL

##### NoSQL(Not only SQL)
如儲存 log 使用
+ MongoDB

#### DB 管理程式
##### MySQL
+ phpMyAdmin
+ MySQL workbench
+ Sequel Pro (Mac only)
+ HeidiSQL

### mySQL
#### 基礎語法
一般 mySQL 命令都用大寫,較易識別

##### bash command 
``` bash
# version
mysql -V
# 使用 root 進入 MySQL
mysql -u root -p
# 遠端登入 - remote_host_ip 指你要登入的遠端MySQL ip
mysql -u root -h remote_host_ip -p
```

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
# 修改使用者密碼
ALTER USER 'robert'@'localhost' IDENTIFIED BY 'password';
FLUSH PRIVILEGES;
```

##### 刪除資料 Delete
``` bash
DELETE FROM `my_class` WHERE id=4
```

##### SHOW 權限內容 
``` bash
mysql>SHOW GRANTS FOR robert@localhost;
	+------------------------------------------------------------+
	| Grants for robert@localhost                                |
	+------------------------------------------------------------+
	| GRANT USAGE ON *.* TO `robert`@`localhost`                 |
	| GRANT ALL PRIVILEGES ON `robert`.* TO `robert`@`localhost` |
	+------------------------------------------------------------+
```

##### SHOW/CREATE DATABASE
``` bash
mysql> CREATE DATABASE `bill`;
Query OK, 1 row affected (0.01 sec)

mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| bill               |
| information_schema |
| mysql              |
| performance_schema |
| phpmyadmin         |
| robert             |
| sys                |
+--------------------+
7 rows in set (0.00 sec)
``` 

##### CREATE user(also add password)/ALTER(modify user setting)
```
CREATE USER 'robert'@'localhost' IDENTIFIED BY 'userpassword';
# 可登入設定
CREATE USER 'robert2'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
CREATE USER 'robert2'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
# 更改 user 設定
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword';
# 建立使用者，並給予權限
grant usage on *.* to 'username'@'localhost' identified by 'yourpassword' with grant option; 
grant all privileges on *.* to 'username'@'localhost' identified by 'yourpassword';
flush privileges;
# 刪除mysql的使用者
delete from mysql.user where user='username' and host='localhost';
flush privileges;
```

##### 選擇資料庫
``` bash
USE mysql;
```

##### other command
``` bash
# current user
SELECT CURRENT_USER();
# show all user
SELECT User,Host FROM mysql.user;
# show all DB
SHOW DATABASES;
# show DB's table
USE mysql2;
SHOW TABLES;
# delete table
DROP TABLE blog_category;
DROP TABLE user_levels;
```

##### is_deleted 欄位(hide data for user)
MySQL沒有 boolean 型別, 設定 boolean 會自動轉成 tinyint(1)
``` bash
# 增加 is_deleted 欄位
# query data for user
SELECT * FROM `my_class` WHERE is_deleted=0
```

#### Transaction(交易) and Lock(鎖)
##### Transaction(交易)
``` php
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("update from money set amount = 20");
$conn->query("update from money set sum = 10");
$conn->commit();
```

##### Lock(鎖)
``` php
$conn->autocommit(FALSE);
$conn->begin_transaction();
$conn->query("SELECT amount from products where id = 1 for update");
$conn->commit();
```

##### test DB table
``` bash 
products:  
	id amount
	 1   1
```

##### normal process
``` php
<?php
	require_once('conn.php');
	
	$stmt = $conn->prepare("SELECT amount from products where id = 1");
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows > 0 ) {
		$row = $result->fetch_assoc();
		echo "amount " . $row['amount'];

		if ($row['amount'] > 0) {
			$stmt = $conn->prepare("UPDATE products SET amount = amount - 1 where id = 1");
			if ($stmt->execute()) {
				echo '購買成功';
			}
		}
	}
	$conn->close();
?>
```

##### add lock process
``` php
// where id = 1 for update  --> row lock
// no where --> table lock
<?php
	require_once('conn.php');
	
	// transactio
	$conn->autocommit(FALSE);
	$conn->begin_transaction();
	// for update mean lock
	$stmt = $conn->prepare("SELECT amount from products where id = 1 for update");
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows > 0 ) {
		$row = $result->fetch_assoc();
		echo "amount " . $row['amount'];

		if ($row['amount'] > 0) {
			$stmt = $conn->prepare("UPDATE products SET amount = amount - 1 where id = 1");
			if ($stmt->execute()) {
				echo '購買成功';
			}
		}
	}
	// transactio
	$conn->commit();
	$conn->close();
?>
```
