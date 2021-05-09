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

#### OS 
``` js
// test1.js
let os = require('os')
console.log(os.platform())
```

``` bash
$ node test1.js
win32
```

#### HTTP
``` js
// http_server1.js
let http = require('http');
let server = http.createServer(handleRequest)

function handleRequest(req, res){
	console.log(req.url)
	res.write('hello')
	res.end()
}

server.listen(5000);
```

``` bash
$ node http_server1.js
/
/favicon.ico
```

#### Proces
process存在於全域性物件上，不需要使用require()載入即可使用
``` js
// const process = require('process')
console.log(process.argv)
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

### HTPP server and client
#### [request](https://www.npmjs.com/package/request) - - Simplified HTTP client
##### install
``` bash
npm install request
```

##### show status
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

##### get body
``` js
const request = require('request');
request('https://github.com/hot5656/AboutMe', function (error, response, body) {
  // console.error('error:', error); 
  // console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
});
```

``` bash
$ command node request_1.js  > ho5656.html
```

##### shwo header
``` js
const request = require('request');
request('https://github.com/hot5656/AboutMe', function (error, response, body) {
	console.log(response.headers)
  // console.log('body:', body); 
});
```

``` bash
$ node request_1.js
{
  server: 'GitHub.com',
  date: 'Wed, 05 May 2021 07:45:16 GMT',
  'content-type': 'text/html; charset=utf-8',
  vary: 'X-PJAX, Accept-Encoding, Accept, X-Requested-With',
  'permissions-policy': 'interest-cohort=()',
  etag: 'W/"6c2b56ff86dccd4690557cb83915b549"',
  'cache-control': 'max-age=0, private, must-revalidate',
  'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
  'x-frame-options': 'deny',
  'x-content-type-options': 'nosniff',
  'x-xss-protection': '0',
  'referrer-policy': 'no-referrer-when-downgrade',
  'expect-ct': 'max-age=2592000, report-uri="https://api.github.com/_private/browser/errors"',
  'content-security-policy': "default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' uploads.g
ithub.com www.githubstatus.com collector.githubapp.com api.github.com github-cloud.s3.amazonaws.com github-production-re
pository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-u
ser-asset-6210df.s3.amazonaws.com cdn.optimizely.com logx.optimizely.com/v1/events wss://alive.github.com *.actions.gith
ubusercontent.com wss://*.actions.githubusercontent.com online.visualstudio.com/api/v1/locations insights.github.com; fo
nt-src github.githubassets.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; frame-src render.
githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github
-cloud.s3.amazonaws.com secured-user-images.githubusercontent.com/ *.githubusercontent.com; manifest-src 'self'; media-s
rc github.com user-images.githubusercontent.com/; script-src github.githubassets.com; style-src 'unsafe-inline' github.g
ithubassets.com; worker-src github.com/socket-worker-3f088aa2.js gist.github.com/socket-worker-3f088aa2.js",
  'set-cookie': [
    '_gh_sess=NI97SaBBGcExrVqC%2FAInwNqd%2FJ8kyr3QWl8aWLyXTQ02WCNaZnTA%2FBLbI9UUPfKJYc6dOc2J8Q9RObRql78r9q3D%2B5tLwpDh0j
a%2FGjn4WsjGm1XH1z7CWvkYyVQfOP%2FQx6n2pm95ePiwSwtITnj27BY7cteKvBzGlMKJNYqVuMzSXcxyMr9Tu4zVG99JDTU6oOOW1WQAPARk2t8Y%2F%2B
SLWBxcIAuEEAoBPH%2FoaBbI0G3IHtvvobWiCQodRvyeXJ30h0qui2ZQs8O8WNTsBdR4Jw%3D%3D--eZlEDQ1ebZKKm2Jh--H8LZRSxWEwmES%2F54qujq%2
Fw%3D%3D; Path=/; HttpOnly; Secure; SameSite=Lax',
    '_octo=GH1.1.1400842276.1620200716; Path=/; Domain=github.com; Expires=Thu, 05 May 2022 07:45:16 GMT; Secure; SameSi
te=Lax',
    'logged_in=no; Path=/; Domain=github.com; Expires=Thu, 05 May 2022 07:45:16 GMT; HttpOnly; Secure; SameSite=Lax'
  ],
  'accept-ranges': 'bytes',
  'transfer-encoding': 'chunked',
  'x-github-request-id': 'F317:1E82:12B4AA:163825:60924D0B',
  connection: 'close'
}
```

#### [http-server](https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_server) - node.js  內含
##### example
``` js
// http_server1.js
let http = require('http');
let server = http.createServer(handleRequest)

function handleRequest(req, res){
	console.log(req.url)
	res.write('hello')
	res.end()
}

server.listen(5000);
```

``` bash
$ node http_server1.js
/
/favicon.ico
```

<div style="width:300px">
	{% asset_img pic1.png pic1 %}
</div>

##### example 2
``` js
// http_server1.js
let http = require('http');
let server = http.createServer(handleRequest)

function handleRequest(req, res){
	console.log(req.url)
	if (req.url === '/') {
		res.write('welcome')
		res.end()
		return
	} else if (req.url === '/hello') {
		res.write('hello')
		res.end()
		return
	}else if (req.url === '/redirect') {
		res.writeHead(200, {
			'name': 'Robert'
		})
		res.end()
		return
	}else if (req.url === '/redirect2') {
		res.writeHead(302, {
			'location': '/hello'
		})
		res.end()
		return
	}
	res.writeHead(404)
	res.end()
}

server.listen(5000)
```

``` bash
$ node http_server1.js
/
/hello
/redirect
/new
/redirect2
```

<div style="width:300px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="width:300px">
	{% asset_img pic3.png pic3 %}
</div>

<div style="width:650px">
	{% asset_img pic4.png pic4 %}
</div>

<div style="width:650px">
	{% asset_img pic5.png pic5 %}
</div>

<div style="width:650px">
	{% asset_img pic7.png pic7 %}
</div>

因 Chrome 使用 network monitor 有問題, 改用 Brave 正常
<div style="width:700px">
	{% asset_img pic6.png pic6 %}
</div>

看不到 network monitor 是因為選JS(應選All)
總是有 util.js 和 pagejs.js 是因為 chrome 安裝了 SmartPKI 多憑證安控模組擴充套件
<div style="width:650px">
	{% asset_img pic8.png pic8 %}
</div>









