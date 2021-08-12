---
title: Express
abbrlink: '1691'
date: 2021-08-03 21:53:42
categories: Back End
tags:
	- express
	- node.js
---

### node.js create web server
``` js
// index.js
const http = require('http')
const server = http.createServer(handler)

function handler(req, res) {
	console.log(req.url)
	if (req.url === '/hello') {
		res.writeHead(200, {
			// 'Connect-Type': 'text/plain' - 沒有效果
			'Connect-Type': 'text/html'
		})
		res.write('<h1>hello!</h1>')
	} 
	else if ( req.url === '/bye'){
		res.write('bye')
	}
	else if ( req.url === '/new'){
		// 轉址
		res.writeHead(301, {
			'Location': '/bye'
		})
	}
	else {
		res.write('Invalid url')
	}
	res.end()
}

server.listen(5001)
```

<!--more-->

### Express server
#### Example #1
``` bash
# install express
npm install express
```

``` js
// index.js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) =>{
	res.send('Hello!')
})

app.get('/hello', (req,res) =>{
	res.send('Hello man!')
})

app.get('/bye', (req,res) =>{
	res.send('Bye!')
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
``` 

#### Example #2 - add template
``` bash
# template engine --> ejs
# install 
npm install ejs
```

``` js
// index.js
const express = require('express')
const app = express()
const port = 3000

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

app.get('/', (req,res) =>{
	res.send('index...')
})


const todos = [
	'first todo', 'second todo', 'third todo'
]

app.get('/todos', (req,res) =>{
	// map to views
	res.render('todos', {
		// ES6 可省略
		// todos: todos
		todos
	})
})

app.get('/todos/:id', (req,res) =>{
	const id = req.params.id
	const todo = todos[id]	
	// map to views
	res.render('todo', {
		todo
	})
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` html
<!-- ./views/todos.ejs -->
<h1>Todos</h1>
<ul>
	<% for(let i=0 ; i<todos.length ; i++) { %>
		<!-- < % = 表要輸出 -->
		<li><%= todos[i] %></li>
	<% } %>
</ul>
```

``` html
<!-- ./views/todo.ejs -->
<h1>Todo</h1>
<h2><%= todo %></h2>
```

#### Example #3 - MVC
``` js
// index.js
const express = require('express')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

const todoController = {
	getAll: (req, res ) => {
		const todos = todoModel.getAll()
		res.render('todos', {
			todos
		})
	},
	get: (req, res ) => {
		const id = req.params.id
		const todo = todoModel.get(id)
		res.render('todo', {
			todo
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: () => {
		return todos
	},
	get: id => {
		return todos[id]
	}
}

module.exports = todoModel
```

#### Example #4 - add mysql 
``` js
// index.js
const express = require('express')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// db.js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'robert',
  password : 'password',
  database : 'app'
});

module.exports = connection
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

const todoController = {
	getAll: (req, res ) => {
		todoModel.getAll((err,results) => {
			if (err) return console.log(err)
			res.render('todos', {
				todos : results
			})
		})
	},
	get: (req, res ) => {
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err)
			res.render('todo', {
				todo : results
			})
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: (cb) => {
		db.query('SELECT * FROM todos', function (error, results) {
			if (error) return cb(error)
			cb(null, results)
		});
	},
	get: (id,cb) => {
		db.query('SELECT * FROM todos WHERE id=?', [id], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results)
			}
		);
	}
}

module.exports = todoModel
```

``` html
<!-- ./views/todos.ejs -->
<h1>Todos</h1>
<ul>
	<% for(let i=0 ; i<todos.length ; i++) { %>
		<!-- < % = 表要輸出 -->
		<!-- <li><%= todos[i].id %>: <%= todos[i].content %></li> -->
		<li><%= todos[i].id + ': ' + todos[i].content %></li>
	<% } %>
</ul>
```

``` html
<!-- ./views/todo.ejs -->
<h1>Todo</h1>
<% if (todo.length >0) { %>
	<h2><%= todo[0].content %></h2>
<% } %> 
```

### express middleware(中介軟體)
#### example - simple ( query string)
``` js
// index.js
const express = require('express')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// total middleware
// app.use((req, rep, next) => {
// 	// middlewate test 
// 	// console.log('Time:', new Date())
// 	// run next step
// 	// next()
// 	// response end
// 	// rep.end()

// 	// middleware test permission
// 	if (req.query.admin === '1') {
// 		next()
// 	}
// 	else {
// 		rep.end('Error!')
// 	}
// })

// add permision check (admin===1)
function checkPermission(req, rep, next) {
	if (req.query.admin === '1') {
		next()
	}
	else {
		rep.end('Error!')
	}
}


// add permision check for one item
app.get('/todos', checkPermission, todoController.getAll)
app.get('/todos/:id', todoController.get)
app.get('/test', (req, res, next) => {
	// query string - { a: '1', b: '2' }
	console.log(req.query)
	// response info
	// console.log(req)
	res.send('Test!')
})

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

// add permision check (admin===1)
// function checkPermission(req) {
// 	return (req.query.admin === '1')
// }

const todoController = {
	getAll: (req, res ) => {
		
		// add permision check (admin===1)
		// http://localhost:3000/todos?admin=1
		// if (!checkPermission(req)) return res.end()
		todoModel.getAll((err,results) => {
			if (err) return console.log(err)
			res.render('todos', {
				todos : results
			})
		})
	},
	get: (req, res ) => {
		// add permision check (admin===1)
		// http://localhost:3000/todos/1?admin=1
		// if (!checkPermission(req)) return res.end()
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err)
			res.render('todo', {
				todo : results
			})
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: (cb) => {
		db.query('SELECT * FROM todos', function (error, results) {
			if (error) return cb(error)
			cb(null, results)
		});
	},
	get: (id,cb) => {
		db.query('SELECT * FROM todos WHERE id=?', [id], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results)
			}
		);
	}
}

module.exports = todoModel
```

#### body parser
``` bash
# install body parser
npm install body-parser
```

``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)
// add add todo
app.get('/', todoController.addTodo)

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

const todoController = {
	getAll: (req, res ) => {
		todoModel.getAll((err,results) => {
			if (err) return console.log(err)
			res.render('todos', {
				todos : results
			})
		})
	},
	get: (req, res ) => {
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err)
			res.render('todo', {
				todo : results
			})
		})
	},
	addTodo: (req, res) => {
		res.render('addTodo')
	},
	newTodo:  (req, res) => {
		// get body data
		const content = req.body.content
		todoModel.add(content, (err) => {
			if (err) return console.log(err)
			res.redirect('/todos')
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: (cb) => {
		db.query('SELECT * FROM todos', function (error, results) {
			if (error) return cb(error)
			cb(null, results)
		});
	},
	get: (id,cb) => {
		db.query('SELECT * FROM todos WHERE id=?', [id], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results)
			}
		);
	},
	add: (content, cb) => {
		db.query('INSERT INTO todos(content) VALUES(?)', [content], 
			function (error, results) {
				if (error) return cb(error)
				// console.log(results)
				cb(null)
			}
		);
	}
}

module.exports = todoModel
```

``` html
<!-- ./views/todos.ejs -->
<h1>Todos</h1>
<a href="/">add todo</a>
<ul>
	<% for(let i=0 ; i<todos.length ; i++) { %>
		<!-- < % = 表要輸出 -->
		<!-- <li><%= todos[i].id %>: <%= todos[i].content %></li> -->
		<li><%= todos[i].id + ': ' + todos[i].content %></li>
	<% } %>
</ul>
```

``` html
<!-- ./views/todo.ejs -->
<h1>Todo</h1>
<% if (todo.length >0) { %>
	<h2><%= todo[0].content %></h2>
<% } %> 
```

``` html
<!-- ./views/addTodo.ejs -->
<h1>AddTodo</h1>

<form method='POST' action="/todos">
	Content: <input type="text" name='content'>
	<input type="submit" >
</form>
```

#### express session
``` bash
# install
npm install express-session
```

``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// add express session
// app.set('trust proxy', 1) // if have proxy and using secure: tre, need run
// if https recommend set cookie: { secure: true }
// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: false
// }));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)
// add add todo
app.get('/', todoController.addTodo)
// login
app.get('/login', (req, res) =>{
	res.render('login')
})
app.post('/login', (req,res) => {
	if (req.body.password === 'abc') {
		req.session.isLogin = true
		res.redirect('/')
	}
	else {
		res.redirect('/login')
	}
})
// logout
app.get('/logout', (req, res) => {
	req.session.isLogin = false
	res.redirect('/')
})

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

const todoController = {
	getAll: (req, res ) => {
		todoModel.getAll((err,results) => {
			if (err) return console.log(err)
			res.render('todos', {
				todos : results
			})
		})
	},
	get: (req, res ) => {
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err)
			res.render('todo', {
				todo : results
			})
		})
	},
	addTodo: (req, res) => {
		res.render('addTodo', {
			isLogin: req.session.isLogin
		})
	},
	newTodo:  (req, res) => {
		// get body data
		const content = req.body.content
		todoModel.add(content, (err) => {
			if (err) return console.log(err)
			res.redirect('/todos')
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: (cb) => {
		db.query('SELECT * FROM todos', function (error, results) {
			if (error) return cb(error)
			cb(null, results)
		});
	},
	get: (id,cb) => {
		db.query('SELECT * FROM todos WHERE id=?', [id], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results)
			}
		);
	},
	add: (content, cb) => {
		db.query('INSERT INTO todos(content) VALUES(?)', [content], 
			function (error, results) {
				if (error) return cb(error)
				// console.log(results)
				cb(null)
			}
		);
	}
}

module.exports = todoModel
```

``` html
<!-- ./views/todos.ejs -->
<h1>Todos</h1>
<a href="/">add todo</a>
<ul>
	<% for(let i=0 ; i<todos.length ; i++) { %>
		<!-- < % = 表要輸出 -->
		<!-- <li><%= todos[i].id %>: <%= todos[i].content %></li> -->
		<li><%= todos[i].id + ': ' + todos[i].content %></li>
	<% } %>
</ul>
```

``` html
<!-- ./views/todo.ejs -->
<h1>Todo</h1>
<% if (todo.length >0) { %>
	<h2><%= todo[0].content %></h2>
<% } %> 
```

``` html
<!-- ./views/addTodo.ejs -->
<h1>AddTodo</h1>
<% if(isLogin) { %>
	你已登入	<a href="/logout">logout</a>
<% } else { %>
	你未登入 
<% } %> 	

<form method='POST' action="/todos">
	Content: <input type="text" name='content'>
	<input type="submit" >
</form>
```

``` html
<!-- ./views/login.ejs -->
<h1>Login</h1>

<form method='POST' action="/login">
	Password: <input type="password" name='password'>
	<input type="submit" >
</form>
```

#### connect-flash
+ connect-flash
+ add global variable - use middleware

``` bash
# install
npm install connect-flash
```

``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add connect flash
const flash = require('connect-flash')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// add connect flash
app.use(flash())

// add express session
// app.set('trust proxy', 1) // if have proxy and using secure: tre, need run
// if https recommend set cookie: { secure: true }
// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: false
// }));
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// add global variable - use middleware
app.use((req, res, next) => {
	res.locals.isLogin = req.session.isLogin
	// add connect flash
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)
// add add todo
app.get('/', todoController.addTodo)
// login
app.get('/login', (req, res) =>{
	res.render('login')
})
app.post('/login', (req,res) => {
	if (req.body.password === 'abc') {
		req.session.isLogin = true
		res.redirect('/')
	}
	else {
		// add connect flash
		req.flash('errorMessage', 'Please input the correct password.')
		res.redirect('/login')
	}
})
// logout
app.get('/logout', (req, res) => {
	req.session.isLogin = false
	res.redirect('/')
})

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/todo.js
const todoModel = require('../models/todo')

const todoController = {
	getAll: (req, res ) => {
		todoModel.getAll((err,results) => {
			if (err) return console.log(err)
			res.render('todos', {
				todos : results
			})
		})
	},
	get: (req, res ) => {
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err)
			res.render('todo', {
				todo : results
			})
		})
	},
	addTodo: (req, res) => {
		res.render('addTodo')
	},
	newTodo:  (req, res) => {
		// get body data
		const content = req.body.content
		todoModel.add(content, (err) => {
			if (err) return console.log(err)
			res.redirect('/todos')
		})
	}
}

module.exports = todoController
```

``` js
// ./modules/todo.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const todoModel = {
	getAll: (cb) => {
		db.query('SELECT * FROM todos', function (error, results) {
			if (error) return cb(error)
			cb(null, results)
		});
	},
	get: (id,cb) => {
		db.query('SELECT * FROM todos WHERE id=?', [id], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results)
			}
		);
	},
	add: (content, cb) => {
		db.query('INSERT INTO todos(content) VALUES(?)', [content], 
			function (error, results) {
				if (error) return cb(error)
				// console.log(results)
				cb(null)
			}
		);
	}
}

module.exports = todoModel
```

``` html
<!-- ./views/login.ejs -->
<h1>Login</h1>

<h2><%= errorMessage %> </h2>

<form method='POST' action="/login">
	Password: <input type="password" name='password'>
	<input type="submit" >
</form>
```

#### 簡易會員註冊系統
``` bash
# insatll bcrypt
npm install bcrypt
```

``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add connect flash
const flash = require('connect-flash')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')
const userController = require('./controllers/user')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// add connect flash
app.use(flash())

// add express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// add global variable - use middleware
app.use((req, res, next) => {
	res.locals.username = req.session.username
	// add connect flash
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

function redirectBack(req, res) {
	res.redirect('back')
}

app.get('/',  (req, res ) => {
	res.render('user/index')
})
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)


app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/user.js
const userModel = require('../models/user')
// add bcrypt
const bcrypt = require('bcrypt')
const saltRounds = 10

const userController = {
	register: (req, res ) => {
		res.render('user/register')
	},
	handleRegister: (req, res , next) => {
		const {username, password, nickname} = req.body
		if (!username || !password || !nickname) {
			req.flash('errorMessage', '缺少必要欄位!')
			return next() 
		}

		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
					if (err) {
						req.flash('errorMessage', err.toString())
						return next() 
					}

					userModel.add({
						username,
						nickname,
						password: hash
					}, (err) => {
						if (err) {
							req.flash('errorMessage', err.toString())
							return next() 
						}
						req.session.username = username
						res.redirect('/')
					})
			});
	});

	},
	login: (req, res ) => {
		res.render('user/login')
	},
	handleLogin: (req, res, next) => {
		const {username, password} = req.body
			if (!username || !password) {
				req.flash('errorMessage', '該填未填!')
				return next()
			}
			
			userModel.get(username, (err, user) => {
			if (err) {
				req.flash('errorMessage', err.toString())
				return next()		
			}

			if (!user) {
				req.flash('errorMessage', '無此帳號!')
				return next()		
			}

			bcrypt.compare(password, user.password, function(err, isSuccess) {
				if (err || (!isSuccess)) {
					req.flash('errorMessage', '密碼錯誤!')
					return next()		
				}
				req.session.username = user.username 
				res.redirect('/')		
			});
		})
	},
	logout: (req, res) => {
		req.session.username = null
		res.redirect('/')
	}
}

module.exports = userController
```

``` js
// ./modules/user.js
// add todo db
const db = require('../db')

const todos = [
	'first todo', 'second todo', 'third todo'
]
const userModel = {
	add: (user, cb) => {
		db.query('INSERT INTO users(username, password, nickname) VALUES(?, ?, ?)',
		 	[user.username, user.password, user.nickname], 
			function (error, results) {
				if (error) return cb(error)
				cb(null)
			}
		);
	},
	get: (username,cb) => {
		db.query('SELECT * FROM users WHERE username=?', [username], 
			function (error, results) {
				if (error) return cb(error)
				cb(null, results[0])
			}
		);
	},

}

module.exports = userModel
```

``` html
<!-- ./views/user/index.ejs -->
<h1>簡易會員系統</h1>

<% if (username) { %> 
	hello, <%= username %> <br>
	<!-- 可執行 HTML -->
	hello, <%- username %> <br>
	<a href="/logout">登出</a>
<% } else { %> 
	<a href="/register">註冊</a>
	<a href="/login">登入</a>
<% } %> 
```

``` html
<!-- ./views/user/register.ejs -->
<h1>註冊頁面</h1>

<h2><%= errorMessage %> </h2>
<form method='POST' action="/register">
	<div>username: <input type="textd" name='username'></div>
	<div>password: <input type="password" name='password'></div>
	<div>nickname: <input type="text" name='nickname'></div>
	<input type="submit" >
</form>
```

``` html
<!-- ./views/user/login.ejs -->
<h1>登入頁面</h1>

<h2><%= errorMessage %> </h2>
<form method='POST' action="/login">
	<div>username: <input type="textd" name='username'></div>
	<div>password: <input type="password" name='password'></div>
	<input type="submit" >
</form>
```

#### 簡易留言板
``` js
// index.js
const express = require('express')
// add body parser
const bodyParser = require('body-parser')
// add express session
const session = require('express-session')
// add connect flash
const flash = require('connect-flash')
// add todo db
const db = require('./db')
const app = express()
const port = 3000

const todoController = require('./controllers/todo')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')

// set view engine type - directory is ./views
app.set('view engine', 'ejs')

// add body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// add connect flash
app.use(flash())

// add express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// add global variable - use middleware
app.use((req, res, next) => {
	res.locals.username = req.session.username
	// add connect flash
	res.locals.errorMessage = req.flash('errorMessage')
	next()
})

function redirectBack(req, res) {
	res.redirect('back')
}

app.get('/', commentController.index) 
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)

app.post('/comments', commentController.add)
app.get('/comments_delete/:id', commentController.delete)
app.get('/comments_update/:id', commentController.update)
app.post('/comments_update/:id', commentController.handelUpdate)

app.listen(port, () => {
	// add todo db
	db.connect()
	console.log(`Example app listening at http://localhost:${port}`)
})
```

``` js
// ./controllers/comment.js
const commentModel = require('../models/comment')

const commentController = {
	add:  (req, res) => {
		// get body data
		const {username} = req.session
		const {content} = req.body
		if (!username || !content ) {
			req.flash('errorMessage', '請輸入完整內容!')
			return res.redirect('/')
		}

		commentModel.add(username, content, (err) => {
			if (err) req.flash('errorMessage', err.toString())
			res.redirect('/')
		})
	},
	index: (req, res) => {
		commentModel.getAll((err, results) => {
			if (err) {
				req.flash('errorMessage', err.toString())
			}
			res.render('user/index', {
				comments: results
			} )
		})
	},
	delete: (req, res) => {
		commentModel.delete(req.session.username, req.params.id, (err) => {
			res.redirect('/')
		})
	},
	update: (req, res) => {
		commentModel.get(req.params.id, (err, result) => {
			res.render('user/update',{
				comment: result
			})
		})
	},
	handelUpdate: (req, res) => {
		commentModel.update(req.session.username, req.params.id, req.body.content, (err) => {
			res.redirect('/')
		})
	}
}

module.exports = commentController
```

``` js
// ./modules/comment.js
// add todo db
const db = require('../db')

const todoModel = {
	add: (username, content, cb) => {
		db.query('INSERT INTO comments(username, content) VALUES(?, ?)', 
			[username ,content], 
			function (error, results) {
				if (error) return cb(error)
				cb(null)
			}
		)
	},
	getAll: (cb) => {
		db.query(
			`SELECT U.nickname, C.content, C.id, U.username
			FROM comments AS C LEFT JOIN users as U 
			on U.username = C.username ORDER BY C.id DESC`,
			(err, results) => {
				if (err) return cb(err)
				cb(null, results)
			}
		)
	},
	delete: (username, id, cb) => {
		db.query(
			`DELETE FROM comments WHERE id=? AND username=?`, [id, username], 
			(err, results) => {
				if (err) return cb(err)
				cb(null)
			}
		)		
	},
	get: (id, cb) => {
		db.query(
			`SELECT U.nickname, C.content, C.id, U.username
			FROM comments AS C LEFT JOIN users as U 
			on U.username = C.username WHERE C.id=?`, [id],
			(err, results) => {
				if (err) return cb(err)
				cb(null, results[0] || {})
			}
		)
	},
	update: (username, id, content, cb) => {
		db.query(
			`UPDATE comments SET content=? WHERE id=? AND username=?`, 
			[content , id, username], 
			(err, results) => {
				if (err) return cb(err)
				cb(null)
			}
		)		
	}
}

module.exports = todoModel
```

``` html
<!-- ./views/user/index.ejs -->
<h1>簡易會員系統</h1>
<h2><%= errorMessage %> </h2>

<% if (username) { %> 
	hello, <%= username %> 
	<a href="/logout">登出</a>

	<form method="POST" action="/comments">
		<textarea name="content"></textarea>
		<input type="submit">
	</form>

<% } else { %> 
	<a href="/register">註冊</a>
	<a href="/login">登入</a>
<% } %> 

<% comments.forEach( function(comment) { %> 
	<h2><%= comment.nickname %> 
		<% if (username == comment.username) { %>
			<a href="/comments_delete/<%= comment.id %>">刪除</a>
			<a href="/comments_update/<%= comment.id %>">修改</a>
		<% } %> 
	</h2>
	<p><%= comment.content %> </p>
<% }) %> 
```

``` html
<!-- ./views/user/update.ejs -->
<h1>編輯留言</h1>

<form method="POST" action="/comments_update/<%= comment.id%>">
	<textarea name="content"><%= comment.content %> </textarea>
	<input type="submit">
</form>
```

### ORM 與 Sequelize
ORM : Object Relational Mapping

``` bash
# install 
npm install sequelize
```


``` bash
# install 
npm install sequelize-cli
# init
npx sequelize-cli init
```

config/config.json
``` json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
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

create model 
``` bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npx sequelize-cli model:generate --name Comment --attributes content:string

npx sequelize-cli db:migrate
# 產生 table sequelizemeta, 存執行 log
# if env is test 
# npx sequelize-cli db:migrate --env test
```

### npm mysql
#### example #1
``` bash
# install mysql
npm install mysql
```

``` js
// db.js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'robert',
  password : 'test@01',
  database : 'app'
});
 
connection.connect();
 
connection.query('SELECT * from todos', function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].content);
});
 
connection.end();
```



### 參考資料
+ [Express](https://expressjs.com/)
+ [npm mysql](https://www.npmjs.com/package/mysql)
+ [Express 中介軟體](https://expressjs.com/zh-tw/guide/using-middleware.html)
+ [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html)
+ [connect-flash](https://www.npmjs.com/package/connect-flash)
+ [bcrypt](https://www.npmjs.com/package/bcrypt)
+ [Sequelize](https://sequelize.org/)
+ [sequelize/cli](https://www.npmjs.com/package/sequelize-cli)