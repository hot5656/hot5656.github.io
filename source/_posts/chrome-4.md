---
title: Chrome Extension(subtitle)
abbrlink: '1461'
date: 2023-09-21 11:24:15
categories: Coding
tags:
  - chrome
---

### example

#### Super-Subtitles
##### manifest.json
``` json
{
    "name": "Super Sub",
    "manifest_version": 3,
    "version": "1.0",
    "description": "Learn the meaning of words while watching the videos on YouTube and Netflix",
    "action": {
      "default_title": "Super Subtitle"  // popup title
    },
    "permissions": [
      "storage",
      "activeTab",
      "scripting",
      "tabs"
    ],
    "icons": {	// icons position
      "16": "logo/supersub16.png",
      "32": "logo/supersub32.png",
      "48": "logo/supersub48.png",
      "128": "logo/supersub128.png"
    },
    "background": {
      "service_worker": "background.js"	// background JS
    },
    "content_scripts": [{
      "matches": ["https://www.youtube.com/watch*"], // content.js run url
      "js" : ["content.js"],	// content JS
      "run_at" : "document_idle"	// run when anything load complete(default) 
    }],
    "host_permissions": [
      "https://www.youtube.com/*"	// API 使用位址
    ]
  }
```

<!--more-->
#### youtube-captions
#####  manifest.json
``` json
{
  "name": "YouTube™双字幕",
  "manifest_version": 2,
  "version": "1.4.3",
  "description": "点击一下即可开启中英双字幕,适用于YouTube™",
  "author": "Dengrc",
  "permissions": ["tabs", "storage"],
  "icons": {
    "128": "images/icon128.png"
  },
	// popup title v2
  "browser_action": {
    "default_title": "YouTube™双字幕"
  },
  "content_scripts": [{
    "matches": ["https://www.youtube.com/*"],	// content.js run url
    "js": ["js/content.js"],									// content JS
    "run_at": "document_start",								// run when start
    "all_frames": true												// script 可注入所有frame, false: 只能注入最上層 frame
  }],
  "background": {
    "scripts": ["js/background.js"],
    "persistent": false
  },
	// 聲明資源才可使用
  "web_accessible_resources": ["js/injected.js", "js/xhook.min.js"]
}
```


### Ref
+ reference source 
	+ [SubtitlesForYoutube](https://github.com/yashagarwal1411/SubtitlesForYoutube) : Youtube Drop .SRT for subtitle
	+ [Movie Subtitles](https://github.com/gignupg/Movie-Subtitles/tree/master) : Video/Movie streaming platform Load .srt for subtitle
	+ [Super-Subtitles](https://github.com/noblenihal/Super-Subtitles) : YouTube subtitle transfer word for English
	+ [YouTube subtitles viewer - React Chrome Extension](https://github.com/eliascotto/youtube-subtitles-viewer) : view Youtube subtitle
	+ [youtube-captions](https://github.com/ADengrc/youtube-captions) : Youtube double subtitle　
	+ [antd-chrome-extension-boilerplate](https://github.com/shenmaxg/antd-chrome-extension-boilerplate) : react + antd for chrome-extension development
	+ [XHook](https://github.com/jpillora/xhook)

