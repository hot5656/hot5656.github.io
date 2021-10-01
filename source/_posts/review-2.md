---
title: CSS Review
abbrlink: f7d6
date: 2021-09-23 16:26:17
categories: Front End
tags:
	- css
	- review
---


### CSS Box model
Box model 規範 HTML 每個元素(element)的基本設計規範
Box model 包含 content, padding, border and margin
+ content : 放文字或圖像的地方
+ border : 為 element 的邊框
+ padding : content 與 border 間的區域
+ margin : element 與鄰近 element 的距離

<!--more-->

### CSS sprite
將多個小圖合併成一張大圖,以節省圖檔load的時間

### CSS preprocessor(預處理器)
+ CSS preprocessor 可以使用自訂的語法,經過 compile 產生 CSS
+ CSS preprocessor 可提供一些 CSS 未支援的功能,如 變數, 巢狀 selector,使得CSS可讀性較高,也較易維護
+ 常見的 CSS preprocessor 有 Sass/SCSS, Less

### CSS specificity(權重)
+ 權重就是指 css 的優先權,相同權重為後令押前令,以最後設定為其設定值
+ 權重大小 inline style > ID > Class > Element > *
+ !important 可蓋過所有的權重
+ 另外還有 psuedo-class(偽類) => :nth-child(),:link, :hover, :focus 及 attribute（屬性選擇器）= [type:checkbox],,[attr] 都相當於 class

### Pseudo-classes(偽類) and pseudo-elements(偽元素)
+ 偽類是應用於一個元素處於特定的狀態,如 :link,:hover
+ 偽元素的作用就像您在標記中添加了一個全新的 HTML 元素, 如 ::before , ::after

### 什麼是 !important
!important 擁有 CSS 最高的權重,可壓過 CSS 前面所有的設定


###  visibility: hidden 和 display: none 的差別
+ visibility: hidden 隱藏 element 佔有空間
+ display: none 隱藏 element 不佔空間

###  position 屬性
+ static 為 default position 值, top, right, bottom, left 和 z-index 皆無作用
+ relative 可相對自己原本的位置調整位置,不會影原本對應的位置
+ absolute 會被從原本頁面layout移除,不會占用特定的位置,參考位置是最接近自己但position 不是 static(default position 值) 的父層
+ fixed 與 absolute 相似,但參考位置 Viewport(用戶網頁的可視區域)
+ sticky : 是 relative 和 fixed 的混和屬性,會排在一搬排列的位置,但移動到設定位置就不會再移動
``` html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		/* css */
		.container {
			overflow: scroll;
			margin: 50px;
			width: 200px;
			height: 300px;
			border: 1px solid black
		}

		.box {
			padding: 10px;
			margin: 0 auto;
			text-align: center;
			width: 80%;
			height: 100px;
		}

		.red {
			background-color: red;
		}

		.blue {
			background-color: blue;
			height: 300px;
		}

		.green {
			background-color: green;
			position: sticky;
			top: 20px ;
			left: 0;
		}
	</style>
</head>

<body>
	<div class="container">
		<div class="box red">red</div>
		<div class="box green">green</div>
		<div class="box blue">blue</div>
	</div>
</body>
</html>
```

<!-- set style  -->
<style>
	/* css */
	.container {
		overflow: scroll;
		margin: 50px;
		width: 200px;
		height: 300px;
		border: 1px solid black
	}
	.box {
		padding: 10px;
		margin: 0 auto;
		text-align: center;
		width: 80%;
		height: 100px;
	}
	.red {
		background-color: red;
	}
	.blue {
		background-color: blue;
		height: 300px;
	}
	.green {
		background-color: green;
		position: sticky;
		top: 20px ;
		left: 0;
	}
</style>

<!-- html -->
<div class="container">
	<div class="box red">red</div>
	<div class="box green">green</div>
	<div class="box blue">blue</div>
</div>


### box-sizing:border-box 的作用
+ 告訴 browser width,height 包含 padding 及 border
+ 設定 border-box 使得在調整畫面時,較不易產生跑版

### inline, inline-block 和 block 的差異
+ block 會列在新的一行,並占有整行的空間
+ inline 不會列在新的一行,與前一元素列在同一行
	+ height,width 不可調
	+ margin 左右可調,上下不可調, 
	+ padding 左右可調,上下可調但不影響隔壁元件(會影響 background)
+ inline-block 與 inline 相似但可以設定 height, width, margin 和 padding 皆可調

``` html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		.debug {
			border: 1px solid black;
			width: 600px;
		}
		.wrap {
			border: 1px solid black;
			margin: 10px;
			font-size: 24px;
    	padding: 0;
    	line-height: normal;
		}
	
		/* display: block;
			div deafult is  "display: block;"
			height,width  可調
			margin,padding 可調 */
		.box1 {
			border: 1px solid black;
			display: block;
			background: yellow;
			width: 120px;
			height: 100px;
			margin: 5px 5px;
			padding: 5px 5px;
			line-height: normal;
		}
	
		/* display: inline;
			height,width  不可調
			margin 左右可調,上下不可調
			padding 左右可調,上下可調但不影響隔壁元件(會影響 background) */
		.box2 {
			border: 1px solid black;
			display: inline;
			background: yellow;
			width: 120px;
			height: 100px;
			margin: 5px 5px;
			padding: 5px 5px;
			line-height: normal;
		}
	
		/* inline-block
			height 可調
			width  可調
			margin 可調
			padding 可調 */
		.box3 {
			border: 1px solid black;
			display: inline-block;
			background: yellow;
			width: 120px;
			height: 120px;
			margin: 5px 5px;
			padding: 5px 5px;
			line-height: normal;
		}
	</style>
</head>

<body>
	<div class="debug">
		<div class="wrap">
			<div class="box1">111 block</div>
			<div class="box1">222 block</div>
			<div class="box1">333 block</div>
		</div>
		<div class="wrap">
			<div class="box2">111 inline</div>
			<div class="box2">222 inline</div>
			<div class="box2">333 inline</div>
		</div>
		<div class="wrap">
			<div class="box3">111 inline-block</div>
			<div class="box3">222 inline-block</div>
			<div class="box3">333 inline-block</div>
		</div>
	</div>
</body>
</html>
```

<!-- set style  -->
<style>
	.debug {
		border: 1px solid black;
		width: 600px;
	}
	.wrap {
		border: 1px solid black;
		margin: 10px;
		font-size: 24px;
    padding: 0;
    line-height: normal;
	}

	/* display: block;
		div deafult is  "display: block;"
		height,width  可調
		margin,padding 可調 */
	.box1 {
		border: 1px solid black;
		display: block;
		background: yellow;
		width: 120px;
		height: 100px;
		margin: 5px 5px;
		padding: 5px 5px;
		line-height: normal;
	}

	/* display: inline;
		height,width  不可調
		margin 左右可調,上下不可調
		padding 左右可調,上下可調但不影響隔壁元件(會影響 background) */
	.box2 {
		border: 1px solid black;
		display: inline;
		background: yellow;
		width: 120px;
		height: 100px;
		margin: 5px 5px;
		padding: 5px 5px;
		line-height: normal;
	}

	/* inline-block
		height 可調
		width  可調
		margin 可調
		padding 可調 */
	.box3 {
		border: 1px solid black;
		display: inline-block;
		background: yellow;
		width: 120px;
		height: 120px;
		margin: 5px 5px;
		padding: 5px 5px;
		line-height: normal;
	}
</style>

<!-- html -->
<div class="debug">
	<div class="wrap">
		<div class="box1">111 block</div>
		<div class="box1">222 block</div>
		<div class="box1">333 block</div>
	</div>
	<div class="wrap">
		<div class="box2">111 inline</div>
		<div class="box2">222 inline</div>
		<div class="box2">333 inline</div>
	</div>
	<div class="wrap">
		<div class="box3">111 inline-block</div>
		<div class="box3">222 inline-block</div>
		<div class="box3">333 inline-block</div>
	</div>
</div>


### Flexbox 與 Grid 的差異
+ Flexbox 是一維的 layout設計, 可選擇水平或垂直排列
+ Grid 是二維的 layout設計,有如填表格
+ 這兩種方式相對於一搬的設計都可減少CSS的數量
+ 這兩種設計可混合使用

### 現代置中的方法
#### transform/translate
``` html
<style>
	.container1 {
		position: relative;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container1">
	<div class="child1">
	</div>
</div>
```
<style>
	.container1 {
		position: relative;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child1 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container1">
	<div class="child1">
	</div>
</div>

#### flexbox
``` html
<style>
	.container2 {
		display: flex;
		justify-content: center;
		align-items: center;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child2 {
		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container2">
	<div class="child2">
	</div>
</div>
```
<style>
	.container2 {
		display: flex;
		justify-content: center;
		align-items: center;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child2 {
		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container2">
	<div class="child2">
	</div>
</div>

#### grid
``` html
<style>
	.container3 {
  display: grid;
  place-items: center;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child3 {
		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container3">
	<div class="child3">
	</div>
</div>
```
<style>
	.container3 {
  display: grid;
  place-items: center;

		border: 1px solid black;
		background: white;
		width: 600px;
		height: 400px
	}

	.child3 {
		border: 1px solid black;
		width: 50px;
		height:50px;
	}
</style>

<div class="container3">
	<div class="child3">
	</div>
</div>









