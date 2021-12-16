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
pm2 start server.js

pm2 stop 0
pm2 stop 1

pm2 delete app
pm2 delete server
pm2 restart app
pm2 restart server
```

``` Bash
CloudFlare CDN
```

#### send backend
```
# install
npm i @sendgrid/mail
```

``` js
// controllers/order.js

// require on top
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('SG.pUkng3dsa2NQdsfsdseUXSMdo9gvo7g.-mksH0CTsdfs02l7egWVyP2R3KxmVEy7YpC62dsffrb3xG8CFEHv4Z-4');
 
// your create order method with email capabilities
exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // User.find({ categories: { $in: categories } }).exec((err, users) => {}
        console.log('ORDER IS JUST SAVED >>> ', order);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'kaloraat@gmail.com', // admin
            from: 'noreply@ecommerce.com',
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's purchase history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));
 
        // email to buyer
        const emailData2 = {
            to: order.user.email,
            from: 'noreply@ecommerce.com',
            subject: `You order is in process`,
            html: `
            <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
 
        res.json(data);
    });
};
```

### 參考資料
+ [pm2 - 用法大全](https://tn710617.github.io/zh-tw/pm2/)
+ [CloudFlare](https://www.cloudflare.com/zh-tw/)
+ [SendGrid](https://sendgrid.com/) : send mail
+ [Sendinblue](https://www.sendinblue.com/) : send mail

