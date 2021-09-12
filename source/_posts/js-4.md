---
title: JavaScript tricky
abbrlink: Coding
date: 2021-05-29 13:57:32
categories:
tags:
	- javascript
	- tricky
---

### escape HTML function
``` js
// escape HTML function
function escapeHTML(text) {  
    var replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", '"': "&quot;"}    
    return text.replace(/[<>&"]/g, function(character) {  
        return replacements[character];  
    }); 
}
```
<!--more-->

### JSON.parse 的處理 - 預防抓到不正確的資料
``` js
let json;
try {
  json = JSON.parse(str)
} catch(e) {
  console.log(e) // 錯誤處理
}
```

### 字串比較
``` js
const aString = '1abc23'
const bString = 'abc'
const cString = 'abc'
// 比較字串是否相等
console.log(`bString === ctring, ${bString === cString}`)	// true
// 比較是否含字串, -1 表不含
console.log(`aString.indexOf(bString), ${aString.indexOf(bString)}`)	// 1
// switch 比較
switch (aString) {		// '1abc23'
	case '1ab' :
		console.log('1ab' )
		break
	case '1abc23' :
		console.log('1abc23')
		break
	default :
		console.log('none')
		break
}
```

### 瀏覽器 reload
``` html
<body>
	<h1>Hello</h1>
	<button class="add">add</button>
	<!-- reload button -->
	<button onclick="javascript:window.location.reload()">reload</button>
	<script>
		document.querySelector('.add')
			.addEventListener('click', () =>{
				document.querySelector('h1').append('Press add button.')
			})
	</script>
</body>
```

### 瀏覽器 定時 reload 網頁
``` js
setInterval(function(){location.reload(true);}, 3000);
```

### 使用 object 設定
``` js
// prizes object
const priszes = {
	FIRST: {
		imgUrl: 'url(img/first.jpg)',
		title: '恭喜你中頭獎了！日本東京來回雙人遊！',
		color: '#000'
	},
	SECOND: {
		imgUrl: 'url(img/tv.jpg)' ,
		title: '二獎！90 吋電視一台',
		color: '#000'
	},
	THIRD: {
		imgUrl: 'url(img/yt.jpg)',
		title: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
		color: '#000'
	},
	NONE: {
		imgUrl: 'none',
		title: '銘謝惠顧',
		color: '#fff' 
	}
}
// set background image
banner.style.backgroundImage = priszes[responseData.prize].imgUrl
document.querySelector('.prize-resp')
	.innerText = priszes[responseData.prize].title
document.querySelector('.prize-resp')
	.style
	.color = priszes[responseData.prize].color
```

### ELEMENT TEMPLATE 使用 
``` js
const STREAM_TEMPLATE =  `
		<a href="$channel-url"></a>
		<div class="view"></div>
		<img src=$preview alt="">
		<div class="user">
			<div class="avatar">
				<img src=$logo alt="">
			</div>
			<div class="user-info">
				<div class="user-name">$title</div>
				<div class="user-id">$name</div>
			</div>
		</div>
		`
itemElement.innerHTML = STREAM_TEMPLATE
		.replace('$channel-url', stream.channel.url)
		.replace('$preview', stream.preview.large)
		.replace('$logo', stream.channel.logo)
		.replace('$title', stream.channel.status)
		.replace('name', stream.channel.display_name)
```

### show date to string(need add new) - use react
``` js
<div>{new Date(2141241556).toLocaleString()}</div>
// 1970/1/26 上午2:47:21
<div>{Date(2141241556).toLocaleString()}</div> 
// Sun Sep 12 2021 16:33:37 GMT+0800 (台北標準時間)
```



