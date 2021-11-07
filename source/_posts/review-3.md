---
title: HTML review
abbrlink: '3717'
date: 2021-09-23 16:26:21
categories: Front End
tags:
	- html
	- review
---

### HTML Entities(實體) 是什麼
HTML Entities是以&開頭;結束的字串,這常用來顯示一些保留字元,不可見字元或鍵盤難以輸入的字元
常用 Entity

|Symbol|Description		|Entity Name	|Number Code
|------|------ 				|------ 			|-----
|"		 |quotation mark|&amp;quot;				|&amp;#34;
|'		 |apostrophe 		|&amp;apos;				|&amp;#39;
|&		 |ampersand			|&amp;amp;				|&amp;#38;
|<		 |less-than			|&amp;lt;					|&amp;#60;
|>		 |greater-than	|&amp;gt;					|&amp;#62;
|~		 |tilde operator|&amp;sim;			  |&amp;#8764;

<!--more-->

```html
<!DOCTYPE html>
<html>
  <head>
  	<title>HTML Entities</title>
  </head>
  <body>
    &lt;div id = &quot;character&quot;&gt;
  </body>
</html>
```

<body>
  &lt;div id = &quot;character&quot;&gt;
</body>

### HTML Semantic Elements(語意標籤)
一些有代表意義的 HTML Element,如以下
+ &lt;article&gt;
+ &lt;aside&gt;
+ &lt;details&gt;
+ &lt;figcaption&gt;
+ &lt;figure&gt;
+ &lt;footer&gt;
+ &lt;header&gt;
+ &lt;main&gt;
+ &lt;mark&gt;
+ &lt;nav&gt;
+ &lt;section&gt;
+ &lt;summary&gt;
+ &lt;time&gt;

<div style="width:400px;">
	{% asset_img img_sem_elements.gif %}
</div>

### meta tag
meta tag 是 HTML 的 tag 包含於網頁中,包含對網頁的描述,它不會顯示於網頁中,但會提供給搜尋引擎及網路爬蟲讀取

### HTML5 Web Storage 
+ Session Storage : 儲存資料於瀏覽器,當網頁關閉或還原(restore)即會清除
+ Local Storage : 儲存資料於瀏覽器,甚至當瀏覽器關掉再開都還會存在

### Web Workers 
一搬 JavaScript 是 Main Thread 執行，但若把程式碼放在 Web Workers 就可另開 Worker Thread，兩條線互不影響，讓 JavaScript 在背景執行，並且兩線可由訊息溝通-使用 postMessage 發送訊息、onmessage 接收訊息。通常我們會將需要長時間運算且不含 Window 或 DOM Element 操作的程式碼放在 Web Workers，好處是不阻塞 Main Thread。
``` js
if (window.Worker) {
  var myWorker = new Worker('worker.js');

  first.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  };

  second.onchange = function() {
    myWorker.postMessage([first.value, second.value]);
    console.log('Message posted to worker');
  };

  myWorker.onmessage = function(e) {
    result.textContent = e.data;
    console.log('Message received from worker');
  };
}
```

### HTML 
HyperText Markup Language(超文本標記語言)是一種用於建立網頁的標記語言

### HTML attributes(屬性)
HTML attributes 是 HTML tag 附加的訊息,位於 tag 名稱之後 結束尖括號之前,可以設定或調整屬性,以達到使用者預期之行為

### data-attributes 的作用
使用者自定義屬性,依開發者需求設定使用

### id 與 class 的差別
單一網頁id僅能設在單一個element, class 則可設定於多個 element,

### alt attribute 在 images 的功能
當 images 無法顯示時即會顯示 alt 的內容,alt 也有助於搜尋引擎更了解圖片的意義

### 如何在 HTML 建立超連結(hyperlink)
使用 a tag.

### HTML 的3種 list
+ 無序列表（Unordered list）:無數字編號的清單
``` html
<ul>
	<li>香蕉</li>
	<li>芭樂</li>
	<li>鳳梨</li>
</ul>
```
<ul>
	<li>香蕉</li>
	<li>芭樂</li>
	<li>鳳梨</li>
</ul>

+ 有序列表（Ordered list）: 有數字編號的清單
``` html
<ol>
	<li>香蕉</li>
	<li>芭樂</li>
	<li>鳳梨</li>
</ol>
```
<ol>
	<li>香蕉</li>
	<li>芭樂</li>
	<li>鳳梨</li>
</ol>

+ 定義列表（Definition list）: 表示一系列的特殊名詞定義
``` html
<dl>
  <dt>HTML</dt>
  <dd>This stands for Hyper Text Markup Language</dd>
  <dt>HTTP</dt>
  <dd>This stands for Hyper Text Transfer Protocol</dd>
</dl>
```
<dl>
  <dt>HTML</dt>
  <dd>This stands for Hyper Text Markup Language</dd>
  <dt>HTTP</dt>
  <dd>This stands for Hyper Text Transfer Protocol</dd>
</dl>

### 參考資料
+ [A short guide to help you pick the correct HTML tag](https://dev.to/polgarj/a-short-guide-to-help-you-pick-the-correct-html-tag-56l9)










