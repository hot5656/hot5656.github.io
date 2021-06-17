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

### 名詞
#### 雜湊(Hash) : 將目標文字轉換成具有相同長度的、不可逆的雜湊字串
#### 加密(Encrypt) :是將目標文字轉換成具有不同長度的、可逆的密文
如 MD5, SHA256
#### 跨網站指令碼(Cross-site scripting,簡稱XSS) : 是一種網站應用程式的安全漏洞攻擊，是代碼注入的一種
``` html
<!-- 測試網站是否有正確處理特殊字元： -->
><script>alert(document.cookie)</script>
='><script>alert(document.cookie)</script>
"><script>alert(document.cookie)</script>
<script>alert(document.cookie)</script>
<script>alert('vulnerable')</script>
%3Cscript%3Ealert('XSS')%3C/script%3E
<script>alert('XSS')</script>
<img src="javascript:alert('XSS')">
<!-- 可導到釣魚網站或dump cookie -->
<script>location.href="https://google.com"</script>
<script>alert(document.cookie)</script>
```

#### SQL injection
也稱SQL隱碼或SQL注碼，是發生於應用程式與資料庫層的安全漏洞。簡而言之，是在輸入的字串之中夾帶SQL指令，在設計不良的程式當中忽略了字元檢查，那麼這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的SQL指令而執行，因此遭到破壞或是入侵。也稱為駭客的填字遊戲.
``` mysql
# 原指令
# select * from users where username= '%s' and password='%s' ;
# usaename 填入以下,即可登入
aa'#
' or 1=1#

# 原指令
# insert into comment(nickname, content) values('%s', '%s');
# content 填入以下,即可偽裝留言
'), ('aa2', 'bb21
'), ('admin', 'what')#

# 原指令
# nsert into comment(nickname, content) values('%s', '%s');
# sub query 模擬以下命令
# insert into comment(nickname, content) values('aaa', (select password from users limit 1) ) 
# content 填入以下,即可列出密碼
'), ('admin', (select password from users limit 1) )#
'), ('dd', (select password from users where nickname='dd') )#
'), ((select nickname from users where id=69), (select password from users where id=69) )#
```

#### 資料庫正規化
[Database schema templates](https://drawsql.app/templates)
資料庫正規化，又稱正規化、標準化，是資料庫設計的一系列原理和技術

### 設計參考
#### PHP Security 注意事項
+ add session
+ password save by hash
+ XSS : print add htmlspecialchars
+ SQL injection : add prepared statement
+ 權限管理 : 做以下動作f前,要再 check user 是否符合
	modify, deleted, show private information 


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

#### from 含不顯示資料 input's type="hidden"
``` php
<form class="input-form" method="POST" action="update_content_handle.php">
	<div class="hi">
		Hi, 
		<?php 
			echo $_GET['nickname'];	
		?> 
	</div>
	<textarea class="input-content" name="content" rows="5"><?php echo $content; ?></textarea>
	<input type="hidden" name='id' value=<?php echo $_GET['id'] ?> >
	<input type="hidden" name='nickname' value=<?php echo $_GET['nickname'] ?> >
	<input class="input-submit" type="submit">
</form>
```

### PHP example
#### Query string
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

#### show time
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

#### form by GET
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

#### form by POST - 要改用$_POST 抓參數
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

#### Query strig 標示錯誤
``` php
<?php 
	if (!empty($_GET['errorCode'])) {
		$code = $_GET['errorCode'];
		$msg = '';
		if ($code === '1') {
			$msg = '輸入不齊全!';
		}
		echo '<h2 class="error"> 錯誤 : ' . $msg . '</h2>' ;
	}
?>

// load 含 error code
header('Location: index.php?errorCode=1');
```

#### 產生亂數字串
``` php
	function creatToken() {
		$str = '';
		for($i=0; $i < 20 ; $i++) {
			$str = $str . chr(rand(65,90));
		}
		return $str;
	}
```

#### global 全域變數
``` php
<?php
$a = 1;

function sum() {
   global $a;
   
   $a = $a*100;
}

sum();
echo $a;
?>
```

#### htmlspecialchars for XSS
``` php
// default 第二個引數為ENT_COMPAT,只轉化雙引號,不對單引號做轉換,故加入 ENT_QUOTES
$content = htmlspecialchars($_POST['content'],ENT_QUOTES);
```

### Snippet for mySQL 

#### special parameter
``` php 
// check update/detelet success - $conn->affected_rows
$sql = "update comment set content=? where id = ? and username=?";
$stmt= $conn->prepare($sql);
$stmt->bind_param('sss', $_POST['content'], $_POST['id'], $_SESSION['username']);
$result = $stmt->execute();
if (!$result) {
	print_r($conn->error);
	header('Location: update_content.php?errorCode=2&nickname=$_POST["nickname"]&id=$_POST["id"]');
}

$affect_rows = (int)$conn->affected_rows;
if ($affect_rows<1) {
	header('Location: index.php?errorCode=3');
	exit();
}
```

#### connect database
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

#### query time from database
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

#### 讀取 mySQL
``` php 
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	$sql = "select * from comment order by id DESC;";
	//$result = $conn->query($sql);
	//if (!$result) {
	//	die('Error : ' . $conn->error);
	//}

	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die('Error : ' . $conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();

	// 印出所有資料
	// $row = $result->fetch_assoc() 每次讀出一筆資料,無資料時讀出空資料
	while ($row = $result->fetch_assoc()) {
		// print_r($row);	
		echo 'nickname : ' . $row['nickname'] . ' content : ' . $row['content'] . '<br>'; 
	}
?>
```

#### 讀取 mySQL(check error)
``` php
<?php
	require_once('conn.php');

	if ( empty($_POST['username']) || empty($_POST['password']) ) {
		header('Location: login.php?errorCode=1');
		die("輸入錯誤!");
	}

	//$sql = sprintf("select * from users where username= '%s' and password = '%s'; ",
	//		$_POST['username'], $_POST['password']);
	//$result = $conn->query($sql);
	//if (!$result) {
	//	die($conn->error);
	//}

	$sql = "select * from users where username= ? and password = ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $_POST['username'], $_POST['password']);
	$result = $stmt->execute();
	if (!$result) {
		die($conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();
	
	// $result->num_rows,$conn->affected_rows 都可以
	if ($result->num_rows < 1 ) {
		header('Location: login.php?errorCode=2');
		die("登入失敗");
	}

	echo "登入成功";
	$expire = time()+3600*24*30;
	setcookie("username", $_POST['username'], $expire);
	header('Location: index.php');
?>
```



#### 新增 mySQL 資料
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
	// ---
	// $sql = sprintf("insert into users(username) values('%s')", $username);
	// $result = $conn->query($sql);

	$sql = "insert into users(username) values(?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $username) ;
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}
	print_r($result);
?>
```

#### 新增 mySQL 資料(使用 form)
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 大到小排列
	// $result = $conn->query("SELECT * FROM users ORDER BY id DESC;");
	// 小到大排列
	//$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	//if (!$result) {
	//	die($conn->error);
	//}

	$sql = "SELECT * FROM users ORDER BY id ASC";
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die('Error : ' . $conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();

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
	// --
	// $sql = sprintf("insert into users(username) values('%s')", $username);
	// $result = $conn->query($sql);

	$sql = "insert into users(username) values(?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $username) ;
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
	}
	echo '新增成功!';

	// run index.php
	header("Location: index.php");
?>
```

#### 新增 mySQL 資料(check error)
``` php
<?php
	require_once('conn.php');

	if ( empty($_POST['username']) || empty($_POST['nickname'])
		|| empty($_POST['password'])) {
		header('Location: register.php?errorCode=1');
		die("輸入錯誤!");
	}

	//$sql = sprintf("insert into users(username, nickname, password) values('%s', '%s', '%s')",
	//		$_POST['username'], $_POST['nickname'], $_POST['password']);
	//$result = $conn->query($sql);

	$sql = "insert into users(username, nickname, password) values(?, ?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss',$username, $nickname, password_hash($_POST['password'], PASSWORD_DEFAULT) ) ;
	$result = $stmt->execute();

	if (!$result) {
		// check 是否包含字串,不包含傳回 false
		// if (strpos($conn->error, 'Duplicate entry') !== false) {
		// check duplicate error code = 1062
		if  ($conn->errno === 1062) {
		 	header('Location: register.php?errorCode=2');
		}
		die($conn->error);
	}
	
	echo "新增完成";
	$expire = time()+3600*24*30;
	setcookie("username", $_POST['username'], $expire);
	header('Location: index.php');
?>
```


#### 刪除 mySQL 資料
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 小到大排列
	//$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	//if (!$result) {
	//	die($conn->error);
	//}

	$sql = "SELECT * FROM users ORDER BY id ASC";
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die('Error : ' . $conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();

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
	//$sql = sprintf("delete from users where id = %d", $id);
	//$result = $conn->query($sql);
	//if (!$result) {
	//	die($conn->error);
	//}

	$sql = "delete from users where id = ?";
	$stmt= $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if (!$result) {
		print_r($conn->error);
		header('Location: index.php?errorCode=3');
	}
	// check update or delete some item
	$affect_rows = (int)$conn->affected_rows;
	if ($affect_rows<1) {
		header('Location: index.php?errorCode=3');
		exit();
	}

	echo '刪除成功!';

	// run index.php
	header("Location: index.php");
?>
```

#### 修改 mySQL 資料
``` php
<!-- index.php -->
<?php
	// include file
	require_once('conn.php');

	// 小到大排列
	//$result = $conn->query("SELECT * FROM users ORDER BY id ASC;");
	//if (!$result) {
	//	die($conn->error);
	//}

	$sql = "SELECT * FROM users ORDER BY id ASC";
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die('Error : ' . $conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();

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
	//$sql = sprintf("update users set username='%s' where id=%d",
	//				$username, $id);
	//$result = $conn->query($sql);
	//if (!$result) {
	//	die($conn->error);
	//}
	//
	//if ($conn->affected_rows >=1) {
	//	echo '編輯成功!';
	//}
	//else {
	//	echo '查無資料!';
	//}

	$sql = "update users set username=? where id=?";
	$stmt= $conn->prepare($sql);
	$stmt->bind_param('ss', $username, $id);
	$result = $stmt->execute();
	if (!$result) {
		header('Location: index.php?errorCode=3');
		print_r($conn->error);
		exit();
	}
	// check update or delete some item
	$affect_rows = (int)$conn->affected_rows;
	if ($affect_rows<1) {
		header('Location: index.php?errorCode=3');
		exit();
	}

	// run index.php
	header("Location: index.php");
?>
```

#### [MySQL Prepared Statements](https://www.w3schools.com/php/php_mysql_prepared_statements.asp) (預防 SQL injection)
``` php
	$sql = "select * from users where username= ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $_POST['username']);
	$result = $stmt->execute();
	if (!$result) {
		die($conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();
	
	// $result->num_rows,$conn->affected_rows 都可以
	if ($result->num_rows < 1 ) {
		header('Location: login.php?errorCode=2');
		die("登入失敗");
	} 
```

#### [MySQL join](https://joins.spathon.com/)
``` bash
# INNER JOIN
SELECT users.name, likes.like FROM users JOIN likes ON users.id = likes.user_id;
# LEFT JOIN
SELECT users.name, likes.like FROM users LEFT JOIN likes ON users.id = likes.user_id;
# RIGHT JOIN
SELECT users.name, likes.like FROM users RIGHT JOIN likes ON users.id = likes.user_id;
# OUTER JOIN
SELECT users.name, likes.like FROM users LEFT OUTER JOIN likes ON users.id = likes.user_id
UNION
SELECT users.name, likes.like FROM users RIGHT OUTER JOIN likes ON users.id = likes.user_id
```

``` php
	$sql = 'select C.id, C.content, C.create_at, U.username, U.nickname ' . 
						'from comment as C left join users as U ' .
						'on C.username = U.username ' . 
						'where C.deleted!=1 order by C.id DESC';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die('Error : ' . $conn->error);
	}
	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();
	while ($row = $result->fetch_assoc()) {
		echo 'nickname : ' . $row['nickname'] . ' content : ' . $row['content'] . '<br>'; 
	}
```

#### MySQL limit and offset
``` php
	$sql = 'select C.id, C.content, C.create_at, U.username, U.nickname ' . 
						'from comment as C left join users as U ' .
						'on C.username = U.username ' . 
						'where C.deleted!=1 order by C.id DESC';
	$sql = $sql . ' LIMIT ' . $item_perpage . ' OFFSET ' . ($page-1)*$item_perpage;
```

#### MySQL 檢查欄位是否 NULL 或空白
``` bash
# 欄位 col_name 是 NULL 的紀錄
ELECT * FROM table_name WHERE col_name IS NULL
# 欄位 col_name 不是 NULL 的記錄
SELECT * FROM table_name WHERE col_name IS NOT NULL
#欄位 col_name 是 NULL 或 空字串 的記錄
SELECT * FROM table_name WHERE col_name IS NULL OR col_name = ''
```

### PHP function 

#### simple function
+ exit() - 結束程式


#### 轉換
##### 轉數字
``` php
$page = (int) $_GET['page'];
// intval()而言，如果引數是字串，則返回字串中第一個不是數字的字元之前的數字串所代表的整數值
$int1=intval($string);
```

#####  floor()/ceil()/round()
``` php
// 取整數(無條件進位)
$total_page = ceil($total/$item_perpage) ;
// 捨去取整數
echo floor(1.6); // will output "1" 
echo floor(-1.6); // will output "-2"
// 四捨五入
echo round(3.4); // 3
echo round(3.5); // 4
```

#####  ASCII code 轉換 ord()/chr()
``` php
// 字元轉換為 ASCII 碼
echo '將字符 # 轉換為 ASCII 碼: '.ord('#').'<br>'; // 35
echo '將字符 % 轉換為 ASCII 碼: '.ord('%').'<br>'; // 37
// ASCII 碼轉換為字元
$str1 = '66';
echo '由 ASCII 碼 66 轉換回英文字母 B 的結果: '.chr($str1).'<br>'; // 66
```


#### [date()](https://www.php.net/manual/en/function.date.php)
``` php
<?php
$today = date("F j, Y, g:i a");                 // March 10, 2001, 5:16 pm
$today = date("m.d.y");                         // 03.10.01
$today = date("j, n, Y");                       // 10, 3, 2001
$today = date("Ymd");                           // 20010310
$today = date('h-i-s, j-m-y, it is w Day');     // 05-16-18, 10-03-01, 1631 1618 6 Satpm01
$today = date('\i\t \i\s \t\h\e jS \d\a\y.');   // it is the 10th day.
$today = date("D M j G:i:s T Y");               // Sat Mar 10 17:16:18 MST 2001
$today = date('H:m:s \m \i\s\ \m\o\n\t\h');     // 17:03:18 m is month
$today = date("H:i:s");                         // 17:16:18
$today = date("Y-m-d H:i:s");                   // 2001-03-10 17:16:18 (the MySQL DATETIME format)
?>
``` 

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

#### session
``` php
	// 啟用 session
	session_start();

	// 設定 session
	$_SESSION['UserName'] = 'Jordan';

	// 讀取 session
	echo $_SESSION['UserName'];

	// 刪除 session
	unset($_SESSION['變數名稱']);
	session_destroy();
```

#### strpos() - check 是否包含字串,不包含傳回 false
``` php
// check 是否包含字串,不包含傳回 false
	if (strpos($conn->error, 'Duplicate entry') !== false) {
	 	header('Location: register.php?errorCode=2');
}
```

#### die() - 印出後結束程式
```php
if (!$result) {
	die('Error : ' . $conn->error);
}
```

#### rand() - 產生亂數
``` php
<?php
// random(ish) 5 digit int
$random_number = intval( "0" . rand(1,9) . rand(0,9) . rand(0,9) . rand(0,9) . rand(0,9) ); 
// random(ish) 5 character string
$random_string = chr(rand(65,90)) . chr(rand(65,90)) . chr(rand(65,90)) . chr(rand(65,90)) . chr(rand(65,90)); 
?>
```

#### hash() - 雜湊產生
``` php
/*
hash ( string $algo , string $data , bool $binary = false ) : string|false
	algo
		Name of selected hashing algorithm (i.e. "md5", "sha256", "haval160,4", etc..). For a list of supported algorithms see hash_algos().
	data
		Message to be hashed.
	binary
		When set to true, outputs raw binary data. false outputs lowercase hexits.
*/
hash("sha256", 'abce');
```

#### password_hash()/password_verify() - 雜湊密碼產生與驗證
```php
// password_hash ( string $password , mixed $algo , array $options = ? ) : string|false
// PASSWORD_DEFAULT/PASSWORD_BCRYPT/PASSWORD_ARGON2I/PASSWORD_ARGON2ID
echo password_hash("rasmuslerdorf", PASSWORD_DEFAULT);
// password_verify ( string $password , string $hash ) : bool
if (password_verify('rasmuslerdorf', $hash)) {
  echo 'Password is valid!';
}
```

#### htmlentities 和 htmlspecialchars
htmlspecialchars 只轉化一些特殊html程式碼，而 htmlentities 卻會轉化所有的html程式碼，連同裡面的它無法識別的中文字元也給轉化,所以有時會讓中文變成亂碼,所以``最好用 htmlspecialchars``
``` php
/*
htmlspecialchars(string,flags,character-set,double_encode)
flags 規定如何處理引號
	ENT_COMPAT - 預設,僅編碼雙引號。
	ENT_QUOTES - 編碼雙引號和單引號。
	ENT_NOQUOTES - 不編碼任何引號。
*/
<?php
$str = "Bill & 'Steve'";
echo htmlspecialchars($str, ENT_COMPAT); //只轉換雙引號
echo "<br>";
echo htmlspecialchars($str, ENT_QUOTES); //轉換雙引號和單引號
echo "<br>";
echo htmlspecialchars($str, ENT_NOQUOTES); //不轉換任何引號
?>
// htmlentities ( string $string , int $flags = ENT_COMPAT , string|null $encoding = null , bool $double_encode = true ) : string
<?php
$str = "A 'quote' is <b>bold</b>";
echo htmlentities($str); 						 //  A 'quote' is &lt;b&gt;bold&lt;/b&gt;
echo htmlentities($str, ENT_QUOTES); // A &#039;quote&#039; is &lt;b&gt;bold&lt;/b&gt;
?>
```
