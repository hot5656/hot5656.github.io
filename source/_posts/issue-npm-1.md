---
title: Node.js issue
categories: Front End
tags: 
	- node.js
	- issue
abbrlink: '2408'
date: 2021-03-12 15:40:06
---

## npm WARN npm does not support Node.js v14.16.0 (windows)
### 刪除目錄

``` bash
C:\Users\yourname\AppData\Roaming
目錄 npm and npm-cache
```

### 安裝npm

``` bash
npm install -g npm@latest 
```

## Cannot use import statement outside a module (node.js)
參考 [Node.js v16.0.0 document type](https://nodejs.org/api/packages.html#packages_type)

### package.json 加入 "type": "module",
``` json
{
  "name": "node_test",
  "version": "1.0.0",
  "description": "",
	"main": "index.js",
	"type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
	},
  "author": "",
  "license": "ISC",
  "dependencies": {
    "hexo": "^5.4.0",
    "hexo-theme-next": "^8.3.0",
    "lodash": "^4.17.21",
    "mathjs": "^9.3.2"
  }
}
```

## require is not defined (node.js)
package.json 移除 "type": "module",