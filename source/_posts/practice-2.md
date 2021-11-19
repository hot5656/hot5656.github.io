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
      <div className={className}>{children}</div>
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

### add Singup, Singin and Singout
#### ./src/core/Menu.js
``` js
// ./src/core/Menu.js
import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
// add history, doesn't install
import { createBrowserHistory } from "history";
import { signout, isAuthenticated } from "../auth";

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
  const navigate = useNavigate();

  const handleSignout = () => {
    // 指執行 callback function next
    signout(() => {
      navigate("/");
    });
  };
  // console.log("Manu render...");
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            {/* 因直接執行而不是切到另一頁,使用 span 即可 */}
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={handleSignout}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
```

#### ./src/auth/index.js
``` js
// ./src/auth/index.js
// import { getNodeText } from "@testing-library/react";
import { API } from "../config";

export const signup = (user) => {
  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      // then 處理, 若有 check data 要加 retuen
      .then((data) => {
        // console.log("data:", data);
        return data;
      })
      .catch((err) => {
        console.log("signup err:", err);
      })
  );
};

export const signin = (user) => {
  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      // then 處理, 若有 check data 要加 retuen
      // .then((data) => {
      //   console.log("data:", data);
      //   return data;
      // })
      .catch((err) => {
        console.log("signup err:", err);
      })
  );
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    fetch(`${API}/signout`, {
      method: "GET",
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      // .then((response) => {
      //   console.log("signout", response);
      // })
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

// [DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq)
/* <input type="password" name="password" autocomplete="on"></input> */
```

#### ./src/user/Signin.js
``` js
// ./src/user/Signin.js
import React, { useState } from "react";
// v6 change Redirect to Navigate
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate } from "../auth";

export default function Singin() {
  const [values, setValues] = useState({
    email: "key6@gmail.com",
    password: "rrrrrr5",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;

  function handelChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();

    setValues({
      ...values,
      error: "",
      loading: true,
    });

    // catch 傳回用 .then 處理
    signin({ email, password }).then((data) => {
      // undefidata === undefined 表 server 未回應
      if (data === undefined) {
        // console.log("Server not response");
        setValues({
          ...values,
          error: "Server not response",
          loading: false,
        });
      } else if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
        });
      } else {
        // console.log("data:", data);
        authenticate(data, () => {
          setValues({
            ...values,
            error: "",
            redirectToReferrer: true,
          });
        });
      }
    });
  }

  // 使用此種寫法不用加 {} and retuen
  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handelChange}
          name="email"
          type="text"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handelChange}
          name="password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={handelSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  // 使用此種寫法不用加 {} and retuen
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  // 使用此種寫法不用加 {} and retuen
  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  // 使用此種寫法不用加 {} and retuen
  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Navigate to="/" />;
    }
  };

  return (
    <Layout
      title="Singup Page"
      description="Singup to Node React E-commerce"
      className="container col-md-6 col-md-3"
    >
      {showError()}
      {showLoading()}
      {signInForm()}
      {redirectUser()}
    </Layout>
  );
}

```

#### ./src/user/Signup.js
``` js
//  ./src/user/Signup.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

export default function Singup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  function handelChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();
    // catch 傳回用 .then 處理
    signup({ name, email, password }).then((data) => {
      // undefidata === undefined 表 server 未回應
      if (data === undefined) {
        // console.log("Server not response");
        setValues({
          ...values,
          error: "Server not response",
          success: false,
        });
      } else if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  }

  // 使用此種寫法不用加 {} and retuen
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handelChange}
          name="name"
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handelChange}
          name="email"
          type="text"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handelChange}
          name="password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={handelSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  // 使用此種寫法不用加 {} and retuen
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  // 使用此種寫法不用加 {} and retuen
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New acount is coreated. Please <Link to="/signin">Sigin</Link>
    </div>
  );

  return (
    <Layout
      title="Singup Page"
      description="Singup to Node React E-commerce"
      className="container col-md-6 col-md-3"
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
}
```

