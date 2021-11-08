---
title: Practice React Ecommerce
abbrlink: 96e
date: 2021-11-05 11:39:36
categories: Project
tags:
	- react
---

### Express
#### install 
+ express
+ dotenv : env 設定
+ nodemon : node 修改自動重啟

``` bash
# npm init
npm init -y
# install module 
npm install express dotenv nodemon
```

<!--more-->

#### simple example
##### .env
``` js
PORT=8000
``` 

##### .gitignore
``` js
node_modules
.env
```

##### package.json - script
``` json
  "scripts": {
    "start": "nodemon app.js"
  },
```

##### app.js
``` js
const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("hello from node !!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

```
npm install mongodb
```

#### change to routes middleware
##### ./app.js
``` js
// ./app.js
const express = require("express");
const app = express();
require("dotenv").config();
// import routes
// const userRoutes = require("./routes/user");
const userRoutes = require("./routes/user");

// routes middleware
app.use(userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```


##### ./routes/user.js
``` js
// ./routes/user.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from routers's user.js");
});

module.exports = router;
```

#### connect mongoDB altas 
##### .env
``` js
PORT=8000
DATABASE=mongodb://robert2:{password}@cluster0-shard-00-00.bscvu.mongodb.net:27017,cluster0-shard-00-01.bscvu.mongodb.net:27017,cluster0-shard-00-02.bscvu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11cyyj-shard-0&authSource=admin&retryWrites=true&w=majority
```
##### ./app.js
``` js
// ./app.js
const express = require("express");
const app = express();
require("dotenv").config();
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");

// import routes
// const userRoutes = require("./routes/user");
const userRoutes = require("./routes/user");

// connect mangoDB altas
// using 2.2.12 or later's uri
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex not support - 課程示範
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

#### 分離出 controller 
##### ./routes/user.js
```
// ./routes/user.js
const express = require("express");
const router = express.Router();
// add controller
const { sayHi } = require("../controllers/user");

router.get("/", sayHi);

module.exports = router;
```

##### ./controller/user.js
```
// ./controller/user.js
// http://localhost:8000/api --> {"message":"hello there!"}
exports.sayHi = (req, res) => {
  res.json({ message: "hello there!" });
};
```

### new section

install
``` bash
npm install uuid
npm install body-parser morgan
npm i cookie-parser
# version 6 會有 error : TypeError: expressValidator is not a function
# 使用 version 5
npm i express-validator@5.3.1
npm i express-jwt jsonwebtoken
```

```
{
  "editor.tabSize": 2,
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "emmet.triggerExpansionOnTab": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.associations": {
    "*.js": "javascriptreact"
  }
}

```

### Postman 
#### user api
##### signup
+ POST http://localhost:8000/api/signup
<div style="max-width:1000px">
	{% asset_img pic1.png pic1 %}
</div>

+ header application/json
<div style="max-width:1000px">
	{% asset_img pic2.png pic2 %}
</div>

+ body 
``` js
{
	"name": "key2",
	"email": "key2@gmail.com",
	"password": "rrrrrr5"
}
```
<div style="max-width:1000px">
	{% asset_img pic3.png pic3 %}
</div>

+ response 
``` js
# 1st time
{
	"user": {
			"name": "key2",
			"email": "key2@gmail.com",
			"hashed_password": "f36f604f6b3f085dea51bc1686d8ff18d915d038",
			"salt": "1740b470-405f-11ec-af6d-67dd2756041e",
			"role": 0,
			"history": {
					"tyep": [],
					"default": []
			},
			"_id": "6188c6e92a5c350c58aa6d98",
			"createdAt": "2021-11-08T06:42:49.790Z",
			"updatedAt": "2021-11-08T06:42:49.790Z",
			"__v": 0
	}
}

# 2nd times
{
	"err": "11000 duplicate key error collection: ecmm.users index: email already exists"
}
```

##### signin
+ POST http://localhost:8000/api/signin
+ header application/json
+ body 
``` js
{
	"email": "key2@gmail.com",
	"password": "rrrrrr5"
}
```
+ response 
``` js
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODc5NTU2YWIyYWVlNzIyYjI2YzI0NSIsImlhdCI6MTYzNjI5Nzg2OX0.jXzr0AMfA7Rwc-tMcljQUc2FKbxcPMAxzqddCaDoqFk",
	"user": {
			"_id": "61879556ab2aee722b26c245",
			"email": "key2@gmail.com",
			"name": "key2",
			"role": 0
	}
}
```

##### signout
+ GET http://localhost:8000/api/signout
+ header application/json
+ response 
``` js
{
	"message": "Signout success"
}
```



### 參考資料
+ [MERN Stack React Node Ecommerce from Scratch to Deployment](https://www.udemy.com/course/react-node-ecommerce/)
+ [react-node-ecommerce](https://github.com/kaloraat/react-node-ecommerce)
+ [MongoDB Atlas](https://www.mongodb.com/atlas/database)
