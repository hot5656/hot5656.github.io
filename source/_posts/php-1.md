---
title: PHP 說明
categories: Back End
tags:
  - php
	- database
	- mysql
abbrlink: '755'
date: 2021-05-31 10:39:11
---

### 基本

#### setup XAMPP
+ XAMPP是最流行的PHP開發環境
+ MariaDB是MySQL關聯式資料庫管理系統的一個復刻，由社群開發，有商業支援

##### install [XAMPP](https://www.apachefriends.org/zh_tw/index.html)

<!--more-->

##### XAMPP Config
###### run XAMPP 

<div style="width:150px">
	{% asset_img pic1.png pic1 %}
</div>

###### Start Apache and MySQL 

<div style="width:700px">
	{% asset_img pic2.png pic2 %}
	{% asset_img pic3.png pic3 %}
</div>

###### check Admin and PHP PHPInfo

<div style="width:700px">
	{% asset_img pic4.png pic4 %}
	{% asset_img pic5.png pic5 %}
	{% asset_img pic6.png pic6 %}
</div>

###### Config PHP

+ 點選 Config -> &lt;browse&gt; [PHP]
<div style="width:700px">
	{% asset_img pic7.png pic7 %}
</div>

+ 選 xampp > htdocs 目錄
<div style="width:700px">
	{% asset_img pic8.png pic8 %}
</div>

+ 新增工作目錄 和 檔案 a.php
<div style="width:500px">
	{% asset_img pic9.png pic9 %}
</div>
``` php
<?php	
	// a.php
	echo "Hello!"
?>
```

+ browser 執行 a.php
<div style="width:500px">
	{% asset_img pic10.png pic10 %}
</div>

#### PHP 基本語法
``` php
<?php	
	// a.php
	// ; 結尾, echo 為輸出
	echo "Hello!" ;
	// 加入標簽(有作用)
	echo "<h1>Hello!<h1>" ;
	// 變數 $ 開頭
	$a = 1; 
	echo $a;
	// 字串不可相加, 要用 . 
	$b = "bbbb";
	$c = "cccc";
	// echo $b + $d
	echo $b . $c;
	// if 條件式
	$score = 70;
	if ($score >= 60) {
		echo "pass";
	}
	else {
		echo "fail";
	}
	// loop 
	// \n 會解釋為空白(單引號與雙引號有差別)
	// 因用 browser 輸出, 故改為 <br? 即可換行
	for ($i=1 ; $i<=10 ; $i++) {
		// echo $i . "\n";
		echo $i . "<br>";
	}
	// array 
	$arr = array("aa", 2, 3, 4, "zz");
	echo "<br>" . $arr[0] . $arr[3] . "<br>";
	// array size
	echo "length=" . sizeof($arr);
	// 直接 echo array 會有問題
	// echo $arr
	// dump array 可用 var_dump()
	var_dump($arr);
	// 另一個 dump function print_r()
	print_r($arr);
	// function
	function add($a ,$b) {
		return $a + $b;
	}
	echo add(3,6);
?>
```

``` bash
# output 
Hello!
Hello!
1bbbbccccpass1
2
3
4
5
6
7
8
9
10

aa4
length=5array(5) { [0]=> string(2) "aa" [1]=> int(2) [2]=> int(3) [3]=> int(4) [4]=> string(2) "zz" } 
Array ( [0] => aa [1] => 2 [2] => 3 [3] => 4 [4] => zz ) 9
```

#### Disable cache 
使用XAMPP環境,有時程式改變但 browser 顯示卻不正確,可能是 cache 的影響,選擇 Disable cache 再從新整理即可
<div style="width:700px">
	{% asset_img pic11.png pic11 %}
</div>

#### PHP example
##### Query string
``` php
<?php
	echo 'Hello! <br>';
	// 檢查 a 是否有傳進來
	if (isset($_GET['a'])) {
		echo "a:" . $_GET['a'] . '<br>' ;
	}
	if (isset($_GET['b'])) {
		echo "b:" . $_GET['b'] . '<br>' ;
	}
	print_r($_GET);
?>
```

``` bash
# web browser 
http://localhost/robert/data.php?a=1&b=3
	Hello!
	a:1
	b:3
	Array ( [a] => 1 [b] => 3 )
# web browser 
http://localhost/robert/data.php?a=&c=1
	Hello!
	a:
	Array ( [a] => [c] => 1 )
```

##### show time
``` php 
<?php
	echo 'hello !'
?>

<h1>Now : <?php echo date('Y-m-d H:i:s') ?></h1>
```

``` bash
# web browser 
http://localhost/robert/index.php
	hello !
	Now : 2021-06-07 08:13:39
```

##### form by GET
``` php
<!-- data.php -->
<?php
	// 檢查 是否有傳進來
	// if (!isset($_GET['name']) ||  !isset($_GET['age']) ) {
	// 檢查空字串較合理
	if (empty($_GET['name']) || empty($_GET['age']) ) {
		echo "請輸入資料!" ;
		// 程式跳開
		exit();
	}
	echo 'Hello! ' . $_GET['name'] . '<br>';
	echo 'Your age is ' . $_GET['age'] . '<br>';
?>
```

``` php
<!-- index.php -->
<form method="GET" action="data.php">
	name: <input type="text" name='name'>
	age: <input type="text" name='age'>
	<input type="submit">
</form>
```

##### form by POST - 要改用$_POST 抓參數
``` php
<!-- data.php -->
<?php
	// 檢查 是否有傳進來
	// if (!isset($_GET['name']) ||  !isset($_GET['age']) ) {
	// 檢查空字串較合理
	if (empty($_POST['name']) || empty($_POST['age']) ) {
		echo "請輸入資料!" ;
		// 程式跳開
		exit();
	}
	echo 'Hello! ' . $_POST['name'] . '<br>';
	echo 'Your age is ' . $_POST['age'] . '<br>';
	print_r($_POST);
?>
```

``` php
<!-- index.php -->
<form method="POST" action="data.php">
	name: <input type="text" name='name'>
	age: <input type="text" name='age'>
	<input type="submit">
</form>
```

##### connecty database
``` php
<!-- conn.php -->
<?php
	$server_name = 'localhost';
	$username = 'robert';
	$password = 'pass';
	$db_name = 'robert';

	$conn = new mysqli($server_name, $username, $password, $db_name);
	
	if ($conn->connect_error) {
		// echo '資料庫連接錯誤 : ' . $conn->connect_error . '<br>';
		// die 表程式結束,後面不再執行
		die('資料庫連接錯誤 : ' . $conn->connect_error);
	}

	// 設定編碼,中文才不會有問題
	$conn->query('SET NAMES UTF8');
	// 設定我們的時區
	$conn->query('SET time_zone = "+8:00"');
?>
```

``` phy
<!-- data.php -->
<?php
	// include file
	require_once('conn.php');

	......
?>
```

##### query time from database
``` php 
<!-- data.php -->
<?php
	// include file
	require_once('conn.php');

	$result = $conn->query("select now();");
	if (!$result) {
		die($conn->error);
	}
	// print_r($result);
	// 拿到結果
	$row = $result->fetch_assoc();
	print_r($row);		// Array ( [now()] => 2021-06-07 16:43:20 )
	echo '<br>now:' . $row['now()']; // now:2021-06-07 16:43:20
?>
```

``` php 
<!-- data.php -->
<?php
	// include file
	require_once('conn.php');

	$result = $conn->query("select now() as n;");
	if (!$result) {
		die($conn->error);
	}
	// print_r($result);
	// 拿到結果
	$row = $result->fetch_assoc();
	//print_r($row);		
	echo '<br>now:' . $row['n']; // now:2021-06-07 16:43:20
?>
```

##### 讀取 mySQL
``` php 
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	$result = $conn->query("select * from users;");
	if (!$result) {
		die($conn->error);
	}
	// print_r($result);

	// 印出所有資料
	// $row = $result->fetch_assoc() 每次讀出一筆資料,無資料時讀出空資料
	while ($row = $result->fetch_assoc()) {
		// print_r($row);	// Array ( [id] => 1 [username] => Mary ) Array ( [id] => 2 [username] => Bill ) ...
		echo 'id : ' . $row['id'] . ' username : ' . $row['username'] . '<br>';  // id : 1 username : Mary ...
	}
?>
```

##### 新增 mySQL 資料
``` php
<!-- add.php -->
<?php
	// include file
	require_once('conn.php');
	
	// command 方法 #1
	// $result = $conn->query("insert into users(username) values('apple')");
	$username = 'orange';
	// command 方法 #2
	// $sql = "insert into users(username) values('" . $username . "')";
	// command 方法 #3
	// $sql = sprintf("insert into users(id, username) values(%d, '%s')", 13, $username);
	$sql = sprintf("insert into users(username) values('%s')", $username);
	echo $sql;
	// exit();
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	print_r($result);
?>
```

##### 新增 mySQL 資料(使用 form)
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 大到小排列
	// $result = $conn->query("SELECT * FROM users ORDER BY id DESC;");
	// 小到大排列
	$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	if (!$result) {
		die($conn->error);
	}

	// 印出所有資料
	// $row = $result->fetch_assoc() 每次讀出一筆資料,無資料時讀出空資料
	while ($row = $result->fetch_assoc()) {
		echo 'id : ' . $row['id'] . ' username : ' . $row['username'] . '<br>';  // id : 1 username : Mary ...
	}
?>

<h2>新增 user</h2>
<form method="POST" action="add.php">
	username: <input type="text" name='username'>
	<input type="submit">
</form>
```

``` php
<!-- add.php -->
<?php
	// include file
	require_once('conn.php');
	
	if (empty($_POST['username'])) {
		die('請輸入 username');
	}

	$username = $_POST['username'];
	// command 方法 #1
	// $result = $conn->query("insert into users(username) values('apple')");
	// command 方法 #2
	// $sql = "insert into users(username) values('" . $username . "')";
	// command 方法 #3
	// $sql = sprintf("insert into users(id, username) values(%d, '%s')", 13, $username);
	$sql = sprintf("insert into users(username) values('%s')", $username);
	// echo $sql;
	// exit();
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	echo '新增成功!';

	// run index.php
	header("Location: index.php");
?>
```

##### 刪除 mySQL 資料
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 小到大排列
	$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	if (!$result) {
		die($conn->error);
	}

	// 印出所有資料
	// $row = $result->fetch_assoc() 每次讀出一筆資料,無資料時讀出空資料
	while ($row = $result->fetch_assoc()) {
		echo 'id : ' . $row['id'] . ' username : ' . $row['username'] .  '<a href="delete.php?id=' . $row['id'] . '">刪除</a>' . '<br>';  // id : 1 username : Mary ...
	}
?>

<h2>新增 user</h2>
<form method="POST" action="add.php">
	username: <input type="text" name='username'>
	<input type="submit">
</form>
```

``` php
<!-- delete.php -->
<?php
	// include file
	require_once('conn.php');
	
	if (empty($_GET['id'])) {
		die('請輸入 id');
	}

	$id = $_GET['id'];
	$sql = sprintf("delete from users where id = %d", $id);
	echo $sql;
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}
	echo '刪除成功!';

	// run index.php
	header("Location: index.php");
?>
```

##### 修改 mySQL 資料
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 小到大排列
	$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	if (!$result) {
		die($conn->error);
	}

	// 印出所有資料
	// $row = $result->fetch_assoc() 每次讀出一筆資料,無資料時讀出空資料
	while ($row = $result->fetch_assoc()) {
		echo 'id : ' . $row['id'] . ' username : ' . $row['username'] .  '<a href="delete.php?id=' . $row['id'] . '">刪除</a>' . '<br>';  // id : 1 username : Mary ...
	}
?>

<h2>新增 user</h2>
<form method="POST" action="add.php">
	username: <input type="text" name='username'>
	<input type="submit">
</form>

<h2>編輯 user</h2>
<form method="POST" action="update.php">
	id: <input type="text" name='id'>
	username: <input type="text" name='username'>
	<input type="submit">
</form>
```

``` php
<!-- update.php -->
<?php
	// include file
	require_once('conn.php');
	
	if (empty($_POST['id']) || empty($_POST['username'])) {
		die('請輸入 id 和 username');
	}

	$id = $_POST['id'];
	$username = $_POST['username'];
	$sql = sprintf("update users set username='%s' where id=%d",
					$username, $id);
	echo $sql;
	$result = $conn->query($sql);
	if (!$result) {
		die($conn->error);
	}

	if ($conn->affected_rows >=1) {
		echo '編輯成功!';
	}
	else {
		echo '查無資料!';
	}

	// run index.php
	header("Location: index.php");
?>
```

### PHP function 

#### [date()](https://www.php.net/manual/en/function.date.php)

#### [header](https://www.php.net/manual/en/function.header.php) 開啟網頁
``` php
header("Location: http://$host$uri/$extra");
header("Location: index.php");
```

#### cookie
``` php
// set cookie - 1 hour --> *24*30 = 30days
setcookie("user", "peter" , time()+3600); 
// get kookie
echo $_COOKIE["user"];
// delete cookie 
setcookie("user", "", time()-3600);
```
