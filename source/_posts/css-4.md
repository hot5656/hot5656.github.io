---
title: SCSS
abbrlink: d033
date: 2021-05-21 09:23:04
categories: Front End
tags:
	- css
	- scss
---

### import 匯入
``` scss
// import 不用加 _ 及 .scss
@import 'reset';
@import 'common';

/* 檔案 (檔案前 "_" 表僅為合併用)
		_reset.scss
		_common.scss */

// 架構
@import 'variable';
@import 'mixin';
@import 'grid';
@import 'reset';
@import 'common'; // 名可用名稱 layout
@import "module/button";
@import "page/index";
     or
 @import "page/member";
```

<!--more-->

### variable 變數
``` scss
/* color */
$highline-color: #fff;
/* 字型大小 */
$font-m: 120px;
$font-l: $font-m * 1.2;
$font-s: $font-m * 0.8;
```

### @mixin 語法知識庫 
``` scss
// 不帶参數
@mixin font-hex {
	/* 微軟正黑體 */
	/* font-family: "Microsoft JhengHei"; */
	font-family:微軟正黑體;
	font-size: 16px;
	line-height: 1.2;
}

// 帶参數
@mixin horizontal-line($long, $weight, $color ) {
	width: $long;
	height: $weight;
	border-bottom: 1px solid $color;
}

body {
	@include font-hex;
	color: #3D1101;
}

.good-chef .line1{
	position: absolute;
	top: -60px;
	left: -140px ;
	@include horizontal-line(120px, 1px, #989898 );
}
```

### @mixin+@content for 響應式設計
``` scss 
// _grid.scss
@mixin desktop{
	@media (max-width: 1024px) {
		@content
	}
}

@mixin pad{
	@media (max-width: 768px) {
		@content
	}
}

@mixin pad-below{
	@media (max-width: 767px) {
		@content
	}
}

@mixin iphone480{
	@media (max-width: 480px) {
		@content
	}
}

@mixin iphone5{
	@media (max-width: 320px) {
		@content
	}
}

.our-special {
	background: #EFE9E7;
	padding: 50px 2.5%;
	@include pad-below() {
		padding-right: 0px;
		padding-left: 0px;
	}
}
```

### & 符號參照巢狀結構的父選取器
``` scss
.menu{
	display: flex;
	a {
		padding: 14px 15px;
		font-size: $font-m;
		color: $highline-color;
		text-decoration: none;
		&:hover, &.active {
			background: $activemenu-color;
		}
	}
}
```