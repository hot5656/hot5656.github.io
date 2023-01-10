---
title: Hexo Issue
categories: Blog
tags:
  - hexo
  - issue
abbrlink: b076
date: 2021-03-14 14:13:53
---

## hexo d - "ERROR Deployer not found git"
### Install hexo-deployer-git 
``` bash
npm install hexo-deployer-git --save
```

<!--more-->

## Hexo - No layout index.html(theme-next)
### clone hexo-theme-next 
``` bash
git clone https://github.com/next-theme/hexo-theme-next themes/next
# if insyall by npm - unistall it
npm uninstall hexo-theme-next --save
```

## highlight(lang, code, ...args) has been deprecated
>Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
>Deprecated as of 10.7.0. Please use highlight(code, options) instead.
>https://github.com/highlightjs/highlight.js/issues/2277

### Install hexo-util
``` bash
npm install hexo-util --save
```

## Hexo localhost 打不開
http://localhost:4000

### port 被占用

### 查 port 被占用情形
``` bash
netstat -ano | findstr 0.0:4000
  TCP    0.0.0.0:4000           0.0.0.0:0              LISTENING       5976
```

### 查被誰占用
``` bash
tasklist | findstr 5976
  Code.exe                      5976 Console                    1     92,008 K
```
<!--more-->

### 變更連接埠
``` bash
hexo server -p 5000
```
<br> <br>

###  localhost 的 http 網站被強制導向 https(edge適用)

### 開啟瀏覽器
``` bash
chrome://net-internals/#hsts
edge://net-internals/#hsts
```

### 到最下方找到 Delete domain security policies 設定，輸入localhost按下Delete
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

## Database load failed. Deleting database.(執行 無標籤,分類)
### run "hexo clean" 再執行 "hexo s"
``` bash
D:\work\git\hot5656.github.io>hexo s
INFO  Validating config
INFO  ==================================
  ███╗   ██╗███████╗██╗  ██╗████████╗
  ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
  ██╔██╗ ██║█████╗   ╚███╔╝    ██║
  ██║╚██╗██║██╔══╝   ██╔██╗    ██║
  ██║ ╚████║███████╗██╔╝ ██╗   ██║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝
========================================
NexT version 8.2.2
Documentation: https://theme-next.js.org
========================================
ERROR Database load failed. Deleting database.
INFO  Start processing
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
(node:1368) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:1368) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:1368) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
(node:1368) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(node:1368) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:1368) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
INFO  Bye!

D:\work\git\hot5656.github.io>hexo clean
INFO  Validating config
INFO  ==================================
  ███╗   ██╗███████╗██╗  ██╗████████╗
  ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
  ██╔██╗ ██║█████╗   ╚███╔╝    ██║
  ██║╚██╗██║██╔══╝   ██╔██╗    ██║
  ██║ ╚████║███████╗██╔╝ ██╗   ██║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝
========================================
NexT version 8.2.2
Documentation: https://theme-next.js.org
========================================
INFO  Deleted public folder.

D:\work\git\hot5656.github.io>hexo s
INFO  Validating config
INFO  ==================================
  ███╗   ██╗███████╗██╗  ██╗████████╗
  ████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝
  ██╔██╗ ██║█████╗   ╚███╔╝    ██║
  ██║╚██╗██║██╔══╝   ██╔██╗    ██║
  ██║ ╚████║███████╗██╔╝ ██╗   ██║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝
========================================
NexT version 8.2.2
Documentation: https://theme-next.js.org
========================================
INFO  Start processing
(node:9304) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:9304) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:9304) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
(node:9304) Warning: Accessing non-existent property 'lineno' of module exports inside circular dependency
(node:9304) Warning: Accessing non-existent property 'column' of module exports inside circular dependency
(node:9304) Warning: Accessing non-existent property 'filename' of module exports inside circular dependency
Deprecated as of 10.7.0. highlight(lang, code, ...args) has been deprecated.
Deprecated as of 10.7.0. Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277
INFO  Hexo is running at http://localhost:4000 . Press Ctrl+C to stop.
```

## ERROR Cannot find module 'hexo' from ...
``` bash
# found error
D:\work\git\hot5656.github.io>hexo s
ERROR Cannot find module 'hexo' from 'D:\work\git\hot5656.github.io'
ERROR Local hexo loading failed in D:\work\git\hot5656.github.io
ERROR Try running: 'rm -rf node_modules && npm install --force'

# run npm install hexo --no-optional
D:\work\git\hot5656.github.io>npm install hexo --no-optional
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
added 282 packages, and audited 283 packages in 30s
23 packages are looking for funding
  run `npm fund` for details
4 vulnerabilities (2 low, 2 high)
To address all issues, run:
  npm audit fix
Run `npm audit` for details.

# run npm audit
D:\work\git\hot5656.github.io>npm audit
  - npm audit report
decode-uri-component  <0.2.1
decode-uri-component vulnerable to Denial of Service (DoS) - https://github.com/advisories/GHSA-w573-4hg7-7wgq
fix available via `npm audit fix`
node_modules/decode-uri-component
minimatch  <3.0.5
Severity: high
minimatch ReDoS vulnerability - https://github.com/advisories/GHSA-f8q6-p94x-37v3
fix available via `npm audit fix`
node_modules/minimatch
moment  2.18.0 - 2.29.3
Severity: high
Moment.js vulnerable to Inefficient Regular Expression Complexity - https://github.com/advisories/GHSA-wc69-rhjr-hc9g
fix available via `npm audit fix`
node_modules/moment
moment-timezone  0.1.0 - 0.5.34
Command Injection in moment-timezone - https://github.com/advisories/GHSA-56x4-j7p9-fcf9
fix available via `npm audit fix`
node_modules/moment-timezone
4 vulnerabilities (2 low, 2 high)
To address all issues, run:
  npm audit fix

# run npm audit fix
D:\work\git\hot5656.github.io>npm audit fix
added 1 package, changed 4 packages, and audited 284 packages in 2s
23 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
```