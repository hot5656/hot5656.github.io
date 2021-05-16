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

## process 參數含 & 要加 " 才不會有問題
``` js
// index.js
console.log("---------")
console.log(process.argv[2])
```

``` bash
$ node index.js &01
[35] 3164
bash: 01: command not found

$ node index.js &
[36] 15224

$ node index.js "&01"
---------
&01
[35]+  Stopped                 winpty node.exe index.js
```

## process 參數含 ! 使用 " 會有問題 要改為 '
``` bash
node challeng.js "lv15?token={ILOVELIdemy!!!}"
	bash: !}: event not found

node challeng.js 'lv15?token={ILOVELIdemy!!!}'
	還真的是我猜的那樣...不過還是要謝謝你幫我們完成這麼多任務！
	......
```


## npm install 一直處於 sill install loadAllDepsIntoIdealTree

``` bash
# 不知何時設定 https-proxy, 刪除即 ok
npm config get https-proxy
  http://103.253.27.108:80/
npm config get proxy
  null
npm config delete https-proxy
npm config list
  ; "builtin" config from C:\Users\win10\AppData\Roaming\npm\node_modules\npm\npmrc
  prefix = "C:\\Users\\win10\\AppData\\Roaming\\npm"
  ; "cli" config from command line options
  omit = []
  user-agent = "npm/7.6.3 node/v14.17.0 win32 x64"
  ; node bin location = D:\app\nodejs\node.exe
  ; cwd = D:\work\git\test-npm
  ; HOME = C:\Users\win10
  ; Run `npm config ls -l` to show all defaults.
```

