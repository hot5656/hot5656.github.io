---
title: Express
abbrlink: '1691'
date: 2021-08-03 21:53:42
categories: Back End
tags:
	- express
	- node.js
---

### node.js create web server
``` js
// index.js
const http = require('http')
const server = http.createServer(handler)

function handler(req, res) {
	console.log(req.url)
	if (req.url === '/hello') {
		res.writeHead(200, {
			// 'Connect-Type': 'text/plain' - 沒有效果
			'Connect-Type': 'text/html'
		})
		res.write('<h1>hello!</h1>')
	} 
	else if ( req.url === '/bye'){
		res.write('bye')
	}
	else if ( req.url === '/new'){
		// 轉址
		res.writeHead(301, {
			'Location': '/bye'
		})
	}
	else {
		res.write('Invalid url')
	}
	res.end()
}

server.listen(5001)
```

<!--more-->

### Express server
#### Example #1
``` bash
# install express
npm install express
```

``` js
// index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) =>{
	res.send('Hello!')
})

app.get('/hello', (req,res) =>{
	res.send('Hello man!')
})

app.get('/bye', (req,res) =>{
	res.send('Bye!')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
``` 

#### Example #2 - MVC 
``` bash
# template engine --> ejs
# install 
npm install ejs
```
