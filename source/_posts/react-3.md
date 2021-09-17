---
title: React Issue
abbrlink: '21e5'
date: 2021-09-17 11:37:32
categories: Framework
tags:
	- react
	- issue
---

### use useLocation found error "TypeError: Cannot read properties of undefined (reading 'location')"
use useLocation doesn't put same component as Router

<!--more-->

#### issue code 
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
	<App />
	,
	document.getElementById('root')
);
```

``` js
// ./component/App/App.js
import React from "react";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage"; 
import Header from "../Header";
import styled from 'styled-components';
import {
  // BrowserRouter as Router,
  // for SPA
  HashRouter as Router,
  Switch,
  useLocation,
  Route,
  // useLocation
} from "react-router-dom";

const Root =  styled.div`
  padding-top: 64px;
`;

export default function App() {
  let location = useLocation();
	console.log(location);
  return (
    <Root>
      <Router>
        <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
      </Router>
    </Root>
  );
}
```

#### fixed code 
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {
  // BrowserRouter as Router,
  // for SPA
  HashRouter as Router,
} from "react-router-dom";


ReactDOM.render(
	<Router>
		<App />
	</Router>
	,
	document.getElementById('root')
);
```

``` js
// ./component/App/App.js
import React from "react";
import HomePage from "../../Pages/HomePage";
import LoginPage from "../../Pages/LoginPage"; 
import Header from "../Header";
import styled from 'styled-components';
import {
  Switch,
  useLocation,
  Route,
} from "react-router-dom";

const Root =  styled.div`
  padding-top: 64px;
`;

export default function App() {
  let location = useLocation();
	console.log(location.pathname);
  return (
    <Root>
    	<Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Root>
  );
}
```