---
title: Practice React Ecommerce - Front End
abbrlink: 82e
date: 2021-11-16 10:16:11
categories: Project
tags:
	- react
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
				return { error: "Server not response" };
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
				return { error: "Server not response" };
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
      .catch((err) => {
				console.log(err);
				return { error: "Server not response" };
			});
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

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
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
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
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

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
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
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
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

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
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
          onChange={handleChange}
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
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          value={password}
          autoComplete="new-password"
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
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
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
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
				return { error: "Server not response" };
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
				return { error: "Server not response" };
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
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
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

  function handleChange(e) {
    setValues({
      ...values,
      error: "",
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
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
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
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

  function handleChange(e) {
    const name = e.target.name;
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // set formData's velue
    formData.set(name, value);
    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  function handleSubmit(e) {
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
    <form onSubmit={handleSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            id="photo_uploades"
            onChange={handleChange}
            name="photo"
            type="file"
            accepr="image/*"
          />
        </label>
        <br />
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control"
          value={name}
        />
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange}
          name="description"
          type="text"
          className="form-control"
          value={description}
        />
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange}
          name="price"
          type="text"
          className="form-control"
          value={price}
        />
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange}
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
          onChange={handleChange}
          name="shipping"
          className="form-control"
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange}
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


### add Shop page + Category, Price filter
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
import Shop from "./core/Shop";

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
          <Route path="/shop" element={<Shop />} />
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
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
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


#### ./src/core/Shop.js
``` js
// ./src/core/Shop.js
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./fixPrices";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // FormData 可建立表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合
        setCategories(data);
      }
    });
  };

  function loaderFilterResults(newFilters) {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      // console.log(data);
      if (data.error) {
        setError(data.error);
        setFilteredResult([]);
      } else {
        setFilteredResult(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  }

  function loadMore() {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      // console.log(data);
      if (data.error) {
        setError(data.error);
        setFilteredResult([]);
      } else {
        setFilteredResult([...filteredResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  }

  function loadMoreButton() {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  }

  useEffect(() => {
    init();
    loaderFilterResults(myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValue = handlePrice(filters);
      newFilters.filters[filterBy] = priceValue;
    }
    loaderFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  function handlePrice(value) {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  // console.log(filteredResult);
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Fillter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Fillter by price range</h4>
          <div>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          {showError()}
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResult.map((product, i) => (
              <Card key={i} product={product}></Card>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
}
```


#### ./src/core/Checkbox.js
``` js
// ./src/core/Checkbox.js
/* eslint-disable array-callback-return */
import React, { useState } from "react";

export default function Checkbox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  // ***--->>> event include parameter
  const handleToggle = (c) => (e) => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if current checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      {/* value=false -->not select  */}
      {/* ***--->>> event include parameter */}
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id) === -1}
        type="checkbox"
        className="form-check-input"
      />
      <label htmlFor="form-check-label">{c.name}</label>
    </li>
  ));
}
```


#### ./src/core/Radiobox.js
``` js
// ./src/core/Radiobox.js
/* eslint-disable array-callback-return */
import React from "react";

export default function Radiobox({ prices, handleFilters }) {
  // const [value, setValue] = useState([]);

  function handleChange(e) {
    // console.log(e.target.value);
    handleFilters(e.target.value);
    // setValue(e.target.value);
  }

  return prices.map((p, i) => (
    <div key={i} className="list-unstyled">
      <input
        name="price"
        onChange={handleChange}
        value={p._id}
        type="radio"
        className="mr-2 ml-4"
      />
      <label htmlFor="form-check-label">{p.name}</label>
    </div>
  ));
}
```


#### ./src/core/fixPrices.js
``` js
// ./src/core/fixPrices.js
export const prices = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $9",
    array: [0, 9],
  },
  {
    _id: 2,
    name: "$10 to $19",
    array: [10, 19],
  },
  {
    _id: 3,
    name: "$20 to $29",
    array: [20, 29],
  },
  {
    _id: 4,
    name: "$30 to $39",
    array: [30, 39],
  },
  {
    _id: 5,
    name: "More then $40",
    array: [40, 99],
  },
];
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
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getFilteredProducts = (skip, limit, filters) => {
  const data = { limit, skip, filters };
  // console.log(data);

  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("signup err:", err);
				return { error: "Server not response" };
      })
  );
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
  // console.log(product);
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage item={product} url="product" />
          <p>{`<<${product.category.name}>>`}</p>
          <p>{product.description.substring(0, 10)}</p>
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

### add Products search
#### install
``` bash
npm i query-string
```

#### Front End
##### ./src/core/Home.js
``` js
// ./src/core/Home.js
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

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

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{error}</h3>;
    }
  };

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Best Selles</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      {showError()}
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

##### ./src/core/Search.js
``` js
// ./src/core/Search.js
import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

export default function Search() {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData({ ...data, categories: response });
      }
    });
  };

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchData() {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    searchData();
  }

  const handleChange = (name) => (e) => {
    // setData({ ...data, [name]: e.target.value, searched: false });
    setData({ ...data, [name]: e.target.value });
  };

  function searchMessage(searched, results) {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  }

  function searchProducts(results) {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  }

  function searchForm() {
    return (
      <form onSubmit={handleSearch}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Search by name"
            />
          </div>
          <div className="btn inpu-group-append" style={{ border: "none" }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  }
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchProducts(results)}</div>
    </div>
  );
}
```

##### ./src/admin/ApiCore.js
``` js
// ./src/admin/ApiCore.js
import { API } from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getFilteredProducts = (skip, limit, filters) => {
  const data = { limit, skip, filters };
  // console.log(data);

  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("signup err:", err);
				return { error: "Server not response" };
      })
  );
};

export const list = (params) => {
  const query = queryString.stringify(params);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};
```

#### Bakc End
##### ./routes/product.js
``` js
// ./routes/product.js
const express = require("express");
const router = express.Router();
// add controller
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listSearch,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

const { userById } = require("../controllers/user");

router.get("/product/:productId", read);
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

// product/create
// userId 參數驗證
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
```

##### ./controller/product.js
``` js
// ./controller/product.js
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product does not exist",
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      // console.log("product:", result);
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successly",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = req.product;
    // fields 蓋過 product
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      result.photo = undefined;
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      res.json(result);
    });
  });
};

/**
 * sel/arrival
 * bye sell = /products?sortBy=sold&order=desc&limit=4
 * bye arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no parameter are sent, then all products are returned
 */
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category") // mapt to Category
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      // console.log("product-list:", products);
      res.json(products);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be return
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // $ne: not include
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  // distinct : 取出不同的 category
  // {} : 2nd parameter doesn't need do no send value
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
// {
//  "skip" : "1",
//  "limit" : "2",
// 	"filters": {
// 		"name": "Note"
// 	}
// }
//
// >=2 and <=19
//  {
// "filters": {
//   "price": ["2", "19"]
// }
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log(req.body);
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte - great than price
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        // findArgs[key] = new RegExp(req.body.filters[key]);
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  // console.log("findArgs", findArgs);

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hole search value and category value
  const query = {};
  // assign search value to query name
  if (req.query.search) {
    // mongodb regular expression
    query.name = { $regex: req.query.search, $options: "i" };
    console.log(query.name);
    // assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product base on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};

```

### add Product Page with Related Products
#### install   
```
npm i moment
```

#### Front End
##### ./src/AppRoutes.js
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
import Shop from "./core/Shop";
import Product from "./core/Product";

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
          <Route path="/shop" element={<Shop />} />
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
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

##### ./src/core/Product.js
``` js
// ./src/core/Product.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

export default function Product(props) {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, SetError] = useState();
  const params = useParams();

  // console.log(props);
  function locaSingleProduct(productId) {
    read(productId).then((data) => {
      if (data.error) {
        SetError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            SetError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  }

  useEffect(() => {
    // react-router-dom v6 get parameter
    const productId = params.productId;
    locaSingleProduct(productId);
  }, [params]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0.1)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Rekated Products</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
```

##### ./src/core/Card.js
``` js
// ./src/core/Card.js
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";

export default function Card({ product, showViewProductButton = true }) {
  // console.log(product);
  function showViewButton(showViewProductButton) {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  }

  function showAddToCardButton() {
    return (
      <button className="btn btn-outline-warning mt-2 mb-2">Add to card</button>
    );
  }

  function showStock(quantity) {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span>Out of Stock</span>
    );
  }

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        {/* <p>{`<<${product.category.name}>>`}</p> */}
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCardButton()}
      </div>
    </div>
  );
}
```

##### ./src/admin/ApiCore.js
``` js
// ./src/admin/ApiCore.js
import { API } from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const getFilteredProducts = (skip, limit, filters) => {
  const data = { limit, skip, filters };
  // console.log(data);

  // 要加 return 才能 then 處理
  return (
    fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // json format body 傳回要加 .json()
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("signup err:", err);
				return { error: "Server not response" };
      })
  );
};

export const list = (params) => {
  const query = queryString.stringify(params);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) =>{
			console.log(err);
			return { error: "Server not response" };
		});
};

export const read = (productId) => {
  console.log("productid=", productId);
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};

export const listRelated = (productId) => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
			console.log(err);
			return { error: "Server not response" };
		});
};
```

##### ./src/styles.css
``` js
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
* single product page - product name
*/
.name {
  background: indigo;
  color: #fff;
  font-weight: bold;
}

/**
* black shade from 10-1
*/
.black-10 {
  background: #f2f2f2;
}
.black-9 {
  background: #e6e6e6;
}
.black-8 {
  background: #d9d9d9;
}
.black-7 {
  background: #cccccc;
}
.black-6 {
  background: #bfbfbf;
}
.black-5 {
  background: #b3b3b3;
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

##### ./src/core/Home.js
``` js
// ./src/core/Home.js
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";

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

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{error}</h3>;
    }
  };

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Best Selles</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      {showError()}
      <h2 className="mb-4">New Arrival</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
```

##### ./src/core/Shop.js
``` js
// ./src/core/Shop.js
import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Radiobox from "./Radiobox";
import { prices } from "./fixPrices";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  });
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResult, setFilteredResult] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // FormData 可建立表單資料中的欄位/值建立相對應的的鍵/值對（key/value）集合
        setCategories(data);
      }
    });
  };

  function loaderFilterResults(newFilters) {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      // console.log(data);
      if (data.error) {
        setError(data.error);
        setFilteredResult([]);
      } else {
        setFilteredResult(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  }

  function loadMore() {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      // console.log(data);
      if (data.error) {
        setError(data.error);
        setFilteredResult([]);
      } else {
        setFilteredResult([...filteredResult, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  }

  function loadMoreButton() {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  }

  useEffect(() => {
    init();
    loaderFilterResults(myFilters.filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("Shop", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValue = handlePrice(filters);
      newFilters.filters[filterBy] = priceValue;
    }
    loaderFilterResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  function handlePrice(value) {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>;
    }
  };

  // console.log(filteredResult);
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Fillter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Fillter by price range</h4>
          <div>
            <Radiobox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          {showError()}
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResult.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
              // <Card key={i} product={product}></Card>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
}
```

#### Back End
##### ./controller/product.js
``` js
// ./controller/product.js
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product does not exist",
        });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      // console.log("product:", result);
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successly",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fieldd
    const { name, description, price, category, quantity, shipping } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All field are required",
      });
    }

    let product = req.product;
    // fields 蓋過 product
    product = _.extend(product, fields);

    if (files.photo) {
      if (files.photo.size > 200000) {
        return res.status(400).json({
          error: "Image should be less 200k in size",
        });
      }

      // change files.photo.file to files.photo.filepath
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.mimetype;
    }

    product.save((err, result) => {
      result.photo = undefined;
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      result.photo = undefined;
      res.json(result);
    });
  });
};

/**
 * sel/arrival
 * bye sell = /products?sortBy=sold&order=desc&limit=4
 * bye arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no parameter are sent, then all products are returned
 */
exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo")
    .populate("category") // mapt to Category
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      // console.log("product-list:", products);
      res.json(products);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be return
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  // $ne: not include
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  // distinct : 取出不同的 category
  // {} : 2nd parameter doesn't need do no send value
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
// {
//  "skip" : "1",
//  "limit" : "2",
// 	"filters": {
// 		"name": "Note"
// 	}
// }
//
// >=2 and <=19
//  {
// "filters": {
//   "price": ["2", "19"]
// }
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log(req.body);
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte - great than price
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        // findArgs[key] = new RegExp(req.body.filters[key]);
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  // console.log("findArgs", findArgs);

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hole search value and category value
  const query = {};
  // assign search value to query name
  if (req.query.search) {
    // mongodb regular expression
    query.name = { $regex: req.query.search, $options: "i" };
    console.log(query.name);
    // assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product base on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};
```

### add Cart
#### ./src/core/Cart.js
``` js
// ./src/core/Cart.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [updateScreen, setUpdateScreen] = useState(true);

  useEffect(() => {
    setItems(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateScreen]);

  function handleUpdateScreen() {
    setUpdateScreen(!updateScreen);
  }

  function showItems(items) {
    return (
      <div>
        <h2>Your cart has {items.length} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            handelUpdate={handleUpdateScreen}
          />
        ))}
      </div>
    );
  }

  function noItemsMessage() {
    return (
      <h2>
        Your cart is empty.
        <br />
        <Link to="/shop"> Continue shopping</Link>
      </h2>
    );
  }

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summy</h2>
          <hr />
          <Checkout products={items}></Checkout>
        </div>
      </div>
    </Layout>
  );
}
```

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
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

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
          <Route path="/shop" element={<Shop />} />
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
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

#### ./src/core/Card.js
``` js
// ./src/core/Card.js
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";

export default function Card({
  product,
  showViewProductButton = true,
  showAddCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  handelUpdate,
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  function showViewButton(showViewProductButton) {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
            View Product
          </button>
        </Link>
      )
    );
  }

  function addToCart() {
    addItem(product, () => {
      setRedirect(true);
    });
  }

  function shouldRedirect(redirect) {
    if (redirect) {
      return <Navigate replace to="/cart" />;
    }
  }

  function showAddToCard(showAddCartButton) {
    return (
      showAddCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2"
        >
          Add to card
        </button>
      )
    );
  }

  function showRemoveButton(showRemoveProductButton) {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            handelUpdate();
            removeItem(product._id);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  }

  function showStock(quantity) {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span>Out of Stock</span>
    );
  }

  const handleChange = (productId) => (e) => {
    // console.log(productId, e.target.value);
    handelUpdate();
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(productId, e.target.value);
    }
  };

  function showCartUpdateotions(CartUpdate) {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  }

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        {/* <p>{`<<${product.category.name}>>`}</p> */}
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCard(showAddCartButton)}
        {showRemoveButton(showRemoveProductButton)}
        {showCartUpdateotions(cartUpdate)}
      </div>
    </div>
  );
}
```

#### ./src/core/cartHelpers.js
``` js
// ./src/core/cartHelpers.js
export function addItem(item, next) {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
  }
  cart.push({
    ...item,
    count: 1,
  });
 
  cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
    return cart.find((p) => p._id === id);
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  next();
}

export function itemTotal() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
}

export function getCart() {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
}

export function updateItem(productId, count) {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // eslint-disable-next-line array-callback-return
    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function removeItem(productId) {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    // eslint-disable-next-line array-callback-return
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
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
import { itemTotal } from "./cartHelpers";

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
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
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

#### ./src/core/Checkbox.js
``` js
// ./src/core/Checkbox.js
/* eslint-disable array-callback-return */
import React, { useState } from "react";

export default function Checkbox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([]);

  // ***--->>> event include parameter
  const handleToggle = (c) => (e) => {
    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if current checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
      {/* value=false -->not select  */}
      {/* ***--->>> event include parameter */}
      <input
        onChange={handleToggle(c._id)}
        value={checked.indexOf(c._id) === -1}
        type="checkbox"
        className="form-check-input"
      />
      <label htmlFor="form-check-label">{c.name}</label>
    </li>
  ));
}
```

#### ./src/styles.css
``` js
/* ./src/styles.css */

/** 
* board radis 
*/

.btn,
.jumbotron,
.nav :hover {
  border-radius: 0px;
}

/* cart badge */
.cart-badge,
.cart-badge:hover {
  border-radius: 50%;
  padding: 2px;
  font-size: 12px;
  font-style: italic;
  background: #000;
}

/**
* single product page - product name
*/
.name {
  background: indigo;
  color: #fff;
  font-weight: bold;
}

/**
* black shade from 10-1
*/
.black-10 {
  background: #f2f2f2;
}
.black-9 {
  background: #e6e6e6;
}
.black-8 {
  background: #d9d9d9;
}
.black-7 {
  background: #cccccc;
}
.black-6 {
  background: #bfbfbf;
}
.black-5 {
  background: #b3b3b3;
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

### Payment Gateway
``` bash
# login Braintree
login Briantree -> API -> Generate New API Key

# set Back End .env
BRAINTREE_MERCHAN_ID=...
BRAINTREE_PUBLIC_KEY=...
BRAINTREE_PRIVATE_KEY=...

# set CVV
Fraud Management --> CVV --> CVV does not match (when provided) (N) --> For Any Transaction

# enable paypal
Processing --> paypal --> 
 

# install briantree
npm i braintree
```

``` js
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

TypeError: braintree.connect is not a function

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
```
postman
``` js
[GET]
http://localhost:8000/api/braintree/getToken/6188c8128db0e4691c2f6727

Content-Type:application/json
Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTg4YzgxMjhkYjBlNDY5MWMyZjY3MjciLCJpYXQiOjE2Mzg0NTY1MDV9.7FWaG101Y0j3WhQdTMbO2-ew9pnb-S3tObemBH5DG28

{
    "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTXpnMU5ETXhOeklzSW1wMGFTSTZJbU01TVRRME1EUTBMV0kyTW1JdE5HSXlaQzA1WmpBMUxXSm1PVEU0WldRMU16WXpOaUlzSW5OMVlpSTZJblJpTlhaNVpIcHlNMjFrY0dRMGVXUWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pZEdJMWRubGtlbkl6YldSd1pEUjVaQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LlJXUmhBWG45b1BrdlFIemgwOW5YM2oxNkgzcWtHd0dtbXczRVAtRjU2cHBfWVRVdEo1VHVRb3lTc1dKaDZCdkNKQnJtazRQcm5RRVlSQksyb3R1N2NBIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3RiNXZ5ZHpyM21kcGQ0eWQvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdGI1dnlkenIzbWRwZDR5ZC9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6InRiNXZ5ZHpyM21kcGQ0eWQiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3RiNXZ5ZHpyM21kcGQ0eWQifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoiVHJ5QnlTZWxmIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoidHJ5YnlzZWxmIiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn19",
    "success": true
}
```

Front End 
``` bash
npm i braintree-web-drop-in-react

```

``` bash
test visa card code : 4111111111111111

event : onBlur 離開表單

https://developer.paypal.com/home -> 


 message: 'A linked PayPal Sandbox account is required to use…ls on linking your PayPal sandbox with Braintree.' --> flow: "vault", 設錯
https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live#linked-paypal-testing


REACT- DOM Mutation Warning Meaning
[Violation] Added synchronous DOM mutation listener to a 'DOMNodeInserted' event. Consider using MutationObserver to make the page more responsive.
```

### 參考資料
+ [Autofilling form controls: the autocomplete attribute](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls%3A-the-autocomplete-attribute)
+ [Stripe vs PayPal vs Braintree](https://rubygarage.org/blog/stripe-vs-braintree-vs-paypal-how-do-these-payment-platforms-compare)
+ [Stripe VS Braintree](https://www.merchantmaverick.com/stripe-vs-braintree/)
+ [做為電商 PM，我是如何選擇金流服務商](https://medium.com/kkdaytech/%E5%81%9A%E7%82%BA%E9%9B%BB%E5%95%86-pm-%E6%88%91%E6%98%AF%E5%A6%82%E4%BD%95%E9%81%B8%E6%93%87%E9%87%91%E6%B5%81%E6%9C%8D%E5%8B%99%E5%95%86-a81bc651f6a6)
+ [Sandbox | Braintree Payments](https://www.braintreepayments.com/sandbox)
+ [Send a client token to your client](https://developer.paypal.com/braintree/docs/start/hello-server/node)
+ [Paypal](https://www.paypal.com/tw/webapps/mpp/home) 
+ [Paypal Sandbox](ttps://developer.paypal.com/developer/accountsh/)