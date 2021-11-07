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

### 參考資料
+ [MERN Stack React Node Ecommerce from Scratch to Deployment](https://www.udemy.com/course/react-node-ecommerce/)
+ [react-node-ecommerce](https://github.com/kaloraat/react-node-ecommerce)
+ [MongoDB Atlas](https://www.mongodb.com/atlas/database)
