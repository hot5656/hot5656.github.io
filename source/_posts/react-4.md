---
title: Redux
categories: Framework
tags:
  - react
  - redux
abbrlink: 6dc0
date: 2021-09-23 20:14:46
---

### 名詞

<!--more-->

### 常用 list
+ createStore : 產生 store
+ useSelector : Redux store 中的狀態提取數據
+ useDispatch : 回傳一個 dispatch 方法, 產生 action
+ Provider : 讓整個react applicaiton都能取得Redux store的資料
+ combineReducers : 由多個不同 reducer 函數作為 value 的 object，合併成一個最終的 reducer 函數，然後就可以對這個 reducer 調用 createStore
+ connect : 將傳入 components 的 states 和 actions 進行篩選或初步處理


### 基礎
#### Redux 基本操作
##### install  
```
mkdir plain-redux
cd plain-redux
npm init
npm install redux
```

##### Data Flow
<div style="width:500px;">
	{% asset_img ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif %}
</div>

##### example #1 - simple flow
``` js
// ./app.js

// node.js not simple support import
// ./app.js
const { createStore } = require("redux");

const initialState = {
  value: 0,
};

// #2 initiation store state, accept dispatch by type
function counterReducer(state = initialState, action) {
  console.log("reciver action", action);
  switch (action.type) {
    case "plus":
      return {
        value: state.value + 1,
      };
      break;
    case "milus":
      return {
        value: state.value - 1,
      };
      break;
    default:
      break;
  }
  return state;
}

// #1 產生 store 
let store = createStore(counterReducer);


// #3 get state
// console.log(store);
console.log(" first state:", store.getState());

// #4 trigger by dispatch
store.dispatch({
  type: "plus",
});

store.dispatch({
  type: "plus",
});

// #5 get state
console.log(" second state:", store.getState());

store.dispatch({
  type: "milus",
});

// srtore get state
console.log(" third state:", store.getState());
``` 

run
``` bash
plain-redux>node app.js
reciver action { type: '@@redux/INITg.f.3.1.7' }
 first state: { value: 0 }
reciver action { type: 'plus' }
reciver action { type: 'plus' }
 second state: { value: 2 }
reciver action { type: 'milus' }
 third state: { value: 1 }
```

##### example #2 - todos create and delete
+ store subscribe
+ process state additional data
+ action constants
+ action creator

``` js
// ./app.js

// node.js not simple support import
const { createStore } = require("redux");

// action constants
const ActionTypes = {
  ADD_TDDO: "add_toto",
  DELETE_TODO: "delete_todo",
};

const initialState = {
  email: "12345",
  todos: [],
};

// add id
let todoId = 0;

function counterReducer(state = initialState, action) {
  console.log("reciver action", action);
  switch (action.type) {
    case ActionTypes.ADD_TDDO:
      return {
        // process state additional data
        ...state,
        todos: [
          ...state.todos,
          {
            // add id
            id: todoId++,
            name: action.payload.name,
          },
        ],
      };
      break;
    // delete todo
    case ActionTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
      break;
    default:
      break;
  }
  return state;
}

let store = createStore(counterReducer);

// add store subscribe
store.subscribe(() => {
  console.log(" changed : ", store.getState());
});

// action creator
function addTodo(name) {
  return {
    type: ActionTypes.ADD_TDDO,
    payload: {
      name: name,
    },
  };
}

function deleteTodo(id) {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: {
      id: id,
    },
  };
}

// add tdod
store.dispatch(addTodo("todo0"));
store.dispatch(addTodo("todo1"));
store.dispatch(addTodo("todo2"));
store.dispatch(addTodo("todo3"));

// delete todo
store.dispatch(deleteTodo(2));
```

run
``` bash
>node app.js
reciver action { type: '@@redux/INIT1.n.3.f.v.b' }
reciver action { type: 'add_toto', payload: { name: 'todo0' } }
 changed :  { email: '12345', todos: [ { id: 0, name: 'todo0' } ] }
reciver action { type: 'add_toto', payload: { name: 'todo1' } }
 changed :  {
  email: '12345',
  todos: [ { id: 0, name: 'todo0' }, { id: 1, name: 'todo1' } ]
}
reciver action { type: 'add_toto', payload: { name: 'todo2' } }
 changed :  {
  email: '12345',
  todos: [
    { id: 0, name: 'todo0' },
    { id: 1, name: 'todo1' },
    { id: 2, name: 'todo2' }
  ]
}
reciver action { type: 'add_toto', payload: { name: 'todo3' } }
 changed :  {
  email: '12345',
  todos: [
    { id: 0, name: 'todo0' },
    { id: 1, name: 'todo1' },
    { id: 2, name: 'todo2' },
    { id: 3, name: 'todo3' }
  ]
}
reciver action { type: 'delete_todo', payload: { id: 2 } }
 changed :  {
  email: '12345',
  todos: [
    { id: 0, name: 'todo0' },
    { id: 1, name: 'todo1' },
    { id: 3, name: 'todo3' }
  ]
}
```


#### react-redux
##### install
``` bash
npx create-react-app react-dedux-demo --template redux
cd react-dedux-demo
# 已安裝
# npm install react-redux
```

##### example #1 - todos
###### ./src
+ ./src/index.js
``` js
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// step #2 store patch
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  // step #1 Provider 綁定,使整個react applicaiton都能取得 store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

+ ./src/App.js
``` js
// ./src/App.js
import { selectTodos } from "./redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "./redux/actions";

function App() {
  const state = useSelector((state) => state);
  console.log("state:", state);

  // step #7 useSelector 取得 store 內的植
  // todos = useSelector((store) => store.todoState.todos)
  const todos = useSelector(selectTodos);
  // step #9 useDispatch 可 trigger action
  const dispatch = useDispatch();
  // step #32 若已執行修改後會顯示,但直接執行(或重整畫面)則不會顯示 ???
  console.log("todos", todos);
  return (
    <div>
      <button
        // step #11 dispatch 呼叫 action creator, 產生 action
        onClick={() => {
          dispatch(addTodo(Math.random()));
        }}
      >
        add todo
      </button>
      <ul>
        {/* step #12 show todos */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

###### ./src/redux
+ ./src/redux/actionTypes.js
``` js
// ./src/redux/actionTypes.js
export const ADD_TODO = "add_todo";
export const DELETE_TODO = "delete_todo";

export const ADD_USER = "add_user";
```

+ ./src/redux/actions.js
``` js
// ./src/redux/actions.js

import { ADD_TODO, DELETE_TODO, ADD_USER } from "./actionTypes";

// step #10 做成 action creator(function) 方便使用
// action creator
export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name: name,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id: id,
    },
  };
}

export function addUser(name) {
  return {
    type: ADD_USER,
    payload: {
      name,
    },
  };
}
```

+ ./src/redux/store.js
``` js
// ./src/redux/store.js

import { createStore } from "redux";
import rootReducer from "./reducers";

// step #3 產生 store(from ./reducers )
export const store = createStore(
  rootReducer,
  // step #31 add for redux devtool
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

+ ./src/redux/selectors.js
``` js
// ./src/redux/selectors.js

// step #8 selectot 另開成檔案
export const selectTodos = (store) => store.todoState.todos;
```

###### ./src/redux/reducers
+ ./src/redux/reducers/index.js
``` js
// ./src/redux/reducers/index.js
import { combineReducers } from "redux";
import todos from "./todos";
import users from "./users";

// step #4 combineReducers 可包含 多個 reducer
export default combineReducers({
  todoState: todos, //todos: todos
  users, //users: users
});
```

+ ./src/redux/reducers/todos.js
``` js
// ./src/redux/reducers/todos.js
import { ADD_TODO, DELETE_TODO } from "../actionTypes";

let todoId = 0;

const initialState = {
  todos: [],
};

// step #5 todosReducer
export default function todosReducer(state = initialState, action) {
  console.log("reciver action(todos)", action);
  switch (action.type) {
    case ADD_TODO:
      return {
        // process state additional data
        ...state,
        todos: [
          ...state.todos,
          {
            // add id
            id: todoId++,
            name: action.payload.name,
          },
        ],
      };
    // delete todo
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      break;
  }
  return state;
}
```

+ ./src/redux/reducers/users.js
``` js
// ./src/redux/reducers/users.js
import { ADD_USER } from "../actionTypes";

const initialState = {
  users: [],
};

// step #6 usersReducer
export default function usersReducer(state = initialState, action) {
  console.log("reciver action(users)", action);
  switch (action.type) {
    case ADD_USER:
      return {
        // process state additional data
        ...state,
        users: [
          ...state.users,
          {
            name: action.payload.name,
          },
        ],
      };
    default:
      break;
  }
  return state;
}
```

##### example #2 - button create component

``` js
// ./src/App.js
import { selectTodos } from "./redux/selectors";
import { useSelector } from "react-redux";
import AddTodo from "./AddTodo";

function App() {
  const todos = useSelector(selectTodos);
  console.log("todos", todos);
  return (
    <div>
      <AddTodo />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

``` js
// ./src/AddTodo.js
import { useDispatch } from "react-redux";
import { addTodo } from "./redux/actions";

export default function AddTodo() {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(addTodo(Math.random()));
      }}
    >
      add todo
    </button>
  );
}
```

##### example #3 - use connect(無 hook 前使用的方法)
###### ./src

+ ./src/index.js
``` js
// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// step #2 store patch
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  // step #1 Provider 綁定,使整個react applicaiton都能取得 store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

+ ./src/App.js
``` js
// ./src/App.js
import { selectTodos } from "./redux/selectors";
import { useSelector } from "react-redux";
import AddTodo from "./containers/AddTodo";

function App() {
  // step #7 useSelector 取得 store 內的植
  // todos = useSelector((store) => store.todoState.todos)
  const todos = useSelector(selectTodos);
  // step #42 若已執行修改後會顯示,但直接執行(或重整畫面)則不會顯示 ???
  console.log("todos", todos);
  return (
    <div>
      {/* call step #21 addTodo component */}
      <AddTodo />
      <ul>
        {/* step #9 show todos */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

###### ./src/redux

+ ./src/redux/store.js
``` js
// ./src/redux/store.js

import { createStore } from "redux";
import rootReducer from "./reducers";

// step #3 產生 store(from ./reducers )
export const store = createStore(
  rootReducer,
  // step #41 add for redux devtool
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

+ ./src/redux/selectors.js
``` js
// ./src/redux/selectors.js

// step #8 selectot 另開成檔案
export const selectTodos = (store) => store.todoState.todos;
```

+ ./src/redux/actionTypes.js
``` js
// ./src/redux/actionTypes.js
export const ADD_TODO = "add_todo";
export const DELETE_TODO = "delete_todo";

export const ADD_USER = "add_user";
```

+ ./src/redux/actions.js
``` js
// ./src/redux/actions.js

import { ADD_TODO, DELETE_TODO, ADD_USER } from "./actionTypes";

// step #10 做成 action creator(function) 方便使用
// action creator
export function addTodo(name) {
  return {
    type: ADD_TODO,
    payload: {
      name: name,
    },
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id: id,
    },
  };
}

export function addUser(name) {
  return {
    type: ADD_USER,
    payload: {
      name,
    },
  };
}
```

###### ./src/redux/reducers
+ ./src/redux/reducers/index.js
``` js
// ./src/redux/reducers/index.js
import { combineReducers } from "redux";
import todos from "./todos";
import users from "./users";

// step #4 combineReducers 可包含 多個 reducer
export default combineReducers({
  todoState: todos, //todos: todos
  users, //users: users
});
```

+ ./src/redux/reducers/todos.js
``` js
// ./src/redux/reducers/todos.js
import { ADD_TODO, DELETE_TODO } from "../actionTypes";

let todoId = 0;

const initialState = {
  todos: [],
};

// step #5 todosReducer
export default function todosReducer(state = initialState, action) {
  console.log("reciver action(todos)", action);
  switch (action.type) {
    case ADD_TODO:
      return {
        // process state additional data
        ...state,
        todos: [
          ...state.todos,
          {
            // add id
            id: todoId++,
            name: action.payload.name,
          },
        ],
      };
    // delete todo
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      break;
  }
  return state;
}
```

+ ./src/redux/reducers/users.js
``` js
// ./src/redux/reducers/users.js
import { ADD_USER } from "../actionTypes";

const initialState = {
  users: [],
};

// step #6 usersReducer
export default function usersReducer(state = initialState, action) {
  console.log("reciver action(users)", action);
  switch (action.type) {
    case ADD_USER:
      return {
        // process state additional data
        ...state,
        users: [
          ...state.users,
          {
            name: action.payload.name,
          },
        ],
      };
    default:
      break;
  }
  return state;
}
```

###### ./src/containers
+ ./src/containers/AddTodo.js
``` js
// ./src/containers/AddTodo.js
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";
import AddTodo from "../components/AddTodo";

// step #23  connect parameter 1 ,使用 connect 來取得 Redux 中的 states(store 內的值)
const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos,
  };
};

// step #24 connect parameter 2 , 使用 connect 來 dispatch actions
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo: (payload) => dispatch(addTodo(payload)),
//   };
// };
// step #26 上面簡化(因 props 與 action 同名)
const mapDispatchToProps = {
  addTodo,
};

// step #22 利用 connect 處理
// const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// step #25 link addTodo component
// const ConnectedAddTodo = connectToStore(AddTodo);
// // HOC(Higher Order Component)
// // smart component or container(知道 redux)
// export default ConnectedAddTodo;

// step #27 等同上面三行 command
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
```

###### ./src/components
+ ./src/components/AddTodo.js
``` js
// ./src/components/AddTodo.js

// step #28 addTodo component
// dump component(不知 redux)
export default function AddTodo({ addTodo }) {
  return (
    <button
      // step #29 dispatch 呼叫 action creator, 產生 action
      onClick={() => {
        addTodo(Math.random());
      }}
    >
      add todo
    </button>
  );
}
```

##### example #4 - todos example

+ ./src/components/AddTodo.js
``` js
// ./src/components/AddTodo.js
import { useState, Fragment } from "react";

// step #28 addTodo component
// dump component(不知 redux)
export default function AddTodo({ addTodo }) {
  // step #52 add state
  const [value, setValue] = useState("");
  return (
    // step #51 add Fragment for multi element
    // <Fragment></Fragment>  簡寫
    <>
      {/* step #53 add todo input */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        // step #29 dispatch 呼叫 action creator, 產生 action
        // step #54 input put to todos
        onClick={() => {
          addTodo(value);
          setValue("");
        }}
      >
        add todo
      </button>
    </>
  );
}
```
+ ./src/App.js
``` js
// ./src/App.js
import { selectTodos } from "./redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./containers/AddTodo";
import { deleteTodo } from "./redux/actions";

function App() {
  // step #7 useSelector 取得 store 內的植
  // todos = useSelector((store) => store.todoState.todos)
  const todos = useSelector(selectTodos);
  // step #42 若已執行修改後會顯示,但直接執行(或重整畫面)則不會顯示 ???
  console.log("todos", todos);
  // step #56 add delete button - add dispatch
  const dispatch = useDispatch();
  return (
    <div>
      {/* call step #21 addTodo component */}
      <AddTodo />
      <ul>
        {/* step #9 show todos */}
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} {todo.name}
            {/* step #55 add delete button */}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

#### react-redux(Redux Toolkit )
boilerplate : 樣板
immer : 一个 immutable library，利用 ES6 的 proxy，以最小的成本實现了 js 的不可變數據結構 

##### install 
``` bash
# 已自動安裝 Redux Toolkit
npx create-react-app react-dedux-demo --template redux
# 若不安裝 template
npx create-react-app my-app
cd  my-app
npm install @reduxjs/toolkit
```

### 進階
#### redux middleware
##### Data Flow
<div style="width:500px;">
	{% asset_img ReduxAsyncDataFlowDiagram-d97ff38a0f4da0f327163170ccc13e80.gif %}
</div>

##### Redux thunk example from template 
+ ./src/feature/counter/counterSlice.js
``` js
....

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

....
```

+ ./src/feature/counter/counterAPI.js
``` js
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
```



###  redux devtool 
+ chrome install [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-TW)

+ add code as bellow for restore
``` js
// ./src/redux/store.js
import { createStore } from 'redux'
import rootReducer from './reducers'

export const store = createStore(
	rootReducer,
	// add for redux devtool 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

### 參考資料
+ [Redux](https://redux.js.org/)
+ [Redux 中文](https://chentsulin.github.io/redux/index.html)
+ [Flux](https://facebook.github.io/flux/)
+ [react-redux](https://react-redux.js.org/introduction/getting-started)
+ [Configuring Your Store](https://redux.js.org/usage/configuring-your-store)
+ [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
+ [A Todo List Example(Using the connect API)](https://react-redux.js.org/tutorials/connect)
+ [Redux Toolkit](https://redux-toolkit.js.org/)

### 圖檔來源 
+ [Redux Essentials, Part 1: Redux Overview and Concepts](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)
+ [Redux Essentials, Part 5: Async Logic and Data Fetching](https://redux.js.org/tutorials/essentials/part-5-async-logic)
