---
title:  Express practice
abbrlink: 17d1
date: 2021-08-14 13:06:26
categories: Back End
tags:
	- express
	- node.js
---


### Blog 重構
#### module install + sqeuwlize-cli init 
``` bash
npm install express
npm install ejs
express body-parser
npm install express-session
npm install connect-flash
npm install sequelize
npm install sequelize-cli
npm install mysql2
npm install bcrypt
# init 
npx sequelize-cli init
```

<!--more-->

#### config.json
config/config.json
``` json
{
  "development": {
    "username": "robert",
    "password": "password",
    "database": "mydb2",
    "host": "local",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

#### create db(migrate)
``` bash
# User
npx sequelize-cli model:generate --name User --attributes username:string,password:string,nickname:string
# User_level
npx sequelize-cli model:generate --name User_level --attributes user_level:integer,level_describe:string,user_admin:integer,all_modify:integer,all_delete:integer,self_create:integer,self_modify:integer,self_delete:integer 
# Blog_category
npx sequelize-cli model:generate --name Blog_category --attributes name:string,deleted:integer
# Blog
npx sequelize-cli model:generate --name Blog --attributes BlogCategoryId:integer,title:string,content:text,deleted:boolean
# migrate
npx sequelize-cli db:migrate
```

#### set css path
``` js
// index.js
// add connect flash - css patch
var path = require('path')
// css patch
app.use(express.static(path.join(__dirname, '/public')))

// views/template/head.ejs
<link rel="stylesheet" href="/css/normalize.css">
<link rel="stylesheet" href="/css/style.css">
```

#### model 加上關聯
./model/blog.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 加上關聯設定
      Blog.belongsTo(models.Blog_category)
    }
  };
  Blog.init({
    BlogCategoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
```

./model/blog_category.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      	// 加上關聯設定
		    Blog_category.hasMany(models.Blog)
    }
  };
  Blog_category.init({
    name: DataTypes.STRING,
    deleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog_category',
  });
  return Blog_category;
};
```

#### index.js
``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add connect flash
const flash = require('connect-flash')
// add connect flash - css patch
var path = require('path')
// start express
const app = express()
const port = 5000

const blogController = require('./controllers/blog')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// add connect flash
app.use(flash())

// add global variable - use middleware
// const flash = require('connect-flash')
app.use((req, res, next) => {
	res.locals.username = req.session.username
	// add connect flash
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

function redirectBack(req, res) {
	res.redirect('back')
}

// css patch
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', blogController.index) 
app.get('/login', blogController.login) 
app.post('/login', blogController.loginHandle, redirectBack) 
app.get('/logout', blogController.logout) 
app.get('/about', blogController.about) 
app.get('/edit/:id', blogController.edit) 
app.get('/delete/:id', blogController.delete) 
app.post('/editHandle/:id', blogController.editHandle) 
app.get('/create', blogController.create) 
app.post('/createHandle', blogController.createHandle)
app.get('/list', blogController.list) 
app.get('/page/:id', blogController.page) 
app.get('/admin', blogController.admin) 
app.get('/all', blogController.all) 


// start express
app.listen(port, () => {
	console.log(`blog app listening at http://localhost:${port}`)
})
```