---
title: HTML 說明
abbrlink: d6b8
date: 2021-05-17 14:17:19
categories: Front End
tags:
	- html
---

### SEO(Search engine optimization)搜尋引擎優化 與 meta 標籤
+ [Tripadvisor](https://www.tripadvisor.com.tw/)
+ [The Open Graph protocol](https://ogp.me/) : Facebook 使用
+ [facebook for developers](https://developers.facebook.com/tools/debug/?locale=zh_TW) : Facebook og 偵錯
+ [JSON-LD](https://json-ld.org/) : JSON for Linking Data(google search 有用)
+ [Google Search Console](https://search.google.com/search-console/welcome?hl=zh-TW) : 網站搜尋分析

<!--more-->

#### 一般
``` html
<!-- title, keywords,  description-->
<title>四海遊龍 (中山區) - 餐廳/美食評論 - Tripadvisor</title>
<meta name="keywords" content="中山區四海遊龍, 餐廳, 餐廳評論, 食物, 用餐">
<meta name="description" content="四海遊龍(中山區): 讀讀32則則關於四海遊龍客觀公正的美食評論，在Tripadvisor的5分滿分評等中得3.5分，在中山區的2,708家餐廳中排第468名。">
<!-- The Open Graph protocol, Facebook 使用 -->
<meta property="og:image" content="https://media-cdn.tripadvisor.com/media/photo-s/0d/43/49/bd/photo0jpg.jpg">
<meta property="og:image:width" content="550">
<meta property="og:image:height" content="413">
<meta property="og:type" content="restaurant">
<meta property="og:url"
		content="http://www.tripadvisor.com.tw/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html">
<meta property="og:site_name" content="Tripadvisor">
<!-- 提供 app-->
<meta property="al:ios:app_name" content="TripAdvisor">
<meta property="al:ios:app_store_id" content="284876795">
<meta property="twitter:app:id:ipad" name="twitter:app:id:ipad" content="284876795">
<meta property="twitter:app:id:iphone" name="twitter:app:id:iphone" content="284876795">
<meta property="al:ios:url"
		content="tripadvisor://www.tripadvisor.com.tw/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html?m=33762">
<meta property="twitter:app:url:ipad" name="twitter:app:url:ipad"
		content="tripadvisor://www.tripadvisor.com.tw/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html?m=33762">
<meta property="twitter:app:url:iphone" name="twitter:app:url:iphone"
		content="tripadvisor://www.tripadvisor.com.tw/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html?m=33762">
<!-- alternate 提供其他語言網頁-->
<link rel="alternate" hreflang="en"
		href="https://www.tripadvisor.com/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html">
<link rel="alternate" hreflang="en-GB"
		href="https://www.tripadvisor.co.uk/Restaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html">
<!-- twitter image-->
<meta name="twitter:image"
		content="https://static.tacdn.com/img2/brand_refresh/application_icons/post-image-550x550.png">
```

#### JSON-LD(JSON for Linking Data)
``` html
<!-- JSON for Linking Data-->
<script type="application/ld+json">
	{
		"@context": "http:\u002F\u002Fschema.org",
		"@type": "FoodEstablishment",
		"name": "\u56DB\u6D77\u904A\u9F8D",
		"url": "\u002FRestaurant_Review-g13808671-d8310497-Reviews-Yuloong-Zhongshan_District_Taipei.html",
		"image": "https:\u002F\u002Fmedia-cdn.tripadvisor.com\u002Fmedia\u002Fphoto-s\u002F0d\u002F43\u002F49\u002Fbd\u002Fphoto0jpg.jpg",
		"priceRange": "$",
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "3.5",
			"reviewCount": "32"
		},
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "No.10,Minsheng West Road,Zhongshan District",
			"addressLocality": "\u4E2D\u5C71\u5340",
			"addressRegion": "",
			"postalCode": "",
			"addressCountry": {
				"@type": "Country",
				"name": "\u53F0\u7063"
			}
		}
	}
</script>
```


#### [robots.txt](https://developers.google.com/search/docs/advanced/robots/robots_txt?hl=zh-tw)
``` python
# robots.txt 給網頁爬蟲 or 搜尋引擎 看的檔案
# Sitemap(xml file) 網頁地圖
# Disallow 不允許搜尋
# Allow 允許搜尋
# https://www.tripadvisor.com.tw/robots.txt
Sitemap: https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap_zh_TW_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap_zh_TW_location_photo_direct_link_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap_zh_TW_show_user_reviews_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/att/zh_TW/sitemap_zh_TW_attractions_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/att/zh_TW/sitemap_zh_TW_attraction_review_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/att/zh_TW/sitemap_zh_TW_attraction_product_review_index.xml
Sitemap: https://www.tripadvisor.com.tw/sitemap/att/zh_TW/sitemap_zh_TW_attractions_near_index.xml
User-Agent: *
Disallow: /5349
Disallow: /AcceptDeferredTermsAndConditions
Disallow: /AccessTokenLogin
Disallow: /AccommodationCrossSells
.....
Allow: /js3/ta-mobile
Allow: /js3/vr-shared
Allow: /UserReview$
Allow: /data/*/crosssellaccommodations
```

``` xml
# Sitemap: https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap_zh_TW_index.xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
	<sitemap>
		<loc>https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap-1611790-zh_TW-hotel_review-1610916285.xml.gz</loc>
		<lastmod>2021-01-17T20:44:45Z</lastmod>
	</sitemap>
	<sitemap>
		<loc>https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap-1611791-zh_TW-hotel_review-1610916289.xml.gz</loc>
		<lastmod>2021-01-17T20:44:49Z</lastmod>
	</sitemap>
	......
	<sitemap>
		<loc>https://www.tripadvisor.com.tw/sitemap/2/zh_TW/sitemap-1447620-zh_TW-cruise_review-1620460669.xml.gz</loc>
		<lastmod>2021-05-08T07:57:49Z</lastmod>
	</sitemap>
</sitemapindex>
```


### [Tag 標籤](https://developer.mozilla.org/zh-TW/docs/Web/HTML/Element) 
#### [Semantic elements 語義化元素](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
``` html
<h1></h1>
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
<header></header>
<!-- navigation 導覽列 -->
<nav></nav>
<!-- 本頁主要內容 -->
<main></main>
<!-- 底頁 -->
<footer></footer>
```

#### 文字
``` html
<p></p>
<div></div>
<!-- preformatted text 方便放程式-->
<pre></pre>
<!-- line break 換行-->
<br>
```

#### 行內文字
```	html
<span></span>
<!-- anchor 錨點 href: hypertext reference -->
<!-- _self:開在本頁 _blank:另開分頁 -->
<a href="https://google.com" target='_self'>google</a>
<!-- 本頁移動 #:top -->
<h2 id="p3"></h2>
<a href="#p3">To p3</a>

<!-- unordered list 清單-->
<ul> 
  <!-- list item -->
  <li>item1</li> 
  <li>item2</li>
</ul>
<!-- ordered list -->
<ol> 
  <li>item1</li>
  <li>item2</li>
</ol>
```

#### [Form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
``` html
<!-- 表單 -->
<form action="">
	<div>
		姓名: <input type="text" placeholder="你的名字">
	</div>
	<div>
		密碼: <input type="password">
	</div>
	<div>
		Email: <input type="email" placeholder="你的電子郵件">
	</div>
	<div>
		日期: <input type="date">
	</div>
	<div>
		性別: <input type="radio" name="gender" id="male"><label for="male">男生</label>	
		<input type="radio" name="gender" id="female"><label for="female">女生</label>
	</div>
	<div>
		興趣: <input type="checkbox" id="sports"><label for="sports">運動</label>	
		<input type="checkbox" id="reading"><label for="reading">閱讀</label>	
	</div>
	<div>
		<!-- 送出 -->
		<input type="submit" value="送出">
	</div>
</form>
```
<form action="">
	<div>
		姓名: <input type="text">
	</div>
	<div>
		密碼: <input type="password">
	</div>
	<div>
		Email: <input type="email">
	</div>
	<div>
		日期: <input type="date">
	</div>
	<div>
		性別: <input type="radio" name="gender" id="male"><label for="male">男生</label>	
		<input type="radio" name="gender" id="female"><label for="female">女生</label>
	</div>
	<div>
		興趣: <input type="checkbox" id="sports"><label for="sports">運動</label>	
		<input type="checkbox" id="reading"><label for="reading">閱讀</label>	
	</div>
	<div>
		<!-- 送出 -->
		<input type="submit" value="送出">
	</div>
</form>

#### 圖片與多媒體
``` html
<!-- title:滑鼠移到顯示  alt:替代文字(圖片不存在))-->
<img title="" src="" alt="">
<!-- 嵌入網頁,X-Frame-Option:sameorigin 可防止別人嵌入 -->
<iframe src="https://..." frameborder="0"></iframe>
```

#### [Table 表格](https://www.footmark.info/web-design/html/html-table-structured-merge-group/)
``` html
<!-- 
<th scope='row'> row標題
<th scope='col'> col標題
<td rowspan="2"> 跨 row
<td colspan=3> 跨 col
-->
<table  border="1">
	<!-- table header -->
	<tr>
		<th>城市</th>
	　<th colspan="2">特產</th>
	</tr>
	<!-- table row -->
	<tr>
		<td>龍潭</td>
	　<td>花生</td>
	　<td>豆干</td>
	</tr>
</table>
```
<table  border="1">
	<!-- table header -->
	<tr>
		<th>城市</th>
	　<th colspan="2">特產</th>
	</tr>
	<!-- table row -->
	<tr>
		<td>龍潭</td>
	　<td>花生</td>
	　<td>豆干</td>
	</tr>
</table>

#### 其他標籤
##### section
``` html
<!--  <section> 標籤 (tag) 用在 HTML 文件中有明顯含義的區塊 (related grouping of semantic meaning)，一般來說 section 區塊中也會有自己的標題 (h1-h6)-->
<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>
<!-- 或 -->
<article>
  <section id="intro">
      <!-- 介紹 -->
  </section>

  <section id="main_content">
      <!-- 主內容 -->
  </section>

  <section id="related">
      <ul>
          <li><a href="that.html">相關文章</a></li>
          <li><a href="this.html">相關文章</a></li>
      </ul>
  </section>
</article>
```


### 其他
#### Escape 跳脫
``` html 
<!-- 
	& => &amp;
	< => &lt;
	> => &gt;   
-->
<!-- 顯示標籤 -->
<div>
	&lt;div&gt;文字&lt;/div&gt;
</div>
```
<div>
	&lt;div&gt;文字&lt;/div&gt;
</div>

#### comment 
``` html
<!--This is a comment. Comments are not displayed in the browser-->
<p>This is a paragraph.</p>
```

#### [HTML5的lang](https://vector.cool/html5%E7%9A%84lang%E9%80%9F%E6%9F%A5-%E6%B3%A8%E6%84%8F%EF%BC%9A%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87%E4%B8%8D%E6%98%AFzh-tw%E5%96%94/)
``` html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
```

### 參考
+ [MDN HTML](https://developer.mozilla.org/zh-TW/docs/Web/HTML)
+ [w3school HTML](https://www.w3schools.com/html/default.asp)
+ [Semantic layout](https://www.w3schools.com/html/html5_semantic_elements.asp)
