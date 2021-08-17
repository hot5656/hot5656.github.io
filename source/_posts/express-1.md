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

#### Sequelize 基本操作

##### insatll sequelize
``` bash
npm install sequelize
```

##### link DB and create table's item
``` js
Sequelize = require('sequelize');
// set db configuration
const sequelize = new Sequelize('mydb', 'robert', 'password', {
	host: 'localhost',
	dialect: 'mysql'
});

// 驗證 DB 
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

// define table field
const User = sequelize.define('user', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING
	}
}, {
	// timestamps: false,			// 關掉產生 timestamp 欄位
	// freezeTableName: true,	// 關掉 自動複數檔案名
});

// create tabel item
sequelize.sync().then(() => {
	User.create({
		firstName: 'Bill',
		lastName: 'Chen'
	}).then (() =>{
		console.log('created!')
	}).catch( err => {
		console.log(err.toString())	
	})
})
```

##### get/modify/delete table item 
``` js
// create tabel item
sequelize.sync().then(() => {
	User.create({
		firstName: 'Bill',
		lastName: 'Chen'
	}).then (() =>{
		console.log('created!')
	}).catch( err => {
		console.log(err.toString())	
	})
})

// get tabel all item 
sequelize.sync().then(() =>{
	User.findAll().then( users => {
		console.log("All user:", JSON.stringify(users,null,4))
	}).catch( err => {
		console.log(err.toString())	
	})
})

// get table condition item
sequelize.sync().then(() => {
	User.findAll({
		where: {
			firstName: 'Bill2'
		}
	}).then( users => {
		console.log(users[0].id, users[0].firstName)
	}).catch( err => {
		console.log(err.toString())	
	})
})

// get table one item
sequelize.sync().then(() => {
	User.findOne({
		where: {
			firstName: 'Bill2'
		}
	}).then( user => {
		console.log(user.id, user.firstName)
	}).catch( err => {
		console.log(err.toString())	
	})
})

// update table's item 
sequelize.sync().then(() => {
	User.findOne({
		where: {
			firstName: 'Bill2'
		}
	}).then( user => {
		user.update({
			lastName: 'aaa'
		})
	}).then(() => {
		console.log('done')	
	}).catch( err => {
		console.log(err.toString())	
	})
})

// detelet table's item 
sequelize.sync().then(() => {
	User.findOne({
		where: {
			firstName: 'Bill2'
		}
	}).then( user => {
		user.destroy()
	}).then(() => {
		console.log('done')	
	}).catch( err => {
		console.log(err.toString())	
	})
})
```

##### related db control
``` js
// define another table field
const Comment = sequelize.define('comment', {
	content: {
		type: Sequelize.STRING,
	}
});
// set mapping to low level table
User.hasMany(Comment)

// create low level table item
sequelize.sync().then(() => {
	Comment.create({
		userId:3,
		content: 'Hi'
	}).then(() => {
		console.log('done')
	})
})

// set mapping to up level table
Comment.belongsTo(User)
// get low level item (include up level item)
sequelize.sync().then(() =>{
	Comment.findOne({
		where: {
			content: 'hello'
		},
		include: User
	}).then(comment => {
		console.log(JSON.stringify(comment, null, 4)) // 排列較易閱讀
		console.log(comment.id, comment.content)
	})
} )

// get up level item (include low level item)
sequelize.sync().then(() => {
	User.findOne({
		where: {
			firstName: 'Bill'
		},
		include: Comment
	}).then(user => {
		console.log(JSON.stringify(user.comments, null, 4)) // 排列較易閱讀
	})
})
```

#### Sequelize CLI

##### install sequelize-cli

``` bash
# install 
npm install sequelize-cli
```

##### init sequeliz 

``` bash
# init sequeliz
npx sequelize-cli init
```

config/config.json
change db configuration
``` json
{
  "development": {
    "username": "robert",
    "password": "password",
    "database": "mydb2",
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

##### create model 

``` bash
# npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
# add field user_level:integer
npx sequelize-cli model:generate --name User --attributes username:string,password:string,nickname:string,user_level:integer
npx sequelize-cli model:generate --name Comment --attributes content:string
```

##### migrate (generate db table) 

``` bash
# 產生 table sequelizemeta, 存執行 log
npx sequelize-cli db:migrate
# if env is test 
# npx sequelize-cli db:migrate --env test
```

##### 為 model 加上關聯

./models/user.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			// 加上關聯設定
			User.hasMany(models.Comment)
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
```

./models/comment.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			// 加上關聯設定
			Comment.belongsTo(models.User)
    }
  };
  Comment.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
```

##### create table item

index.js
``` js
const db = require('./models')
const User = db.User
const Comment = db.Comment

User.create({
	firstName: 'Bill',
	lastName: 'Chen'
}).then(() =>{
	console.log('done!')
}).catch( err => {
	console.log(err.toString())	
})
```

#### 改造留言板
##### data 操作
``` js 
// 在 ejs 可直接使用
res.locals.isLogin = req.session.isLogin
res.locals.errorMessage = req.flash('errorMessage')
// gte 傳入參數
id: req.params.id,
// post 傳入參數
const {	content } = req.body
// session 參數
const {	username,	userId} = req.session
// flash
req.flash('errorMessage', '請輸入完整內容!')
res.locals.errorMessage = req.flash('errorMessage')
```

``` js
// migration - set field unique
username: {
	type: Sequelize.STRING,
	unique: true
},
// migration - add field
'use strict';
// add UserId
UserId: {
  type: Sequelize.INTEGER
},
// controller - findAll add order 
Comment.findAll({
	include: User,
	// 加入 order
	order: [
		['id', 'DESC']
	]
})
// model 加上關聯
class User extends Model {
  /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
  static associate(models) {
     // 加上關聯設定
		User.hasMany(models.Comment)
  }
};
class Comment extends Model {
  /**
    * Helper method for defining associations.
    * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
    */
  static associate(models) {
		// 加上關聯設定
		Comment.belongsTo(models.User)
  }
};
```

##### install and create DB(migrate)
``` bash
# install
npm install sequelize
npm install sequelize-cli
npm install mysql2
# init
npx sequelize-cli init
# create model
npx sequelize-cli model:generate --name User --attributes username:string,password:string,nickname:string
npx sequelize-cli model:generate --name Comment --attributes content:text
# migrate 
npx sequelize-cli db:migrate
```

##### add user id for comment
./migrations/xxx-create-comment.js 加 user id
```js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
			},
			// add UserId
			UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};
```

##### set username unique
./migrations/xxx-create-comment.js set username unique
```js
username: {
	type: Sequelize.STRING,
	unique: true
},
```

##### 撤銷migrate then migrate 
``` bash
# 撤銷 上一次
npx sequelize-cli db:migrate:undo
# 撤銷所有
npx sequelize-cli db:migrate:undo:all
# migrate 
npx sequelize-cli db:migrate
```

##### model 加上關聯
./model/user.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 加上關聯設定
			User.hasMany(models.Comment)
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  ret
```

./model/comment.js
``` js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
			// 加上關聯設定
			Comment.belongsTo(models.User)
    }
  };
  Comment.init({
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
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
const app = express()
const port = 3000

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
	res.locals.userId = req.session.userId
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
	console.log(`Example app listening at http://localhost:${port}`)
})
```

##### view's template
template/head.ejs
``` html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
``` 

template/navbar.ejs
``` html
<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
	<a class="navbar-brand" href="/">留言板</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
		aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
		<div class="navbar-nav">
			<% if (userId) { %>
			<a class="nav-link" href="/logout">登出</a>
			<% } else { %>
			<a class="nav-link" href="/register">註冊</a>
			<a class="nav-link" href="/login">登入</a>
			<% } %>
		</div>
	</div>
</nav>
``` 

##### view 
user/index.ejs
``` html
<!-- ./views/user/index.ejs -->
<!DOCTYPE html>
<html lang="en">

<head>
	<%- include('../template/head') %>
	<title>Document</title>
</head>

<body>
	<%- include('../template/navbar') %>

	<div class="container">
			<% if(errorMessage && errorMessage.length > 0) {  %> 
				<div class="alert alert-danger" role="alert">
					<%= errorMessage %>
				</div>
			<% } %> 

		<% if (userId) { %>
			<div class="h3">hello, <%= username %></div>

			<form  class="mb-3" method="POST" action="/comments">
				<div class="form-group">
					<textarea name="content" class="form-control" rows="3"></textarea>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		<% } %>

		<% comments.forEach( function(comment) { %>
		<div class="card border-light mb-3">
			<div class="card-header">
					<%= comment.User.nickname %>
					<% if (userId == comment.UserId) { %>
					<a href="/comments_delete/<%= comment.id %>">刪除</a>
					<a href="/comments_update/<%= comment.id %>">修改</a>
					<% } %>
				</div>
				<div class="card-body">
					<p class="card-text"><%= comment.content %></p>
				</div>
			</div>
			<% }) %>
	</div>

</body>

</html>
```

user/register.ejs
``` html
<!-- ./views/user/register.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
	<%- include('../template/head') %> 
	<title>Document</title>
</head>
<body>
	<%- include('../template/navbar') %> 

	<div class="container">
		<% if(errorMessage && errorMessage.length > 0) {  %> 
			<div class="alert alert-danger" role="alert">
				<%= errorMessage %>
			</div>
		<% } %> 

		<form method='POST' action="/register">
				<div class="form-group row">
					<label for="inputUsername" class="col-sm-2 col-form-label">username</label>
					<div class="col-sm-10">
						<input type="text"" class="form-control" id="inputUsername" name='username'>
					</div>
				</div>
				<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">password</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" id="inputPassword" name='password'>
				</div>
			</div>
			<div class="form-group row">
				<label for="inputUsername" class="col-sm-2 col-form-label">nickname</label>
				<div class="col-sm-10">
					<input type="text"" class="form-control" id="inputUsername" name='nickname'>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">註冊</button>
		</form>

	</div>
</body>
</html>
```

user/login.ejs
``` html
<!-- ./views/user/login.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
	<%- include('../template/head') %> 
	<title>Document</title>
</head>
<body>
	<%- include('../template/navbar') %> 

	<div class="container">
		<% if(errorMessage && errorMessage.length > 0) {  %> 
			<div class="alert alert-danger" role="alert">
				<%= errorMessage %>
			</div>
		<% } %> 

		<form method='POST' action="/login">
				<div class="form-group row">
					<label for="inputUsername" class="col-sm-2 col-form-label">username</label>
					<div class="col-sm-10">
						<input type="text"" class="form-control" id="inputUsername" name='username'>
					</div>
				</div>
				<div class="form-group row">
				<label for="inputPassword" class="col-sm-2 col-form-label">password</label>
				<div class="col-sm-10">
					<input type="password" class="form-control" id="inputPassword" name='password'>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">登入</button>
		</form>

	</div>
</body>
</html>
```

user/update.ejs
``` html
<!-- ./views/user/update.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
	<%- include('../template/head') %> 
	<title>Document</title>
</head>
<body>
	<%- include('../template/navbar') %> 

	<div class="container">
		<form  method="POST" action="/comments_update/<%= comment.id%>">
			<div class="form-group">
				<textarea name="content" class="form-control" rows="3"><%= comment.content %></textarea>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</form>
	</div>
</body>
</html>
```

##### control 
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
		res.render('user/register')
	},
	handleRegister: (req, res, next) => {
		const {	username,	password,	nickname} = req.body
		if (!username || !password || !nickname) {
			req.flash('errorMessage', '缺少必要欄位!')
			return next()
		}

		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {
				if (err) {
					req.flash('errorMessage', err.toString())
					return next()
				}

				User.create({
					username: username,
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
		res.render('user/login')
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

controllers/comment.js
``` js
// ./controllers/comment.js
const db = require('../models')
const User = db.User
const Comment = db.Comment

const commentController = {
	add: (req, res) => {
		// get body data
		// username,	userId 應只在 ejs 有作用
		const {	username,	userId} = req.session
		const {	content } = req.body
		if (!username || !content) {
			req.flash('errorMessage', '請輸入完整內容!')
			return res.redirect('/')
		}

		Comment.create({
			UserId: userId,
			content: content
		}).then(user => {
			res.redirect('/')
		}).catch(err => {
			req.flash('errorMessage', err.toString())
			return next()
		})
	},
	index: (req, res, next) => {
		Comment.findAll({
				include: User,
				// 加入 order
				order: [
					['id', 'DESC']
				]
			}).then(comments => {
				res.render('user/index', {
					comments
				})
			})
			.catch(err => {
				req.flash('errorMessage', err.toString())
				return next()
			})
	},
	delete: (req, res) => {
		Comment.findOne({
			where: {
				id: req.params.id,
				UserId: req.session.userId
			}
		}).then(comment => {
			// return 與 no return 無差別
			// return comment.destroy()
			comment.destroy()
		}).then( () => {
				res.redirect('/')
		}).catch(err => {
			console.log(err.toString())
			res.redirect('/')
		})
	},
	update: (req, res) => {
		Comment.findOne({
			where: {
				id: req.params.id,
				UserId: req.session.userId
			}
		}).then(comment => {
			res.render('user/update', {
				comment
			})
		}).catch(err => {
			console.log(err.toString())
			res.redirect('/')
		})
	},
	handelUpdate: (req, res) => {
		Comment.findOne({
			where: {
				id: req.params.id,
				UserId: req.session.userId
			}
		}).then(comment => {
			comment.update({
				content: req.body.content
			})
		}).then(() =>{
			res.redirect('/')
		})
		.catch(err => {
			console.log(err.toString())
			res.redirect('/')
		})
	}
}

module.exports = commentController
```

### Ngainx and PM2
#### PM2
##### command
``` bash
# install
npm install pm2 -g
# show pm2 status
pm2 ls
# run index.js(node.js)
pm2 start index.js
# get process log
pm2 log 0
# get process information
pm2 info 0
# stop process information
pm2 stop 0
# restart process information
pm2 restart 0
# delete process information
pm2 delete 0
```

#### Nginx 

##### install
``` bash
# install nginx
sudo apt update
sudo apt install nginx
# install node.js
sudo apt-get install nodejs
sudo apt install npm
sudo npm install -g npm@latest # in need - install lasted version
# dump status and start mginx
sudo systemctl status nginx
sudo systemctl start nginx
```

##### run web server 
index.js
```
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req,res) =>{
                res.send('Hello, 3001....')
})

app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`)})
```

index2.js
```
const express = require('express')
const app = express()
const port = 3002

app.get('/', (req,res) =>{
                res.send('Hi, 3002....')
})

app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`)})

```

``` bash
# start web server
pm2 start index.js
pm2 start index2.js
```

#### set for DNS 
<div style="maxwidth:1000px">
	{% asset_img pic1.png pic1 %}
</div>

##### configure nginx to web server
``` bash
sudo vim /etc/nginx/sites-available/aaa.website
sudo vim /etc/nginx/sites-available/bbb.website
```


``` js
// aaa.website
server {
       listen 80;
       server_name aaa.hot5656.website;

       location / {
         proxy_pass http://127.0.0.1:3001;
       }
}

// bbb.website
server {
       listen 80;
       server_name bbb.hot5656.website;

       location / {
         proxy_pass http://127.0.0.1:3002;
       }
}
```

add soft link 
``` bash
sudo ln -s /etc/nginx/sites-available/aaa.website /etc/nginxsites-enabled/
sudo ln -s /etc/nginx/sites-available/bbb.website /etc/nginxsites-enabled/
```

##### reload nginx
``` bash
sudo systemctl reload nginx
sudo systemctl status nginx
```

### Heroku
#### develop node.js - no db

##### install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
``` bash
heroku -v
node -v
```

##### package.json add "script start" and "engines"
``` js
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "14.x"
  },
```

##### set env port
app.js
``` js
const port = process.env.PORT || 5001
```

##### run heroku local test
``` bash
heroku local web
```

##### develop to heroku

add .gitignore
```
node_modules/
```

git init 
``` bash
git add .
git status
git commit -m "1st commit"
git show-ref
```

push to heroku
``` bash
# login 
heroku login
# create app
heroku create
# list app
heroku lis
# delete app - if need detele other app
# heroku apps:destroy afternoon-plains-5751
git remote -v
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (fetch)
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (push)
# push to heroku
git push heroku master
# open by local browser
heroku open
```

#### develop node.js - include db

##### package.json add "script start" and "engines"
``` js
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "engines": {
    "node": "14.x"
  },
```

##### set env port
index.js
``` js
const port = process.env.PORT || 3000
```

##### run heroku local test
``` bash
heroku local web
```

##### develop to heroku

add .gitignore
```
node_modules/
```

git init 
``` bash
git add .
git status
git commit -m "1st commit"
git show-ref
```

push to heroku
``` bash
# create app
heroku create
git remote -v
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (fetch)
	heroku  https://git.heroku.com/mysterious-ravine-06292.git (push)
# push to heroku
git push heroku master
# open by local browser
heroku open
```

##### develop db for heroku
??

### AWS 部署

```
sudo apt-get update
sudo apt-get install nginx
# 順序有關係
sudo apt-get install nodejs
sudo apt-get install npm

# insuall pm2
# npm install pm2 -g
# found error , upgrade npm
# sudo npm install -g npm@latest
# 應是未加 sudo 
sudo npm install pm2 -g

# some mysql test command 
# sudo systemctl stop mysql.service
# sudo apt-get remove mysql-server
# sudo apt-get install mysql-server
```

```
uploader code
npm install
create db : mydb2
sudo npx sequelize-cli db:migrate
```

change user password
```
ALTER USER 'robert'@'localhost' IDENTIFIED BY 'test@01';
FLUSH PRIVILEGES;
```

firewall open 3000

mysql 
```
# version
mysql -V
```

```
(1)使用 root 進入 MySQL
mysql> mysql -u root -p

(2)遠端登入
mysql> mysql -u root -h remote_host_ip -p
remote_host_ip 指你要登入的遠端MySQL

(3)修改使用者密碼
mysql> SET PASSWORD FOR '目標使用者'@'主機' = PASSWORD('密碼');
mysql> flush privileges;

(4)建立使用者，並給予權限
grant usage on *.* to 'username'@'localhost' identified by 'yourpassword' with grant option; 
grant all privileges on *.* to 'username'@'localhost' identified by 'yourpassword';
flush privileges;

5)刪除mysql的使用者
mysql>delete from mysql.user where user='username' and host='localhost';
mysql>flush privileges;

OR
mysql>DROP USER user@ip_address;

6)查詢 User 的權限
# 秀出系統現在有哪些使用者
SELECT User,Host FROM mysql.user;
# 下述這些結果都一樣, 都是列出目前使用者的權限.
SHOW GRANTS;
SHOW GRANTS FOR CURRENT_USER;
SHOW GRANTS FOR CURRENT_USER();

(7)移除 MySQL 帳號權限
revoke all privileges on *.* from 'username'@'localhost';
flush privileges;

# current user
SELECT CURRENT_USER();
# all user
select User from mysql. user;
SELECT User,Host FROM mysql.user;
#刪除mysql的使用者
mysql>delete from mysql.user where user='username' and host='localhost';
mysql>flush privileges;
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
  password : 'password',
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
+ [PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
+ [How To Install Nginx on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04)
+ [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
+ [Heroku - ClearDB MySQL](https://devcenter.heroku.com/articles/cleardb)