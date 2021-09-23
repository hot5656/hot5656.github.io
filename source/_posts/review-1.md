---
title: JavaScript review
tags: Coding - javascript - review
abbrlink: 99fe
date: 2021-09-23 16:26:11
categories:
---

### What is closure in JavaScript(閉包)
+ closure(閉包) 是一個 function 在另一個 function 的內部, 內部的 function 有 access function scope 的資料,雖然外部function 已 return,但還可以 aeecss 到 function 的資料
+ ?? 應用

``` js
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}

var baz = foo();
baz(); // 2
```

