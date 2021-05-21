---
title: RWD CSS example
categories: Front End
tags:
  - css
  - rwd
abbrlink: 9bc4
date: 2021-05-20 23:45:51
---

### index.scss
``` css
@import "variable";
@import 'mixin';
@import 'grid';
@import 'reset';
@import 'layout';
@import 'pages/index';
```

<!--more-->

### _variable.scss
``` css
/* color */
$highline-color: #fff;
$bright-color: #F56C23;
$base-color: #3D1101;
$dark-color: #000;
$ground-color: #EFE9E7;
$activemenu-color: #777;
/* 字型大小 */
$font-3l: 48px;
$font-2l: 36px;
$font-l: 24px;
$font-m: 20px;
$font-s: 18px;
$font-xs: 16px;
$font-xxs: 14px;
$font-3s: 12px;
$font-symb1: 32px;
$font-symb2: 28px;
$font-symb3: 26px;
```

### _mixin.scss
``` css
@mixin font-hex {
	/* 微軟正黑體 */
	/* font-family: "Microsoft JhengHei"; */
	font-family:微軟正黑體;
	font-size: $font-xs;
	line-height: 1.2;
}

@mixin horizontal-line($long, $weight, $color ) {
	width: $long;
	height: $weight;
	border-bottom: 1px solid $color;
}
```

### _grid.scss
``` css
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

img {
	/* 防止img解析度變差 */
	max-width: 100%;
	height: auto;
	/* 修正放於div底部會有空白 */
	display: block;
 }
 
 /* 全域 border-box */
 *,*::before,*::after {
	box-sizing: border-box;
}

.clearfix {
	clear: both;
}
```

### _layout.scss
``` css
body {
	@include font-hex;
	color: $base-color;
}

.wrap {
	max-width: 1024px;
	margin: 0 auto;
	background: $ground-color;
	position: relative;
}

h2 {
	font-size: $font-m;
}

h3 {
	font-size: $font-l;
}

h4 {
	font-size: $font-m;
}

/* 漢堡選單 input 隱藏 */
#menu_control {
	position: absolute;
	z-index: -2;
	opacity: 0;

	&:checked~.header .menu {
		// 設定一個可容納的高度
		max-height: 500px;
	}
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: $dark-color;
	padding: 15px 30px 15px 40px;

	@include pad-below() {
		display: block;
	}

	.logo {
		display: block;
		font-size: 24px;
		font-weight: bolder;
		color: #fff;
		text-decoration: none;

		@include pad-below() {
			display: flex;
			justify-content: center;
		}
	}

	.menu-btn {
		display: none;

		@include pad-below() {
			/* 漢堡大小 40*40 靠上層 top: 5px,right: 10px */
			width: 40px;
			height: 40px;
			display: block;
			position: absolute;
			top: 5px;
			right: 10px;

			span {
				width: 1px;
				height: 1px;
				display: block;
				overflow: hidden;
			}

			&::before {
				content: '';
				position: absolute;
				left: 2px;
				// 漢寶線寬度 2px, 長度 36px
				height: 2px;
				width: 36px;
				/* 畫中間線 */
				background-color: #fff;
				top: 0;
				bottom: 0;
				margin: auto;
				/* 畫上下線 上下各 8px 距離*/
				box-shadow: 0px 8px #fff,
					0px -8px #fff;
			}
		}
	}

	.menu {
		display: flex;

		/* 漢堡選單使用*/
		@include pad-below() {
			max-height: 0;
			overflow: hidden;
			display: block; // mask flex
			position: absolute;
			top: 54px;
			left: 0;
			right: 0;
			z-index: 100;
			background: #333;
			/* 轉換速度 */
			transition: max-height 1s;

			li {
				// float: none; // mask for float
				border-bottom: 1px dashed #69CA62;
			}
		}

		a {
			padding: 16px 15px;
			font-size: $font-m;
			color: $highline-color;
			text-decoration: none;

			&:hover,
			&.active {
				background: $activemenu-color;
			}

			@include pad-below() {
				display: block;
				text-align: center;

				// 擋掉上層 active 顯示
				&.active {
					background: transparent;
				}

				&:hover {
					background: $activemenu-color;
				}
			}
		}
	}
}

.banner {
	background: url(../images/header.jpg) center no-repeat;
	height: 420px;
	color: $highline-color;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.top-text {
		width: 460px;
		height: 152px;
		background: rgba(0, 0, 0, 0.35);
		margin: 0 auto;
		text-align: center;

		@include screen640() {
			width: 300px;
			height: 194px;
		}
	}

	.yummy {
		font-size: $font-2l;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	p {
		line-height: 24px;
	}
}

.footer {
	display: flex;
	justify-content: space-between;
	padding: 40px;

	@include pad-below() {
		display: block;
		padding: 20px 10px 50px 10px;
	}

	h3 {
		margin-bottom: 20px;

		@include pad-below() {
			margin-top: 30px;
		}
	}

	.text {
		display: flex;

		@include pad-below() {
			display: block;
		}

		.about {
			width: 300px;
			margin-right: 20px;
		}
	}

	.foot-link {
		a {
			display: block;
			font-size: 48px;
			font-weight: bolder;
			color: $base-color;
			text-decoration: none;

			@include pad-below() {
				display: flex;
				justify-content: flex-end;
			}
		}

		@include pad-below() {
			margin-top: 30px;
		}
	}
}

.media-link {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;

	i {
		display: block;
		margin-left: 10px;
		font-size: $font-2l;
	}

	.fa-google-plus-square {
		color: #DB4437
	}

	.fa-twitter-square {
		color: #41ABE1
	}

	.fa-facebook-square {
		color: #3A5795
	}
}
```

### _index.scss
``` css
.our-special {
	padding: 50px 2.5%;

	@include pad-below() {
		padding-right: 0px;
		padding-left: 0px;
	}

	h2 {
		text-align: center;
		line-height: 30px;
	}

	h4 {
		text-align: center;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	img {
		border-radius: 50%;
		margin: 0 auto;
	}

	ul {
		display: flex;
		justify-content: space-evenly;
		margin-top: 30px;

		@include pad-below() {
			display: block;
		}

		li {
			width: 30%;

			@include pad-below() {
				max-width: 320px;
				width: 320px;
				padding-left: 30px;
				padding-right: 30px;
				margin: 30px auto;
			}
		}
	}

	/* 畫兩橫線 */
	.good-chef {
		position: relative;
		width: 200px;
		margin: 0 auto;

		.line1 {
			position: absolute;
			top: -60px;
			left: -140px;
			@include horizontal-line(120px, 1px, #989898);

			@include pad-below() {
				display: none;
			}
		}

		.line2 {
			position: absolute;
			top: -60px;
			left: 220px;
			@include horizontal-line(120px, 1px, #989898);

			@include pad-below() {
				display: none;
			}
		}
	}
}

.chef {
	display: flex;
	background: $base-color;
	padding-left: 2.5%;
	padding-right: 2.5%;
	color: $ground-color;

	@include pad-below() {
		display: block;
		padding-left: 0;
		padding-right: 0;
	}

	h3 {
		font-size: $font-m;
		margin-bottom: 5px;
	}

	p {
		margin-bottom: 10px;
	}

	.start {
		flex-shrink: 0;
		max-width: 470px;
		height: 460px;
		background: url(../../images/star.jpg) center no-repeat;

		@include pad-below() {
			margin: 0 auto;
		}
	}

	.text {
		padding-left: 20px;
		margin-top: 80px;

		@include pad-below() {
			padding-left: 0px;
			padding-bottom: 30px;
			margin-top: 30px;
			margin-left: 30px;
			margin-right: 30px;
		}
	}
}

.response {
	padding-top: 50px;

	h3 {
		text-align: center;
	}

	h4 {
		margin: 20px 0;
	}

	p {
		margin-bottom: 20px;

		&.title {
			float: right;
		}
	}

	img {
		border-radius: 50%;
	}

	ul {
		display: flex;
		justify-content: space-between;
		padding: 50px 2.5%;

		@include pad-below() {
			display: block;
			padding: 30px 0;
		}

		li {
			width: 32%;
			display: flex;

			@include pad-below() {
				max-width: 320px;
				padding-left: 10px;
				padding-right: 10px;
				width: 320px;
				margin: 0 auto 30px auto;
			}

			.pic {
				width: 67px;
				flex-grow: 0;
				flex-shrink: 0;
			}

			.text {
				margin-left: 10px;
			}
		}

	}
}

.book {
	padding-top: 50px;
	padding-bottom: 50px;
	background: #F6F4F3;

	@include pad-below() {
		padding-top: 40px;
	}

	h3 {
		text-align: center;
	}

	.book-info {
		display: flex;
		justify-content: space-evenly;
		margin-top: 40px;

		@include pad-below() {
			display: block;
			margin-top: 30px;
		}

		label {
			font-size: $font-xxs;
		}

		button {
			font-size: $font-xxs;
			border: 0;
			color: $highline-color;
			padding: 5px 10px;
			display: block;
			float: right;
			margin-left: 20px;
			border-radius: 5px;
			outline: none;

			&[type=reset] {
				background: #A09E9E;
			}

			&[type=submit] {
				background: $bright-color;
			}

			&:hover {
				cursor: pointer;
			}
		}

		.map {
			width: 45%;

			@include pad-below() {
				max-width: 460px;
				width: 100%;
				margin: 0 auto 30px auto;
				;
				padding-left: 10px;
				padding-right: 10px;
			}
		}

		form {
			width: 50%;

			@include pad-below() {
				max-width: 460px;
				width: 100%;
				margin: 0 auto;
				padding-left: 10px;
				padding-right: 10px;
			}
		}

		.row {
			display: block;
			margin-bottom: 5px;
		}

		input {
			&[type=radio] {
				margin-right: 35px;
			}

			&.row {
				line-height: 32px;
				padding-left: 10px;
				font-size: $font-xs;
				margin-bottom: 10px;
				width: 100%;
			}
		}
	}
}
```
