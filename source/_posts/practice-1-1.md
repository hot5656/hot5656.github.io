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
      return res.status(400).json({
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

#### Auth and Admin middlewares
+ ./controllers/user.js 改為 auth.js
+ ./routers/user.js 改為 auth.js

##### ./app.js : add app.use("/api", userRoutes) for using Auth
``` js
// ./app.js
const express = require("express");
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// import morgan
const morgan = require("morgan");
// cookie-parser
const cookieParser = require("cookie-parser");
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
app.use(cookieParser()); // cookie-parser
app.use(expressValidator()); // express-validator

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

##### ./routes/user.js : add new link /secrect/:userId
+ ../controllers/auth 
	+ requireSignin : check token
	+ isAuth : check user auth
	+ isAdmin : check admin(role == 1)
+ router.param("userId", userById) : if include parameter userId call userById
+ add ./controllers/user.js for userById

``` js
// ./routes/user.js
const express = require("express");
const router = express.Router();
// add controller
const { userById } = require("../controllers/user");
// add controller
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secrect/:userId", requireSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.param("userId", userById);

module.exports = router;
```

##### ./controller/auth.js : add requireSignin, isAuth, isAdmin
``` js
// ./controller/auth.js
const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
// jwt
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJWT = require("express-jwt"); // for authorization check
require("dotenv").config();

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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log("token:", token);
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

// need have cookie-parser
// for authorization check
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({ error: "Admin resource! Access denied" });
  }
  next();
};
```

##### ./controllers/user.js
``` js
// ./controllers/user.js
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
```


#### add Category and Product 

##### install
``` bash
npm i formidable lodash
```

##### ./app.js
``` js
// ./app.js
const express = require("express");
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// add Category and Product
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
// import morgan
const morgan = require("morgan");
// cookie-parser
const cookieParser = require("cookie-parser");
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
app.use(cookieParser()); // cookie-parser
app.use(expressValidator()); // express-validator

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
// add Category and Product
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

##### ./routes/category.js
``` js
// ./routes/category.js
const express = require("express");
const router = express.Router();
// add controller
const {
  create,
  categoryById,
  read,
  remove,
  update,
  list,
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.get("/categories", list);

// category/create
// userId 參數驗證
router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
```

##### ./routes/product.js
``` js 
// ./routes/product.js
const express = require("express");
const router = express.Router();
// add controller
const {
  create,
  productById,
  read,
  remove,
  update,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

// product/create
// userId 參數驗證
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
```

##### ./controller/category.js
``` js
// ./controller/category.js
const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    console.log("1:", req.category);
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.create = (req, res) => {
  const category = new Ctegory(req.body);

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    // fix 含 data 欄位
    res.json( data );
  });
};

exports.remove = (req, res) => {
  let category = req.category;
  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category deleted successly",
    });
  });
};

exports.update = (req, res) => {
  const category = req.category;

  category.name = req.body.name;

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    // fix 含 data 欄位
    res.json( data );
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    // fix 含 data 欄位
    res.json( data );
  });
};
```

#####  ./controller/product.js
``` js
// ./controller/product.js
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { runInNewContext } = require("vm");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    // console.log("productById...");
    if (err || !product) {
      return res.status(400).json({
        error: "Product does not exist",
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successly",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = req.product;
    // fields 蓋過 product
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      result.photo = undefined;
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
```

##### ./models/category.js
``` js
// ./models/category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
```

##### ./models/product.js
``` js
// ./models/product.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    quantity: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
```

#### add some for product and user
+ product list all : get all product
+ product list related : get other product same category
+ product list category : list product incluse category
+ product search : search product
+ product photo : get product photo
+ user read : read user info
+ user update : update user info

##### ./routes/user.js
``` js
// ./routes/user.js
const express = require("express");
const router = express.Router();
// add controller
const { userById, read, update } = require("../controllers/user");
// add controller
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin, isAuth, update);

// userId 參數驗證
router.param("userId", userById);

module.exports = router;
```

##### ./controllers/user.js
``` js
// ./controllers/user.js
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;
      res.json(user);
    }
  );
};
```

##### ./routes/product.js
``` js
// ./routes/product.js
const express = require("express");
const router = express.Router();
// add controller
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

// product/create
// userId 參數驗證
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
```

##### ./controller/product.js
``` js
// ./controller/product.js
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product does not exist",
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successly",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = req.product;
    // fields 蓋過 product
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      result.photo = undefined;
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      res.json(result);
    });
  });
};

/**
 * sel/arrival
 * bye sell = /products?sortBy=sold&order=desc&limit=4
 * bye arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no parameter are sent, then all products are returned
 */
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category") // mapt to Category
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be return
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // $ne: not include
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  // distinct : 取出不同的 category
  // {} : 2nd parameter doesn't need do no send value
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
// {
//  "skip" : "1",
//  "limit" : "2",
// 	"filters": {
// 		"name": "Note"
// 	}
// }
//
// >=2 and <=19
//  {
// "filters": {
//   "price": ["2", "19"]
// }
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte - great than price
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = new RegExp(req.body.filters[key]);
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
```

#### CORS
##### install
``` bash
npm i cors
```

##### js code
``` js
// cors
const cors = require("cors");

app.use(cors()); // cors
```

#### Error message 
##### invalid token : error message
``` bash
UnauthorizedError: invalid token
    at D:\work\git-test\li\project\ecommerce\express\node_modules\express-jwt\lib\index.js:105:22
		......
```

### API 
#### User
+ signup : 註冊
``` js
POST api/signup
Headers : [{"key":"Content-Type","value":"application/json","description":""}]
Body :
{
	"name": "pen2",
	"email": "pen2@gmail.com",
	"password": "rrrrrr5"
}
```

+ signin : 登入
``` js
POST api/signin
Headers : [{"key":"Content-Type","value":"application/json","description":""}]
Body :
{
	"email": "pen2@gmail.com",
	"password": "rrrrrr5"
}
```

+ signout :登出
``` js
GET api/signout
Headers : [{"key":"Content-Type","value":"application/json","description":""}]
```

+ secrect : get user information
``` js
GET api/secrect/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```

#### Caegory
+ create : 新增
``` js
POST /api/category/create/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
Body :
{
	"name": "react2"
}
```

+ read : 讀取一筆
``` js
GET /api/category/{categoryID}
Headers : [{"key":"Content-Type","value":"application/json","description":""}]
```

+ update : 更新
``` js
PUT /api/category/{categoryID}/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
Body :
{
	"name": "react2"
}
```

+ delete : 刪除
``` js
DEL /api/category/{categoryID}/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```

+ list : 讀取全部
``` js
GET /api/categories
Headers : [{"key":"Content-Type","value":"application/json","description":""}]
```

#### Product
+ create : 新增
``` js
POST /api/product/create/{userId}
Headers : 
[{"key":"Authorization","value":"Bearer token..","description":""}]
Body : form-data 
  name:PHP update
  description:My second book on PHP update
  price:20
  category:618cccaac104434a41b7e4e7
  shipping:false
  quantity:100
  photo --> file select
```

+ read : 讀取一筆
``` js
GET /api/product/{ProductId}
Headers : [{"key":"Content-Type","value":"application/json","description":""}] ??
```

+ update : 更新
``` js
PUT /api/product/{productID}/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""}, ??
  {"key":"Authorization","value":"Bearer token..","description":""}
]
Body : form-data 
  name:PHP update
  description:My second book on PHP update
  price:20
  category:618cccaac104434a41b7e4e7
  shipping:false
  quantity:100
  photo --> file select
```

+ delete : 刪除
``` js
DEL /api/product/{productID}/{userId}
Headers : 
[
  {"key":"Content-Type","value":"application/json","description":""}, ??
  {"key":"Authorization","value":"Bearer token..","description":""}
]
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
					"type": [],
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

##### read
+ GET http://localhost:8000/api/user/618d278d9e3c6d80ff6d0bd6
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ response
``` js
{
    "user": {
        "_id": "618b63c5e34b77bf26b6c8a1",
        "name": "key6",
        "email": "key6@gmail.com",
        "hashed_password": "887f81a60171906e267b37fc777d3e282fdffc7a",
        "salt": "c2c66800-41ed-11ec-97a8-83adda8782ce",
        "role": 1,
        "history": [],
        "createdAt": "2021-11-10T06:16:37.259Z",
        "updatedAt": "2021-11-10T06:16:37.259Z",
        "__v": 0
    }
}
```

##### update
+ PUT http://localhost:8000/api/user/618d278d9e3c6d80ff6d0bd6
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ body 
``` js
{
	"name": "Pen2 update"
}
```
+ response
``` js
{
    "_id": "618d278d9e3c6d80ff6d0bd6",
    "name": "Pen2 new",
    "email": "pen2@gmail.com",
    "hashed_password": "a696711c462e5dfd4526c8914dcb6bb286f4d08b",
    "salt": "0b6ead70-42fb-11ec-9c79-f353ea83f35d",
    "role": 1,
    "history": [],
    "createdAt": "2021-11-11T14:24:13.767Z",
    "updatedAt": "2021-11-15T01:25:40.367Z",
    "__v": 0
}
```

##### secret : get all user info
+ GET http://localhost:8000/api/secret/618b63c5e34b77bf26b6c8a1
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ response
``` js
{
    "user": {
        "_id": "618b63c5e34b77bf26b6c8a1",
        "name": "key6",
        "email": "key6@gmail.com",
        "hashed_password": "887f81a60171906e267b37fc777d3e282fdffc7a",
        "salt": "c2c66800-41ed-11ec-97a8-83adda8782ce",
        "role": 1,
        "history": [],
        "createdAt": "2021-11-10T06:16:37.259Z",
        "updatedAt": "2021-11-10T06:16:37.259Z",
        "__v": 0
    }
}
```

#### category
##### create
+ POST http://localhost:8000/api/category/create/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ body 
``` js
{
	"name": "Python"
}
```
+ response
``` js
{
    {
        "name": "Python",
        "_id": "6191b9327a4a9765fa7ae859",
        "createdAt": "2021-11-15T01:34:42.504Z",
        "updatedAt": "2021-11-15T01:34:42.504Z",
        "__v": 0
    }
}
```

##### read
+ GET http://localhost:8000/api/category/6191b9327a4a9765fa7ae859
+ Headers : []
+ response
``` js
{
    "_id": "6191b9327a4a9765fa7ae859",
    "name": "Python",
    "createdAt": "2021-11-15T01:34:42.504Z",
    "updatedAt": "2021-11-15T01:34:42.504Z",
    "__v": 0
}
```


##### update
+ PUT http://localhost:8000/api/category/6191b9327a4a9765fa7ae859/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ body 
``` js
{
	"name": "Python update"
}
```
+ response
``` js
{
    {
        "_id": "6191b9327a4a9765fa7ae859",
        "name": "Python update",
        "createdAt": "2021-11-15T01:34:42.504Z",
        "updatedAt": "2021-11-15T01:44:47.140Z",
        "__v": 0
    }
}
```

##### delet
+ DEL http://localhost:8000/api/category/6191b9327a4a9765fa7ae859/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ response
``` js
{
    "message": "Category deleted successly"
}
```

##### list : list all category
+ GET http://localhost:8000/api/categories
+ Headers : []
+ response
``` js
{
    [
        {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node",
            "createdAt": "2021-11-11T07:56:26.487Z",
            "updatedAt": "2021-11-11T07:56:26.487Z",
            "__v": 0
        },
        {
            "_id": "618d2aeb3cc4d2fb8b0ffa6c",
            "name": "python",
            "createdAt": "2021-11-11T14:38:35.706Z",
            "updatedAt": "2021-11-11T14:38:35.706Z",
            "__v": 0
        },
        {
            "_id": "618f0dd7e7a15a9c59fe3c5c",
            "name": "php",
            "createdAt": "2021-11-13T00:59:03.787Z",
            "updatedAt": "2021-11-13T00:59:03.787Z",
            "__v": 0
        }
    ]
}
```


#### product 
##### create
+ POST http://localhost:8000/api/product/create/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ body : form-data
``` js
  name:node
  price:2
  category:618cccaac104434a41b7e4e7
  shipping:false
  quantity:100
  description:My second book on node
  photo --> file select
```
+ response
``` js
{
    "name": "python",
    "description": "My second book on node",
    "price": 2,
    "category": "618cccaac104434a41b7e4e7",
    "quantity": 100,
    "sold": 0,
    "shipping": false,
    "_id": "6191c890b0f8b1de8b7014f8",
    "createdAt": "2021-11-15T02:40:16.238Z",
    "updatedAt": "2021-11-15T02:40:16.238Z",
    "__v": 0
}
```

##### update
+ PUT http://localhost:8000/api/product/6191c9a31f6127dd22f091a9/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ body 
``` js
	name:python update
	price:2
	category:618cccaac104434a41b7e4e7
	shipping:false
	quantity:100
	description:My second book on node
  photo --> file select
```
+ response
``` js
{
    "_id": "6191c9a31f6127dd22f091a9",
    "name": "python update",
    "description": "My second book on node",
    "price": 2,
    "category": "618cccaac104434a41b7e4e7",
    "quantity": 100,
    "sold": 0,
    "shipping": false,
    "createdAt": "2021-11-15T02:44:51.335Z",
    "updatedAt": "2021-11-15T02:50:09.319Z",
    "__v": 0
}
```

##### read
+ GET http://localhost:8000/api/product/6191c9a31f6127dd22f091a9
+ Headers : []
+ response
``` js
{
    "_id": "6191c9a31f6127dd22f091a9",
    "name": "python update",
    "description": "My second book on node",
    "price": 2,
    "category": "618cccaac104434a41b7e4e7",
    "quantity": 100,
    "sold": 0,
    "shipping": false,
    "createdAt": "2021-11-15T02:44:51.335Z",
    "updatedAt": "2021-11-15T02:50:09.319Z",
    "__v": 0
}
```

##### delet
+ DEL http://localhost:8000/api/product/6191c9a31f6127dd22f091a9/618a148152decc596ebad50e
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""},
  {"key":"Authorization","value":"Bearer token..","description":""}
]
```
+ response
``` js
{
    "message": "Product deleted successly"
}
```


##### list all
+ GET http://localhost:8000/api/products
+ Headers : []
+ response
``` js
[
    {
        "_id": "618f0dd7e7a15a9c59fe3c5c",
        "name": "PHP",
        "description": "My second book on PHP ",
        "price": 2,
        "category": {
            "_id": "618f0dd7e7a15a9c59fe3c5c",
            "name": "php",
            "createdAt": "2021-11-13T00:59:03.787Z",
            "updatedAt": "2021-11-13T00:59:03.787Z",
            "__v": 0
        },
        "quantity": 100,
        "sold": 0,
        "shipping": false,
        "createdAt": "2021-11-14T07:14:08.776Z",
        "updatedAt": "2021-11-14T07:14:08.776Z",
        "__v": 0
    },
    {
        "sold": 0,
        "_id": "618f0e74d520011c21fee5be",
        "name": "Note Book #2",
        "description": "My second book on node js",
        "price": 20,
        "category": {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node",
            "createdAt": "2021-11-11T07:56:26.487Z",
            "updatedAt": "2021-11-11T07:56:26.487Z",
            "__v": 0
        },
        "quantity": 100,
        "shipping": false,
        "createdAt": "2021-11-13T01:01:40.218Z",
        "updatedAt": "2021-11-13T01:01:40.218Z",
        "__v": 0
    },
    {
        "sold": 0,
        "_id": "618f1a5f5b6c11abb3d34d35",
        "name": "Note Book #2",
        "description": "My second book on node js",
        "price": 20,
        "category": {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node",
            "createdAt": "2021-11-11T07:56:26.487Z",
            "updatedAt": "2021-11-11T07:56:26.487Z",
            "__v": 0
        },
        "quantity": 100,
        "shipping": false,
        "createdAt": "2021-11-13T01:52:31.721Z",
        "updatedAt": "2021-11-13T01:52:31.721Z",
        "__v": 0
    },
]
```

##### list related
+ GET http://localhost:8000/api/products/related/6191c9a31f6127dd22f091a9
+ Headers : []
+ response
``` js
[
    {
        "sold": 0,
        "_id": "618f0e74d520011c21fee5be",
        "name": "Note Book #2",
        "description": "My second book on node js",
        "price": 20,
        "category": {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node"
        },
        "quantity": 100,
        "shipping": false,
        "createdAt": "2021-11-13T01:01:40.218Z",
        "updatedAt": "2021-11-13T01:01:40.218Z",
        "__v": 0
    },
    {
        "sold": 0,
        "_id": "618f1a5f5b6c11abb3d34d35",
        "name": "Note Book #2",
        "description": "My second book on node js",
        "price": 20,
        "category": {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node"
        },
        "quantity": 100,
        "shipping": false,
        "createdAt": "2021-11-13T01:52:31.721Z",
        "updatedAt": "2021-11-13T01:52:31.721Z",
        "__v": 0
    },
    {
        "sold": 0,
        "_id": "618f1ce44737b63742b4e61b",
        "name": "Note Book #2",
        "description": "My second book on node js",
        "price": 20,
        "category": {
            "_id": "618cccaac104434a41b7e4e7",
            "name": "Node"
        },
        "quantity": 100,
        "shipping": false,
        "createdAt": "2021-11-13T02:03:16.637Z",
        "updatedAt": "2021-11-13T02:03:16.637Z",
        "__v": 0
    },
]
```

##### list category
+ GET http://localhost:8000/api/products/categories
+ Headers : []
+ response
``` js
[
    "618cccaac104434a41b7e4e7",
    "618d2aeb3cc4d2fb8b0ffa6c",
    "618f0dd7e7a15a9c59fe3c5c"
]
```

##### search
+ POST http://localhost:8000/api/products/by/search
+ Headers : 
``` bash
[
  {"key":"Content-Type","value":"application/json","description":""}
]
```
+ body 
``` js
// seach price
{
  "skip" : "0",
  "limit" : "100",
  "filters": {
    "price": ["3", "20"]
  }
}
// search name
{
	"filters": {
	  "name": "Note"
	}
}
```
+ response
``` js
{
    "size": 4,
    "data": [
        {
            "sold": 0,
            "_id": "618f39c32a40b25aab100325",
            "name": "PHP update",
            "description": "My second book on PHP update",
            "price": 20,
            "category": {
                "_id": "618f0dd7e7a15a9c59fe3c5c",
                "name": "php",
                "createdAt": "2021-11-13T00:59:03.787Z",
                "updatedAt": "2021-11-13T00:59:03.787Z",
                "__v": 0
            },
            "quantity": 100,
            "shipping": false,
            "createdAt": "2021-11-13T04:06:27.222Z",
            "updatedAt": "2021-11-13T04:16:44.822Z",
            "__v": 0
        },
        {
            "sold": 0,
            "_id": "618f1ce44737b63742b4e61b",
            "name": "Note Book #2",
            "description": "My second book on node js",
            "price": 20,
            "category": {
                "_id": "618cccaac104434a41b7e4e7",
                "name": "Node",
                "createdAt": "2021-11-11T07:56:26.487Z",
                "updatedAt": "2021-11-11T07:56:26.487Z",
                "__v": 0
            },
            "quantity": 100,
            "shipping": false,
            "createdAt": "2021-11-13T02:03:16.637Z",
            "updatedAt": "2021-11-13T02:03:16.637Z",
            "__v": 0
        },
        {
            "sold": 0,
            "_id": "618f1a5f5b6c11abb3d34d35",
            "name": "Note Book #2",
            "description": "My second book on node js",
            "price": 20,
            "category": {
                "_id": "618cccaac104434a41b7e4e7",
                "name": "Node",
                "createdAt": "2021-11-11T07:56:26.487Z",
                "updatedAt": "2021-11-11T07:56:26.487Z",
                "__v": 0
            },
            "quantity": 100,
            "shipping": false,
            "createdAt": "2021-11-13T01:52:31.721Z",
            "updatedAt": "2021-11-13T01:52:31.721Z",
            "__v": 0
        },
        {
            "sold": 0,
            "_id": "618f0e74d520011c21fee5be",
            "name": "Note Book #2",
            "description": "My second book on node js",
            "price": 20,
            "category": {
                "_id": "618cccaac104434a41b7e4e7",
                "name": "Node",
                "createdAt": "2021-11-11T07:56:26.487Z",
                "updatedAt": "2021-11-11T07:56:26.487Z",
                "__v": 0
            },
            "quantity": 100,
            "shipping": false,
            "createdAt": "2021-11-13T01:01:40.218Z",
            "updatedAt": "2021-11-13T01:01:40.218Z",
            "__v": 0
        }
    ]
}
```

##### photo
+ GET http://localhost:8000/api/product/photo/61911b28600004bfee6281f5
+ Headers : []

#### braintree
##### get token
+ GET http://localhost:8000/api/braintree/getToken/6188c8128db0e4691c2f6727
+ Headers : 
``` js
{
Content-Type:application/json
Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTg4YzgxMjhkYjBlNDY5MWMyZjY3MjciLCJpYXQiOjE2Mzg0NTY1MDV9.7FWaG101Y0j3WhQdTMbO2-ew9pnb-S3tObemBH5DG28
}
```
+ response
``` js
{
    "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTXpnNU16UTNOVElzSW1wMGFTSTZJbU15TUdRd1l6RXlMVE15T0RndE5HSm1OaTA0T0RJMkxXUTFaVGcwTVdFM01HSTFaaUlzSW5OMVlpSTZJblJpTlhaNVpIcHlNMjFrY0dRMGVXUWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pZEdJMWRubGtlbkl6YldSd1pEUjVaQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZleUp0WlhKamFHRnVkRjloWTJOdmRXNTBYMmxrSWpvaVpHaGxkMmQwYUhSNUluMTkuaWxYeHJBQlJEOVlhVTBlb2pRU0d3MlNObFRYSkk3Wm5pRUtOVmlmVlNFUVZ6bUVHeGY0R3E2bG9DUzJWTW9yNHlFMTh2aTc1RHpNMHUzS216czV4MnciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdGI1dnlkenIzbWRwZDR5ZC9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJtZXJjaGFudEFjY291bnRJZCI6ImRoZXdndGh0eSIsImdyYXBoUUwiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2dyYXBocWwiLCJkYXRlIjoiMjAxOC0wNS0wOCIsImZlYXR1cmVzIjpbInRva2VuaXplX2NyZWRpdF9jYXJkcyJdfSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3RiNXZ5ZHpyM21kcGQ0eWQvY2xpZW50X2FwaSIsImVudmlyb25tZW50Ijoic2FuZGJveCIsIm1lcmNoYW50SWQiOiJ0YjV2eWR6cjNtZHBkNHlkIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJ2ZW5tbyI6Im9mZiIsImNoYWxsZW5nZXMiOlsiY3Z2Il0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3RiNXZ5ZHpyM21kcGQ0eWQifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOmZhbHNlLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYWxsb3dIdHRwIjp0cnVlLCJkaXNwbGF5TmFtZSI6IlRyeUJ5U2VsZiIsImNsaWVudElkIjoiQWRNT2dfS2JXTmxmMTJ0ejFRUHMxYS1USHFDZFVHRWR2UTVXb0V0Q2NCSVM1U3FzdnFsLTZyU2JjWFUxWEQyUmhGc0EzeC1vSkEybXZJbjgiLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJtZXJjaGFudEFjY291bnRJZCI6ImRoZXdndGh0eSIsImN1cnJlbmN5SXNvQ29kZSI6IlRXRCJ9fQ==",
    "success": true
}
```

### 參考資料
+ [MERN Stack React Node Ecommerce from Scratch to Deployment](https://www.udemy.com/course/react-node-ecommerce/)
+ [react-node-ecommerce](https://github.com/kaloraat/react-node-ecommerce)
+ [MongoDB Atlas](https://www.mongodb.com/atlas/database)
+ [MongoDB document($regex)](https://docs.mongodb.com/manual/reference/operator/query/regex/)
+ [Build a MERN web app](https://developer.ibm.com/patterns/build-a-mern-web-app/)