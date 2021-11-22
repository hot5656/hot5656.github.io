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

### add Admin/user Dashboard
#### ./src/AppRoutes.js
``` js
// ./src/AppRoutes.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Singin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import UserRequireAuth from "./auth/UserAuth";
import AdminRequireAuth from "./auth/AdminAuth";

export default function AppRoutes() {
  // console.log("APP render...");
  return (
    <div>
      <BrowserRouter>
        {/* react-router-dom v6
				   1. "Switch" is replaced by routes "Routes"
					 2. component put to element */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/user/dashboard"
            element={
              <UserRequireAuth>
                <UserDashboard />
              </UserRequireAuth>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRequireAuth>
                <AdminDashboard />
              </AdminRequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

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

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

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

#### ./src/user/Signin.js
``` js
// ./src/user/Signin.js
import React, { useState } from "react";
// v6 change Redirect to Navigate
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

export default function Singin() {
  const [values, setValues] = useState({
    email: "key6@gmail.com",
    password: "rrrrrr5",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

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
          autoComplete="email"
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
          autoComplete="new-password"
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
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }

    // loggin already, redirect to /
    if (isAuthenticated()) {
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

#### ./src/auth/AdminAuth.js
``` js
// ./src/auth/AdminAuth.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

// check children: JSX.Element
export default function AdimnRequireAuth({
  children,
}: {
  children: JSX.Element,
}) {
  let location = useLocation();
  if (!isAuthenticated() || isAuthenticated().user.role !== 1) {
    console.log("not isAuthenticated");
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}
```

#### ./src/auth/UserAuth.js
``` js
// ./src/auth/UserAuth.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

// check children: JSX.Element
export default function UserRequireAuth({
  children,
}: {
  children: JSX.Element,
}) {
  let location = useLocation();
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}
```

#### ./src/core/AdminDashboard.js
``` js
// ./src/core/AdminDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

export default function AdmintDashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => (
    <div className="card">
      <h3 className="card-header">Admin Links</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminInfo = () => (
    <div className="card">
      <h3 className="card-header">{`G'Day ${name}!`}</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registrred User"}
        </li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard Page"
      description="User Dashboard"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
}
```

#### ./src/core/UserDashboard.js
``` js
// ./src/core/UserDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";

export default function UsertDashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const userLinks = () => (
    <div className="card">
      <h3 className="card-header">User Links</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/profile/update">
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );

  const userInfo = () => (
    <div className="card">
      <h3 className="card-header">{`G'Day ${name}!`}</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registrred User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = () => (
    <div className="card">
      <ul className="list-group">
        <li className="list-group-item">histtory</li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard Page"
      description="User Dashboard"
      className="container-fluid"
    >
      {/* <div className="card md-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registrred User"}
          </li>
        </ul>
      </div> */}

      {/* <div className="card md-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">histtory</li>
        </ul>
      </div> */}
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
}
```

### add category/product + show products
#### ./src/AppRoutes.js
``` js
// ./src/AppRoutes.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Singin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import UserRequireAuth from "./auth/UserAuth";
import AdminRequireAuth from "./auth/AdminAuth";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

export default function AppRoutes() {
  // console.log("APP render...");
  return (
    <div>
      <BrowserRouter>
        {/* react-router-dom v6
				   1. "Switch" is replaced by routes "Routes"
					 2. component put to element */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/user/dashboard"
            element={
              <UserRequireAuth>
                <UserDashboard />
              </UserRequireAuth>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRequireAuth>
                <AdminDashboard />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/create/category"
            element={
              <AdminRequireAuth>
                <AddCategory />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/create/product"
            element={
              <AdminRequireAuth>
                <AddProduct />
              </AdminRequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

#### ./src/styles.css
``` css
/* ./src/styles.css */

/** 
* board radis 
*/

.btn,
.jumbotron,
.nav :hover {
  border-radius: 0px;
}

/**
* product image on card 
*/
.product-img {
  min-height: 100px;
}

/** 
* jumbotron animation
*/

.jumbotron {
  width: 30wh;
  height: 30vh;
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

#### ./src/core/Layout.js
``` js
// ./src/core/Layout.js
/* eslint-disable react/prop-types */
import React from "react";
import Menu from "./Menu";
import "../styles.css";

export default function Layout({
  title = "Title",
  description = "Destription",
  className,
  children,
}) {
  // console.log("Layout render...");
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

#### ./src/core/Home.js
``` js
// ./src/core/Home.js
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

export default function Home() {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySell();
    loadProductsByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce"
      className="container-fluid"
    >
      <h2 className="mb-4">Best Selles</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <h2 className="mb-4">New Arrival</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
}
```

#### ./src/admin/ApiCore.js
``` js
// ./src/admin/ApiCore.js
import { API } from "../config";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
```

#### ./src/core/Card.js
``` js
// ./src/core/Card.js
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

export default function Card({ product }) {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>{product.description}</p>
          <p>${product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### ./src/core/ShowImage.js
``` js
// ./src/core/ShowImage.js
import React from "react";
import { API } from "../config";

export default function ShowImage({ item, url }) {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        class="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
}
```

#### ./src/admin/ApiAdmin.js
``` js
// ./src/admin/ApiAdmin.js
import { API } from "../config";

export const createCategory = (userId, token, category) => {
  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("signup err:", err);
      })
  );
};

export const createProduct = (userId, token, product) => {
  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      })
  );
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
```

#### ./src/admin/addCategory.js
``` js
//  ./src/admin/addCategory.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createCategory } from "./ApiAdmin";

export default function AddCategory() {
  const [values, setValues] = useState({
    name: "",
    error: "",
    success: false,
  });

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const { name, error, success } = values;

  function handelChange(e) {
    setValues({
      ...values,
      error: "",
      [e.target.name]: e.target.value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();

    setValues({
      ...values,
      error: "",
      success: false,
    });

    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
        });
      }
    });
  }

  // 使用此種寫法不用加 {} and retuen
  const newCategoryForm = () => (
    <form onSubmit={handelSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handelChange}
          name="name"
          type="text"
          className="form-control"
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to DashBoard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
}
```

#### ./src/admin/AddProduct.js
``` js
//  ./src/admin/AddProduct.js
import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./ApiAdmin";

export default function AddProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    // shipping,
    quantity,
    // photo,
    loading,
    error,
    createdProduct,
    // redirectToProfile,
    formData,
  } = values;

  // load categories and set from data.error
  const init = () => {
    getCategories().then((data) => {
      // console.log("****data:", data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        // FormData 可建立表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合
        setValues({
          ...values,
          // 移除 含 data 欄位
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
    // FormData 可建立表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合
    // setValues({ ...values, formData: new FormData() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handelChange(e) {
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // set formData's velue
    formData.set(name, value);
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  function handelSubmit(e) {
    e.preventDefault();

    setValues({
      ...values,
      error: "",
      loading: true,
    });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          quantity: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  }

  // // 使用此種寫法不用加 {} and retuen
  const newProductForm = () => (
    <form onSubmit={handelSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            id="photo_uploades"
            onChange={handelChange}
            name="photo"
            type="file"
            accepr="image/*"
          />
        </label>
        <br />
        <label className="text-muted">Name</label>
        <input
          onChange={handelChange}
          name="name"
          type="text"
          className="form-control"
          value={name}
        />
        <label className="text-muted">Description</label>
        <textarea
          onChange={handelChange}
          name="description"
          type="text"
          className="form-control"
          value={description}
        />
        <label className="text-muted">Price</label>
        <input
          onChange={handelChange}
          name="price"
          type="text"
          className="form-control"
          value={price}
        />
        <label className="text-muted">Category</label>
        <select
          onChange={handelChange}
          name="category"
          className="form-control"
        >
          {/* <option value="618cccaac104434a41b7e4e7">Node</option>
          <option value="618d2aeb3cc4d2fb8b0ffa6c">python</option> */}
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
        <label className="text-muted">Shipping</label>
        <select
          onChange={handelChange}
          name="shipping"
          className="form-control"
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <label className="text-muted">Quantity</label>
        <input
          onChange={handelChange}
          name="quantity"
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  );

  const showLoading = () => {
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );
  };

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newProductForm()}
        </div>
      </div>
    </Layout>
  );
}
```

### 參考資料
+ [Autofilling form controls: the autocomplete attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute)