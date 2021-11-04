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
> ECMA-262是定義了Javascript的核心規範
#### 註解 and Hello World
``` javascript
// This is a comment

/* 
	..... 
	多行註解 
	.....
*/

var str = 'Hello world!';
console.log(str);		// Hello world!
```

<!--more-->

#### import module
``` js
// require 
var maths = require("mathjs");
console.log(maths.round(maths.e, 3))	// 2.718
console.log(maths.log(10000, 10))			// 4
// import 
import {
  atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt
} from 'mathjs'
console.log(round(e, 3))				// 2.718
console.log(log(10000, 10))			// 4
// import 單一的物件、變數重新賦予名稱
import { fn as newFn } from './module.js';
// 全部匯入
import * as name from './module.js';
// 匯入 default export 並賦予 fn 的名稱
// 匯入全部的 named export，並給賦予至 named 的物件上
import fn, * as named from './defaultModule.js';
```

#### require() vs import()
+ require() 是 node.js 內含函數
+ require() 執行 然後 return 
``` js
var myVar = require('http') 						//to use built-in modules
var myVar2 = require('./myLocaModule') 	// to use local modules

// example for require - demo_module.js
var http = require('http');
var dt = require('./myfirstmodule');
// 'Content-Type': 'text/html;charset=utf-8' 修正中文亂碼
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);

// myfirstmodule.js
exports.myDateTime = function () {
  return Date();
};
```

+ import()/export() 為 ES6 新語法, 若含.json 文件類型則不能使用
+ &lt;script&gt; type=”module” 也不能使用
+ require() 可擺於任何地方,import() 擺於程式最前面
``` js
var myVac = import("module-name");

// example for import
// app.js
import {add, PI} from './utils.js'
console.log(add(3, 5), PI)		// 8 3.14
// utils.js
export function add(a, b) {
	return a + b
}
export const PI = 3.14 
```

#### Hoisting (提升)
##### example
``` js
// not defined
console.log(b) // ReferenceError: b is not defined
// 僅宣告提升,不含賦值
console.log(a) // undefined, 不是 is not defined
var a =10
// hoisting 優先順序 function > parameter > var
// 優先順序 parameter > var
function test(v){
	console.log(v)
	var v = 3
}
test(10)
// 優先順序 function > parameter > var
function test3(v){
	console.log(v)		// [Function: v]
	var v = 3
	function v() {
		return 100
	}
}
test3(10)
// let 和 const 的 hoisting, TDZ（Temporal Dead Zone）暫時死區
// let 有 hoisting, 但賦值前不能使用
// 如果在宣告變數之前使用變數，這個變數就是存在「暫時死區」中無法存取！這時候使用它就會報錯 ReferenceError
var a2 = 10
function test2() {
	console.log(a2)		// ReferenceError: Cannot access 'a' before initialization
	let a2 = 2
}
test2()
```

##### 原理
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

> EC(Execution Contexts)
> VO(variable object)
> AO(activation object)

#### Closure (閉包)
##### example 
``` js
// example #1
/*
test EC{
	AO {
		a : 10
		inner : function
	}
}

Global EC{}
	VO {
		func : function --> test.inner
	}
}
*/
function test() {
	var a = 10
	function inner() {
		a++
		console.log(a)
	}
	return inner
}
var func = test()
func()	// 11
func()	// 12
func()	// 13
// example #2
/*
innerEC{
	AO {
		arguments
	},
	scopeChain : [innerEC.AO, testC.scopeChain]
							=[innerEC.AO, testEC.AO, globalEC.VO ]
}

testEC{
	AO {
		arguments,
		vTest : 20,
		inner : function
	},
	scopeChain : [testEC.AO, globalEC.scopeChain]
							=[testEC.AO, globalEC.VO]
}

globalEC{
	VO {
		v1 : 10,
		inner : function ,
		test: function
	},
	scopeChain : [globalEC.VO]
}
*/
var v1 = 10
function test() {
  var vTest = 20
  function inner() {
    console.log(v1, vTest) //10 20
  }
  return inner
}
var inner = test()
inner()	// 10 20
// example #3 - complex count
function complex(num) {
	console.log('calculate')
	return num*num*num
}

function cache(func) {
	var ans = {}
	return function(num) {
		if (ans[num]) {
			return ans[num]
		}
		ans[num] = func(num)
		return ans[num]
	}
}

console.log(complex(20))		// calculate 8000
console.log(complex(20))		// calculate 8000
console.log(complex(20))		// calculate 8000
const cacheComplex = cache(complex)
console.log(cacheComplex(20))		// calculate 8000
console.log(cacheComplex(20))		// 8000
console.log(cacheComplex(20))		// 8000
```

##### Closure 造成問題
``` js
// closure trigger issue
var arr = []
for (var i=0 ; i<5 ; i++){
	arr[i] = function() {
		return console.log(i)
	}
}
arr[0]()	// 5
arr[1]()	// 5
arr[2]()	// 5
arr[3]()	// 5
arr[4]()	// 5
// fix #1
var arr = []
for (var i=0 ; i<5 ; i++){
	arr[i] = consloeLogN(i)
}
function consloeLogN(n) {
	return function() {
		console.log(n)
	}
}
arr[0]()	// 0
arr[1]()	// 1
arr[2]()	// 2
arr[3]()	// 3
arr[4]()	// 4
// fix #2(定義立即執行 IIFEImmediately Invoked Function Expression）)
var arr = []
for (var i=0 ; i<5 ; i++){
	arr[i] = (function(number) {
							return function() {
								console.log(number)
							}
						})(i)
}
arr[0]()	// 0
arr[1]()	// 1
arr[2]()	// 2
arr[3]()	// 3
arr[4]()	// 4
// fix #3 - let
var arr = []
for (let i=0 ; i<5 ; i++){
	arr[i] = function() {
		return console.log(i)
	}
}
arr[0]()	// 0
arr[1]()	// 1
arr[2]()	// 2
arr[3]()	// 3
arr[4]()	// 4
```

##### Closure(閉包) 應用 - 隱藏資訊
``` js
function createWallet(init) {
	var money = init
	return {
		add: function(num) {
			money += num
		},
		deduct: function(num) {
			money -= num
		},
		// function 寫法 #1
		getMoney: function() {
			return money
		},
		// function 寫法 #2
		getInnerMoney() {
		return money
		}
	}
}

var myWallet = createWallet(99)
myWallet.add(1)
myWallet.deduct(20)
console.log(myWallet.getMoney())		// 80
console.log(myWallet.getInnerMoney())	// 80
```

#### 物件導向(Object Oriented Programming) and prototype
##### ES6 class
``` js
class Dog {
	constructor(name) {
		this.name = name
	}
	getName() {
		return this.name
	}
	sayHello() {
		console.log(this.name)
	}
}

var d1 = new Dog("Dog_1")
d1.sayHello()							// Dog_1
console.log(d1.getName())	// Dog_1
var d2 = new Dog("Dog_2")
d2.sayHello()							// Dog_2
```

##### ES5
``` js
// example #1 - 會產生重複相同之 function
function Dog(name) {
	var myName = name
	return {
		getName: function() {
			return myName
		},
		sayHello: function(){
			console.log(myName)
		}
	}
}

var d = Dog("abc")
var d2 = Dog("123")
d.sayHello()	// abc
console.log(d.sayHello === d2.sayHello) // false
// example #2 - 不會產生重複相同之 function
function Dog(name) {
	this.name = name
}

Dog.prototype.getName = function() {
	return this.name
}
Dog.prototype.sayHello = function() {
	console.log(this.name)
}

var d = new Dog("abc")			// 注意加 new
var d2 = new Dog("123")			// 注意加 new
d.sayHello()	// abc
console.log(d.sayHello === d2.sayHello) // true
```

##### prototype 原型鍊

+ Example
``` js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
  
Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}
  
var nick = new Person('nick', 18);
var peter = new Person('peter', 20);
nick.log();   
console.log(nick.log === peter.log) // true
// nick.__proto__ 指至 Person.prototype
console.log(nick.__proto__ === Person.prototype)	// true
// Person.prototype.__proto__ 指至 Object.prototype
console.log(Person.prototype.__proto__ === Object.prototype)	// true
// Object.prototype.__proto__ === null (到頂端)
console.log(Object.prototype.__proto__)	// null
// Person.__proto__ 指至 Function.prototype
console.log(Person.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__); //null
```

+ .hasOwnProperty() 判斷自身屬性是否存在
``` js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// Person.prototype add function log
Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}
  
var nick = new Person('nick', 18);
// hasOwnProperty() 檢查是否直屬屬性
console.log(nick.hasOwnProperty('log'))								// false
console.log(nick.__proto__.hasOwnProperty('log'))			// true
console.log(Person.prototype.hasOwnProperty('log'))		// true
// Object.prototype add function testObject()
Object.prototype.testObject = function() {
	console.log("Object :", 999)
}
// test call Object.prototype function
nick.testObject()					// Object : 999
// list all property
for (let key in nick) {
	if (nick.hasOwnProperty(key)) {
		console.log(`Property ${key}: ${nick[key]}`)
	}
	else {
			console.log(key); 
	}
}
// Property name: nick
// Property age: 18
// log
// testObject
```

+ instanceof 就是拿來判斷 A 是不是 B 的 instance
``` js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
  
Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}
  
var nick = new Person('nick', 18);
  
console.log(nick instanceof Person); // true
console.log(nick instanceof Object); // true
console.log(nick instanceof Array); // false
```

##### new 程序模擬
``` js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
  
Person.prototype.log = function () {
  console.log(this.name + ', age:' + this.age);
}
  
function newObj(Constructor, arguments) {
  var o = new Object();
  
  // 讓 o 繼承原型鍊
  o.__proto__ = Constructor.prototype;
  
  // 執行建構函式
  Constructor.apply(o, arguments);
  
  // 回傳建立好的物件
  return o;
}
  
var nick = newObj(Person, ['nick', 18]);
nick.log(); // nick, age:18
```

##### 繼承 Inheritance
``` JS
class Dog {
	constructor(name) {
		this.name = name
	}
	getName() {
		return this.name
	}
	sayHello() {
		console.log(this.name)
	}
}

class ColorDog extends Dog {
	constructor(name, color) {
		// 第一要先加 super()
		super(name)
		this.color = color
	}
	showColor() {
		console.log("color :", this.color)
	}
}

var d1 = new Dog("Dog_1")
d1.sayHello()							// Dog_1
var d2 = new ColorDog("Dog_2", "Yellow")
d2.sayHello()			// Dog_2
d2.showColor()		// color : Yellow
```

#### this
``` js
// 無用的 this 列出環境變數, node.js 和 web browser 會有差異
function test() {
	console.log(this)
}
test()
// 加入 'use strict' 嚴格模式 undefined
'use strict'
function test() {
	console.log(this)
}
test()			// undefined
// this 解析
'use strict'
const obj = {
	a: 123,
	inner: {
		test: function() {
			console.log(this)
		}
	}
}
const func = obj.inner.test
// 相當 func.call(undefined)
func()			// undefined
obj.inner.test() // { test: [Function: test] }
obj.inner.test.call(obj.inner)	// { test: [Function: test] }
```

#### call, apply and bind(可更改 this 值)
> apply 參數為 array 輸入
> bind 能預設 this 及 一些 參數
``` js
'use strict'
function test(a, b, c) {
	console.log(this)
	console.log(a, b, c)
}
test(1, 2, 3)								// undefined 1 2 3
test.call(123, 1, 2, 3)			// 123 1 2 3
test.apply(123, [1, 2, 3])	// 123 1 2 3
var testBind = test.bind(123, 9 , 7)
testBind(99)	// 123 9 7 99
```

``` js
// apply 
'use strict'
function log() {
	console.log(this)
}
var a = {a:1, log:log }
var b = {a:2, log:log }

log()		// undefined
a.log()		// { a: 1, log: [Function: log] }
b.log.apply(a)	// 代入 a 為 this

// bind
'use strict'
const obj = {
		a:1, 
		test: function(){
			console.log(this) 
		}
	}
obj.test()	// { a: 1, test: [Function: test] }
const func = obj.test
func()		// undefined
const bindTest = obj.test.bind(obj) // bind this from obj
bindTest() // { a: 1, test: [Function: test] }
const bindTest2 = obj.test.bind("swdwd") // bind this from a string
bindTest2() // swdwd
```

#### 箭頭函式中，this 指稱的對象在所定義時就固定了，而不會隨著使用時的脈絡而改變
``` js
// 使用 匿名函式
class Test{
	run() {
		console.log('run this', this)
		setTimeout( function() {
			console.log(this)
		}, 100)
	}
}

const t = new Test()	
t.run()				// run this Test {} , Timelot{ ...
// 使用 箭頭函式
class Test2{
	run() {
		console.log('run this', this)
		setTimeout( () => {
			console.log(this)
		}, 100)
	}
}

const t2 = new Test2()
t2.run()			// run this Test2 {}, Test2 {}
```

#### try...catch 陳述式
``` js
try {
  const bodyObj = JSON.parse(body)
  console.log(bodyObj.id, bodyObj.name)
} catch (err) {
  console.log('---------------')
  console.log(err)
  console.log('---------------')
} finally {
	// 都會執行
}
```

#### [throw](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
``` js
// 拋出例外
// throw expression
throw "Error2";   // 字串形態
throw 42;         // 數字形態
throw true;       // True/False
throw {toString: function() { return "我是物件!"; } }
// 拋出 Error 物件
throw new Error('Whoops!')
```


### 變數 variable

#### var, let and const 
``` js
// let and const 是在 ES6 才使用
// var 的 scope(作用域) 是 function
// let, const 的 scope(作用域) 是 block
```

#### [data structures - 資料型別與資料結構](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Data_structures)


+ 種類
``` js
// --- Primitive ( immutable value - 不可變)
// Boolean
// Null
// Undefined
// Number(數字)
// BigInt(這是一個實驗中的功能) : BigInt 是透過在一個數值後加上 n 或呼叫 BigInt()
// String(字串)
// Symbol（於 ECMAScript 6 新定義）
// ---
// Object (物件) - immutable value : array, function, date ...
// --- dump type 
console.log(typeof true) 						// boolean
console.log(typeof null) 						// object
console.log(typeof undefined) 			// undefined
console.log(typeof 1234567) 				// number
console.log(typeof 12n)							// bigint
console.log(typeof 'Hello World!')	// string
console.log(typeof Symbol()) 				// symbol
console.log(typeof { name: 'Jack' })// object
console.log(typeof [1, 2, 3]) 			// object
console.log(typeof function() {})		// function
console.log(typeof NaN) 						// number, NaN(not a number）
// check array
console.log(Array.isArray([]))	// True
// check NaN(唯一 自己不等於自己)
let num = Number("hello")
console.log(num)					// NaN
console.log(num === NaN)	// false
console.log(num === num)	// false
console.log(typeof num)		// number
// check undefined
let a 
console.log(a)					// undefined - 型態
console.log(typeof a)		// undefined - 字串
// check undefined 再處理
let b 
if ( typeof a !== 'undefined') {
	console.log("undefined", b+1)	// undefined NaN
}
else {
	console.log(b+1)
}
// check NaN
let num = Number("hello")
console.log(num, typeof num) 	// NaN number
console.log(num === NaN)		// false
console.log(isNaN(num))			// true
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
// slice 取出字串 
const str = 'The quick brown fox jumps over the lazy dog.';
console.log(str.slice(31)) 			// "the lazy dog."
console.log(str.slice(4, 19)) 	// "quick brown fox"
console.log(str.slice(-4)) 			// "dog."
console.log(str.slice(-9, -5))	// "lazy"
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

// array using function
var numbers = [3, 56, 2, 48, 5];
//Map -Create a new array by doing something with each item in an array.
let doubleNumber = numbers.map((number) => number * 2);
console.log(doubleNumber); //  [6, 112, 4, 96, 10]

//Filter - Create a new array by keeping the items that return true.
let filterNumber = numbers.filter((number) => number > 10);
console.log(filterNumber); // [56, 48]

//Reduce - Accumulate a value by doing something to each item in an array.
var sumNumber = numbers.reduce((previousValue, currentVlaue) => {
  console.log(`previous:${previousValue}, current:${currentVlaue}`);
  return previousValue + currentVlaue;
});
// previous:3, current:56
// previous:59, current:2
// previous:61, current:48
// previous:109, current:5
console.log(sumNumber); // 114

//Find - find the first item that matches from an array.
var firstNumber = numbers.find((number) => number > 10);
console.log(firstNumber); // 56

//FindIndex - find the index of the first item that matches.
var firstNumberIndex = numbers.findIndex((number) => number > 10);
console.log(firstNumberIndex); // 1

// Sort - sorts the elements of an array
// compareFunction(a, b): - 後面欄位
// > 0	sort b before a
// < 0	sort a before b
// === 0	keep original order of a and b
var numbers = [4, 2, 5, 1, 3];
var numbers2 = numbers.sort(function (a, b) {
  console.log(a, b);
  return a - b;
});
// 2 4
// 5 2
// 5 4
// 1 4
// 1 2
// 3 4
// 3 2
numbers[2] = 9;
console.log(numbers); // [1, 2, 9, 4, 5]
console.log(numbers2); // [1, 2, 9, 4, 5]
```

##### array item remove
``` js
// 使用 delete array 會造成 length 不變, 原來的值變成 undefined
delete jobs[i]
// splice 可真正將變數從 array 移除
jobs.splice(i,1)
```

##### array 合併
``` js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
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

##### for in
ES5標準,遍歷的是key
``` js
let arr = ['a','b','c','d',{'e':'e_value','f':'f_value'}]
for(let index in arr){
    console.log(index)
}		// 0,1,2,3,4
//---------------------------------------------------
//若想要用for in 取value，也是可以
for(let index in arr){
    console.log(arr[index])
} 	//a,b,c,d,{'e':'e_value','f':'f_value'}
//---------------------------------------------------
//for in 會遍歷自定義屬性
arr.name='myArray'
for(let index in arr){
    console.log(index)
} 	// 0,1,2,3,4,name
```

##### for of 
ES6標準,遍歷的是value
可使用的對象有Array、Map、Set、String、TypedArray、arguments
``` js
let arr = ['a','b','c','d',{'e':'e_value','f':'f_value'}]
for(let value of arr){
    console.log(value)
} //a,b,c,d,{'e':'e_value','f':'f_value'}
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


### 函式 
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

#### 函式含 callback function 
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

#### 匿名數式 anonymous function
``` js
let arr = [1, 2, 3]
function map(arr, callback) {
	let result = []
	for (let i = 0; i < arr.length; i++) {
		result[i] = callback(arr[i])
	}
	return result
}

// 匿名函式
console.log(map(arr, function(x){
		return x*3
	})
) // [ 3, 6, 9 ]
```

#### [箭頭函式 arrow function](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
``` js
// 只有一個參數時,括號才能不加:
// (單一參數) => { 陳述式; }
// 單一參數 => { 陳述式; }
//若無參數，就一定要加括號:
// () => { statements }
function Person(){
  this.age = 0;

  setInterval( () => {
    console.log(this.age++); 
  }, 1000);
}

var p = new Person(); // 0, 1 , 2 ...
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


### 內建函式
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

##### some - 來檢查陣列裡面是否有一些符合條件。只要有一個以上符合條件就會回傳 true
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
	<ul>
		<li>-111</li>
		<li>-222</li>
		<li>333</li>
		<li>-444</li>
	</ul>
	<script>
		const elements = document.querySelectorAll('li')
		/* elements 類陣列不能執行 .some() */
		// console.log(elements.some( function(item) {
		// 	return Num(item.innerText) > 0 
		// }))
		/* elements 類陣列,但非陣列,要轉成陣列才能執行 .some() */
		const isAnyPositive = [...elements].some( function(item) {
			console.log(item.innerText)
			return Number(item.innerText) > 0 
		})
		console.log(isAnyPositive) // true
	</script>
	</body>
</html>
```

##### every - 陣列裡面的所有東西都符合條件才會回傳 true


#### JSON
``` js
// JSON.stringify() - method converts a JavaScript value to a JSON string
console.log(JSON.stringify({ x: 5, y: 6 }))
// json to obj
const bodyObj = JSON.parse(body)
```

#### [Global](https://www.w3schools.com/jsref/jsref_obj_global.asp)
##### encodeURIComponent()/encodeURI() - encode a URI
``` js
var uri = "my test.asp?name=ståle&car=saab";
var res = encodeURI(uri);
// 含括編碼的字元較多, 使用此function
var res2 = encodeURIComponent(uri);
```

##### decodeURIComponent()/decodeURI() - decode a URI
``` js
var uri = "my test.asp?name=ståle&car=saab";
var enc = encodeURI(uri);
var dec = decodeURI(enc);
var res = enc + "<br>" + dec;
// 含括編碼的字元較多, 使用此function
var uri_enc = encodeURIComponent(uri);
var uri_dec = decodeURIComponent(uri_enc);
var res2 = uri_enc + "<br>" + uri_dec;
```


### [ES6](https://github.com/DrkSephy/es6-cheatsheet)
ECMAScript [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) 6th edition-June 2015, 所以稱為 ES6 或 ES2015

#### let 和 const
var 的 scope(作用域) 是 function
let, const 的 scope(作用域) 是 block
const 為常數,執行中不可更改

#### Template Literals (字串樣版)
使用兩個反引號 (back-tick ) ‵  ‵ 標示

##### 多行字串
``` js
// SE5
var str1 = 'string line 1 \n' +
					'string line 2'
console.log(str1)
// SE6
var str2 = `string line 1 
string line 2`
console.log(str2)
```

##### 嵌入變數
``` js
var name = 'Robert'
// SE5
console.log('Hello ' + name + ' now is ' + new Date()) 
// SE6 
console.log(`Hello ${name} now is ${new Date()}`)
```

#### Destructuring (解構)
``` js
// array
const arr = [1, 2, 3, 4]
let [first, second, third, fourth] = arr
console.log(second, third)		// 2 3
// object - 變數要與 obj 相同
const obj = {
	name: 'Nick',
	age: 30,
	address: 'Taiwan',
	family: {
		father: 'Bill'
	}
}
let { name, age, address, family } = obj
let { father } = family
console.log(name, address)		// Nick Taiwan
console.log(family, father)		// { father: 'Bill' } Bill
// function
function test({a,b}) {
	console.log(a)		// 1
}

test({
	a: 1,
	b:2
})
```

#### Spread Operator (展開) - 可用於複製 array 或 object 內容
``` js
// array
let arr = [1, 2, 3]
let arr2 = [4, 5, 6, ...arr] 
console.log(arr2)		// [ 4, 5, 6, 1, 2, 3 ]
// object 
var obj1 = {
	a: 1,
	b: 2
}
var obj3 = {
		...obj1,
		c: 3
}
console.log(obj3)	// { a: 1, b: 2, c: 3 }
// 相同變數名稱,後令押前令
var obj4 = {
	...obj1,
	b: 3
}
console.log(obj4)	// { a: 1, b: 3 }
// 複製內容
var obj01 = {
	a: 2,
	b: 4
}
var obj02 = {
	...obj01
}
console.log(obj01, obj02, obj01 === obj02)	// { a: 2, b: 4 } { a: 2, b: 4 } false
```

#### Rest Parameters (剩餘參數) - 不一定用 rest 可用其他變數名稱
``` js
// array - 不一定用 rest
var arr = [1, 2, 3, 4]
var [first, ...rest] = arr
var [first2, ...rest2] = arr
console.log(first, rest)		// 1 [ 2, 3, 4 ]
console.log(first2, rest2)	// 1 [ 2, 3, 4 ]
// object
var obj = {
	a: 1,
	b: 2,
	c: 3
}
var {a, ...obj2} = obj
console.log(obj2)			// { b: 2, c: 3 }
// function 
function add(...args) {
	console.log(args)					//  [ 1, 2 ]
	return args[0] + args[1]	//  3
}
console.log(add(1,2))
```

#### Default Parameters (預設值)
``` js
function repeat(str='hello', times = 5) {
	console.log(times)
	return str.repeat(times)
}
console.log(repeat())				// 5 hellohellohellohellohello
console.log(repeat('abc'))	// 5 abcabcabcabcabc
```

#### Arrow Function (箭頭函式)
``` js
const test = (n) => {
	return n
}
console.log(test(10))	// 10

var arr =[1, 2, 3, 4, 5]
/*
console.log(
	arr
	.filter(value => {
		return value > 1
	} )
	.map( value => {
		return value * 2
	})
)	// [ 4, 6, 8, 10 ]
*/
console.log(
	arr
		.filter(value => value > 1 )
		.map( value => value * 2)
)		// [ 4, 6, 8, 10 ]
```

#### import and export
##### ES5
``` js
// utils.js
function add(a, b) {
	return a + b
}
module.exports = add
```

``` js
// test1.js
var add = require('./utils')
console.log(add(3,5))
```

``` bash
$ node test1.js
8
```

##### ES6
Export 有幾種方式：
1. export function add(){}，使用 import {add} 引入
2. export { add }，與上面那種一樣
3. export default function add()，使用 import add 引入，不需要加大括號
如果想要用其他名字，可以用 as 取別名，例如說 export { add as addFunction }
可以用 import * as utils from 'utils' 把全部都 import 進來


使用 import package.json 要加 "type": "module"
``` json
{
  "name": "js102",
  "version": "1.0.0",
	"main": "index.js",
	"type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```

```js
// utils.js #1
export function add(a, b) {
	return a + b
}
export const PI = 3.14
// ...........
// utils.js #2
function add(a, b) {
	return a + b
}
const PI = 3.14
export {
	add,
	PI
}
// 可改名
// export {
// 	add as addFun ,
// 	PI
// }
// ...........
// utils.js #3 (export 加 default export 不用大括號)
export default function add(a, b) {
	return a + b
}
export const PI = 3.14
```

``` js
// test1.js #1
// import 應在 utils.js 含有之 function 或 常數
// 要 import ./utils.js, 不可 import ./utils
// import package.json 要加 "type": "module", 但使用 require 不能加 
import {add, PI} from './utils.js'
console.log(add(3, 5), PI)		// 8 3.14
// ...........
// test1.js #2 (import all)
import * as utils from './utils.js'
console.log(utils.add(3, 5), utils.PI)		// 8 3.14
// ...........
// test1.js #3 (export 加 default export 不用大括號)
import add, {PI} from './utils.js'
console.log(add(3, 5), PI)		// 8 3.14
```

### API
#### console
``` js
// normal 
var name = "Bob"
console.log("The name is : ", name)
console.log(("The name is : " + name)
// SE6 
console.log("The name is : ${name}", name)
```

#### process.stdout.write - 不換行列印
``` js
process.stdout.write('This is ')
process.stdout.write('a book') // This is a book
```

### JS庫
+ Modernizr : 一個開源的JS庫，它使得那些基於訪客瀏覽器的不同（指對新標準支援性的差異）而開發不同級別體驗的設計師的工作變得更為簡單

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
+ [ECMA-262](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
+ [該來理解 JavaScript 的原型鍊了](https://github.com/aszx87410/blog/issues/18)
+ [深入探討 JavaScript 中的參數傳遞](https://github.com/aszx87410/blog/issues/30)
+ [我知道你懂 hoisting，可是你了解到多深](https://github.com/aszx87410/blog/issues/34)
+ [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://github.com/aszx87410/blog/issues/35)
+ [淺談 JavaScript 頭號難題 this](https://github.com/aszx87410/blog/issues/39)
+ [你懂 JavaScript 嗎？物件（Object）](https://cythilya.github.io/2018/10/24/object/)
+ [JavaScript-Equality-Table](https://dorey.github.io/JavaScript-Equality-Table/)
+ [Debounce & Throttle](https://medium.com/@alexian853/debounce-throttle-%E9%82%A3%E4%BA%9B%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC%E6%87%89%E8%A9%B2%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E5%B0%8F%E4%BA%8B-%E4%B8%80-76a73a8cbc39)