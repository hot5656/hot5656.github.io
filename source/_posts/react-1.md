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
```bash
npm install styled-components
``` 

### 參考資料
+ [styled components](https://styled-components.com/docs/basics)