---
title: Chrome Extension
abbrlink: a8c7
date: 2023-05-23 16:52:05
categories: Coding
tags:
	- chrome
---

### 說明
#### chrome extension component
+ background scripts : event control
+ content scripts : change website page 
+ options page
+ UI elements
.crx
+manifest file(manifest.json)

<!--more-->

#### search source file
+ Source --> Ctrl + O : search file
<div style="max-width:1000px">
	{% asset_img pic31.png pic31 %}
</div>

#### publishing to chrome store
##### [Chrome Store](https://chrome.google.com/webstore/category/extensions?utm_source=app-launcher&authuser=0)

##### modify manifest.json name&description
``` json
{
	"name": "YouTube dark mode",
	"version": "1.0.0",
	"description": "This extension turn YouTube background to black",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": ["content.js"],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks"
	],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### prepare for publish(move source to src,compress to .zip)
<div style="max-width:300px">
	{% asset_img pic32.png pic32 %}
</div>


### Function
#### chrome storage(加入 storage 後,有時要移除再載入才會正常)
+ Storage areas
  + storage.local
  + storage.sync

##### manifest.json
``` json
{
	"name": "YouTube dark mode",
	"version": "1.0.0",
	"description": "This extension turn YouTube background to black",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": ["content.js"],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks",
		"storage"
	],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### content.js
``` js
window.onload = () => {
	const button = document.createElement('button');
	button.id = 'darkModeButton';
	button.textContent = "DO IT DACK";

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'darkSetting'

	// add button ,若使用 #buttons 最後不能顯示,可能是原程式蓋掉加入之button
	// document.querySelector("#buttons").prepend(button);
	document.querySelector("#end").prepend(button, input, 'Auto apply?');
	button.addEventListener('click', () => {
		chrome.storage.local.get(['enabled'], (result) => {
			const isEnable = !result.enabled;
			document.getElementById('darkSetting').checked = isEnable;
			storeSetting();
		})

		enableDarkMode(true)
	});

	// save dark mode to chrome storage
	input.addEventListener('click', () => storeSetting())

	// save dark mode to chrome storage
	checkSetting();
}

// save dark mode to chrome storage
function checkSetting() {
	chrome.storage.local.get(['enabled', 'color'], (result) => {
		const isEnable = result.enabled
		console.log(isEnable)
		console.log(result.color)

		document.getElementById('darkSetting').checked = isEnable;
		if (isEnable) {
			enableDarkMode(true);
		}
	})
}

// save dark mode to chrome storage
function storeSetting() {
	const isEnabled = document.getElementById('darkSetting').checked;
	const setting = { enabled: isEnabled, color:'purple'} ;

	chrome.storage.local.set(setting, () => {
		console.log('store', setting);
	})
	enableDarkMode(isEnabled);
}

function enableDarkMode(flag) {
	if (flag) {
		document.getElementsByTagName('ytd-app')[0].style.backgroundColor= 'black';
	}
	else {
		document.getElementsByTagName('ytd-app')[0].style.backgroundColor= '';
	}
}
```

#### script comminication/message passing
##### manifest.json
``` json
{
	"name": "YouTube dark mode",
	"version": "1.0.0",
	"description": "This extension turn YouTube background to black",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js",
		"//": "background.js support import",
		"type": "module"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": [
				"content.js",
				"contentMessaging.js"
			],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks",
		"storage",
		"tabs"
	],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### background.js
``` js
import * as message from "./backgroundMessaging.js"

chrome.runtime.onInstalled.addListener((tab) => {
	console.log(tab)
	console.log('Extension installed')
})

chrome.bookmarks.onCreated.addListener(() => {
	console.log('Bookmark saved')
})

// 不需要有此 function
// chrome.action.onClicked.addListener( () => {
// 	console.log('chrome action click')
// })
```

##### backgroundMessaging.js
``` js
// chrome.bookmarks.onMoved.addListener(() => {
// 	console.log('Bookmark moved')
// })
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('message', message);
	console.log('sender',sender);
	sendResponse({ content: "background response" });
});


chrome.bookmarks.onMoved.addListener(() => {
	// send to active windows
	chrome.tabs.query({ active: true, currentWindow: true}, 
		tabs => {
			chrome.tabs.sendMessage(tabs[0].id, {name: 'Robert'});
		}
	);
});
```

##### contentMessaging.js
``` js
// window.onload(alert('I loaded'));

window.onload(testMessage());

function testMessage() {
	chrome.runtime.sendMessage(
		{ payload: "Hellow from a content" }, 
		// backback function for receive side
		(response) => {
			console.log(response);
		}
	);
}

chrome.runtime.onMessage.addListener((message, sender) => {
	console.log('message', message);
	console.log('sender',sender);
});
```

##### result
+ reload extension
+ reflash YouTube page
+ move bookmark

<div style="max-width:1000px">
	{% asset_img pic33.png pic33 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic34.png pic34 %}
</div>

#### cross-origin http request(XHR)
##### manifest.json
``` json
{
	"name": "YouTube dark mode",
	"version": "1.0.0",
	"description": "This extension turn YouTube background to black",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js",
		"//": "background.js support import",
		"type": "module"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": [
				"content.js",
				"contentMessaging.js",
				"contentRequests.js"
			],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks",
		"storage",
		"tabs"
	],
	"host_permissions": ["https://api.github.com/"],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### contentRequests.js
``` js
// nee github api permission(manifest.json
// "host_permissions": ["https://api.github.com"],

const requestSender = new XMLHttpRequest()

requestSender.onreadystatechange = apiHandler;


// 0	UNSENT	客戶端已被建立，但 open() 方法尚未被呼叫。
// 1	OPENED	open() 方法已被呼叫。
// 2	HEADERS_RECEIVED	send() 方法已被呼叫，而且可取得 header 與狀態。
// 3	LOADING	回應資料下載中，此時 responseText 會擁有部分資料。
// 4	DONE	完成下載操作。
function apiHandler(response) {
	if (requestSender.readyState === 4  && requestSender.status === 200) {
		// console.log(response)
		console.log(response.target.response)
	}
}

// sync
// requestSender.open('GET', 'https://api.github.com/users/peter', true);
// requestSender.send();
//
// requestSender.open('GET', 'https://api.github.com/users/tomas', true);
// requestSender.send();
// --> response tomas

// async
requestSender.open('GET', 'https://api.github.com/users/peter', false);
requestSender.send();

requestSender.open('GET', 'https://api.github.com/users/tomas', false);
requestSender.send();
// --> response peter and tomas
```

##### result
<div style="max-width:1000px">
	{% asset_img pic35.png pic35 %}
</div>

#### internationalization(localization)
##### manifest.json
``` json
{
	"name": "__MSG_appName__",
	"version": "1.0.0",
	"description": "__MSG_appDescription__",
	"manifest_version": 3,
	"default_locale": "en",
	"background": {
		"service_worker": "background.js",
		"//": "background.js support import",
		"type": "module"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": [
				"content.js",
				"contentMessaging.js",
				"contentRequests.js"
			],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks",
		"storage",
		"tabs"
	],
	"host_permissions": ["https://api.github.com/"],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### add message for English and Traditional Chinese
<div style="max-width:300px">
	{% asset_img pic55.png pic55 %}
</div>

##### _locales/en/messages.json
``` json
{
	"appName": {
		"message": "YouTube dark mode"
	},
	"appDescription": {
		"message": "This extension turn YouTube background to black"
	},
	"enableDarkModeText":{
		"message": "DO IT DARK"
	}
}
```

##### _locales/zh_TW/messages.json
``` json
{
	"appName": {
		"message": "YouTube 深色模式"
	},
	"appDescription": {
		"message": "此擴展將 YouTube 背景變成黑色"
	},
	"enableDarkModeText":{
		"message": "深色模式"
	}
}
```

##### reload extension(default Traditional Chinese)
<div style="max-width:500px">
	{% asset_img pic51.png pic51 %}
</div>

##### change language to english then reload extension
<div style="max-width:1000px">
	{% asset_img pic52.png pic52 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic53.png pic53 %}
</div>

<div style="max-width:500px">
	{% asset_img pic54.png pic54 %}
</div>


##### change button text(content.js) 
``` js
window.onload = () => {
	const button = document.createElement('button');
	button.id = 'darkModeButton';
	// button.textContent = "DO IT DACK";
	button.textContent =  chrome.i18n.getMessage("enableDarkModeText");

	const input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'darkSetting'

	// add button ,若使用 #buttons 最後不能顯示,可能是原程式蓋掉加入之button
	// document.querySelector("#buttons").prepend(button);
	document.querySelector("#end").prepend(button, input, 'Auto apply?');
	button.addEventListener('click', () => {
		chrome.storage.local.get(['enabled'], (result) => {
			const isEnable = !result.enabled;
			document.getElementById('darkSetting').checked = isEnable;
			storeSetting();
		})

		enableDarkMode(true)
	});

	// save dark mode to chrome storage
	input.addEventListener('click', () => storeSetting())

	// save dark mode to chrome storage
	checkSetting();
}
```

<div style="max-width:1000px">
	{% asset_img pic56.png pic56 %}
</div>

#### fix show 2 "DO IT DARK" button
##### contentMessaging.js
``` js
// window.onload(alert('I loaded'));

// call window.onload twince ,show 2 "DO IT DARK" button
// window.onload(testMessage());
testMessage()

function testMessage() {
	chrome.runtime.sendMessage(
		{ payload: "Hellow from a content" }, 
		// backback function for receive side
		(response) => {
			// console.log(response);
			;
		}
	);
}

chrome.runtime.onMessage.addListener((message, sender) => {
	console.log('message', message);
	console.log('sender',sender);
});
```


### Start

#### setup
+ install node.js

+ chrome://extensions --> on developer mode(開發人員模式)
<div style="max-width:500px">
	{% asset_img pic1.png pic1 %}
</div>



#### 1st project
##### init + install type
```
npm init
npm install types @types/chrome
```

##### add manifest.json
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3
}
```

##### load chrome extension from local

<div style="max-width:500px">
	{% asset_img pic2.png pic2 %}
</div>

<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>

<div style="max-width:500px">
	{% asset_img pic4.png pic4 %}
</div>


##### add background scripts - for event control
###### manifest.json
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	}
}
```

###### add background.js
``` js
chrome.runtime.onInstalled.addListener(()=>{
	console.log('installed')
})
```

###### reload and see result 
<div style="max-width:500px">
	{% asset_img pic5.png pic5 %}
</div>

<div style="max-width:500px">
	{% asset_img pic6.png pic6 %}
</div>

<div style="max-width:700px">
	{% asset_img pic7.png pic7 %}
</div>

<div style="max-width:700px">
	{% asset_img pic8.png pic8 %}
</div>

##### add bookmarks event
###### background.js
``` js
chrome.runtime.onInstalled.addListener(() => {
	console.log('installed')
})

chrome.bookmarks.onCreated.addListener(() => {
	console.log('Bookmark saved')
})
```
###### reload(error)
<div style="max-width:500px">
	{% asset_img pic5.png pic5 %}
</div>

<div style="max-width:500px">
	{% asset_img pic9.png pic9 %}
</div>

<div style="max-width:500px">
	{% asset_img pic10.png pic10 %}
</div>

###### manifest.json add permissions for bookmarks
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"permissions": [
		"bookmarks"
	]
}
```

###### clear error then reload
<div style="max-width:500px">
	{% asset_img pic11.png pic11 %}
</div>
<div style="max-width:500px">
	{% asset_img pic12.png pic12 %}
</div>

###### open new page + save bookmark --> see triger bookmarks.onCreated
<div style="max-width:500px">
	{% asset_img pic13.png pic13 %}
</div>
<div style="max-width:500px">
	{% asset_img pic14.png pic14 %}
</div>

#### add content scripts(add text "Dark mode") - change website page
##### manifest.json add content_scripts
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"js": ["content.js"]
		}
	],
	"permissions": [
		"bookmarks"
	]
}
```

##### try Youtube add string "Dark mode"
<div style="max-width:1000px">
	{% asset_img pic21.png pic21 %}
</div>

##### add content.js
``` js
window.onload = () => {
	document.querySelector("#buttons").prepend("Dark mode")
}
```

##### reload extension
<div style="max-width:500px">
	{% asset_img pic22.png pic22 %}
</div>


##### manifest.json add matches
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"js": ["content.js"]
		}
	],
	"permissions": [
		"bookmarks"
	]
}
```

##### reload then refresh youtube website
<div style="max-width:1000px">
	{% asset_img pic23.png pic23 %}
</div>


#### content scripts(add button, click trigger drak mode)
##### content.js
``` js
window.onload = () => {
	const button = document.createElement('button');
	button.id = 'darkModeButton';
	button.textContent = "DO IT DACK";
	// add button ,若使用 #buttons 最後不能顯示,可能是原程式蓋掉加入之button
	// document.querySelector("#buttons").prepend(button);
	document.querySelector("#end").prepend(button);
	button.addEventListener('click', () => enableDarkMode());
}

function enableDarkMode() {
	document.getElementsByTagName('ytd-app')[0].style.backgroundColor= 'black';
}
```

##### manifest.json : add exclude_matches, run_at
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": ["content.js"],
			"//": "調整 js 開始執行時間",
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks"
	]
}
```

<div style="max-width:1000px">
	{% asset_img pic24.png pic24 %}
</div>

<div style="max-width:1000px">
	{% asset_img pic25.png pic25 %}
</div>

#### user interface(change icon) 
##### add icon
<div style="max-width:300px">
	{% asset_img pic41.png pic41 %}
</div>

##### manifest.json : add icon
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": ["content.js"],
			"//": "調整 js 開始執行時間",
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks"
	],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	}
}
```

##### result 
<div style="max-width:500px">
	{% asset_img pic42.png pic42 %}
</div>

<div style="max-width:500px">
	{% asset_img pic43.png pic43 %}
</div>

#### user interface(show title and popup window) 
##### manifest.json
``` json
{
	"name": "My first extension",
	"version": "1.0.0",
	"description": "This is my very first coll extension",
	"manifest_version": 3,
	"background": {
		"service_worker": "background.js"
	},
	"content_scripts": [
		{
			"matches": ["https://*.youtube.com/*"],
			"//": "排除某些執行 url",
			"exclude_matches": ["https://*.youtube.com/watch*"],
			"js": ["content.js"],
			"run_at": "document_end"
		}
	],
	"permissions": [
		"bookmarks"
	],
	"icons": {
		"16": "user.png",
		"48": "user.png",
		"128": "user.png"
	},
	"action": {
		"default_title": "Created by Robert.",
		"default_popup": "popup.html"
	}
}
```

##### background.js
``` js
chrome.runtime.onInstalled.addListener((tab) => {
	console.log(tab)
	console.log('installed')
})

chrome.bookmarks.onCreated.addListener(() => {
	console.log('Bookmark saved')
})

// 不需要有此 function
// chrome.action.onClicked.addListener( () => {
// 	console.log('chrome action click')
// })
```

##### popup.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<img src="./user.png" width="40">
	Head over to YouTube and a new icon wall appear!
</body>
</html>
```

##### result
<div style="max-width:500px">
	{% asset_img pic44.png pic44 %}
</div>

<div style="max-width:500px">
	{% asset_img pic45.png pic45 %}
</div>

#### user interface(add href button) 
##### popup.html
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	<img src="./user.png" width="40">
	Head over to YouTube and a new icon wall appear!
	<!-- add href button(need add target open another page)-->
	<a href="https://google.com.tw" target="_balck">
		<button>Visit homepage</button>
	</a>
	<!-- add js -->
	<script src="popup.js"></script>
</body>
</html>
```

##### result
<div style="max-width:500px">
	{% asset_img pic46.png pic46 %}
</div>

### TypeScrips
``` bash
# install typescript
 npm install typescript --save-dev
```

### Ref
+ [Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)
+ [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/)
+ [chrome - Choose locales to support](https://developer.chrome.com/docs/webstore/i18n/#choosing-locales-to-support)
