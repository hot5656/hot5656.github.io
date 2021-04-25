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
#### [data structures - 資料型別與資料結構](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures)

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
// PI
console.log(Math.PI)							// 3.141592653589793
// 數字轉成字串
let num = 20
console.log(String(num), typeof String(num))				// 20 string
console.log(num.toString(), typeof num.toString())	// 20 string
// 數字轉成字串 (利用加法)
b = num + ''
console.log(b, typeof b) // 20 string
// 數字轉成 8 進制字串
console.log(num.toString(8), typeof num.toString())	// 24 string
// 顯示固定長度小數
let value = 1.2
console.log(value.toFixed(2)) // 1.20
// string to number
console.log(Number("10.211"))				// 10.211
// string to 整數
console.log(parseInt("10.211"))			// 10
// string(8進制) to 整數(10進制))
console.log(parseInt("20.1", 8))		// 16
// string to 浮點
console.log(parseFloat("20.111"))		// 20.111
```

#### [String](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String)
``` js
// ascii code 和 字元 互轉
let c = 'N'
let code = c.charCodeAt(0) // charCodeAt(0) : c 字串 index 0 轉成 ascii code 
console.log(String.fromCharCode(code  + 0x20)) // String.fromCharCode(code) : ascii 轉成字元
// 多字 ascii 轉 字串
console.log(String.fromCharCode(65, 66, 67)) // ABC
// string split to array
var line = "aa bb cc"
console.log(line.split(' '))	// [ 'aa', 'bb', 'cc' ]
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
// 轉小寫
console.log("Hello!".toLowerCase())	// hello!
// 轉大寫
console.log("Hello!".toUpperCase())	// HELLO!"abc".repeat(2)      // "abcabc"
// 找字串位置, -1 不存在
console.log("Hello!".indexOf('l'))	// 2
console.log("Hello!".indexOf('y'))	// -1
// 取代找字串
// 僅取代第一個
console.log("Hello!".replace('l', "!x"))	// He!xlo!
// 正規表達式(regexp)可取代全部
console.log("Hello!".replace(/l/g, "!x"))	// He!x!xo!
// trim 刪除前後空白
console.log("  Hello! ".trim() + "..")	// Hello!..
// string length1
console.log("Hello!".length)	// 6
// replace 
let str = "abc"
let str2 = str.replace("b","z")
console.log(str)	// abc
console.log(str2)	// azc
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
> 兩種改變迴圈的指令 : break, continue
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
} while (i < 5)
```


### 函數 
#### 基本型式
``` js
function multiply(num1,num2) {
	var result = num1 * num2
	return result
}
console.log(multiply(4,7))
// 另一種表示法
var multiply= function(num1,num2) {
	var result = num1 * num2
	return result
}
console.log(multiply(4,7)) // 28
```

#### 函數含 callback function 
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

console.log(map(arr, double)) // [ 2, 4, 6 ]
```

#### 匿名函數 anonymous function
``` js
let arr = [1, 2, 3]
function map(arr, callback) {
	let result = []
	for (let i = 0; i < arr.length; i++) {
		result[i] = callback(arr[i])
	}
	return result
}

// 匿名函數
console.log(map(arr, function(x){
		return x*3
	})
) // [ 3, 6, 9 ]
```

#### 參數(Parameter)與引數([Argument](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/arguments))
``` js
// a,b 參數(Parameter)
function add(a, b) {
	// js arguments 內容
	console.log(arguments)	// [Arguments] { '0': 2, '1': 3 }
	// js arguments[1]
	console.log(arguments[1])	// 3
	console.log(typeof arguments) // object
	return a + b
}
// 2, 3 與引數(Argument)
console.log(add(2, 3))	// 5
```


### 內建函數
#### [Math](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math)
```js
// 亂數 介於0到1之間(包含 0，不包含1)
console.log(Math.random())
//四捨五入
console.log(Math.round(20.49))		// 20
console.log(Math.round(-20.49))		// -20
// 取較大整數(正整數無條件進位)
console.log(Math.ceil(10.11))			// 11
console.log(Math.ceil(-10.11))		// -10
// 取較小整數(正整數無條件捨去)
console.log(Math.floor(10.98))		// 10
console.log(Math.floor(-10.98))		// -11
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

#### [Array](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array)
##### map
``` js
// 簡單型式
let arr = [1, 2, 3]
function double(n) {
	return n * 2
}
let newArr =arr.map(double)
console.log(arr)			// [ 1, 2, 3 ]
console.log(newArr)		// [ 2, 4, 6 ]
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

##### indexOf/lastIndexOf
``` js
// 第一個找到之索引, 不存在傳回 -1
console.log([1, 2, 3, 1].indexOf(1))		// 0
// 最後一個找到之索引
console.log([1, 2, 3, 1].lastIndexOf(1))	// 3
```

##### join
``` js
// 用某字串結合array成字串 
let arr = [1, 2, 3]
console.log(arr.join('!'))	// 1!2!3
```

##### filter
``` js
// filter 陣列內容設定條件成立即留下
let arr2 = [1, -9, 2, -1, 3]
console.log(arr2.filter(
	function(x) {
		return x > 0
	})
)		// [ 1, 2, 3 ]
```

##### slice
``` js
// 切下某些 array 內容
let arr3 = [1, 2, 3, 4, 5, 6]
// slice from 2 to end
console.log(arr3.slice(2))	// [ 3, 4, 5, 6 ]
//  slice from 2 to 4(before)
console.log(arr3.slice(2, 4))	// [ 3, 4 ]
```

##### splice (改變原陣列)
``` js
// array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
// 從哪裡開始, 刪除幾個 item, 插入其他內容
var months = ['Jan', 'March', 'April', 'June'];
// position 1 開始刪除 0 個
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);		// [ 'Jan', 'Feb', 'March', 'April', 'June' ]
// position 4 開始刪除 1 個
months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);	// [ 'Jan', 'Feb', 'March', 'April', 'May' ]
// position 3 開始刪除 1 個
months.splice(3, 1 );
// delete 1 element at index 3
console.log(months);	// [ 'Jan', 'Feb', 'March', 'May' ]
```

##### sort (改變原陣列)
``` js
// 文字排序
const months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);	// [ 'Dec', 'Feb', 'Jan', 'March' ]
// 數字也用近似文字方式排列
const array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);	// [ 1, 100000, 21, 30, 4 ]
// 數字排列 flow 1(小排到大)
// 相等 return 0, 不換位置 -1, 換位置 1 (正數換位置)
// b (positionnow : start from value 1), a(position now+1 : start from value 100000) 
// array1.sort( function(a, b) {
// 	if (a === b) return 0
// 	if (b > a) return -1
// 	return 1
// })
// console.log(array1);	// [ 1, 4, 21, 30, 100000 ]
// 數字排列 flow 2(小排到大)
// (正數換位置)
array1.sort( function(a, b) {
	// return (b < a) ? 1 :　-1 
	return a - b 
})
console.log(array1);	// [ 1, 4, 21, 30, 100000 ]
```

##### reverse (改變原陣列)
```
const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);  // array1: [ 'one', 'two', 'three' ]
const reversed = array1.reverse();
console.log('reversed:', reversed);	// reversed: [ 'three', 'two', 'one' ]
// Careful: reverse is destructive -- it changes the original array.
console.log('array1:', array1);	// array1: [ 'three', 'two', 'one' ]
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

