---
title: CSS tricky
abbrlink: 10f2
date: 2021-05-23 15:04:44
categories: Front End
tags:
	- css
	- tricky
---


 [Demo](/ref/css-5)

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
#### Custom Checkbox by image
``` html
		<style>
			.x-toggle:hover {
				cursor: pointer;
			}

			.x-toggle input[type="radio"],
			.x-toggle input[type="checkbox"] {
				position: absolute;
				opacity: 0;
				z-index: -1;
			}

			.x-toggle input[type="radio"]+.x-toggle-label-text,
			.x-toggle input[type="checkbox"]+.x-toggle-label-text {
				background-repeat: no-repeat;
				background-position: 0px 3px;
				padding-left: 18px;
			}

			.x-toggle input[type="checkbox"]+.x-toggle-label-text {
				background-image: url("images/icons-check14-deactive.png")
			}

			.x-toggle input[type="radio"]+.x-toggle-label-text {
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAP9JREFUOE+NUiEShDAMrEQikUgkEolEIpGVlZU4nsATkEgkT0DyBCQSicx1Q9vj5mBgZ0pKu5ukSQSdIISQSZLA/qwoiqhpGtq2zTINFx8c5HnuiWEY8j9WHMf+HE6XZfkKnQiejZV8c8I4jpSmKXPgCIFE27Ze5LxdYd93yrKMuVprEi6VYRgs5R7zPDM3CALYI/xbFEXBYhZWVWWPn2H42gul/KvHLQxfeSEe/RZKKYhI2Ifyw5+AytqWkeDSmg16+YS6rpnLPV3X1XtBxc5j5YBIToQMp2k6JgdpYsxwAYtidV1Hfd9zs51jiDBFgB9yTE1Zlky4WkgPkQ4QfQB7iCVGTQWY/wAAAABJRU5ErkJggg==);
			}

			.x-toggle input[type="radio"]:disabled+.x-toggle-label-text,
			.x-toggle input[type="checkbox"]:disabled+.x-toggle-label-text {
				opacity: 0.4;
			}

			.x-toggle input[type="checkbox"]:checked+.x-toggle-label-text {
				background-image: url("images/icons-check14-active.png")
			}

			.x-toggle input[type="radio"]:checked+.x-toggle-label-text {
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAQpJREFUOE99Ui3WhUAIJRqNRqPRaDQajUaj0WhzCS7BaDS6BKNLMBqNRr65zDBP3893z0Ec4AIzQHwDEdVJkkA/JIoi7vuez/N0kSYWHxjyPPeBYRjKGRLHsbcj6b7vL6KSkNnoWjw3LMvCaZpKDBKhEA3D4Ema7RsQo9K2LZO2Ms+zC/mEErZtEx0EAbQt/wtKUhRFoTbiqqqc+Yl3EmDOrbMT1/XHe3wlAcbWOB9xlmXObOEc7vRE0zTW7y4qFwf+I13XpSNjkqc1P/cF+IWu68QvMz2O45XFyH2tFKikJHS4rqvdHLSJNYMDGo81jiNP0yTD1sQgYYsA3xe2pixLX/ld0B4qWTD/ATdO9vxiXE8EAAAAAElFTkSuQmCC);
			}
		</style>

		<div class="line">
			<label class="x-toggle">
				<input type="radio" name="y-n" value="y" checked>
				<span class="x-toggle-label-text">Yes</span>
			</label>
			<label class="x-toggle">
				<input type="radio" name="y-n" value="n">
				<span class="x-toggle-label-text">No</span>
			</label>
		</div>

		<div class="line">
			<label class="x-toggle">
				<input type="checkbox" checked>
				<span class="x-toggle-label-text">One</span>
			</label>
		</div>

		<div class="line">
			<label class="x-toggle">
				<input type="checkbox">
				<span class="x-toggle-label-text">Two</span>
			</label>
		</div>
```

#### Custom Checkbox(simple) #1
``` html
		<style>
			/* mask 原來 checkbox*/
			input[type=checkbox].custom-check {
				display: none;
			}

			/* set label for toggle checkbox + */
			input[type=checkbox].custom-check+label {
				/* set for toggle  */
				padding: 0;
				cursor: pointer;
				/* set position + offset */
				display: inline-block;
				padding-left: 26px;
				user-select: none;
				position: relative;
			}

			/* set checkbox 外框 */
			input[type=checkbox].custom-check+label::before {
				content: "";
				position: absolute;
				top: 4px;
				left: 2px;
				height: 15px;
				width: 15px;
				/* border: 1px solid #000; */
				background-color: #eee;
			}

			/* set checkbox checked */
			input[type=checkbox].custom-check:checked+label::after {
				content: "";
				position: absolute;
				left: 6px;
				top: 5px;

				/* 設定打勾符號 */
				width: 8px;
				height: 12px;
				border: solid #000;
				border-width: 0 3px 3px 0;
				transform: rotate(45deg);
				z-index: 10;
			}
		</style>

		<input id="check1"class="custom-check" type="checkbox" checked>
		<label for="check1">One</label>
		<br>
		<br>
		<input id="check2"class="custom-check" type="checkbox" checked>
		<label for="check2">Two</label>
```

#### Custom Checkbox #2
``` html
		<style>
			/* Hide the boxes */
			[type="checkbox"] {
				position: absolute;
				left: 0;
				opacity: 0;
			}

			/* label position */
			[type="checkbox"]+label {
				position: relative;
				padding-left: 2.3em;
				font-size: 1.05em;
				line-height: 1.7;
				cursor: pointer;
			}

			/* checkbox outline */
			[type="checkbox"]+label:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 1.4em;
				height: 1.4em;
				border: 1px solid #aaa;
				background: #FFF;
				/* background: #F00; */
				border-radius: .2em;
				box-shadow: inset 0 1px 3px rgba(0, 0, 0, .1), 0 0 0 rgba(203, 34, 237, .2);
				transition: all .275s;
			}

			/* checked mark aspect */
			[type="checkbox"]+label:after {
				content: '✕';
				position: absolute;
				top: .525em;
				left: .18em;
				font-size: 1.375em;
				color: #CB22ED;
				line-height: 0;
				/* change checked transition */
				transition: all .2s;
			}

			/* checked mark aspect changes */
			[type="checkbox"]:not(:checked)+label:after {
				opacity: 0;
				/* change checked transform */
				transform: scale(0) rotate(45deg);
			}

			[type="checkbox"]:checked+label:after {
				opacity: 1;
				/* change checked transform */
				transform: scale(1) rotate(0);
			}

			/* Disabled checkbox */
			[type="checkbox"]:disabled+label:before {
				box-shadow: none;
				border-color: #bbb;
				background-color: #e9e9e9;
			}

			[type="checkbox"]:disabled:checked+label:after {
				color: #777;
			}

			[type="checkbox"]:disabled+label {
				color: #aaa;
			}

			/* focus add shadow */
			/* [type="checkbox"]:focus + label:before {
    		box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 6px rgba(203, 34, 237, .2);
  		} */
		</style>

		<div class="line">
			<input type="checkbox" id="test1" />
			<label for="test1">Red</label>
		</div>

		<div class="line">
			<input type="checkbox" id="test2" checked="checked" />
			<label for="test2">Yellow</label>
		</div>

		<div class="line">
			<input type="checkbox" id="test3" checked="checked" disabled="disabled" />
			<label for="test3">Green</label>
		</div>

		<div>
			<input type="checkbox" id="test4" disabled="disabled" />
			<label for="test4">Brown</label>
		</div>
```

#### [Custom Checkbox #3](https://www.w3schools.com/howto/howto_css_custom_checkbox.asp)
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

### 參考資料
+ [Using images for checkboxes](https://gist.github.com/wrumsby/5523011)
+ [The Checkbox Hack](https://css-tricks.com/the-checkbox-hack/)
+ [CSS Checkbox Generator](http://www.csscheckbox.com/)