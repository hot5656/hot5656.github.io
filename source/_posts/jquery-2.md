---
title: jQuery 練習
abbrlink: 19f6
date: 2021-07-01 13:24:46
categories: Coding
tags:
	- jquery
---

### todo list

<!--more-->

``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="#"/>
	<title>Todo list</title>
	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
	<style>
		.todo-input {
			padding: 5px;
		}
		.todo-text {
			padding: 5px;
			display: inline-block;
			width: 200px;
		}
	</style>
	<script>
			$(document).ready(() =>{
				// add todo
				$('.todo-add').click(() => {
					let value = $('.todo-input').val()
					if (value !== '') {
						$('.todo-input').val('')
						$('.todos').append(`
							<div>
								<div class="todo-text">${value}</div>
								<button class="btn-mark">標記完成</button>
								<button class="btn-delete">刪除</button>
							</div>
						`)
					}
				})
				// remove all todos
				$('.todo-remove-all').click(() =>{
					$('.todos').empty()
				})

				// .todos 代理 .btn-delet
				$('.todos').on('click', '.btn-delete', (e) =>{
						$(e.target).parent().remove()
				})
				// .todos 代理 .btn-mark
				$('.todos').on('click', '.btn-mark', (e) =>{
					let todo = $(e.target).parent()
					if (todo.hasClass('complete')) {
						todo.removeClass('complete')
						todo.css('color', 'black')
						$(e.target).text('標記完成')
					} 
					else {
						todo.addClass('complete')
						todo.css('color', 'red')
						$(e.target).text('標記未完成')
					}
				})
			})
	</script>
</head>
<body>
	<input type="text" class="todo-input">
	<button class="todo-add">Add todo</button>
	<button class="todo-remove-all">Remove all todos</button>
	<div class="todos">
	</div>
</body>
</html>
``` 

### ajax - query country
``` html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="#"/>
	<title>Ajax country</title>
	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
	<div>
		Name : 
		<input type="text" class="country">
		<button class="btn-country">送出</button>
		<div class="countries"></div>
	</div>

	<script>
		$('.btn-country').click(() =>{
			let countries = $('.countries')
			// clear old country 
			countries.empty()
			if ($('.country').val() === '') {
				alert('請輸入名稱')
				return
			}

			$.ajax({
				type: 'GET',
				url: 'https://restcountries.eu/rest/v2/name/' + $('.country').val() ,
				success: function(resp) {
					for(let i=0 ; i<resp.length ; i++ ) {
						countries.append(`
							<div>
									${resp[i].alpha3Code}
									${resp[i].nativeName}
							</div>
						`)
					}
				},
				error: function(e) {
					console.log(e.responseJSON)
				}
			})
			// clear input 
			$('.country').val('')
		})
	</script>
</body>
</html>
```