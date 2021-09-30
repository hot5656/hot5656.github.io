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




