---
title: React simple 練習
abbrlink: '2365'
date: 2021-10-25 13:55:17
categories: Framework
tags:
	- react
---

### useInterval - useSatae vs useRef

<!--more-->

``` js
import React, { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // useState 更動會觸發 re-render, 但 useRef 不會
  // const [savedCallback, SetSavedCallback] = useState();

  // console.log("useInterval start, delay=", delay);

  // set callback function
  useEffect(() => {
    savedCallback.current = callback;
    // SetSavedCallback(callback);
  }, [callback]); // 要加 callback,因每一次都帶不同參數,重設 callback function 才能取到正確的參數

  // call setIntervale/clearInterval and call callback function
  useEffect(() => {
    function tick() {
      savedCallback.current();
      // savedCallback();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      // console.log("setInterval ....id=", id);
      return () => {
        // 若離開此次更動,集會被呼叫
        // console.log("clearInterval ....id=", id);
        clearInterval(id);
      };
    }
  }, [delay]);
}

export default function App() {
  let [count, setCount] = useState(0);
  let [isPlaying, setIsPlaying] = useState(false);

  const handleUseInterval = () => {
    // console.log("*** count=", count);
    setCount(count + 1);
  };

  // render 前的動作,不同於一般函數的呼叫,所以每一次 render 都對應一樣的內容
  // console.log("App start");
  useInterval(handleUseInterval, isPlaying ? 1000 : null);

  return (
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "pause" : "play"}
      </button>
      <h1>{count}</h1>
    </div>
  );
}
```

### 跨 component 傳送參數
#### createContext & useContext
##### ./App.js
``` js
// ./App.js
import React, { useState } from "react";
import Child from "./Child";
import { MyContext } from "./context-manager";

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    });
  });
};

export default function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  console.log(`render App step=${step}, number=${number}, count=${count}`);

  return (
    <MyContext.Provider value={{ setStep, setCount, setNumber, fetchData }}>
      <Child step={step} number={number} count={count} />
    </MyContext.Provider>
  );
}
```

##### ./Child.js
```js
// ./Child
import { MyContext } from "./context-manager";
import { useEffect, useContext } from "react";

export default function Child(props) {
  const { setStep, setNumber, setCount, fetchData } = useContext(MyContext);

  console.log("render Child");

  useEffect(() => {
    fetchData().then((res) => {
      console.log(`FETCH DATA: ${res}`);
    });
  });

  return (
    <div>
      <p>step is : {props.step}</p>
      <p>number is : {props.number}</p>
      <p>count is : {props.count}</p>
      <hr />
      <div>
        <button
          onClick={() => {
            console.log(
              `button(1) step=${props.step}, number=${props.number}, count=${props.count}`
            );
            setStep(props.step + 1);
          }}
        >
          step ++
        </button>
        <button
          onClick={() => {
            console.log(
              `button(2) step=${props.step}, number=${props.number}, count=${props.count}`
            );
            setNumber(props.number + 1);
          }}
        >
          number ++
        </button>
        <button
          onClick={() => {
            console.log(
              `button(3) step=${props.step}, number=${props.number}, count=${props.count}`
            );
            setCount(props.step + props.number);
          }}
        >
          number + step
        </button>
      </div>
    </div>
  );
}

```

##### ./context-manager.js
```js
// ./context-manager.js
import React from "react";
// set and get 要參照同 variable 才有用(分開有問題)
export const MyContext = React.createContext(null);
```

#### createContext&useContext + useReducer + state send by createContext/ useContext
可傳多個 state,執行 dispatch
##### ./App.js
``` js
// ./App.js
import React, { useReducer } from "react";
import Child from "./Child";
import { MyContext } from "./context-manager";

// step #2 useReducer : init state
const initState = {
  step: 0,
  number: 0,
  count: 0,
};

// step #1 useReducer : function
const reducer = (state, action) => {
  switch (action.type) {
    case "stepInc":
      return {
        ...state,
        step: state.step + 1,
      };
    case "numberInc":
      return {
        ...state,
        number: state.number + 1,
      };
    case "count":
      return {
        ...state,
        count: state.step + state.number,
      };
    default:
      return state;
  }
};

export default function App() {
  // step #3 useReducer : get reducer state and dispatch
  const [state, dispatch] = useReducer(reducer, initState);
  console.log(
    `render App step=${state.step}, number=${state.number}, count=${state.count}`
  );

  return (
    // step #4 useReducer : send reducer dispatch by createContext/useContext
    <MyContext.Provider value={{ state, dispatch }}>
      <button
        onClick={() => {
          dispatch({ type: "stepInc" });
        }}
      >
        parent step ++
      </button>
      <Child />
    </MyContext.Provider>
  );
}
```

##### ./Child.js
``` js
// ./Child.js
import { MyContext } from "./context-manager";
import { useContext } from "react";

// export default function Child(props) {
const Child = (props) => {
  // step #5 useReducer : get reducer dispatch by createContext/useContext
  const { state, dispatch } = useContext(MyContext);

  console.log("render Child");

  return (
    <div>
      <p>step is : {state.step}</p>
      <p>number is : {state.number}</p>
      <p>count is : {state.count}</p>
      <hr />
      <div>
        <button
          onClick={() => {
            console.log(
              `button(1) step=${state.step}, number=${state.number}, count=${state.count}`
            );
            // step #6 useReducer : call action by dispatch
            dispatch({ type: "stepInc" });
          }}
        >
          step ++
        </button>
        <button
          onClick={() => {
            console.log(
              `button(2) step=${state.step}, number=${state.number}, count=${state.count}`
            );
            // step #7 useReducer : call action by dispatch
            dispatch({ type: "numberInc" });
          }}
        >
          number ++
        </button>
        <button
          onClick={() => {
            console.log(
              `button(3) step=${state.step}, number=${state.number}, count=${state.count}`
            );
            // step #8 useReducer : call action by dispatch
            dispatch({ type: "count" });
          }}
        >
          number + step
        </button>
      </div>
    </div>
  );
};

export default Child;
```

##### ./context-manager.js
``` js
// ./context-manager.js
import React from "react";
// set and get 要參照同 variable 才有用(分開有問題)
export const MyContext = React.createContext(null);
```