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
npm install body-parser
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
    "host": "localhost",
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

### lottery api
#### api source
##### module install + sqeuwlize-cli init
``` bash
npm init
npm install express
npm install ejs
npm install body-parser
# connect-flash need express-session
npm install express-session
npm install connect-flash
npm install sequelize
npm install sequelize-cli
npm install mysql2
# insatll bcrypt
npm install bcrypt
# install cors
npm install cors
# init 
npx sequelize-cli init
```

##### config.json
config/config.json
``` json
{
  "development": {
    "username": "robert",
    "password": "password",
    "database": "mydb2",
    "host": "localhost",
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

##### create db(migrate)
``` bash
# Lottery
npx sequelize-cli model:generate --name Lottery --attributes type:string,index:integer,prize:string,description:string,url:string,probability:integer
# User
npx sequelize-cli model:generate --name User --attributes username:string,password:string,nickname:string,user_level:integer
# migrate
npx sequelize-cli db:migrate
```

##### index.js
``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add connect flash
const flash = require('connect-flash')
// add cors
const cors = require('cors')
// start express
const app = express()
const port = process.env.PORT || 5000
// controllers
const userController = require('./controllers/user')
const lotteryController = require('./controllers/lottery')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// add connect flash
app.use(flash())

// add session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// add global variable - use middleware
app.use((req, res, next) => {
	res.locals.userId = req.session.userId
	// add connect flash
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

function redirectBack(req, res) {
	res.redirect('back')
}

app.get('/', lotteryController.index)
app.get('/add', lotteryController.add)
app.post('/add-handle', lotteryController.addHandle, redirectBack)
app.get('/update/:id', lotteryController.update)
app.post('/update-handle/:id', lotteryController.updateHandle, redirectBack)
app.get('/delete/:id', lotteryController.delete)

app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/users', userController.index)

app.get('/:type', cors(), lotteryController.lottery)


// start express
app.listen(port, () => {
	console.log(`blog app listening at http://localhost:${port}`)
})
```

##### controllers
controllers/lottery.js
``` js
// ./controllers/lottery.js
const db = require('../models')
const Lottery = db.Lottery

const lotteryController = {
	index: (req, res) => {
		Lottery.findAll({
			order: [
				['type', 'ASC'],
				['index', 'ASC'],
			]
		}).then(lotteries =>{
				res.render('index', {
					lotteries
				})
			}).catch(err => {
				console.log(err.toString())
				res.redirect('/')
			}) 
	},
	add: (req, res) => {
		res.render('add')
	},
	update: (req, res) => {
		Lottery.findOne({
			where: {
				id: req.params.id
			}
		}).then(lottery =>{
			res.render('update',{
				lottery
			})
		}).catch(err => {
			console.log(err.toString())
			res.redirect('/')
		}) 
	},
	addHandle: (req, res, next) => {
		const {	type, index, prize, description, url} = req.body
		let {	probability} = req.body
		if( !type || !index || !prize || !description || !url || !probability ){
			req.flash('errorMessage', '缺少必要欄位!')
			return next()
		}

		if (prize === 'NONE') {
			probability = 0
		}

		Lottery.findAll({
			where: {
				type: type
			}
		}).then( lotteries => {
			let percent = 0
			lotteries.forEach( lottery =>{
				percent += lottery.probability
			})

			// console.log(percent,  probability, percent+probability, (percent+Number(probability)) >= 100)
			if ((percent+Number(probability)) >= 100) {
				// req.flash('errorMessage', '總機率設定太高!')
				// next()
				throw 'over probability!';
			}
		}).then( () =>{
			Lottery.create({
				type,
				index,
				prize,
				description,
				url,
				probability
			})
		}).then(lottery => {
			res.redirect('/')
		}).catch(err => {
			if (err.toString() === 'over probability!')  {
				req.flash('errorMessage', '總機率設定太高!')
			}
			else {
				req.flash('errorMessage', err.toString())
			}
			return next()
		})
	},
	updateHandle: (req, res, next) => {
		const {	index, type, prize, description, url} = req.body
		let {	probability} = req.body
		if( !index || !prize || !description || !url || !probability ){
			req.flash('errorMessage', '缺少必要欄位!')
			return next()
		}

		if (prize === 'NONE') {
			probability = 0
		}

		Lottery.findAll({
			where: {
				type: type
			}
		}).then( lotteries => {
			let percent = 0
			lotteries.forEach( lottery =>{
				if (lottery.id !== Number(req.params.id)) {
					percent += lottery.probability
				}
			})

			// console.log(type, percent,  probability, percent+probability, (percent+Number(probability)) >= 100)
			if ((percent+Number(probability)) >= 100) {
				// req.flash('errorMessage', '總機率設定太高!')
				// next()
				throw 'over probability!';
			}
		}).then( () =>{
			Lottery.findOne({
				where: {
					id: req.params.id
				}
			}).then(lottery =>{
				lottery.update({
					index,
					prize,
					description,
					url,
					probability
				})
			})
		}).then(lottery => {
			res.redirect('/')
		}).catch(err => {
			if (err.toString() === 'over probability!')  {
				req.flash('errorMessage', '總機率設定太高!')
			}
			else {
				req.flash('errorMessage', err.toString())
			}
			return next()
		})
	},
	delete: (req,res) => {
		Lottery.findOne({
			where: {
				id: req.params.id
			}
		}).then( lottery =>{
			lottery.destroy()
		}).then(() =>{
			res.redirect('/')
		}).catch( err =>{
			console.log(err.toString())
			res.redirect('/')
		})
	}, 
	lottery: (req,res) => {
		let {type} = req.params
		let value = Math.floor(Math.random()*100)
		let percent = 0
	 	let prize = {
		 	prize: 'NULL',
		 	description: 'NULL',
		 	url: 'NULL'
		}					
		// console.log('valeu : ', value) 
		Lottery.findAll({
			where: {
				type: type
			},
			order: [
				['probability', 'DESC' ]
			]
		}).then( lotteries => {
			for (let i=0 ; i<lotteries.length ; i++) {
				// console.log(lotteries[i].id, lotteries[i].prize, lotteries[i].probability)
				percent += lotteries[i].probability

				if ((lotteries[i].prize === 'NONE') || (value < percent)) {
					prize = {
							prize: lotteries[i].prize,
							description: lotteries[i].description,
							url: lotteries[i].url
						}					
						break
				}
			} 
			// console.log(prize)
			res.json(prize)
		}).then().catch(err=> {
			console.log(err.toString())
			res.end()
		})
	}
}

module.exports = lotteryController
```

controllers/user.js
``` js
// ./controllers/user.js
const db = require('../models')
const User = db.User
// add bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {
	register: (req, res) => {
		res.render('register')
	},
	index: (req, res) => {
		User.findAll().then(users =>{
				res.render('users', {
					users
				})
			}).catch(err => {
				console.log(err.toString())
				res.redirect('/')
			}) 
	},
	handleRegister: (req, res, next) => {
		const {	username,	password,	nickname, user_level} = req.body
		if (!username || !password || !nickname || !user_level) {
			req.flash('errorMessage', '缺少必要欄位!')
			return next()
		}

		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) {
					req.flash('errorMessage', err.toString())
					return next()
				}

				console.log(user_level, typeof user_level)
				level = Number(user_level)
				console.log(level, typeof level)
				User.create({
					username: username,
					// nickname: nickname,
					// user_level: 1,	
					user_level: 1,
					nickname: nickname,
					password: hash
				}).then(user => {
					req.session.userId = user.id
					req.session.username = user.username
					res.redirect('/')
				}).catch(err => {
					req.flash('errorMessage', err.toString())
					return next()
				})
			});
		});

	},
	login: (req, res) => {
		res.render('login')
	},
	handleLogin: (req, res, next) => {
		const {username,password} = req.body
		if (!username || !password) {
			req.flash('errorMessage', '該填未填!')
			return next()
		}

		User.findOne({
			where: {
				username: username
			}
		}).then(user => {
			if (!user) {
				req.flash('errorMessage', '無此帳號!')
				return next()
			}

			bcrypt.compare(password, user.password, function (err, isSuccess) {
				if (err || (!isSuccess)) {
					req.flash('errorMessage', '密碼錯誤!')
					return next()
				}
				// console.log(user)
				req.session.userId = user.id
				req.session.username = user.username
				res.redirect('/')
			})
		}).catch(err => {
			req.flash('errorMessage', err.toString())
			return next()
		})
	},
	logout: (req, res) => {
		req.session.userId = null
		req.session.username = null
		res.redirect('/')
	}
}

module.exports = userController
```

#### tes DB
``` bash
INSERT INTO `lotteries` (`id`, `type`, `index`, `prize`, `description`, `url`, `probability`, `createdAt`, `updatedAt`) VALUES
(4, 'lottery', 4, 'NONE', '銘謝惠顧!', 'https://upload.cc/i1/2021/08/22/0Nvx17.jpg', 0, '2021-08-21 12:28:17', '2021-08-22 01:33:43'),
(5, 'lottery', 3, 'THIRD', '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', 'https://upload.cc/i1/2021/08/22/Hbqtd8.jpg', 50, '2021-08-21 12:36:24', '2021-08-22 01:22:01'),
(6, 'lottery', 2, 'SECOND', '二獎！90 吋電視一台！', 'https://upload.cc/i1/2021/08/22/r30doC.jpg', 20, '2021-08-21 12:37:16', '2021-08-22 01:21:46'),
(7, 'lottery', 1, 'FIRST', '恭喜你中頭獎了！日本東京來回雙人遊!', 'https://upload.cc/i1/2021/08/22/yjaht9.jpg', 10, '2021-08-21 12:38:27', '2021-08-22 01:21:30');
```

#### develop to heroku
##### package.json add "script" and "engines"
``` bash
heroku -v
node -v
```

package.json
``` json
  "scripts": {
    "db:migrate": "npx sequelize db:migrate",
    "start": "npm run db:migrate && node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "14.x"
  },
```

##### set env port
index.js
``` js
const port = process.env.PORT || 5000
```

##### run heroku local test
``` bash
heroku local web
```

##### set config/config.json for DB
```
"production": {
  "username": "root",
  "password": null,
  "database": "database_production",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "use_env_variable": "CLEARDB_DATABASE_URL"
}
```

##### push to heroku

add .gitignore
```
node_modules/
```

git init and commit
``` bash
git add .
git status
git commit -m "1st commit"
git show-ref
```

heroku create and push
``` bash
# login - if never login
# heroku login
# create app
heroku create
# add db
heroku addons:create cleardb:ignite
# list app - if want to see other app
# delete app - if need detele other app
# heroku lis
git remote -v
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (fetch)
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (push)
# push to heroku
git push heroku master
# open by local browser
heroku open
```
