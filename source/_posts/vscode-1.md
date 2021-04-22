---
title: VSCode
abbrlink: f8cb
date: 2021-04-19 13:51:51
categories: Coding
tags:
	- vscode
---

### 快速鍵
+ 重整程式排列 : shift-alt-f
+ 移動整行程式碼 : Alt + ↑ 或 Alt + ↓
+ 設註解 : ctrl+/ 
+ 跳至 Command line : ctrl+shift+p 或 F1
+ 跳至某一行 : Ctrl+G
+ 全螢幕切換 : F11
+ 多行編輯-選擇行   :  alt+(mouse-left)
+ 多行編輯-選擇多行 :  alt+(mouse-left) 移動位置

<!--more-->

### Package Usage (ctrl+shift+p 跳至 Command line)
#### GitHD
+ View History : 看 history, 看檔案與前版差異
+ View File History : 看 某檔案有關 history, 看檔案與前版差異

### 設定

<div style="width:700px">
	{% asset_img pic1.png pic1 %}
</div>

+ 設定 中文介面
``` bash
install package Chinese(traditional) Lanaguage Pack
ctrl+shift+p --> configure Display Language zh-TW
重新啟動 VSCode
```

+ show CR/tab/space
``` bash
Commonly Used --> Editor:Render Whitespace
	none : no show
	all  : show
```

+ tab change space(no)
``` bash
Commonly Used --> Editor:Insert Spaces
```

+ set indent using tabs(no)
``` bash
# 檔案開啟自動偵測 indentation 
Text Editor --> Detect indentation
```

+ table size 
``` bash
Commonly Used --> Editor:Tab Size
```

+ VSCode Show Full Path in Title Bar
``` bash
Window -> Title
default :
	default : ${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}
	full fath : ${activeEditorLong}${separator}${rootName}
```

+ 自動換行 
``` bash
Commonly Used --> Editor:Word Wrap
	on : 自動換行
```


