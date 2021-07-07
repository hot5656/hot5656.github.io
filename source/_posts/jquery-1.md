---
title: jQuery 說明
abbrlink: 18b6
date: 2021-07-01 08:57:29
categories: Coding
tags: 
	- jquery
---


### 基本

#### load and check 
`var $ = jQuery`
``` js
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="#"/>
	<title>Document</title>
	<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>
<body>
	<script>
		console.log(jQuery)
	</script>	
</body>
</html>
```

<!--more-->

### event
#### document
##### document ready
``` js
$( document ).ready(function() {
  // Handler for .ready() called.
});
```

#### Mouse Events
##### 代理
``` html
	<script>
			$(document).ready(() =>{
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
<body>
	<input type="text" class="todo-input">
	<button class="todo-add">Add todo</button>
	<div class="todos">
	</div>
</body>
</html>
```

##### 代理2
``` js
$('.todos').mousedown(function(e) {
	element = $(e.target)
	// change checkbox
	if (element.hasClass("checkbox")) {
		element.parent().find('del').toggleClass('text-decoration-none')
	}
	// remove 1 todo
	if (element.hasClass("todo-del")) {
		element.parent().remove()
		showLeftItems()
	}
})

// double click
$('.todos').dblclick(function(e){
	console.log('dblclick')
	// modify todo
	if (element.hasClass("todo-text")) {
		let totoText = element.text()
		element.parent().append(`
					<input class="todo-edit" type="text" value=${totoText}>
		`)
		element.addClass('d-none')
	}						
})

// checkbox change 
$(document).on('change', '.checkbox', function(e) {
	element = $(e.target)
	if(this.checked) {
		element.parent().find('del').removeClass('text-decoration-none')
		element.attr('checked', 'checked')
		console.log('checked', e.target)
	}
	else {
		element.parent().find('del').addClass('text-decoration-none')
		element.removeAttr('checked')
		console.log('no checked', e.target)
	}
});
```

##### click
``` js
$( "#target" ).click(function() {
  alert( "Handler for .click() called." );
});
```

##### submit 
``` js
$('.form-add-comment').submit((e) => {
	e.preventDefault()
	......
})
```

##### mouseout 
當鼠標指針離開被選元素時，會發生mouseout 事件
``` js
$('.todos').mouseout(function(e) {
	element = $(e.target)
	if (element.hasClass("checkbox")) {
		showLeftItems()
	}
})
```

##### mousedown
``` js
$('.todos').mousedown(function(e) {
	element = $(e.target)
	// change checkbox
	if (element.hasClass("checkbox")) {
		element.parent().find('del').toggleClass('text-decoration-none')
	}
	// remove 1 todo
	if (element.hasClass("todo-del")) {
		element.parent().remove()
		showLeftItems()
	}
})
```

##### dblclick
``` js
// double click
$('.todos').dblclick(function(e){
	console.log('dblclick')
	// modify todo
	if (element.hasClass("todo-text")) {
		let totoText = element.text()
		element.parent().append(`
					<input class="todo-edit" type="text" value=${totoText}>
		`)
		element.addClass('d-none')
	}						
})
```

##### checkbox change
``` js
$(document).on('change', '.checkbox', function(e) {
	element = $(e.target)
	if(this.checked) {
		element.parent().find('del').removeClass('text-decoration-none')
		element.attr('checked', 'checked')
		console.log('checked', e.target)
	}
	else {
		element.parent().find('del').addClass('text-decoration-none')
		element.removeAttr('checked')
		console.log('no checked', e.target)
	}
});
```

#### keyboard Events
##### keypress()
``` js
$('.todo-add').keypress((e) => {
	item = $('.todo-add').val().trim()
	if (e.which == 13 && item != '')  {
		......
	}
})
```


### ajax
#### ajax GET
``` js
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
```

#### ajax POST
``` js
$.ajax({
  method: "POST",
  url: "some.php",
  data: { name: "John", location: "Boston" }
})
```

### manipulation
#### set/get element text
``` js
// get text
console.log($('.box').text())
// set text
$('.box').text('press button!')
```

#### remove()/empty()

#### prepend()/append()
``` js
// 在最前面加入內容
$( ".inner" ).prepend( "<p>Test</p>" );
// 在最後加入內容
$('.todos').append(`
	<div>
		<div class="todo-text">${value}</div>
		<button class="btn-mark">標記完成</button>
		<button class="btn-delete">刪除</button>
	</div>
`)
```

#### attr()/removeAttr('checked')
``` js
// example 1 
if (checkbox.is(':checked')){
	checkbox.attr('checked', 'checked')
}
else {
	checkbox.removeAttr('checked')
}
// example 2
$('.options').on('click', 'div', e => {
  const target = $(e.target)
  const filter = target.attr('data-filter')
  $('.options div.active').removeClass('active')
  target.addClass('active')
  if (filter === 'all') {
    $('.todo').show()
  } else if (filter === 'uncomplete') {
    $('.todo').show()
    $('.todo.checked').hide()
  } else { // done
    $('.todo').hide()
    $('.todo.checked').show()
  }
})
```


### Traversing
#### each()
``` js
let todosItem = $('.todos .list-group-item')
todosItem.each( (i,el) => {
	checkbox = $(el).find('.checkbox')
	if (!checkbox.is(':checked')){
		activeItems++
	}
})
```

#### find()
``` js
$( "li.item-ii" ).find( "li" ).css( "background-color", "red" );
// find 1
var item1 = $( "li.item-1" )[ 0 ];
$( "li.item-ii" ).find( item1 ).css( "background-color", "red" );
```

#### filter()
``` js
// apply this method to the set of list items
$( "li" ).filter( ":nth-child(2n)" ).css( "background-color", "red" );
// filter by index condition
$( "li" )
  .filter(function( index ) {
    return index % 3 === 2;
  })
    .css( "background-color", "red" );
```

### form
#### check checked
``` js
checkbox = $(el).find('.checkbox')
if (!checkbox.is(':checked')){
	activeItems++
}
``` 

#### set/remove checked
``` js
let todosItem = $('.todos .list-group-item')
todosItem.each( (i,el) => {
	checkbox = $(el).find('.checkbox')
	if (checkbox.is(':checked')){
		checkbox.attr('checked', 'checked')
	}
	else {
		checkbox.removeAttr('checked')
	}
})
```

### css()
```
// get css
var color = $( this ).css( "background-color" );
// set css
todo.css('color', 'black')
```

#### Class Attribute
``` JS
.addClass()
.hasClass()
.removeClass()
.toggleClass()
```


#### set/get input value
``` html
<!- get value->
	<script>
		// Get the value from the selected option in a dropdown
		$( "select#foo option:checked" ).val();
		// Get the value from a dropdown select directly
		$( "select#foo" ).val();
		// Get the value from a checked checkbox
		$( "input[type=checkbox][name=bar]:checked" ).val();
		// Get the value from a set of radio buttons
		$( "input[type=radio][name=baz]:checked" ).val();
	<script>

<!- set value->
	<select id="single">
		<option>Single</option>
		<option>Single2</option>
	</select>
	
	<select id="multiple" multiple="multiple">
		<option selected="selected">Multiple</option>
		<option>Multiple2</option>
		<option selected="selected">Multiple3</option>
	</select>
	
	<br>
	<input type="checkbox" name="checkboxname" value="check1"> check1
	<input type="checkbox" name="checkboxname" value="check2"> check2
	<input type="radio" name="r" value="radio1"> radio1
	<input type="radio" name="r" value="radio2"> radio2
	
	<script>
	$( "#single" ).val( "Single2" );
	$( "#multiple" ).val([ "Multiple2", "Multiple3" ]);
	$( "input").val([ "check1", "check2", "radio1" ]);
	</script>
```



### effect 
#### hide()/show()
``` js
let isOn = true
$('.btn').click(() =>{
	if (isOn) {
		$('.box').hide()
	}
	else {
		$('.box').show()
	}
	isOn = !isOn
})
```

#### fadeIn()/fadeOut()
``` js
let isOn = true
$('.btn').click(() =>{
	if (isOn) {
		// $('.box').fadeOut()
		$('.box').fadeOut(2000)
	}
	else {
		// $('.box').fadeIn()
		$('.box').fadeIn(2000)
	}
	isOn = !isOn
})
```

### Traversing

#### parents
``` js
$(e.target).parent()
```




