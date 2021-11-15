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

### module version
#### package.json
+ ^version: Compatible with version
鎖住第一碼(即A) 不得變更。如^1.2.2，則安裝範圍是>=1.2.2 且 <2.0.0。即須符合1.*.*。
+ &sim;version: Approximately equivalent to version
鎖住第二碼(即B) 不得變更。如&sim;1.2.2，則安裝範圍是>=1.2.2且<1.3.0。即須符合1.2.*。

``` json
{
  "name": "express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongodb": "^4.1.4",
    "mongoose": "^6.0.12",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.14",
    "uuid": "^8.3.2"
  }
}
```

#### 安裝特定版本
+ 查詢最後版本
``` bash
npm info express-validator version
  6.13.0
```

+ 查詢所有版本
``` bash
npm view express-validator versions
  [
    '0.1.0',   '0.1.1',  '0.1.2',  '0.1.3',  '0.2.0',  '0.2.1',
    '0.2.2',   '0.2.3',  '0.2.4',  '0.3.0',  '0.3.1',  '0.3.2',
    '0.4.0',   '0.4.1',  '0.5.0',  '0.6.0',  '0.7.0',  '0.8.0',
    '1.0.0',   '1.0.1',  '2.0.0',  '2.1.0',  '2.1.1',  '2.1.2',
    '2.2.0',   '2.3.0',  '2.4.0',  '2.5.0',  '2.6.0',  '2.7.0',
    '2.8.0',   '2.9.0',  '2.9.1',  '2.10.0', '2.11.0', '2.12.0',
    '2.12.1',  '2.12.2', '2.13.0', '2.14.0', '2.14.1', '2.14.2',
    '2.15.0',  '2.15.1', '2.16.0', '2.17.0', '2.17.1', '2.18.0',
    '2.19.0',  '2.19.1', '2.19.2', '2.20.1', '2.20.2', '2.20.3',
    '2.20.4',  '2.20.5', '2.20.6', '2.20.7', '2.20.8', '2.20.9',
    '2.20.10', '2.21.0', '3.0.0',  '3.1.0',  '3.1.1',  '3.1.2',
    '3.1.3',   '3.2.0',  '3.2.1',  '4.0.0',  '4.1.0',  '4.1.1',
    '4.2.0',   '4.2.1',  '4.3.0',  '5.0.0',  '5.0.1',  '5.0.2',
    '5.0.3',   '5.1.0',  '5.1.1',  '5.1.2',  '5.2.0',  '5.3.0',
    '5.3.1',   '6.0.0',  '6.0.1',  '6.1.0',  '6.1.1',  '6.2.0',
    '6.3.0',   '6.3.1',  '6.4.0',  '6.4.1',  '6.5.0',  '6.6.0',
    '6.6.1',   '6.7.0',  '6.8.0',  '6.8.1',  '6.8.2',  '6.9.0',
    '6.9.1',   '6.9.2',  '6.10.0', '6.10.1', '6.11.0', '6.11.1',
    '6.12.0',  '6.12.1', '6.12.2', '6.13.0'
  ]
```

+ 查詢現在安裝 ndoe module 版本
``` bash
npm list
  express@1.0.0 D:\work\git\li\project\ecommerce\express
  +-- body-parser@1.19.0
  +-- cookie-parser@1.4.5
  +-- dotenv@10.0.0
  +-- express@4.17.1
  +-- mongodb@4.1.4
  +-- mongoose@6.0.12
  +-- morgan@1.10.0
  +-- nodemon@2.0.14
  `-- uuid@8.3.2
```

+ 安裝特定版號 ndoe module
``` bash
# npm install [package-name]@[version-number]
npm install renovate@20.5.1
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

### npm&apos;s node module 
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

#### [lodash](https://www.npmjs.com/package/lodash) reference [document](https://lodash.com/docs#assignIn)
``` js
// npm install lodash
var _ = require('lodash');
// 反轉陣列
var array = [1, 2, 3];
_.reverse(array);
console.log(array)

// { 'a': 0 } 被 new Foo 蓋過, 再被 new Bar蓋過
function Foo() {
  this.a = 1;
}
function Bar() {
  this.c = 3;
}
Foo.prototype.b = 2;
Bar.prototype.d = 4;
_.assign({ 'a': 0 }, new Foo, new Bar);
// => { 'a': 1, 'c': 3 }
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

#### NODE_ENV [dotenv] - 環境變數集中在 env 檔
``` bash 
npm install dotenv --save
```

.env
```
CHRIS=chris
DB_HOST=DB_HOST
DB_PORT=DB_PORT
DB_USER=DB_USER
DB_PASS=DB_PASS
```

app.js
``` js
require('dotenv').config();
console.log(process.env.CHRIS); //chris
console.log(process.env["DB_HOST"]); //DB_HOST
console.log(process.env["DB_PORT"]); //DB_PORT
console.log(process.env["DB_USER"]); //DB_USER
console.log(process.env["DB_PASS"]); //DB_PASS
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

#### [request-debug](https://www.npmjs.com/package/request-debug) : monitor HTTP(S) requests performed by the request module
``` js
// npm install request-debug
// challeng-2.js
const request = require('request')
// 只要加入這一行,就可以 monitor
require('request-debug')(request)

request('https://lidemy-http-challenge.herokuapp.com/api/v3/hello',
function (error, response, body) {
	if (error) {
		console.log(error)
		return
	}
	console.log(body)
})
```

``` bash
$ node challeng-2.js
{
  request: {
    debugId: 1,
    uri: 'https://lidemy-http-challenge.herokuapp.com/api/v3/hello',
    method: 'GET',
    headers: { host: 'lidemy-http-challenge.herokuapp.com' }
  }
}
{
  response: {
    debugId: 1,
    headers: {
      server: 'Cowboy',
      connection: 'close',
      'x-powered-by': 'Express',
      'content-type': 'text/plain; charset=utf-8',
      date: 'Thu, 13 May 2021 07:27:38 GMT',
      'content-length': '93',
      via: '1.1 vegur'
    },
    statusCode: 200,
    body: '\n您的 origin 不被允許存取此資源，請確認您是從 lidemy.com 送出 request。\n'
  }
}

您的 origin 不被允許存取此資源，請確認您是從 lidemy.com 送出 request。
```

#### dotenv : env 設定
.env
``` js
PORT=8
```

*.js
``` js
require("dotenv").config();
```

#### nodemon : node 修改自動重啟
``` json
  "scripts": {
    "start": "nodemon app.js"
  },
```

#### [mongoose](https://www.npmjs.com/package/mongoose) : mongoDB object modeling tool to work in an asynchronous environment. Mongoose supports both promises and callbacks.
``` js
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");
var uri =
  "mongodb://robert2:{password}@cluster0-shard-00-00.bscvu.mongodb.net:27017,cluster0-shard-00-01.bscvu.mongodb.net:27017,cluster0-shard-00-02.bscvu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11cyyj-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// save data
const User = mongoose.model("User", userSchema);
new User(req.body).save;

// get data 
User.findOne({ email })
```

#### uuid : create uuid(Universally Unique Identifier) 通用唯一辨識碼
``` js
// v4 uuid 
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// v1 uuid
const { v1: uuidv1 } = require("uuid");
salt = uuidv1();
```` 

#### body-parser : Node.js body parsing middleware.
``` js
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// 可取出 req.body, 其他 middleware 也才可以 check body
// (req, res) => {
// console.log(req.body)
//  }
```

#### morgan : HTTP request logger middleware for node.js
print log in console for debug
``` js
// dev - status 會 show 不同顏色
// :method :url :status :response-time ms - :res[content-length]
POST /api/signup 400 101.068 ms - 86
// common - start log 
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]
::1 - - [08/Nov/2021:09:16:21 +0000] "POST /api/signup HTTP/1.1" 400 86
```

#### cookie : [express](http://expressjs.com/zh-tw/4x/api.html#res.cookie) 有提供,不需要用cookie-parser :  
``` js
// set cookie
res.cookie("t", token, { expire: new Date() + 9999 });

// clear cookie
res.clearCookie("t");
```

#### express-validator@5.3.1 :  express.js validate middlewares
+ 6.x 會有 "typeError: express Validator is not a function" error 
+ document 參考 6.x [express-validator](https://express-validator.github.io/docs/validation-chain-api.html#notempty)
+ ./app.js
``` js
// ./app.js
// express-validator
const expressValidator = require("express-validator");
// app
const app = express();
app.use(expressValidator()); // express-validator
```
+ ./routes/user.js
``` js
// ./routes/user.js
// valid
const { userSignupValidator } = require("../validator/index");

router.post("/signup", userSignupValidator, signup);
```
+ ./validator/index.js
``` js 
// ./validator/index.js
exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("password must conatin at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  // console.log(errors);
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
```

#### express-jwt : 驗證 JWT

#### jsonwebtoken :  產生 JWT token
``` js
const jwt = require("jsonwebtoken"); // to generate signed token
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
```

#### [crypto](https://nodejs.org/api/crypto.html#crypto-module-methods-and-properties) : node.js 提供,加密編碼


#### [formidable](https://www.npmjs.com/package/formidable) : parsing data, 特別是有關 file
``` js
const formidable = require("formidable");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    ......
  });
};
```

#### [cors](https://www.npmjs.com/package/cors) : enable cors 
``` js
// Simple Usage (Enable All CORS Requests)
var express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

// Enable CORS for a Single Route
var express = require('express')
var cors = require('cors')
var app = express()
 
app.get('/products/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for a Single Route'})
})
 
app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})
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
