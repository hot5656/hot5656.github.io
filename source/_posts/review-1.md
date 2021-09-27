---
title: JavaScript review
tags: Coding - javascript - review
abbrlink: 99fe
date: 2021-09-23 16:26:11
categories:
---

### closure(閉包)
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

### 函數原型內建函式 call, apply, and bind 的差別
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

### Event Loop(事件循環)
JavaScript 的 Call stack 是擺放待執行的程序,JavaScript 對於不能馬上執行的動作,會呼叫對應的Wep Api(如setTimeout, AJAX ...), 當 Web API 執行完後,會被堆放到callback queue,當 Call stack 已無待執行的程序,會順序從 callback queue 抓取程序到 Call stack 執行,順序從 callback queue 抓取程序到 Call stack 執行的流程及稱為 Event Loop

{% asset_img javascript-event-loop-step-1.png event-loop-step %}

圖片: from [JavaScript tutorial](https://www.javascripttutorial.net/javascript-event-loop/
)

### currying(柯里化）function
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
### JavaScript prototype ??? 待詳細
+ prototype 是 JavaScript 的 繼承機制

### Memoization
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

### Higher-order function
+ 接收函式做為引數的函式(callback function) 或 回傳結果為函式的函式
+ map, filter 和 reduce 即為內建的Higher-order function(傳回函數) 

### Event delegation(事件委派)
+ Event listen 放在父元素,而非個別的元素,如此可精簡程式及處理動態產生的元素

### JavaScript asynchronous(非同步) operation 處理方式
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

### recursion(遞迴)
+ 透過程式







