---
title: Chrome Extension
abbrlink: a8c7
date: 2023-05-23 16:52:05
categories: Coding
tags:
	- chrome
---

### setup
+ install node.js
```
npm init
npm install types @types/chrome
```

<!--more-->

+ chrome://extensions --> on developer mode(開發人員模式)

#### component
+ background scripts
+ content scripts
+ options page
+ UI elements
.crx
+manifest file(manifest.json)

#### 

#### manifest.json
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

#### background.js
``` js
chrome.runtime.onInstalled.addListener(()=>{
	console.log('installed')
})
```

#### content.js


+ Source --> Ctrl + O : search file
+ webstore google

``` bash
# power-shell
# compress all file to .zip
Compress-Archive src output.zip
```

+ Storage areas
  + storage.local
  + storage.sync

### Ref
+ [Manifest file format](https://developer.chrome.com/docs/extensions/mv3/manifest/)
+ [webstore google](https://chrome.google.com/webstore/category/extensions)
+ [chrome.storage](https://developer.chrome.com/docs/extensions/reference/storage/)

