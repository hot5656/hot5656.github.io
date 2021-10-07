---
title: 專有名詞 review
abbrlink: f556
date: 2021-10-04 08:50:02
categories: Front End
tags:
	- review
---

### 網頁設計
#### SPA(single-page application)單頁面應用程式
是一種網站設計的模型，它通過動態重寫當前頁面來與使用者互動，而非傳統的從伺服器重新載入整個新頁面。這種方法避免了頁面之間切換打斷使用者體驗。
+ 因 SPA 網頁是動態產生,對SEO不友好

<!--more-->

#### SSR(Server Side Render)伺服器渲染
HTML的內容全部由Server產生

#### CSR(Client-side Render)客戶端渲染
渲染過程全部由 client 的瀏覽器去處理

#### Prerender 預渲染
預先渲染出內容，讓爬蟲爬取頁面時爬取預先渲染的內容，而一般user還是走SPA的頁面。

#### MVC(Model-View-Controller) 
是一種軟體架構模式,主要目的是用來簡化應用程式的開發與增強程式的可維護性, 其做法是將應用程式分割成以下三個邏輯的元件 :
+ 模型(Model) : 程式設計師編寫程式應有的功能（實現演算法等等）,資料庫專家進行資料管理和資料庫設計
+ 視圖(View) : 圖形介面設計
+ 控制器(Controller) : 負責轉發請求,對請求進行處理

#### RESETful API
+ RESTful API，表示符合 REST(Representational State Transfer) 架構的 API 
+ RESTful API是一種設計風格，這種風格使API設計具有整體一致性

``` bash
# API 設計舉例
新增使用者 			POST 		/user
刪除使用者 			DELETE 	/user/n
查詢使用者 			GET			/user/n
更改使用者 			PATCH		/user/n
查詢使用者列表	  GET		 /users
```

### Tool and program
#### Server Application
##### Nginx
Nginx 發音同 "engine X"是非同步框架的網頁伺服器，也可以用作反向代理、負載平衡器和HTTP快取。

##### PM2
pm2 是一個 node 的程序管理器,可開啟多程序 

#### App 
##### XAMPP
XAMPP 是跨平台 (X (Cross)) 可在 Windows、Linux 與 Mac OS 系統上執行，套件包含有 Appache + MariaDB(舊平台是 MySQL) + PHP + Perl 等套件。

##### phpMyAdmin
phpMyAdmin 是一個以PHP為基礎，以Web-Base方式架構在網站主機上的MySQL的資料庫管理工具，讓管理者可用Web介面管理MySQL資料庫。

##### HeidiSQL
HeidiSQL是一個自由開源的資料庫管理工具，用於MySQL及其分支，以及Microsoft SQL Server和PostgreSQL。

##### JMeter
壓力測試工具


#### language and relative module
##### node.js
能夠在伺服器端運行 JavaScript 的開放原始碼
##### Express 
Express.js 或簡稱 Express，Express 是 Node.js Web 應用程式架構。

#### Automatic tool
##### Gulp
Gulp 是前端自動化建構工具，開發者可以使用它構建自動化工作流程，可以編譯 Sass、編譯 JavaScript 語法至相容性較高的 ES5、圖片優化壓縮、打包程式碼等等的事情。

##### Webpack
Webpack 是一個前端打包工具,將眾多模組與資源打包成一包檔案，生成優化過的程式碼。

##### Babel
Babel 為 一個 JavaScript 編譯器,可以將較新語法寫成的 JS 編譯成較舊的 JS 的語法,如 ES6 to ES5



### HTTP
#### cookie
伺服器（Server）傳送給瀏覽器（Client）的一小片段資料,瀏覽器會保存起來,往後向相同的伺服器發送請求時,附上這 Cookie 的資料. 
+ 儲存用戶登入資料,購物車資訊 ...
+ 若 cookie 被修改,有可能會形成 Server 端的漏洞

#### session 
Server 將 新建獨特 Session ID 的 cookie 傳給 Clinet, 當 Server 收到由 Client 傳來的 Session ID 就可知道 Client 的身份,而 Client 的資訊如購物車等資料存放在 Server 

#### CORS(Cross-Origin Resource Sharing)跨源資源共享
網頁伺服器跨網域的存取控制 
+ Server 要 enable CORS
``` php
header('Access-Control-Allow-Origin: *');
```

#### 同源政策（Same-origin policy）
同源政策控制了兩個不同網域來源互動
+ 跨來源寫(Cross-origin writes)通常被允許，例如連結 (links) 、重新導向 (redirect) 、或是表單 (form) 送出等等，是被允許的。
+ 跨來源嵌入(Cross-origin embedding)通常被允許。
+ 跨來源讀取(Cross-origin read) 通常不被允許。

	|URL	|Outcome	|Reason
	|-----|---------|------
	|http://store.company.com/dir2/other.html					|同源	  |
	|http://store.company.com/dir/inner/another.html	|同源	  |
	|https://store.company.com/secure.html						|不同源	|協定不同
	|http://store.company.com:81/dir/etc.html					|不同源	|埠號不同
	|http://news.company.com/dir/other.html						|不同源	|主機位置不同

#### SEO(search engine optimization)搜尋引擎最佳化
透過了解搜尋引擎的運作規則來調整網站,以及提高目的網站在有關搜尋引擎內排名的方式.

#### SSL(Secure Sockets Layer)安全通訊端層
是一種標準的技術,用於保持網際網路連線安全以及防止在兩個系統之間發送的所有敏感資料被罪犯讀取及修改任何傳輸的資訊. 
 
#### TSL(Transport Layer Security)傳輸層安全性
是更新,更安全的 SSL 版本,一般仍將安全性憑證稱為 SSL,因為這是較常用的詞彙,不過當您透過 SSL 時，您所購買的其實是最新的 TLS 憑證.

#### HTTP 常用 method
+ GET : 取得資料
+ POST : 新增一筆資料
+ PUT : 替換資料(未填資料欄位會被清空)
+ PATCH : 更新資料(未填資料欄位會保留)
+ DELETE : 刪除資料

#### HTTP 常用 status code
+ 1xx訊息
+ 2xx 成功
	200 OK
	201 Created
	202 Accepted
+ 3xx 重新導向
	301 永久導向
	302 暫時導向
	304 未改變,不需要再傳輸請求的內容，可以使用緩存的內容
+ 4xx客戶端錯誤
	400 Bad Request
	401 Unauthorized(未認證)
	404 Not Found
	405 Method Not Allowed
	410 Gone - 表示所請求的資源不再可用，將不再可用 
+ 5xx伺服器錯誤
	500 Internal Server Error
	501 Not Implemented
	503 Service Unavailable

### 資訊安全
#### XSS(Cross-site scripting) 跨網站指令碼
是一種網站應用程式的安全漏洞攻擊,代碼注入的一種,它將程式碼注入到網頁上,以達到攻擊的方法
+ 預防方式為排除所有可能的代碼注入
``` html
<!-- 測試網站是否有正確處理特殊字元： -->
><script>alert(document.cookie)</script>
='><script>alert(document.cookie)</script>
"><script>alert(document.cookie)</script>
<script>alert(document.cookie)</script>
<script>alert('vulnerable')</script>
%3Cscript%3Ealert('XSS')%3C/script%3E
<script>alert('XSS')</script>
<img src="javascript:alert('XSS')">
<!-- 可導到釣魚網站或dump cookie -->
<script>location.href="https://google.com"</script>
<script>alert(document.cookie)</script>
```

#### CSRF(Cross Site Request Forgery) 跨站請求偽造
當你登入某網站,觸發對另一個你已登入未登出的網站發出命令(如你已登入銀行卻未登出)
+ 現在有些 Framework 都有內建防禦 CSRF 的功能，可以很簡單的開啟
+ 使用者每次使用完網站就登出，就可以避免掉 CSRF
+ Server 的防禦 :
	+ 檢查 Referer 可確認來源非跨站請求(有些軟體或瀏覽器可以控制傳送或停用Referer,所以這種方式有風險)
	+ 加上圖形驗證碼, 簡訊驗證碼等等
	+ 加上 CSRF token
	在 form 裡面加上一個 hidden 的欄位，叫做csrftoken，這裡面填的值由 server 隨機產生，並且存在 server 的 session 中。
	``` html
	<form action="https://small-min.blog.com/delete" method="POST">
		<input type="hidden" name="id" value="3"/>
		<input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
		<input type="submit" value="刪除文章"/>
	</form>
	```


### Database
#### SQL injection
也稱SQL隱碼或SQL注碼,是發生於應用程式與資料庫層的安全漏洞。就是在輸入的字串之中夾帶SQL指令，在設計不良的程式當中忽略了字元檢查，那麼這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的SQL指令而執行，因此遭到破壞或是入侵。也稱為駭客的填字遊戲.
``` js
// 原命令碼
strSQL = "SELECT * FROM users WHERE (name = '" + userName + "') and (pw = '"+ passWord +"');"
// 惡意填入
userName = "1' OR '1'='1";
passWord = "1' OR '1'='1";

// 最後命令
strSQL = "SELECT * FROM users WHERE (name = '1' OR '1'='1') and (pw = '1' OR '1'='1');"
// 與以下命令相同,無帳號密碼，亦可登入網站
strSQL = "SELECT * FROM users;"
```

#### CRUD
新增(Create)、讀取(Read)、更新(Update)、刪除(Delete)

#### ACID (Atomicity, Consistency, Isolation, Durability)
+ Atomicity (原子性) : 資料操作不能只有部分完成。一次的 transaction 只能有兩種結果：成功或失敗
+ Consistency (一致性)：在交易中會產生資料或者驗證狀態，然而當錯誤發生，所有已更改的資料或狀態將會恢復至交易之前。
+ Isolation (隔離性)： 資料庫允許多筆交易同時進行，交易進行時未完成的交易資料並不會被其他交易使用，直到此筆交易完成。
+ Durability (耐久性)：交易完成後對資料的修改是永久性的，資料不會因為系統重啟或錯誤而改變。

#### Transaction 與 lock
+ 一個 transaction ,是為了特定需求的一組連續對資料庫 Read 和 Write 的動作
+ 為了保持資料的一致性,在執行 transaction 時,會將資料 lock 住,不讓其他 transaction 使用

#### Sequelize (ORM 串接資料庫) 
+ ORM(Object Relational Mapping)物件關聯對映。是一種將關聯式資料庫（MySQL）映射（mapping）至物件導向（OOP）的資料抽象化技術。
+ ORM 扮演資料庫系統和 Model 資料容器的中間橋梁，讓我們能透過程式語言（JavaScript）去操作資料庫語言（SQL），是實作物件導向概念的一種工具模式。
+ Sequelize，這是一款基於 Node.js 的非同步 ORM 框架，讓我們能透過 ORM（物件關聯對映）來開發網頁，以物件導向的概念來操作資料庫。

#### N+1 problem
當要由 DB 列出訂單含客戶名稱,可能查出訂單後,再由訂單內的客戶代號查詢客戶名稱,若有100筆訂單,就要執行 100 + 1 次查詢才能得到需要的資料,若改變查詢方法以使用較少的查詢次數,就能減少查詢的時間.


### 參考資料
+ [MVC架構是什麼?](https://tw.alphacamp.co/blog/mvc-model-view-controller)


