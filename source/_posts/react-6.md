---
title: React (Class component)
categories: Framework
tags:
  - react
abbrlink: 9de
date: 2021-10-26 20:48:11
---

### 環境建置
#### webpack
##### install 
``` bash
mkdir react-self-app
cd react-self-app
npm init
yarn add webpack webpack-cli
```

<!--more-->

##### webpack config
``` js
// ./webpack.config.js
const path = require("path");

module.exports = {
  // source file
  entry: "./src/index.js",
  output: {
    // output path
    path: path.join(__dirname, "/dist"),
    // output file name
    filename: "bundle.js",
  },
};
```

##### add file 
+ ./index.html
``` html
<!DOCTYPE html>
<html lang="en">
<!-- ./index.html -->

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Hello</title>
</head>

<body>
	hello
	<!-- add webpack generate file  -->
	<script src="./dist/bundle.js"></script>
</body>

</html>
```

+ ./src/index.js
``` js
// ./src/index.js
import { log } from "./utils";
log("hello world");
```

+ ./src/utils.js
``` js
// ./src/utils.js
export function log(str) {
  console.log(str);
}
```

##### add webpack script
package.json
``` json
{
  "name": "react-self-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "//1": "development mode 打包",
  "//2": "production mode 打包",
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
	....
``` 

##### run webpack script 
``` bash
npm run start
	> react-self-app@1.0.0 start
	> webpack --mode development
	asset bundle.js 4.13 KiB [emitted] (name: main)
	runtime modules 670 bytes 3 modules
	cacheable modules 124 bytes
		./src/index.js 72 bytes [built] [code generated]
		./src/utils.js 52 bytes [built] [code generated]
	webpack 5.60.0 compiled successfully in 190 ms
```

##### load index.html from browser 
console show -> hello world


#### babel 
##### install babel
``` bash
# babel-loader use by webpack
yarn add @babel/core babel-loader @babel/preset-env
```

##### babel config
+ .babelrc
``` js 
// .babelrc
{
  // set babel  transfer condition
  "presets": ["@babel/preset-env"]
}
```

+ ./webpack.config.js
``` js
// ./webpack.config.js
const path = require("path");

module.exports = {
  // source file
  entry: "./src/index.js",
  output: {
    // output path
    path: path.join(__dirname, "/dist"),
    // output file name
    filename: "bundle.js",
  },
  module: {
    rules: [
      // 用 babel-loade 打包所有 .js 檔案,排除目錄 node_modules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

##### change file 
+ ./src/index.js
``` js
// ./src/index.js
import { log } from "./utils";
const obj = {
  text: "hello world!!!",
};
const { text } = obj;
log(text);
```

##### run webpack script 
``` bash
npm run start
	> react-self-app@1.0.0 start
	> webpack --mode development
	asset bundle.js 4.19 KiB [emitted] (name: main)
	runtime modules 670 bytes 3 modules
	cacheable modules 186 bytes
		./src/index.js 120 bytes [built] [code generated]
		./src/utils.js 66 bytes [built] [code generated]
	webpack 5.60.0 compiled successfully in 1094 ms
```

##### load index.html from browser 
console show -> hello world!!!

#### react
##### install
``` bash
yarn add react react-dom @babel/preset-react
```

##### config
``` js 
// .babelrc
{
  // set babel transfer condition
  // add @babel/preset-react
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

##### add file for react 
+ ./index.html
``` html
<!DOCTYPE html>
<html lang="en">
<!-- ./index.html -->

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Hello</title>
</head>

<body>
	<!-- add for react -->
	<div id="root"></div>
	<!-- add webpack generate file  -->
	<script src="./dist/bundle.js"></script>
</body>

</html>
```
+ ./src/index.js
``` js
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// App render to root
ReactDOM.render(<App />, document.getElementById("root"));
```

+ ./src/App.js
``` js
// ./src/App.js
import React, { Component } from "react";

class App extends Component {
  render() {
    return <h1>Hello React</h1>;
  }
}

export default App;
```

##### run webpack script 
``` bash
npm run start
	> react-self-app@1.0.0 start
	> webpack --mode development
	asset bundle.js 1020 KiB [emitted] (name: main)
	runtime modules 670 bytes 3 modules
	modules by path ./node_modules/ 974 KiB
		modules by path ./node_modules/scheduler/ 26.3 KiB
			modules by path ./node_modules/scheduler/*.js 412 bytes 2 modules
			modules by path ./node_modules/scheduler/cjs/*.js 25.9 KiB 2 modules
		modules by path ./node_modules/react/ 70.6 KiB
			./node_modules/react/index.js 190 bytes [built] [code generated]
			./node_modules/react/cjs/react.development.js 70.5 KiB [built] [code generated]
		modules by path ./node_modules/react-dom/ 875 KiB
			./node_modules/react-dom/index.js 1.33 KiB [built] [code generated]
			./node_modules/react-dom/cjs/react-dom.development.js 874 KiB [built] [code generated]
		./node_modules/object-assign/index.js 2.06 KiB [built] [code generated]
	modules by path ./src/*.js 3.65 KiB
		./src/index.js 222 bytes [built] [code generated]
		./src/App.js 3.43 KiB [built] [code generated]
	webpack 5.60.0 compiled successfully in 1732 ms
```

##### load index.html from browser 
browser show -> Hello React

#### setup webpack dev derver
##### change bundle.js add hash
``` js
// ./webpack.config.js
const path = require("path");

module.exports = {
  // source file
  entry: "./src/index.js",
  output: {
    // output path
    path: path.join(__dirname, "/dist"),
    // output file name
    // 預防 browser cache 住檔案
    filename: "bundle.[hash].js",
  },
  module: {
    rules: [
      // 用 babel-loade 打包所有 .js 檔案,排除目錄 node_modules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

##### install html-webpack-plugin
``` bash
yarn add html-webpack-plugin
```

##### ./webpack.config.js add html-webpack-plugin
``` js
// ./webpack.config.js
const path = require("path");
// use html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // source file
  entry: "./src/index.js",
  output: {
    // output path
    path: path.join(__dirname, "/dist"),
    // output file name
    // 預防 browser cache 住檔案
    filename: "bundle.[hash].js",
  },
  module: {
    rules: [
      // 用 babel-loade 打包所有 .js 檔案,排除目錄 node_modules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // use html-webpack-plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
```

##### ./index.html remove &lt;script src="./dist/bundle.js"&gt; &lt;/script&gt;
``` html 
<!DOCTYPE html>
<html lang="en">
<!-- ./index.html -->

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Hello</title>
</head>

<body>
	<!-- add for react -->
	<div id="root"></div>
</body>

</html>
```

##### run webpack script 
``` bash
npm run start
```

##### load ./dist/index.html from browser 
browser show -> Hello React

##### install webpack dev server
``` bash
yarn add webpack-dev-server
```

##### change webpack script
package.json
```
{
  "name": "react-self-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "//3": "production mode 打包 run webpack dev server",
  "//2": "production mode 打包",
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
	....
```

##### run webpack script 
``` bash
npm run start
	> react-self-app@1.0.0 start
	> webpack-dev-server --mode development --open --hot
	<i> [webpack-dev-server] Project is running at:
	<i> [webpack-dev-server] Loopback: http://localhost:8080/
# auto open http://localhost:8080/ by browser
```