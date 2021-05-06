---
title: HTTP	API
abbrlink: 4c7e
date: 2021-05-06 15:53:14
categories: Front End
tags:
	- api
	- http
---

### 簡介
HTTP API(Application Programming interface) 即 Web API,串接 API 使用 API 提供者提供的 API

### API test
#### [REQ | RES](https://reqres.in/)
##### SINGLE USER
``` js
const request = require('request');
const process = require('process')
	
// console.log(process.argv)

// request('https://reqres.in/api/products/3', 
// 	function (error, response, body) {
// 		console.log(body)
// 	}
// );

request('https://reqres.in/api/products/' + process.argv[2], 
	function (error, response, body) {
		console.log(body)
	}
)
```

``` bas
$ node api1.js 2
{"data":{"id":2,"name":"fuchsia rose","year":2001,"color":"#C74375","pantone_value":"17-2031"},"support":{"url":"https:/
/reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}

RobertKao@ESTPENB-W022 MINGW64 /d/work/googleDrive/share/li/n1
$ node api1.js 3
{"data":{"id":3,"name":"true red","year":2002,"color":"#BF1932","pantone_value":"19-1664"},"support":{"url":"https://req
res.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
``` 

