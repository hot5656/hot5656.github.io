---
title: Practice React Ecommerce - Front End
abbrlink: 82e
date: 2021-11-16 10:16:11
categories: Project
tags:
---

### Create app + layout
#### install 
``` bash
npx create-react-app ecommerce-front
cd ecommerce-front
yarn start
``` 

<!--more-->

#### clear doesn&apos;t need files
##### ./src/Index.js
``` js
// ./src/Index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

##### ./src/App.js
``` js
// ./src/App.js
function App() {
  return <div>Hello from React</div>;
}

export default App
```
### add Pages + layout + env

#### install
``` Bash
# install for router
npm i react-router-dom
# Browserslist not support, install new version
# error -> Browserslist: caniuse-lite is outdated. Please run:
#         npx browserslist@latest --update-db
npx browserslist@latest --update-db
# install for env
npm i dotenv
```

#### source 
##### ./public/index.html : add bootstrapt
``` html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8" />
	<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<meta name="description" content="Web site created using create-react-app" />
	<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
	<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css"
		integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous" />
	<title>React App</title>
</head>

<body>
	......
```

##### ./src/Index.js
``` js
// ./src/Index.js
import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./AppRoutes";

ReactDOM.render(<AppRoutes />, document.getElementById("root"));
```

##### ./src/AppRoutes.js
``` js
// ./src/AppRoutes.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Singin";
// import Menu from "./core/Menu";

export default function AppRoutes() {
  // console.log("APP render...");
  return (
    <div>
      <BrowserRouter>
        {/* <Menu /> */}
        {/* react-router-dom v6
				   1. "Switch" is replaced by routes "Routes"
					 2. component put to element */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

##### ./src/user/Signup.js
``` js
// ./src/user/Signup.js
import React from "react";
import Layout from "../core/Layout";
import { API } from "../config";

export default function Singup() {
  // console.log("Singup render...");
  return (
    <Layout title="Singup Page" description="Singup to Node React E-commerce ">
      <div className="">{API}</div>
      <div>{process.env.REACT_APP_API_URL}</div>
    </Layout>
  );
}
```

##### ./src/user/Signin.js
``` js
// ./src/user/Signin.js
import React from "react";
import Layout from "../core/Layout";

export default function Singin() {
  // console.log("Singin render...");
  return (
    <Layout title="Singin Page" description="Singin to Node React E-commerce ">
      ...
    </Layout>
  );
}
```

##### ./src/core/Home.js
``` js
// ./src/core/Home.js
import React from "react";
import Layout from "./Layout";

export default function Home() {
  // console.log("Home render...");
  return (
    <Layout title="Home Page" description="Node React E-commerce ">
      ...
    </Layout>
  );
}
```

##### ./src/core/Layout.js
``` js
/* eslint-disable react/prop-types */
// ./src/core/Layout.js
import React from "react";
import Menu from "./Menu";

export default function Layout({
  title = "Title",
  description = "Destription",
  className,
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className="className">{children}</div>
    </div>
  );
}
```

##### ./src/core/Menu.js
``` js
// ./src/core/Menu.js
import React from "react";
import { Link } from "react-router-dom";
// add history, doesn't install
import { createBrowserHistory } from "history";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = (props) => {
  // add history
  const history = createBrowserHistory(props);
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin"
          >
            Signin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
```


#### set env

##### ./.env
``` bash
REACT_APP_API_URL=http://localhost:8000/api
```

##### ./src/config.js
``` js
// ./src/config.js
export const API = process.env.REACT_APP_API_URL;
```



