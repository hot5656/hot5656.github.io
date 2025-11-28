---
title: VSCode
abbrlink: f8cb
date: 2021-04-19 13:51:51
categories: Coding
tags:
	- vscode
	- tool
---

### 快速鍵
+ 跳至 Command line : ctrl+shift+p 或 F1(Mac Cmd+Shift+P)
+ 全螢幕切換 : F11
+ 搜尋檔案 : Ctrl + P
---
+ 移動整行程式碼 : Alt + ↑ 或 Alt + ↓ (Mac option + ↑, Option + ↓)
+ 重整程式排列 : shift + alt + F
+ 複製一行 : Ctrl+C
+ 設註解 : ctrl+/ (Mac Cmd+/)
+ 跳至某一行 : Ctrl+G
+ 多行編輯-選擇行   :  alt+(mouse-left)
+ 多行編輯-選擇多行 :  alt+shift+(mouse-left) 移動位置 (Mac shift+Option+(mouse-left))
+ 左移一個字 : Ctrl + Left
+ 右移一個字 : Ctrl + Right
+ 編輯所有符合字串 : 選擇字串 --> Ctrl + shift + L
+ 編輯下一個符合字串 : 選擇字串 --> Ctrl + D
+ 移除前一個編輯符合字串 : 選擇字串 --> Ctrl + U
+ 選擇一整行 : Ctrl + L
+ 複製區塊(前面/後面) : Shift + Alt + UP/DOWN
---
+ 切換左邊功能表(sidebar) : Crtl + B
+ 分割畫面 : Ctrl + \
+ 開關 terminal : Ctrl + ` (反引號)
+ 關閉所有檔案 : Ctrl + K + W
+ 儲存檔案   : Ctrl + s (Mac Cmd+s)

<!--more-->

### Operation
#### 轉換 \n to 換行
``` bash
# Select Replace
Ctrl+H (Windows/Linux) 
Cmd+Option+F (macOS)

# Select : Use Regular expressoin
.*

# Search filed
//n or //t

# Replace fiels
/n or /t

# Replace All
```

### Package Usage (ctrl+shift+p/F1 跳至 Command line)
#### default 
+ 移除每行後面的空白 - Trailing spaces not allowed
Press `F1` --> `Trim Trailing Whitespace`

#### GitHD
+ View History : 看 history, 看檔案與前版差異
+ View File History : 看 某檔案有關 history, 看檔案與前版差異

#### Untabify - Replace tabs with spaces and vice versa.
+ table --> space
1. open file
2. Press `F1` --> `Untabify` --> `Enter` --> `number`(for spece) --> `Enter`

+ space --> table
1. open file
2. Press `F1` --> `Tabify` --> `Enter` --> `number`(for spece) --> `Enter`

### 設定

<div style="width:700px">
	{% asset_img pic1.png pic1 %}
</div>

#### 設定 中文介面
``` bash
install package Chinese(traditional) Lanaguage Pack
ctrl+shift+p --> configure Display Language zh-TW
重新啟動 VSCode
```

#### show CR/tab/space
``` bash
Commonly Used --> Editor:Render Whitespace
	none : no show
	all  : show
```

#### tab change space(no)
``` bash
Commonly Used --> Editor:Insert Spaces
```

#### set indent using tabs(no)
``` bash
# 檔案開啟自動偵測 indentation 
Text Editor --> Detect indentation
```

#### table size 
``` bash
Commonly Used --> Editor:Tab Size
```

#### VSCode Show Full Path in Title Bar
``` bash
Window -> Title
default :
	default : ${dirty}${activeEditorShort}${separator}${rootName}${separator}${appName}
	full fath : ${activeEditorLong}${separator}${rootName}
```

#### 自動換行 
``` bash
Commonly Used --> Editor:Word Wrap
	on : 自動換行
```

#### JSX snippets
``` json
	"emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
	"emmet.triggerExpansionOnTab": true,
```

#### set path
``` json
{
  "terminal.integrated.profiles.windows": {
    "PowerShell": {
      "source": "PowerShell",
      "env": {
        "PATH": "${env:PATH};D:\\app\\python_other\\Graphviz-12.0.0-win64\\bin"
      }
    },
    "Command Prompt": {
      "path": [
        "${env:windir}\\System32\\cmd.exe"
      ],
      "env": {
        "PATH": "${env:PATH};D:\\app\\python_other\\Graphviz-12.0.0-win64\bin"
      }
    }
  },
  "terminal.integrated.defaultProfile.windows": "PowerShell"
}
```

### JSON 設定
+ "editor.detectIndentation": false, - 不可選,否則排版會跟預期不同
+ "editor.renderWhitespace": "all", - 顯示空白
+ "editor.tabSize": 2, - table size
+ "editor.renderControlCharacters": true, - 顯示tab
+ "editor.insertSpaces": false - tab 不自動轉為 space

### Plug
+ Live Server : Web server
+ Chinese Lorem : 中文假字(fenerate by ctlorem)
+ Live Sass Compiler : compile sas/scss(按 Watch Sass)
+ Indent-Rainbow : 縮排採紅色條
+ Git History :  see git log
+ colorize : color 可見可選
+ WhatFont : 網頁字型、字體樣式自動偵測工具
+ AutoFileName : 程式中自動選擇檔案
+ Beautify : Beautify javascript, JSON, CSS, Sass, and HTML in Visual Studio Code
+ EJS language support : 2019 - EJS language support for Visual Studio Code.
+ ES7+ React/Redux/React-Native snippets : JavaScript and React/Redux snippets in ES7+ with Babel plugin features for VS Code
+ ESLint : Integrates ESLint JavaScript into VS Code.
+ Fake Image Snippet Collection :  some nice fake image service for prototyping use
+ Favorites : Add files and directories to workspace favorites. 
+ hex-to-rgba : Allows designers to convert selected Hex Code to RGBA
+ Highlight Matching Tag : Highlights matching closing and opening tags
+ JavaScript (ES6) code snippets : Code snippets for JavaScript in ES6 syntax
+ jQuery Code Snippets : jQuery Code Snippets
+ Jupyter : Jupyter Extension for Visual Studio Code
+ Prettier - Code formatter : Code formatter using prettier
+ ftp-simple : ftp editer(ftp-simple-temp.json)
	``` json
	[
		{
			"name": "ununtu server",
			"host": "192.168.126.187",
			"port": 21,
			"type": "ftp",
			"username": "user",
			"password": "password",
			"path": "/",
			"autosave": true,
			"confirm": false
		}
	]
	```


