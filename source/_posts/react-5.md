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