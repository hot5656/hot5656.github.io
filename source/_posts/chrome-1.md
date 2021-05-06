---
title: chrome Issue
abbrlink: 17a1
date: 2021-05-06 13:46:29
categories: Front End
tags:
	- chrome
---

### Chrome local test 使用 network monitor 有問題
#### 改用 Brave 正常
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

<!--more-->


``` bash
$ node http_server1.js
/redirect
```

<div style="width:650px">
	{% asset_img pic4.png pic4 %}
</div>

<div style="width:700px">
	{% asset_img pic6.png pic6 %}
</div>

#### 看不到 network monitor 是因為選JS(應選All)
總是有 util.js 和 pagejs.js 是因為 chrome 安裝了 SmartPKI 多憑證安控模組擴充套件
<div style="width:650px">
	{% asset_img pic8.png pic8 %}
</div>

