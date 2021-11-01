---
title: React module
abbrlink: e2e4
date: 2021-10-28 10:54:36
categories: Framework
tags:
	- react
---

### [Ant Design - antd](https://ant.design/docs/react/introduce)
``` bash
npm install antd
yarn add antd
```

<!--more-->


``` js
import { Button, Table } from "antd";
import { BOOKS, columns } from "./data";
import "antd/dist/antd.css";
```
+ Space : 拉開統一的空間
``` html
<Space>
  <div>A1</div>
  <div>A2</div>
  <div>A3</div>
</Space>
```
+ Table
+ Select
+ Input
+ Card

### [lodash](https://lodash.com/docs)
modern JavaScript utility library
+ install
```
npm install lodash
```
+ isUndefined(value) : value 為 undefined
``` js
isUndefined(void 0); // => true
isUndefined(null); // => false
```
+ isEmpty(value): value 為 空值
``` js
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
```

