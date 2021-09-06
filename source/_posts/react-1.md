---
title: React 
abbrlink: e064
date: 2021-08-22 16:05:45
categories: Framework
tags:
	- react
---

### 名詞
web component : Web Components is a suite of different technologies allowing you to create reusable custom elements
JSX : 是一個 JavaScript 的語法擴充, 允許我們在 JS 的檔案中使用 HTML 的標籤
Virtual DOM : 
Reconciliation : 找出哪些樹節點哪些需要變化

<!--more-->

### todolist simulate
``` html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
		integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
	<title>Document</title>
</head>

<body>
	<!-- ====== change todo and button to component ====== -->
	<!-- ====== add data dump ====== -->
	<!-- ====== render by data chang ====== -->
	<div class="container mt-2">
		<div class="card mx-auto" style="width: 30rem;">
			<div class="card-body">
				<h1>Simple Todo list</h1>
				<div class="mb-2">
						<button type="button" class="btn-dump btn btn-primary">Dump</button>
				</div>
				<div class="input-group mb-3">
					<input type="text" class="input-todo form-control" placeholder="你想要新增的事項"" aria-label=" Recipient's username"
						aria-describedby="button-addon2">
					<button class="btn-create btn btn-primary" type="button" id="button-addon2">新增</button>
				</div>
				<ul class="todos list-group">
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
	</script>
	<script>
		let id = 0
		let state = {
			todos: []
		}

		$('.btn-create').click(() => {
			const content = $('.input-todo').val()
			if (!content) return
			$('.input-todo').val('')
			state.todos.push(
				{
					id,
					content,
					isDone: false
				}
			)
			render()
			id++
		})

		$('.btn-dump').click(()=>{
			console.log(state)
		})

		$('.todos').on('click', '.btn-delete', (e) => {
				const id = Number($(e.target).parents('.todo').attr('data-id'))
				state.todos = state.todos.filter(todo => todo.id !==id)
				render()
		})

		$('.todos').on('click', '.btn-undone', (e) => {
			const id = Number($(e.target).parents('.todo').attr('data-id'))
			state.todos = state.todos.map(todo =>{
				if (todo.id !== id) return todo
				return {
					...todo,
					isDone: true
				}
			})
			render()
		})

		$('.todos').on('click', '.btn-done', (e) => {
			const id = Number($(e.target).parents('.todo').attr('data-id'))
			state.todos = state.todos.map(todo =>{
				if (todo.id !== id) return todo
				return {
					...todo,
					isDone: false
				}
			})
			render()
		})

		function Todo({id, content, isDone}) {
			return `
				<li class="todo list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
					<div class="content">${content}</div>
						<div class="control">
							${Button({
								className: isDone ? 'btn-done btn-outline-success' : 'btn-undone btn-outline-secondary',
								content: isDone ? '已完成' : '未完成'
							})}
							${Button({
								className: 'btn-delete btn btn-outline-danger',
								content: '刪除'
							})}
						</div>
					</li>
				</ul>		
		`
		}

		function Button(props) {
			return `
				<button type="button" class="btn ${props.className}">${props.content}</button>
			`
		}

		function render() {
			$('.todos').empty()
			$('.todos').append(
				state.todos.map(todo => Todo(todo))
			)
		}

	</script>
</body>

</html>
```

### 基礎
#### instal and start 
``` bash
# install 
npx create-react-app my-app
# check versionm 
npx create-react-app -V
	4.0.3
# run react
cd my-app
npm start
```

#### Strict Mode and measuring performance
``` js
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root");
ReactDOM.render(
	// strict mode 可移除
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

// measuring performance
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

#### 1st React - include Inline styling 
``` js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
	<App />,
  document.getElementById('root')
);
``` 

``` js
// App.js
// import css file
import './App.css';

// Creating a style object variable for Inline styling 
const titleStyle = {
	color: 'red',
	fontWeight: 'bold'
}

function Title({size}) {
	if (size === 'XL') {
		// Creating a style object variable for Inline styling 
		return <h1 style={titleStyle}>hello</h1>
	}
	else {
		// Inline styling
		return <h3 style={{
			color: 'blue'
		}}>hello</h3>
	}
}

function Description({children}) {
	return (
		<p>
			{children}
		</p>
	)
}

function App() {
  return (
		// class 改為 className
		<div className="App">
			{/* add function  */}
			{/* add parameter */}
			<Title size='L'></Title>
			{/* add some data to function, its name is children */}
			<Description>
				This is 1st react.
				welcome to here.
			</Description>
		</div>
  );
}

export default App;
```

``` css
/* App.css */
.App {
  text-align: center;
}
``` 

#### styled components
##### install
```bash
npm install styled-components
``` 

##### Example 1
+ styled-compoents 代替 function
+ 可以包下一層, set hover

``` js
// App.js
// import css file
import './App.css';
// import styled components
import styled from 'styled-components'

// Creating a style object variable for Inline styling 
const titleStyle = {
	color: 'red',
	fontWeight: 'bold'
}

// 可以包下一層, set hover
const TitleWrapper = styled.h2`
  display: flex;
  color: blue;
  
  &:hover {
    color: red;
  }

  span {
    color: yellow;
  }
`

function Title({size}) {
	if (size === 'XL') {
		// Creating a style object variable for Inline styling 
		return <h1 style={titleStyle}>hello</h1>
	}
	else {
		// Inline styling
		// return <h2 style={{
    //    dislay: 'flex';
    //   color: 'blue',
    // }}>hello</h2>
    return (
      <TitleWrapper>hello <span>yo</span> </TitleWrapper>
    )
	}
}

// styled components 代替 function 
const Description = styled.p`
  color: red;
  padding: 20px;
  border: 1px solid black;
`

// function Description({children}) {
// 	return (
// 		<p>
// 			{children}
// 		</p>
// 	)
// }

function App() {
  const titleSize = 'M';
  return (
		// class 改為 className
		<div className="App">
			{/* add function  */}
			{/* add parameter */}
			<Title size={titleSize}></Title>
			{/* add some data to function, its name is children */}
			<Description>
				This is 1st react.
				welcome to here.
			</Description>
		</div>
  );
}

export default App;
```

##### Example 2
+ & + & (相連之 component)
+ 傳入props
+ TodoItem 移出成為一個 component

``` js
// App.js
// import css file
import './App.css';
import styled from 'styled-components';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
	color: rgb(2,40,77);
	// 可依傳入之 props 做不同設定
  // font-size: ${props => props.size === 'XL' ? '20px' : '12px'}
  font-size: 12px;

	// 可依傳入之 props 重新設定
  ${props => props.size ==='XL' && `
    font-size: 20px;
  `}
`

const TodoButtonWrapper= styled.div``

const Button = styled.button`
  padding: 4px;
  color: black;

  &:hover {
    color: red;
  }

	// 相連之 component
  & + & {
    margin-left: 10px;
  }
`

function TodoItem({ size, content}) {
  return (
      <TodoItemWrapper>
        <TodoContent size={size}>{content}</TodoContent>
        <TodoButtonWrapper>
          <Button>已完成</Button>
          <Button>刪除</Button>
        </TodoButtonWrapper>
      </TodoItemWrapper>
  )
}

function App() {
  return (
		<div className="App">
			{/* TodoItem 移出成為一個 component */}
      <TodoItem content="123"></TodoItem>
      <TodoItem content="456" size="XL"></TodoItem>
		</div>
  );
}

// function App() {
//   return (
// 		<div className="App">
//       <TodoItemWrapper>
//         <TodoContent size='XL'>I am todo</TodoContent>
//         <TodoButtonWrapper>
//           <Button>已完成</Button>
//           <Button>刪除</Button>
//         </TodoButtonWrapper>
//       </TodoItemWrapper>
// 		</div>
//   );
// }

export default App;
```

##### Example 3
+ media query
+ re-styled
+ theme
+ TodoItem component 另存一個 file

###### index.js 
``` js
// index.js 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from 'styled-components'

const theme = {
	colors: {
		primary_300: '#ff7979',
		primary_400: '#e33e3e',
		primary_500: '#af0505'
	}
}

ReactDOM.render(
	// theme傳入
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
	,
	document.getElementById('root')
);
```

###### App.js
``` js
// App.js
// import css file
import './App.css';
import styled from 'styled-components';
import TodoItem from './TodoItem'

// 對原本存在 function,再做 re-styled
const BlackTodoItem = styled(TodoItem)`
  background: black;
`

function App() {
  return (
		<div className="App">
      <TodoItem content="123"/>
			<TodoItem content="456" size="XL"/>
      <BlackTodoItem content="456" size="XL"/>
		</div>
  );
}
export default App;
```

###### ./constants/style.js
``` js
/* ./constants/style.js */
export const MEDIA_QUERY_MD = '@media screen and (min-width: 768px)'
export const MEDIA_QUERY_LG = '@media screen and (min-width: 1000px)'
```

###### TodoItem.js
``` js
// TodoItem.js
import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG} from './constants/style'

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
// 取用 theme
	color: ${props => props.theme.colors.primary_300};
	
  font-size: ${props => props.size === 'XL' ? '20px' : '12px'};
`

const TodoButtonWrapper= styled.div``

const Button = styled.button`
  padding: 4px;
  color: black;

	// ***** media change *****
	// @media screen and (min-width: 768px) {
	// 	font-size: 16px;
	// }
	${MEDIA_QUERY_MD} {
		font-size: 16px;
	}

	${MEDIA_QUERY_LG} {
		font-size: 20px;
	}

  &:hover {
    color: red;
  }

	// 相連之 component
  & + & {
    margin-left: 10px;
  }
`

// 對原本存在styled-component,再做 re-styled
export const RedButton = styled(Button)`
  color: red;
`

// for other import
// 因為 function re-style, 增加 class 
export default function TodoItem({ className, size, content}) {
  return (
      <TodoItemWrapper className={className}>
        <TodoContent size={size}>{content}</TodoContent>
        <TodoButtonWrapper>
          <Button>已完成</Button>
          <RedButton>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
  )
}
```

#### JSX to react by Babel example
+ JSX Prevents Injection Attacks
+ dangerouslySetInnerHTML
+ tag a run javascript: add encode URI
```  js
	{/* javascript:alert(1) */}
  {/* <a href={todo.content}>click me</a> */}
  <a href={window.encodeURIComponent(todo.content)}>click me</a>
```

``` js
<button size="XL">hello!</button>

"use strict";
/*#__PURE__*/
React.createElement("button", {
  size: "XL"
}, "hello!");
```

``` js
<button size="XL" onClick={()=>{
  alert(1)}}>hello!</button>

"use strict";
/*#__PURE__*/
React.createElement("button", {
  size: "XL",
  onClick: () => {
    alert(1);
  }
}, "hello!");
```

``` js 
<button size="XL" onClick={()=>{
  alert(1)}}><div>hello!</div></button>

"use strict";
/*#__PURE__*/
React.createElement("button", {
  size: "XL",
  onClick: () => {
    alert(1);
  }
}, /*#__PURE__*/React.createElement("div", null, "hello!"));
```

#### State

##### example 1
+ state init : const [counter, setCounter] = React.useState(0); 
+ state ange : setCounter(counter + 1)
+ ui upadte : counter: {counter}

``` js
// App.js
// import css file
import './App.css';
import styled from 'styled-components';
import TodoItem from './TodoItem'
import { Hook } from 'tapable';
// for State
import React from 'react';

// 對原本存在 function,再做 re-styled
const BlackTodoItem = styled(TodoItem)`
  background: black;
`

// Hook
// function comment
// class comment

function App() {
	// for State
	const [counter, setCounter] = React.useState(0);
	console.log('render', counter)

	// function HandleButtonClick() {}
	const HandleButtonClick = () =>{
		console.log('button click')
		setCounter(counter + 1)
	}

  return (
		<div className="App">
			{/* for State */}
			<div>counter: {counter}</div>
			<button onClick={HandleButtonClick}>increment</button>
      <TodoItem content="123"/>
			<TodoItem content="456" size="XL"/>
		</div>
  );
}
export default App;
```

##### example 2 - todos
+ key
+ setTodos for array
+ todos.map

``` js
// App.js
// import css file
import './App.css';
import TodoItem from './TodoItem'
// for State
import { useState } from 'react';

function App() {
	// immutable 不可變的
	const [todos, setTodos] = useState([
		1
	]);

	const handleTodosClick = () =>{
		setTodos([Math.random(), ...todos])
	}

  return (
		<div className="App">
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map((todo, index) => <TodoItem key={index} content={todo} />)}
		</div>
  );
}
export default App;
```

##### example 3 - todos add item
+ controlled component
+ uncontrolled component #1
+ uncontrolled component #2 (Ref)
+ todo change to object


###### App.js
``` js
// App.js
// import css file
import './App.css';
import TodoItem from './TodoItem'
// for State
import { useState } from 'react';
// uncontrolled component #2 -> ref
// import { useState, useRef } from 'react';

let id =2 ;
function App() {
	// immutable 不可變的
	const [todos, setTodos] = useState([
		{
			id: 1,
			content: 'abc'
		}
	]);
	// add value
	const [value, setValue] = useState('')
	// uncontrolled component #2 -> ref
	// const inputRef = useRef()

	const handleTodosClick = () =>{
		// uncontrolled component #1 -> get value
		// document.querySelector('.input-todo').value
		// uncontrolled component #2 -> ref
		// console.log(inputRef.current.value)
		// set input value 
		setTodos([{
			id,
			content: value
		}, ...todos])
		setValue('')
		id++
	}

	const handleInputChange = (e) => {
		// console.log(e.target.value)
		// controlled component
		setValue(e.target.value)
	}

  return (
		<div className="App">
			{/* controlled component */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			{/* uncontrolled component #1 -> get value */}
			{/* <input className="input-todo" type="text" placeholder="todo"/> */}
			{/* uncontrolled component #2 -> ref */}
			{/* <input ref={inputRef} type="text" placeholder="todo"/> */}
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
		</div>
  );
}
export default App;
```

###### TodoItem.js
``` js
// TodoItem.js
import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG} from './constants/style'
// react direct
import React from 'react';


const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
// 取用 theme
	color: ${props => props.theme.colors.primary_300};
	
  font-size: ${props => props.size === 'XL' ? '20px' : '12px'};
`

const TodoButtonWrapper= styled.div``

const Button = styled.button`
  padding: 4px;
  color: black;

	// ***** media change *****
	// @media screen and (min-width: 768px) {
	// 	font-size: 16px;
	// }
	${MEDIA_QUERY_MD} {
		font-size: 16px;
	}

	${MEDIA_QUERY_LG} {
		font-size: 20px;
	}

  &:hover {
    color: red;
  }

	// 相連之 component
  & + & {
    margin-left: 10px;
  }
`

// 對原本存在styled-component,再做 re-styled
export const RedButton = styled(Button)`
  color: red;
`

// for other import
// 因為 function re-style, 增加 class 
export default function TodoItem({ className, size, todo}) {
  return (
       <TodoItemWrapper className={className} data-tddo-id={todo.id} >
        <TodoContent size={size}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <Button>已完成</Button>
          <RedButton>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
  )
}
```

##### example 4 - todos delete
+ todo delete

###### App.js
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
import { useState } from 'react';

let id =2 ;
function App() {
	const [todos, setTodos] = useState([
		{
			id: 1,
			content: 'abc'
		}
	]);
	// add value
	const [value, setValue] = useState('')


	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id,
			content: value
		}, ...todos])
		setValue('')
		id++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} />)}
		</div>
  );
}
export default App;
```

###### TodoItem.js
``` js
// TodoItem.js
import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG} from './constants/style'
// react direct
import React from 'react';


const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
// 取用 theme
	color: ${props => props.theme.colors.primary_300};
	
  font-size: ${props => props.size === 'XL' ? '20px' : '12px'};
`

const TodoButtonWrapper= styled.div``

const Button = styled.button`
  padding: 4px;
  color: black;

	${MEDIA_QUERY_MD} {
		font-size: 16px;
	}

	${MEDIA_QUERY_LG} {
		font-size: 20px;
	}

  &:hover {
    color: red;
  }

	// 相連之 component
  & + & {
    margin-left: 10px;
  }
`

export const RedButton = styled(Button)`
  color: red;
`

// for other import
// 因為 function re-style, 增加 class 
export default function TodoItem({ className, size, todo, handleDeleteTodo}) {
  return (
       <TodoItemWrapper className={className} data-tddo-id={todo.id} >
        <TodoContent size={size}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          <Button>已完成</Button>
          {/* todo delete */}
          <RedButton onClick={() => {
            handleDeleteTodo(todo.id)
          }}>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
  )
}
```

##### example 5 - todos change state
+ todo change state

###### App.js
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// import { useState } from 'react';
// use ref
import { useState, useRef } from 'react';

let id =3 ;
function App() {
	const [todos, setTodos] = useState([
		// todo change state
		{	id: 1, content: 'abc', isDone: true},
		{	id: 2, content: 'xxx', isDone: false},
	]);
	// add value
	const [value, setValue] = useState('')
	// use ref
	const id = useRef(3)


	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// use ref
		id.current++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

###### TodoItem.js
``` js
// TodoItem.js
import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_LG} from './constants/style'
// react direct
import React from 'react';


const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 1px solid black;

  & + & {
    margin-top: 12px;
  }
`

const TodoContent = styled.div`
// 取用 theme
	color: ${props => props.theme.colors.primary_300};
	
  font-size: ${props => props.size === 'XL' ? '20px' : '12px'};

  // todo change state
  // props.isDone show text-decoration: line-through;
  ${props => props.isDone && `
    text-decoration: line-through;
  `}
`

const TodoButtonWrapper= styled.div``

const Button = styled.button`
  padding: 4px;
  color: black;

	${MEDIA_QUERY_MD} {
		font-size: 16px;
	}

	${MEDIA_QUERY_LG} {
		font-size: 20px;
	}

  &:hover {
    color: red;
  }

	// 相連之 component
  & + & {
    margin-left: 10px;
  }
`

export const RedButton = styled(Button)`
  color: red;
`

// for other import
// 因為 function re-style, 增加 class 
export default function TodoItem({ className, size, todo, handleDeleteTodo, handleToggleIsDone}) {
  //  todo change state
  const handleToggleClick = () => {
    handleToggleIsDone(todo.id)
  }
  // todo delete
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id)
  }

  return (
      <TodoItemWrapper className={className} data-tddo-id={todo.id} >
        {/* todo change state */}
        <TodoContent isDone={todo.isDone} size={size}>{todo.content}</TodoContent>
        <TodoButtonWrapper>
          {/* todo change state */}
          <Button onClick={handleToggleClick}>
            {/* { todo.isDone ? '已完成' : '未完成'} */}
            {/* todo.isDone 顯示已完成  */}
            { todo.isDone && '已完成'}
            { !todo.isDone && '未完成'}

          </Button>
          {/* todo delete */}
          <RedButton onClick={handleDeleteClick}>刪除</RedButton>
        </TodoButtonWrapper>
      </TodoItemWrapper>
  )
}
```

#### useEffect
+ render 後,你想做什麼

##### exampl 1 - add useEffect
``` js
	// add useEffect-1 
	import { useState, useRef, useEffect } from 'react';

	// add useEffect-1
	useEffect( () => {
		console.log("after render!")
	});
```

##### exampl 2 - run useEffect when todos change
``` js
	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	// add useEffect - after render --> when todos change -2
	useEffect( () => {
		writeTodosToLocalStorage(todos);
		console.log(JSON.stringify(todos));
	}, [todos]);
```

##### exampl 3 - run useEffect 1st render
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// import { useState } from 'react';
// use ref
// add useEffect-1 
import { useState, useRef, useEffect } from 'react';

// let id =3 ;
let isInit = true ;
function App() {
	const [todos, setTodos] = useState([
		// todo change state
		{	id: 1, content: 'abc', isDone: true},
		{	id: 2, content: 'xxx', isDone: false},
	]);
	// add value
	const [value, setValue] = useState('')
	// use ref
	const id = useRef(3)
	
	// add useEffect-1
	// useEffect( () => {
	// 	console.log("after render!")
	// });

	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	// add useEffect - after render --> when todos change -2
	useEffect( () => {
		// 1st load do not save to local storage
		if (!isInit) {
			writeTodosToLocalStorage(todos);
		}
		console.log('todos change :',JSON.stringify(todos));
	}, [todos]);

	// add useEffect - after render --> just 1st time render -3
	useEffect( () => {
		// alert(1);
		// load from localStorage - 3
		const todoData = window.localStorage.getItem("todos") || "";
		if (todoData) {
			// writeTodosToLocalStorage(todos);
			// console.log(JSON.stringify(todos));
			console.log("1st :", todoData)
			isInit = false;
			// count correct id
			JSON.parse(todoData).map(　todo =>　id.current = (todo.id >= id.current) ?  todo.id + 1 :　id.current );
			setTodos(JSON.parse(todoData));
		}
	}, []);

	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// save to localStorage after update-1+
		// writeTodosToLocalStorage([{
		// 	id: id.current,
		// 	content: value,
		// 	isDone: false
		// }, ...todos]);
		// use ref
		id.current++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

##### exampl 4 -  set local storage to init todos 
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// add useEffect
import { useState, useRef, useEffect} from 'react';

function App() {
	const todoData = window.localStorage.getItem("todos") || "";
	// set local storage to init todos 
	const [todos, setTodos] = useState(JSON.parse(todoData));
	// add value
	const [value, setValue] = useState('')
	// use ref
	const id = useRef(3)
	// count correct id
	JSON.parse(todoData).map(　todo =>　id.current = (todo.id >= id.current) ?  todo.id + 1 :　id.current );

	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	useEffect( () => {
		writeTodosToLocalStorage(todos);
		console.log('todos change :',JSON.stringify(todos));
	}, [todos]);

	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// use ref
		id.current++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

##### exampl 5 -  clear up LayoutEffects 
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// add useEffect
import { useState, useRef, useEffect} from 'react';

function App() {
	......

	useEffect( () => {
		console.log('run 1st render!');

		// clear up LayoutEffects
		// unmount
		return () =>{
			console.log('unmount!');
		}
	}, []);

	useEffect( () => {
		writeTodosToLocalStorage(todos);
		console.log('useEffect todos :',JSON.stringify(todos));

		// clear up LayoutEffects
		// 下一次 render 前執行,內容與前次render相同
		// 可應用於 user disconnect
		return () =>{
			console.log('clearEffect todos :',JSON.stringify(todos));
		}
	}, [todos]);

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

#### 改寫成自己的 hook
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// useTodos hook
import useTodos from './useTodos';

function App() {
	const {
		todos,
		handleTodosClick,
		handleToggleIsDone,
		handleDeleteTodo,
		value,
		handleChange
	} = useTodos()

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

``` js
// useInput.js
import { useState } from 'react';

export default function useInput() {
	// add value
	const [value, setValue] = useState('');
	const handleChange = e => {
			setValue(e.target.value)
	}

	return {
		value, 
		setValue, 
		handleChange
	}
}
```

``` js
// useTodos.js
import { useState, useRef, useEffect } from 'react';
import useInput from './useInput';

export default function useTodos() {
	// use ref
	const id = useRef(1);

	// set local storage to init todos 
	const [todos, setTodos] = useState( () => {
		console.log('init');
		let todoData = window.localStorage.getItem("todos") || "";
		if(todoData) {
			todoData = JSON.parse(todoData);
			id.current = todoData[0].id + 1;
		}
		else {
			todoData = [] ;

		}
		return todoData;
	});

	const {value, setValue, handleChange } = useInput()

	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	useEffect( () => {
		console.log('run 1st render!');

		// clear up LayoutEffects
		// unmount
		return () =>{
			console.log('unmount!');
		}
	}, []);

	useEffect( () => {
		writeTodosToLocalStorage(todos);
		console.log('useEffect todos :',JSON.stringify(todos));

		// clear up LayoutEffects
		return () =>{
			console.log('clearEffect todos :',JSON.stringify(todos));
		}
	}, [todos]);

	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// use ref
		id.current++
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

	return {
		todos,
		handleTodosClick,
		handleToggleIsDone,
		handleDeleteTodo,
		value,
		setValue,
		handleChange
	}
}
```

#### lazy initializer - just run 1st time
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// add useEffect
import { useState, useRef, useEffect} from 'react';

function App() {
	// use ref
	const id = useRef(1);
	// set local storage to init todos 
	// lazy initializer - just run 1st time
	const [todos, setTodos] = useState( () => {
		console.log('init');
		let todoData = window.localStorage.getItem("todos") || "";
		if(todoData) {
			todoData = JSON.parse(todoData);
			id.current = todoData[0].id + 1;
		}
		else {
			todoData = [] ;

		}
		return todoData;
	});
	// add value
	const [value, setValue] = useState('');

	// count correct id
	todos.map(　todo =>　id.current = (todo.id >= id.current) ?  todo.id + 1 :　id.current );

	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	useEffect( () => {
		writeTodosToLocalStorage(todos);
		console.log('todos change :',JSON.stringify(todos));
	}, [todos]);

	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// use ref
		id.current++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```

#### useLayoutEffect
+ render 前你想做什麼

##### exampl 1
``` js
// App.js
import './App.css';
import TodoItem from './TodoItem'
// import { useState } from 'react';
// use ref
// add useEffect-1 
// add useLayoutEffect
import { useState, useRef, useEffect, useLayoutEffect } from 'react';

// let id =3 ;
let isInit = true ;
function App() {
	const [todos, setTodos] = useState([
		// todo change state
		{	id: 1, content: 'abc', isDone: true},
		{	id: 2, content: 'xxx', isDone: false},
	]);
	// add value
	const [value, setValue] = useState('')
	// use ref
	const id = useRef(3)
	
	// add useEffect-1
	// useEffect( () => {
	// 	console.log("after render!")
	// });

	// save to localStorage after update-1+
	function writeTodosToLocalStorage(todos) {
		window.localStorage.setItem("todos", JSON.stringify(todos));
	}

	// add useEffect - after render --> when todos change -2
	useEffect( () => {
		// 1st load do not save to local storage
		if (!isInit) {
			writeTodosToLocalStorage(todos);
		}
		console.log('todos change :',JSON.stringify(todos));
	}, [todos]);

	// add useEffect - after render --> just 1st time render -3
	// add useLayoutEffect
	useLayoutEffect( () => {
		// alert(1);
		// load from localStorage - 3
		const todoData = window.localStorage.getItem("todos") || "";
		if (todoData) {
			// writeTodosToLocalStorage(todos);
			// console.log(JSON.stringify(todos));
			console.log("1st :", todoData)
			isInit = false;
			// count correct id
			JSON.parse(todoData).map(　todo =>　id.current = (todo.id >= id.current) ?  todo.id + 1 :　id.current );
			setTodos(JSON.parse(todoData));
		}
	}, []);

	const handleTodosClick = () =>{
		// set input value 
		setTodos([{
			id: id.current,
			content: value,
			isDone: false
		}, ...todos])
		setValue('')
		// save to localStorage after update-1+
		// writeTodosToLocalStorage([{
		// 	id: id.current,
		// 	content: value,
		// 	isDone: false
		// }, ...todos]);
		// use ref
		id.current++
	}

	const handleInputChange = (e) => {
		setValue(e.target.value)
	}

	// todo delete
	const handleDeleteTodo = id => {
		setTodos(todos.filter(todo => todo.id !== id ))
	}

	// todo change state
	const handleToggleIsDone = id => {
		setTodos(todos.map(todo => {
			if (todo.id !== id) return todo
			return {
				...todo,
				isDone: !todo.isDone
			}
		}))
	}

  return (
		<div className="App">
			{/* todo delete */}
			<input type="text" placeholder="todo" value={value} onChange={handleInputChange} />
			<button onClick={handleTodosClick}>add todo</button>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} handleDeleteTodo={handleDeleteTodo} handleToggleIsDone={handleToggleIsDone} />)}
		</div>
  );
}
export default App;
```



#### prettier ESLint

+ vscode extensions
Eslint and Prettier — Code formatter and install it.

``` bash
# install react demo
npx create-react-app demo
# install eslint 
npm install eslint --save-dev
npx eslint --init
D:\work\git\li\react\demo>npx eslint --init
	√ How would you like to use ESLint? · problems
	√ What type of modules does your project use? · esm
	√ Which framework does your project use? · react
	√ Does your project use TypeScript? · No / Yes
	√ Where does your code run? · browser
	√ What format do you want your config file to be in? · JSON
``` 

``` js
# 雙引號
/* eslint jsx-quotes: ["error", "prefer-double"] */
# 定要有分號
/* eslint semi: ["error", "always"] */
# function 與 () 不要有空格
/* eslint space-before-function-paren: ["error", "never"] */
``` 



### git wait check

``` bash
# undo 1st commit - not lose data
git update-ref -d HEAD
# undo 1 commit - not lose data
git reset --soft HEAD~1
# undo 1 commit by windows - not lose data
git reset --soft "HEAD~1"
```

### 參考資料
+ [styled components](https://styled-components.com/docs/basics)
+ [tagged template](https://pjchender.blogspot.com/2017/01/javascript-es6-template-literalstagged.html)
+	[Babel is a JavaScript compiler](https://babeljs.io)
+ [Prettier](https://prettier.io/)
+ [React Setting Up Your Editor](https://create-react-app.dev/docs/setting-up-your-editor)
+ [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
+ [dangerouslySetInnerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
+ [hook-flow](https://github.com/donavon/hook-flow)
+ [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
+ [useLocalStorage](https://usehooks.com/useLocalStorage/)
+ [從頭打造一個簡單的 Virtual DOM](https://blog.techbridge.cc/2019/02/04/vdom-from-scratch/)
+ [為了瞭解原理，那就來實作一個簡易 Virtual DOM 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/build-a-simple-virtual-dom-5cf12ccf379f)