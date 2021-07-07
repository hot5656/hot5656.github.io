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

<!--more-->

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

#### CSRF(Cross Site Request Forgery) 跨站請求偽造
+ 現在有些 Framework 都有內建防禦 CSRF 的功能，可以很簡單的開啟
+ 使用者的防禦 : 每次使用完網站就登出，就可以避免掉 CSRF
+ Server 的防禦 : 
	+ 檢查 Referer
	+ 加上圖形驗證碼, 簡訊驗證碼等等
	+ 加上 CSRF token
		在 form 裡面加上一個 hidden 的欄位，叫做csrftoken，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中。
``` html
<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
  <input type="submit" value="刪除文章"/>
</form>
```
+ browser 本身的防禦 : Chrome 51 版的時候正式加入了這個功能：SameSite cookie
``` php 
// 你原本設置 Cookie 的 header 長這樣：
Set-Cookie: session_id=ewfewjf23o1;
// 你只要在後面多加一個 SameSite 就好：
Set-Cookie: session_id=ewfewjf23o1; SameSite
```

``` html
// 假設刪除文章命令如下
<a href='/delete?id=3'>刪除</a>
// 點下去,刪除自己的文章
<a href='https://small-min.blog.com/delete?id=3'>開始測驗</a>
// 打開網頁即刪除文章
<img src='https://small-min.blog.com/delete?id=3' width='0' height='0' />
<a href='/test'>開始測驗</a>
// 若刪除改為 POST
// 點下去,刪除自己的文章
<form action="https://small-min.blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="submit" value="開始測驗"/>
</form>
// 不知情刪除
<iframe style="display:none" name="csrf-frame"></iframe>
<form method='POST' action='https://small-min.blog.com/delete' target="csrf-frame" id="csrf-form">
  <input type='hidden' name='id' value='3'>
  <input type='submit' value='submit'>
</form>
<script>document.getElementById("csrf-form").submit()</script>
// 若刪除改為 json format
<form action="https://small-min.blog.com/delete" method="post" enctype="text/plain">
<input name='{"id":3, "ignore_me":"' value='test"}' type='hidden'>
<input type="submit"
  value="delete!"/>
</form>
```

#### CORS(全名為 Cross-Origin Resource Sharing) 跨來源資源共享
``` php
	header('Access-Control-Allow-Origin: *');
```

#### Offset/limit-based and Cursored-based Pagination
+ offset 在運作的時候需要從頭開始尋訪 (Scan table) 才能知道要取哪一段資料，所以當分頁越後面的時候查詢時間就會越久，在小型資料庫並不會有特別的感覺，但是當資料量非常龐大 (到達幾千萬或是上億時) 時，就能感受到時間明顯的差距
+ 對於大型資料庫做分頁的其中一個替代方案便是 Cursor-based pagination，其能夠有效使用資料庫的 index 進行尋訪，不會對於資料庫造成傷害

### 設計參考
#### PHP Security 注意事項
+ add session
+ password save by hash
+ XSS : print add htmlspecialchars(check echo 有無呼叫 escape function)
+ SQL injection : add prepared statement
+ 權限管理 : 做以下動作前,要再 check user 是否符合
	modify, deleted, show private information 


#### setup XAMPP
+ XAMPP是最流行的PHP開發環境
+ MariaDB是MySQL關聯式資料庫管理系統的一個復刻，由社群開發，有商業支援

##### install [XAMPP](https://www.apachefriends.org/zh_tw/index.html)


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
			 echo '帳號已被註冊!';
		}
		else {
		 	header('Location: register.php?errorCode=3');
			echo '新增錯誤!';
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

#### 刪除 mySQL 資料(soft delete)
``` php
<?php 
	require_once('conn.php');
	require_once('utils.php');
	session_start();

	// if account not valid auto re-direct to index(logout)
	accountValid();
	
	$id = NULL;
	if (!empty($_GET['id'])) {
		$id = $_GET['id'];
	}

	// $sql = "update blog set is_deleted=? where id=?";
	// $stmt = $conn->prepare($sql);
	// // 使用 true, TRUE or 1 都可, 但不能設值要使用變數
	// $true = true;
	// $stmt->bind_param('bs', $true, $id);
	$sql = "update blog set is_deleted=TRUE where id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if(!$result) {
		header('Location: admin.php?id=' . $id . '&errorCode=2');
		die('刪除錯誤!');
	}

	$affect_rows = (int)$conn->affected_rows;
	if ($affect_rows<1) {
		header('Location: admin.php?id=' . $id . '&errorCode=2');
		die('刪除錯誤!');
	}

	echo '刪除完成!';
	header('Location: admin.php')

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

#### login 檢查
``` php
// login_handle.php
<?php
	require_once('conn.php');
	session_start();
	
	if ( empty($_POST['username']) || empty($_POST['password']) ) {
		header('Location: login.php?errorCode=4');
		die("輸入錯誤!");
	}

	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = "select * from users where username=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $username);
	$result = $stmt->execute();
	if (!$result) {
		header('Location: login.php?errorCode=1');
		print_r($conn->error);
		die("資料庫錯誤!");
	}

	// 真正取資料要執行 $stmt->get_result();
	$result = $stmt->get_result();
	if ($result->num_rows < 1) {
		header('Location: login.php?errorCode=2');
		die("查無帳號!");
	}

	$row = $result->fetch_assoc();
	if(!password_verify($password, $row['password'])) {
		header('Location: login.php?errorCode=3');
		die("密碼錯誤!");
	}

	echo "登入成功!";
	// set session
	$_SESSION['username'] = $username;
	header('Location: index.php');
?>
```

+ check login state

``` php
<?php
	session_start();

	$username = NULL;
	if (!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}
?>

<div class="nav-right">
	<?php if($username) { ?>
		<div class="nav-item"><a href="admin.php">管理後台</a></div>
		<div class="nav-item"><a href="logout_handle.php">登出</a></div>
	<?php } else { ?>
		<div class="nav-item"><a href="login.php">登入</a></div>
	<?php } ?>
</div>
```

#### PHP MySQL Get Last Inserted ID
``` php
$id = $conn->insert_id;
```

### PHP 語法
#### 變數
##### array
+ array 設定
``` php
$array = array(1, 1, 1, 1,  1, 8 => 1,  4 => 1, 19, 3 => 13);
$firstquarter = array(1 => 'January', 'February', 'March');
$foo = array('bar' => 'baz');
echo "Hello {$foo['bar']}!"; // Hello baz!
```
+ 設空 array - $levelArr = []  or levelArr = array();
+ push array - array_push($levelArr, $row );
``` php 
function getManageLevels() {
	global $conn;
	$levelArr = [];
	
	$sql = 'select * from user_levels order by user_level';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if ($result) {
		// 真正取資料要執行 $stmt->get_result();
		$result = $stmt->get_result();

		while($row = $result->fetch_assoc()) {
			array_push($levelArr, $row );
		}
	}
	return $levelArr;
}
// show array
$levelArr = getManageLevels();
$length = count($levelArr);
for ($i=0 ; $i < $length ; $i++) {
	echo $levelArr[$i]['id'] . ' ' ;
	echo $levelArr[$i]['user_level'] . ' ' ;
	echo $levelArr[$i]['level_describe'] . ' ' ;
	echo $levelArr[$i]['all_modify'] . ' ' ;
	echo $levelArr[$i]['all_delete'] . ' ' ;
	echo $levelArr[$i]['self_create'] . ' ' ;
	echo $levelArr[$i]['self_modify'] . ' ' ;
	echo $levelArr[$i]['self_delete'] . ' ' ;
	echo ' <br>';
}
```

##### object
```
// object 設定
$manageState = [
	'user_admin' => 0,
	'all_modify' => 0,
	'all_delete' => 0,
	'self_create' => 0,
	'self_modify' => 0,
	'self_delete' => 0,
];
```

##### [$_SERVER](https://www.php.net/manual/zh/reserved.variables.server.php) PHP預定義的超全局變量

+ $_SERVER["SCRIPT_NAME"] 		- /index.php		
	當前腳本路徑
+ $_SERVER["REQUEST_URI"] 		- /index.php?id=1	
	訪問頁面URI，包含查詢字符串
+ $_SERVER["QUERY_STRING"] 		- id=1				
	查詢字符串，不存在為" "
+ $_SERVER["REQUEST_METHOD"] 	- GET				
	請求方法，如"POST"、"PUT"等
+ $_SERVER["SERVER_PROTOCOL"] - HTTP/1.1			
	通信協議的名稱和版本
+ $_SERVER["GATEWAY_INTERFACE"] - CGI/1.1			
	服務器使用的CGI 規範的版本
+ $_SERVER["REMOTE_PORT"] 		- 60599				
	用戶連接服務器使用的端口
+ $_SERVER["SCRIPT_FILENAME"] - E:/WWW/example/index.php	
	當前腳本的絕對路徑
+ $_SERVER["DOCUMENT_ROOT"] 	- E:/WWW/example/			
	當前腳本文檔根目錄的絕對路徑
+ $_SERVER["REMOTE_ADDR"] 		- 127.0.0.1					
	用戶的IP地址
+ $_SERVER["SERVER_PORT"] 		- 80						
	服務器使用的端口
+ $_SERVER["SERVER_ADDR"] 		- 127.0.0.1					
	服務器的IP地址
+ $_SERVER["SERVER_NAME"] 		- www.example.com			
	服務器的主機名，注：如果腳本運行於虛擬主機中，該名稱是由那個虛擬主機所設置的值決定。在Apache 2裡，必須設置UseCanonicalName = On和ServerName。否則該值會由客戶端提供，就有可能被偽造。上下文有安全性要求的環境裡，不應該依賴此值。
+ $_SERVER["SERVER_SOFTWARE"] 	- Apache/2.4.23 (Win32) OpenSSL/1.0.2j mod_fcgid/2.3.9	
	響應頭中Server的內容
+ $_SERVER["SERVER_SIGNATURE"] 	- 							
	包含了服務器版本和虛擬主機名的字符串
+ $_SERVER["HTTP_HOST"] 			- www.example.com			
	請求頭中Host項的內容
+ $_SERVER["HTTP_CONNECTION"] 	- keep-alive				
	請求頭中Connection項的內容
+ $_SERVER["HTTP_PRAGMA"] 		- no-cache					
	請求頭中Pragma項的內容
+ $_SERVER["HTTP_CACHE_CONTROL"] 	- no-cache					
	請求頭中Cache-Control項的內容
+ $_SERVER["HTTP_UPGRADE_INSECURE_REQUESTS"] 	} |1			
	請求頭中Upgrade-Insecure-Requests項的內容
+ $_SERVER["HTTP_USER_AGENT"] 	- Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36	
	請求頭中User-Agent項的內容
+ $_SERVER["HTTP_ACCEPT"] 		- text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng, / ;q=0.		
	請求頭中Accept項的內容
+ $_SERVER["HTTP_ACCEPT_ENCODING"] - gzip, deflate			
	請求頭中Accept-Encoding項的內容
+ $_SERVER["HTTP_ACCEPT_LANGUAGE"] - zh-CN,zh;q=0.8			
	請求頭中Accept-Language項的內容
+ $_SERVER["PHP_SELF"] 				- /index.php			
	當前執行腳本的文件名
+ $_SERVER["REQUEST_TIME_FLOAT"]		- 1510112348.8084		
	請求開始的時間戳，微秒級別精準度
+ $_SERVER["REQUEST_TIME"] 			- 1510112348			
	請求開始的時間戳
+ $_SERVER['HTTP_REFERER'] - localhost/robert/comment/register.php
	前一頁面的URL 地址

``` php
// 前頁 uri
$uri = $_SERVER['REQUEST_URI'];
// 前一頁面的URL 地址
$page = $_SERVER['HTTP_REFERER'];
```

### Snippet for PHP
#### error code 處理
``` php
<?php 
	if (!empty($_GET['errorCode'])) {
		$msg = '';
		switch ($_GET['errorCode']) {
			case 1 :
				$msg = '資料庫錯誤!';
				break;
			case 2 :
				$msg = '查無帳號!';
				break;
			case 3 :
				$msg = '密碼錯誤!';
				break;
			case 4 :
				$msg = '輸入錯誤!';
				break;
			default :
				$msg = '未知錯誤!';
				break;
		}
		echo '<div class="warning">' . $msg . '</div>';
	}
?>
```

####  下拉式選單 - &lt;select&gt;, &lt;option&gt;
``` php
<select name="level">
	<?php 
		for ($i=0 ; $i < $length ; $i++) { 
			$describe = $levelArr[$i]['level_describe'] ;
			$level =  $levelArr[$i]['user_level'] ;
			$selectStr = '';
			if ($row['user_level'] == $level) {
				$selectStr = 'selected' ;
			}
			echo '<option value="'. $level . '" ' . $selectStr .' >' . $describe . '</option>';
		}
	?>
</select>
```

####  分頁
``` php
<?php 
	// init page
	$page = 1;
	$total_page = 1;

	$sql = 'select * from blog where deleted=0 or deleted is NULL '
	. 'order by id asc';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if ($result) {
		$result = $stmt->get_result();
		
		// page control 
		$item_perpage = 5 ;
		$total = $result->num_rows ;
		if (empty($_GET['page'])) {
			$page = 1;
		}
		else {
			$page = (int) $_GET['page'];
		}
		$total_page = ceil($total/$item_perpage) ;

		$sql = $sql . ' LIMIT ' . $item_perpage . ' OFFSET ' . ($page-1)*$item_perpage;
		$stmt = $conn->prepare($sql);
		$result = $stmt->execute();
		if (!$result) {
			die('Error : ' . $conn->error);
		}
		// 真正取資料要執行 $stmt->get_result();
		$result = $stmt->get_result();
	}
?>

	<div class="page">
		<?php
			echo '頁數 : ' . $page . ' / '  . $total_page;
		?>
	</div>
	<div class="page-control">
		<?php 
			if ($page > 1) {
				echo '<a href="list.php?page=1">首頁</a>' ;
				echo '<a href="list.php?page=' . strval($page-1) . '">上一頁</a>' ;
			}
			if ($page < $total_page) {
				echo '<a href="list.php?page=' . strval($page+1) . '">下一頁</a>' ;
				echo '<a href="list.php?page=' . $total_page . '">最後一頁</a>' ;
			}
		?>
	</div>
```

``` css
.page {
	text-align: center;
}

.page-control {
	display: flex;
	justify-content: center;
	margin-top: 10px; 
}

.page-control a {
	display: inline-block;
	border: 1px solid #D1DEEB;
	padding: 7px 20px 5px;
	border-radius: 6px;
	cursor: pointer;
	text-decoration: none;
	color: #000;
	margin: 0 5px ;
}
```

#### utils 
##### check accountValid
``` php
<?php
	require_once('conn.php');

	// if account not valid auto re-direct to index(logout)
	function accountValid() {
		global $conn ;
		$isValid =  false;

		$username = NULL;
		if (!empty($_SESSION['username'])) {
			$username = $_SESSION['username'];
		}

		$sql = "select * from users where username=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('s', $username);
		$result = $stmt->execute();
		if ($result) {
			$result = $stmt->get_result();
			if ($result->num_rows > 0) {
				$isValid =  true;
			}
		}
		
		if (!$isValid) {
			Header("location: logout_handle.php");
			exit();
		}
	} 
?>
```

##### 設定 HTML 跳脫字元 - check echo 有無呼叫
``` php
	// 設定 HTML 跳脫字元
	// check echo 有無呼叫
	function escape($str) {
		return htmlspecialchars($str, ENT_QUOTES);
	}
```

#### 回傳 json
``` php
	header('Content-Type: application/json; charset=utf-8');

	$comments = array();
	......

	$json = array(
		"comment" => $comments
	);

	$response = json_encode($json);
	echo $response;

	// response error
	if( (empty($_POST['content'])) ||
			(empty($_POST['username']))
		) {
			$json = array(
				"ok" => false,
				"message" => "Please input data!"
			);
	
			$response = json_encode($json);
			echo $response;
			exit();
		}
```

#### html + php 回傳 json
``` html
<!-- index_api.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>留言板</title>
	<link rel="stylesheet" href="reset.css">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div class="wrap ">
		<header class="warning">
			注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
		</header>
		<main class="board">
			<div class="hi">
				Hi, aa!
			</div>
			<form class="input-form" action="">
				<textarea class="input-content" name="content" rows="5"></textarea>
				<input class="input-submit" type="submit">
			</form>
			<div class="hr"></div>
			<section>
			</section>
		</main>
	</div>

	<script>
		function ajaxGetApi(url, respProcess) {
			const request = new XMLHttpRequest()
			// loaded function
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// process by callback function
					respProcess(request.responseText)
				}
				else {
					console.log('response :', request)
					console.log('response error :', request.status)
				}
			}
			
			// error 
			request.onerror = function() {
				console.log('error')
			}
			
			// true 表非同步
			request.open('GET', url, true)
			request.send()
		}

		function ajaxPOSTjsonApi(url, postObj, respProcess) {
			const request = new XMLHttpRequest()
			// loaded function
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// process by callback function
					respProcess(request.responseText)
				}
				else {
					console.log('response :', request)
					console.log('response error :', request.status)
				}
			}
			
			// error 
			request.onerror = function() {
				console.log('error')
			}
			
			// true 表非同步
			request.open('POST', url, true)
			// POST 需要 header
			request.setRequestHeader('Content-Type',  'application/x-www-form-urlencoded;charset=UTF-8');
			// encodeURIComponent() 可讓 1&2&3 亦可輸入正常 
			request.send(`username=${postObj.username}&content=${encodeURIComponent(postObj.content)}`)
		}

		// JavaScript escape HTML function()
		function escapeHTML(s) { 
    return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
		}

		ajaxGetApi('http://localhost/robert/comment/api_get_comment.php', function(response){
			const comments = JSON.parse(response)
			let section = document.querySelector('section')
			for(let i=0 ; i < comments.comment.length ; i++ ) {
				let card = document.createElement('div')
				card.classList.add('card')
				card.innerHTML = `
					<div class="card-avatar"></div>
					<div class="card-info">
						<div class="card-title"> 
							<span class="card-user">${comments.comment[i].nickname}</span>
							<span class="card-time">${comments.comment[i].create_at}</span>
						<div class="card-content">
							${escapeHTML(comments.comment[i].content)}
						</div>
					</div>
				`
				section.appendChild(card)
			}
		})

		// submit 
		const form = document.querySelector('form')
		form.addEventListener('submit', function(e){
			let comment = {
				username : 'aa',
				content : ''
			}
			e.preventDefault()
			comment.content = document.querySelector('.input-content').value

			ajaxPOSTjsonApi('http://localhost/robert/comment/api_add_comment.php', comment, function(response){
				const resp = JSON.parse(response)
				if (resp.ok) {
					// JavaScript reload 
					location.reload();
				}
				else {
					alert(resp.message);
				}
			})
		})
	</script>
</body>
</html>
```

``` php
<?php 
	// api_get_comment.php
	require_once('conn.php');
	header('Content-Type: application/json; charset=utf-8');

	$sql = 'select C.id, C.content, C.create_at, U.username, U.nickname ' .
					'from comment as C left join users as U ' .
					'on C.username = U.username ' . 
					'where C.deleted=0 or C.deleted is NULL order by C.id DESC';
	$stmt = $conn->prepare($sql);
	$result = $stmt->execute();
	if (!$result) {
		die("查詢錯誤!");
	}

	$result = $stmt->get_result();
	$comments = array();
	while($row = $result->fetch_assoc()) {
		array_push($comments, $row);
	}

	$json = array(
		"comment" => $comments
	);

	$response = json_encode($json);
	echo $response;
?>
```

``` php
<?php
	// api_add_comment.php
	require_once('conn.php');
	header('Content-Type: application/json; charset=utf-8');

	if( (empty($_POST['content'])) ||
			(empty($_POST['username']))
		) {
			$json = array(
				"ok" => false,
				"message" => "Please input data!"
			);
	
			$response = json_encode($json);
			echo $response;
			exit();
		}
	
	$username = $_POST['username'] ;
	$content =  $_POST['content'] ;

	$sql = "insert into comment(username, content) value(?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $username, $content);
	$result = $stmt->execute();
	if (!$result) {
		$json = array(
			"ok" => false,
			"message" => $conn->error
		);	
	
		$response = json_encode($json);
		echo $response;
		exit();
	}

	$json = array(
		"ok" => true,
		"message" => "Success"
	);	
	$response = json_encode($json);
	echo $
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

#### string

##### strpos() - check 是否包含字串,不包含傳回 false
``` php
// check 是否包含字串,不包含傳回 false
	if (strpos($conn->error, 'Duplicate entry') !== false) {
	 	header('Location: register.php?errorCode=2');
}
```

##### substr()/mb_substr() - 擷取字串
``` php
// 擷取字串 
echo substr($row['content'], 0, 200);
// 擷取字串-中文字不被切斷
echo mb_substr($row['content'], 0, 200, 'utf-8');
```


#### [date()](https://www.php.net/manual/en/function.date.php)
``` php
<?php
// 設定時區
date_default_timezone_set("Asia/Taipei");

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

####  require()/require_once() and include()/include_once()
+ require 通常放在 PHP 程式的最前面，PHP 程式在執行前，就會先讀入 require 所指定引入的檔案，使它變成 PHP 程式網頁的一部份。常用的函式，亦可以這個方法將它引入網頁中。引入是無條件的，發生在程式執行前，不管條件是否成立都要導入（可能不執行）
+ include 一般是放在流程控制的處理區段中。PHP 程式網頁在讀到 include 的檔案時，才將它讀進來。這種方式，可以把程式執行時的流程簡單化。可以是有條件的，發生在程式執行時，只有條件成立時才導入（可以簡化編譯生成的代碼）。
+ require_once()/include_once() 會檢查檔案是否已匯入,若已匯入則不重覆匯入

``` php
require_once('conn.php');
include_once('header.php');
```

### echo , print_r() and var var_dump()
+ echo  用於輸出數值變數或者是字串
```php
// 雙引號可加變數
$user = 'Robert';
echo "Hello $user!<br>"	;  // Hello Robert!
```
+ print_r() 用於輸出一個陣列
+ var_dump() 用於輸出<變數型別，變數值，變數長度>,可以是各種變數型別

