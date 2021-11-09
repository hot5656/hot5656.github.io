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
#### user API

##### install
``` bash
npm install uuid
# body-parser 被標記為棄用, 使用 express 之 app.use(express.json());
# npm install body-parser 
npm install morgan
npm i cookie-parser
# version 6 會有 error : TypeError: expressValidator is not a function
# 使用 version 5
npm i express-validator@5.3.1
npm i express-jwt jsonwebtoken
```

##### ./app.js : program entry
``` js
// ./app.js
const express = require("express");
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");
// import routes
const userRoutes = require("./routes/user");
// import morgan
const morgan = require("morgan");
// cookie-parser
// const cookieParser = require("cookie-parser");
// express-validator
const expressValidator = require("express-validator");
// env
require("dotenv").config();

// app
const app = express();

// connect mangoDB altas
// using 2.2.12 or later's uri
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// middlewares
app.use(morgan("dev")); // morgan - http request log
app.use(express.json()); // body parser
// app.use(cookieParser());	// cookie-parser
app.use(expressValidator()); // express-validator

// routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

##### ./routes/user.js : route
``` js
// ./routes/user.js
const express = require("express");
const router = express.Router();
// add controller
const { signup, signin, signout } = require("../controllers/user");
// valid
const { userSignupValidator } = require("../validator");

// 註冊加驗證測試
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
```

##### ./validator/index.js - valid field
``` js
// ./validator/index.js
exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 6 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @ and .")
    .isLength({
      min: 6,
      max: 32,
    });
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("password must conatin at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  // console.log(errors);
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
```

##### ./controller/user.js - control every page
``` js
// ./controller/user.js
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
// jwt
const jwt = require("jsonwebtoken"); // to generate signed token
// const express = require("express-jwt"); // for authorization check

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400)({
        error: "User with that email does not exist. Please siginup",
      });
    }

    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password don't match",
      });
    }

    // generate a signed token with user id and secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // persist the thken as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};
```

##### ./helpers/dbErrorHandler.js - 翻譯 DB error message
``` js
// ./helpers/dbErrorHandler.js
"use strict";

/**
 * Get unique error field name
 */
const uniqueMessage = (error) => {
  let output;

  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
exports.errorHandler = (error) => {
  let message = "";

  // 不知為何, 原來的內容如此(object),可提出 .message and .code
  // MongoServerError: E11000 duplicate key error collection: myFirstDatabase.users index: email_1 dup key: { email: "tony@gmail.com" }
  // console.log(`\n\rerror.message->${error.message}=`);
  // console.log(`\n\rerror.code->${error.code}=`);

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errorName in error.errorors) {
      if (error.errorors[errorName].message)
        message = error.errorors[errorName].message;
    }
  }

  return message;
};
```

##### ./models/user.js : access DB
``` js
// ./models/user.js
const mongoose = require("mongoose");
const crypto = require("crypto");
// fix error for uuidv1
// const uuidv1 = require("uuid/v1");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      require: true,
      unique: 32,
    },
    hashed_password: {
      type: String,
      require: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      tyep: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  // verify password
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
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
