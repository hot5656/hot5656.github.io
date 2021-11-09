---
title: 前端 package
abbrlink: 319f
date: 2021-06-23 16:08:58
categories: Front End
tags:
	- tool
---

### [CKEditor 4](https://cdn.ckeditor.com/) - 所見即所得文字編輯器
+ 因 reset.css 會清掉 css default 值, 所以無法顯示出設定效果,所以要改為 normalize.css
+ htmlspecialchars HTML 跳脫字元 會忽略 tag, 所以要拿掉才會有效果``(CKEditor 會保護,手動加入無效)``

<!--more-->

``` html
<head>

	<!-- add .js -->
	<script src="https://cdn.ckeditor.com/4.16.1/standard/ckeditor.js"></script>
</head> 
<body>
	<!-- add tag textarea -->
	<textarea class="edit-content" rows="10" 
			name="content"><?php echo $content; ?></textarea>

	<!-- run CKEditor function -->
	<script>
 		CKEDITOR.replace( 'content' );
  </script>
</body>
```

### SASS
其他 css 前端處理器: LESS, Stylus

#### install and build
``` bash
# install 
npm install -g sass
# version
sass --version
# build
sass main.scss main.css
# build when file change
sass --watch main.scss main.css
# 壓縮
sass --style=compressed main.scss main.css
```

#### nesting and variables
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div class="section">
		<h1 class="section__title">
			Test SASS
		</h1>
		<div class="section__wrapper">
			<div class="color color-primary"></div>
			<div class="color color-secondary"></div>
			<div class="color color-warning"></div>
		</div>
	</div>
</body>
</html>
```

``` scss
$primary: #00adb5
$secondary: #364f6b
$warning: #ff2f63
$info: blue

.section 
	width: 100%
	height: 50%
	border-bottom: 1px solid $primary
	&__title
		text-align: center
	&__wrapper
		display: flex

.color 
	width: 50px
	height: 50px
	margin: 10px
	&-primary
		background: $primary
	&-secondary
		background: $secondary
	&-warning
		background: $warning
	&:hover 
		background: $info
```

#### import , extend, mixin and function
``` scss
// import
@import 'variables'

// extend
// 同一extend會以, 分開
%btn 
	padding: 1rem 2rem
	color: $secondary
.btn
	&-1
		@extend %btn
		font-size: 16px
	&-2
		@extend %btn
		font-size: 20px
	&-3
		@extend %btn
		font-size: 24px

// function
// 含 return
@function letter-space($font-index)
	@return $font-index / 10 * 0.2rem

// mixin 
// 可含參數,同一extend會分開列出
@mixin box($color, $font-index)
	width: 50px
	height: 50px
	background: $color
	&:hover
		letter-spacing: letter-space($font-index)
.box
	&-1
		+box($primary, 2)
		font-size: 16px
	&-2
		+box($secondary, 3)
		font-size: 20px
	&-3
		+box($warning, 20)
		font-size: 24px
```

``` css
// extend
// 同一extend會以, 分開
.btn-3, .btn-2, .btn-1 {
  padding: 1rem 2rem;
  color: #364f6b;
}

.btn-1 {
  font-size: 16px;
}
.btn-2 {
  font-size: 20px;
}
.btn-3 {
  font-size: 24px;
}

// mixin 
// 可含參數,同一extend會分開列出
.box-1 {
  width: 50px;
  height: 50px;
  background: #00adb5;
  font-size: 16px;
}
.box-1:hover {
  letter-spacing: 0.04rem;
}
.box-2 {
  width: 50px;
  height: 50px;
  background: #364f6b;
  font-size: 20px;
}
.box-2:hover {
  letter-spacing: 0.06rem;
}
.box-3 {
  width: 50px;
  height: 50px;
  background: #ff2f63;
  font-size: 24px;
}
.box-3:hover {
  letter-spacing: 0.4rem;
}
```

#### condition and loop
``` scss
/* array + loop */
$direction-types: center, start, end
@each $type in $direction-types
	.flex-#{type}
		display:flex
		justify-content: $type
		align-items: center

/* object + loop */
$direction-types: (center: center, start: flex-start, end: flex-end)
@each $type, $value in $direction-types
	.flex-#{$type}
		display:flex
		justify-content: $value
		align-items: center

/* condition + loop */
@for $i from 0 through 5
	.h#{5 - $i + 1 }
		@if $i % 2 == 0
			font-size: 1 + 0.2rem + $i
		@else
			font-size: 1 + 0.3rem + $i
```

``` css
/* array + loop  */
.flex-type {
  justify-content: center;
  align-items: center;
}
.flex-type {
  justify-content: start;
  align-items: center;
}
.flex-type {
  justify-content: end;
  align-items: center;
}

/* object + loop */
.flex-center {
  justify-content: center;
  align-items: center;
}
.flex-start {
  justify-content: flex-start;
  align-items: center;
}
.flex-end {
  justify-content: flex-end;
  align-items: center;
}

/* condition + loop */
.h6 {
  font-size: 1.2rem;
}
.h5 {
  font-size: 2.3rem;
}
.h4 {
  font-size: 3.2rem;
}
.h3 {
  font-size: 4.3rem;
}
.h2 {
  font-size: 5.2rem;
}
.h1 {
  font-size: 6.3rem;
}
```

### Babel 

#### create a.js in ./src
``` js
let a = [1, 2, 3]
let aa = [...a]
for (let i of aa) {
	console.log(i)
}
```

#### install + build script then build
``` bash
nmp init
npm install --save-dev @babel/core @babel/cli
npm run build
```

``` jsaon
{
  "name": "sass",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  	"build": "babel src -d lib"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6"
  }
}
```

#### build 
generate ./lib/a.js but same as ./src/a.js
``` bash
npm run build
```

#### install @babel/preset-env , add .babel.config.json
``` bash
npm uninstall @babel/preset-env --save-dev
```

``` json
{
  "name": "sass",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel src -d lib"
	},
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.14.5",
    "@babel/core": "^7.14.6",
    "@babel/preset-env": "^7.14.7"
  }
}
``` 

``` json
// .babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

#### build then generate correct file at ./lib 
``` bash
npm run build
```

### Gulp
+ [example](https://github.com/Lidemy/mtr-4th-web/blob/f989ebc6182d12b68b93d5541fd9b8ac1208caeb/gulpfile.js)

#### install
```
npm install -global gulp-cli
mkdir gulp_test
cd  gulp_test
npm init
npm install --save-dev gulp
gulp --version
	CLI version: 2.3.0
	Local version: 4.0.2
```

#### add gulpfile gulpfile.js 
``` js
// gulpfile.js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}

exports.default = defaultTask
```

#### run glup
do nothing
``` bash
gulp
```

#### copy ./src to ./dest
``` js
// gulpfile.js
function defaultTask(cb) {
  // place code for your default task here
  cb();
}
```

``` bash
gulp
```

#### install gulp babel then run
``` js
// gulpfile.js
const { src, dest } = require('gulp')
const babel = require('gulp-babel')

function defaultTask() {
	return src('src/*.js')
		.pipe(babel())
		.pipe(dest('dist'))
}

exports.default = defaultTask
```

``` json
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

``` bash
npm install --save-dev gulp-babel @babel/core @babel/preset-env
gulp
```

#### or not include babel.config.json
``` 
// gulpfile.js
const { src, dest } = require('gulp')
const babel = require('gulp-babel')

function defaultTask() {
	return src('src/*.js')
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(dest('dist'))
}

exports.default = defaultTask
```

#### install gulp sass then serial run
``` js
// gulpfile.js
const { src, dest, series } = require('gulp')
const babel = require('gulp-babel')
var sass = require('gulp-sass')(require('sass'));

function compileJS() {
	return src('src/*.js')
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(dest('dist'))
}

function compileCSS() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
};

exports.default = series(compileJS, compileCSS)
```

``` bash
npm install sass gulp-sass --save-dev
gulp
```

#### change parallel then run
``` js
const { src, dest, series, parallel } = require('gulp')
const babel = require('gulp-babel')
var sass = require('gulp-sass')(require('sass'));

function compileJS() {
	return src('src/*.js')
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(dest('dist'))
}

function compileCSS() {
  return src('src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'));
};

exports.default = parallel(compileJS, compileCSS)
```

#### add gulp js uglify, css clean-css(minify) and rename + gulp compileCSS
``` js
const { src, dest, series, parallel } = require('gulp')
const babel = require('gulp-babel')
var uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css')
var rename = require("gulp-rename")
var sass = require('gulp-sass')(require('sass'));

function compileJS() {
	return src('src/*.js')
		.pipe(babel({
			"presets": ["@babel/preset-env"]
		}))
		.pipe(dest('dist'))
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js'}))
		.pipe(dest('dist'))
}

function compileCSS() {
  return src('src/*.scss')
		.pipe(sass().on('error', sass.logError))
    .pipe(dest('./css'))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({ extname: '.min.css'}))
    .pipe(dest('./css'))
};

exports.compileCSS = compileCSS
exports.default = parallel(compileJS, compileCSS)
```

``` bash
# install gulp js uglify
npm install --save-dev gulp-uglify
# install gulp css minify
npm install gulp-clean-css --save-dev
# install gulp rename
npm install gulp-rename --save-dev
gulp
# gulp compileCSS
gulp compileCSS
```



### Webpack
+ webpack is a module bundler.
+ browser 使用 <script></script> load library 相近於 include, 但會有變數名稱衝突影響
	> jQuery 的 jQuery.noConflict() 就是為了處理變數名稱衝突的問題
	> node.js的 moule 使用 CommonJS (module.exports + require)
	> import/export 是 ES6 的規範(要加上 type=module)

#### browser module 規範
``` js
// utils.js
export function first(str) {
	return str[0]
}
```

``` js
// index.js
import { first } from './utils.js'
console.log(first('abd'))
```

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="index.js" type="module"></script>
</head>
<body>
</body>
</html>
```

#### install webpack
```
npm init
npm install webpack webpack-cli --save-dev
```

#### try run js for node.js
put .js in ./src
``` js
// index.js
import { first } from './utils.js'
console.log(first('abd'))
```

``` js
// utils.js
export function first(str) {
	return str[0]
}
```

``` bash
node src\index.js
	a
```

package.json need add "type": "module",
``` json 
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
	"main": "index.js",
	"type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

#### build webpack then load html from browser
``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="./dist/main.js"></script>
</head>
<body>
</body>
</html>
```

add file webpack.config.js for webpack configure 
add mode:'development',
add mode:'production' 會壓縮
``` json
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

add script build for webpack
``` json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
	"main": "index.js",
  "scripts": {
		"build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

``` bash
# run webpack generate main.js in ./dist 
npx webpack
# or run build script
npm run build 
# load index.html in browse the work well
```

#### try load jquery
``` bash
npm install jquery --save-dev
```

```js
// utils.js
export function first(str) {
	return str[0]
}
```

```js
// index.js
const $ = require('jquery')
// import $ from 'jquery' // also ok
const utils = require('./utils')
console.log(utils.first('abd')+'aa')

$(document).ready(() => {
	$('.btn').click( () => {
		alert('hello!')
	})
})
```

``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="./dist/main.js"></script>
</head>
	<button class="btn">click me</button>
<body>
</body>
</html>
```

``` bash
# run build for wabpack
npm run build 
# load index.html in browse then test
```

#### add css loader
``` bash
# install css-loader and style-loader 
npm install --save-dev css-loader
npm install --save-dev style-loader
```

``` js
// utils.js
export function first(str) {
	return str[0]
}
```

``` js
// index.js
import css from './style.css'
import $ from 'jquery'
import { first } from './utils'

$(document).ready(() => {
	$('.btn').click( () => {
		alert(first('hello!'))
	})
})
```

``` css
/* style.css */
body {
	background: rgba(255, 0, 0, 0.2)
}

.btn {
	padding: 30px;
}
```

``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="./dist/main.js"></script>
</head>
	<button class="btn">click me</button>
<body>
</body>
</html>
```

webpack.config.js : add rules for style-loader and css-loader
``` json
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	},
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
			},
    ],
  },
};
```


``` bash
# run build for wabpack
npm run build 
# load index.html in browse then test
```

#### add babel-loader
``` js
// index.js
import css from './style.css'
import $ from 'jquery'
import { first } from './utils'

$(document).ready(() => {
	$('.btn').click(() => {
		const str = 'hello!'
		alert(first(str))
	})
})
```

``` bash
# install
npm install -D babel-loader @babel/core @babel/preset-env
```

webpack.config.js : add rules for babel-loader
``` json
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			}
    ],
  },
```

#### add sass-loader
``` scss
/* style.css */
$color : rgba(255, 255, 0, 0.2);
body {
	background: $color;
	
	.btn {
		padding: 30px;
	}
}
```

``` js
// index.js
import css from './style.scss'
import $ from 'jquery'
import { first } from './utils'

$(document).ready(() => {
	$('.btn').click(() => {
		const str = 'hello!'
		alert(first(str))
	})
})
```

webpack.config.js : add rules for sass-loader
``` json
    rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
```

``` bash
# install
npm install sass-loader sass --save-dev
```

``` bash
# run build for wabpack
npm run build 
# load index.html in browse then test
```

#### install webpack dev server

webpack.config.js : add devServer
``` json
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

copy index.html to ./dist
modify main.js path
``` html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
	<script src="main.js"></script>
</head>
	<button class="btn">click me</button>
<body>
</body>
</html>
```

``` bash
# install
npm install webpack-dev-server --save-dev
# run
npx webpack serve
# or run script - "start": "webpack serve --open"(auto open index.html)
npm run start
```

#### Using source maps - debug map js 到未打包內容
``` js
// index.js
// add throw new Error('hi')
import css from './style.scss'
import $ from 'jquery'
import { first } from './utils'

$(document).ready(() => {
	$('.btn').click(() => {
		// throw new Error('hi')
		throw 'error'
		const str = 'hello!'
		alert(first(str))
	})
})
``` 

webpack.config.js : add devtool: 'inline-source-map',
``` json
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
	},
	devtool: 'inline-source-map',
  module: {
    rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
};
```

#### HtmlWebpackPlugin - 自動產生 html

``` bash
# install
npm install --save-dev html-webpack-plugin
```

remove index.html 
index.js add button
``` html
// index.js
import css from './style.scss'
import $ from 'jquery'
import { first } from './utils'

$(document).ready(() => {
	$('body').append(`<button class="btn">click me test....</button>`)

	$('.btn').click(() => {
		const str = 'hello!'
		alert(first(str))
	})
})
```

webpack.config.js : add HtmlWebpackPlugin, plugins: [new HtmlWebpackPlugin()]
``` json
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
	},
	devtool: 'inline-source-map',
  module: {
    rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
	},
	plugins: [new HtmlWebpackPlugin()],
};
```

#### webpack practice
``` bash
npm init
npm install webpack webpack-cli --save-dev
# if need jquery
npm install jquery --save-dev
copy index.js to ./src
```

add script build for webpack
``` js
{
  "name": "comment_api_plugin",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

add file webpack.config.js for webpack configure
add mode:'development',
``` js
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

``` bash
# build 
npm run build
# load index.html from browser
```

#### webpack 打包成 library - Authoring Libraries
function export
``` js
export function init(options) {
	....
}
```

webpack.config.js  add library:
``` js
const path = require('path');

module.exports = {
  mode:'development', 
  entry: './src/index.js',
  output: {
    filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		library: "commentPlugin"
  },
};
```

html run
``` html
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>API 留言板</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
		integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
	<script src="./dist/main.js"></script>
	<script>
		window.onload = function() {
			commentPlugin.init({
				sideKey: 'robert',
				apiUrl: 'http://localhost/robert/comment_api/',
				container: '.comments'
			}) 
		}
	</script>
</head>
```

``` bash
# build 
npm run build
# load index.html from browser
```

#### webpack watch
webpack.config.js add script watch
``` js
{
  "name": "comment_api_plugin",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
		"build": "webpack",
		"watch": "webpack --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jquery": "^3.6.0",
    "webpack": "^5.44.0",
    "webpack-cli": "^4.7.2"
  }
}
```

``` bash
// run watch
npm run watch
```



### regular expression 正規表達式 : [online test](https://regex101.com/)
+ /xy : 含 "xy"
+ /[aeiou] : 含 a,e,i,o or u
+ /[0-9] : 含數字
+ /[a-z] : 含小寫字母
+ /[0-9a-zA-Z] : 含數字字母
+ /\d : 數字
+ /\w : 數字、英文大小寫字母還有底線
+ /\d{8} : 連續8個數字
+ /\d{8,10} : 連續8~10個數字
+ /^xyz : xyz開頭
+ /zyx$ : xyz結束
+ /s.y : s?y, ? 為任何字元
+ /^A\d+Z$/ : + 表一個以上
+ : ,() 叫做 Capturing Groups
+ ? : 含 0 or 1 個
+ \d 是配對數字，如果把 d 變成大寫，就會變成反義，所以 \D 代表：不是數字，而 \W 也一樣，代表：不是「英文大小寫字母與數字與底線」
+ &ast; : 0 個以上
+ \s : 可以配對到任何空白（空白字元、tab 以及換行）
+ \. : 表含點符號

#### js example(check 是否符合)
``` js
// 驗證電話
let re = /^09\d{8}$/
console.log(re.test("0912333"))			// false
console.log(re.test("0355288310"))	// flase
console.log(re.test("0931234450"))	// true

// 驗證電話
// 另一種設法 \d 要改為 \\d
let re = new RegExp('^09\\d{8}$')
console.log(re.test("0912333"))			// false
console.log(re.test("0355288310"))	// flase
console.log(re.test("0931234450"))	// true
```
#### js example(check 找配對的字)
``` js
	// 找配對的字
	let re = /8.3/
	let str = '4823686359967'
	console.log(str.match(re))
		// 傳回陣列
		// 0: "823"
		// 	groups: undefined
		// 	index: 1
		// 	input: "4823686359967"
	
	// 找不到回 null

	// 找所有配對的字
	// 使用 matchAll()
	// 加 g
	// 用 [...result] 轉為一個陣列 
	// 或用 for...of 取出
	let re = /8.3/g
	let str = '4823686359967'
	console.log(str.matchAll(re))  // not show value
	console.log(...str.matchAll(re))
		// ["823", index: 1, input: "4823686359967", groups: undefined]
		// ["863", index: 5, input: "4823686359967", groups: undefined]

	// 找出一個以上
	var re = /^A(\d+)Z$/
	console.log('A12345Z'.match(re))
		// ["A12345Z", "12345", index: 0, input: "A12345Z", groups: undefined]
```

#### js example(找出網域)
``` js
		var emails =[
			'wqe@wq.wwq.tw',
			'wqe@as.ss',
			'wqe@asa.33'
		]
		let re = /^.+@(.+	?)\./
		for(let email of emails) {
			var result = email.match(re)
			console.log(result)
			console.log(result[1])
		}
			// (2) ["wqe@wq.", "wq", index: 0, input: "wqe@wq.wwq.tw", groups: undefined]
			// wq
			// (2) ["wqe@as.", "as", index: 0, input: "wqe@as.ss", groups: undefined]
			// as
			// (2) ["wqe@asa.", "asa", index: 0, input: "wqe@asa.33", groups: undefined]
			// asa
```