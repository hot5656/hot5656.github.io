---
title: JavaScript 說明
abbrlink: '8730'
date: 2021-04-18 14:55:40
categories: Coding
tags:
	- javascript
---

### 基本
#### 註解
``` javascript
// This is a comment

/* 
	..... 
	多行註解 
	.....
*/
```

<!--more-->

### 變數 variable
#### 型態
``` js
var age = 20
// 區域變數
let temp = 10
// variable undifined
var total
console.log(total)
// variable not difined 
console.log(money)
// varibale 型態
// bollean, number, string
// object, undefined, function
console.log('type true', typeof true)
console.log('type 30', typeof 30)
console.log('type 0.5', typeof 0.5)
console.log('type "hello"', typeof 'hello')
console.log('type "30"', typeof '30')

console.log('type [1]', typeof [1])
console.log('type {a:1}', typeof {a:1})
console.log('type null', typeof null)
console.log('type underined', typeof underined)
console.log('type function', typeof function(){})

// result 
  type true boolean
  type 30 number
  type 0.5 number
  type "hello" string
  type "30" string
  type [1] object
  type {a:1} object
  type null object		// It's more special
  type underined undefined
  type function function
```

#### number
``` js
// 最大整數 2^53 - 1 : Number.MAX_SAFE_INTEGER
```

#### String
``` js
// string split to array
var line = "aa bb cc"
console.log(line.split(' '))
// string to integer
var tmp = '10'
var num1 = parseInt(tmp)
console.log(typeof num1)
// string to number
var tmp = '10'
var num1 = Number(tmp)
console.log(typeof num1)
```

#### 陣列 Array
``` js
var scores = [ 30, 70, 60, 50]
// var names = []
scores.push(100)
scores.push(80)
console.log(scores, scores.length)
```

### 運算式與運算子
#### == 與 === (=== 也比較型態,建議全用 ===)
``` js
console.log("0=='0'", 0=='0')
console.log("0==='0'", 0==='0')
console.log("12=='12'", 0=='12')
console.log("12==='12'", 0==='12')
console.log("0==''", 0=='')
console.log("0===''", 0==='')
console.log("0==null", 0==null)

// result
  0=='0' true
  0==='0' false
  12=='12' false
  12==='12' false
  0=='' true
  0==='' false
  0==null false
// object, 比較位置
console.log("[]===[]", []===[])
console.log("[1]===[1]", [1]===[1])
console.log("{}==={}'", {}==={})
console.log("{a: 1}==={a: 1}", {a: 1}==={a: 1})
// 真正的相等
var obj = {
	a: 1
}
var obj2 = obj
console.log("obj === obj2", obj === obj2)
obj2.a = 2 
console.log("obj=", obj)

// result
$ node test1.js
  []===[] false
  [1]===[1] false
  {}==={}' false
  {a: 1}==={a: 1} false
  obj === obj2 true
  obj= { a: 2 }
```

#### 邏輯運算子
```
# 定義
&& : AND
|| : OR
!  : NOT
# 奇異結果
3 && 10 --> 10
3 || 10 --> 3
0 || 10 --> 10
3 && 10 --> 10
false && 7 --> false
0 && 7 --> 0
```

#### 算術運算子
``` bash
# 定義
+ : 加
- : 減
* : 乘
/ : 除
% : 取餘數
# 簡短運算
a += 1
a -= 1
a *= 3
a /= 3
a++
a--
++a
--a
```

#### 位元運算子
``` bash
a & b	  : 位元 AND
a | b	  : 位元 OR
a ^ b	  : 位元 XOR
~ a	  : 位元 NOT
a << b	: 左移
a >> b	: 有號右移
a >>> b	: 以0填充的右移
```

### 條件式
#### if 條件式
``` javascript
var score = 85
if (score > 60) {
  console.log('及格')
} 
else {
  console.log('不及格')
}
# 多條件
if (score > 80) {
  console.log('很棒')
}
else if (score > 60) {
  console.log('及格')
} 
else {
  console.log('不及格')
}
```

#### switch case
``` js
var month = 2 

switch(month) {
	case 1 :
		console.log("一月")
		break
	case 2 :
		console.log("二月")
		break
	case 3 :
		console.log("三月")
		break
	default :
		console.log("未知")
		break
}
```

#### 三元運算子 Ternary
``` js
console.log( 10 > 5 ? 'bigger' : 'smaller')
```


### 迴圈
#### for  迴圈
``` js
for (let i=0 ; i<10 ; i++) {
	console.log(i)
}
```

### 函數 
``` js
function multiply(num1,num2) {
	var result = num1 * num2
	return result
 }
  
console.log(multiply(4,7))
```

### 內建物件
#### [Math](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math)
```js
Math.random()
Math.round()四捨五入
Math.floor()
```

### console object
#### console.log()


### require('readline') 用於自動測試
#### Code test.js
``` js
var readline = require('readline');

var lines = []
var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', function (line) {
  lines.push(line)
});

rl.on('close', function() {
  solve(lines)
})

function solve(lines) {
  var tmp = lines[0].split(' ')
  console.log(Number(tmp[0]) + Number(tmp[1]))
}
```

#### input data input.txt
``` bash
10 13
```

#### 執行
``` bash
$ cat input.txt | node test.js
23
```


### 參考
+ [MDN avaScript 指南](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide)