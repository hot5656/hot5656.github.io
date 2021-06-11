---
title: HTML tricky
abbrlink: d578
date: 2021-06-07 11:37:36
categories: Front End
tags:
	- html
	- tricky
---

### 加入 empty item 方便排版
``` html
	<style>
		.games .item {
			width: 360px;
			margin: 0 10px 20px 10px ;
			......
		}
		.games .item-empty {
			margin: 0 10px 10px ;
			width: 360px;	
		}
	</style>
<body>
	<ul class="games">
		<li class="item">
			<a href="#">
			</a>
			<img src="https://static-cdn.jtvnw.net/previews-ttv/live_user_therealknossi-640x360.jpg" alt="">
			<div class="user">
				<div class="avatar">
					<img
						src="https://static-cdn.jtvnw.net/jtv_user_pictures/574228be-01ef-4eab-bc0e-a4f6b68bedba-profile_image-300x300.png"
						alt="">
				</div>
				<div class="user-info">
					<div class="user-name">Sneaky | ggEZ</div>
					<div class="user-id">robert</div>
				</div>
			</div>
		</li>
		<div class="item-empty"></div>
		<div class="item-empty"></div> 
	</ul>
</body>
```

### 網頁 disable cache
``` html
<meta http-equiv="Cache-Control" content="no-cache">
```