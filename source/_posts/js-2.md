---
title: 瀏覽器的 JavaScript
abbrlink: '8670'
date: 2021-05-25 09:36:25
categories: Coding
tags:
	- javascript
	- browser
---

### 簡介
#### JavaScript 的功能
+ 介面 : 改變介面
+ 事件 : 監聽事件並做出反應
+ 資料 : 與伺服器交換資料

<!--more-->

#### 執行
##### 放於 body 最後
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
			background: orange;
			height: 100px;
			width: 100px;
		}
	</style>
</head>
<body>
	<div class="box"></div>

	<script>
		document.querySelector('.box')
			.addEventListener('click', function(){
				document.querySelector('.box').style.background = 'red'
		})
	</script>
</body>
</html>
```

##### 放於 head 最後, 但要加入 DOM loaded(因執行時 DOM 尚未 load 完成)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	......
	<script>
		// DOM loaded
		document.addEventListener('DOMContentLoaded', function(){
			document.querySelector('.box')
				.addEventListener('click', function(){
					document.querySelector('.box').style.background = 'red'
			})
		})
	</script>
</head>
<body>
	<div class="box"></div>
</body>
</html>
```

##### head 加入js 檔
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	......
	<!-- add js file -->
	<script src="main.js"></script>
	<title>Document</title>
</head>
<body>
	<div class="box"></div>
</body>
</html>
```

``` js
// main.js
// DOM loaded
document.addEventListener('DOMContentLoaded', function(){
	document.querySelector('.box')
		.addEventListener('click', function(){
			document.querySelector('.box').style.background = 'red'
	})
})
```

### [DOM](https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model)
+ [DOM Element](https://www.w3schools.com/jsref/dom_obj_all.asp)
+ [DOM　Document](https://www.w3schools.com/jsref/dom_obj_document.asp)
+ [DOM Attributes](https://www.w3schools.com/jsref/dom_obj_attributes.asp)

文件物件模型（Document Object Model, DOM）是 HTML、XML 和 SVG 文件的程式介面。它提供了一個文件（樹）的結構化表示法，並定義讓程式可以存取並改變文件架構、風格和內容的方法。
<div style="width:400px">
	{% asset_img pic1.png pic1 %}
</div>

圖片來自 [Wikipedia DOM](https://en.wikipedia.org/wiki/Document_Object_Model)

#### [DOM API](https://developer.mozilla.org/zh-TW/docs/Web/API/Document)
##### 選元素
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
			background: orange;
			height: 100px;
			width: 100px;
		}
	</style>
</head>
<body>
	<div id="item1" class="box"></div>
	<div class="box box2"></div>
	<div class="box"></div>

	<script>
		// 依類別抓取,抓取多個 - HTMLCollection
		const elements = document.getElementsByTagName('div')
		console.log(elements)
		console.log(document.getElementsByClassName('box'))
		console.log(document.getElementById('item1'))
		// 依 selector 抓取,緊抓取第一個
		console.log(document.querySelector('div'))
		console.log(document.querySelector('.box2'))
		console.log(document.querySelector('#item1'))
		// 依 selector 抓取,緊抓多個 - NodeList
		const elementsNode = document.querySelectorAll('div')
		console.log(elementsNode)
	</script>
</body>
</html>
```

<div style="width:500px">
	{% asset_img pic2.png pic2 %}
</div>

###### .parentElement
parentElement is the parent element of the current node. 
若無父元素或非element則傳回 null 

###### .parentNode
parentNode is the parent of the current node. The parent of an element is an Element node, a Document node, or a DocumentFragment node.
若無父元素或非element則傳回 null

##### [改變 css](https://developer.mozilla.org/zh-TW/docs/Web/API/ElementCSSInlineStyle/style)
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
			background: orange;
			width: 100px;
		}
	</style>
</head>
<body>
	<div id="item1" class="box">111</div>
	<div class="box box2">222</div>
	<div class="box">333</div>

	<script>
		const element = document.querySelector('.box2')
		element.style.background = "red"
		element.style.margin = "10px"
		// 元件使用類陣列是輸入
		element.style['padding-top'] = '10px'
		// 命名改為駝峰式
		element.style.paddingBottom = '20px'
	</script>
</body>
</html>
```

##### [改變 class](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)
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
			background: orange;
			width: 100px;
			height: 100px;
		}
		.active {
			background: red;
		}
	</style>
</head>
<body>
	<div id="item1" class="box">111</div>
	<div class="box box2 active">222</div>
	<div class="box box3">333</div>

	<script>
		document.querySelector('#item1')
			.addEventListener('click', function(){
				// toggle class
				document.querySelector('#item1').classList.toggle('active')
		}) 
		document.querySelector('.box2')
			.addEventListener('click', function(){
				// remove class
				document.querySelector('.box2').classList.remove('active')
		}) 
		document.querySelector('.box3')
			.addEventListener('click', function(){
				// add class
				document.querySelector('.box3').classList.add('active')
		}) 
	</script>
</body>
</html>
```
###### check 是否包含某class
``` js
alert(div.classList.contains("foo"));
```


##### 改變內容 innerText, innerHTML, outerHTML
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
			background: orange;
			width: 200px;
			font-size: 36px;
			/* height: 100px; */
		}
		.active {
			background: red;
		}
	</style>
</head>
<body>
	<div id="item1" class="box">
		111
		<a href="#">hello</a>
	</div>
	<div class="box box2 active">
		222
		<a href="#">hello</a>
	</div>
	<div class="box box3">
		333
		<a href="#">hello</a>
	</div>

	<script>
		document.querySelector('#item1')
			.addEventListener('click', function(){
				element = 	document.querySelector('#item1')
				// 內部之文字
				console.log(element.innerText)
				element.innerText = 'innerText'
		}) 
		document.querySelector('.box2')
			.addEventListener('click', function(){
				// 內部之所有內容, 含 Tag
				element = 	document.querySelector('.box2')
				console.log(element.innerHTML)
				element.innerText = 'innerHTML'
		}) 
		document.querySelector('.box3')
			.addEventListener('click', function(){
				element = 	document.querySelector('.box3')
				// 外部之父元素
				console.log(element.outerHTML)
				element.outerHTML = 'outerHTML'
		}) 
	</script>
</body>
</html>
```

##### 加入刪除 元素
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
			background: orange;
			width: 200px;
			font-size: 36px;
		}
	</style>
</head>
<body>
	<div class="box">
		111
		<a href="#">hello</a>
	</div>

	<script>
		element = document.querySelector('.box')
		// remove tag a
		element.removeChild(document.querySelector('a'))

		// create element and content
		const item = document.createElement('div')
		item.innerText = '123'
		// add tag div
		element.appendChild(item)
		
		// create text
		const itemText = document.createTextNode("999")
		// add test
		element.appendChild(itemText)
	</script>
</body>
</html>
```

###### .append()
加入Node物件或DOMString(文字)
``` js
/* 加入Node物件 */
const parent = document.createElement('div')
const child = document.createElement('p')
parent.append(child)  // 然後div看起來像這樣<div> <p> </ p> </ div>
/* 加入DOMString(文字) */
const parent = document.createElement('div')
parent.append('附加文字') // 然後div看起來像這樣 <div>附加文字</ div>
```

###### .appendChild()
僅能加入Node物件, 不能加入DOMString(文字)
若加入的物件已存在,則會移動到此
``` js
/* 加入Node物件 */
const parent = document.createElement('div')
const child = document.createElement('p')
parent.appendChild(child) // 然後div看起來像這樣 <div> <p> </ p> </ div>
/* 加入DOMString(文字) */
const parent = document.createElement('div')
parent.appendChild('Appending Text') // Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'
```

###### [.remove()](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) - 直接移除元件
``` js
var el = document.getElementById('div-02');
el.remove(); // Removes the div with the 'div-02' id
```


#### [Event](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
+ [Element Events](https://developer.mozilla.org/en-US/docs/Web/API/Element#clipboard_events)
+ [Document Events](https://developer.mozilla.org/en-US/docs/Web/API/Document#events)
+ [Windown Events](https://developer.mozilla.org/en-US/docs/Web/API/Window#events)

##### addEventListener
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.box1 {
			background: orange;
			width: 200px;
			font-size: 36px;
			margin: 5px 0;
		}
		.box2 {
			background: orange;
			width: 200px;
			font-size: 36px;
		}
	</style>
</head>
<body>
	<div class="box1">
		111
		<a href="#">hello</a>
	</div>
	<div class="box2">
		222
	</div>
	<input class="input-text" type="text">

	<script>
		const element = document.querySelector('.box1')
		// callback function
		element.addEventListener('click', handleBox1);
		function handleBox1(e) {
			alert('Box1')
			// e.target 表 trigger event 的 element 
			console.log(e.target)
		}

		document.querySelector('.box2')
			// 匿名函數(Anonymous function)
			.addEventListener('click', function(){
				alert('Box2')
			})

			document.querySelector('.input-text')
				.addEventListener('keypress', function(e){
					console.log(e)
					// e.key:字元, e.keyCode:編碼, e.code:字串表示
					console.log(e.key, e.keyCode, e.code)
				})
	</script>
</body>
</html>
```

###### click
###### mousedown
###### mouseup
###### dbclick - 短時間內雙擊左鍵觸發
###### contextmenu - 滑鼠右鍵點擊觸發

###### mousemove - 滑鼠移動時觸發(要用到時才綁定，避免不斷觸發)
###### mouseenter - 滑鼠進入元素邊界時觸發(不會 bubble)
###### mouseleave - 滑鼠完全離開元素時觸發(不會 bubble)
###### mouseover - 滑鼠經過不同元素時觸發
###### mouseout - 滑鼠離開元素時觸發

###### keypress
+ [e.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)

```
/* e.key : 字元
	 e.keyCode : 編碼 ascii code
	 e.code : 字串表示 "KeyQ" for the Q
*/
```
###### keydown
###### keyup
###### submit - form commit

###### DOMContentLoaded - DOM load complete
``` js
// DOM loaded
document.addEventListener('DOMContentLoaded', function(){
	......
})
```


##### 表單處理
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		body {
			font-size: 24px;
		}
	</style>
</head>
<body>
	<form class="login-form" action="">
		<div>
			name : <input type="text" name="username">
		</div>
		<div>
			password : <input type="password" name="password">
		</div>
		<div>
				password again : <input type="password" name="password2">
		</div>
		<input type="submit" value="送出">
	</form>

	<script>
		document.querySelector('.login-form')
			.addEventListener('submit', function (e) {
				const input1 = document.querySelector('input[name=password]')
				const input2 = document.querySelector('input[name=password2]')
				// .value 取出值
				console.log(input1.value, input2.value)
				// 比較密碼
				if (input1.value != input2.value) {
					// 阻止預設功能(不送出表單)
					e.preventDefault()
					alert('密碼不同')
				}
		})
	</script>
</body>
</html>
```

##### 阻止預設行為
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		body {
			font-size: 24px;
		}
	</style>
</head>
<body>
	<div>
		111
		<a href="#">hello</a>
	</div>

	<script>
		document.querySelector('a').addEventListener('click', function(e){
			// 阻止預設行為
			e.preventDefault();
		})
	</script>
</body>
</html>
```

##### 事件傳遞機制
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.outer {
			width: 200px;
			height: 200px;
			background: yellow;
		}
		.inner {
			width: 100px;
			height: 100px;
			background: orange;
		}

	</style>
</head>
<body>
	<div class="outer">
		<div class="inner">
			<button class="button">Click</button>
		</div>
	</div>

	<script>
		addEvent('.outer')
		addEvent('.inner')
		addEvent('.button')

		function addEvent(className) {
			document.querySelector(className)
				.addEventListener('click', function(){
					console.log(className)
			})

		}
	</script>
</body>
</html>
```

<div style="width:400px">
	{% asset_img pic4.png pic4 %}
</div>



##### 詳細事件傳遞機制：捕獲與冒泡

<div style="width:700px">
	{% asset_img pic3.png pic3 %}
</div>

圖片來自 [W3C](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow)

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.outer {
			width: 200px;
			height: 200px;
			background: yellow;
		}
		.inner {
			width: 100px;
			height: 100px;
			background: orange;
		}

	</style>
</head>
<body>
	<div class="outer">
		<div class="inner">
			<button class="button">Click</button>
		</div>
	</div>

	<script>
		addEvent('.button')
		addEvent('.inner')
		addEvent('.outer')

		function addEvent(className) {
			// 第三個參數設為 true, 表示捕獲 
			document.querySelector(className)
				.addEventListener('click', function(){
					console.log(className, '捕獲')
			}, true)

			// 第三個參數設為 false, 表示冒泡
			document.querySelector(className)
				.addEventListener('click', function(){
					console.log(className, '冒泡')
			}, false)
		}
	</script>
</body>
</html>
```

<div style="width:400px">
	{% asset_img pic5.png pic5 %}
</div>

##### 別向上級回報：stopPropagation()
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.outer {
			width: 200px;
			height: 200px;
			background: yellow;
		}
		.inner {
			width: 100px;
			height: 100px;
			background: orange;
		}

	</style>
</head>
<body>
	<div class="outer">
		<div class="inner">
			<button class="button">Click</button>
		</div>
	</div>

	<script>
		addEvent('.button')
		addEvent('.inner')
		addEvent('.outer')

		function addEvent(className) {
			// 第三個參數設為 true, 表示捕獲 
			document.querySelector(className)
				.addEventListener('click', function(e){
					console.log(className, '捕獲')
			}, true)

			// 第三個參數設為 false, 表示冒泡
			document.querySelector(className)
				.addEventListener('click', function(e){
					// .button stopPropagation
					if (className === '.button') {
						e.stopPropagation()
					}
					console.log(className, '冒泡')
			}, false)
		}
	</script>
</body>
</html>
```

<div style="width:400px">
	{% asset_img pic6.png pic6 %}
</div>

##### 多重觸發與抑制(使用 stopImmediatePropagation()) 
**多重觸發**
``` html
	<script>
		document.querySelector('.button')
			.addEventListener('click', function(e){
				console.log("button click 1")
		})

		document.querySelector('.button')
			.addEventListener('click', function(e){
				console.log("button click 2")
		})
	</script>
```

<div style="width:400px">
	{% asset_img pic7.png pic7 %}
</div>

**抑制後觸發**
``` html
	<script>
		document.querySelector('.button')
			.addEventListener('click', function(e){
				// 要抑制另一個 stopPropagation() 無效, 要用 stopImmediatePropagation()
				// e.stopPropagation()
				e.stopImmediatePropagation()
				console.log("button click 1")
		})

		document.querySelector('.button')
			.addEventListener('click', function(e){
				console.log("button click 2")
		})
	</script> 
```

<div style="width:400px">
	{% asset_img pic8.png pic8 %}
</div>

##### 錯誤的 event
**for 使用 var 為錯誤, let 即正確**
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.btn {
			font-size: 24px;
		}

	</style>
</head>
<body>
	<div class="outer">
		<button class="btn">1</button>
		<button class="btn">2</button>
		<button class="btn">3</button>
		<button class="btn">4</button>
		<button class="btn">5</button>
	</div>

	<script>
		const elements = document.querySelectorAll('.btn')
		// 若使用 var 就不正常 --> alart always 6
		// let 就正常	--> alart 1~5
		// for (var i=0 ; i< elements.length ; i++) {
		for (let i=0 ; i< elements.length ; i++) {
			elements[i].addEventListener('click', function(){
				alert(i+1)
			})
		}
	</script>
</body>
</html>
```

**使用 html data-xx attribute**
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.btn {
			font-size: 24px;
		}

	</style>
</head>
<body>
	<div class="outer">
		<button class="btn" data-value="a">1</button>
		<button class="btn" data-value="2">2</button>
		<button class="btn" data-value="3">3</button>
		<button class="btn" data-value="4">4</button>
		<button class="btn" data-value="5">5</button>
	</div>

	<script>
		const elements = document.querySelectorAll('.btn')
		for (let i=0 ; i< elements.length ; i++) {
			elements[i].addEventListener('click', function(e){
				alert(e.target.getAttribute('data-value'))
			})
		}
	</script>
</body>
</html>
```

**add new button**
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.add-btn, .btn {
			font-size: 24px;
		}

	</style>
</head>
<body>
	<div class="outer">
		<button class="add-btn">add</button>
		<button class="btn" data-value="1">1</button>
		<button class="btn" data-value="2">2</button>
	</div>

	<script>
		let num = 3
		const elements = document.querySelectorAll('.btn')
		for (let i=0 ; i< elements.length ; i++) {
			elements[i].addEventListener('click', function(e){
				alert(e.target.getAttribute('data-value'))
			})
		}
		document.querySelector('.add-btn')
			.addEventListener('click', function(){
				const btn = document.createElement('button')
				btn.classList.add('btn')
				btn.setAttribute('data-value', num)
				btn.innerText = num++
				document.querySelector('.outer').appendChild(btn)
		})
	</script>
</body>
</html>
```

##### event delegation(代理)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.add-btn, .btn {
			font-size: 24px;
		}

	</style>
</head>
<body>
	<div class="outer">
		<button class="add-btn">add</button>
		<button class="btn" data-value="1">1</button>
		<button class="btn" data-value="2">2</button>
	</div>

	<script>
		let num = 3
		document.querySelector('.add-btn')
			.addEventListener('click', function(){
				const btn = document.createElement('button')
				btn.classList.add('btn')
				btn.setAttribute('data-value', num)
				btn.innerText = num++
				document.querySelector('.outer').appendChild(btn)
		})

		document.querySelector('.outer')
			.addEventListener('click', function(e) {
				if (e.target.classList.contains('btn')) {
					alert(e.target.getAttribute('data-value'))
				}
		})
	</script>
</body>
</html>
```

##### DOM loaded
``` js
// DOM loaded
document.addEventListener('DOMContentLoaded', function(){
	......
})
```

### [Web API](https://developer.mozilla.org/zh-TW/docs/Web/API)
#### Element
##### Attribute
``` js
// get attribute 
// var attribute = element.getAttribute(attributeName);
var div1 = document.getElementById("div1");
var align = div1.getAttribute("align");
// set attibute
// Element.setAttribute(name, value)
var b = document.querySelector("button");
b.setAttribute("name", "helloButton");
b.setAttribute("disabled", "");
```

##### [Input checkbox 屬性](https://www.w3school.com.cn/jsref/dom_obj_checkbox.asp)
``` js
// 被選到
document.getElementById("check1").checked=true
if (document.getElementById("check1").checked){
	consloe.log('It's selected.)
}
```

##### parentElement 父元素
``` js
var x = document.getElementById("myLI").parentElement
```

##### [.click()](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/click) 模擬滑鼠點擊一個元素
``` js
// click 1st nav link
document.querySelector('.navbar a').click()
```

#### [Event](https://developer.mozilla.org/zh-TW/docs/Web/API/Event)

##### .target - 初觸發事件的物件
###### tag name
``` js
document.querySelector('.box')
	.addEventListener('click', function(e){
		// dump tag name
		console.log(e.target.tagName.toLowerCase())
	}) // div , ul or li
```

##### .currentTarget - 處理事件之監聽器所屬的物件

#### [XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)


### 瀏覽器上儲存資料

#### [Cookie](https://www.w3schools.com/js/js_cookies.asp)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
	</style>
</head>
<body>
	<div>
		<div>
			id : <input class="id" type="text">
		</div>
		<div>
			phone : <input class="phone" type="text">
		</div>
		<button class="btn-save">儲存</button>
	</div>

	<script>
		function setCookie(cname, cvalue, exdays) {
			let d = new Date()
			// ms
			d.setTime(d.getTime() + exdays*24*60*60*1000)
			let expires = 'expires=' + d.toGMTString()
			document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/' ;
		}

		function getCookie(cname) {
			let name = cname + '='
			let decodeCookie = decodeURIComponent(document.cookie)
			let ca = decodeCookie.split(';')
			for (let i=0 ; i < ca.length ; i++) {
				let c = ca[i]
				c = c.trimStart(c)
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length)
				}	
			}
			return ''
		}

		// get cookie
		const oldId = getCookie('user-id')
		document.querySelector('.id').value = oldId
		document.querySelector('.phone').value = getCookie('phone')
		// save cookie trigger
		document.querySelector('.btn-save')
		 	.addEventListener('click', function(){
		 			const id = document.querySelector('.id').value
		 			// set cookie
					setCookie('user-id', id, 7)
					setCookie('phone', document.querySelector('.phone').value, 7)
			})
	</script>
</body>
</html>
```

#### [local storage](https://developer.mozilla.org/zh-TW/docs/Web/API/Window/localStorage)
儲存與 server 無關資料

##### simple example
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
	</style>
</head>
<body>
	<div>
		id : <input class="id" type="text">
		<button class="btn-save">儲存</button>
	</div>

	<script>
		// get local storage
		const oldId = window.localStorage.getItem('id')
		document.querySelector('.id').value = oldId

		document.querySelector('.btn-save')
			.addEventListener('click', function(){
					const id = document.querySelector('.id').value
					// set local storage
					window.localStorage.setItem('id', id)
			})
	</script>
</body>
</html>
```
##### save job list
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
	</style>
</head>
<body>
	<div>
		<div>
			job : <input class="job" type="text">
			<button class="btn-add">新增</button>
		</div>
		<div class="list">
		</div>
	</div>

	<script>
		let jobList = JSON.parse(window.localStorage.getItem('todo-list'))
		let idIndex = Number(JSON.parse(window.localStorage.getItem('id-index')))
		// init value for 1st time
		if (jobList === null) {
			jobList = []
		}
		if (idIndex === 0) {
			idIndex++
		}
		// show list
		showList(jobList)
		document.querySelector('.btn-add')
			.addEventListener('click', function() {
				let item = {}
				item.job = document.querySelector('.job').value
				if (item.job !== '') {
					item.id = idIndex++
					jobList.push(item)
					// convert job array to JSON
					let jobListJson = JSON.stringify(jobList)
					window.localStorage.setItem('todo-list', jobListJson)
					window.localStorage.setItem('id-index', String(idIndex))
					// update list
					showList(jobList)
				}
				else {
					console.log('Input error')
				}
			})
			// update job list
			function showList(job) {
				const listDiv = document.querySelector('.list')
				listDiv.innerText = ''
				for (let i=0 ; i < jobList.length ; i++) {
					let item = document.createElement('div')
					item.innerText = `${job[i].id} : ${job[i].job}`
					listDiv.appendChild(item)
				}
			}
	</script>
</body>
</html>
```


#### session storage 
網頁關掉即清除
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
	</style>
</head>
<body>
	<div>
		id : <input class="id" type="text">
		<button class="btn-save">儲存</button>
	</div>

	<script>
		// get session storage
		const oldId = window.sessionStorage.getItem('id')
		document.querySelector('.id').value = oldId

		document.querySelector('.btn-save')
			.addEventListener('click', function(){
					const id = document.querySelector('.id').value
					// set session storage
					window,sessionStorage.setItem('id', id)
			})
	</script>
</body>
</html>
```

### 傳送資料
#### 表單 from --> Browser 畫面更新
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<div class="app">
		<!-- action: 表單提交到哪裡(也可能是後端程式) -->
		<!-- <form method="GET" action="/test"> -->
		<form method="POST" action="https://google.com">
			username: <input type="text" name="username">
			<input type="submit">
		</form>
	</div>
</body>
</html>
```

#### AJAX(Asynchronous JavaScript and XML) --> 資料回傳至 JavaScript

##### AJAX google - 瀏覽器的限制 同源策略(Same-origin policy)
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>

	<script>
		const request = new XMLHttpRequest()
		// loaded function
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				console.log(request.responseText)
			}
			else {
				console.log('response error :', request.status)
			}
		}

		// error 
		request.onerror = function() {
			console.log('error')
		}

		// true 表非同步
		request.open('GET', 'https://google.com', true)
		request.send()
	</script>
</body>
</html>
```

<div style="width:700px">
	{% asset_img pic9.png pic9 %}
</div>

##### AJAX fake data - Access-Control-Allow-Origin : *
CORS(全名為 Cross-Origin Resource Sharing) 跨來源資源共享 : server response head 加 Access-Control-Allow-Origin : *
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>

	<script>
		const request = new XMLHttpRequest()
		// loaded function
		// type 1
		// request.addEventListener('load', function() {
		// 	if (request.status >= 200 && request.status < 400) {
		// 		console.log(request.responseText)
		// 	}
		// 	else {
		// 		console.log('response error :', request.status)
		// 	}
		// })
		// type 2
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				console.log(request.responseText)
			}
			else {
				console.log('response error :', request.status)
			}
		}

		// error 
		request.onerror = function() {
			console.log('error')
		}

		// true 表非同步
		request.open('GET', 'https://reqres.in/api/users/2', true)
		request.send()
	</script>
</body>
</html>
```

<div style="width:700px">
	{% asset_img pic10.png pic10 %}
</div>

##### AJAX set header
``` js
function sendTwitchApi(url, respProcess) {
	const request = new XMLHttpRequest()
	// loaded function
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			// process by callback function
			respProcess(request.responseText)
		}
		else {
			console.log('response :', request)
			console.log('response error :', request.status)
		}
	}
	
	// error 
	request.onerror = function() {
		console.log('error')
	}
	
	// true 表非同步
	request.open('GET', url, true)
	// add header
	request.setRequestHeader('Accept','application/vnd.twitchtv.v5+json');
	request.setRequestHeader('Client-ID','qvtuq71csrlv5ipxo1ljzgbzqn1okh');
	request.send()
}
```

##### 跨來源網路存取
+ 同源政策控制了兩個不同網域來源互動,當使用XMLHttpRequest。這些互動可分為以下三類:
	+ 跨來源寫(Cross-origin writes)通常被允許，例如有連結、重新導向以及表單送出。少數某些HTTP請求需要先導請求。
	+ 跨來源嵌入(Cross-origin embedding)通常被允許
	+ 跨來源讀取(Cross-origin read) 通常不被允許，不過通常可以藉由嵌入來繞道讀取，例如嵌入影像寬高讀取、嵌入程式碼或嵌入資源。
+ Preflight Request(預檢請求)
	有時會看到發兩次 request,因為只要發送請求到不同 origin 就會有 cors 的問題,所以 server 必須先確定 client 端是合法請求，也就是,Preflighted 要先發一次 request 去驗證是否合法 domain,成功了才能發真正的 request

#### JSONP(JSON with Padding) 第三種方式資料交換方式
+ img, scrip不受同源限制
+ 使用 script 傳回 json data 即可不受 同源策略 限制
+ 若 json 外部可包一個 function 即可方便處理,故要 server 配合
+ 某些 server 可指定 callback function(如 Twitch)

``` html
	<script>
		function receiveData (response) {
			console.log(response);
		}
	</script>
	<!-- <script src="https://www.game.com/api/user"></script> -->
	<script>
		receiveData(
		 {
			 name: 'Robert',
			 age: 30
		 }
		)
	</script>
```

#### 單向資料傳送(email 或 廣告 追蹤)
擺一張小而透明的檔案,若網頁被打開,server就知道 email/廣告 被打開 

### Window

#### method
##### alert()
Displays an alert dialog
``` js
// window 可省略
window.alert("hello!")
alert("hello2 !")
```


