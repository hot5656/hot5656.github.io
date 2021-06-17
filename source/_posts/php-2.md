---
title: PHP tricky
abbrlink: f5c0
date: 2021-06-17 11:26:33
categories: Back End
tags:
  - php
	- tricky
---

### header() 不加 exit() or die() 會往下執行

<!--more-->

``` php
<?php
	session_start();
	require_once('conn.php');
	require_once('utils.php');

	if (empty($_POST['content']) || empty($_POST['id'])) {
		$nickname = $_POST['nickname'] ;
		$id = $_POST['id'];
		header("Location: update_content.php?errorCode=1&nickname=$nickname&id=$id");
		// 不加會往下執行
		// die("輸入不齊全!");
	}
	
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

	echo "編輯完成";
	header('Location: index.php');
?>
```
