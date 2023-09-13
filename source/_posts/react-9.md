---
title: React example(18.x)
abbrlink: '2665'
date: 2023-09-07 14:48:35
categories: Framework
tags:
	- react
---

### 基本

<!--more-->

#### useState : 更新新值, React 就會 re-render
``` js
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// ===== run click count =========
function ClickCount() {
  // 更新新值, React 就會 re-render
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ClickCount />);
// ===== run click count =========
```

#### useEffect : 在 render 後做一些事情
##### show title
``` js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// ===== useEffect show title =========
function ClickCount() {
  // 更新新值, React 就會 re-render
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You click ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ClickCount />);
// ===== useEffect show title =========
```

##### 條件執行 useEffect
``` js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 僅在計數更改時才重新執行 effect
```

### example
#### 1st
##### install and run
``` bash
# insatll create-react-app
npm install -g create-react-app

# install react app
create-react-app hello-world

# run react server
cd hello-world
npm run start

# browser http://localhost:3000/
```

##### index.js
``` js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
	return (
		<h1> Hello world!</h1>
	)
  }

// create after root - (if create by create-react-app)
// const root = ReactDOM.createRoot(document.getElementById('root'));

// create after body
const rootElement = document.createElement('div')
document.body.appendChild(rootElement)
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

##### package.json
``` json
{
  "name": "hello-world",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

