---
title: React module
abbrlink: e2e4
date: 2021-10-28 10:54:36
categories: Framework
tags:
	- react
---


### [material-ui](https://v4.mui.com/)

#### install 
``` bash 
# install material core
npm i @material-ui/core 
# install material icons
npm i @material-ui/icons
```

<!--more-->

#### example
```js
// icon
import AddIcon from "@material-ui/icons/Add";
// Floating action button
import Fab from "@material-ui/core/Fab";
// 顯示/消失
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  return (
    <div>
      <form className="create-note">
        {isInput && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isInput ? 3 : 1}
          onFocus={handleFocs}
        />
        <Zoom in={isInput}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
```


### [Ant Design - antd](https://ant.design/docs/react/introduce)
#### install
``` bash
npm install antd
yarn add antd
```

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


#### Book Store
+ Table
+ Card : Search
+ Select : Option
+ Input
+ Space

##### ./src/index.js
``` js
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("root"));
```

##### ./src/columns/App.js
``` js
// ./src/columns/App.js
import React, { useState } from "react";
import { Table, Card, Select, Input, Space } from "antd";
import { getBooks } from "../books";
import "antd/dist/antd.css";
const { Option } = Select;
const { Search } = Input;

const columns = [
  {
    title: "書名",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "價格",
    dataIndex: "price",
    key: "price",
    sorter: true,
  },
  {
    title: "分類",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "出版日期",
    dataIndex: "publishedAt",
    key: "publishedAt",
  },
];

const DEFAULT_PAGINATION = {
  position: ["bottomCenter"],
  pageSize: 2,
  pageSizeOptions: [2, 4, 6],
  showSizeChanger: true,
};

function App() {
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [category, setCategory] = useState("0");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState({
    category,
    keyword,
    sort,
  });
  const books = getBooks(filter);
  // console.log("App render", category, filter);

  function handleChangeCategory(value) {
    setKeyword("");
    setCategory(value);
    setFilter({ ...filter, category: value });
    setPagination({ ...pagination, current: 1 });
  }
  function handleChangeKeyword(e) {
    setKeyword(e.target.value);
  }
  function handelSearchKeyword(value) {
    setCategory("0");
    setFilter({ ...filter, keyword: keyword });
    setPagination({ ...pagination, current: 1 });
  }
  function handelChange(_pagination, filters, sorter, extra) {
    if (extra.action === "paginate") {
      setPagination(_pagination);
    } else if (extra.action === "sort") {
      setSort(sorter.order);
      setFilter({ ...filter, sort: sorter.order });
      setPagination({ ...pagination, current: 1 });
    }

    // console.log("handelChange #1:", _pagination);
    // console.log("handelChange #2:", filters);
    // console.log("handelChange #3:", sorter);
    // console.log("handelChange #4:", extra);
  }
  return (
    <div>
      <Card style={{ margin: 10 }}>
        <Space>
          <Select
            placeholder="書籍分類"
            defaultValue="0"
            value={category}
            onChange={handleChangeCategory}
          >
            <Option value="0">全部分類</Option>
            <Option value="1">社會科學</Option>
            <Option value="2">商業理財</Option>
          </Select>
          <Search
            placeholder="搜尋書名、分類"
            value={keyword}
            onSearch={handelSearchKeyword}
            onChange={handleChangeKeyword}
          />
        </Space>
        <Table
          dataSource={books}
          columns={columns}
          pagination={{ ...pagination }}
          onChange={handelChange}
        />
      </Card>
    </div>
  );
}

export default App;
```

##### ./src/book.js
``` js
// ./src/book.js
const bookStore = [
  {
    key: "1",
    title: "遊牧人生 1",
    price: 332,
    category: "社會科學",
    publishedAt: "2019/10/31",
  },
  {
    key: "2",
    title: "韓國人不想讓你知道的事 2",
    price: 234,
    category: "社會科學",
    publishedAt: "2021/03/30",
  },
  {
    key: "3",
    title: "您可不曾認識的和平 3",
    price: 224,
    category: "社會科學",
    publishedAt: "2019/10/1",
  },
  {
    key: "4",
    title: "致富心態 4",
    price: 338,
    category: "商業理財",
    publishedAt: "2021/01/27",
  },
  {
    key: "5",
    title: "原子習慣 5",
    price: 231,
    category: "商業理財",
    publishedAt: "2019/06/01",
  },
  {
    key: "6",
    title: "如何避免氣候災難 6",
    price: 315,
    category: "商業理財",
    publishedAt: "2021/03/02",
  },
];

const CATEGORY = {
  1: "社會科學",
  2: "商業理財",
};

export function getBooks(filter) {
  let books = bookStore
    .filter((book) => {
      if (filter.category === "0") {
        return true;
      }

      return book.category === CATEGORY[filter.category];
    })
    .filter((book) => {
      if (filter.keyword === "") {
        return true;
      }
      return (
        book.title.indexOf(filter.keyword) !== -1 ||
        book.category.indexOf(filter.keyword) !== -1
      );
    })
    .sort((x, y) => {
      if (filter.sort === "ascend") {
        return x.price - y.price;
      }

      if (filter.sort === "descend") {
        return y.price - x.price;
      }

      return 0;
    });

  // console.log("...", filter);
  // console.log("books:", books);
  return books;
}
```


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

