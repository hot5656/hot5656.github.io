---
title: mongoDB
abbrlink: abe3
date: 2021-11-06 20:51:15
categories: Back End
tags:
	- database
	- mongoDB
---

### [Robo 3T](https://robomongo.org/) : MongoDB GUI 工具

<!--more-->

#### download RoBo 3T (for windows .zip version 即可)
<div style="max-width:500px">
	{% asset_img pic8.png pic8 %}
</div>

<div style="max-width:500px">
	{% asset_img pic9.png pic9 %}
</div>

#### 解壓縮後執行 robo3t.exe
<div style="max-width:700px">
	{% asset_img pic1.png pic1 %}
</div>

#### 選擇 I agree , Next
<div style="max-width:500px">
	{% asset_img pic2.png pic2 %}
</div>

#### 選擇 Finish
<div style="max-width:500px">
	{% asset_img pic3.png pic3 %}
</div>

#### 選擇 Create, 填入由MongoDB atlas 取得 url(Node.js 4.0 or later 版本即可), 選 Form URI
<div style="max-width:700px">
	{% asset_img pic4.png pic4 %}
</div>

#### 選擇 Save 
<div style="max-width:700px">
	{% asset_img pic5.png pic5 %}
</div>

#### 選擇 Connect 即可見到 DB 畫面
<div style="max-width:500px">
	{% asset_img pic6.png pic6 %}
</div>

<div style="max-width:500px">
	{% asset_img pic7.png pic7 %}
</div>

### MongoDB Altas add project 
+ [MongoDB Cloud Services](https://www.mongodb.com/cloud)

#### 選擇 New Project, Next, Create Project
<div style="max-width:700px">
	{% asset_img pic11.png pic11 %}
</div>

<div style="max-width:700px">
	{% asset_img pic12.png pic12 %}
</div>

<div style="max-width:700px">
	{% asset_img pic13.png pic13 %}
</div>

#### Databases : Build a Database, Shared(Create), select position+Create Cluster 
<div style="max-width:700px">
	{% asset_img pic14.png pic14 %}
</div>


<div style="max-width:700px">
	{% asset_img pic15.png pic15 %}
</div>

<div style="max-width:700px">
	{% asset_img pic16.png pic16 %}
</div>

<div style="max-width:700px">
	{% asset_img pic17.png pic17 %}
</div>

<div style="max-width:700px">
	{% asset_img pic18.png pic18 %}
</div>

#### Network Access : Add IP Address, 0.0.0.0/0(表不限制), Confirm
<div style="max-width:700px">
	{% asset_img pic19.png pic19 %}
</div>

<div style="max-width:700px">
	{% asset_img pic20.png pic20 %}
</div>

<div style="max-width:700px">
	{% asset_img pic21.png pic21 %}
</div>

#### Database Access: add New DataBase User, set user info, add User
<div style="max-width:700px">
	{% asset_img pic22.png pic22 %}
</div>

<div style="max-width:700px">
	{% asset_img pic23.png pic23 %}
</div>

<div style="max-width:700px">
	{% asset_img pic24.png pic24 %}
</div>

#### get link url, Databases: Connect, Connect your application, 
<div style="max-width:700px">
	{% asset_img pic25.png pic25 %}
</div>

<div style="max-width:700px">
	{% asset_img pic26.png pic26 %}
</div>

#### NOde.js 4.0 or later driver
使用時要填入正確的 password
myFirstDataBase 為 default DB name, 可改為其他名稱
<div style="max-width:700px">
	{% asset_img pic27.png pic27 %}
</div>

#### NOde.js 2.2.12 or later driver(某些applicat要使用這個版本才能使用)
使用時要填入正確的 password
myFirstDataBase 為 default DB name, 可改為其他名稱
<div style="max-width:700px">
	{% asset_img pic28.png pic28 %}
</div>

#### 加入 database, Databases : add My Own data, database info+Create 
<div style="max-width:700px">
	{% asset_img pic29.png pic29 %}
</div>

<div style="max-width:700px">
	{% asset_img pic30.png pic30 %}
</div>

<div style="max-width:700px">
	{% asset_img pic31.png pic31 %}
</div>

### MongoDB 
#### Schema
##### type
+ String
+ Number
+ Array
+ ObjectId
+ Boolean

##### special 
+ map to other 
``` js
category: {
  type: ObjectId,
  ref: "Category",
  required: true,
},
```

+ photo
``` js
photo: {
  data: Buffer,
  contentType: String,
},
```

+ simple string
``` js
salt: String,
```


##### default 
+ 0
+ []

##### othert field
+ trim : true
+ required: true
+ maxlength: 32
+ unique: 32
+ timestamps: true

#### $regex
``` js
const query = {};
query.name = { $regex: req.query.search, $options: "i" };
Product.find(query, (err, products) => {
	......
}
```

#### control
+ Category.find().exec((err, data) => {}) : find all
+ Product.find({ _id: { $ne: req.product }, category: req.product.category }): find by consition, $ne: not include
+ Product.find(query, (err, products) => {}) : find direct run, not run exec
+ findById(id).exec((err, product) => {} ) : find by id
+ select("-photo") : remove field
+ populate("category") : link to another table
+ sort([[sortBy, order]]) : sort
+ skip(skip) : set skip
+ limit(limit) : set limit
+ remove((err, deletedProduct) => {} ) : remove
+ findOneAndUpdate() : find + update 
``` js
.findOneAndUpdate(
  { _id: req.profile._id },
  { $set: req.body },
  { new: true },
  (err, user) => {})
```

### [mongoose](https://www.npmjs.com/package/mongoose) : mongoDB object modeling tool to work in an asynchronous environment. Mongoose supports both promises and callbacks.
#### example code
``` js
// connect mangoDB altas
// using 2.2.12 or later's uri
const mongoose = require("mongoose");
var uri =
  "mongodb://robert2:{password}@cluster0-shard-00-00.bscvu.mongodb.net:27017,cluster0-shard-00-01.bscvu.mongodb.net:27017,cluster0-shard-00-02.bscvu.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-11cyyj-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// save data
const User = mongoose.model("User", userSchema);
new User(req.body).save;

// get data 
User.findOne({ email })
```

#### [Deprecation Warnings](https://mongoosejs.com/docs/deprecations.html)
##### update()
``` js
// Replace this:
MyModel.update({ foo: 'bar' }, { answer: 42 });
// With this:
MyModel.updateOne({ foo: 'bar' }, { answer: 42 });

// If you use `overwrite: true`, you should use `replaceOne()` instead:
MyModel.update(filter, update, { overwrite: true });
// Replace with this:
MyModel.replaceOne(filter, update);

// If you use `multi: true`, you should use `updateMany()` instead:
MyModel.update(filter, update, { multi: true });
// Replace with this:
MyModel.updateMany(filter, update);
```

##### remove()
``` js
// Replace this:
MyModel.remove({ foo: 'bar' });
// With this:
MyModel.deleteMany({ foo: 'bar' });

// Replace this:
MyModel.remove({ answer: 42 }, { single: true });
// With this:
MyModel.deleteOne({ answer: 42 });
```

##### count()
``` js
// Replace this:
MyModel.count({ answer: 42 });
// With this:
MyModel.countDocuments({ answer: 42 });

// If you're counting all documents in the collection, use
// `estimatedDocumentCount()` instead.
MyModel.count();
// Replace with:
MyModel.estimatedDocumentCount();

// Replace this:
MyModel.find({ answer: 42 }).count().exec();
// With this:
MyModel.find({ answer: 42 }).countDocuments().exec();

// Replace this:
MyModel.find().count().exec();
// With this, since there's no filter
MyModel.find().estimatedDocumentCount().exec();
```


### 參考資料 
+ [mongoose document](https://mongoosejs.com/docs/)









