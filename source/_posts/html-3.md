---
title: HTML Issue
abbrlink: '1739'
date: 2021-06-04 11:52:10
categories:  Front End
tags:
	- html
	- issue
---

### favicon.ico Failed to load resource: the server responded with a status of 404 (Not Found)
``` html 
<!-- #1 將favicon.ico 放於根目錄 -->

<!-- #2 加入以下代碼 -->
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

<!-- #3 加入以下代碼 -->
<link rel="shortcut icon" href="#"/>
```

<!--more-->

### [DOM] Input elements should have autocomplete attributes (suggested: "current-password")
add autoComplete
``` js
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
```



