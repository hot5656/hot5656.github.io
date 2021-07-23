---
title: 網站部屬
abbrlink: 9d97
date: 2021-07-12 15:05:39
categories: Back End
tags:
	- web
---

### 常用主機
+ AWS
+ Digital Ocean
+ GCP
+ Linode

<!--more-->

###  AWS 網站部屬
#### 建立虛擬主機
1. 選擇區域,再點選使用 EC2

<div style="maxwidth:1000px">
	{% asset_img pic1.png pic1 %}
</div>

2. 選擇機器,有標註 Free Tier eligible為提供免費之機器,選擇 Ubuntu Server 20.04 LTS

<div style="maxwidth:1000px">
	{% asset_img pic2.png pic2 %}
</div>

3. 選擇機器Type(Free Tier eligible 為免費),選擇 t2.micro,再點選 "Next: Configure Instance Details"

<div style="maxwidth:1000px">
	{% asset_img pic3.png pic3 %}
</div>

4. Configure 機器,不需變動,直接點選 "Next:Add Storage"

<div style="maxwidth:1000px">
	{% asset_img pic4.png pic4 %}
</div>

5. 設定儲存記憶體,直接點選 "Next:Add Tags"

<div style="maxwidth:1000px">
	{% asset_img pic5.png pic5 %}
</div>

6. 設定 Tags,不用設定,直接點選 "Configure Security Group"

<div style="maxwidth:1000px">
	{% asset_img pic6.png pic6 %}
</div>

7. 設定 使用 port,default 為 SSH TCP port:22, 新增 HTTP TCP port:80,點選 "Review and Launch",再選 Launch

<div style="maxwidth:1000px">
	{% asset_img pic7.png pic7 %}
</div>
<div style="maxwidth:1000px">
	{% asset_img pic8.png pic8 %}
</div>

8. 選擇/新建 SSH key
新建: 選擇 "Create a new key pair",填入Key pair name,點選 Download Key Pair,下載 SSH key,最後點選 "Launch Instances" 啟動機器

<div style="maxwidth:1000px">
	{% asset_img pic9.png pic9 %}
</div>

9. 點選 "View Instances",然後輸入新建 Instance 的 Nanme

<div style="maxwidth:1000px">
	{% asset_img pic10.png pic10 %}
</div>
<div style="maxwidth:1000px">
	{% asset_img pic11.png pic11 %}
</div>

10. ssh 登入命令,點選 instance 再點選 Connect 即可看到 ssh 登入 command

<div style="maxwidth:1000px">
	{% asset_img pic12.png pic12 %}
</div>

11. ssh 登入,進入 command line 輸入視窗,將 ssh key copy 到 command line 的目錄下,執行前一步查到的 command,即可登入  

<div style="width:700px">
	{% asset_img pic13.png pic13 %}
</div>

<div style="width:700px">
	{% asset_img pic14.png pic14 %}
</div>

#### 安裝
1. 安裝 lamp

``` bash
# 更新軟體
# 更新軟體的最新資訊及列表 : sudo apt update
# 更新目前已安裝的軟體到最新版本 : sudo apt upgrade 
# 更新目前已安裝的軟體(可以聰明的解決相依性的問題, 如果有相依性問題, 需要 安裝/移除 新的 Package, 就會試著去 安裝/移除 它) : sudo apt dist-upgrade
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade 
# 安裝 tasksel(含 安裝軟件包之軟體)
sudo apt install tasksel
# 列出可安裝之任務
tasksel --list-tasks
# 透過 tasksel 安裝 lamp-server
sudo tasksel install lamp-server
# check apache 是否正常
curl http://localhost
# 使用 telnet text port 80
telnet 127.0.0.1 80
	Trying 127.0.0.1...
	Connected to 127.0.0.1.
	Escape character is '^]'.
```
2. 安裝 phpmyadmin

``` bash
sudo apt install phpmyadmin
```

按 space 選擇 apache2,再用 tab 選到 ok
<div style="width:700px">
	{% asset_img pic20.png pic20 %}
</div>

選 Yes mapping database to phpadmin
<div style="width:700px">
	{% asset_img pic21.png pic21 %}
</div>

輸入 phpmyadmin 註冊到資料庫的密碼
<div style="width:700px">
	{% asset_img pic22.png pic22 %}
</div>

使用 browser 開啟 http://public_ip/phpmyadmin/ 即可用帳號 phpmyadmin 登入 
(public_ip 填入實際ip)

3. 設定 database

``` bash
# mysql version
mysql --version
# 進入 mysql 
sudo mysql
# 查 user
mysql> SELECT user,authentication_string,plugin,host FROM mysql.user;
+------------------+------------------------------------------------------------------------+-----------------------+----
| user             | authentication_string                                                  | plugin                | hos
+------------------+------------------------------------------------------------------------+-----------------------+----
[V@L/N(.S+[gvM/2PeLoCrXt5q1NOKLFJR6F4ItguIdyxM6Px6lot6 | caching_sha2_password | localhost |
| mysql.infoschema | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | loc
| mysql.session    | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | loc
| mysql.sys        | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED | caching_sha2_password | loc
Kd262Q%*OQHik@|HFSXTBukSEcHmTHrSomDLHSlTUHTaIaP4ZHpWCCHXw8 | caching_sha2_password | localhost |
| root             |                                                                        | auth_socket           | loc
+------------------+------------------------------------------------------------------------+-----------------------+----
6 rows in set (0.00 sec)
mysql> SELECT user,plugin,host FROM mysql.user;
+------------------+-----------------------+-----------+
| user             | plugin                | host      |
+------------------+-----------------------+-----------+
| debian-sys-maint | caching_sha2_password | localhost |
| mysql.infoschema | caching_sha2_password | localhost |
| mysql.session    | caching_sha2_password | localhost |
| mysql.sys        | caching_sha2_password | localhost |
| phpmyadmin       | caching_sha2_password | localhost |
| root             | auth_socket           | localhost |
+------------------+-----------------------+-----------+
6 rows in set (0.00 sec)
mysql>
# 設定權限: 密碼強度控制、拒絕遠端 root 登入 等等的安全性設
sudo mysql_secure_installation
	Securing the MySQL server deployment.
	Connecting to MySQL using a blank password.
	VALIDATE PASSWORD COMPONENT can be used to test passwords
	and improve security. It checks the strength of password
	and allows the users to set only those passwords which are
	secure enough. Would you like to setup VALIDATE PASSWORD component?
	# 設定密碼強度
	Press y|Y for Yes, any other key for No: n
	# 輸入密碼
	Please set the password for root here.
	New password:
	Re-enter new password:
	By default, a MySQL installation has an anonymous user,
	allowing anyone to log into MySQL without having to have
	a user account created for them. This is intended only for
	testing, and to make the installation go a bit smoother.
	You should remove them before moving into a production
	environment.
	# 移除匿名 user?
	Remove anonymous users? (Press y|Y for Yes, any other key for No) : Y
	Success.
	Normally, root should only be allowed to connect from
	'localhost'. This ensures that someone cannot guess at
	the root password from the network.
  # disable remote root?
	Disallow root login remotely? (Press y|Y for Yes, any other key for No) : N
	... skipping.
	By default, MySQL comes with a database named 'test' that
	anyone can access. This is also intended only for testing,
	and should be removed before moving into a production
	environment.
	# 移除 test database
	Remove test database and access to it? (Press y|Y for Yes, any other key for No) : N
	... skipping.
	Reloading the privilege tables will ensure that all changes
	made so far will take effect immediately.
	# 更新權限 table
	Reload privilege tables now? (Press y|Y for Yes, any other key for No) : Y
	Success.
	All done!
# 設定 mysql 登入要使用密碼
sudo mysql
# 更改 root password
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'rootpassword';
	Query OK, 0 rows affected (0.00 sec)
# Reload 權限設定 
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)

# login mysql by root
sudo mysql -u root -p
mysql>

# 使用 browser 開啟 http://public_ip/phpmyadmin/ 即可用帳號 root 登入
```

4. change apache root folder

``` bash
# change apache root folder
sudo vi /etc/apache2/sites-available/000-default.conf
// --- 更改前
DocumentRoot /var/www/html
// --- 更改後
DocumentRoot /var/www
# 更改目錄權限,及建立軟連結
sudo chown -R ubuntu:ubuntu /var/www
ln -s /var/www ./www
echo "Hello World..." > /var/www/index.html
# restart
sudo service apache2 restart
# open browser check work well
```

5. 建立 SFTP link

執行 FileZilla, 新增站台, 選擇協定為 SFTP, 設定IP, 設定使用者,選擇 ssh key 檔案,點選連線
<div style="maxwidth:1000px">
	{% asset_img pic23.png pic23 %}
</div>


選擇信任主機
<div style="maxwidth:1000px">
	{% asset_img pic24.png pic24 %}
</div>

SFTP 連線後,即可將必要的檔案傳入 
<div style="maxwidth:1000px">
	{% asset_img pic25.png pic25 %}
</div>

6. 建立 user 和 資料庫

建立 user 
``` bash
sudo mysql -u root -p
mysql> CREATE USER 'robert'@'localhost' IDENTIFIED BY 'userpassword';
Query OK, 0 rows affected (0.02 sec)

mysql> GRANT ALL ON robert.* TO robert@localhost;
Query OK, 0 rows affected (0.01 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)

mysql>
```

建立資料庫
<div style="maxwidth:1000px">
	{% asset_img pic26.png pic26 %}
</div>

匯入已有之資料庫
<div style="maxwidth:1000px">
	{% asset_img pic27.png pic27 %}
</div>

#### 設定 Elastic IP(彈性IP) - 關機重開不會更改IP

1. 選擇 Elastic IPs, 再點選 Allocate Elastic IP address

<div style="maxwidth:1000px">
	{% asset_img pic30.png pic30 %}
</div>

2. 點選 Allocate

<div style="maxwidth:1000px">
	{% asset_img pic31.png pic31 %}
</div>

3. 再選擇 Actions, Associate IP address

<div style="maxwidth:1000px">
	{% asset_img pic32.png pic32 %}
</div>

4. 點選 Associate 即 設定完成,開 browser 看是否執行正常

<div style="maxwidth:1000px">
	{% asset_img pic33.png pic33 %}
</div>

<div style="maxwidth:1000px">
	{% asset_img pic34.png pic34 %}
</div>

<div style="maxwidth:1000px">
	{% asset_img pic35.png pic35 %}
</div>

#### 設定 Domain name - DoDaDDy
1. 設定 domain name 對應 ip

<div style="maxwidth:1000px">
	{% asset_img pic36.png pic36 %}
</div>

#### VSCode SFTP 同步 Server Code
1. VSCode 安裝 SFTP FTP sync

<div style="width:500px">
	{% asset_img pic40.png pic40 %}
</div>

2. Setup Config

`Ctrl` + `shift` + `P` or `F1` --> `SFTP:Config` --> 設定 sftp.json 內容

<div style="width:500px">
	{% asset_img pic41.png pic41 %}
</div>

<div style="width:500px">
	{% asset_img pic42.png pic42 %}
</div>

sftp.json 內容
``` json
{
	"name": "robert_apache_new",
  "host": "35.72.2.117",
  "protocol": "sftp",
  "port": 22,
  "username": "ubuntu",
  "remotePath": "/home/ubuntu/www/blog3",
	"uploadOnSave": false,
	"secure": true,
	"privateKeyPath": "../robert_aws_apache.pem",
	"syncMode": "update",
	"debug": true,
	"watcher": {
		"files": "**/*",
		"autoUpload": true,
		"autoDelete": true
	},
	"ignore": [
		"\\.vscode",
		"\\.git",
		"\\.DS_Store",
		"conn.php",
		"*.bak"
	]
}
```

sftp.json 內容 mutiple Context
mutiple Context 僅能 link 最後一個, name也不能重複
所以要使用時,copy 到最後,改一下 name 即可
``` json
[
	{
		"name": "robert_apache_new",
		"host": "35.72.2.117",
		"protocol": "sftp",
		"port": 22,
		"username": "ubuntu",
		"remotePath": "/home/ubuntu/www/blog3",
		"uploadOnSave": false,
		"secure": true,
		"privateKeyPath": "../robert_aws_apache.pem",
		"syncMode": "update",
		"debug": true,
		"watcher": {
			"files": "**/*",
			"autoUpload": true,
			"autoDelete": true
		},
		"ignore": [
			"\\.vscode",
			"\\.git",
			"\\.DS_Store",
			"conn.php",
			"*.bak"
		]
	},
	{
		"name": "robert_apache3",
		"host": "54.238.250.158",
		"protocol": "sftp",
		"port": 22,
		"username": "ubuntu",
		"remotePath": "/home/ubuntu/www/blog2",
		"uploadOnSave": false,
		"secure": true,
		"privateKeyPath": "../demo_apache.pem",
		"syncMode": "update",
		"debug": true,
		"watcher": {
			"files": "**/*",
			"autoUpload": true,
			"autoDelete": true
		},
		"ignore": [
			"\\.vscode",
			"\\.git",
			"\\.DS_Store",
			"conn.php",
			"*.bak"
		]
	},
	{
		"name": "robert_null",
		"host": "127.0.0.1",
		"protocol": "sftp",
		"port": 22,
		"username": "ubuntu",
		"remotePath": "/",
		"uploadOnSave": false,
		"secure": true,
		"privateKeyPath": "",
		"syncMode": "update",
		"debug": true
	},
	{
		"name": "robert_apache3_",
		"host": "54.238.250.158",
		"protocol": "sftp",
		"port": 22,
		"username": "ubuntu",
		"remotePath": "/home/ubuntu/www/blog2",
		"uploadOnSave": false,
		"secure": true,
		"privateKeyPath": "../demo_apache.pem",
		"syncMode": "update",
		"debug": true,
		"watcher": {
			"files": "**/*",
			"autoUpload": true,
			"autoDelete": true
		},
		"ignore": [
			"\\.vscode",
			"\\.git",
			"\\.DS_Store",
			"conn.php",
			"*.bak"
		]
	}
]
```

3. 同步 remote Servet

`Ctrl` + `shift` + `P` or `F1` --> `SFTP:Sync Local -> remote`
<div style="width:700px">
	{% asset_img pic43.png pic43 %}
</div>

選擇 server
<div style="width:700px">
	{% asset_img pic44.png pic44 %}
</div>

OUTPUT 會顯示 SFTP 執行內容
<div style="maxwidth:1000px">
	{% asset_img pic45.png pic45 %}
</div>

#### 安裝 #2 - 個別安裝

1. 安裝 apache2 

``` bash
# 更新軟體
sudo apt update && sudo apt upgrade && sudo apt dist-upgrade 
# insatll apache
sudo apt install apache2
# start apache
sudo service apache2 start
# change apache root folder
sudo vi /etc/apache2/sites-available/000-default.conf
// --- 更改前
DocumentRoot /var/www/html
// --- 更改後
DocumentRoot /var/www
# 更改目錄權限,及建立軟連結
sudo chown -R ubuntu:ubuntu /var/www
ln -s /var/www ./www
echo "Hello World..." > /var/www/index.html
# restart
sudo service apache2 restart
# open browser check work well
```

2. 安裝 php

``` bash
# install
sudo apt install php-fpm libapache2-mod-php php-curl php-imagick php-mysql php-gd php-mbstring php-xml
# php version
php -v
# add /var/www/phpinfo.php
vi ./www/phpinfo.php

<?php
  phpinfo();
?>
# restart
sudo service apache2 restart
# open browser phpinfo.php ceck work well
# 檢查是否有 imagick、curl、mysqli、pdo_mysql、gd、mbstring 功能
```

3. 安裝 MySQL

``` bash
# Install MySQL
sudo apt install mysql-server
# Run the security script 
sudo mysql_secure_installation
# Creating MySQL User 
sudo mysql
mysql> CREATE USER 'robert'@'localhost' IDENTIFIED BY 'passwrod';
Query OK, 0 rows affected (0.02 sec)

# 更改 root password Password Plugin to mysql_native_password for remote login
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passwrod';
Query OK, 0 rows affected (0.01 sec)

# 授予 user 權限
mysql> GRANT ALL  ON robert.* TO 'robert'@'localhost';
Query OK, 0 rows affected (0.01 sec)

# create database - 特別要用反引號
mysql> CREATE DATABASE `robert`;
Query OK, 1 row affected (0.01 sec)

# free previous command cache 
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.00 sec)

mysql> exit
Bye
```

4. 檢查 MySQL 安裝結果

``` bash
# chec mysql status
ubuntu@ip-172-31-35-217:~$ systemctl status mysql.service
● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset:>
     Active: active (running) since Thu 2021-07-22 06:54:12 UTC; 52min ago
   Main PID: 36133 (mysqld)
     Status: "Server is operational"
      Tasks: 38 (limit: 1160)
     Memory: 333.2M
     CGroup: /system.slice/mysql.service
             └─36133 /usr/sbin/mysqld

# use comand mysqladmin tool dump version
sudo mysqladmin -p -u robert version
	Enter password:
	mysqladmin  Ver 8.0.25-0ubuntu0.20.04.1 for Linux on x86_64 ((Ubuntu))
	Copyright (c) 2000, 2021, Oracle and/or its affiliates.
	Oracle is a registered trademark of Oracle Corporation and/or its
	affiliates. Other names may be trademarks of their respective
	owners.
	Server version          8.0.25-0ubuntu0.20.04.1
	Protocol version        10
	Connection              Localhost via UNIX socket
	UNIX socket             /var/run/mysqld/mysqld.sock
	Uptime:                 55 min 19 sec
	Threads: 2  Questions: 20  Slow queries: 0  Opens: 159  Flush tables: 3  Open ta
	bles: 78  Queries per second avg: 0.006
``` 

5. install phpMyAdmin

``` bash
# install phpMyAdmin 相關 package
sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
```

按 space 選擇 apache2,再用 tab 選到 ok
<div style="width:600px">
	{% asset_img pic20.png pic20 %}
</div>

選 Yes mapping database to phpadmin
<div style="width:600px">
	{% asset_img pic21.png pic21 %}
</div>

輸入 phpmyadmin 註冊到資料庫的密碼
<div style="width:600px">
	{% asset_img pic22.png pic22 %}
</div>

``` bash
# enable mbstring PHP extension, 
sudo phpenmod mbstring
# restart apache2
sudo systemctl restart apache2
```

使用 browser 開啟 http://public_ip/phpmyadmin/ 即可用帳號 phpmyadmin 登入
(public_ip 填入實際ip)

可使用 .htaccess 增加 phpMyAdmin 安全性(有必要再來研究)

#### 其他 app 連至 MySQL
1. Inbound Rules 新增 HTTP TCP port:3306

<div style="maxwidth:1000px">
	{% asset_img pic46.png pic46 %}
</div>

2. mask bind-address(允許連線主機)

``` bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
# --- 原來
bind-address          = 127.0.0.1
# --- 修改後
# bind-address          = 127.0.0.1
```

3. root localhost 改成 % 

``` bash
sudo mysql -u root -p
Enter password:

mysql> SELECT user,plugin,host FROM mysql.user;
	+------------------+-----------------------+-----------+
	| user             | plugin                | host      |
	+------------------+-----------------------+-----------+
	| debian-sys-maint | caching_sha2_password | localhost |
	| mysql.infoschema | caching_sha2_password | localhost |
	| mysql.session    | caching_sha2_password | localhost |
	| mysql.sys        | caching_sha2_password | localhost |
	| phpmyadmin       | caching_sha2_password | localhost |
	| robert           | caching_sha2_password | localhost |
	| root             | mysql_native_password | localhost |
	+------------------+-----------------------+-----------+
	7 rows in set (0.00 sec)

mysql> use mysql;
	Reading table information for completion of table and column names
	You can turn off this feature to get a quicker startup with -A
	Database changed

mysql> update user set host ='%'where user ='root' and host ='localhost';
	Query OK, 1 row affected (0.01 sec)
	Rows matched: 1  Changed: 1  Warnings: 0

mysql> SELECT user,plugin,host FROM mysql.user;
	+------------------+-----------------------+-----------+
	| user             | plugin                | host      |
	+------------------+-----------------------+-----------+
	| root             | mysql_native_password | %         |
	| debian-sys-maint | caching_sha2_password | localhost |
	| mysql.infoschema | caching_sha2_password | localhost |
	| mysql.session    | caching_sha2_password | localhost |
	| mysql.sys        | caching_sha2_password | localhost |
	| phpmyadmin       | caching_sha2_password | localhost |
	| robert           | caching_sha2_password | localhost |
	+------------------+-----------------------+-----------+
	7 rows in set (0.00 sec)

mysql> flush privileges;
	Query OK, 0 rows affected (0.01 sec)

mysql> quit
	Bye
```

#### logs 查詢
1. apache2 log

``` bash
less -m -N /var/log//apache2/error.log
```

