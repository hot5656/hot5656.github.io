---
title: Yarn
abbrlink: '4010'
date: 2021-05-03 16:10:20
categories: Front End
tags:
	- node.js
	- yarn
---

Yarn 是 Facebook 發佈的一款 JavaScript 套件管理工具，其功能與 npm 相同，速度較快

### install by npm
``` bash
npm install -g yarn
```

<!--more-->

### [command](https://classic.yarnpkg.com/en/docs/usage)
#### dump version
``` bash
$ yarn -v
1.22.10
```

#### init 
``` bash
$ yarn init
yarn init v1.22.10
question name (js102):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
Done in 4.51s.
```

#### add package
``` bash
$ yarn add left-pad
yarn add v1.22.10
info No lockfile found.
[1/4] Resolving packages...
warning left-pad@1.3.0: use String.prototype.padStart()
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ left-pad@1.3.0
info All dependencies
└─ left-pad@1.3.0
Done in 0.43s.
```

#### remove package
``` bash
$ yarn remove left-pad
yarn remove v1.22.10
[1/2] Removing module left-pad...
[2/2] Regenerating lockfile and installing missing dependencies...
success Uninstalled packages.
Done in 0.17s.
```

#### run script example
``` js
// index.js
let leftPad = require('left-pad')
// insert 0 before number 
console.log(leftPad(123, 10, '0'))
```

package.json
``` json
{
  "name": "js102",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "license": "MIT",
  "dependencies": {
    "left-pad": "^1.3.0"
  }
}
```

``` bash
$ yarn run start
yarn run v1.22.10
$ node index.js
0000000123
Done in 0.18s.
```