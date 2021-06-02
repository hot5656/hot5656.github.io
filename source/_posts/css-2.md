---
title: CSS Issue
abbrlink: d2b3
date: 2021-05-19 16:01:11
categories: Front End
tags:
	- css
	- issue
---

## Flex
### Flex - align-items/align-content stretch 無作用
如果子容器或是元件，在有設定高度（height）的情況下，這個 stretch 會被忽略，自動變成 flex-start(align-items/)/normal(align-content)

<!--more-->

### 直接擺 image, flex 無效,加上 div 可縮小但不能放大,加上 min-width: 0 可放大也可縮小(不用加 div)
``` html
<style>
	img {
		/* 防止img解析度變差 */
		max-width: 100%;
		height: auto;
		/* 修正放於div底部會有空白 */
		display: block;
	}

	.menu-list {
		display: flex;
	}

	img {
		min-width: 0;
		flex-shrink: 1;
		flex-grow: 1;
	}
</style>

<body>
	<div class="menu-list">
		<div>
			<img src="./img/f-001.png" alt="">
		</div>
		<div>
			<img src="./img/f-002.png" alt="">
		</div>
		<div>
			<img src="./img/f-003.png" alt="">
		</div>
		<div>
			<img src="./img/f-004.png" alt="">
		</div>
	</div>
	<div class="menu-list">
		<img src="./img/f-001.png" alt="">
		<img src="./img/f-002.png" alt="">
		<img src="./img/f-003.png" alt="">
		<img src="./img/f-004.png" alt="">
	</div>
</body>
```
<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>

## Other
### display: inline-block 設定 margin=0 還是會有間格
換行或space造成,可移除換行,間隔或加入 common
``` html
<style>
	.debug *, .debug {
		outline: 1px solid gold;
	}

	.box {
		display: inline-block;
		margin:0;
		width: 100px;
		height: 50px
	}

</style>

<body>
	<div class="debug">
		<div class="box">111</div><div class="box">222</div>
		<div class="box">333</div><!-- common remove inline-block space 
 --><div class="box">444</div>
		<div class="box">555</div>
	</div>
</body>
```

### inline-block 元件, 再插入含文字的元件會造成跑版
應是文字會對齊最後一個 baseline
``` html
<style>
	.debug *, .debug {
		outline: 1px solid gold
	}

	html {
		font-size: 12px;
	}

	html, body, h1 ,h2 ,h3 ,h4 ,h5 ,h6 ,p {
		padding: 0;
		margin: 0;
	}

	.debug {
		margin: 10px;
	}

	.box {
		display: inline-block;
		/* margin:0; */
		width: 100px;
		height: 50px;
		background: gray;
	}
	h1 {
		background: yellow;
		height: auto;
	}
	p {
		background: red;
		height: auto;
	}
</style>

<body>
	<div class="debug">
		<div class="box">111</div>
		<div class="box">222</div>
		<div class="box">333</div>
		<div class="box">
			51
			<h1>555</h1>
			<p>555-p</p>
		</div>
		<div class="box">444</div>
	</div>
</body>
```
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### button , 設定 display: block,寬度還是不能佔整行
要設定 width: 100% 才能佔整行
``` css
button {
	display: block;
	/* 設完才能佔整行 */
	width: 100%;
}
```

### 設定 margin: 0 auto; 不能置中
要設定 display block
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.box {
			width: 500px;
			padding: 20px;
			border: 1px solid #000;
		}
		.kick {
			/* 設定才能置中 */
			/* display: block; */
			background: #E62A45;
			color: #fff;
			width: 200px;
			border-radius: 8px;
			outline: none;
			border: none;
			margin: 0 auto;
		}
	</style>
</head>
<body>
	<div class="box">
		<button class="kick">我要抽獎</button>
	</div>
</body>
</html>
```
