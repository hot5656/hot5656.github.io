---
title: Node.js 說明
categories: Front End
tags:
  - node.js
abbrlink: 13c7
date: 2021-03-12 15:39:11
---

### 基本
#### Dump version

``` bash
node -v
```

#### simple run js
``` js
// app.js
var msg = "hello World";
console.log(msg);
```

``` bash
node app.js
```

### [API](https://nodejs.org/docs/latest-v14.x/api/index.html) [中文文件](http://nodejs.cn/api/)

#### run module os 
``` js
// test1.js
let os = require('os')
console.log(os.platform())
```

``` bash
$ node test1.js
win32
```

### export my module 
#### export #1
``` js
// myMouble.js - myModule export #1
function double(n) {
	return n * 2
}
module.exports = double
```

``` js
// test1.js - myModule export #1
let myModule = require('./myModule')
console.log(myModule(3))
```

``` bash 
$ node test1.js
6
```

#### export #2 (常用)
``` js
// myMouble.js - myModule export #2
function double(n) {
	return n * 2
}

var obj = {
	double: double,
	triple: function(n) {
		return n * 3
	}
}

module.exports = obj
```

``` js
// test1.js - myModule export #2
let myModule = require('./myModule')
console.log(myModule.double(3), myModule.triple(5))
```

``` bash 
$ node test1.js
6 15
```


