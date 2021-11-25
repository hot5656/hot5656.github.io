---
title:  React tricky
abbrlink: e6a4
date: 2021-11-25 12:07:47
categories: Framework
tags:
	- react
	- tricky
---

### event include parameter
``` js
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
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((c, i) => (
    <li key={i} className="list-unstyled">
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

<!--more-->

### call API function 要加 return 才能 then
``` js
function handleSubmit(e) {
  e.preventDefault();

  setValues({
    ...values,
    error: "",
    success: false,
  });

  // make request to api to create category
  // ***--->>> call API function 要加 return 才能 then 處理
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

export const createCategory = (userId, token, category) => {
  // ***--->>> call API function 要加 return 才能 then 處理
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
```

### 使用 arrow 函數,可省略 return
``` js
export default function AdmintDashboard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  // ***--->>> 使用 arrow 函數,可省略 return
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
      description="Admin Dashboard"
      className="container-fluid"
    >
      <div className="row">
        {/* ***--->>> 使用 arrow 函數,可省略 return */}
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
}
```


