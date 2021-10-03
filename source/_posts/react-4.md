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
+ createStore
+ useSelector
+ useDispatch
+ Provider
+ combineReducers


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
// import { createStore } from "redux";
const { createStore } = require("redux");

const initialState = {
  value: 0,
};

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

let store = createStore(counterReducer);
// show state
// console.log(store);
// srtore get state
console.log(" first state:", store.getState());

// store dispatch
store.dispatch({
  type: "plus",
});

store.dispatch({
  type: "plus",
});

// srtore get state
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
npm install react-redux
```

##### example #1 - todos
###### ./src
+ ./src/index.js
``` js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

+ ./src/App.js
``` js
// ./src/App.js
import React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { selectTodos } from "./redux/selectors"
import { addTodo } from "./redux/actions"


function App() {
  // const state = useSelector((state) => state);
  // console.log('state:', state);

  const todos = useSelector(selectTodos);
  const dispatch = useDispatch()
  console.log('todos', todos);
  return (
    <div>
      <button onClick={() =>{
        dispatch(addTodo(Math.random()))
      }}>
        add todo
      </button>
      <ul>
        {todos.map(todo => <li key={todo.id} >{todo.id} {todo.name}</li>)}
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
export const ADD_TODO =  "add_todo";
export const DELETE_TODO = "delete_todo";

export const ADD_USER = "add_user";
```

+ ./src/redux/actions.js
``` js
// ./src/redux/actions.js
import { ADD_TODO, DELETE_TODO, ADD_USER } from "./actionTypes";

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

import { createStore } from 'redux'
import rootReducer from './reducers'

export const store = createStore(rootReducer)
```

+ ./src/redux/selectors.js
``` js
// ./src/redux/selectors.js

export const selectTodos = (store) => store.todoState.todos ;
```

###### ./src/redux/reducers
+ ./src/redux/reducers/index.js
``` js
// ./src/redux/reducers/index.js
import { combineReducers } from "redux";
import todos from "./todos"
import users from "./users"

export default combineReducers({
	todoState: todos,	//todos: todos 
	users,	//users: users
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

``` js
 const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
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


圖 from [Redux Essentials, Part 1: Redux Overview and Concepts)