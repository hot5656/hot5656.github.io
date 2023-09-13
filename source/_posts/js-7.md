---
title: JavaScript(Promise and Async/Await)
abbrlink: 85b0
date: 2023-09-11 12:28:39
categories:
tags:
	- javascript
---

### Promise

<!--more-->

#### Promise 寫法
``` js
// resolve : 成功, reject : 失敗

const myPromise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(" myPromise #1 return");
  }, 2000);
});

const myPromise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #2 return");
    }, 2000);
  });
};

function myPromise3() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #3 return");
    }, 2000);
  });
}

function myPromiseErr() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(" myPromise Error return");
    }, 2000);
  });
}

myPromise1
  .then((res) => {
    console.log("res=", res);
  })
  .catch((err) => {
    console.log("error=", err);
  });

myPromise2()
  .then((res) => {
    console.log("res=", res);
  })
  .catch((err) => {
    console.log("error=", err);
  });

myPromise3()
  .then((res) => {
    console.log("res=", res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// res=  myPromise #1 return
// res=  myPromise #2 return
// res=  myPromise #3 return

// Promise error
myPromiseErr()
  .then((res) => {
    console.log("res=", res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// error=  myPromise Error return

// 順序執行 promise
Promise.all([myPromise3(), myPromise2()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// [ ' myPromise #3 return', ' myPromise #2 return' ]

Promise.all([myPromise2(), myPromiseErr()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// error=  myPromise Error return
```

#### Promise.race:傳回先完成
``` js
const myPromise1 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #1 return");
    }, 2000);
  });
};

const myPromise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #2 return");
    }, 1000);
  });
};

const myPromiseErr = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(" myPromise Error return");
    }, 2000);
  });
};

Promise.race([myPromise1(), myPromise2()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// myPromise #2 return

Promise.race([myPromise1(), myPromise2(), myPromiseErr()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// myPromise #2 return

// 若任一 promise success, 則不會傳回 err
Promise.race([myPromiseErr()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// error=  myPromise Error return
```

#### Promise.any:任何function完成即回傳
``` js
const myPromise1 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #1 return");
    }, 2000);
  });
};

const myPromise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #2 return");
    }, 1000);
  });
};

const myPromiseErr = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(" myPromise Error return");
    }, 2000);
  });
};

Promise.any([myPromise1(), myPromise2()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// myPromise #2 return

Promise.any([myPromise1(), myPromise2(), myPromiseErr()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// myPromise #2 return

// 若任一 promise success, 則不會傳回 err
Promise.any([myPromiseErr()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error=", err);
  });
// error= [AggregateError: All promises were rejected]
```

#### Promise.allSettled:傳回所有promise的結果
``` js
const myPromise1 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #1 return");
    }, 2000);
  });
};

const myPromise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #2 return");
    }, 1000);
  });
};

const myPromiseErr = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(" myPromise Error return");
    }, 2000);
  });
};

Promise.allSettled([myPromise1(), myPromise2(), myPromiseErr()])
  .then((res) => {
    console.log(res);
  });
// [
// 	{ status: 'fulfilled', value: ' myPromise #1 return' },
// 	{ status: 'fulfilled', value: ' myPromise #2 return' },
// 	{ status: 'rejected', reason: ' myPromise Error return' }
// ]
```


#### 順序執行
``` js
const myPromise1 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #1 return");
    }, 2000);
  });
};

const myPromise2 = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(" myPromise #2 return");
    }, 1000);
  });
};

myPromise1()
  .then((res) => {
    console.log(res);
    return myPromise2();
  })
  .then((res) => {
    console.log(res);
  });
// myPromise #1 return
// myPromise #2 return
```

### Async/Await
+ async function 可以用來定義一個非同步函式，讓這個函式本體是屬於非同步，但其內部以“同步的方式運行非同步”程式碼
+ await 是屬於一元運算子，它會直接回傳後方表達式的值；但如果是 Promise 時則會 “等待” resovle 的結果並回傳
+ async/await 基本上是一體的，不會單獨出現

``` js
// fetch()  only available by default in a browser
// use by node need insatll node-fetch
// use import need package.json add "type": "module",

import fetch from "node-fetch";

async function fetchOpenWeatherData(city, tempScale) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  const data = await res.json();
  return data;
}

fetchOpenWeatherData("taipei", "metric")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
// 	{
// 		coord: { lon: 121.5319, lat: 25.0478 },
// 		weather: [
// 			{
// 				id: 802,
// 				main: 'Clouds',
// 				description: 'scattered clouds',
// 				icon: '03d'
// 			}
// 		],
//    ....

// err
fetchOpenWeatherData("tt", "metric")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
// Error: City not found
// at fetchOpenWeatherData (file:///D:/work/run/chrome-extension/js-test/test1.js:83:11)
// at processTicksAndRejections (node:internal/process/task_queues:96:5)
```