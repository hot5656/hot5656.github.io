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
``` bash
project\ecommerce\ecommerce-front>git init

project\ecommerce\express>git add .
project\ecommerce\express>git commit -m "push to github"
git remote add origin https://github.com/hot5656/ecommence-front.git
git push -u origin master
```


``` bash
login cloud.digitalocean.com


# login server 
adduser ecomadmin
# add ecomadmin to sudo user
sudo adduser ecomadmin sudo


# login server by ecomadmin
# disable root login
sudo vim /etc/ssh/sshd_config
# PermitRootLogin yes --> no 
sudo service ssh restart
```

``` bash
# install node in digital ocean
sudo apt update
sudo apt install nodejs
node -v
sudo apt remove nodejs
# install lasted
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
# if see nodesource_setup.sh
nano nodesource_setup.sh
# run nodesource_setup.sh
sudo bash nodesource_setup.sh
# install nodejs
sudo apt install nodejs
node -v
	v16.13.1
```

``` bash
sudo apt install nginx
cd /etc/nginx/sites-available
ls
	default
sudo vim default
# how to run node in digitalocean
# location /api {
#   proxy_set_header X-Real-IP $remote_addr;
#   pproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#   pproxy_set_header X-NginX-Proxy true;
#   pproxy_pass http://localhost:8000;
#   pproxy_set_header Host $http_host;
#   p proxy_cache_bypass $http_upgrade;
#   pproxy_redirect off;
# }
#
# location / {
#   proxy_set_header X-Real-IP $remote_addr;
#   pproxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#   pproxy_set_header X-NginX-Proxy true;
#   pproxy_pass http://localhost:3000;
#   pproxy_set_header Host $http_host;
#   p proxy_cache_bypass $http_upgrade;
#   pproxy_redirect off;
# }
```

<!--more-->

### 參考資料
