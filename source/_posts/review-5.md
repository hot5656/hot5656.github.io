---
title: React review
categories: Framework
tags:
  - review
  - react
abbrlink: aef8
date: 2021-10-21 12:04:45
---

### 什麼是 React
React 是一個由 facebook 開發的前端 JavaScript library.
+ 透過設計重複利用的元件的概念,設計一個個小元件，組裝成一個較大的元件，最終打造成一個的完整專案
+ 使用於開發複雜的互動式網頁

### Virtual DOM
+ Virtual DOM 是以 JavaScript 物件模擬特定 DOM 結構而產生的樹狀結構。
+ 不直接操作 DOM，而改操作這些物件。待一個段落後，再將這些變更更新回真實的 DOM 上，以期提升效能。

### event in React vs JavaCsript
+ event name 改成小駝峰寫法
+ event function 僅寫 string 未加入 ()
``` js
// React #1 
const HandleButtonClick = () =>{
	console.log('button click')
	setCounter(counter + 1)
}
<button onClick={HandleButtonClick}>increment</button>
// React #2
<RedButton onClick={() => {
	handleDeleteTodo(todo.id)
}}>刪除</RedButton>

// JavaScript
<button onclick="myFunction()">Click me</button>
```

### JSX
JSX是一個 JavaScript的語法擴充，使用於 React 來描述使用者介面的外觀，browser 不具有解析 JSX 的能力,所以使用前要使用像 Bable 的預處理器轉換為 Javascript

### React component’s lifecycle
Component 有以下三種生命週期的狀態 
+ Mounting：已插入真實的 DOM
	+ componentWillMount()
	+ componentDidMount()
+ Updating：正在被重新渲染
	+ componentWillReceiveProps(object nextProps)
	+ shouldComponentUpdate(object nextProps, object nextState)
	+ componentWillUpdate(object nextProps, object nextState)
	+ componentDidUpdate(object prevProps, object prevState)
+ Unmounting：已移出真實的 DOM
	+ componentWillUnmount()

#### class component example 
``` js
import React from "react";
let isExample = true;
class Example extends React.Component {
  componentDidMount() {
    console.log("AExamplep mount");
  }
  componentDidUpdate() {
    console.log("Example update");
  }
  componentWillUnmount() {
    console.log("Example unmount");
  }

  render() {
    return <div>Example Title</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("App mount count=", this.state.count);
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("App update count=", this.state.count);
    if (this.state.count === 1) isExample = false;
  }
  componentWillUnmount() {
    console.log("App unmount");
  }

  render() {
    return (
      <div>
        {isExample && <Example></Example>}
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}

export default App;
```

``` bash
# console show
Examplep mount
App mount count= 0
Example update
App update count= 1
Example unmount
App update count= 2
```

#### function component example 
``` js
import React, { useState, useEffect } from "react";
let isExample = true;

function Example() {
  useEffect(() => {
    // mount
    console.log("Example mount");

    // unmount - clear up LayoutEffects
    return () => {
      console.log("Example unmount");
    };
  }, []);

  return <div>Example Title</div>;
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // mount
    console.log("App mount");

    // unmount - clear up LayoutEffects
    return () => {
      console.log("App unmount");
    };
  }, []);

  useEffect(() => {
    // current state
    document.title = `You clicked ${count} times`;
    console.log("App update(current) count=", count);
    if (count === 1) isExample = false;

    return () => {
      // previous state
      console.log("App update(previous) count=", count);
    };
  }, [count]);

  return (
    <div>
      {isExample && <Example></Example>}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
``` 

``` bash
# console show
Example mount
App mount
App update(current) count= 0
App update(previous) count= 0
App update(current) count= 1
Example unmount
App update(previous) count= 1
App update(current) count= 2
```

``` js
import React, { useState, useEffect, useRef, useCallback } from "react";

function useTimer(callback, delay) {
  const [remainSecond, setRemainSecond] = useState(0);
  const savedCallback = useRef();
  const savedDelay = useRef();

  console.log("useTimer run");

  // 保存到期回呼方法
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // 建立計數器並執行倒數
  useEffect(() => {
    // 刷新延遲秒數
    savedDelay.current = delay;
    setRemainSecond(delay);

    // 每秒執行
    const tick = (id) => {
      // 計算剩餘時間
      if (savedDelay.current > 0) {
        savedDelay.current -= 1;
      } else {
        savedDelay.current = 0;
      }

      // 更新輸出的剩餘秒數
      setRemainSecond(savedDelay.current);

      // 停止條件
      if (savedDelay.current <= 0) {
        savedCallback.current();
        clearInterval(id);
      }
    };

    if (delay !== null) {
      // 產生計數器
      const id = setInterval(() => tick(id), 1000);

      // 清除計數器 (cleanup)
      return () => clearInterval(id);
    }
  }, [delay]);

  // 輸出剩餘秒數
  return remainSecond;
}

function App() {
  const [delay, setDelay] = useState(0);
  const handleTimeup = useCallback(() => console.log("time up!!"), []);
  const remainSecond = useTimer(handleTimeup, delay);

  console.log("App run");
  return (
    <div>
      <input
        type="number"
        onChange={(e) => setDelay(Number(e.target.value) || 0)}
      />
      {new Date(remainSecond * 1000)
        .toLocaleTimeString("en-us", {
          timeZone: "Africa/Abidjan",
          hour12: false,
        })
        .replace(/\d{2}/, "00")}
    </div>
  );
}

export default App;
```

``` js
import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  console.log("useInterval start");

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    console.log("set callback");
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
      console.log("run tick ..");
    }
    if (delay !== null) {
      console.log("wait call interval...");
      let id = setInterval(tick, delay);
      return () => {
        console.log("*** clear Interval ***");
        clearInterval(id);
      };
    }
  }, [delay]);
}

function App() {
  let [count, setCount] = useState(0);

  console.log("App start");
  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, 1000);

  return <h1>{count}</h1>;
}
```