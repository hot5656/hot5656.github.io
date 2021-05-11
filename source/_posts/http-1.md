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

#### [Lidemy HTTP Challenge](https://lidemy-http-challenge.herokuapp.com/start)
##### js code
``` js
// challenge.js
const request = require('request');
let parameter = ''
if (process.argv[2] !== undefined) {
	parameter = process.argv[2]
}

if (process.argv[2] === "book") {
	request(' https://lidemy-http-challenge.herokuapp.com/api/books/' + process.argv[3],
		function (error, response, body) {
			if (error) {
				console.log(error)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "addbook") {
	request.post({
			url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
			form: {
				name: process.argv[3],
				ISBN: process.argv[4]
			}
		},
		function (err, httpResponse, body) {
			if (err) {
				console.log(err)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "getbook") {
	request(' https://lidemy-http-challenge.herokuapp.com/api/books' + process.argv[3],
		function (error, response, body) {
			if (error) {
				console.log(error)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "delbook") {
	request.delete({
			url: 'https://lidemy-http-challenge.herokuapp.com/api/books/' + process.argv[3]
		},
		function (err, httpResponse, body) {
			if (err) {
				console.log(err)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "getme") {
	request.get('https://lidemy-http-challenge.herokuapp.com/api/v2/me', {
			'auth': {
				'user': 'admin',
				'pass': 'admin123'
			}
		},
		function (err, httpResponse, body) {
			if (err) {
				console.log(err)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "delbook2") {
	request.delete({
			url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/' + process.argv[3],
			'auth': {
				'user': 'admin',
				'pass': 'admin123'
			}
		},
		function (err, httpResponse, body) {
			if (err) {
				console.log(err)
				return
			}
			console.log(body)
		})
	return
} else if (process.argv[2] === "getbook2") {
	request('https://lidemy-http-challenge.herokuapp.com/api/v2/books' + process.argv[3], {
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
	return
} else if (process.argv[2] === "updatebook2") {
	console.log('https://lidemy-http-challenge.herokuapp.com/api/v2/books/' + process.argv[3])
	request.patch({
			url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/' + process.argv[3],
			'auth': {
				'user': 'admin',
				'pass': 'admin123'
			},
			form: {
				ISBN: '9981835423'
			}
		},
		function (err, httpResponse, body) {
			if (err) {
				console.log(err)
				return
			}
			
			// console.log(httpResponse)
			console.log(body)
		})
	return
} else if (process.argv[2] === "infobook2") {
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
	return
} else if (process.argv[2] === "bookv3") {
	request('https://lidemy-http-challenge.herokuapp.com/api/v3/' + process.argv[3], {
			headers: {
				Origin: 'https://lidemy.com'
			}
		}, 
		function (error, response, body) {
			if (error) {
				console.log(error)
				return
			}
			console.log(body)
			// console.log(response)
		})
	return
} 

// console.log(process.argv)
// console.log(parameter) 
// console.log('---------')
request('https://lidemy-http-challenge.herokuapp.com/' + parameter,
	function (error, response, body) {
		console.log(body)
	}
)
```

##### 流程
``` bash
Chrome --> https://lidemy-http-challenge.herokuapp.com/start
	第一關的 token 為：{GOGOGO}
	附註：所以第一關網址為 /lv1?token={GOGOGO}，不是 /lv1?token=GOGOGO，之後的關卡也是一樣
	如果你需要提示的話，在網址最後面加上 &hint=1 就會看到提示了，例如說：/lv1?token={GOGOGO}&hint=1
node challeng.js "lv1?token={GOGOGO}"
	啊...好久沒有看到年輕人到我這個圖書館了，我叫做 lib，是這個圖書館的管理員
	很開心看到有年輕人願意來幫忙，最近圖書館剛換了資訊系統，我都搞不清楚怎麼用了...
	這是他們提供給我的文件，我一個字都看不懂，但對你可能會有幫助：
	https://gist.github.com/aszx87410/3873b3d9cbb28cb6fcbb85bf493b63ba

	先把這文件放一旁吧，這個待會才會用到
	你叫做什麼名字呢？用 GET 方法跟我說你的 name 叫做什麼吧！
	除了 token 以外順便把 name 一起帶上來就可以了
node challeng.js "lv1?token={GOGOGO}&name=Robert"
	啊...原來你叫 Robert 啊！下一關的 token 是 {HellOWOrld}
node challeng.js "lv2?token={HellOWOrld}"
	那本書的 id 是兩位數，介於 54~58 之間，你可以幫幫我嗎？
	找到是哪一本之後把書的 id 用 GET 傳給我就行了。
node challeng.js book 55
	{"id":55,"name":"心向群山：人類如何從畏懼高山，走到迷戀登山","author":"羅伯特‧麥克法倫","ISBN":"2421169689"}
node challeng.js "lv2?token={HellOWOrld}&id=55"
	好像不是這本書耶...
node challeng.js "lv2?token={HellOWOrld}&id=56"
	啊！就是這本書，太謝謝你了。下一關的 token 為：{5566NO1}
node challeng.js "lv3?token={5566NO1}"
	真是太感謝你幫我找到這本書了！
	剛剛在你找書的時候有一批新的書籍送來了，是這次圖書館根據讀者的推薦買的新書，其中
	有一本我特別喜歡，想要優先上架。
	書名是《大腦喜歡這樣學》，ISBN 為 9789863594475。
	就拜託你了。
	新增完之後幫我把書籍的 id 用 GET 告訴我。
node challeng.js addbook 《大腦喜歡這樣學》 9789863594475
	{"message":"新增成功","id":"1989"}
node challeng.js "lv3?token={5566NO1}&id=1989"
	下一關的 token 為 {LEarnHOWtoLeArn}
node challeng.js "lv4?token={LEarnHOWtoLeArn}"
	我翻了一下你之前幫我找的那本書，發現我記錯了...這不是我朝思暮想的那一本。
	我之前跟你講的線索好像都是錯的，我記到別本書去了，真是抱歉啊。
	我記得我想找的那本書，書名有：「世界」兩字，而且是村上春樹寫的，可以幫我找到書的
	id 並傳給我嗎？
	世界 = %E4%B8%96%E7%95%8C
node challeng.js getbook "?q=%E4%B8%96%E7%95%8C"
	[{"id":2,"name":"當我想你時，全世界都救不了我","author":"肆一","ISBN":"5549173495"},{"id":27,"name":"從你的全世界路過","author":"張嘉佳","ISBN":"8426216529"},{"id":79,"name":"世界末日與冷酷異境","author":"村上春樹","ISBN":"9571313408"},{"id":90,"name":"文學的40堂公開課：從神話到當代暢銷書，文學如何影響我們、帶領我們理解這個世界","author":"約翰．薩德蘭","ISBN":"7978376866"}]
node challeng.js "lv4?token={LEarnHOWtoLeArn}&id=79"
	！下一關的 token 為 {HarukiMurakami}
node challeng.js "lv5?token={HarukiMurakami}"
	昨天有個人匆匆忙忙跑過來說他不小心捐錯書了，想要來問可不可以把書拿回去。
	跟他溝通過後，我就把他捐過來的書還他了，所以現在要把這本書從系統裡面刪掉才行。
	那本書的 id 是 23，你可以幫我刪掉嗎？
node challeng.js delbook "23"
	{"message":"\n咦...是刪掉了沒錯，但總覺得哪裡怪怪的，算了，先這樣吧！下一關的 token 為 {CHICKENCUTLET}\n"}
node challeng.js "lv6?token={CHICKENCUTLET}"
	我終於知道上次哪裡怪怪的了！

	照理來說要進入系統應該要先登入才對，怎麼沒有登入就可以新增刪除...
	這太奇怪了，我已經回報給那邊的工程師了，他們給了我一份新的文件：
	https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a

	這邊是帳號密碼，你先登入試試看吧，可以呼叫一個 /me 的 endpoint，裡面會給你一個 email。
	把 email 放在 query string 上面帶過來，我看看是不是對的。

	帳號：admin
	密碼：admin123
node challeng.js "getme"
	{"username":"admin","email":"lib@lidemy.com"}
node challeng.js "lv6?token={CHICKENCUTLET}&email=lib@lidemy.com"
	對對對，就是這個，這樣才對嘛！下一關的 token 為 {SECurityIsImPORTant}
node challeng.js "lv7?token={SECurityIsImPORTant}"
	那邊的工程師說系統整個修復完成了，剛好昨天我們發現有一本書被偷走了...
	這本書我們已經買第五次了，每次都被偷走，看來這本書很熱門啊。
	我們要把這本書從系統裡面刪掉，就拜託你了。

	對了！記得要用新的系統喔，舊的已經完全廢棄不用了。

	書的 id 是 89。
node challeng.js delbook2 "89"
	下一關的 token 為 {HsifnAerok}
node challeng.js "lv8?token={HsifnAerok}"
	我昨天在整理書籍的時候發現有一本書的 ISBN 編號跟系統內的對不上，仔細看了一下發現我當時輸入系統時 key 錯了。
	哎呀，人老了就是這樣，老是會看錯。

	那本書的名字裡面有個「我」，作者的名字是四個字，key 錯的 ISBN 最後一碼為 7，只要把最後一碼改成 3 就行了。
	對了！記得要用新的系統喔，舊的已經完全廢棄不用了。
node challeng.js getbook2 "?q=%E6%88%91"
	[{"id":2,"name":"當我想你時，全世界都救不了我","author":"肆一","ISBN":"5549173495"},{"id":3,"name":"我殺的人與殺我的人",
	"author":"東山彰良","ISBN":"9262228645"},{"id":7,"name":"你已走遠，我還在練習道別","author":"渺渺","ISBN":"3722233689"},
	{"id":9,"name":"你是我最熟悉的陌生人","author":"Middle","ISBN":"9765734253"},{"id":22,"name":"我輩中人：寫給中年人的情書
	","author":"張曼娟","ISBN":"7241428897"},{"id":38,"name":"我和我追逐的垃圾車","author":"謝子凡","ISBN":"7797349452"},{"i
	d":57,"name":"我的櫻花戀人","author":"宇山佳佑","ISBN":"2947749939"},{"id":60,"name":"你走慢了我的時間","author":"張西",
	"ISBN":"8811544334"},{"id":66,"name":"我是許涼涼","author":"李維菁","ISBN":"8389193464"},{"id":72,"name":"日日好日：茶道
	教我的幸福15味【電影書腰版】","author":"森下典子","ISBN":"9981835427"},{"id":90,"name":"文學的40堂公開課：從神話到當代暢
	銷書，文學如何影響我們、帶領我們理解這個世界","author":"約翰．薩德蘭","ISBN":"7978376866"},{"id":95,"name":"我想吃掉你的
	胰臟【電影珍藏版】","author":"住野夜","ISBN":"2615985356"},{"id":100,"name":"慢情書：我們會在更好的地方相遇嗎？","author
	":"林達陽","ISBN":"7418527246"}]

	{"id":72,"name":"日日好日：茶道教我的幸福15味【電影書腰版】","author":"森下典子","ISBN":"9981835427"}
node challeng.js updatebook2 "72"
	{"message":"\n希望之後他們能引進語音輸入系統，我就只要講講話就好。下一關的 token 為 {NeuN}\n"}
node challeng.js "lv9?token={NeuN}"
	API 文件裡面有個獲取系統資訊的 endpoint 你記得嗎？
	工程師跟我說這個網址不太一樣，用一般的方法是沒辦法成功拿到回傳值的。
	想要存取的話要符合兩個條件：
		1. 帶上一個 X-Library-Number 的 header，我們圖書館的編號是 20
		2. 伺服器會用 user agent 檢查是否是從 IE6 送出的 Request，不是的話會擋掉
	順利拿到系統資訊之後應該會有個叫做 version 的欄位，把裡面的值放在 query string 給我吧。
node challeng.js "lv9?token={NeuN}&hint=1"
	試著去想想看，伺服器是怎麼知道 request 是什麼版本的瀏覽器？
	只要能知道伺服器是怎麼檢查的，就有方法可以騙過它，原本的敘述裡面也有給關鍵字了
node challeng.js infobook2
	{"message":"success","version":"1A4938Jl7","owner":"lib","createdAt":"121290329301"}
node challeng.js "lv9?token={NeuN}&version=1A4938Jl7"
	限制這麼多都被你突破了，真有你的。要不要考慮以後來我們圖書館當工程師啊？下一關的 token 為 {duZDsG3tvoA}
node challeng.js "lv10?token={duZDsG3tvoA}"
	時間過得真快啊，今天是你在這邊幫忙的最後一天了。
	我們來玩個遊戲吧？你有玩過猜數字嗎？
	出題者會出一個四位數不重複的數字，例如說 9487。
	你如果猜 9876，我會跟你說 1A2B，1A 代表 9 位置對數字也對，2B 代表 8 跟 7 你猜對了但位置錯了。
	開始吧，把你要猜的數字放在 query string 用 num 當作 key 傳給我。
node challeng.js "lv10?token={duZDsG3tvoA}&num=1234"
	0A2B
node challeng.js "lv10?token={duZDsG3tvoA}&num=5678"
	1A0B
node challeng.js "lv10?token={duZDsG3tvoA}&num=5690"
	1A1B
node challeng.js "lv10?token={duZDsG3tvoA}&num=9056"
	1A1B
node challeng.js "lv10?token={duZDsG3tvoA}&num=1357"
	0A2B
node challeng.js "lv10?token={duZDsG3tvoA}&num=6789"
	0A2B
node challeng.js "lv10?token={duZDsG3tvoA}&num=9612"
	3A0B
node challeng.js "lv10?token={duZDsG3tvoA}&num=9613"
	很開心在這裡的時光能有你一起陪伴，讓我的生活不再那麼一成不變，很開心認識你，下次有機會再一起玩吧！
	The End，恭喜破關！
	author: huli@lidemy.com
	https://www.facebook.com/lidemytw/
	附註：
	原本遊戲只規劃到這邊，第十關就是最後一關。
	後來我有加了一些新關卡但難度較高，如果你還想挑戰看看，下一關的 token 為 {IhateCORS}
node challeng.js "lv11?token={IhateCORS}"
	嘿！很開心看到你願意回來繼續幫忙，這次我們接到一個新的任務，要跟在菲律賓的一個中文圖書館資訊系統做串連
	這邊是他們的 API 文件，你之後一定會用到：
	https://gist.github.com/aszx87410/0b0d3cabf32c4e44084fadf5180d0cf4
	現在就讓我們先跟他們打個招呼吧，只是我記得他們的 API 好像會限制一些東西就是了...
node challeng.js bookv3 hello
	您的 origin 不被允許存取此資源，請確認您是從 lidemy.com 送出 request。
node challeng.js bookv3 deliver_token
	我已經把運送要用的 token 給你囉，請你仔細找找
node challeng.js bookv3 logs
	此 request 不是來自菲律賓，禁止存取系統資訊。
node challeng.js bookv3 index
  <html>
    <h1>Library</h1>
    <p>Hello, here is the website for lidemy library</p>
	</html>
node challeng.js bookv3 hello
	Hello! 下一關的 token 為 {r3d1r3c7}
node challeng.js "lv12?token={r3d1r3c7}"
	打完招呼之後我們要開始送一些書過去了，不過其實運送沒有你想像中的簡單，不是單純的 A 到 B 而已
	而是像轉機那樣，A 到 C，C 才到 B，中間會經過一些轉運點才會到達目的地...算了，我跟你說那麼多幹嘛
	現在請你幫我把運送要用的 token 給拿回來吧，要有這個 token 我們才能繼續往下一步走
node challeng.js bookv3 deliver_token
	我已經把運送要用的 token 給你囉，請你仔細找找
node challeng.js "lv12?token={r3d1r3c7}&hint=1"
	你會發現你呼叫 API 以後它並沒有直接回傳結果，而是轉址到其他地方（或許中間還經歷不只一個地方）
	仔細研究這些地方吧！
	--> 用 Chrome debug mode 看 response {qspyz}
node challeng.js "lv13?token={qspyz}"
	太好了！自從你上次把運送用的 token 拿回來以後，我們就密切地與菲律賓在交換書籍
	可是最近碰到了一些小問題，不知道為什麼有時候會傳送失敗
	我跟他們反映過後，他們叫我們自己去拿 log 來看，你可以幫我去看看嗎？
	從系統日誌裡面應該可以找到一些端倪
node challeng.js bookv3 logs
	此 request 不是來自菲律賓，禁止存取系統資訊。
node challeng.js "lv13?token={qspyz}&hint=1"
	你有聽過代理伺服器 proxy 嗎？
電腦設定 菲律賓 proxy : 180.232.123.251:3128
Chrome --> https://lidemy-http-challenge.herokuapp.com/api/v3/logs
	[
	{ logType: 'token', value: '{SEOisHard}' }
	]
node challeng.js "lv14?token={SEOisHard}"
	跟那邊的溝通差不多都搞定了，真是太謝謝你了，關於這方面沒什麼問題了！
	不過我老大昨天給了我一個任務，他希望我去研究那邊的首頁內容到底是怎麼做的
	為什麼用 Google 一搜尋關鍵字就可以排在第一頁，真是太不合理了
	他們的網站明明就什麼都沒有，怎麼會排在那麼前面？
	難道說他們偷偷動了一些手腳？讓 Google 搜尋引擎看到的內容跟我們看到的不一樣？
	算了，還是不要瞎猜好了，你幫我們研究一下吧！
node challeng.js "lv14?token={SEOisHard}&hint=1"
	伺服器是怎麼辨識是不是 Google 搜尋引擎的？仔細想想之前我們怎麼偽裝自己是 IE6 的
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

