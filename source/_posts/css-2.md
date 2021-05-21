---
title: CSS Issue
abbrlink: d2b3
date: 2021-05-19 16:01:11
categories: Front End
tags:
	- css
	- issue
---

### Flex - align-items/align-content stretch 無作用
如果子容器或是元件，在有設定高度（height）的情況下，這個 stretch 會被忽略，自動變成 flex-start(align-items/)/normal(align-content)

<!--more-->

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
