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
+ background scripts
+ content scripts
+ options page
+ UI elements
.crx
+manifest file(manifest.json)

<!--more-->

### start

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

#### add content scripts - read webpage and can change 
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
```
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

### wait
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

