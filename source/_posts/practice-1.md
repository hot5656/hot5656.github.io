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

### 參考資料
+ [MERN Stack React Node Ecommerce from Scratch to Deployment](https://www.udemy.com/course/react-node-ecommerce/)
+ [react-node-ecommerce](https://github.com/kaloraat/react-node-ecommerce)
+ [MongoDB Atlas](https://www.mongodb.com/atlas/database)
