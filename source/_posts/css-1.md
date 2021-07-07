---
title: CSS 說明
abbrlink: d3f3
date: 2021-05-18 10:08:17
categories: Front End
tags:
	- css
---

CSS(Cascading Style Sheets) 階層式樣式表

<!--more-->

### 基本

#### CSS 命名
``` bash
wrap
時間軸 timeline
條幅廣告 banner
menu
人頭 avatar
sidebar
麵包屑 path/crumb
navbar
```

#### CSS 三種使用方法
``` css
/* style.css */
/* ccs #3 */
.evening {
	background: orange;
}
```

``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<!-- ccs #3 -->
	<link rel="stylesheet" href="style.css">
	<!-- ccs #2 -->
	<style>
		.noon {
			background: yellow;
		}
	</style>
</head>
<body>
	<!-- ccs #1 -->
	<div style="background:red">Good morning</div>
	<!-- ccs #2 -->
	<div class="noon">Good afternoon</div>
	<!-- ccs #3 -->
	<div class="evening">Good evening</div>
</body>
</html>
```

#### simple css init
``` css
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
```

#### CSS naming BEM(Block Element Modifier)
+ [A CSS Naming Convention](http://getbem.com/naming/)
+ [BEM 101](https://css-tricks.com/bem-101/)

``` html
<div className="nav">
    <nav className="nav__container">
      <ul className="nav__list">
        <li className="navList__item--blue">I am blue!</li>
        <li className="navList__item--red">I am red!</li>
        <li className="navList__item--hover">I have a hover state!</li>
      </ul>
    </nav>
</div>
```

#### 單位
``` css
.box {
	/* px 點 */ 
	height: 50px;
	/* em 倍數乘以父元素的 px 值 */ 
	padding: 0.75rem 1.5rem;
	/* rem 倍數乘以根元素的 px */ 
	line-height: 1.5rem;
	/* % 父元素百分比 */ 
	width:50%;
	/* viewport height (百分比) */ 
	height: 100vh;
}
```

### CSS Selector 選擇器
#### 種類
``` css
/* Universal Selector 全體選擇器 */
* {
	background: yellow;
}
/* element(tag) Selector */
div {
	color: red;
}
/* class Selector */
.evening {
	background: orange;
}
/* id Selector */
#no1 {
	background: blue;
}
/* input type=checkbox checked 同層後的 label */
input[type=checkbox]:checked ~ label {
  text-decoration: line-through;
  color: rgba(0,0,0,0.3);
}
/* todo hover 內容的 .btn-delete 顯示 */
.todo:hover .btn-delete {
  opacity: 1;
}
```

#### Multiple Selector
``` css
/* multiple selector  */
div.group1 {
	background: orange;
}
/* 下一層 */
div.wrap > div {
	background: pink;
}
/* 所有層 */
div.wrap div {
	background: blue;
}
/* 同一層下一個 */
.line2 + div{
	background: red;
}
/* 同一層後面所有的 */
.line2 ~ div{
	background: red;
}
```

#### [Pseudo classes](https://developer.mozilla.org/zh-TW/docs/Web/CSS/Pseudo-classes)
``` css
span {
	background: orange;
}
/* hover(滑鼠移至上方) */
span:hover {
	background: blue;
}
/* xxxx-child */
/* 先取出 xxxx-child 再看看是不是 span*/
div span:first-child {
	background: red;
}
/* 第一個以外 */
div span:not(:first-child) {
	background: red;
}
div span:last-child {
	background: green;
}
div span:nth-child(3) {
	background: blue;
}
/* 奇數順序 */
div span:nth-child(odd) {
	background: red;
}
/* 偶數順序 */
div span:nth-child(even) {
	background: blue;
}
/* 順序 3,6,9 */
div span:nth-child(3n) {
	background: blue;
}
/* 順序 3,6,9 + 1 --> 1,4,7,10*/
div span:nth-child(3n+1) {
	background: blue;
}
```

#### Pseudo elements
``` css
/* bfore, after 的 content 一定要存在才有作用, 至少要填 "" */
.wrap > div::before {
	content: "$";
}
.wrap > div::after {
	content: "NTD";
	color: red;
}
/* 
	data-xxx 自訂內容
	attr() 可取出 HTML 中的 Attributes
 */
.wrap2 > div::before {
	content: attr(class) ;
}
.wrap2 > div::after {
	content: attr(data-id);
}
```

``` html
<div class="wrap">
	<div>1000</div>
</div>
<div class="wrap2">
	<div class="group" data-id="NTD">100</div>
	<div class="group" data-id="RMB">200</div>
</div>
```

#### CSS 權重 
``` html 
<!-- !important > inline style > id > class > tag-->
<style>
	.group1 {
		background: blue !important;
	}
</style>

<div>
	<span>Span1</span>
	<span class="group1" style="background:green;">Span2</span>
	<span>Span3</span>
</div>
```

### CSS Properties
#### [background](https://www.w3schools.com/cssref/css3_pr_background.asp)
``` html
<style>
.box1 {
	background: url(./images.jpg) no-repeat center center;
	/* no-repeat, repeat
		 left, right, center 
		 top, bottom, center */
	background-size: cover;
	/* 50% 50%
		 cover
		 auto
		 contain ... */
	height: 300px;
}

.box2 {
	/* background: pink;
	background: #ffff00;
	background: rgb(200,150, 20); */
	/* 最後一位 0: 透明, 1:不透明 */
	background: rgba(200,150, 20,0.3);
}
</style>

<body>
	<div class="box1">Box1</div>
	<div class="box2">Box2</div>
</body>
```

##### [CSS 漸層(Gradient)](https://www.oxxostudio.tw/articles/202008/css-gradient.html)
漸層有以下幾種 : 
+ linear-gradient：線性漸層
+ radial-gradient：放射漸層
+ conic-gradient：圓錐形漸層(較新)
+ repeating-radial-gradient：放射重複漸層
+ repeating-linear-gradient：線性重複漸層
+ repeating-conic-gradient：圓錐形重複漸層(較新)

可以套用漸層的 CSS 屬性有兩種 :
+ background：元素的背景
+ list-style-image：清單預設的符號圖案

###### [Linear Gradient 線性漸層](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient())
+ 如果沒有設定角度，預設從上往下 進行漸層
+ background:linear-gradient(方向, 顏色1 位置, 顏色2 位置);

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
			width: 80%;
			height: 80vh;
			border: 1px solid #000;
			margin: 0 auto;
			/* 由上而下 */
			/* background: linear-gradient(red, yellow); */
			/* 三種顏色 */
			/* background: linear-gradient(red, yellow, red); */
			/* 角度 */
			background: linear-gradient(135deg, red, yellow);
		}
	</style>
</head>
<body>
	<div class="box"></div>
</body>
</html
```




#### border, border-radius and outline 
``` html
<style>
.box {
	background: orange;
	/* border 設定 */
	/* border: 10px solid blue; */
	/* 設定 outline,位置不會動  */
	/* outline: 20px solid red; */
	height: 200px;
	width: 200px;
	/* border-radius: 50% 50% 會變成圓形 */
	/* border-radius: 10px 10px; */
	border-radius: 50% 50%;
	/* border 畫三角形, 其他邊設 transparent */
	/* height: 0px;
	width: 0px;
	border-top: 100px solid red;
	border-right: 100px solid transparent;
	border-bottom: 100px solid transparent;
	border-left: 100px solid transparent; */
}
</style>

<body>
	<div class="box">Box</div>
</body>
```

#### 文字相關
``` html
<style>
.box {	
	color: red;
	font-size: 24px;
	font-weight: bold;
	font-family: "新細明體";
	/* 字距 */
	letter-spacing: 1px;
	/* 相對 font-size */
	line-height: 1.5em;
	/* 水平位置 center, left(default), right */
	text-align: center;
	width: 400px;
	/* overflow and text-overflow */
	/* overflow : hidden,scroll,visible ..  */
	white-space: nowrap;
	overflow: hidden;
	/* ellipsis 字超過會 show ..., 但必先設定 white-space: nowrap; and overflow: hidden; */
	text-overflow: ellipsis;
	/* text-decoration: 文字特效 
		none					預設值，無額外文字特效
		overline			文字增加上線特效
		underline			文字增加底線特效
		line-through	文字增加刪除線特效
	*/
	text-decoration:underline;
}
</style>

<body>
	<div class="box">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed debitis eius minima ab earum autem nihil tempore nobis provident maxime! Repellat eligendi facere quod dolore voluptatibus nulla, voluptatem corporis error?</div>
</body>
``` 

##### [line-height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/line-height)
``` css
box {
	/* 建議方法,相對字的大小*/
	line-height: 3.5;
	/* 相對 font-size 大小, 若未設定參考 parent, 如 H1 為設定(follow browser),可能會有問題*/
	line-height: 3em;
	/* 相對 本身字體之百分比, 也可能有不確定性 */
	line-height: 34%;
	/* direct set px */
	line-height: 32px;
}
```

##### text-align 文字水平對齊
``` css
box {
	text-align:left; 		//向左對齊
	text-align:right; 	//向右對齊
	text-align:center; 	//置中
	text-align:justify; //使左右對齊本文
}
```

##### text-indent 首行處理
``` css
.box {
	/* 讓首行縮排 */
  text-indent : 36px;
	/* 讓首行凸出來 */
 text-indent : -36px;
	/* 讓字變不見 */
	margin-left : 36px; 
	text-indent : -36px;
}
```

##### word-break 文字斷行規則
``` css
/*
normal    預設值，根據瀏覽器預設的斷行效果
keep-all	不可以在單字的字母換行，必須保留完整單字，例如遇到半形空格才能換行
break-all 可以在單字的字母換行，不一定要完整單字才能換行(一般文章會將字切開)
break-word normal 和 overflow-wrap: anywhere  的合併
*/
box {
	word-break: break-all;
}
```

##### white-space 空白與換行處理
``` css
/*
normal	 默認。 空白會被瀏覽器忽略。
pre	     空白會被瀏覽器保留。 其行為方式類似HTML 中的<pre> 標籤。
nowrap	 文本不會換行，文本會在在同一行上繼續，直到遇到<br> 標籤為止。
pre-wrap 保留空白符序列，但是正常地進行換行。
pre-line 合併空白符序列，但是保留換行符。 
*/
box {
	white-space: pre-line;
}
```


##### writing-mode and inline-size(雖然 display:block 也會影顯寬度)
+ writing-mode 文字顯示的方向
	+ horizontal-tb : 水平顯示(default)
	+ vertical-rl : 由右到左垂直顯示方式
  + vertical-lr : 由左到右的垂直顯示方式
+ inline-size 影響一个元素的width 或 height, 取决于writing-mode
	+ fit-content 
	+ max-content
	+ min-content
+ width 也可做以下設定(同 writing-mode=horizontal-tb 時 inline-size)
	+ fit-content
	+ max-content
	+ min-content

#### transition 屬性改變漸變效果
``` html
<style>
.box {	
	width: 200px;
	height:100px;
	border-radius: 30px;
	text-align: center;
	line-height: 100px;
	border: 2px solid orange;
	/* 加於此移出,移入才會都有效果 */
	transition: all 1s ease-in;
}
.box:hover {
	background: orange;
	color: white;
	cursor: pointer;
}
</style>

<body>
	<div class="box">
		Box
	</div>
</body>
```

#### [transform 動畫](https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform)
``` html
<style>
/* 動畫 */
.box {	
	width: 200px;
	height:100px;
	border-radius: 30px;
	text-align: center;
	line-height: 100px;
	border: 2px solid orange;
	background: orange;
	font-size: 24px;
	/* 加於此移出,移入才會都有效果 */
	transition: all 0.3s ease-in;
}
.box:hover {	
	transform: rotate(360deg);
}

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
	<div class="box">
		Box
	</div>

	<div class="box2">
		Box2
	</div>
</body>
```

#### position & z-index
##### position
``` html
<style>
/* static 預設定位值
relative 相對定位 : 相對自己的位置(還是佔有原本的位置) 
absolute 絕對定位 : 往父層一層一層找到不是 static 的位置
fixed 固定定位 : 相對瀏覽器(viewport) 的位置
可設定: top,left,right,bottom 
==== fixed  ====
  移至垂直中
	top: 0;
	bottom:0;
	margin: auto;
  移至水平中
	left: 0;
	right: 0;
	margin: auto;
*/

.box1 {
	position: fixed;
	width: 100px;
	height: 100px;
	/* top: 50%;
	left:50% */
	top: 0;
	bottom:0;
	left: 0;
	right: 0;
	margin: auto;
	border: 1px solid black;
}
.box2 {
	position: relative;
	width: 100px;
	height: 100px;
	top: 20px;
	left: 20px;
}
.box3 {
	width: 100px;
	height: 100px;
}
.box4 {
	position: relative;
	width: 100px;
	height: 100px;
}
.box-41 {
	position: absolute;
	right: 10px;
	top: 10px;
}
.box5 {
	position: fixed;
	width: 100px;
	height: 100px;
}

</style>

<body>
	<div class="debug">
		<div class="box1">111</div>
		<div class="box2">222</div>
		<div class="box3">333</div>
		<div class="box4">
			444
			<div class="box-41">444-1</div>
			<div class="box-42">444-2</div>
		</div>
		<div class="box5">555</div>
	</div>
</body>
```

##### z-index
``` css
/* default 0, 數字大顯示在上面 */
box {
	z-index: 2;
}
```

##### position sticky (支援較不普遍)
``` css
/* 滾動到某一個位置就不會再移動 */ 
.box2 {
	position: sticky;
	top: 100px;
}
```


#### display
``` html
<style>
	.wrap {
		margin: 10px;
		font-size: 24px;
	}

	/* display: block;
		div deafult is  "display: block;"
		height,width  可調
		margin,padding 可調 */
	.box1 {
		display: block;
		width: 100px;
		height: 100px;
		margin: 5px 5px;
		padding: 5px 5px;
	}

	/* display: inline;
		height,width  不可調
		margin 左右可調,上下不可調
		padding 左右可調,上下可調但不影響隔壁元件(會影響 background) */
	.box2 {
		display: inline;
		width: 100px;
		height: 100px;
		margin: 5px 5px;
		padding: 5px 5px;
	}

	/* inline-block
		height 不可調
		width  可調
		margin 可調
		padding 可調 */
	.box3 {
		display: inline-block;
		width: 100px;
		height: 100px;
		margin: 5px 5px;
		padding: 5px 5px;
	}
</style>

<body class="debug">
	<div class="wrap">
		<div class="box1">111</div>
		<div class="box1">222</div>
		<div class="box1">3333</div>
	</div>
	<div class="wrap">
		<div class="box2">1111</div>
		<div class="box2">2222</div>
		<div class="box2">3333</div>
	</div>
	<div class="wrap">
		<div class="box3">111</div>
		<div class="box3">222</div>
		<div class="box3">333</div>
	</div>
	<div class="wrap">
		<div class="box2">1111</div>
		<div class="box2">2222</div>
		<div class="box2">3333</div>
	</div>
</body>
```

#### visibility
##### visible(default) - 可見
##### hidden - 隱藏但還佔位置
##### collapse
+ 在表格的 row 或 column (row、row group、column 和 column group 元素，也就是分別為 HTML 中的 `tr`、`tbody`、`col` 和 `colgroup` 元素) 使用 `visibility: collapse` 時：
	+ 會導致整個 row 或 column 從顯示結果中刪除，原本佔用的空間會讓其他內容使用，也就是說顯示結果很像是將 `display: none` 應用在表格的 row 或 column 一樣
	+ 與 collapsed column 或 row (合併欄或合併列) 相交 (intersect) 的 spanned row 或 column (跨欄或跨列) 的內容會被裁切掉 (clipped)
	+ 可以在不強制重新佈局 (re-layout) 表格的情況下，使用動態效果來刪除表格的 row 或 column
+ 對 table cell (也就是 HTML 中的 `td` 或 `th` 元素) 使用 `visibility: collapse` 時，效果相當於 `visibility: hidden`
+ 除了上述以外的其他元素使用 `visibility: collapse` 時，效果相當於 `visibility: hidden`

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		table {
			outline: 1px solid;
		}
		td {
			outline: 1px solid;
		}
		.collapse {
			visibility: collapse;
		}
	</style>
</head>
<body>
	<table>
		<tr>
			<td>1.1</td>
			<td class="collapse">1.2</td>
			<td>1.3</td>
		</tr>
		<tr class="collapse">
			<td>2.1</td>
			<td>2.2</td>
			<td>2.3</td>
		</tr>
		<tr>
			<td>3.1</td>
			<td>3.2</td>
			<td>3.3</td>
		</tr>
	</table>
</body>
</html>
```

<div style="width:150px">
	{% asset_img pic2.png pic2 %}
</div>


#### Box model
``` html
<style>
	.item {
		height: 100px;
		width: 200px;
		margin: 10px;
		padding: 20px;
		border: 3px solid black;
		/*  content-box(default):width/height 不含 padding and border
			  border-box::width/height 不含 padding and border
		*/
		box-sizing: border-box;
	}
	
</style>

<body>
	<div class="box debug">
		<div class="item">1</div>
		<div class="item">2</div>
		<div class="item">3</div>
	</div>
</body>
```

+ max-width/min-width
``` css
.box {
	min-width: 300px;
	max-width: 1200px;
}
``` 

+ border-radius 圓角屬性
``` css
.box {
	/* top-left corner, top-right corner, bottom-right corner, bottom-left corner */
	border-radius: 0 10px 0 10px;
}
```

#### Flex

**外容器**
主軸 : main axis
交錯軸 : cross axis

|軸線|屬性                          | 選  項 |
|------|------------------------------|:-----|
|主軸  |display                       |flex, inline-flex|
|主軸  |flex-direction(方向)           | row(default), row-reverse, column, column-reverse|
|主軸  |flex-wrap(換行)                |nowrap(default), wrap, wrap-reverse|
|交錯軸|justify-content(主軸對齊)       |flex-start, flex-end, center, space-between, space-around|
|交錯軸|align-items(單行交錯軸對齊)     |flex-start, flex-end, center, space-between, space-around,stretch,baseline|
|交錯軸|align-content(多行交錯軸對齊)   |flex-start, flex-end, center, space-between, space-around,stretch|

**內元件**

|屬性           | 選  項 |
|---------------|:-----|
|Flex(伸縮屬性)  |flex-grow, flex-shrink 和 flex-basis|
|align-self     |個別調整子元素在交錯軸線的位置,屬性與 align-ite相同|
|Order          |可以重新定義元件的排列順序, default 0, 由小到大 |

``` html
<style>
	.debug *, .debug {
		outline: 1px solid gold;
	}
	.flex {
		/* 外容器 */
		/* flex, inline-flex */
		display: flex;
		width: 550px;
		height: 200px;
		/* === 主軸 === */
		/*flex-direction(方向) : row(default) | row-reverse | column | column-reverse */
		flex-direction: row;
		/* flex-wrap(換行): nowrap(default) | wrap | wrap-reverse
		   若不換行自動縮小 */
		flex-wrap: wrap;
		/* justify-content(主軸對齊)
		   flex-start：預設值，對齊最左邊的 main start
			 flex-end：對齊最左邊的 main end
			 center：水平置中
			 space-between：平均分配內容元素，左右元素將會與 main start 和 main end 貼齊
			 space-around：平均分配內容元素，間距也是平均分配 */
		justify-content: space-around;
		/* === 交錯軸 === */
		/* align-items(單行交錯軸對齊)
		   flex-start：對齊最上面的 cross start
			 flex-end：對齊最下面的 cross end
			 center：垂直置中
			 stretch：預設值，將內容元素全部撐開至 Flexbox 的高度(item 設 height 即無效
			 baseline：以所有內容元素的基線作為對齊標準 */
		/* align-items: center; */
		/* align-content(多行交錯軸對齊) 
			flex-start：對齊最上面的 cross start
			flex-end：對齊最下面的 cross end
			center：垂直置中
			space-between：將第一行與最後一行分別對齊最上方與最下方
			space-around：每行平均分配間距
			stretch：預設值，內容元素全部撐開 */
			align-content: space-around;
		margin: 10px 0
	}
	.item {
		/* 內元件 */
		margin: 10px;
		width: 100px;
		height: 50px;
		/* flex(伸縮屬性) 屬性是flex-grow, flex-shrink 和 flex-basis的簡寫，默認值為 0 1 auto
			 flex-grow 設定 flex元素 的延伸因子，默認值0 (按比例延伸)可設 某些1,某些2  即 1:2 延伸
			 flex-shrink 指定了 flex元素 的收縮規則，默認值是 1
			 flex-basis 指定了 flex元素 在主軸方向上的初始大小 
			 		flex item 放進 flex 容器，並不能保證能夠按照 flex-basis 設置的大小展示。瀏覽器會根據 flex-basis 計算主軸是否有剩餘空間
					 1. 當指定一個flex-basis值的時候，width屬性 就被忽略了
					 2. min-width和max-width會限制flex-basis值
			 */
		flex-grow: 1;
		flex-shrink: 1;
		/* align-self 可以個別調整子元素在交錯軸線的位置，屬性與 align-items 相同。假如我們已經在父元素上設定 align-item，但要其中一個內容物的位置需要調整成其他對齊方式，這時我們就可以針對該元素設定 align-self 來覆寫原本 align-item 的屬性。 */
		/* align-self: center */
		/* Order 可以重新定義元件的排列順序, default 0, 由小到大 */
		/* order: -1 */
	}
</style>

<body>
	<div class="flex debug">
		<div class="item">1</div>
		<div class="item">2</div>
		<div class="item">3</div>
		<div class="item">4</div>
		<div class="item">5</div>
		<div class="item">6</div>
	</div>
</body>
```

#### [Grid](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
```html
<style>
	.debug *, .debug {
		outline: 1px solid gold
	}

	html {
		font-size: 24px;
	}

	html, body, h1 ,h2 ,h3 ,h4 ,h5 ,h6 ,p {
		padding: 0;
		margin: 0;
	}

	body {
		margin: 10px
	}

	.container {
		display: grid;
		/* grid-template-columns 固定或比例 */
		/* grid-template-columns 或 grid-template-rows 明式格線 */
		/* grid-template-columns: 200px 200px 200px; */
		/* grid-template-columns: 2fr 1fr 1fr; */
		grid-template-columns: repeat(3, 1fr);
  	/* grid-template-rows: 100px 100px; */
		/* grid-auto-rows 或 grid-auto-columns 暗式格線 */
		/* grid-auto-rows: minmax(100px, auto); */
		grid-auto-rows: 100px;
		/* Gutters */
		grid-column-gap: 10px;
   	grid-row-gap: 1em;
	}

	.box1 {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
	}
	.box2 {
			grid-column-start: 1;
			grid-row-start: 3;
			grid-row-end: 5;
	}
</style>

<body>
	<div class="container debug">
		<div class="box1">111</div>
		<div class="box2">222</div>
		<div class="box3">333</div>
		<div class="box4">444</div>
		<div class="box5">555</div>
	</div>
</body>
```
<div style="width:700px">
	{% asset_img pic1.png pic1 %}
</div>

``` html
<style>
	/* 直接分配給 class */
	/* header 5 格
	   main 5 格
	   footer 4 格(第一格不占用) */
	.container {
		grid-template-areas: 
		 'header header header header header'
		 'main main main main main'
		 '!.footer footer footer'
	}
	/* maping class to grid */
	.main {
		grid-area: main;
	}
	.header {
		grid-area: header;
	}
	.footer {
		grid-area: footer;
	}

	/* 另一種分配格子方式 start_column_index/start_row_index/end_column_index/end_row_index */
	.main {
		grid-area: 1/2/8/3;
	}
</style>
```

#### ol/ul/li
``` css
ul {
	/* list-style-type
		none (沒有)
		disc (全黑圓圈)
		circle (空心圓圈)
		square (正方形)
	*/
	list-style-type:square;
	/* list-style-position 屬性讓我們可以決定記號是否應該被視為是文字的一部份，並且由此而決定記號的位置。這個屬性可能的設定值為 "inside" 及 "outside"。預定值為 "outside"。
	*/
	list-style-position:inside;
	// list-style-image 用來將某個圖案設定為記號
	list-style-image:url("circle.gif");
	// list-style :　list-style-tyle、list-style-position、及 list-style-image
	list-style: url("circle.gif") none inside;
}
```

#### other
##### cursor
``` cs
box {
	/* cursor 改變滑鼠游標的形狀
			crosshair - 十字線型
			move - 十字箭頭(移動)
			all-scroll - 四方捲動
			n-resize - 箭頭朝上
			s-resiz - 箭頭朝下
			e-resize - 箭頭朝右
			w-resize - 箭頭朝左
			nw-resize - 箭頭左上
			sw-resize - 箭頭左下
			se-resize - 箭頭朝右上
			ne-resize - 箭頭朝右下
			col-resize - 改變直行
			row-resize - 改變橫欄
			text - I 輸入文字符號
			vertical-text - 垂直
			help - 協助加一問號
			wait - 等待中；漏斗
			progress - 進行中；作
			pointer - 手型，表示
	*/
	cursor: pointer;
}
```

##### [box-shadow](https://developer.mozilla.org/zh-TW/docs/Web/CSS/box-shadow)
``` css
.box {
	/* offset-x | offset-y | blur-radius(模糊半徑) | color */
	box-shadow: 10px 5px 5px black;	

	/* offset-x | offset-y | blur-radius | spread-radius(正值將導致陰影擴大並變大，負值將導致陰影縮小) | color */
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
```

##### [font-family 字體](https://www.oxxostudio.tw/articles/201811/css-font-family.html)
``` css 
.box {
	/*  使用 "Microsoft JhengHei" 不要使用 “微軟正黑體” 可避免某些 browser 誤判/* 
	/* font-family: "微軟正黑體"; */
	font-family: "Microsoft JhengHei"; 
	font-family: "Times New Roman";
}
```

#### min-height
``` css
/* 設定占滿整個畫面高度,以免畫面底端留有空白 */
.mini-page {
  min-height: calc(100vh - 424px);
}
```

#### opacity 不透明度
``` css
/* 不透明 */
opacity: 1;
/* 透明 */
opacity: 0;
```



#### [calc()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc())
- 允許在聲明CSS屬性值時執行一些計算它可以用在如下場合&lt;length&gt;、&lt;frequency&gt;, &lt;angle&gt;、&lt;time&gt;、&lt;percentage&gt;、&lt;umber&gt;、或 &lt;integer&gt;
- &plus; 和 - 運算符的兩邊必須要有空白字符
- &ast; 和 / 這兩個運算符前後不需要空白字符，但如果考慮到統一性，仍然推薦加上空白符

``` css
/*
	+ 加法。
	- 減法。
	* 乘法，乘數中至少有一個是 <number>。
	/ 除法，除數（/右面的數）必須是<number>。
*/

```

#### [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
+ [CSS濾鏡效果](http://blog.shihshih.com/css-filter/)

``` css
/*
CSS Filters濾鏡效果共有十種特效
grayscale灰階
sepia懷舊
saturate飽和
hue-rotate色相旋轉
invert負片
opacity不透明
brightness亮度
contrast對比
blur模糊
drop-shadow下拉陰影
*/
.games .item {
	filter: brightness(0.8)
}
.games .item:hover {
	filter: brightness(1)
}
```


### RWD 相關

#### RWD meta
``` css
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### overflow
``` css
	/*
		屬性 overflow, overflow-x, overflow-y 
		overflow: auto;　		- 預設會自動使用捲軸
		overflow: visible;　- (Default)顯示的文字或圖片會直接超出範圍，不使用捲軸
		overflow: hidden;　	- 自動隱藏超出的文字或圖片
		overflow: scrol;　	- 自動產生捲軸  */
	.box {
		overflow: visible;
		
	}
```

#### media
``` css
	/* RWD 由 desktop 做起 */
	.title{
  color: red;
	}
	/* 768px 以下（含） */
	@media(max-width:768px) {
		.title{
			color: blue;
		}
	}
	/* 375px 以下（含） */
	@media(max-width:375px) {
		.title{
			color: yellow;
		}
	}

	/* RWD 由 mobil 做起 */
	.title{
  color: red;
	}
	/* 375px 以上（含） */
	@media(min-width:375px) {
		.title{
			color: yellow;
		}
	}
	/* 768px 以上（含） */
	@media(min-width:768px) {
		.title{
			color: blue;
		}
	}
```

### 參考
+ [30個你必須記住的CSS選擇器](https://code.tutsplus.com/zh-hant/tutorials/the-30-css-selectors-you-must-memorize--net-16048)
+ [CSS Flex Container](https://www.w3schools.com/css/css3_flexbox_container.asp)
+ [圖解：CSS Flex 屬性](https://wcc723.github.io/css/2017/07/21/css-flex/)
+ [Complete Guide for Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
+ [深入理解 CSS 漸層](https://www.oxxostudio.tw/articles/202008/css-gradient.html)