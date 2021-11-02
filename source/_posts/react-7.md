---
title: React module
abbrlink: e2e4
date: 2021-10-28 10:54:36
categories: Framework
tags:
	- react
---

### [Ant Design - antd](https://ant.design/docs/react/introduce)
#### install
``` bash
npm install antd
yarn add antd
```

<!--more-->

#### first example
+ version
+ DatePicker
+ Button

##### ./src/App.js
``` js
// ./src/App.js
import React from "react";
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";

export default function App() {
  return (
    <div className="App">
      <h1>antd version: {version}</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
}
```

##### ./src/index.js
``` js
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

#### 選擇日期
+ ConfigProvider
+ message
+ Alert

``` js
// ./src/App.js
import React, { useState } from "react";
import { ConfigProvider, DatePicker, message, Alert } from "antd";
// 修成繁體中文 ??? 真的需要嗎?
// import zhTW from "antd/lib/locale/zh_TW";
import "antd/dist/antd.css";

export default function App() {
  const [date, setDate] = useState(null);

  const handleDate = (value) => {
    message.info(
      `你選擇的日期是: ${value ? value.format("YYYY年MM月DD日") : "未選擇"}`
    );
    setDate(value);
  };

  return (
    // 修成繁體中文 ??? 真的需要嗎?
    // <ConfigProvider locate={zhTW}>
    <ConfigProvider>
      <div
        style={{ width: 400, margin: "100px auto", border: "1px solid black" }}
      >
        <DatePicker onChange={handleDate} />
        <div style={{ marginTop: 16 }}>
          {/* 日期: {date ? date.format("YYYY年MM月DD日") : "未選擇"} */}
          <Alert
            message="目前日期"
            description={date ? date.format("YYYY年MM月DD日") : "未选择"}
            type="success"
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
```











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

