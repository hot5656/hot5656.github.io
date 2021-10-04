---
title: 專有名詞 review
abbrlink: f556
date: 2021-10-04 08:50:02
categories: Front End
tags:
	- review
---

你知道捕獲與冒泡是什麼
preventDefault 與 stopPropagation 的差異


SEO


JSONP
 Prerender


### 網頁設計
+ SPA(single-page application)單頁面應用程式 : 是一種網站設計的模型，它通過動態重寫當前頁面來與使用者互動，而非傳統的從伺服器重新載入整個新頁面。這種方法避免了頁面之間切換打斷使用者體驗。
	+ 因 SPA 網頁是動態產生,對SEO不友好

+ SSR(Server Side Render)伺服器渲染:HTML的內容全部由Server產生

+ CSR(Client-side Render)客戶端渲染:渲染過程全部由 client 的瀏覽器去處理

+ MVC(Model-View-Controller) : 是一種軟體架構模式,主要目的是用來簡化應用程式的開發與增強程式的可維護性, 其做法是將應用程式分割成以下三個邏輯的元件 :
	+ 模型(Model) : 程式設計師編寫程式應有的功能（實現演算法等等）,資料庫專家進行資料管理和資料庫設計
	+ 視圖(View) : 圖形介面設計
	+ 控制器(Controller) : 負責轉發請求,對請求進行處理

### HTTP
+ cookie: 伺服器（Server）傳送給瀏覽器（Client）的一小片段資料,瀏覽器會保存起來,往後向相同的伺服器發送請求時,附上這 Cookie 的資料. 
	+ 儲存用戶登入資料,購物車資訊 ...
	+ 若 cookie 被修改,有可能會形成 Server 端的漏洞

+ session : Server 將 新建獨特 Session ID 的 cookie 傳給 Clinet, 當 Server 收到由 Client 傳來的 Session ID 就可知道 Client 的身份,而 Client 的資訊如購物車等資料存放在 Server 

+ CORS(Cross-Origin Resource Sharing)跨源資源共享 : 網頁伺服器跨網域的存取控制 
	+ Server 要 enable CORS
	``` php
	header('Access-Control-Allow-Origin: *');
	```

+ 同源政策（Same-origin policy） : 同源政策控制了兩個不同網域來源互動
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



+ HTTP 常用 method
	+ GET : 取得資料
	+ POST : 新增一筆資料
	+ PUT : 替換資料(未填資料欄位會被清空)
	+ PATCH : 更新資料(未填資料欄位會保留)
	+ DELETE : 刪除資料

+ HTTP 常用 status code
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
+ XSS(Cross-site scripting) 跨網站指令碼 : 是一種網站應用程式的安全漏洞攻擊,代碼注入的一種,它將程式碼注入到網頁上,以達到攻擊的方法
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

+ CSRF(Cross Site Request Forgery) 跨站請求偽造 : 當你登入某網站,觸發對另一個你已登入未登出的網站發出命令(如你已登入銀行卻未登出)
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
+ SQL injection : 也稱SQL隱碼或SQL注碼,是發生於應用程式與資料庫層的安全漏洞。就是在輸入的字串之中夾帶SQL指令，在設計不良的程式當中忽略了字元檢查，那麼這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的SQL指令而執行，因此遭到破壞或是入侵。也稱為駭客的填字遊戲.
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

+ CRUD : 新增(Create)、讀取(Read)、更新(Update)、刪除(Delete)









 Babel
 Gulp
 Webpack

 Promise？
什麼是 Fetch？

 Transaction 與 lock
 資料庫的 ACID 是什麼
 SSL

 nginx

  Express 

	node.js
	PM2

	 ORM
	 N+1 problem
	 heroku
	 Sequelize 



``` 
```

### 參考資料
+ [MVC架構是什麼?](https://tw.alphacamp.co/blog/mvc-model-view-controller)

