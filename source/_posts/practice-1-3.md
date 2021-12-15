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

<!--more-->

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

# test nginx 
ecomadmin@ubuntu-s-1vcpu-1gb-intel-sgp1-01:~$ sudo nginx -t
	nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
	nginx: configuration file /etc/nginx/nginx.conf test is successful
sudo systemctl restart nginx
# 
cd ~
mkdir project
cd project
git clone https://github.com/hot5656/ecommence-front.git
 git clone https://github.com/hot5656/ecommence.git
cd ecommence
sudo touch .env
sudo vim .env
#
PORT=8000
DATABASE=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=...
BRAINTREE_MERCHANT_ID=...
BRAINTREE_PUBLIC_KEY=...
BRAINTREE_PRIVATE_KEY=...
BRAINTREE_MERCHANT_ACCOUNT_ID=...
#
cd ../ecommence-front
sudo touch .env
sudo vim .env
#
REACT_APP_API_URL=/api
#
clear
# install mongodb in digitalocean
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
apt-key list
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod.service
sudo systemctl status mongod
sudo systemctl enable mongod
mongo --eval 'db.runCommand({ connectionStatus: 1 })'
	MongoDB shell version v4.4.10
	connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
	Implicit session: session { "id" : UUID("d69b3786-0246-494e-a573-6a0726ebf2d6") }
	MongoDB server version: 4.4.10
	{
					"authInfo" : {
									"authenticatedUsers" : [ ],
									"authenticatedUserRoles" : [ ]
					},
					"ok" : 1
	}
# 
mongo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use ecommerce
switched to db ecommerce
> exit
# 
npm i pm2 g
sudo npm i -g pm2
# 
cd ~/project/ecommence
npm install
pm2 start app.js
# browsers
http://159.65.2.72/api/products
# 
cd ../ecommence-front
npm install
npm run build
pm2 start server.js
# browser
http://159.65.2.72/
```

``` bash
# add user -key1@gmail.com 

mongo
> show dbs
admin      0.000GB
config     0.000GB
ecommerce  0.000GB
local      0.000GB
> use ecommerce
switched to db ecommerce
> show collections
cartitems
categories
orders
products
users
> db.users.find().pretty();
{
        "_id" : ObjectId("61b9fb27ab69c8a07dd86b2d"),
        "name" : "key1",
        "email" : "key1@gmail.com",
        "hashed_password" : "da975a7c93e9abf2a4d24729372865afbc6bc3a3",
        "salt" : "094ec890-5db3-11ec-920a-cf7ca48b09d9",
        "role" : 0,
        "history" : [ ],
        "createdAt" : ISODate("2021-12-15T14:26:47.837Z"),
        "updatedAt" : ISODate("2021-12-15T14:26:47.837Z"),
        "__v" : 0
}
> db.users.update({_id: ObjectId("61b9fb27ab69c8a07dd86b2d")} , {$set: {role:1}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find().pretty();
{
        "_id" : ObjectId("61b9fb27ab69c8a07dd86b2d"),
        "name" : "key1",
        "email" : "key1@gmail.com",
        "hashed_password" : "da975a7c93e9abf2a4d24729372865afbc6bc3a3",
        "salt" : "094ec890-5db3-11ec-920a-cf7ca48b09d9",
        "role" : 1,
        "history" : [ ],
        "createdAt" : ISODate("2021-12-15T14:26:47.837Z"),
        "updatedAt" : ISODate("2021-12-15T14:26:47.837Z"),
        "__v" : 0
}
> exit
bye
```

```
git add .
git status
git commit -m "update home title"
git push
```

```
sudo git pull
npm run build
pm2 start server.js -f
```



### 參考資料
