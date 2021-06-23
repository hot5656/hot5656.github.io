---
title: CSS tricky
abbrlink: 10f2
date: 2021-05-23 15:04:44
categories: Front End
tags:
	- css
	- tricky
---

### tag a 連非中間文字都可選
``` css 
/* set inline-block 加 padding */
a	{
	display: inline-block;
	padding: 12px 20px;
	color: black;
	text-decoration: none;
}
```

<!--more-->

### 圖片加一層顏色,使亮度變小上層文字明顯
``` html
<style>
	.banner	{
		// 加底色
		position: relative;
		background: url(../img/2.png);
		background-size: cover;
		height: 450px;
		display: flex;
		justify-content: center;
		align-items: center;
		h1 {
			// 加底色, 同時設 z-index: 2 文字才能提到上層
			position: relative;
			z-index: 2;
			color: #fff;
		}

		// 加底色
		&::after {
			position: absolute;
			content: "";
			top: 0;
			left:0;
			right:0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.4);
		}
	}
</style>

<div class="banner">
	<h1>蘋果咬一口</h1>
</div>
``` 

### 圖片加一層顏色,使亮度變小上層文字明顯 - 使用 filter
``` css
.games .item {
	filter: brightness(0.8)
}

.games .item:hover {
	filter: brightness(1)
}
```

### 使用 translate() 將元件移至 正中間
``` html
<style>
	/* 放至正中間 */
	.box2 {
		position: absolute;
		width: 200px;
		height:100px;
		border-radius: 30px;
		text-align: center;
		line-height: 100px;
		background: pink;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%)
	}	
</style>

<body>
	<div class="box2">
		Box2
	</div>
</body>
```

### backgroung 使用 url(),若 cover 放在同一行,cover 前一定要加 position 和 斜線
``` css
.banner	{
	/* background: url(../img/2.png); */
	/* background-size: cover; */
	background: url(../img/2.png) center/cover no-repeat;
}
```

### position: relative/absolute, top(bottom) left(right)使用百分比
+ 在相對定位中使用百分比時，參照的是最近一層父元素的高度與寬度
+ 在絕對定位中使用百分比時，參照的是最近一層父元素的高度與寬度，但父元素不能是static定位；若父元素是static定位，則會一直往上一級查詢，直至查詢到整個網頁的根元素html。

### ul+li(flex) 排列 image
**因前面加了 max-width: 100%; img 一定要加 width: 100%; 不然不能放大**
``` css
img {
	/* 防止img解析度變差 */
	max-width: 100%;
	height: auto;
	/* 修正放於div底部會有空白 */
	display: block;
}

.menu-list {
	ul {
		display: flex;
		li {
			flex-grow: 1;
			img {
				width: 100%;
			}
		}
	}
}
```

``` html
<div class="menu-list">
	<ul>
		<li>
			<img src="./img/f-001.png" alt="">
		</li>
		<li>
			<img src="./img/f-002.png" alt="">
		</li>
		<li>
			<img src="./img/f-003.png" alt="">
		</li>
		<li>
			<img src="./img/f-004.png" alt="">
		</li>
	</ul>
</div>
```

### tag label 包住 tag input 可選擇字就選到 input(label 的 for 要拿掉)
``` html
<form action="">
	<div>
		<label>
			<input type="checkbox" name="en">英文
		</label>
	</div>
	<div>
		<label>
			<input type="checkbox" name="num">數字
		</label>
	</div>
	<div>
		<label>
			<input type="checkbox" name="sp">特殊符號
		</label>
	</div>
	<input class="gen-btn" type="submit" value="產生">
</form>
```

### 設定占滿整個畫面高度,以免畫面底端留有空白 
``` css
.mini-page {
  min-height: calc(100vh - 424px);
}
```

### input
#### [Custom Checkbox](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
``` html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.debug *,	.debug {
			outline: 1px solid gold
		}

		/* The container */
		.container {
			/* 設定外框 block, size, font-size ... */
			display: block;
			position: relative;
			padding-left: 35px;
			margin-bottom: 12px;
			cursor: pointer;
			font-size: 22px;
			user-select: none;
		}

		/* Hide the browser's default checkbox */
		.container input {
			/* input 設定長寬為 0,透明 */
			position: absolute;
			opacity: 0;
			height: 0px;
			width: 0px;
		}

		/* Create a custom checkbox */
		.checkmark {
			/* 設定新 checkbox mark */
			position: absolute;
			top: 4px;
			left: 0;
			height: 15px;
			width: 15px;
			border: 1px solid #000;
			/* background-color: #eee; */
		}

		/* On mouse-over, add a grey background color */
		.container:hover input~.checkmark {
			/* 上層 hover, 背景改變 */
			background-color: #ccc;
		}

		/* When the checkbox is checked, add a blue background */
		.container input:checked~.checkmark {
			/* checked 背景改變 */
			/* background-color: #2196F3; */
		}

		/* Show the checkmark when checked */
		.container input:checked~.checkmark:after {
			/* 若 checked 顯示符號 */
			display: block;
		}

		/* Style the checkmark/indicator */
		.container .checkmark:after {
			content: "";
			position: absolute;
			display: none;
			/* 設定符號位置 */
			left: 4px;
			top: 2px;
			/* 設定打勾符號 */
			width: 5px;
			height: 10px;
			border: solid #000;
			border-width: 0 3px 3px 0;
			transform: rotate(45deg);
		}
	</style>
</head>
<body>
	<label class="container">One
		<!-- checked="checked" 設定 checked -->
		<input type="checkbox" checked="checked">
		<span class="checkmark"></span>
	</label>
	<label class="container">Two
		<input type="checkbox">
		<span class="checkmark"></span>
	</label>
</body>
</html>
```

#### Checkbox checked
``` html
<input class="input" type="checkbox" checked="checked">
``` 

#### trigger by enter
``` js
document.querySelector('.job-add input')
	.addEventListener('keyup', function(e){
		if (e.keyCode == 13) {
			...
		}
	})
``` 
