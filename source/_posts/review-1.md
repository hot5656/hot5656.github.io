---
title: JavaScript review
abbrlink: 99fe
date: 2021-09-23 16:26:11
categories: Coding
tags: 
	- javascript 
	- review
---

### Entry 
#### 何謂 JavaScript
JavaScript 是一種直譯的程式語言,原本是設計給瀏覽器使用,現在已被應用到不同的環境,含 Server 也有使用到

<!--more-->

#### 何謂 ECMAScript
定義 JavaScript 的規格

#### == 和 === 的差異
== 比較値, === 比較値和資料型態

#### promise 是什麼
一種 JavaScript 的 object, 一般用於處理非同步的程序

#### Strict mode(嚴格模式) JavaScript 
JS 引擎會用嚴格的標準來讀你的 code,避免你寫出不穩定或不夠嚴謹的 code, 讓你寫出的 Javascript 更安全

#### null 和 undefined 的差別
undefined : 變數宣告但為賦值
null : 變數設定代表無值


#### AJAX
Asynchronous JavaScript and XML,AJAX向伺服器傳送要求取回必須的資料，並在客戶端採用JavaScript處理來自伺服器的回應.

#### synchronous(同步) 與 asynchronous(非同步的) 差異
同步為執行完成目前的程序再執行後面的程序,非同步則不等待執行完成繼續往後執行,如執行 AJAX 就要使用非同步,不然就有可能出現網頁卡住的現象

#### var, let 和 const 的差別
+ var 是 function scope, let 和 const 是 block scope
+ var,let 設定後可更改, const 不可更改

#### DOM(文件物件模型) 是什麼 
Document Object Model,提供了一個文件（樹）的結構化表示法，並定義讓程式可以存取並改變文件架構、風格和內容的方法。 
<div style="width:500px; background:#fff;">
	{% asset_img naw1u0v.png %}
</div>
-------------------

#### 資料型別 Primitiv(原始) and Object(物件) 
JavaScript 的資料型別有 Primitiv value(原始值) 和 Object(物件) 兩類
Primitiv value : 
+ Boolean type
+ Null type
+ Undefined type
+  Number type
+ BigInt type
+ String type
+ Symbol type

Object :
+ Function
+ Array
+ Date
+ ....

``` js
// Primitive
let value = 1
let value2 = 1
let value3 = value
// 存值,比較時比較值
console.log( value === value2)		// true
console.log( value === value3)		// true
// 修改時不會影響其他變數
console.log('value=',value,'value3=',value3)	// value= 1 value3= 1
value3=2
console.log('value=',value,'value3=',value3)	// value= 1 value3= 2

// Object
let fruits  = ['apple']
let fruits2 =  ['apple']
let fruits3 = fruits
// 存位置,比較時比較位置
console.log( fruits === fruits2)	// false
console.log( fruits === fruits)		// true
// 修改時會影響其他關聯變數
console.log('fruits=',fruits,'fruits3=',fruits3)	// fruits= [ 'apple' ] fruits3= [ 'apple' ]
fruits3.push("orange")
console.log('fruits=',fruits,'fruits3=',fruits3)	// fruits= [ 'apple' ] fruits3= [ 'apple', 'orange' ]
```




### Middle 
#### closure(閉包)
+ closure(閉包) 是一個 function 在另一個 function 的內部, 內部的 function 有 access function scope 的資料,雖然外部function 已 return,但還可以 aeecss 到 function 的資料
``` js
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
```

+ 應用 #1 - 複雜計算自動記憶不用重算
``` js
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

+ 應用 #2 - 隱藏資訊
``` js
function createWallet(init) {
	var money = init
	return {
		add: function(num) {
			money += num
		},
		sub: function(num) {
			money -= num
		},
		getMoney: function() {
			return money
		},
	}
}

var myWallet = createWallet(99)
myWallet.add(1)
console.log(myWallet.getMoney())	// 100
myWallet.sub(20)
console.log(myWallet.getMoney())	// 80
```

#### 函數原型內建函式 call, apply, and bind 的差別
+ call,apply 立即執行, bind 產生一個新函數提供之後使用(可更改 this 值)
+ call 的參數為個別傳入, apply 為 array 傳入
+ this 用不到可填入 null
``` js
'use strict'
function test(a, b, c) {
	console.log(this)
	console.log(a, b, c)
}
test(1, 2, 3)				// undefined 1 2 3
test.call(123, 1, 2, 3)		// 123 1 2 3
test.apply(123, [1, 2, 3])	// 123 1 2 3
var testBind = test.bind(123, 9 , 7)
testBind(99)	// 123 9 7 99
```

+ 應用 #1 - apply 填入 this
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
b.log()		// { a: 2, log: [Function: log] }
b.log.apply(a)	// 代入 a 為 this -> { a: 1, log: [Function: log] }
```

+ 應用 #2 - apply 參數轉為 array
``` js
console.log(Math.min(1, 2, 3, 4));	// 1
const arr = [1,2,3,4];
console.log( Math.min.apply(null,arr));	// 1
```

#### Event Loop(事件循環)
JavaScript 的 Call stack 是擺放待執行的程序,JavaScript 對於不能馬上執行的動作,會呼叫對應的Wep Api(如setTimeout, AJAX ...), 當 Web API 執行完後,會被堆放到callback queue,當 Call stack 已無待執行的程序,會順序從 callback queue 抓取程序到 Call stack 執行,順序從 callback queue 抓取程序到 Call stack 執行的流程及稱為 Event Loop

{% asset_img javascript-event-loop-step-1.png event-loop-step %}

#### currying(柯里化）function
+ currying function 指的是將多參數函數轉為順序接收單一參數的函數
+ 可簡化程式及提高程式的重用性
``` js
// discount function
function discount(price, discount) {
    return price * discount
}

// 10% discount
console.log(discount(500,0.1));		// 50
console.log(discount(1000,0.1));	// 100
console.log(discount(2000,0.1));	// 200
// 20% discount
console.log(discount(2000,0.2));	// 400

// discount currying function
function discountCurrying(discount) {
	return (price) => {
		return price *  discount;
	}
}

const tenPercentDiscouint = discountCurrying(0.1)
const twentyPercentDiscouint = discountCurrying(0.2)

// 10% discount by currying function
console.log(tenPercentDiscouint(500));		// 50
console.log(tenPercentDiscouint(1000));		// 100
console.log(tenPercentDiscouint(2000));		// 200
// 20% discount by currying function
console.log(twentyPercentDiscouint(2000));	// 400
```

+ General(通用) Currying Function
``` js
// General Currying Function
function curry(fn, ...args) {
    return (..._arg) => {
        return fn(...args, ..._arg);
    }
}

function multiply(a, b, c) {
    return a * b * c;
}

// multiply currying function
const multiplyBase2 = curry(multiply,2);
console.log(multiplyBase2(4,6)); 		// 48


function discount(price, discount) {
    return price * discount
}

// 10% discount by currying function
const tenPercentDiscouint = curry(discount,0.1);
console.log(tenPercentDiscouint(500));	// 50
```

#### Constructor(建構) Function
+ Constructor Function 可建立包含不同屬性(properties)的物件(object)
``` js
	function Person(name, age) {
	this.name = name;
	this.age = age;
	}
	Person.prototype.eat = function () {
		console.log(`${this.name} is eating.`)
	}
	Person.prototype.sleep = function () {
		console.log(`${this.name} is sleeping.`)
	}
	Person.prototype.walk =function () {
		console.log(`${this.name} is walking.`)
	}

	let Bob = new Person("Bob", 23);
	let Bill = new Person("Bill", 40);
```

#### JavaScript prototype (原型)
+ prototype 是 JavaScript function 的一個 屬性
+ prototype 內有一個屬性 constructor 會指到原函數,也可利用 constructor 產生新的物件,新產生的物件可以利用__proto__指回原函數的內部函數
<div style="width:700px; background:#fff;">
	{% asset_img 1_-BEeuzTDD3LajJF772fpOw.png function_prototype_block %}
</div>

``` js
function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.eat = function () {
	console.log(`${this.name} is eating.`)
}
Person.prototype.sleep = function () {
	console.log(`${this.name} is sleeping.`)
}
Person.prototype.walk = function () {
	console.log(`${this.name} is walking.`)
}
console.log("-- Person --")
console.log(Person.prototype.__proto__)								// [Object: null prototype] {}
console.log(Person.prototype.constructor) 						// [Function: Person]
console.log(Person.prototype.constructor === Person)	// true
console.log(Person.prototype) 
		// {
		// 	eat: [Function(anonymous)],
		// 	sleep: [Function(anonymous)],
		// 	walk: [Function(anonymous)]
		// }

let Bob = new Person("Bob", 23);
console.log("-- Bob --")
console.log(Bob.__proto__.constructor === Person)		// true
console.log(Bob.__proto__) 
		// {
		// 	eat: [Function(anonymous)],
		// 	sleep: [Function(anonymous)],
		// 	walk: [Function(anonymous)]
		// }
```

#### JavaScript prototype chain(原型鏈)
##### prototype chain 是 JavaScript 的 繼承機制
##### Object prototype : let apple = {} 與 let apple = new Object() 相同
``` js
let orange = {}
let apple = new Object();

console.log(Object.prototype.__proto__)						// null
console.log(Object.prototype)											// [Object: null prototype] {}
console.log(Object.prototype == apple.__proto__)	// true
console.log(Object.prototype.toString)						// [Function: toString]

console.log(Object.prototype == orange.__proto__)	// true
```
<div style="width:700px; background:#fff;">
	{% asset_img 1_jnQajbOpNPHWXKgHslrZxw.png %}
</div>

##### prototype chain : Function prototype + Object prototype
<div style="maxwidth:900px; background:#fff;">
	{% asset_img 1_DBHDoUyVxoTy76iFsGcOkw.png %}
</div>

##### prototype chain : Array + Object prototype
<div style="width:700px; background:#fff;">
	{% asset_img 1_fcoaBBBDhy8eCxqBvHU0jQ.png %}
</div>

##### prototype chain for all
<div style="maxwidth:1000px; background:#fff;">
	{% asset_img 1_Evoq9q8LCyxKteA9e-_31w.png %}
</div>


#### Memoization
+ Memoization是一種優化技術,透過儲存曾計算的的結果,來增加應用程序的執行

+ 一般費式數列遞迴計算(傳回第幾個費式樹列直)
``` js
function fibonacci(n) {
	console.log("count:", n);
	if (n <= 1) {
		return 1
	}

	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(` fibonacci${0} -->`, fibonacci(0));
console.log(` fibonacci${1} -->`, fibonacci(1));
console.log(` fibonacci${2} -->`, fibonacci(2));
console.log(` fibonacci${3} -->`, fibonacci(3));
console.log(` fibonacci${5} -->`, fibonacci(5));

// result ----
// >node fibonacci.js
// count: 0
//  fibonacci0 --> 1
// count: 1
//  fibonacci1 --> 1
// count: 2
// count: 1
// count: 0
//  fibonacci2 --> 2
// count: 3
// count: 2
// count: 1
// count: 0
// count: 1
//  fibonacci3 --> 3
// count: 5
// count: 4
// count: 3
// count: 2
// count: 1
// count: 0
// count: 1
// count: 2
// count: 1
// count: 0
// count: 3
// count: 2
// count: 1
// count: 0
// count: 1
//  fibonacci5 --> 8

```

+ Memoization費式數列(傳回第幾個費式樹列直)
``` js
function memolizedFibonacci(n) {
	let memo = {};
	function fibonacci(n) {
		if (memo[n]) {
			return memo[n];
		}

		console.log("count : ",n);

		if (n <= 1) {
		 	return memo[n] = 1;
		}
		return memo[n] = fibonacci(	n-1) + fibonacci(n-2);
	}

	return fibonacci;
}

let countFibonacci = memolizedFibonacci();
console.log(` fibonacci${0} -->`, countFibonacci(0));
console.log(` fibonacci${1} -->`, countFibonacci(1));
console.log(` fibonacci${2} -->`, countFibonacci(2));
console.log(` fibonacci${3} -->`, countFibonacci(3));
console.log(` fibonacci${5} -->`, countFibonacci(5));


// result ----
// >node fibonacci2.js
// count :  0
//  fibonacci0 --> 1
// count :  1
//  fibonacci1 --> 1
// count :  2
//  fibonacci2 --> 2
// count :  3
//  fibonacci3 --> 3
// count :  5
// count :  4
//  fibonacci5 --> 8
```

#### Higher-order function
+ 接收函式做為引數的函式(callback function) 或 回傳結果為函式的函式
+ map, filter 和 reduce 即為內建的Higher-order function(傳回函數) 

#### Event delegation(事件委派)
+ Event listen 放在父元素,而非個別的元素,如此可精簡程式及處理動態產生的元素

#### JavaScript asynchronous(非同步) operation 處理方式
+ Callback : 藉由參數（argument）傳入一個函式,以便完成某件程序後執行必要的程式
+ Promise : 
	promise 為 ES6 增加的 object(物件)
	他有三種狀態,
	>pending(初始狀態)
	>fulfilled(事件完成)
	>rejected(事件失敗)
	
	狀態的改變只有兩種可能 
	>	從 pending 變成 fulfilled 
	>	從 pending 變成 rejected

	一但狀態改變就會固定，永遠不會再改變狀態.
+ async/await :  ES2017(ES8) 增加的語法, 使非同步的程式看起來像是同步的程式

#### recursion(遞迴)
+ 透過函式重複呼叫自己最終得到計算結果的一種方法
+ 這是一個常用處理排序或遍歷(traversing)的方法

#### Hoisting (提升)
+ var 宣告提升,但賦值不會提升
+ let, const 有提升,但賦值前不能使用(所以外部宣告的變數不能使用)
+ TDZ (Temporal Dead Zone)暫時性死區: let、const 在設定值前不能使用
+ function 也會提升,所以可以將 function 寫在呼叫之後

``` js
// var 宣告提升,但賦值不會提升
function SayHello() {
	console.log(`Hello #1 ${name}.`); 		//Hello #1 undefined.
	// console.log(`Hello #1 ${guest}.`);	// guest is not defined
	var name = "Bob";
	console.log(`Hello #2 ${name}.`);			// Hello #2 Bob.
}
SayHello();

// let, const 有提升,但賦值前不能使用(所以外部宣告的變數不能使用)
// TDZ (Temporal Dead Zone)暫時性死區: let、const 在設定值前不能使用
let girl = "Mery";
const boy = "Bill"
function SayHello2() {
	console.log(`Hello #1 ${girl} ${boy}.`);  // Cannot access 'girl' before initialization, Cannot access 'boy' before initialization
	let girl = "Angel";								
	const boy = "Jack"
	console.log(`Hello #2 ${girl} ${boy}.`);
}
SayHello2();
```

#### JavaScript 的繼承
##### prototype 範例
``` js
// inheritance2.js
function Dog(name, color) {
	this.name = name;
	this.color = color;
}
Dog.prototype.getName = function () {
	return this.name;
}
Dog.prototype.getColor = function () {
	return this.color;
}

// DogSell 繼承 Dog
function DogSell(name, color, price) {
	// 繼承原型的參數
	Dog.call(this, name, color);
	this.price = price;
}
// 繼承原型的函數
DogSell.prototype = Object.create(Dog.prototype);
// 加入新的函數
DogSell.prototype.getInfo = function () {
	return `The dog name is ${this.getName()} and sell $${this.price}.`;
}

let dog1 = new Dog("Momo", "black");
console.log(`The dog #1 name is ${dog1.getName()} and color is ${dog1.getColor()}.`);
let dogsell1 = new DogSell("WaWa", "white", 1000);
console.log(dogsell1.getInfo());
```

##### class 範例
``` js
// inheritance.js
class Dog {
	constructor(name, color) {
		this.name = name;
		this.color = color;
	}
	getName() {
		return this.name;
	}
	getColor() {
		return this.color;
	}
}

// DogSell 繼承 Dog
class DogSell extends Dog {
	constructor(name, color, price) {
		super(name, color);
		this.price = price;
	}
	getInfo() {
		return `The dog name is ${this.getName()} and sell $${this.price}.`
	}
}

let dog1 = new Dog("Momo", "black");
console.log(`The dog #1 name is ${dog1.getName()} and color is ${dog1.getColor()}.`);
let dogsell1 = new DogSell("WaWa", "white", 1000);
console.log(dogsell1.getInfo());
```
















圖片 from [JavaScript Prototype and Prototype Chain explained](https://chamikakasun.medium.com/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04)