---
title: 瀏覽器 JavaScript 練習
abbrlink: 46b1
date: 2021-05-26 09:04:08
categories: Coding
tags:
	- javascript
	- browser
---

### 簡易密碼產生器

<!--more-->

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.password-generate, .gen-btn  {
			font-size: 24px;
		}
		.result {
			margin-top:10px;
			background: #e5e5e5;
		}
	</style>
</head>
<body>
	<div class="password-generate">
		<form action="">
			<div>
				<label>
					<input type="checkbox" name="en">英文
				</label>
			</div>
			<div>
				<label>
					<input type="checkbox" name="num">數字
				</label>
			</div>
			<div>
				<label>
					<input type="checkbox" name="sp">特殊符號
				</label>
			</div>
			<input class="gen-btn" type="submit" value="產生">
		</form>
		<div class="result">awfw</div>
	</div>

	<script>
		function getChar(name, chars) {
			if (document.querySelector('input[name=' + name + ']').checked) {
				return chars
			}
			return ''
		}
		document.querySelector('.gen-btn')
			.addEventListener('click', function(e){
				e.preventDefault()
				let availableChar = ''
				let result = ''
				availableChar += getChar('en', 'abcdefghijklmnopqrstuvwxyz')
				availableChar += getChar('num', '0123456789')
				availableChar += getChar('sp', '%~#(~)')
				if (availableChar.length > 0) {
					for(let i=0 ; i<10 ; i++) {
						result += availableChar[Math.floor(Math.random() * availableChar.length )]
					}
				}
				document.querySelector('.result').innerText = result
	})
	</script>
</body>
</html>
```

**使用 Attribute data-xx**
``` html
<body>
	<div class="password-generate">
		<form action="">
			<div>
				<label>
					<input type="checkbox" name="en" data-char="abcdefghijklmnopqrstuvwxyz">英文
				</label>
			</div>
			<div>
				<label>
					<input type="checkbox" name="num" data-char="0123456789">數字
				</label>
			</div>
			<div>
				<label>
					<input type="checkbox" name="sp" data-char="sp', '%~#(~)">特殊符號
				</label>
			</div>
			<input class="gen-btn" type="submit" value="產生">
		</form>
		<div class="result">awfw</div>
	</div>

	<script>
		document.querySelector('.gen-btn')
			.addEventListener('click', function(e){
				e.preventDefault()
				let availableChar = ''
				let result = ''
				const elements = document.querySelectorAll('input[type=checkbox]') ;
				for (let i=0 ; i < elements.length ; i++) {
					if (elements[i].checked) {
						availableChar += elements[i].getAttribute('data-char')
					}
				}
				if (availableChar.length > 0) {
					for(let i=0 ; i<10 ; i++) {
						result += availableChar[Math.floor(Math.random() * availableChar.length )]
					}
				}
				document.querySelector('.result').innerText = result
		})
</script>
```

### 動態表單通訊錄
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<style>
		.password-generate, .gen-btn  {
			font-size: 24px;
		}
		.result {
			margin-top:10px;
			background: #e5e5e5;
		}
	</style>
</head>
<body>

	<button class="btn-add">新增通訊錄</button>
	<div class="comm-list">
		<div class="row">
			姓名 : <input type="text" name="user-name">
			電話 : <input type="phone" name="phone">
			<button class="btn-del">刪除</button>
		</div>
	</div>
	<script>
		document.querySelector('.btn-add')
			.addEventListener('click', function(e){
				element = document.createElement('div')
				element.innerHTML = `
					姓名 : <input type="text" name="user-name">
					電話 : <input type="phone" name="phone">
					<button class="btn-del">刪除</button>
				`
				document.querySelector('.comm-list').appendChild(element)
		})
		document.querySelector('.comm-list')
			.addEventListener('click', function(e){
				if (e.target.classList.contains('btn-del')) {
					document.querySelector('.comm-list').removeChild(
						e.target.parentElement
					)
				}
			})
	</script>
</body>
</html>
```
