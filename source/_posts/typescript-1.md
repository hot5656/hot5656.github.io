---
title: TypeScript
abbrlink: '2665'
date: 2023-09-07 11:40:22
categories: Coding
tags:
	- typescript
---

### 基本
#### 說明
+ .ts vs .tsx

	+ .jsx 是javascript文件並表明使用了JSX語法。
	+ .ts 是typescript 文件的擴展名
	+ .tsx 表明是typescript 文件並使用了JSX語法。

<!--more-->

#### install & compile
##### install to global
``` bash
# install TypeScript
npm install -g typescript
# compile
tsc hello.ts
```

##### install to package
``` bash
# npm init
npm init
# install TypeScript
npm install typescript --save-dev
# compile
npx tsc *.ts
```

#### type
+ Types
	+ boolean
	+ number
	+ string
	+ null
	+ undefined 
	+ any : 任何屬性都是允許
+ 如果沒有明確的指定型別，那麼 TypeScript 會依照型別推論（Type Inference）的規則推斷出一個型別

``` js
let myName: string = 'Tom';
let myAge: number = 25;
```
##### 聯合型別
``` js
// 聯合型別（Union Types）表示取值可以為多種型別中的一種
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// return type is string
function getString(something: string | number): string {
    return something.toString();
}
```

##### 物件的型別 - 介面
``` js
// 1st example
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25
};

// 可選屬性(?)
interface Person {
    name: string;
    age?: number;
}

let tom: Person = {
    name: 'Tom'
};

// 任意屬性 [propName: string]: any
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

// 唯讀屬性 : 只能在建立的時候被賦值
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};
```

##### 陣列的型別
``` ts
// 型別 + 方括號
let fibonacci: number[] = [1, 1, 2, 3, 5];

// 陣列泛型
let fibonacci: Array<number> = [1, 1, 2, 3, 5];

// any 表示陣列中允許出現任意型別
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

##### 函式的型別
``` ts
function sum(x: number, y: number): number {
    return x + y;
}

// 可選引數
// 可選引數必須接在必需引數後面
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

// 引數預設值
// 在 ES6 中，我們允許給函式的引數新增預設值，TypeScript 會將添加了預設值的引數識別為可選引數
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');

// 剩餘引數
// items 是一個數組。所以我們可以用陣列的型別來定義它
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);

```

#### example 
``` ts
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```
