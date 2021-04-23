---
title: JavaScript 說明
abbrlink: '8730'
date: 2021-04-18 14:55:40
categories: Coding
tags:
	- javascript
mathjax: true
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
+ 種類
``` js
// 字串（string）
// 數字（number）
// 布林值（boolean）
// null
// undefined
// 物件（object）
// symbol
// dump type
console.log(typeof 'Hello World!')	// 'string'
console.log(typeof true) 						// 'boolean'
console.log(typeof 1234567) 				// 'number'
console.log(typeof null) 						// 'object'
console.log(typeof undefined) 			// 'undefined'
console.log(typeof { name: 'Jack' })// 'object'
console.log(typeof Symbol()) 				// 'symbol'
console.log(typeof function() {})		// 'function'
console.log(typeof [1, 2, 3]) 			// 'object'
console.log(typeof NaN) 						// 'number' NaN(not a number）
// 檢視物件到底是屬於哪個子型別 Object.prototype.toString
console.log(Object.prototype.toString.call([1, 2, 3])) 					// "[object Array]"
console.log(Object.prototype.toString.call({ name: 'Jack' })) 	// "[object Object]"
console.log(Object.prototype.toString.call(function sayHi() {}))// "[object Function]"
console.log(Object.prototype.toString.call(/helloworld/i)) 			// "[object RegExp]"
console.log(Object.prototype.toString.call(new Date())) 				// "[object Date]"
```

+ exampe 
``` js
// NaN : Not-A-Number
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

#### [number](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number)
``` js
// 最大整數 2^53 - 1 : Number.MAX_SAFE_INTEGER
console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER+1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER+2); // 9007199254740992
// number to string
var num = 99
console.log(String(num), typeof String(num))
console.log(num.toString(), typeof num.toString())
// 顯示固定長度小數
let value = 1.2
console.log(value.toFixed(2)) // 1.20
```

#### String
``` js
// ascii code 和 字元 互轉
let c = 'N'
let code = c.charCodeAt(0) // charCodeAt(0) : c 字串 index 0 轉成 ascii code 
console.log(String.fromCharCode(code  + 0x20)) // String.fromCharCode(code) : ascii 轉成字元
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
// repeat
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
```

#### 陣列 Array
``` js
var scores = [ 30, 70, 60, 50]
// var names = []
scores.push(100)
scores.push(80)
console.log(scores, scores.length)
// 二維陣列 宣告
let number = 3
let arr = []
// 宣告第二層
for (let i=0 ; i < number ; i++) {
	arr[i] = new Array()
}
// 給值
for (let i=0 ; i < number ; i++) {
	for (let j=0 ; j < number ; j++) {
		arr[i][j] = i+j
	}
}
console.log(arr)	// [ [ 0, 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ] ]
```

### Array process
#### map
``` js
// 簡單型式
let arr = [1, 2, 3]
function double(n) {
	return n * 2
}
let newArr =arr.map(double)
console.log(arr)
console.log(newArr)
// 詳細變化
var mapEmpty = people.map(function(item, index, array){
});
console.log(mapEmpty);    // [undefined, undefined, undefined, undefined]

var mapAgeThan5 = people.map(function(item, index, array){
  return item.age > 5;    // 比較大於五歲的
});
console.log(mapAgeThan5); // [true, true, false, false]

var mapAgeThan5_2 = people.map(function(item, index, array){
  // 錯誤示範
  if (item.age > 5) {
    return item;              // 回傳大於五歲的
  }
  return false;               // 別以為空的或是 false 就不會回傳
});

console.log(mapAgeThan5_2);   // [{name: 'Casper'...}, {name: 'Wang'...}, false, false]

var mapEat = people.map(function(item, index, array){
  if (item.like !== '蘿蔔泥') {
    return `${item.like} 好吃`;
  } else {
    return `${item.like} 不好吃`;
  }
});

console.log(mapEat);          // ["鍋燒意麵 好吃", "炒麵 好吃", "蘿蔔泥 不好吃", "蘿蔔泥 不好吃"]
```

#### indexOf/lastIndexOf
``` js
// 第一個找到之索引, 不存在傳回 -1
console.log([1, 2, 3, 1].indexOf(1))		// 0
// 最後一個找到之索引
console.log([1, 2, 3, 1].lastIndexOf(1))	// 3
```

###  [物件 object](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/Basics)
#### example
``` js
var person = {
	name : ['Bob', 'Smith'],
	age: 20,
	gender: 'mail',
	insterests: [ 'music', 'skiing'],
	bio: function(){
		alert(this.name[0] + ' ' + this.name[1] + ' is '+ this.age + ' years old. He likes ' + this.insterests[0]+ ' and '+ this.insterests[1]);
	},
	greeting: function() {
		alert('Hi! I\'m ' + this.name[0] + '.');
	}
}
// -- 點記法 (Dot notation) --
person.age
person.interests[1]
person.bio()
// -- 括弧記法 (Bracket notation) --
person['age']
person['name']['first']
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
** : 指數運算子 
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
2**3 : $2^3$


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

#### while  迴圈
``` js
// while
var n = 0
var x = 0
while (n < 3) {
    n++
    x += n
}
// do while
var i = 10
do {
    i += 1
} while (i < 5);
```


### 函數 
#### 基本型式
``` js
function multiply(num1,num2) {
	var result = num1 * num2
	return result
 }
  
console.log(multiply(4,7))
```

#### inline function
```
var func = function() { 
    //Your Code Here 
};
// example 
function filter(arr, callback) {
	result = []
	for(i=0 ; i < arr.length ; i++) {
		if (callback(arr[i])){
			result.push(arr[i])
		}
	}
	return result
}
// nums : local array
// target (local variable)
let newNum = filter(nums,function(element){
	return element != target
} )
```

#### callback 
``` js
let arr = [1, 2, 3]

function double(n) {
	return n * 2
}

function map(arr, callback) {
	let result = []
	for (let i = 0; i < arr.length; i++) {
		result[i] = callback(arr[i])
	}
	return result
}

console.log(map(arr, double))
```


### 內建物件
#### [Math](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math)
```js
// 亂數 介於0到1之間(包含 0，不包含1)
console.log(Math.random())
//四捨五入
console.log(Math.round(20.49))
console.log(Math.round(-20.49))
// 最大整數
console.log(Math.floor(5.95))
console.log(Math.floor(-5.95))
// 平方 
console.log(Math.pow(10, 2)) // 100
// 3次方
console.log(Math.pow(3, 3))	// 27
// 開根號
console.log(Math.sqrt(49))			// 7
console.log(Math.pow(49, 0.5))	// 7
// 3次根號
console.log(Math.pow(27, 1/3))		// 3
```

### Web API
#### console
``` js
var name = "Bob"
console.log("The name is : ", name)
```

#### process.stdout.write - 不換行列印
``` js
process.stdout.write('This is ')
process.stdout.write('a book') // This is a book
```


### 應用
#### require('readline') 用於自動測試
##### Code - test.js
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

##### input file - input.txt
``` bash
10 13
```

##### 執行
``` bash
$ cat input.txt | node test.js
23
```

#### NPSC 測試
``` bash
cat pa.in | node code.js | diff pa.out -
# 處理換行差異
cat pa.in | node code.js | diff --strip-trailing-cr pa.out -
```

### 參考
+ [MDN avaScript 指南](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide)
+ [你懂 JavaScript 嗎？#17 物件（Object）](https://cythilya.github.io/2018/10/24/object/)

