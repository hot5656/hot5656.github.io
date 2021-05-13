---
title: 網路概念
abbrlink: dc7e
date: 2021-05-05 14:58:25
categories: 知識
tags:
	- network
	- http
---

### TCP/IP

#### 基本架構

<div style="width:650px">
	{% asset_img pic1.png pic1 %}
</div>

<!--more-->

<div style="width:650px">
	{% asset_img pic2.png pic2 %}
</div>

#### 內網 IP address
+ A類10.0.0.0    ~  10.255.255.255
+ B類172.16.0.0  ~  172.31.255.255
+ C類192.168.0.0 ~ 192.168.255.255


#### [常用 port](https://zh.wikipedia.org/wiki/TCP/UDP%E7%AB%AF%E5%8F%A3%E5%88%97%E8%A1%A8)
+ DHCP (Ports 67/68 + 546/547)：自動取得 IP
+ DNS (Port 53)：域名解析
+ FTP (Port 20/21)：文件傳輸協定
+ HTTP (Port 80)：超文件傳輸協定
+ HTTPS (Port 443 + 445)：超級文字傳輸安全協定
+ NTP (Port 123)：網路時間協定P,電腦時鐘與世界標準時間同步
+ POP3 (Port 110 + 995)：接收電郵的伺服器端口。
+ SMTP (Port 25)：寄送電郵的伺服器端口。
+ Telnet (Port 23)：遠端文字登錄模式

#### special IP address
+ 127.0.0.1 : 本機 address

### HTTP

#### url 中文編碼(Url Encode / Decode)
url 若含中文要轉為 UTF-8(8-bit Unicode Transformation Format) 


#### [HTTP version](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

#### [HTTP message](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)
[User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
+ [List of User Agents](https://developers.whatismybrowser.com/useragents/explore/)
+ [google User-Agent](https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers)

``` js
// GET 
request('https://lidemy-http-challenge.herokuapp.com/api/v2/sys_info', {
		headers: {
			'X-Library-Number': '20',
			'User-Agent': 'MSIE 6.0',
			Origin: 'https://lidemy.com'
		},
		'auth': {
			'user': 'admin',
			'pass': 'admin123'
		}
	},
	function (error, response, body) {
		console.log(body)
	})
// POST
request.post({
		url: 'https://lidemy-http-challenge.herokuapp.com/api/books',
		form: {
			name: process.argv[3],
			ISBN: process.argv[4]
		}
	},
	function (err, httpResponse, body) {
		console.log(body)
	})
// DELETE 
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
// PATCH
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
```


#### [HTTP method](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Methods)

+ GET	　  : 請求指定的頁面信息，並返回實體主體。
+ HEAD	  : 類似於get請求，只不過返回的響應中沒有具體的內容，用於獲取報頭
+ POST	  : 向指定資源提交數據進行處理請求（例如提交表單或者上傳文件）。 數據被包含在請求體中。 POST請求可能會導致新的資源的建立和/或已有資源的修改。
+ PUT	    : 從客戶端向服務器傳送的數據取代指定的文檔的內容。
+ DELETE  : 請求服務器刪除指定的頁面。
+ CONNECT	: HTTP/1.1協議中預留給能夠將連接改為管道方式的代理服務器。
+ OPTIONS	: 允許客戶端查看服務器的性能。
+ TRACE	  : 回顯服務器收到的請求，主要用於測試或診斷。

#### [HTTP 狀態碼](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
+ 1xx訊息

+ 2xx 成功
	200 OK
	201 Created
	202 Accepted
+ 3xx 重新導向
	301 永久導向
	302 暫時導向
+ 4xx客戶端錯誤
	400 Bad Request
	401 Unauthorized(未認證)
	404 Not Found
+ 5xx伺服器錯誤
	500 Internal Server Error
	501 Not Implemented
	503 Service Unavailable

### 工具

#### [Charles](https://www.charlesproxy.com/download/) 封包抓取工具

#### [POSTMAN](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=zh-TW)

#### [Wireshark](https://www.wireshark.org/download.html)

### 參考資料
+ [基礎網路概念](http://linux.vbird.org/linux_server/0110network_basic.php#whatisnetwork_osi)
+ [徹底了解TCP三次握手與四次揮手](https://kknews.cc/zh-tw/code/b83bma9.html)