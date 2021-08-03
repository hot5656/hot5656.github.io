---
title:  前端 package build 練習
abbrlink: f15e
date: 2021-07-25 16:12:11
categories: Front End
tags:
	- tool
---

### 試 bulid

1. NODE_ENV 不是内部或外部命令，也不是可運行的程序，或者批處理文件
以下兩條腳本都合併兩條命令（這種操作在powershell中不被支持，在cmd中也不被支持，這是Mac中bash或Linux的shell中的獨特操作），拆分兩條腳本如下：

<!--more-->

``` json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "gulp": "NODE_ENV='development' gulp",
    "gulp-build": "NODE_ENV='production' gulp",
    "dev": "npm run gulp",
    "start": "npm run gulp",
    "build": "npm run gulp-build"
  },

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "gulp": "set NODE_ENV='development' && gulp",
    "gulp-build": "set NODE_ENV='production' && gulp",
    "dev": "npm run gulp",
    "start": "npm run gulp",
    "build": "npm run gulp-build"
  },
```

2. build 

``` bash
# npm install 會有一些問題
yarn install
yarn run dev
yarn run build
```

### copy bulid

1. install gulp

``` bash
# install gulp-cli
npm install --global gulp-cli
# generate package.json
yarn init
# install gulp 
yarn add gulp
# gulp version
gulp -v
	CLI version: 2.3.0
	Local version: 4.0.2
```

2. add gulpfile.js example

``` js
// gulpfile.js
const gulp = require('gulp');

gulp.task('default', defaultTask);

function defaultTask(done) {
  // place code for your default task here
  console.log('Hello World!');
  done();
}
``` 

3. run gulp

``` bash 
gulp
	[10:58:38] Using gulpfile D:\work\git-test\mt
	[10:58:38] Starting 'default'...
	Hello World!
	[10:58:38] Finished 'default' after 3.67 ms
```

4. copy all file  the install package

``` bash
# add gulp package #1
yarn add gulp-concat gulp-csso gulp-fontmin-woff2 gulp-imagemin gulp-postcss gulp-pug gulp-rename gulp-sass gulp-sourcemaps gulp-uglify
# add gulp package #2
yarn add gulp-connect gulp-if gulp-svg-sprite
# add other package #1
yarn add postcss-uncss autoprefixer del browserify babelify vinyl-source-stream glob event-stream vinyl-buffer merge-stream
# add other package #2
yarn add uncss @babel/core sass bootstrap rfs @babel/plugin-transform-runtime @babel/preset-env chart.js jquery clipboard smoothscroll-polyfill vanilla-lazyload rellax @popperjs/core
```

4. some issue for package version dependence

``` bash
# DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
# "gulp-sass": "^5.0.0" --> "gulp-sass": "^4.0.2",
# yarn add gulp-sass@4.0.2 --tilde 表 4.0.2 之後的版本
yarn remove gulp-sass 
yarn add gulp-sass@4.0.2 --tilde

# Error: PostCSS plugin autoprefixer requires PostCSS 8.
yarn remove autoprefixer 
yarn add autoprefixer@9.7.6 --tilde
```

5. build 

``` bash
yarn run dev
yarn run build
```

