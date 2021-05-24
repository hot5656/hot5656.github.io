---
title: HTML 嵌入
abbrlink: d7f8
date: 2021-05-23 16:59:41
categories: Front End
tags:
	- html
---

### 網站嵌入 Google 地圖
+ goole 地圖選到 地點
<div style="width:700px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

+ 複製 html
<div style="width:700px">
	{% asset_img pic2.png pic2 %}
</div>

+ 放入網頁 (將 width and height 改成 100% 即可依外部的 div 控制大小)

``` html
<iframe src="https://www.google.com/maps/embed?
pb=!1m18!1m12!1m3!1d3617.3381802914473!2d121.35304391432197!3d24.
954606247624927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.
1!3m3!1m2!1s0x34681c0246dcd2d3%3A0x6fe2e806ad0eda42!2zMjM55paw5YyX5biC6bav5q2M5Y2A5p
aH5YyW6LevNjgtMeiZnw!5e0!3m2!1szh-TW!2stw!4v1599026078041!5m2!1szh-TW!2stw" 
width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" 
aria-hidden="false" tabindex="0"></iframe>
```

