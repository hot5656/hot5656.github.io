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


### 參考資料
+ [基礎網路概念](http://linux.vbird.org/linux_server/0110network_basic.php#whatisnetwork_osi)