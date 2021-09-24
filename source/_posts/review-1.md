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



