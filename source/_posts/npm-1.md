---
title: npm 說明
categories: Front End
tags:
  - npm
  - node.js
abbrlink: f085
date: 2021-03-12 15:39:26
---

### Commans
#### Dump version

``` bash
npm -v
```

#### ping npmjs registry

``` bash
npm ping
	npm notice PING https://registry.npmjs.org/
	npm notice PONG 0.358ms
```

#### Dump all npm installed models

``` bash
npm list
```
<!--more-->

#### 檢查 node_modules 有相關資安漏洞
``` bash
npm audit
```

#### 自動修正相關漏洞
``` bash
npm audit fix
```

#### 更新可更新的 node_modules
``` bash
npm update
```

#### 清理 node_modules 中不需要的檔案
``` bash
npm prune
```

#### install module
``` bash
# 安裝最新版本：
npm install hexo-theme-next@latest
# 指定特定版本：
npm install hexo-theme-next@8.0.0
# 安裝目前版本：
npm install hexo-theme-next
```

#### npx : 執行 project 安裝 module
``` bash
npx jest
```


#### 專案 npm 初始化
``` bash
# 會要求你輸入關於這個專案的相關資訊
npm init
# 專案全部載入預設資料
npm init -y
```

#### 本地、本機安裝(共用 module)
``` bash
npm install -g hexo-cli
or
npm install hexo-cli –g
```

#### 專案 modle 安裝
``` bash
# dependencies (依賴套件): 專案 production or build 之後仍然會使用的套件，例如 jQuery、swiper 等等套件
npm install --save hexo-generator-feed
# devDependencies (開發依賴套件): devDependencies 就是只有在我們開發時，才會使用的套件，舉例來講 babel、esling 等
npm install --save-dev hexo-generator-feed
```

#### 移除套件
``` bash
npm uninstall -g [套件名稱]
```

#### 還原專案套件
``` bash
npm install
```

### run script
``` js
// index.js
let leftPad = require('left-pad')
// insert 0 before number 
console.log(leftPad(123, 10, '0'))
```

package.json
``` json
{
  "name": "js102",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
		"start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "left-pad": "^1.3.0"
  }
}
```

``` bash
$ npm run start

> js102@1.0.0 start
> node index.js

0000000123
```

### Unit test
#### call function test
``` js
// index.js
function repeat(str, times) {
	let result= ''
	for (let i=0 ; i<times ; i++) {
		result += str
	}
	return result
}

// test by code
console.log(repeat('a', 5) === 'aaaaa')
console.log(repeat('abc', 2) === 'abcabc')
console.log(repeat('1!a', 2) === '1!a1!a')
console.log(repeat('', 3) === '')
console.log(repeat('abc', 0) === '')
```

``` bash
$ node index.js
true
true
true
true
true
```

#### [jest test](https://jestjs.io/docs/getting-started)

##### example
jest 會自動找 xxx.test.js 測試 
``` js
// index.js
function repeat(str, times) {
	let result= ''
	for (let i=0 ; i<times ; i++) {
		result += str
	}
	return result
}

// export for test
module.exports = repeat
```

``` js
// index.test.js
let repeat = require('./index')

test('a 重複 5 次為 aaaaa', function() {
	expect(repeat('a', 5)).toBe('aaaaa')
})
```

``` bash
$ npx jest
 PASS  ./index.test.js
  √ a 重複 5 次為 aaaaa (3 ms)

  console.log
    true

      at Object.<anonymous> (index.js:14:9)

  console.log
    true

      at Object.<anonymous> (index.js:15:9)

  console.log
    true

      at Object.<anonymous> (index.js:16:9)

  console.log
    true

      at Object.<anonymous> (index.js:17:9)

  console.log
    true

      at Object.<anonymous> (index.js:18:9)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        4.857 s
Ran all test suites matching /index.test.js/i.
```

##### test by script

``` jsaon
  "scripts": {
		"start": "node index.js",
	  "test": "jest"
  },
```

``` bash
$ yarn run test
yarn run v1.22.10
$ jest
 PASS  ./index.test.js
  √ a 重複 5 次為 aaaaa (4 ms)

  console.log
    true

      at Object.<anonymous> (index.js:14:9)

  console.log
    true

      at Object.<anonymous> (index.js:15:9)

  console.log
    true

      at Object.<anonymous> (index.js:16:9)

  console.log
    true

      at Object.<anonymous> (index.js:17:9)

  console.log
    true

      at Object.<anonymous> (index.js:18:9)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.822 s
Ran all test suites.
Done in 4.23s.
```

##### test multi items

``` js
// index.test.js
let repeat = require('./index')

test('a 重複 5 次為 aaaaa', function() {
	expect(repeat('a', 5)).toBe('aaaaa')
})
test('1!a 重複 2 次為 1!a1!a', function() {
	expect(repeat('1!a', 2)).toBe('1!a1!a')
})
test('空字串 重複 3 次為 空字串', function() {
	expect(repeat('', 3)).toBe('')
})
test('abc 重複 0 次為 空字串', function() {
	expect(repeat('abc', 0)).toBe('')
})
```

``` bash
$ npm run test

> js102@1.0.0 test
> jest

 PASS  ./index.test.js
  √ a 重複 5 次為 aaaaa (5 ms)
  √ 1!a 重複 2 次為 1!a1!a (1 ms)
  √ 空字串 重複 3 次為 空字串 (1 ms)
  √ abc 重複 0 次為 空字串 (1 ms)

  console.log
    true

      at Object.<anonymous> (index.js:14:9)

  console.log
    true

      at Object.<anonymous> (index.js:15:9)

  console.log
    true

      at Object.<anonymous> (index.js:16:9)

  console.log
    true

      at Object.<anonymous> (index.js:17:9)

  console.log
    true

      at Object.<anonymous> (index.js:18:9)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.628 s
Ran all test suites.
```

#### TDD (Test-Driven Development) 測試驅動開發
先寫 test pattern 再寫 code

### npm package 
#### [mathjs](https://www.npmjs.com/package/mathjs)
``` js
// npm install mathjs
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
```

#### [lodash](https://www.npmjs.com/package/lodash)
``` js
// npm install lodash
var _ = require('lodash');
// 反轉陣列
var array = [1, 2, 3];
_.reverse(array);
console.log(array)
```

#### [left-pad](https://www.npmjs.com/package/left-pad)
``` js
// index.js
let leftPad = require('left-pad')
// insert 0 before number 
console.log(leftPad(123, 10, '0'))
```

#### [Request](https://www.npmjs.com/package/request) - Simplified HTTP client
``` bash
npm install request
```

``` js
const request = require('request');
request('https://github.com/hot5656/AboutMe', function (error, response, body) {
  console.error('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  // console.log('body:', body); 
});
```

``` bash
$ node request_1.js
error: null
statusCode: 200
```

#### [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
``` bash
npm install axios
``` 

#### jest
``` bash
yarn add --dev jest
```

#### [babel-node](https://babeljs.io/docs/en/babel-node)
1. 模擬 ES6 執行
2. 效率不好僅測試時使用
3. 使用 import 也是要設 "type": "module"

##### install 

``` bash
npm install --save-dev @babel/core @babel/node
```

##### add config file - .babelrc

``` bash
{
	"presents": ["Qbabel/preset-env"]
}
```

##### test

``` js
// utils.js
export function add(a, b) {
	return a + b
}
export const PI = 3.14 
```

``` js
// test1.js
import {add, PI} from './utils.js'
console.log(add(3, 5), PI)		// 8 3.14
```

``` bash
$ npx babel-node test1.js
8 3.14
```

### npm config
``` bash
# list config
npm config list
# set config 
npm config set proxy http://180.232.123.251:3128
npm config set https-proxy http://180.232.123.251:3128 
npm config set registry https://registry.npmjs.org/
# get config
npm config get proxy
npm config get https-proxy
npm config get registry
# delete config
npm config delete proxy 
npm config delete https-proxy 
npm config delete registry

npm install 
``` 
