---
title: CSS tricky
abbrlink: 10f2
date: 2021-05-23 15:04:44
categories: Front End
tags:
	- css
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
