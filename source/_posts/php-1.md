---
title: PHP 說明
categories: Back End
tags:
  - php
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

### PHP function 

#### [date()](https://www.php.net/manual/en/function.date.php)
