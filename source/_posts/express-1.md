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
// ./todoController/todo.js
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
// ./todoController/todo.js
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
// ./todoController/todo.js
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
// ./todoController/todo.js
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
// ./todoController/todo.js
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
// ./todoController/todo.js
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