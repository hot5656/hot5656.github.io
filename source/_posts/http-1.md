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
HTTP API(Application Programming interface) 即 Web API,串接 API 即使用 API 提供者提供的 API

<!--more-->

### API using QueryString 
<div style="width:650px">
	{% asset_img pic1.png pic1 %}
</div>



### API test
#### [REQ | RES](https://reqres.in/)
##### GET - SINGLE USER (Request)
``` js
// api1.js
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
		console.log(typeof body)
	}
)
```

``` bas
$ node api1.js 2
{"data":{"id":2,"name":"fuchsia rose","year":2001,"color":"#C74375","pantone_value":"17-2031"},"support":{"url":"https:/
/reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
string

$ node api1.js 3
{"data":{"id":3,"name":"true red","year":2002,"color":"#BF1932","pantone_value":"19-1664"},"support":{"url":"https://req
res.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
string
``` 

##### POST - CREATE (Request)
``` js
// api2.js
const request = require('request')

request.post(
	{
		url:'https://reqres.in/api/users', 
		form: {
			name:'Robert',
			job: 'engineer'
		}
	}, 
	function(error, response, body){ 
		console.log(body)
	}
)
```

``` bash
$ node api2.js
{"name":"Robert","job":"engineer","id":"806","createdAt":"2021-05-07T04:31:50.023Z"}
```

##### DELETE (Request)
``` js
// api2.js
const request = require('request')
const process = require('process')

request.delete(
	{
		url:'https://reqres.in/api/products/' + process.argv[2], 
	}, 
	function(error, response, body){ 
		console.log("status code : " + response.statusCode)
	}
)
```

``` bash
$ node api12.js 2
status code : 204
```

##### PATCH (Request)
``` js
// ap22.js
const request = require('request')
const process = require('process')

request.patch(
	{
		url:'https://reqres.in/api/products/2', 
		form: {
			name:'Robert'
		}
	}, 
	function(error, response, body){ 
		console.log("status code : " + response.statusCode)
		console.log(body)
	}
)
```

``` bash
$ node api22.js
status code : 200
{"name":"Robert","updatedAt":"2021-05-07T13:53:34.158Z"}
```



##### GET - SINGLE USER (axios)
``` js
// api3.js
const axios  = require('axios')
const process = require('process')
	
axios.get('https://reqres.in/api/products/' + process.argv[2])
	.then(function(response){
		console.log(response.data)
		console.log(typeof response.data)
	})
	.catch(function(error) {
		ConstantSourceNode.log(error)
	})
	.then(function(){
		// always executed
	})
```

``` bash
$ node api3.js  1
{
  data: {
    id: 1,
    name: 'cerulean',
    year: 2000,
    color: '#98B2D1',
    pantone_value: '15-4020'
  },
  support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
  }
}
object

$ node api3.js  2
{
  data: {
    id: 2,
    name: 'fuchsia rose',
    year: 2001,
    color: '#C74375',
    pantone_value: '17-2031'
  },
  support: {
    url: 'https://reqres.in/#support-heading',
    text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
  }
}
object
```

##### POST - CREATE (axios)
``` js
// api4.js
const axios  = require('axios')

axios.post('https://reqres.in/api/users', {
	name:'Robert',
	job: 'engineer'
})
.then(function (response) {
	console.log(response.data);
	console.log(typeof response.data)
})
.catch(function (error) {
	console.log(error);
})
```

``` bash
$ node api4.js
{
  name: 'Robert',
  job: 'engineer',
  id: '672',
  createdAt: '2021-05-07T06:09:59.647Z'
}
object
```

##### DELETE (axios)
``` js
// api5.js
const axios  = require('axios')
const process = require('process')

axios.delete('https://reqres.in/api/products/' + process.argv[2])
	.then(function(response){
		// console.log(response)
		console.log("status code : " + response.status)
	})
	.catch(function(error) {
		ConstantSourceNode.log(error)
	})
```

``` bash
$ node api5.js 2
status code :204
```

##### PATCH (axios)
``` js
// api6.js
const axios  = require('axios')

axios.patch('https://reqres.in/api/products/2', {
		name:'Robert',
	})
	.then(function(response){
		// console.log(response)
		console.log("status code : " + response.status)
		console.log(response.data)
	})
	.catch(function(error) {
		ConstantSourceNode.log(error)
	})
```

``` bash
$ node api6.js
status code : 200
{ name: 'Robert', updatedAt: '2021-05-07T07:39:29.788Z' }
```

#### [Twitch API v5](https://dev.twitch.tv/docs/v5)
##### [Get Top Games](https://dev.twitch.tv/docs/v5/reference/games#get-top-games)
``` js
const request = require('request')

request({
  url: 'https://api.twitch.tv/kraken/games/top?limit=20',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'just_test_id...'
  }
},
(error, response, body) => {
  const bodyObj = JSON.parse(body)
  for (let i = 0; i < bodyObj.top.length; i++) {
    console.log(bodyObj.top[i].viewers, bodyObj.top[i].game.name)
  }
})
```

``` bash
$ node hw4.js
361259 Just Chatting
250115 Resident Evil Village
229862 Grand Theft Auto V
125651 League of Legends
108203 Minecraft
96315 Call of Duty: Warzone
81721 VALORANT
77601 FIFA 21
...
```


### 資料格式
#### XML(Extensible Markup Language) 可延伸標示語言
``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <data>
    <id>1</id>
    <name>cerulean</name>
    <year>2000</year>
    <color>#98B2D1</color>
    <pantone_value>15-4020</pantone_value>
  </data>
  <support>
    <url>https://reqres.in/#support-heading</url>
    <text>To keep ReqRes free, contributions towards server costs are appreciated!</text>
  </support>
</root>
```

#### JSON
``` json
{
  "data":{
    "id":1,
    "name":"cerulean",
    "year":2000,
    "color":"#98B2D1",
    "pantone_value":"15-4020"
  },
  "support":{
    "url":"https://reqres.in/#support-heading",
    "text":"To keep ReqRes free, contributions towards server costs are appreciated!"
  }
}
```

#### [SOAP(Simple Object Access Protocol)](https://zh.wikipedia.org/wiki/%E7%AE%80%E5%8D%95%E5%AF%B9%E8%B1%A1%E8%AE%BF%E9%97%AE%E5%8D%8F%E8%AE%AE)


### RESETful
RESTful API，表示符合 REST(Representational State Transfer) 架構的 API 
RESTful API是一種設計風格，這種風格使API設計具有整體一致性

``` bash
# API 設計舉例
新增使用者 			POST 		/user
刪除使用者 			DELETE 	/user/n
查詢使用者 			GET			/user/n
更改使用者 			PATCH		/user/n
查詢使用者列表	  GET		 /users
```

### [User-Agent](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Headers/User-Agent)(browser)
``` js
request('https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info', {
		headers: {
			'X-Library-Number': '20',
			'User-Agent': 'MSIE 6.0'
		},
		'auth': {
			'user': 'admin',
			'pass': 'admin123'
		}
	},
	function (error, response, body) {
		if (error) {
			console.log(error)
			return
		}
		console.log(body)
	})
```

