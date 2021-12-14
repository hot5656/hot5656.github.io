---
title: Practice React Ecommerce
abbrlink: 23b1
date: 2021-12-13 21:11:29
categories: Project
tags:
	- deployment
---

### ss
#### ecommerce server(express) add server.js
``` js
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
```

#### github create repository ecommence
```
project\ecommerce\express>git init
project\ecommerce\express>git add .
project\ecommerce\express>git commit -m "push to github"
git remote add origin https://github.com/hot5656/ecommence.git
git push -u origin master
set repository to private
```

#### github create repository ecommence-front
```
project\ecommerce\ecommerce-front>git init

project\ecommerce\express>git add .
project\ecommerce\express>git commit -m "push to github"
git remote add origin https://github.com/hot5656/ecommence-front.git
git push -u origin master
```


```
login cloud.digitalocean.com
```

<!--more-->

### 參考資料
