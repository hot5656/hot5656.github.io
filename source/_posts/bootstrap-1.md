---
title: Bootstrap 4
abbrlink: c99b
date: 2021-12-13 08:48:21
categories: Front End
tags:
	- bootstrap
---

### [Layout](/bootstrap-1/layout)
#### Container

|	|Extra small | Small|Medium|Large|Extra l|
|--------------|-------|------|-------|-------|------|
| |<576px	|≥576px|≥768px|≥992px|≥1200px|
|.container	      | 100%	|540px |720px	|960px	|1140px|
|.container-sm	  | 100%	|540px |720px	|960px	|1140px|
|.container-md	  | 100%	|100%	 |720px	|960px	|1140px|
|.container-lg	  | 100%	|100%	 |100%	|960px	|1140px|
|.container-xl	  | 100%	|100%	 |100%	|100% 	|1140px|
|.container-fluid	| 100%	|100%	 |100%	|100%	  |100%  |

<!--more-->

#### Grid options
|	|Extra small | Small|Medium|Large|Extra l|
|--------------|-------|------|-------|-------|------|
| |<576px	|≥576px|≥768px|≥992px|≥1200px|
|Max container width|	None (auto)	|540px	  |720px	  |960px	  |1140px  |
|Class prefix	      |.col-	      |.col-sm-	|.col-md-	|.col-lg-	|.col-xl-|

ps : Gutter width	30px (15px on each side of a column)

#### [Grid system](/bootstrap-1/grid)
+ container, container-fluid
+ row, no-gutters
+ col-xx, col-sm-xx, clo-md-xx, col-lg-xx, col-xl-xx
+ col, col-auto, col-1, col-2 ... col-12
+ order-first, order-last, order-1, order-2 >>> order-12
+ row-cols-2,  row-cols-*
+ offset-3, offset-*


+ justify-content-xx
	+ justify-content-start
	+ justify-content-end
	+ justify-content-center
	+ justify-content-between
	+ justify-content-around
	+ justify-content-sm-start
	+ justify-content-sm-end
	+ justify-content-sm-center
	+ justify-content-sm-between
	+ justify-content-sm-around
+ align-items-xx
	+ align-items-start
	+ align-items-end
	+ align-items-center
	+ align-items-baseline
	+ align-items-stretch
+  align-self-xx
	+ align-self-start
	+ align-self-end
	+ align-self-center
	+ align-self-baseline
	+ align-self-stretch
+ align-content.
	+ align-content-start
	+ align-content-end
	+ align-content-center
	+ align-content-around
	+ align-content-stretch

+ d-flex
+ d-inline-flex
+ flex-direction
	+ flex-row
	+ flex-row-reverse
	+ flex-column
	+ flex-column-reverse
+ flex-fill
+ flex grow, shrink
	+ flex-grow-0
	+ flex-grow-1
	+ flex-shrink-0
	+ flex-shrink-1
+ flex wrap
	+ flex-nowrap
	+ flex-wrap
	+ flex-wrap-reverse

##### Simple example
``` html
		<!-- container -->
		<!-- @media (min-width: 576px)
		.container, .container-sm {
				max-width: 540px;
		} -->
		<div class="container bg-secondary text-light">
			<!-- .row {
				display: flex;
				flex-wrap: wrap;
				margin-right: -15px;
				margin-left: -15px;
			} -->
			<div class="row mb-2">
				<!-- 3 columns -->
				<!-- .col {
					flex-basis: 0;
					flex-grow: 1;
					max-width: 100%;
				} -->
				<div class="col bg-primary">First Column</div>
				<div class="col bg-success">Second Column</div>
				<div class="col bg-danger">Third Column</div>
			</div>

			<div class="row mb-2">
				<!-- col-auto : element 寬度 -->
				<!-- .col-auto {
					flex: 0 0 auto;
					width: auto;
					max-width: 100%;
				} -->
				<div class="col bg-primary">First Column</div>
				<div class="col-auto bg-success">Second Column</div>
				<div class="col bg-danger">Third Column</div>
			</div>

			<div class="row mb-2">
				<!-- columns 3 6 3 -->
				<div class="col-3 bg-primary">First Column</div>
				<div class="col-6 bg-success">Second Column</div>
				<div class="col-3 bg-danger">Third Column</div>
			</div>
			<div class="row mb-2">
				<!-- columns over 12 -->
				<div class="col-7 bg-primary">First Column</div>
				<div class="col-3 bg-success">Second Column</div>
				<div class="col-6 bg-danger">Third Column</div>
			</div>
			<div class="row mb-2">
				<!-- column for different breakpoint -->
				<div class="col-sm-3 col-lg-4 bg-primary">First Column</div>
				<div class="col-sm-6 col-lg-4 bg-success">Second Column</div>
				<div class="col-sm-3 col-lg-4 bg-danger">Third Column</div>
			</div>
			<div class="row mb-2">
				<!-- all columns -->
				<!-- .col-1 {
					flex: 0 0 8.333333%;
					max-width: 8.333333% 預防內容推開
				} -->
				<div class="col-1 bg-primary">col1</div>
				<!-- .col-2 {
					flex: 0 0 16.666667%;
					max-width: 16.666667%;
				} -->
				<div class="col-2 bg-success">col-2</div>
				<!-- .col-3 {
					-ms-flex: 0 0 25%;
					flex: 0 0 25%;
					max-width: 25%;
				} -->
				<div class="col-3 bg-danger">col-3</div>
				<!-- .col-4 {
					flex: 0 0 33.333333%;
					max-width: 33.333333%;
				} -->
				<div class="col-4 bg-primary">col-4</div>
				<!-- .col-5 {
					flex: 0 0 41.666667%;
					max-width: 41.666667%;
				} -->
				<div class="col-5 bg-success">col-5</div>
				<!-- .col-6 {
					flex: 0 0 50%;
					max-width: 50%;
				} -->
				<div class="col-6 bg-danger">col-6</div>
				<!-- .col-7 {
					flex: 0 0 58.333333%;
					max-width: 58.333333%;
				} -->
				<div class="col-7 bg-primary">col-7</div>
				<!-- .col-8 {
					flex: 0 0 66.666667%;
					max-width: 66.666667%;
				} -->
				<div class="col-8 bg-success">col-8</div>
				<!-- .col-9 {
					flex: 0 0 75%;
					max-width: 75%;
				} -->
				<div class="col-9 bg-danger">col-9</div>
				<!-- .col-10 {
						flex: 0 0 83.333333%;
						max-width: 83.333333%;
				} -->
				<div class="col-10 bg-primary">col-10</div>
				<!-- .col-11 {
					flex: 0 0 91.666667%;
					max-width: 91.666667%;
				} -->
				<div class="col-11 bg-success">col-11</div>
				<!-- .col-12 {
						flex: 0 0 100%;
						max-width: 100%;
				} -->
				<div class="col-12 bg-danger">col-12</div>
			</div>
		</div>

		<!-- container fluid -->
		<!-- .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl {
			width: 100%;
			padding-right: 15px;
			padding-left: 15px;
			margin-right: auto;
			margin-left: auto;
		} -->
		<div class="container-fluid bg-secondary text-light">
			<h2>container fluid</h2>
		</div>
```

##### align-items-xx, justify-content-xx, align-self-xx, order
``` html
		<div class="container bg-secondary text-light">
			<!-- .align-items-center {
				align-items: center!important;
			} -->
			<!-- .justify-content-center {
				justify-content: center!important;
			} -->
			<div class="row align-items-center justify-content-center" style="height: 250px;">
				<!-- .align-self-start {
						align-self: flex-start!important;
				} -->
				<!-- .order-12 {
					order: 12;
				} -->
				<div class="col-2 order-12 bg-primary align-self-start">A</div>
				<!-- .order-last {
					order: 13;
				} -->
				<div class="col-2 order-last bg-success">B</div>
				<!-- default order: 1; -->
				<div class="col-2 bg-danger">C</div>
				<!-- .order-1 {
					order: 1;
				} -->
				<div class="col-2 order-1 bg-warning">D</div>
				<!-- .order-first {
					order: -1;
				} -->
				<div class="col-2 order-first bg-info align-self-end">E</div>
			</div>
		</div>
```

##### Grid system Nested
``` html
		<div class="container bg-secondary text-light">
			<div class="row align-items-center" style="height: 250px;">
				<div class="col-3 bg-primary">First Column</div>
				<div class="col-9">
					<div class="row">
						<div class="col-6 bg-success">Nested Column 1</div>
						<div class="col-6 bg-danger">Nested Column 2</div>
					</div>
				</div>
			</div>
		</div>
```

##### Gutters(col 以內含 padding 可用 px-x or py-x 修改寬度)
``` html
		<!-- px-4 因 row margin-right: -15px; margin-left: -15px; 才看的出來 -->
		<div class="container bg-secondary py-2 px-4">
			<!-- .row {
				display: flex;
				flex-wrap: wrap;
				margin-right: -15px;
				margin-left: -15px;
			} -->
			<div class="row">
				<!-- .border {
					border: 1px solid #dee2e6!important;
				} -->
				<!-- .pl-5, .px-5 {
					padding-left: 3rem!important;
				}
				.pr-5, .px-5 {
						padding-right: 3rem!important;
				}
				.pb-3, .py-3 {
						padding-bottom: 1rem!important;
				}
				.pt-3, .py-3 {
						padding-top: 1rem!important;
				} -->
				<!-- .col, .col-1, .col-10, .col-11, .col-12, .col-2 ... 
				{
					position: relative;
					width: 100%;
					padding-right: 15px;
					padding-left: 15px;
				} -->
				<div class="col py-3 px-5 border bg-primary">Custom column padding</div>
				<div class="col py-3 px-5 border bg-success">Custom column padding</div>
			</div>
		</div>
```

##### row-cols-x
``` html
		<div class="container">
			<!-- .row-cols-2>* { : 下一層 2 個
				flex: 0 0 50%;
				max-width: 50%;
			} -->
			<div class="row row-cols-2 mb-2">
				<div class="col bg-primary">Column</div>
				<div class="col bg-success">Column</div>
				<div class="col bg-info">Column</div>
				<div class="col bg-danger">Column</div>
			</div>
			<!-- .row-cols-3>* { : 下一層 3 個
				flex: 0 0 33.333333%;
				max-width: 33.333333%;
			} -->
			<div class="row row-cols-3 mb-2">
				<div class="col bg-primary">Column</div>
				<div class="col bg-success">Column</div>
				<div class="col bg-info">Column</div>
				<div class="col bg-danger">Column</div>
			</div>
			<!-- .row-cols-4>* {
					flex: 0 0 25%;
					max-width: 25%;
			} -->
			<div class="row row-cols-4">
				<div class="col bg-primary">Column</div>
				<div class="col bg-success">Column</div>
				<!-- .col-6 50% 蓋過 .row-cols-4>* 25% -->
				<!-- .col-6 {
					flex: 0 0 50%;
					max-width: 50%;
				} -->
				<div class="col-6 bg-info">Column</div>
				<div class="col bg-danger">Column</div>
			</div>			
		</div>
```

##### No gutters
``` html
		<!-- px-4 因 row margin-right: -15px; margin-left: -15px; 才看的出來 -->
		<div class="container bg-secondary">
			<!-- .no-gutters>.col, 內部 padding: 0
				padding-right: 0;
				padding-left: 0;
			} -->
			<div class="row no-gutters">
					<!-- .col, .col-1, .col-10, .col-11, .col-12, .col-2 ... 
					{
						position: relative;
						width: 100%;
						padding-right: 15px;
						padding-left: 15px;
					} -->
				<div class="col-6 bg-primary">Column</div>
				<div class="col-6 bg-success">Column</div>
			</div>
		</div>
```

##### Offsetting columns
``` html
		<div class="container bg-secondary">
			<div class="row mb-2">
				<div class="col-4 bg-primary">Column</div>
				<!-- .offset-4 {
					margin-left: 33.333333%;
				} -->
				<div class="col-4 offset-4 bg-success">Column</div>
			</div>
			<div class="row mb-2">
				<!-- .offset-3 {
					margin-left: 25%;
				} -->
				<div class="col-3 offset-3 bg-primary">Column</div>
				<div class="col-3 offset-3 bg-success">Column</div>
			</div>
			<div class="row mb-2">
				<div class="col-6 offset-3 bg-primary">Column</div>
			</div>
		</div>
```

##### Margin utilities
``` html
		<div class="container bg-secondary">
			<div class="row mb-2">
				<div class="col-4 bg-primary">Column</div>
				<!-- .ml-auto, .mx-auto {
					margin-left: auto!important;
				} -->
				<div class="col-4 ml-auto bg-success">Column</div>
			</div>
			<div class="row mb-2">
				<div class="col-3 ml-auto bg-primary">Column</div>
				<div class="col-3 ml-auto bg-success">Column</div> 
			</div>
			<div class="row mb-2">
				<!-- .mr-auto, .mx-auto {
					margin-right: auto!important;
				} -->
				<!-- col-auto : element 寬度 -->
				<!-- .col-auto {
					flex: 0 0 auto;
					width: auto;
					max-width: 100%;
				} -->
				<div class="col-auto mr-auto bg-primary">Column</div>
				<div class="col-auto bg-success">Column</div> 
			</div>
		</div>
```


### Content 

#### Reboot 
##### font family
``` js
$font-family-sans-serif:
  // Safari for macOS and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for macOS (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  Roboto,
  // Basic web fallback
  "Helvetica Neue", Arial,
  // Linux
  "Noto Sans",
  "Liberation Sans",
  // Sans serif fallback
  sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
```

#### [Typography](/bootstrap-1/typography) 排版
##### Headings
``` html
		<!-- small, .small: font-size: 80%;, font-weight: 400; -->
		<h1>h1. Bootstrap heading <small>text1</small></h1>
		<!-- text-muted: color: #6c757d!important; -->
		<h1>h1. Bootstrap heading <small class="text-muted">text1</small></h1>
		<h2>h2. Bootstrap heading</h2>
		<h3>h3. Bootstrap heading</h3>
		<h4>h4. Bootstrap heading</h4>
		<h5>h5. Bootstrap heading</h5>
		<h6>h6. Bootstrap heading</h6>
```

##### Headings Class
``` html
		<p class="h1">h1. Bootstrap heading</p>
		<p class="h2">h2. Bootstrap heading</p>
		<p class="h3">h3. Bootstrap heading</p>
		<p class="h4">h4. Bootstrap heading</p>
		<p class="h5">h5. Bootstrap heading</p>
		<p class="h6">h6. Bootstrap heading</p>
```

##### Display headings
``` html
		<h1 class="display-1">Display 1</h1>
		<h1 class="display-2">Display 2</h1>
		<h1 class="display-3">Display 3</h1>
		<h1 class="display-4">Display 4</h1>
```

##### Lead 突出文字
``` html
		<p>Lorem ipsum dolor sit amet.</p>
		<!-- .lead: font-size: 1.25rem;, font-weight: 300; -->
		<p class="lead">Lorem ipsum dolor sit amet.</p>
		<p>Lorem ipsum dolor sit amet.</p>
```

##### Inline text elements
``` html
		<!-- mark, .mark: padding: 0.2em;, background-color: #fcf8e3; -->
		<p>Lorem <mark>ipsum dolor</mark> sit amet consectetur adipisicing elit. Similique, amet.</p>
		<!-- del(browser): text-decoration: line-through; -->
		<p>Lorem <del>ipsum dolor sit</del> amet consectetur adipisicing elit. Quo, voluptatem!</p>
		<!-- s(browser): text-decoration: line-through; -->
		<p>Lorem <s>ipsum, dolor</s> sit amet consectetur adipisicing elit. Nisi, nesciunt.</p>
		<!-- ins(browser):　text-decoration: underline; -->
		<p>Lorem <ins>ipsum dolor</ins> sit, amet consectetur adipisicing elit. Nisi, expedita!</p>
		<!-- ｕ(browser):　text-decoration: underline; -->
		<p>Lorem <u>ipsum dolor,</u> sit amet consectetur adipisicing elit. Possimus, magni.</p>
		<!-- small, .small: font-size: 80%;, font-weight: 400; -->
		<p>Lorem <small>ipsum dolor</small> sit, amet consectetur adipisicing elit. Tempora, voluptates.</p>
		<!-- b, strong: font-weight: bolder; -->
		<p>Lorem, <strong>ipsum dolor</strong> sit amet consectetur adipisicing elit. Velit, accusamus?</p>
		<!-- em(browser): font-style: italic; -->
		<p>Lorem <em>ipsum dolor</em> sit amet consectetur adipisicing elit. Sequi, facilis?</p>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, exercitationem.</p>
```

##### Abbreviations 縮寫
``` html
		<!-- abbr : 
			text-decoration: underline dotted;
			cursor: help; (?)
			border-bottom: 0;
			text-decoration-skip-ink: none; (畫 上畫線,下畫線 不受其他條件影響)-->
		<!-- title="attribute": 顯示文字 -->
		<p><abbr title="attribute">attr</abbr></p>
		<!-- .initialism: font-size: 90%;, text-transform: uppercase; -->
		<p><abbr title="HyperText Markup Language" class="initialism">html</abbr></p>
```

##### Blockquotes 引用
``` html
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, iste!</p>
		<!-- blockquote:	margin: 0 0 1rem; -->
		<!-- .blockquote: margin-bottom: 1rem;, font-size: 1.25rem; -->
		<!-- blockquote(agent) {
			display: block;
			margin-block-start: 1em;
			margin-block-end: 1em;
			margin-inline-start: 40px;
			margin-inline-end: 40px;
		} -->
		<blockquote class="blockquote">
			<p class="mb-0">A well-known quote, contained in a blockquote element.</p>
			<!-- footer: display: block; -->
			<!-- .blockquote-footer: display: block; , font-size: 80%; , color: #6c757d; -->
			<!-- cite(browser):font-style: italic; -->
			<!-- .blockquote-footer::before (橫線) {
				content: "\2014\00A0";
			} -->
			<footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
		</blockquote>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, commodi.</p>
```

##### List
``` html
		<!-- .list-unstyled: padding-left: 0; , list-style: none; -->
		<ul class="list-unstyled">
			<li>This is a list.</li>
			<li>It appears completely unstyled.</li>
			<li>Structurally, it's still a list.</li>
		</ul>

		<!-- .list-inline: padding-left: 0; , list-style: none; -->
		<ul class="list-inline">
			<!-- .list-inline-item: display: inline-block; -->
			<li class="list-inline-item">This is a list item.</li>
			<li class="list-inline-item">And another one.</li>
			<li class="list-inline-item">But they're displayed inline.</li>
		</ul>
```

##### Description list alignment
``` html
		<dl class="row">
			<!-- dt: font-weight: 700; -->
			<dt class="col-sm-3">Description lists</dt>
			<!-- dd:	margin-bottom: 0.5rem; , margin-left: 0; -->
			<dd class="col-sm-9">A description list is perfect for defining terms.</dd>
		
			<dt class="col-sm-3">Term</dt>
			<dd class="col-sm-9">
				<p>Definition for the term.</p>
				<p>And some more placeholder definition text.</p>
			</dd>
		
			<dt class="col-sm-3">Another term</dt>
			<dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>
		
			<dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
			<dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
		
			<dt class="col-sm-3">Nesting</dt>
			<dd class="col-sm-9">
				<!-- dl, ol, ul : margin-top: 0; , margin-bottom: 1rem; -->
				<dl class="row">
					<dt class="col-sm-4">Nested definition list</dt>
					<dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
				</dl>
			</dd>
		</dl>
```

#### [Images](/bootstrap-1/images)
##### Responsive images
``` html
		<div class="container">
			<div class="row">
				<div class="col-3 mx-auto">
					<!-- .img-fluid {
						max-width: 100%;
						height: auto;
					} -->
					<img src="https://via.placeholder.com/400" class="img-fluid">
				</div>
			</div>
		</div>
```

##### Image thumbnails
``` html
		<!-- .img-thumbnail {
			padding: 0.25rem;
			background-color: #fff;
			border: 1px solid #dee2e6;
			border-radius: 0.25rem;
			max-width: 100%;
			height: auto;
		} -->
		<img src="https://via.placeholder.com/200" class="img-thumbnail">
```

##### Rouned and rounded-circle
``` html
		<div class="d-flex justify-content-between">
			<!-- .rounded: border-radius: 0.25rem!important;  -->
			<img src="https://via.placeholder.com/200" class="rounded">
			<!-- .rounded-circle: border-radius: 50%!important; -->
			<img src="https://via.placeholder.com/200" class="rounded-circle">
		</div>
```

##### Aligning images
``` html
		<div class="clearfix">
			<img src="https://via.placeholder.com/200" class="rounded float-left">
			<img src="https://via.placeholder.com/200" class="rounded float-right">
		</div>
		<img src="https://via.placeholder.com/200" class="rounded mx-auto d-block">
		<div class="text-center mt-3">
			<img src="https://via.placeholder.com/200" class="rounded">
		</div>
```

#### [Tables](/bootstrap-1/tables)
##### Example
``` html
			width: 100%;
			margin-bottom: 1rem;
			color: #212529;
		} -->
		<table class="table mb-5">
			<thead>
				<!-- .table thead th {
					vertical-align: bottom;
					border-bottom: 2px solid #dee2e6;
				} -->
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<!-- .table-dark {
			color: #fff;
			background-color: #343a40;
		} -->
		<table class="table table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Table head options(.thead-dark or .thead-light)
``` html
		<table class="table mb-5">
			<!-- .table .thead-dark th {
				color: #fff;
				background-color: #343a40;
				border-color: #454d55;
			} -->
			<thead class="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<table class="table">
			<!-- .table .thead-light th {
				color: #495057;
				background-color: #e9ecef;
				border-color: #dee2e6;
			} -->
			<thead class="thead-light">
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Striped rows
``` html
		<!-- .table-striped tbody tr:nth-of-type(odd) {
			background-color: rgba(0, 0, 0, 0.05);
		} -->
		<table class="table table-striped mb-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<!-- .table-dark.table-striped tbody tr:nth-of-type(odd) {
			background-color: rgba(255, 255, 255, 0.05);
		} -->
		<table class="table table-striped table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td>Larry</td>
					<td>the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Bordered table
``` html
		<!-- .table-bordered th,
		.table-bordered td {
			border: 1px solid #dee2e6 !important;
		} -->
		<table class="table table-bordered mb-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<table class="table table-bordered table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
	</div>
```

##### Borderless table
``` html
		<!-- .table-borderless th,
		.table-borderless td,
		.table-borderless thead th,
		.table-borderless tbody + tbody {
			border: 0;
		} -->
		<table class="table table-borderless mb-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<table class="table table-borderless">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Hoverable rows
``` html
		<!-- .table-hover tbody tr:hover {
			color: #212529;
			background-color: rgba(0, 0, 0, 0.075);
		} -->
		<table class="table table-hover mb-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<!-- .table-hover .table-dark:hover > td,
		.table-hover .table-dark:hover > th {
			background-color: #b9bbbe;
		} -->
		<table class="table table-hover table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Small table
``` html
		<!-- .table-sm td, .table-sm th {
			padding: 0.3rem;
		} -->
		<!-- .table td, .table th {
				padding: 0.75rem;
				vertical-align: top;
				border-top: 1px solid #dee2e6;
		} -->
		<table class="table table-sm mb-5">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>

		<table class="table table-sm table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">First</th>
					<th scope="col">Last</th>
					<th scope="col">Handle</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">1</th>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Jacob</td>
					<td>Thornton</td>
					<td>@fat</td>
				</tr>
				<tr>
					<th scope="row">3</th>
					<td colspan="2">Larry the Bird</td>
					<td>@twitter</td>
				</tr>
			</tbody>
		</table>
```

##### Contextual(語意化) classes
``` html
		<table class="table mb-5">
			<thead>
				<tr>
					<th scope="col">Class</th>
					<th scope="col">Heading</th>
					<th scope="col">Heading</th>
				</tr>
			</thead>
			<tbody>
				.table-active, .table-active>td, .table-active>th {
					background-color: rgba(0,0,0,.075);
				}
				<tr class="table-active">
					<th scope="row">Active</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr>
					<th scope="row">Default</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>

				<!-- .table-primary tbody+tbody, .table-primary td, .table-primary th, .table-primary thead th {
					border-color: #7abaff;
				}				 -->
				<tr class="table-primary">
					<th scope="row">Primary</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-secondary">
					<th scope="row">Secondary</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-success">
					<th scope="row">Success</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-danger">
					<th scope="row">Danger</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-warning">
					<th scope="row">Warning</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-info">
					<th scope="row">Info</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-light">
					<th scope="row">Light</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="table-dark">
					<th scope="row">Dark</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
			</tbody>
		</table>

		<table class="table table-dark">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Heading</th>
					<th scope="col">Heading</th>
				</tr>
			</thead>
			<tbody>
				<tr class="bg-primary">
					<th scope="row">1</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr>
					<th scope="row">2</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="bg-success">
					<th scope="row">3</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr>
					<th scope="row">4</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="bg-info">
					<th scope="row">5</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr>
					<th scope="row">6</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="bg-warning">
					<th scope="row">7</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr>
					<th scope="row">8</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
				<tr class="bg-danger">
					<th scope="row">9</th>
					<td>Cell</td>
					<td>Cell</td>
				</tr>
			</tbody>
		</table>
```

##### Responsive tables
``` html
		<!-- .table-responsive {
			display: block;
			width: 100%;
			overflow-x: auto;
		} -->
		<div class="table-responsive">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
			</table>
		</div>
```

##### Responsive tables - sm
``` html
		<div class="table-responsive-sm">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
			</table>
		</div>
```

##### Responsive tables - md<
``` html
		<!-- @media (max-width: 767.98px)
		.table-responsive-md {
				display: block;
				width: 100%;
				overflow-x: auto;
				-webkit-overflow-scrolling: touch;
		} -->
		<div class="table-responsive-md">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
			</table>
		</div>
```

##### Responsive tables - lg
``` html
		<div class="table-responsive-lg">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
			</table>
		</div>
```

##### Responsive tables - xl
``` html
		<div class="table-responsive-xl">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
						<th scope="col">Heading</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">1</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">2</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
					<tr>
						<th scope="row">3</th>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
						<td>Cell</td>
					</tr>
				</tbody>
			</table>
		</div>
```


### Utilities
#### [Text](/bootstrap-1/text)
##### Text alignment
``` html
		<p>Some placeholder text to demonstrate justified text alignment. Will you do the same for me? It's time to face the music I'm no longer your muse. Heard it's beautiful, be the judge and my girls gonna take a vote. I can feel a phoenix inside of me. Heaven is jealous of our love, angels are crying from up above. Yeah, you take me to utopia.</p>
		<!-- .text-justify: text-align: justify!important; -->
		<p class="text-justify">Some placeholder text to demonstrate justified text alignment. Will you do the same for me? It's time to face the music I'm no longer your muse. Heard it's beautiful, be the judge and my girls gonna take a vote. I can feel a phoenix inside of me. Heaven is jealous of our love, angels are crying from up above. Yeah, you take me to utopia.</p>

		<!-- .text-left : text-align: left!important; -->
		<p class="text-left">Left aligned text on all viewport sizes.</p>
		<p class="text-center">Center aligned text on all viewport sizes.</p>
		<p class="text-right">Right aligned text on all viewport sizes.</p>
```

##### Text transform
``` html
		<!-- text-transform: lowercase!important; -->
		<p class="text-lowercase">Lowercased text.</p>
		<p class="text-uppercase">Uppercased text.</p>
		<p class="text-capitalize">CapiTaliZed text.</p>
```

##### Font weight and italics
``` html
		<!-- .font-weight-bold:	font-weight: 700!important; -->
		<p class="font-weight-bold">Bold text.</p>
		<!-- .font-weight-bolder: font-weight: bolder!important; -->
		<p class="font-weight-bolder">Bolder weight text (relative to the parent element).</p>
		<!-- .font-weight-normal: font-weight: 400!important; -->
		<p class="font-weight-normal">Normal weight text.</p>
		<!-- .font-weight-light: font-weight: 300!important; -->
		<p class="font-weight-light">Light weight text.</p>
		<!-- .font-weight-lighter:	font-weight: lighter!important; -->
		<p class="font-weight-lighter">Lighter weight text (relative to the parent element).</p>
		<!-- .font-italic: font-style: italic!important; -->
		<p class="font-italic">Italic text.</p>
```

##### Text wrapping and overflow
``` html
		<!-- .text-wrap:	white-space: normal!important; (空白換行) -->
		<div class="badge badge-primary text-wrap" style="width: 6rem;">
			This text should wrap.
		</div>

		<!-- .text-nowrap:	white-space: nowrap!important; (不換行) -->
		<div class="text-nowrap bd-highlight" style="width: 8rem;">
			This text should overflow the parent. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deserunt necessitatibus itaque veniam! Nam, officia vero. Fugit eos natus numquam ipsa? Voluptas voluptate natus doloribus molestiae quod perspiciatis provident ipsa.
		</div>
		
		<!-- Block level -->
		<div class="row">
			<!-- .text-truncate :
				overflow: hidden;
				text-overflow: ellipsis; (over show ...省略符號)
				white-space: nowrap; -->
			<div class="col-2 text-truncate">
				Praeterea iter est quasdam res quas ex communi.
			</div>
		</div>

		<!-- Inline level -->
		<!-- .d-inline-block: display: inline-block!important; -->
		<span class="d-inline-block text-truncate" style="max-width: 150px;">
			Praeterea iter est quasdam res quas ex communi.
		</span>	
```

##### Word break : 防止長字影響 layout
``` html
		<!-- .text-break: 
			word-break: break-word!important; (word 可分開)
			word-wrap: break-word!important; (word 可換行) -->
		<p class="text-break">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>
```

##### Monospace 等寬
``` html
		<!-- .text-monospace:
			font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace!important; -->
		<p class="text-monospace">This is in monospace</p>
```

##### Reset color : force color 繼承 parent(.text-reset) 
``` html
		<p class="text-muted">
			<!-- .text-reset: color: inherit!important; -->
			Muted text with a <a href="#" class="text-reset">reset link</a>.
		</p>
```

##### Text decoration : Remove a text decoration with a .text-decoration-none
``` html
		<!-- .text-decoration-none: text-decoration: none!important; -->
		<a href="#" class="text-decoration-none">Non-underlined link</a>
```

#### [Colors](/bootstrap-1/colors)
##### Color
``` html
		<p class="text-primary">.text-primary</p>
		<p class="text-secondary">.text-secondary</p>
		<p class="text-success">.text-success</p>
		<p class="text-danger">.text-danger</p>
		<p class="text-warning">.text-warning</p>
		<p class="text-info">.text-info</p>
		<p class="text-light bg-dark">.text-light</p>
		<p class="text-dark">.text-dark</p>
		<p class="text-body">.text-body</p>
		<p class="text-muted">.text-muted</p>
		<p class="text-white bg-dark">.text-white</p>
		<p class="text-black-50">.text-black-50</p>
		<p class="text-white-50 bg-dark">.text-white-50</p>
```

##### Background color
``` html
		<div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
		<div class="p-3 mb-2 bg-secondary text-white">.bg-secondary</div>
		<div class="p-3 mb-2 bg-success text-white">.bg-success</div>
		<div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
		<div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
		<div class="p-3 mb-2 bg-info text-white">.bg-info</div>
		<div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
		<div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
		<div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
		<div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
```

#### [Spacing](/bootstrap-1/space)
type:
+ m - for classes that set margin
+ p - for classes that set padding

side: 
+ t - for classes that set margin-top or padding-top
+ b - for classes that set margin-bottom or padding-bottom
+ l - for classes that set margin-left or padding-left
+ r - for classes that set margin-right or padding-right
+ x - for classes that set both *-left and *-right
+ y - for classes that set both *-top and *-bottom
+ blank - for classes that set a margin or padding on all 4 sides of the element

size:
+ 0 - for classes that eliminate the margin or padding by setting it to 0
+ 1 - (by default) for classes that set the margin or padding to $spacer * .25(4px)
+ 2 - (by default) for classes that set the margin or padding to $spacer * .5(8px)
+ 3 - (by default) for classes that set the margin or padding to $spacer(16px)
+ 4 - (by default) for classes that set the margin or padding to $spacer * 1.5(24px)
+ 5 - (by default) for classes that set the margin or padding to $spacer * 3(48px)
+ auto - for classes that set the margin to auto

Negative margin(padding not support) :
+ n1 - (by default) for classes that set the margin to -$spacer * .25(4px)
+ n2 - (by default) for classes that set the margin to -$spacer * .5(8px)
+ n3 - (by default) for classes that set the margin to -$spacer(16px)
+ n4 - (by default) for classes that set the margin to -$spacer * 1.5(24px)
+ n5 - (by default) for classes that set the margin to -$spacer * 3(48px)

##### Margin
``` js
		<div class="mb-0 bg-primary text-white">mb-0 Lorem ipsum dolor sit amet consectetur</div>
		<div class="mb-1 bg-secondary text-white">mb-1 Lorem ipsum dolor sit amet consectetur</div>
		<div class="mb-2 bg-success text-white">mb-2 Lorem ipsum dolor sit amet consectetur</div>
		<div class="mb-3 bg-danger text-white">mb-3 Lorem ipsum dolor sit amet consectetu</div>
		<div class="mb-4 bg-warning text-dark">mb-4 Lorem ipsum dolor sit amet consectetu</div>
		<div class="mb-5 bg-info text-white">mb-5 Lorem ipsum dolor sit amet consectetu</div>
		<div class="mx-auto text-white bg-dark" style="width: 300px;">mx-auto(width: 300px;) Lorem ipsum dolor sit amet consectetu</div>
		<div class="ml-n3 bg-primary text-white">ml-n3 Lorem ipsum dolor sit amet consectetur</div>
```

##### Padding
``` js
		<div class="p-0 bg-primary text-white">p-0 Lorem ipsum dolor sit amet consectetur</div>
		<div class="p-1 bg-secondary text-white">p-1 Lorem ipsum dolor sit amet consectetur</div>
		<div class="p-2 bg-success text-white">p-2 Lorem ipsum dolor sit amet consectetur</div>
		<div class="p-3 bg-danger text-white">p-3 Lorem ipsum dolor sit amet consectetu</div>
		<div class="p-4 bg-warning text-dark">p-4 Lorem ipsum dolor sit amet consectetu</div>
		<div class="p-5 bg-info text-white">p-5 Lorem ipsum dolor sit amet consectetu</div>
```

#### [Size](/bootstrap-1/size)
##### Width
``` html
		<div class="w-25 p-3" style="background-color: #eee;">Width 25%</div>
		<div class="w-50 p-3" style="background-color: #eee;">Width 50%</div>
		<div class="w-75 p-3" style="background-color: #eee;">Width 75%</div>
		<div class="w-100 p-3" style="background-color: #eee;">Width 100%</div>
		<div class="w-auto p-3" style="background-color: #eee;">Width auto</div>
```

##### Height
``` html
		<div style="height: 100px; background-color: rgba(255,0,0,0.1);">
			<div class="h-25 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 25%</div>
			<div class="h-50 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 50%</div>
			<div class="h-75 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 75%</div>
			<div class="h-100 d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height 100%</div>
			<div class="h-auto d-inline-block" style="width: 120px; background-color: rgba(0,0,255,.1)">Height auto</div>
		</div>
```

##### Max Height
``` html
<div style="height: 100px; background-color: rgba(255,0,0,0.1);">
			<div class="mh-100" style="width: 100px; height: 200px; background-color: rgba(0,0,255,0.1);">Max-height 100%</div>
		</div>
```

##### Max Width
``` html
		<div style="height: 100px; background-color: rgba(255,0,0,0.5);">
			<div class="mw-100" style="width: 1300px; height: 70px; background-color: rgba(0,0,255,0.1);">Max-width 100%</div>
		</div>
```

##### Relative to the viewport
``` html
		<div class="min-vw-100">Min-width 100vw</div>
		<div class="min-vh-100">Min-height 100vh</div>
		<div class="vw-100">Width 100vw</div>
		<div class="vh-100">Height 100vh</div>
```

#### [Float](/bootstrap-1/float)
+ float-left
+ float-right
+ float-none

``` html
		<!-- 
		.clearfix::after {
			display: block;
			clear: both;
			content: "";
		} -->
		<div class="bg-secondary text-center p-2 clearfix">
			<!-- float-left: float: left!important; -->
			<h1 class="bg-success p-2 float-left">Hello</h1>
			<!-- float-right: float: right!important; -->
			<h1 class="bg-primary p-2 float-right">World</h1>
		</div>
```

#### [Position](/bootstrap-1/position)
+ position-static
+ position-relative
+ position-absolute
+ position-fixed
+ position-sticky
+ fixed-top
+ fixed-bottom
+ sticky-top

``` html
	<div class="box" >
		<!-- .fixed-top {
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			z-index: 1030;
		} -->
		<!-- <h1 class="bg-success p-2 fixed-top" >Hello</h1> -->

		<!-- 
		.fixed-bottom {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1030;
		} -->
		<h1 class="bg-primary p-2 fixed-bottom" >World</h1>
		<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti doloribus dolorum sint animi, eligendi ut....</p>
		<!-- 
		.sticky-top {
			position: sticky;
			top: 0;
			z-index: 1020;
		} -->
		<h1 class="bg-info p-2 sticky-top">test line...</h1>
		<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. ...</p>
	</div>
```


### Componets
	
#### [Navbar](/bootstrap-1/navbar)
+ nav
	+ class
		+ navbar
		+ navbar-expand-xx : row 排列 condition
		+ navbar-light/navbar-dark: color
	+ navbar-brand
	+ button : toggle
		+ navbar-toggle
		+ data-toggle="collapse"
		+ data-target="#..."
	+ div
		+ collapse: show/noshow control 
		+ navbar-collapse: auto legnth alignment
		+ id="..."
	+ ul
		+ navbar-nav: flex, list-style:none
	+ li
		+ nav-item : set basic nav item
		+ active: some condition affect(navbar-light, navbar-dark)
		+ a 
			+ nav-link : set for nav-link
			+ disable : disable link
	+ li(dropdown)
		+ nav-item : set basic nav item
		+ dropdown : set support dropdown
		+ a + nav-link : set for nav-link
			+ dropdown-toggle: 
			+ data-toggle="dropdown": dropdown control
		+ div + dropdown-menu : dropdown form
			+ a + dropdown-item : dropdown item
			+ div + dropdown-divider: 分隔線
	+ navbar-text

##### Simple example #1
``` html
		<!-- .navbar {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
		} -->
		<!-- .navbar-expand-md {
			flex-flow: row nowrap;
			justify-content: flex-start;
		} -->
		<nav class="navbar navbar-expand-md navbar-light bg-light">
			<!-- .navbar-brand {
				display: inline-block;
				padding-top: 0.3125rem;
				padding-bottom: 0.3125rem;
				margin-right: 1rem;
				font-size: 1.25rem;
				line-height: inherit;
				white-space: nowrap;
			} -->
			<a class="navbar-brand" href="#">Navbar</a>

			<!-- .navbar-toggler {
				padding: 0.25rem 0.75rem;
				font-size: 1.25rem;
				line-height: 1;
				background-color: transparent;
				border: 1px solid transparent;
				border-radius: 0.25rem;
			} -->
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<!-- .collapse:not(.show) {
				display: none;
			} -->
			<!-- .navbar-collapse {
				-ms-flex-preferred-size: 100%;
				flex-basis: 100%;
				-ms-flex-positive: 1;
				flex-grow: 1;
				-ms-flex-align: center;
				align-items: center;
			} -->
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<!-- .navbar-nav {
					display: flex;
					flex-direction: column;
					padding-left: 0;
					margin-bottom: 0;
					list-style: none;
				} -->
				<ul class="navbar-nav mr-auto">
					<!-- .nav-item {
						flex: 1 1 auto;
						text-align: center;
					} -->
					<li class="nav-item active">
						<!-- .nav-link {
							display: block;
							padding: 0.5rem 1rem;
						} -->
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<!-- .dropdown, .dropleft, .dropright, .dropup {
						position: relative;
					} -->
					<li class="nav-item dropdown">
						<!-- .dropdown-toggle : white-space: nowrap; -->
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
							Dropdown
						</a>
						<!-- .dropdown-menu {
							position: absolute;
							top: 100%;
							left: 0;
							z-index: 1000;
							display: none;
							float: left;
							min-width: 10rem;
							padding: 0.5rem 0;
							margin: 0.125rem 0 0;
							font-size: 1rem;
							color: #212529;
							text-align: left;
							list-style: none;
							background-color: #fff;
							background-clip: padding-box;
							border: 1px solid rgba(0,0,0,.15);
							border-radius: 0.25rem;
						} -->
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<!-- .dropdown-item {
								display: block;
								width: 100%;
								padding: 0.25rem 1.5rem;
								clear: both;
								font-weight: 400;
								color: #212529;
								text-align: inherit;
								white-space: nowrap;
								background-color: transparent;
								border: 0;
							} -->
							<!-- a.btn.disabled,
							fieldset:disabled a.btn {
								pointer-events: none;
							} -->
							<a class="dropdown-item" href="#">Action</a>
							<a class="dropdown-item" href="#">Another action</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Something else here</a>
						</div>
					</li>
					<li class="nav-item">
						<!-- .navbar-light .navbar-nav .nav-link.disabled {
							color: rgba(0,0,0,.3);
						} -->
						<a class="nav-link disabled">Disabled</a>
					</li>
				</ul>

				<!-- .form-inline {
						display: flex;
						flex-flow: row wrap;
						align-items: center;
				} -->
				<form class="form-inline my-2 my-lg-0">
					<!-- .form-control {
						display: block;
						width: 100%;
						height: calc(1.5em + 0.75rem + 2px);
						padding: 0.375rem 0.75rem;
						font-size: 1rem;
						font-weight: 400;
						line-height: 1.5;
						color: #495057;
						background-color: #fff;
						background-clip: padding-box;
						border: 1px solid #ced4da;
						border-radius: 0.25rem;
						transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
					} -->
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<!-- .btn {
						display: inline-block;
						font-weight: 400;
						color: #212529;
						text-align: center;
						vertical-align: middle;
						-webkit-user-select: none;
						-moz-user-select: none;
						-ms-user-select: none;
						user-select: none;
						background-color: transparent;
						border: 1px solid transparent;
						padding: 0.375rem 0.75rem;
						font-size: 1rem;
						line-height: 1.5;
						border-radius: 0.25rem;
						transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
					} -->
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
```

##### Simple example #2
``` html
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Navbar w/ text</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarText">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Features</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Pricing</a>
					</li>
				</ul>
				<!-- .navbar-text {
					display: inline-block;
					padding-top: 0.5rem;
					padding-bottom: 0.5rem;
				} -->
				<span class="navbar-text">
					Navbar text with an inline element
				</span>
			</div>
		</nav>
```

##### Form #2
``` html
		<nav class="navbar navbar-light bg-light">
			<form class="form-inline">
				<!-- .input-group {
					position: relative;
					display: -ms-flexbox;
					display: flex;
					-ms-flex-wrap: wrap;
					flex-wrap: wrap;
					-ms-flex-align: stretch;
					align-items: stretch;
					width: 100%;
				} -->
				<div class="input-group">
					<!-- .input-group-prepend {
						margin-right: -1px;
					} -->
					<div class="input-group-prepend">
						<!-- .input-group>.input-group-prepend>.input-group-text {
							border-top-right-radius: 0;
							border-bottom-right-radius: 0;
						} -->
						<span class="input-group-text" id="basic-addon1">@</span>
					</div>
					<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
				</div>
			</form>
		</nav>
```

##### Color schemes
``` html
		<nav class="navbar navbar-expand-md navbar-dark bg-dark">
			<!-- Navbar content -->
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled">Disabled</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		
		<nav class="navbar navbar-expand-md navbar-dark bg-primary mt-2">
			<!-- Navbar content -->
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled">Disabled</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		
		<nav class="navbar navbar-expand-md navbar-light mt-2" style="background-color: #e3f2fd;">
			<!-- Navbar content -->
			<a class="navbar-brand" href="#">Navbar</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item">
						<a class="nav-link disabled">Disabled</a>
					</li>
				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
```

#### [Input group](/bootstrap-1/input-group)
+ input-group : group for input
+ input-group-prepend : previous
+ input-group-append : after input char
+ input-group-text : text add for input
+ input + form-control : input basic setting
+ textarea + form-control : textarea basic setting

##### Basic example
``` html
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<!-- .input-group-text {
					display: flex;
					align-items: center;
					padding: 0.375rem 0.75rem;
					margin-bottom: 0;
					font-size: 1rem;
					font-weight: 400;
					line-height: 1.5;
					color: #495057;
					text-align: center;
					white-space: nowrap;
					background-color: #e9ecef;
					border: 1px solid #ced4da;
					border-radius: 0.25rem;
				} -->
				<span class="input-group-text" id="basic-addon1">@</span>
			</div>
			<input type="text" class="form-control" placeholder="Username" aria-label="Username"
				aria-describedby="basic-addon1">
		</div>
	
		<div class="input-group mb-3">
			<input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username"
				aria-describedby="basic-addon2">
			<div class="input-group-append">
				<span class="input-group-text" id="basic-addon2">@example.com</span>
			</div>
```


##### Sizing
``` html
		<!-- .input-group-sm>.input-group-prepend>.input-group-text {
			padding: 0.25rem 0.5rem;
			font-size: .875rem;
			line-height: 1.5;
			border-radius: 0.2rem;
		} -->
		<div class="input-group input-group-sm mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
			</div>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
		</div>
		
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroup-sizing-default">Default</span>
			</div>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
		</div>

	 <!-- .input-group-lg>.input-group-prepend>.btn, .input-group-lg>.input-group-prepend>.input-group-text {
			padding: 0.5rem 1rem;
			font-size: 1.25rem;
			line-height: 1.5;
			border-radius: 0.3rem;
		}		 -->
		<div class="input-group input-group-lg">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
			</div>
			<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
		</div>
```


##### Checkboxes, Radios and Select
``` html
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<div class="input-group-text">
					<input type="checkbox" aria-label="Checkbox for following text input">
				</div>
			</div>
			<input type="text" class="form-control" aria-label="Text input with checkbox">
		</div>
		
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<div class="input-group-text">
					<input type="radio" aria-label="Radio button for following text input">
				</div>
			</div>
			<input type="text" class="form-control" aria-label="Text input with radio button">
		</div>

		<div class="input-group">
			<div class="input-group-prepend">
				<label class="input-group-text" for="inputGroupSelect01">Options</label>
			</div>
			<!-- .input-group>.custom-select{
				position: relative;
				flex: 1 1 auto;
				width: 1%;
				min-width: 0;
				margin-bottom: 0;
			} -->
			<select class="custom-select" id="inputGroupSelect01">
				<option selected>Choose...</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
			</select>
		</div>
```


##### Buttons with dropdowns
``` html
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">Dropdown</button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
					<div role="separator" class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">Separated link</a>
				</div>
			</div>
			<input type="text" class="form-control" aria-label="Text input with dropdown button">
		</div>

		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<button type="button" class="btn btn-outline-secondary">Action</button>
				<!-- .dropdown-toggle-split {
					padding-right: 0.5625rem;
					padding-left: 0.5625rem;
				} -->
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false">
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
					<div role="separator" class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">Separated link</a>
				</div>
			</div>
			<input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
		</div>
```


##### File input
``` html
		<div class="input-group mb-3">
			<div class="input-group-prepend">
				<span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
			</div>
			<div class="custom-file">
				<!-- .input-group>.custom-file {
					display: flex;
					align-items: center;
				} -->
				<input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
				<!-- .custom-file-label {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					z-index: 1;
					height: calc(1.5em + 0.75rem + 2px);
					padding: 0.375rem 0.75rem;
					overflow: hidden;
					font-weight: 400;
					line-height: 1.5;
					color: #495057;
					background-color: #fff;
					border: 1px solid #ced4da;
					border-radius: 0.25rem;
				} -->
				<!-- .custom-file-input:lang(en) ~ .custom-file-label::after {
					content: "Browse";
				} -->
				<label class="custom-file-label" for="inputGroupFile01">Choose file</label>
			</div>
		</div>
```


#### [Form](/bootstrap-1/form)
+ form
	+ form-inline: form basic setting
	+ input + form-control : input basic setting
	+ button + type="submit" + .btn : bttton for form
+ form 
	+ input-group : group for input
		+ input-group-prepend : previous
		+ input-group-text : text add for input
	+ input + form-control : input basic setting
	+ input-group-append : after input char

##### Simple example 1
``` html
		<form>
			<!-- .form-group {
				margin-bottom: 1rem;
			} -->
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
				<!-- .small, small {
					font-size: 80%;
					font-weight: 400;
				} -->
				<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input type="password" class="form-control" id="exampleInputPassword1">
			</div>
			<div class="form-group form-check">
				<!-- .form-check-input {
					position: absolute;
					margin-top: 0.3rem;
					margin-left: -1.25rem;
				} -->
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<!-- .form-check-label {
					margin-bottom: 0;
				} -->
				<!-- label {
					display: inline-block;
					margin-bottom: 0.5rem;
				} -->
				<label class="form-check-label" for="exampleCheck1">Check me out</label>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
```

##### Simple example 2
``` html
		<form>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputEmail4">Email</label>
					<input type="email" class="form-control" id="inputEmail4">
				</div>
				<div class="form-group col-md-6">
					<label for="inputPassword4">Password</label>
					<input type="password" class="form-control" id="inputPassword4">
				</div>
			</div>
			<div class="form-group">
				<label for="inputAddress">Address</label>
				<input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
			</div>
			<div class="form-group">
				<label for="inputAddress2">Address 2</label>
				<input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputCity">City</label>
					<input type="text" class="form-control" id="inputCity">
				</div>
				<div class="form-group col-md-4">
					<label for="inputState">State</label>
					<select id="inputState" class="form-control">
						<option selected>Choose...</option>
						<option>...</option>
					</select>
				</div>
				<div class="form-group col-md-2">
					<label for="inputZip">Zip</label>
					<input type="text" class="form-control" id="inputZip">
				</div>
			</div>
			<div class="form-group">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" id="gridCheck">
					<label class="form-check-label" for="gridCheck">
						Check me out
					</label>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">Sign in</button>
		</form>
```

##### Form controls(form-control style)
``` html
		<form>
			<div class="form-group">
				<label for="exampleFormControlInput1">Email address</label>
				<!-- .form-control {
					display: block;
					width: 100%;
					height: calc(1.5em + 0.75rem + 2px);
					padding: 0.375rem 0.75rem;
					font-size: 1rem;
					font-weight: 400;
					line-height: 1.5;
					color: #495057;
					background-color: #fff;
					background-clip: padding-box;
					border: 1px solid #ced4da;
					border-radius: 0.25rem;
					transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
				} -->
				<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
			</div>
			<div class="form-group">
				<label for="exampleFormControlSelect1">Example select</label>
				<select class="form-control" id="exampleFormControlSelect1">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</div>
			<div class="form-group">
				<label for="exampleFormControlSelect2">Example multiple select</label>
				<select multiple class="form-control" id="exampleFormControlSelect2">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
			</div>
			<div class="form-group">
				<label for="exampleFormControlTextarea1">Example textarea</label>
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
			</div>
		</form>
```

##### File input
``` html
		<form>
			<div class="form-group">
				<label for="exampleFormControlFile1">Example file input</label>
				<input type="file" class="form-control-file" id="exampleFormControlFile1">
			</div>
		</form>
```

##### Sizing
``` html
		<!-- .form-control-lg {
			height: calc(1.5em + 1rem + 2px);
			padding: 0.5rem 1rem;
			font-size: 1.25rem;
			line-height: 1.5;
			border-radius: 0.3rem;
		} -->
		<input class="form-control form-control-lg mb-3" type="text" placeholder=".form-control-lg">
		<input class="form-control mb-3" type="text" placeholder="Default input">
		<!-- .form-control-sm {
			height: calc(1.5em + 0.5rem + 2px);
			padding: 0.25rem 0.5rem;
			font-size: .875rem;
			line-height: 1.5;
			border-radius: 0.2rem;
		} -->
		<input class="form-control form-control-sm" type="text" placeholder=".form-control-sm">
```

##### Readonly
``` html
		<input class="form-control mb-3" type="text" placeholder="Readonly input here..." readonly>

		<div class="form-group row">
			<label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
			<div class="col-sm-10">
				<!-- .form-control-plaintext {
					display: block;
					width: 100%;
					padding: 0.375rem 0;
					margin-bottom: 0;
					font-size: 1rem;
					line-height: 1.5;
					color: #212529;
					background-color: transparent;
					border: solid transparent;
					border-width: 1px 0;
				} -->
				<input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
			</div>
		</div>
```

##### Range Inputs
``` html
		<form>
			<div class="form-group">
				<label for="formControlRange">Example Range input</label>
				<!-- .form-control-file, .form-control-range {
					display: block;
					width: 100%;
				} -->
				<input type="range" class="form-control-range" id="formControlRange">
			</div>
		</form>
```

##### Checkboxes and radios
``` html
		<div class="form-check">
			.form-check-input {
				position: absolute;
				margin-top: 0.3rem;
				margin-left: -1.25rem;
			}
			<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
			.form-check-label {
				margin-bottom: 0;
			}
			<label class="form-check-label" for="defaultCheck1">
				Default checkbox
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
			<label class="form-check-label" for="defaultCheck2">
				Disabled checkbox
			</label>
		</div>

		<div class="form-check mt-2">
			<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
			<label class="form-check-label" for="exampleRadios1">
				Default radio
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
			<label class="form-check-label" for="exampleRadios2">
				Second default radio
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
			<label class="form-check-label" for="exampleRadios3">
				Disabled radio
			</label>
		</div>

		<!-- .form-check-inline {
			display: -ms-inline-flexbox;
			display: inline-flex;
			-ms-flex-align: center;
			align-items: center;
			padding-left: 0;
			margin-right: 0.75rem;
		} -->
		<div class="form-check form-check-inline mt-2">
			<input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
			<label class="form-check-label" for="inlineCheckbox1">1</label>
		</div>
		<div class="form-check form-check-inline">
			<input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
			<label class="form-check-label" for="inlineCheckbox2">2</label>
		</div>
		<div class="form-check form-check-inline">
			<input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
			<label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
		</div>

		<br>

		<div class="form-check form-check-inline mt-2">
			<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
			<label class="form-check-label" for="inlineRadio1">1</label>
		</div>
		<div class="form-check form-check-inline">
			<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
			<label class="form-check-label" for="inlineRadio2">2</label>
		</div>
		<div class="form-check form-check-inline">
			<input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
			<label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
		</div>		
	</div>
```

##### Disabled forms
``` html
		<input class="form-control mb-3" id="disabledInput" type="text" placeholder="Disabled input here..." disabled>

		<form>
			<fieldset disabled>
				<legend>Disabled fieldset example</legend>
				<div class="form-group">
					<label for="disabledTextInput">Disabled input</label>
					<input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input">
				</div>
				<div class="form-group">
					<label for="disabledSelect">Disabled select menu</label>
					<select id="disabledSelect" class="form-control">
						<option>Disabled select</option>
					</select>
				</div>
				<div class="form-group">
					<div class="form-check">
						<input class="form-check-input" type="checkbox" id="disabledFieldsetCheck" disabled>
						<label class="form-check-label" for="disabledFieldsetCheck">
							Can't check this
						</label>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</fieldset>
		</form>		
```

##### Validation
``` html
		<form class="needs-validation" novalidate>
			<div class="form-row">
				<div class="col-md-6 mb-3">
					<label for="validationCustom01">First name</label>
					<input type="text" class="form-control" id="validationCustom01" value="Mark" required>
					<div class="valid-feedback">
						Looks good!
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<label for="validationCustom02">Last name</label>
					<input type="text" class="form-control" id="validationCustom02" value="Otto" required>
					<div class="valid-feedback">
						Looks good!
					</div>
				</div>
			</div>
			<div class="form-row">
				<div class="col-md-6 mb-3">
					<label for="validationCustom03">City</label>
					<input type="text" class="form-control" id="validationCustom03" required>
					<div class="invalid-feedback">
						Please provide a valid city.
					</div>
				</div>
				<div class="col-md-3 mb-3">
					<label for="validationCustom04">State</label>
					<select class="custom-select" id="validationCustom04" required>
						<option selected disabled value="">Choose...</option>
						<option>...</option>
					</select>
					<div class="invalid-feedback">
						Please select a valid state.
					</div>
				</div>
				<div class="col-md-3 mb-3">
					<label for="validationCustom05">Zip</label>
					<input type="text" class="form-control" id="validationCustom05" required>
					<div class="invalid-feedback">
						Please provide a valid zip.
					</div>
				</div>
			</div>
			<div class="form-group">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
					<label class="form-check-label" for="invalidCheck">
						Agree to terms and conditions
					</label>
					<div class="invalid-feedback">
						You must agree before submitting.
					</div>
				</div>
			</div>
			<button class="btn btn-primary" type="submit">Submit form</button>
		</form>
		
		<script>
		// Example starter JavaScript for disabling form submissions if there are invalid fields
		(function() {
			'use strict';
			window.addEventListener('load', function() {
				// Fetch all the forms we want to apply custom Bootstrap validation styles to
				var forms = document.getElementsByClassName('needs-validation');
				// Loop over them and prevent submission
				var validation = Array.prototype.filter.call(forms, function(form) {
					form.addEventListener('submit', function(event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add('was-validated');
					}, false);
				});
			}, false);
		})();
		</script>
```

#### [Buttons](/bootstrap-1/buttons)
##### Common buttons
``` html
		<button type="button" class="btn btn-primary">Primary</button>
		<button type="button" class="btn btn-secondary">Secondary</button>
		<button type="button" class="btn btn-success">Success</button>
		<button type="button" class="btn btn-danger">Danger</button>
		<button type="button" class="btn btn-warning">Warning</button>
		<button type="button" class="btn btn-info">Info</button>
		<button type="button" class="btn btn-light">Light</button>
		<button type="button" class="btn btn-dark">Dark</button>
		
		<button type="button" class="btn btn-link">Link</button>
```

##### Outline buttons
``` html
		<button type="button" class="btn btn-outline-primary">Primary</button>
		<button type="button" class="btn btn-outline-secondary">Secondary</button>
		<button type="button" class="btn btn-outline-success">Success</button>
		<button type="button" class="btn btn-outline-danger">Danger</button>
		<button type="button" class="btn btn-outline-warning">Warning</button>
		<button type="button" class="btn btn-outline-info">Info</button>
		<button type="button" class="btn btn-outline-light">Light</button>
		<button type="button" class="btn btn-outline-dark">Dark</button>
```

##### Button tags
``` html
		<a class="btn btn-primary" href="#" role="button">Link</a>
		<button class="btn btn-primary" type="submit">Button</button>
		<input class="btn btn-primary" type="button" value="Input">
		<input class="btn btn-primary" type="submit" value="Submit">
		<input class="btn btn-primary" type="reset" value="Reset">
```

##### Sizes and block
``` html
		<button type="button" class="btn btn-primary btn-lg">Large button</button>
		<button type="button" class="btn btn-primary btn-sm">Small button</button>

		<div class="mt-3">
			<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
		</div>
```

##### Button active and disable
``` html
		<a href="#" class="btn btn-primary btn-lg" role="button" aria-pressed="true">Primary link</a>
		<a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Primary link(active)</a>
	
		<div class="mt-3">
			<button type="button" class="btn btn-lg btn-primary">Primary button</button>
			<button type="button" class="btn btn-lg btn-primary" disabled>Primary button(disable)</button>
		</div>
```

##### Toggle states
data-toggle="button" to toggle a button’s active state.
``` html
		<button type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false">
			Single toggle
		</button>
```

##### Checkbox and radio buttons
data-toggle="buttons" to toggle state 
.btn-group-toggle to style the input buttons
``` html
		<div class="btn-group-toggle mt-3" data-toggle="buttons">
			<label class="btn btn-secondary active">
				<input type="checkbox" checked> Checked
			</label>
		</div>

		<div class="btn-group btn-group-toggle mt-3" data-toggle="buttons">
			<label class="btn btn-secondary active">
				<input type="radio" name="options" id="option1" checked> Active
			</label>
			<label class="btn btn-secondary">
				<input type="radio" name="options" id="option2"> Radio
			</label>
			<label class="btn btn-secondary">
				<input type="radio" name="options" id="option3"> Radio
			</label>
		</div>
```

#### [Card](/bootstrap-1/card)
##### Card Example
``` html
		<!-- .card {
			position: relative;
			display: flex;
			flex-direction: column;
			min-width: 0;
			word-wrap: break-word;
			background-color: #fff;
			background-clip: border-box;
			border: 1px solid rgba(0,0,0,.125);
			border-radius: 0.25rem;
		} -->
		<div class="card" style="width: 18rem;">
			<!-- .card-img, .card-img-top {
				border-top-left-radius: calc(0.25rem - 1px);
				border-top-right-radius: calc(0.25rem - 1px);
			} -->
			<img src="https://via.placeholder.com/200" class="card-img-top">
			<!-- .card-body {
				-ms-flex: 1 1 auto;
				flex: 1 1 auto;
				min-height: 1px;
				padding: 1.25rem;
			} -->
			<div class="card-body">
				<!-- .card-title: margin-bottom: 0.75rem; -->
				<h5 class="card-title">Card title</h5>
				<!-- .card-subtitle {
					margin-top: -0.375rem;
					margin-bottom: 0;
				} -->
				<!-- .card-text:last-child: margin-bottom: 0; -->
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				<a href="#" class="btn btn-primary">Go somewhere</a>
			</div>
		</div>
```

##### card-heade, list-group, card-footer
``` html
		<div class="card" style="width: 18rem;">
			<!-- .card-header:first-child:border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; -->
			<!-- .card-header {
					padding: 0.75rem 1.25rem;
					margin-bottom: 0;
					background-color: rgba(0,0,0,.03);
					border-bottom: 1px solid rgba(0,0,0,.125);
			} -->
			<div class="card-header">
				Featured
			</div>
			<!-- .list-group-flush {
				border-radius: 0;
			} -->
			<!-- .list-group {
					display: flex;
					flex-direction: column;
					padding-left: 0;
					margin-bottom: 0;
					border-radius: 0.25rem;
			} -->
			<ul class="list-group list-group-flush">
				<!-- .list-group-flush>.list-group-item {
					border-width: 0 0 1px;
				} -->
				<!-- .list-group-item:first-child {
						border-top-left-radius: inherit;
						border-top-right-radius: inherit;
				} -->
				<!-- .list-group-item {
						position: relative;
						display: block;
						padding: 0.75rem 1.25rem;
						background-color: #fff;
						border: 1px solid rgba(0,0,0,.125);
				} -->
				<li class="list-group-item">An item</li>
				<li class="list-group-item">A second item</li>
				<li class="list-group-item">A third item</li>
			</ul>
			<!-- .card>.list-group+.card-footer {
				border-top: 0;
			} -->
			<!-- .card-footer:last-child;:	border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); -->
			<!-- .card-footer {
					padding: 0.75rem 1.25rem;
					background-color: rgba(0,0,0,.03);
					border-top: 1px solid rgba(0,0,0,.125);
			} -->
			<div class="card-footer">
				Card footer
			</div>
		</div>
```

##### Image overlays
``` html
		<div class="card bg-dark text-white">
			<img src="https://via.placeholder.com/600x300" class="card-img">
			<!-- .card-img-overlay {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				padding: 1.25rem;
				border-radius: calc(0.25rem - 1px);
			} -->
			<div class="card-img-overlay">
				<h5 class="card-title">Card title</h5>
				<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				<p class="card-text">Last updated 3 mins ago</p>
			</div>
		</div>
```

##### Horizontal
``` html
		<div class="card mb-3" style="max-width: 540px;">
			<div class="row no-gutters">
				<div class="col-md-4">
					<img class="img-fluid" src="https://via.placeholder.com/200x300">
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					</div>
				</div>
			</div>
		</div>
```

##### Card styles
``` html
		<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
			<!-- .card-header {
				padding: 0.75rem 1.25rem;
				margin-bottom: 0;
				background-color: rgba(0,0,0,.03);
				border-bottom: 1px solid rgba(0,0,0,.125);
			} -->
			<div class="card-header">Header</div>
			<div class="card-body">
				<h5 class="card-title">Primary card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
		<div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
			<div class="card-header">Header</div>
			<div class="card-body">
				<h5 class="card-title">Secondary card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
		<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
			<div class="card-header">Header</div>
			<div class="card-body">
				<h5 class="card-title">Success card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
```

##### Border
``` html
		<div class="card border-primary mb-3" style="max-width: 18rem;">
			<div class="card-header">Header</div>
			<div class="card-body text-primary">
				<h5 class="card-title">Primary card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
		<div class="card border-secondary mb-3" style="max-width: 18rem;">
			<div class="card-header">Header</div>
			<div class="card-body text-secondary">
				<h5 class="card-title">Secondary card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
		</div>
		<div class="card border-success mb-3" style="max-width: 18rem;">
			<div class="card-header">Header</div>
			<div class="card-body text-success">
				<h5 class="card-title">Success card title</h5>
				<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
			</div>
```

##### Card groups
``` html
		<!-- .card-group {
			display: flex;
			flex-flow: row wrap;
		} -->
		<div class="card-group">
			<!-- @media (min-width: 576px)
			.card-group>.card {
					flex: 1 0 0%;
					margin-bottom: 0;
			} -->
			<!-- .card {
					position: relative;
					display: flex;
					flex-direction: column;
					min-width: 0;
					word-wrap: break-word;
					background-color: #fff;
					background-clip: border-box;
					border: 1px solid rgba(0,0,0,.125);
					border-radius: 0.25rem;
			} -->
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
```

##### Card decks
``` html
		<!-- @media (min-width: 576px)
		.card-deck {
				display: flex;
				flex-flow: row wrap;
				margin-right: -15px;
				margin-left: -15px;
		} -->
		<div class="card-deck">
			<!-- @media (min-width: 576px)
			.card-deck .card {
					-ms-flex: 1 0 0%;
					flex: 1 0 0%;
					margin-right: 15px;
					margin-bottom: 0;
					margin-left: 15px;
			} -->
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">Card title</h5>
					<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
				</div>
				<div class="card-footer">
					<small class="text-muted">Last updated 3 mins ago</small>
				</div>
			</div>
		</div>
```

##### Grid cards
``` html
		<div class="row row-cols-1 row-cols-md-3">
			<!-- @media (min-width: 768px)
			.row-cols-md-3>* {
					-ms-flex: 0 0 33.333333%;
					flex: 0 0 33.333333%;
					max-width: 33.333333%;
			} -->
			<div class="col mb-4">
				<!-- .h-100:	height: 100%!important; -->
				<div class="card h-100">
					<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					</div>
				</div>
			</div>
			<div class="col mb-4">
				<div class="card h-100">
					<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a short card.</p>
					</div>
				</div>
			</div>
			<div class="col mb-4">
				<div class="card h-100">
					<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
					</div>
				</div>
			</div>
			<div class="col mb-4">
				<div class="card h-100">
					<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
					<div class="card-body">
						<h5 class="card-title">Card title</h5>
						<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					</div>
				</div>
			</div>
		</div>
```

##### Card columns
``` html
		<!-- @media (min-width: 576px)
		.card-columns {
				column-count: 3;
				column-gap: 1.25rem;
				orphans: 1;
				widows: 1;
		} -->
		<div class="card-columns">
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">(1)Card title that wraps to a new line</h5>
					<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				</div>
			</div>
			<div class="card p-3">
				<blockquote class="blockquote mb-0 card-body">
					<p>(2)A well-known quote, contained in a blockquote element.</p>
					<footer class="blockquote-footer">
						<small class="text-muted">
							Someone famous in <cite title="Source Title">Source Title</cite>
						</small>
					</footer>
				</blockquote>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">(3)Card title</h5>
					<p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
				</div>
			</div>
			<div class="card bg-primary text-white text-center p-3">
				<blockquote class="blockquote mb-0">
					<p>(4)A well-known quote, contained in a blockquote element.</p>
					<footer class="blockquote-footer text-white">
						<small>
							Someone famous in <cite title="Source Title">Source Title</cite>
						</small>
					</footer>
				</blockquote>
			</div>
			<div class="card text-center">
				<div class="card-body">
					<h5 class="card-title">(5)Card title</h5>
					<p class="card-text">This card has a regular title and short paragraphy of text below it.</p>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
				</div>
			</div>
			<div class="card">
				<img src="https://via.placeholder.com/200" class="card-img" alt="...">
			</div>
			<div class="card p-3 text-right">
				<blockquote class="blockquote mb-0">
					<p>(6)A well-known quote, contained in a blockquote element.</p>
					<footer class="blockquote-footer">
						<small class="text-muted">
							Someone famous in <cite title="Source Title">Source Title</cite>
						</small>
					</footer>
				</blockquote>
			</div>
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">(7)Card title</h5>
					<p class="card-text">This is another card with title and supporting text below. This card has some additional content to make it slightly taller overall.</p>
					<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
				</div>
			</div>
		</div>
```

#### [Dropdowns](/bootstrap-1/dropdowns)

##### Example(button and link)
``` html
		<div class="dropdown">
			<!-- data-toggle="dropdown": triggler dropdown  -->
			<!-- .dropdown-toggle {
				white-space: nowrap;
			} -->
			<!-- .dropdown-toggle::after {
				display: inline-block;
				margin-left: 0.255em;
				vertical-align: 0.255em;
				content: "";
				border-top: 0.3em solid;
				border-right: 0.3em solid transparent;
				border-bottom: 0;
				border-left: 0.3em solid transparent;
			} -->
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
				Dropdown button
			</button>
			<!-- .dropdown-menu {
				position: absolute;
				top: 100%;
				left: 0;
				z-index: 1000;
				display: none;
				float: left;
				min-width: 10rem;
				padding: 0.5rem 0;
				margin: 0.125rem 0 0;
				font-size: 1rem;
				color: #212529;
				text-align: left;
				list-style: none;
				background-color: #fff;
				background-clip: padding-box;
				border: 1px solid rgba(0, 0, 0, 0.15);
				border-radius: 0.25rem;
			} -->
			<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<!-- .dropdown-item {
					display: block;
					width: 100%;
					padding: 0.25rem 1.5rem;
					clear: both;
					font-weight: 400;
					color: #212529;
					text-align: inherit;
					white-space: nowrap;
					background-color: transparent;
					border: 0;
				} -->
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
			</div>
		</div>

		<div class="dropdown mt-3">
			<!-- data-toggle="dropdown": triggler dropdown 
			id="dropdownMenuButton": ｍap to id  -->
			<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
				Dropdown link
			</a>
		
			<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
			</div>
		</div>
```

##### Color
``` html
		<!-- Example single danger button -->
		<div class="btn-group">
			<button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Action
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
```

##### Split button
``` html
		<!-- Example split danger button -->
		<div class="btn-group">
			<button type="button" class="btn btn-danger">Action</button>
			<button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-expanded="false">
				<span class="sr-only">Toggle Dropdown</span>
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<!-- .dropdown-divider {
					height: 0;
					margin: 0.5rem 0;
					overflow: hidden;
					border-top: 1px solid #e9ecef;
				} -->
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
```

##### Sizing
``` html
		<!-- Large button groups (default and split) -->
		<div class="btn-group">
			<button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
				Large button
			</button>
			<div class="dropdown-menu">
				...
			</div>
		</div>

		<!-- Small button groups (default and split) -->
		<div class="btn-group">
			<button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
				Small button
			</button>
			<div class="dropdown-menu">
				...
			</div>
		</div>
```

##### Directions
``` html
		<!-- dropup -->
		<div class="btn-group dropup">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
			Dropup
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>

		<!-- dropright -->
		<div class="btn-group dropright">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Dropright
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>

		<!-- dropleft -->
		<div class="btn-group dropleft">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Dropleft
			</button>
			<div class="dropdown-menu">
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
```

##### Menu items(also support button)
``` html
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="false">
				Dropdown
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
				<button class="dropdown-item" type="button">Action</button>
				<button class="dropdown-item" type="button">Another action</button>
				<button class="dropdown-item" type="button">Something else here</button>
			</div>
		</div>
```

##### Active and disable
``` html
		<div class="dropdown">
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="false">
				Dropdown
			</button>
			<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
				<button class="dropdown-item" type="button">Action</button>
				<button class="dropdown-item active" type="button">Another action</button>
				<button class="dropdown-item disabled" type="button">Something else here</button>
			</div>
		</div>
```

##### Menu alignment(align to right)
``` html
		<div class="btn-group">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Right-aligned menu
			</button>
			<!-- .dropdown-menu-right {
				right: 0;
				left: auto;
			} -->
			<div class="dropdown-menu dropdown-menu-right">
				<button class="dropdown-item" type="button">Action</button>
				<button class="dropdown-item" type="button">Another action</button>
				<button class="dropdown-item" type="button">Something else here</button>
			</div>
		</div>
```

##### Responsive alignment
``` html
		<div class="btn-group">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static" aria-expanded="false">
				Right-aligned but left aligned when large screen
			</button>
			<!-- .dropdown-menu-right and .dropdown-menu{-sm|-md|-lg|-xl}-left. -->
			<div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
				<button class="dropdown-item" type="button">Action</button>
				<button class="dropdown-item" type="button">Another action</button>
				<button class="dropdown-item" type="button">Something else here</button>
			</div>
		</div>
```

##### Headers and Dividers
``` html
		<div class="btn-group">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Dropdown
			</button>
			<div class="dropdown-menu">
				<!-- .dropdown-header {
					display: block;
					padding: 0.5rem 1.5rem;
					margin-bottom: 0;
					font-size: .875rem;
					color: #6c757d;
					white-space: nowrap;
				} -->
				<h6 class="dropdown-header">Dropdown header</h6>
				<a class="dropdown-item" href="#">Action</a>
				<a class="dropdown-item" href="#">Another action</a>
				<a class="dropdown-item" href="#">Something else here</a>
				<!-- .dropdown-divider {
					height: 0;
					margin: 0.5rem 0;
					overflow: hidden;
					border-top: 1px solid #e9ecef;
				} -->
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">Separated link</a>
			</div>
		</div>
```

##### Dropdown text
``` html
		<div class="btn-group">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Dropdown
			</button>
			<div class="dropdown-menu p-4 text-muted" style="max-width: 200px;">
				<p>
					Some example text that's free-flowing within the dropdown menu.
				</p>
				<p class="mb-0">
					And this is more example text.
				</p>
			</div>
		</div>
```

##### Dropdown form
``` html
		<div class="btn-group">
			<button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
				Dropdown
			</button>
			<div class="dropdown-menu">
				<form class="px-4 py-3">
					<div class="form-group">
						<label for="exampleDropdownFormEmail1">Email address</label>
						<input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com">
					</div>
					<div class="form-group">
						<label for="exampleDropdownFormPassword1">Password</label>
						<input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password">
					</div>
					<div class="form-group">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="dropdownCheck">
							<label class="form-check-label" for="dropdownCheck">
								Remember me
							</label>
						</div>
					</div>
					<button type="submit" class="btn btn-primary">Sign in</button>
				</form>
				<div class="dropdown-divider"></div>
				<a class="dropdown-item" href="#">New around here? Sign up</a>
				<a class="dropdown-item" href="#">Forgot password?</a>
			</div>
		</div>
```

##### Dropdown options
Use data-offset or data-reference to change the location of the dropdown
``` html
		<div class="d-flex">
			<div class="dropdown mr-1">
				<!-- data-offset="10,20" -->
				<button type="button" class="btn btn-secondary dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-expanded="false" data-offset="10,20">
					Offset
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
				</div>
			</div>
			<div class="btn-group">
				<button type="button" class="btn btn-secondary">Reference</button>
				<!-- data-reference="parent" -->
				<!-- .dropdown-toggle-split -->
				<button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false" data-reference="parent">
					<span class="sr-only">Toggle Dropdown</span>
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">Separated link</a>
				</div>
			</div>
		</div>
```

#### [Progress](/bootstrap-1/progress)
##### Example
``` html
		<!-- .progress {
			display: flex;
			height: 1rem;
			overflow: hidden;
			line-height: 0;
			font-size: .75rem;
			background-color: #e9ecef;
			border-radius: 0.25rem;
		} -->
		<div class="progress mb-3">
			<!-- .progress-bar {
				display: flex;
				flex-direction: column;
				justify-content: center;
				overflow: hidden;
				color: #fff;
				text-align: center;
				white-space: nowrap;
				background-color: #007bff;
				transition: width .6s ease;
			} -->
			<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<!-- width: 25%; -->
			<div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress">
			<div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
```

##### Labels
``` html
		<div class="progress">
			<div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
		</div>
```

##### Height
set a height value on the .progress, so if you change that value the inner .progress-bar will automatically resize accordingly.
``` html
		<div class="progress mb-3" style="height: 1px;">
			<div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress" style="height: 20px;">
			<div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
```

##### Backgrounds
``` html
		<div class="progress mb-3">
			<div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
```

##### Multiple bars
Include multiple progress bars in a progress component
``` html
		<div class="progress">
			<div class="progress-bar" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
			<div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
			<div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
```

##### Striped
Add .progress-bar-striped to any .progress-bar to apply a stripe via CSS
``` html
	<div class="progress mb-3">
			<!-- .progress-bar-striped {
				background-image: linear-gradient(
		45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
				background-size: 1rem 1rem;
			} -->
			<div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress mb-3">
			<div class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped bg-warning" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
		</div>
```

##### Animated stripes
Add .progress-bar-animated to .progress-bar to animate the stripes right to left via CSS3 animations.
``` html
		<div class="progress">
			<!-- .progress-bar-animated {
				animation: 1s linear infinite progress-bar-stripes;
			} -->
			<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
		</div>
```

#### [Modal(互動視窗)](/bootstrap-1/modal)
##### Example
``` html
		<!-- data-toggle="modal" 
				data-target="#exampleModalLive" -->
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLive">
			Launch demo modal
		</button>
		<!-- .modal {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1050;
			display: none;
			width: 100%;
			height: 100%;
			overflow: hidden;
			outline: 0;
		} -->
		<!-- .fade {
			transition: opacity .15s linear;
		} -->
		<div class="modal fade" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" aria-hidden="true">
			<!-- .modal-dialog {
				position: relative;
				width: auto;
				margin: 0.5rem;
				pointer-events: none;
			} -->
			<div class="modal-dialog">
				<!-- .modal-content {
					position: relative;
					display: flex;
					flex-direction: column;
					width: 100%;
					pointer-events: auto;
					background-color: #fff;
					background-clip: padding-box;
					border: 1px solid rgba(0,0,0,.2);
					border-radius: 0.3rem;
					outline: 0;
				} -->
				<div class="modal-content">
					<!-- .modal-header {
						display: -ms-flexbox;
						display: flex;
						-ms-flex-align: start;
						align-items: flex-start;
						-ms-flex-pack: justify;
						justify-content: space-between;
						padding: 1rem 1rem;
						border-bottom: 1px solid #dee2e6;
						border-top-left-radius: calc(0.3rem - 1px);
						border-top-right-radius: calc(0.3rem - 1px);
					} -->
					<div class="modal-header">
						<!-- .modal-title {
							margin-bottom: 0;
							line-height: 1.5;
						} -->
						<h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
						<!-- button.close {
							padding: 0;
							background-color: transparent;
							border: 0;
						} -->
						<!-- data-dismiss="modal" -->
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<!-- .modal-body {
						position: relative;
						-ms-flex: 1 1 auto;
						flex: 1 1 auto;
						padding: 1rem;
					} -->
					<div class="modal-body">
						<p>Woohoo, you're reading this text in a modal!</p>
					</div>
					<!-- .modal-footer {
						display: flex;				-ms-flex-wrap: wrap;
						flex-wrap: wrap;
						align-items: center;
						justify-content: flex-end;
						padding: 0.75rem;
						border-top: 1px solid #dee2e6;
						border-bottom-right-radius: calc(0.3rem - 1px);
						border-bottom-left-radius: calc(0.3rem - 1px);
					} -->
					<div class="modal-footer">
						<!-- data-dismiss="modal" -->
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
```

##### Static backdrop
When backdrop is set to static, the modal will not close when clicking outside it or press Esc key
``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdropLive">
			Launch static backdrop modal
		</button>
		<!-- data-backdrop="static" -->
		<div class="modal fade" id="staticBackdropLive" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLiveLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="staticBackdropLiveLabel">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>I will not close if you click outside me. Don't even try to press escape key.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Understood</button>
					</div>
				</div>
			</div>
		</div>
```

##### Scrolling long content #1
When modals become too long for the user’s viewport or device, they scroll independent of the page itself
``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
			Launch demo modal
		</button>

		<div class="modal fade" id="exampleModalLong" tabindex="-1" aria-labelledby="exampleModalLongTitle"
			aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>What follows is just some placeholder text for this modal dialog. Sipping on Rosé, Silver Lake sun,
							coming up all lazy. It’s in the palm of your hand now baby. So we hit the boulevard. So make a wish, I'll
							make it like your birthday everyday. Do you ever feel already buried deep six feet under? It's time to
							bring out the big balloons. You could've been the greatest. Passport stamps, she's cosmopolitan. Your kiss
							is cosmic, every move is magic.</p>
						<p>We're living the life. We're doing it right. Open up your heart. I was tryna hit it and quit it. Her love
							is like a drug. Always leaves a trail of stardust. The girl's a freak, she drive a jeep in Laguna Beach.
							Fine, fresh, fierce, we got it on lock. All my girls vintage Chanel baby.</p>
						<p>Before you met me I was alright but things were kinda heavy. Peach-pink lips, yeah, everybody stares.
							This is no big deal. Calling out my name. I could have rewrite your addiction. She's got that, je ne sais
							quoi, you know it. Heavy is the head that wears the crown. 'Cause, baby, you're a firework. Like thunder
							gonna shake the ground.</p>
						<p>Just own the night like the 4th of July! I’m gon’ put her in a coma. What you're waiting for, it's time
							for you to show it off. Can't replace you with a million rings. You open my eyes and I'm ready to go, lead
							me into the light. And here you are. I’m gon’ put her in a coma. Come on, let your colours burst. So cover
							your eyes, I have a surprise. As I march alone to a different beat. Glitter all over the room pink
							flamingos in the pool.</p>
						<p>You just gotta ignite the light and let it shine! Come just as you are to me. Just own the night like the
							4th of July. Infect me with your love and fill me with your poison. Come just as you are to me. End of the
							rainbow looking treasure.</p>
						<p>I can't sleep let's run away and don't ever look back, don't ever look back. I can't sleep let's run away
							and don't ever look back, don't ever look back. Yes, we make angels cry, raining down on earth from up
							above. I'm walking on air (tonight). Let you put your hands on me in my skin-tight jeans. Stinging like a
							bee I earned my stripes. I went from zero, to my own hero. Even brighter than the moon, moon, moon. Make
							'em go, 'Aah, aah, aah' as you shoot across the sky-y-y! Why don't you let me stop by?</p>
						<p>Boom, boom, boom. Never made me blink one time. Yeah, you're lucky if you're on her plane. Talk about our
							future like we had a clue. Oh my God no exaggeration. You're original, cannot be replaced. The girl's a
							freak, she drive a jeep in Laguna Beach. It's no big deal, it's no big deal, it's no big deal. In another
							life I would make you stay. I'm ma get your heart racing in my skin-tight jeans. I wanna walk on your wave
							length and be there when you vibrate Never made me blink one time.</p>
						<p>We'd keep all our promises be us against the world. If you get the chance you better keep her. It's time
							to bring out the big, big, big, big, big, big balloons. I hope you got a healthy appetite. Don't let the
							greatness get you down, oh, oh yeah. Yeah, she's footloose and so fancy free. I want the jaw droppin', eye
							poppin', head turnin', body shockin'. End of the rainbow looking treasure.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
```

##### Scrolling long content #2
adding .modal-dialog-scrollable to .modal-dialog.
``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
			Launch demo modal
		</button>
		<div class="modal fade" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableTitle"
			aria-hidden="true">
			<!-- @media (min-width: 576px)
			.modal-dialog-scrollable {
					max-height: calc(100% - 3.5rem);
			}
			@media (min-width: 576px)
			.modal-dialog {
					max-width: 500px;
					margin: 1.75rem auto;
			} -->
			<div class="modal-dialog modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalScrollableTitle">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>What follows is just some placeholder text for this modal dialog. You just gotta ignite the light and let
							it shine! Come just as you are to me. Just own the night like the 4th of July. Infect me with your love
							and fill me with your poison. Come just as you are to me. End of the rainbow looking treasure.</p>
						<p>I can't sleep let's run away and don't ever look back, don't ever look back. I can't sleep let's run away
							and don't ever look back, don't ever look back. Yes, we make angels cry, raining down on earth from up
							above. I'm walking on air (tonight). Let you put your hands on me in my skin-tight jeans. Stinging like a
							bee I earned my stripes. I went from zero, to my own hero. Even brighter than the moon, moon, moon. Make
							'em go, 'Aah, aah, aah' as you shoot across the sky-y-y! Why don't you let me stop by?</p>
						<p>Boom, boom, boom. Never made me blink one time. Yeah, you're lucky if you're on her plane. Talk about our
							future like we had a clue. Oh my God no exaggeration. You're original, cannot be replaced. The girl's a
							freak, she drive a jeep in Laguna Beach. It's no big deal, it's no big deal, it's no big deal. In another
							life I would make you stay. I'm ma get your heart racing in my skin-tight jeans. I wanna walk on your wave
							length and be there when you vibrate Never made me blink one time.</p>
						<p>We'd keep all our promises be us against the world. In another life I would be your girl. We can dance,
							until we die, you and I, will be young forever. And on my 18th Birthday we got matching tattoos. So open
							up your heart and just let it begin. 'Cause she's the muse and the artist. She eats your heart out. Like
							Jeffrey Dahmer (woo). Pop your confetti. (This is how we do) I know one spark will shock the world, yeah
							yeah. If you only knew what the future holds.</p>
						<p>Sipping on Rosé, Silver Lake sun, coming up all lazy. It’s in the palm of your hand now baby. So we hit
							the boulevard. So make a wish, I'll make it like your birthday everyday. Do you ever feel already buried
							deep six feet under? It's time to bring out the big balloons. You could've been the greatest. Passport
							stamps, she's cosmopolitan. Your kiss is cosmic, every move is magic.</p>
						<p>We're living the life. We're doing it right. Open up your heart. I was tryna hit it and quit it. Her love
							is like a drug. Always leaves a trail of stardust. The girl's a freak, she drive a jeep in Laguna Beach.
							Fine, fresh, fierce, we got it on lock. All my girls vintage Chanel baby.</p>
						<p>Before you met me I was alright but things were kinda heavy. Peach-pink lips, yeah, everybody stares.
							This is no big deal. Calling out my name. I could have rewrite your addiction. She's got that, je ne sais
							quoi, you know it. Heavy is the head that wears the crown. 'Cause, baby, you're a firework. Like thunder
							gonna shake the ground.</p>
						<p>Just own the night like the 4th of July! I’m gon’ put her in a coma. What you're waiting for, it's time
							for you to show it off. Can't replace you with a million rings. You open my eyes and I'm ready to go, lead
							me into the light. And here you are. I’m gon’ put her in a coma. Come on, let your colours burst. So cover
							your eyes, I have a surprise. As I march alone to a different beat. Glitter all over the room pink
							flamingos in the pool.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
```

##### Vertically centered
Add .modal-dialog-centered to .modal-dialog to vertically center the modal at view
``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
			Vertically centered modal
		</button>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenteredScrollable">
			Vertically centered scrollable modal
		</button>
		<div class="modal fade" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<!-- .modal-dialog-centered {
				display: flex;
				align-items: center;
				min-height: calc(100% - 1rem);
			} -->
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Placeholder text for this demonstration of a vertically centered modal dialog.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModalCenteredScrollable" tabindex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenteredScrollableTitle">Modal title</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Placeholder text for this demonstration of a vertically centered modal dialog.</p>
						<p>In this case, the dialog has a bit more content, just to show how vertical centering can be added to a scrollable modal.</p>
						<p>What follows is just some placeholder text for this modal dialog. Sipping on Rosé, Silver Lake sun, coming up all lazy. It’s in the palm of your hand now baby. So we hit the boulevard. So make a wish, I'll make it like your birthday everyday. Do you ever feel already buried deep six feet under? It's time to bring out the big balloons. You could've been the greatest. Passport stamps, she's cosmopolitan. Your kiss is cosmic, every move is magic.</p>
						<p>We're living the life. We're doing it right. Open up your heart. I was tryna hit it and quit it. Her love is like a drug. Always leaves a trail of stardust. The girl's a freak, she drive a jeep in Laguna Beach. Fine, fresh, fierce, we got it on lock. All my girls vintage Chanel baby.</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
```

##### Using the grid
``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#gridSystemModal">
			Launch demo modal
		</button>
		<div class="modal fade" id="gridSystemModal" tabindex="-1" aria-labelledby="gridModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="gridModalLabel">Grids in modals</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					</div>
					<div class="modal-body">
						<div class="container-fluid bd-example-row">
							<div class="row">
								<div class="col-md-4">.col-md-4</div>
								<div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div>
							</div>
							<div class="row">
								<div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
								<div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
							</div>
							<div class="row">
								<div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
							</div>
							<div class="row">
								<div class="col-sm-9">
									Level 1: .col-sm-9
									<div class="row">
										<div class="col-8 col-sm-6">
											Level 2: .col-8 .col-sm-6
										</div>
										<div class="col-4 col-sm-6">
											Level 2: .col-4 .col-sm-6
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
		</div>
```

##### Sizes

|Size         |	Class   |	Modal max-width|
|-------------|---------|------|
|Small	      |.modal-sm|300px |
|Default      |	None	  |500px |
|Large	      |.modal-lg|800px |
|Extra  large	|.modal-xl|1140px|

``` html
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalXl">Extra large modal</button>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLg">Large modal</button>
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalSm">Small modal</button>
		
		<div class="modal fade" id="exampleModalXl" tabindex="-1" aria-labelledby="exampleModalXlLabel" aria-hidden="true">
			<div class="modal-dialog modal-xl">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title h4" id="exampleModalXlLabel">Extra large modal</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						...
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModalLg" tabindex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title h4" id="exampleModalLgLabel">Large modal</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						...
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModalSm" tabindex="-1" aria-labelledby="exampleModalSmLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title h4" id="exampleModalSmLabel">Small modal</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						...
					</div>
				</div>
			</div>
		</div>
```

#### [Pagination](/bootstrap-1/pagination)
##### Example
``` html
		<nav aria-label="Page navigation example">
			.pagination {
				display: flex;
				padding-left: 0;
				list-style: none;
				border-radius: 0.25rem;
			}
			<ul class="pagination">
				<li class="page-item">
					.page-item:first-child .page-link {
						margin-left: 0;
						border-top-left-radius: 0.25rem;
						border-bottom-left-radius: 0.25rem;
					}
					.page-link {
						position: relative;
						display: block;
						padding: 0.5rem 0.75rem;
						margin-left: -1px;
						line-height: 1.25;
						color: #007bff;
						background-color: #fff;
						border: 1px solid #dee2e6;
					}
					<a class="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">1</a></li>
				<li class="page-item"><a class="page-link" href="#">2</a></li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
				<li class="page-item">
					<a class="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>

		<nav aria-label="...">
			<ul class="pagination">
				<!-- .page-item.disabled .page-link {
					color: #6c757d;
					pointer-events: none;
					cursor: auto;
					background-color: #fff;
					border-color: #dee2e6;
				} -->
				<li class="page-item disabled">
					<a class="page-link">Previous</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">1</a></li>
				<!-- .page-item.active .page-link {
					z-index: 3;
					color: #fff;
					background-color: #007bff;
					border-color: #007bff;
				} -->
				<li class="page-item active" aria-current="page">
					<a class="page-link" href="#">2</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
				<li class="page-item">
					<a class="page-link" href="#">Next</a>
				</li>
			</ul>
		</nav>
```

##### Disabled and active states
``` html
		<nav aria-label="...">
			<ul class="pagination">
				<!-- .page-item.disabled .page-link {
					color: #6c757d;
					pointer-events: none;
					cursor: auto;
					background-color: #fff;
					border-color: #dee2e6;
				} -->
				<li class="page-item disabled">
					<a class="page-link">Previous</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">1</a></li>
				<!-- .page-item.active .page-link {
					z-index: 3;
					color: #fff;
					background-color: #007bff;
					border-color: #007bff;
				} -->
				<li class="page-item active" aria-current="page">
					<a class="page-link" href="#">2</a>
				</li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
				<li class="page-item">
					<a class="page-link" href="#">Next</a>
				</li>
			</ul>
		</nav>
```

##### Sizing
``` html
		<nav aria-label="...">
			<ul class="pagination pagination-lg">
				<!-- .pagination-lg .page-link {
					padding: 0.75rem 1.5rem;
					font-size: 1.25rem;
					line-height: 1.5;
				} -->
				<li class="page-item active" aria-current="page">
					<span class="page-link">1</span>
				</li>
				<li class="page-item"><a class="page-link" href="#">2</a></li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
			</ul>
		</nav>

		<nav aria-label="...">
			<!-- .pagination-sm .page-link {
				padding: 0.25rem 0.5rem;
				font-size: .875rem;
				line-height: 1.5;
			} -->
			<ul class="pagination pagination-sm">
				<li class="page-item active" aria-current="page">
					<span class="page-link">1</span>
				</li>
				<li class="page-item"><a class="page-link" href="#">2</a></li>
				<li class="page-item"><a class="page-link" href="#">3</a></li>
			</ul>
		</nav>
```

#### [Badges(標籤)](/bootstrap-1/badges)
##### Example
``` html
		<!-- .badge {
			display: inline-block;
			padding: 0.25em 0.4em;
			font-size: 75%;
			font-weight: 700;
			line-height: 1;
			text-align: center;
			white-space: nowrap;
			vertical-align: baseline;
			border-radius: 0.25rem;
			transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
		} -->
		<!-- .badge-secondary {
			color: #fff;
			background-color: #6c757d;
		} -->
		<h1>Example heading <span class="badge badge-secondary">New</span></h1>
		<h2>Example heading <span class="badge badge-secondary">New</span></h2>
		<h3>Example heading <span class="badge badge-secondary">New</span></h3>
		<h4>Example heading <span class="badge badge-secondary">New</span></h4>
		<h5>Example heading <span class="badge badge-secondary">New</span></h5>
		<h6>Example heading <span class="badge badge-secondary">New</span></h6>

		<button type="button" class="btn btn-primary mt-3">
			Notifications <span class="badge badge-light">4</span>
		</button>
```

##### Contextual variations(情境變化)
``` html
		<!-- .badge-primary {
			color: #fff;
			background-color: #007bff;
		} -->
		<span class="badge badge-primary">Primary</span>
		<span class="badge badge-secondary">Secondary</span>
		<span class="badge badge-success">Success</span>
		<span class="badge badge-danger">Danger</span>
		<span class="badge badge-warning">Warning</span>
		<span class="badge badge-info">Info</span>
		<span class="badge badge-light">Light</span>
		<span class="badge badge-dark">Dark</span>
```

##### Pill badges
``` html
		<!-- .badge-pill {
			padding-right: 0.6em;
			padding-left: 0.6em;
			border-radius: 10rem;
		} -->
		<span class="badge badge-pill badge-primary">Primary</span>
		<span class="badge badge-pill badge-secondary">Secondary</span>
		<span class="badge badge-pill badge-success">Success</span>
		<span class="badge badge-pill badge-danger">Danger</span>
		<span class="badge badge-pill badge-warning">Warning</span>
		<span class="badge badge-pill badge-info">Info</span>
		<span class="badge badge-pill badge-light">Light</span>
		<span class="badge badge-pill badge-dark">Dark</span>
```

##### Links use badge
``` html
		<a href="#" class="badge badge-primary">Primary</a>
		<a href="#" class="badge badge-secondary">Secondary</a>
		<a href="#" class="badge badge-success">Success</a>
		<a href="#" class="badge badge-danger">Danger</a>
		<a href="#" class="badge badge-warning">Warning</a>
		<a href="#" class="badge badge-info">Info</a>
		<a href="#" class="badge badge-light">Light</a>
		<a href="#" class="badge badge-dark">Dark</a>
```

#### [Collapse(折疊)](/bootstrap-1/collapse)
##### Example
+	data-toggle="collapse" is required
+	button with the data-target attribute
+	link with the href attribute 
+	.collapse hides content
+	.collapsing is applied during transitions
+	.collapse.show shows content

``` html
		<p>
			<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
				Link with href
			</a>
			<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
				Button with data-target
			</button>
		</p>
		<div class="collapse" id="collapseExample">
			<div class="card card-body">
				Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
			</div>
		</div>
```

##### Multiple targets
Multiple &lt;button&gt; or &lt;a&gt; can show and hide an element if they each reference it with their href or data-target attribute
``` html
		<p>
			<a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
			<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
			<button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
		</p>
		<div class="row">
			<div class="col">
				<div class="collapse multi-collapse" id="multiCollapseExample1">
					<div class="card card-body">
						Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
					</div>
				</div>
			</div>
			<div class="col">
				<div class="collapse multi-collapse" id="multiCollapseExample2">
					<div class="card card-body">
						Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
					</div>
				</div>
			</div>
		</div>
```

##### ccordion(手風琴) example
use .accordion as a wrapper
``` html
		<div class="accordion" id="accordionExample">
			<div class="card">
				<div class="card-header" id="headingOne">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
							Collapsible Group Item #1
						</button>
					</h2>
				</div>
		
				<!-- 1st show -->
				<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
					<div class="card-body">
						Some placeholder content for the first accordion panel. This panel is shown by default, thanks to the <code>.show</code> class.
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingTwo">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							Collapsible Group Item #2
						</button>
					</h2>
				</div>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
					<div class="card-body">
						Some placeholder content for the second accordion panel. This panel is hidden by default.
					</div>
				</div>
			</div>
			<div class="card">
				<div class="card-header" id="headingThree">
					<h2 class="mb-0">
						<button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
							Collapsible Group Item #3
						</button>
					</h2>
				</div>
				<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
					<div class="card-body">
						And lastly, the placeholder content for the third and final accordion panel. This panel is hidden by default.
					</div>
				</div>
			</div>
		</div>
```


#### [Tooltips(工具提示框 )](/bootstrap-1/tooltips)
##### Example
``` html
		<!-- title="Tooltip on top" : show data
		data-toggle="tooltip" : set for tooltip
		data-placement="top" : show direction -->
		<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
			Tooltip on top
		</button>
		<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
			Tooltip on right
		</button>
		<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
			Tooltip on bottom
		</button>
		<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
			Tooltip on left
		</button>
```

##### Custom HTML adde
``` html
		<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
			Tooltip with HTML
		</button>
```

##### javaScript
``` javascript
		// Enable tooltips
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();
		})
```


#### [List group](/bootstrap-1/listgroup)
##### Example
``` html
		<!-- .list-group {
			display: -ms-flexbox;
			display: flex;
			-ms-flex-direction: column;
			flex-direction: column;
			padding-left: 0;
			margin-bottom: 0;
			border-radius: 0.25rem;
		} -->
		<ul class="list-group">
			<!-- .list-group-item {
				position: relative;
				display: block;
				padding: 0.75rem 1.25rem;
				background-color: #fff;
				border: 1px solid rgba(0,0,0,.125);
			} -->
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
			<li class="list-group-item">A fourth item</li>
			<li class="list-group-item">And a fifth one</li>
		</ul>
```

##### Active items
Add .active to a .list-group-item
``` html
		<ul class="list-group">
			<!-- .list-group-item.active {
				z-index: 2;
				color: #fff;
				background-color: #007bff;
				border-color: #007bff;
			} -->
			<li class="list-group-item active" aria-current="true">An active item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
			<li class="list-group-item">A fourth item</li>
			<li class="list-group-item">And a fifth one</li>
		</ul>
```

##### Disabled items
Add .disabled to a .list-group-item
``` html
		<ul class="list-group">
			<!-- .list-group-item.disabled, .list-group-item:disabled {
				color: #6c757d;
				pointer-events: none;
				background-color: #fff;
			} -->
			<li class="list-group-item disabled" aria-disabled="true">A disabled item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
			<li class="list-group-item">A fourth item</li>
			<li class="list-group-item">And a fifth one</li>
		</ul>
```

##### Links and buttons
Use &lt;a&gt;s or &lt;button&gt;s to create actionable list group items with hover, disabled, and active states by adding .list-group-item-action.
``` html
		<div class="list-group mb-3">
			<a href="#" class="list-group-item list-group-item-action active" aria-current="true">
				The current link item
			</a>
			<a href="#" class="list-group-item list-group-item-action">A second link item</a>
			<a href="#" class="list-group-item list-group-item-action">A third link item</a>
			<a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
			<a class="list-group-item list-group-item-action disabled">A disabled link item</a>
		</div>

		<div class="list-group">
			<button type="button" class="list-group-item list-group-item-action active" aria-current="true">
				The current button
			</button>
			<button type="button" class="list-group-item list-group-item-action">A second item</button>
			<button type="button" class="list-group-item list-group-item-action">A third button item</button>
			<button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
			<button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
		</div>
```

##### Flush(緊貼)
Add .list-group-flush to remove some borders and rounded corners to render list group items edge-to-edge in a parent container
``` html
		<ul class="list-group list-group-flush">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
			<li class="list-group-item">A fourth item</li>
			<li class="list-group-item">And a fifth one</li>
		</ul>
```

##### Horizontal
Add .list-group-horizontal to change the layout of list group items from vertical to horizontal across all breakpoints
``` html
		<ul class="list-group list-group-horizontal mb-3">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
		</ul>
		<ul class="list-group list-group-horizontal-sm mb-3">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
		</ul>
		<ul class="list-group list-group-horizontal-md mb-3">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
		</ul>
		<ul class="list-group list-group-horizontal-lg mb-3">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
		</ul>
		<ul class="list-group list-group-horizontal-xl mb-3">
			<li class="list-group-item">An item</li>
			<li class="list-group-item">A second item</li>
			<li class="list-group-item">A third item</li>
		</ul>
```

##### Contextual(情境) classes
Contextual classes also work with .list-group-item-action.
``` html
		<ul class="list-group mb-3">
			<li class="list-group-item">A simple default list group item</li>
		
			<li class="list-group-item list-group-item-primary">A simple primary list group item</li>
			<li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
			<li class="list-group-item list-group-item-success">A simple success list group item</li>
			<li class="list-group-item list-group-item-danger">A simple danger list group item</li>
			<li class="list-group-item list-group-item-warning">A simple warning list group item</li>
			<li class="list-group-item list-group-item-info">A simple info list group item</li>
			<li class="list-group-item list-group-item-light">A simple light list group item</li>
			<li class="list-group-item list-group-item-dark">A simple dark list group item</li>
		</ul>

		<div class="list-group">
			<a href="#" class="list-group-item list-group-item-action">A simple default list group item</a>
			
			<!-- .list-group-item-primary.list-group-item-action:focus, .list-group-item-primary.list-group-item-action:hover {
				color: #004085;
				background-color: #9fcdff;
			} -->
			<a href="#" class="list-group-item list-group-item-action list-group-item-primary">A simple primary list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-secondary">A simple secondary list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-success">A simple success list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-danger">A simple danger list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-warning">A simple warning list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-info">A simple info list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-light">A simple light list group item</a>
			<a href="#" class="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item</a>
		</div>
```

#### [Carousel(輪播)](/bootstrap-1/carousel)
##### Example
1. The .active class needs to be added to one of the slides otherwise the carousel will not be visible
2. set a unique id on the .carousel for optional controls
3. Control and indicator elements must have a data-target attribute (or href for links) that matches the id of the .carousel element. 
4. Adding in the previous and next controls by &lt;button&gt; elements
5. Add captions to your slides easily with the .carousel-caption element within any .carousel-item. 

+ id="carouselExample" class="carousel slide" data-ride="carousel"
	+ class="carousel-indicators"
		+ data-target="#carouselExample" data-slide-to="0" class="active"
		+ data-target="#carouselExample" data-slide-to="1"
		+ ...
	+ carousel-inner:
		+	carousel-item active
			.carousel-caption(字幕)
		+	carousel-item
		+	... 
	+ &lt;button&gt; class="carousel-control-prev" data-target="#carouselExample" data-slide="prev"
		+ class="carousel-control-prev-icon"
	+ &lt;button&gt; class="carousel-control-next" data-target="#carouselExample" data-slide="next"
		+ class="carousel-control-next-icon"

``` html
	<div class="box bg-dark text-muted">
		<div id="carouselExample" class="carousel slide" data-ride="carousel">
			<ol class="carousel-indicators">
				<li data-target="#carouselExample" data-slide-to="0" class="active"></li>
				<li data-target="#carouselExample" data-slide-to="1"></li>
				<li data-target="#carouselExample" data-slide-to="2"></li>
			</ol>
			<div class="carousel-inner">
				<div class="carousel-item active text-center">
					<h3>1st</h3>
					<img src="https://picsum.photos/480/240?random=1" class="img-fluid">
					<div class="carousel-caption">
						<h5>First slide label</h5>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquam.</p>
					</div>
				</div>
				<div class="carousel-item text-center">
					<h3>2nd</h3>
					<img src="https://picsum.photos/480/240?random=2" class="img-fluid">
					<div class="carousel-caption">
						<h5>Second slide label</h5>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquam.</p>
					</div>
				</div>
				<div class="carousel-item text-center">
					<h3>3rd</h3>
					<img src="https://picsum.photos/480/240?random=3" class="img-fluid">
					<div class="carousel-caption">
						<h5>Third slide label</h5>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, aliquam.</p>
					</div>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-target="#carouselExample" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			</button>
			<button class="carousel-control-next" type="button" data-target="#carouselExample" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
			</button>
		</div>
```

##### Crossfade(交叉淡入淡出) + Individual interval
+ Add .carousel-fade to your carousel to animate slides with a fade transition instead of a slide.
+ Add data-interval="" to a .carousel-item to change the amount of time to delay between automatically cycling to the next item.

``` html
	<div class="box bg-dark text-muted">
		<div id="carouselExample2" class="carousel slide carousel-fade" data-ride="carousel">
			<div class="carousel-inner">
				<div class="carousel-item active text-center" data-interval="1000">
					<h3>1st</h3>
					<img src="https://picsum.photos/480/240?random=4" class="img-fluid">
					<div class="carousel-caption">
					</div>
				</div>
				<div class="carousel-item text-center" data-interval="2000">
					<h3>2nd</h3>
					<img src="https://picsum.photos/480/240?random=5" class="img-fluid">
				</div>
				<div class="carousel-item text-center" data-interval="3000">
					<h3>3rd</h3>
					<img src="https://picsum.photos/480/240?random=6" class="img-fluid">
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-target="#carouselExample2" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			</button>
			<button class="carousel-control-next" type="button" data-target="#carouselExample2" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
			</button>
		</div>
	</div>
```

##### Display autoplay
Does not include the data-ride attribute and has data-interval="false",it doesn’t autoplay.
``` html
	<div class="box bg-dark text-muted">
		<div id="carouselExample3" class="carousel slide" data-interval="false">
			<div class="carousel-inner">
				<div class="carousel-item active text-center" data-interval="2000">
					<h3>1st</h3>
					<img src="https://picsum.photos/480/240?random=7" class="img-fluid">
					<div class="carousel-caption">
					</div>
				</div>
				<div class="carousel-item text-center" data-interval="2000">
					<h3>2nd</h3>
					<img src="https://picsum.photos/480/240?random=8" class="img-fluid">
				</div>
				<div class="carousel-item text-center" data-interval="2000">
					<h3>3rd</h3>
					<img src="https://picsum.photos/480/240?random=9" class="img-fluid">
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-target="#carouselExample3" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			</button>
			<button class="carousel-control-next" type="button" data-target="#carouselExample3" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
			</button>
		</div>
	</div>
```
### Other class
#### list-unstyled
``` css
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
```

### Other
#### [fontawesome](/bootstrap-1/fontawesome)
##### [Configuration](https://fontawesome.com/v5.15/how-to-use/javascript-api/setup/configuration)
``` html
<html>
  <head>
    <script
      src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
      data-auto-a11y="true"
    ></script>
  </head>
  <body>
		<div>
			<i class="fas fa-hippo"></i>
		</div>

		<!-- Font Awesome Icons + Your Project’s Styling -->
		<div>
			<span style="font-size: 3em; color: Tomato;">
				<i class="fas fa-camera"></i>
			</span>

			<span style="font-size: 48px; color: Dodgerblue;">
				<i class="fas fa-camera"></i>
			</span>

			<span style="font-size: 3rem;">
				<span style="color: Mediumslateblue;">
				<i class="fas fa-camera"></i>
				</span>
			</span>
		</div>
	</body>
</html>
```

##### Free icon support fas ,far or fab only
``` html
		<div>
			<i class="fas fa-accessible-icon"></i>	
		</div>
		<div>
			<i class="far fa-accessible-icon"></i>	
		</div>
		<div>
			<i class="fal fa-accessible-icon"></i>	
		</div>
		<div>
			<i class="fad fa-accessible-icon"></i>	
		</div>
		<div>
			<i class="fab fa-accessible-icon"></i>
		</div>
		<i class="fas fa-clock"></i>
		<i class="far fa-clock"></i>
```

##### Using an &lt;i&gt; element or &lt;span&gt; element to reference the icon
``` html
		<i class="fas fa-camera"></i>
		<span class="fas fa-camera"></span>
```

##### Font Awesome Icons + Your Project’s Styling
``` html
		<span style="font-size: 3em; color: Tomato;">
			<i class="fas fa-camera"></i>
		</span>
		<span style="font-size: 48px; color: Dodgerblue;">
			<i class="fas fa-camera"></i>
		</span>
		<span style="font-size: 3rem;">
			<span style="color: Mediumslateblue;">
			<i class="fas fa-camera"></i>
			</span>
		</span>
```

##### Sizing Icons
fa-xs, fa-sm, fa-lg, fa-2x, fa-3x, fa-4x, fa-5x, fa-6x, fa-7x, fa-8x, fa-9x, or fa-10x
``` html
		<i class="fas fa-clock" style="font-size:120px;color:#2196F3"></i>
		<i class="far fa-clock" style="font-size:120px;color:#2196F3"></i>

			<!-- .fa-xs {
					font-size: .75em;
			} -->
			<i class="fas fa-clock fa-xs"></i>
			<!-- .fa-sm {
				font-size: .875em;
			} -->
			<i class="fas fa-clock fa-sm"></i>
			<!-- default -->
			<i class="fas fa-clock"></i>
			<!-- .fa-lg {
				font-size: 1.3333333333em;
				line-height: .75em;
				vertical-align: -0.0667em;
			} -->
			<i class="fas fa-clock fa-lg"></i>
			<!-- fa-2x:	font-size: 2em; -->
			<i class="fas fa-clock fa-2x"></i>
			<!-- fa-5x: font-size: 5em; -->
			<i class="fas fa-clock fa-5x"></i>
			<!-- fa-10x: font-size: 10em; -->
			<i class="fas fa-clock fa-10x"></i>
```

##### List Icons
The fa-ul and fa-li classes are used to replace default bullets in unordered lists
``` html
		<!-- .fa-ul {
			list-style-type: none;
			margin-left: 2.5em;
			padding-left: 0;
		} -->
		<ul class="fa-ul">
			<!-- .fa-ul>li: position: relative; -->
			<li><span class="fa-li"><i class="fas fa-check-square"></i></span>List Item</li>
			<li><span class="fa-li"><i class="fas fa-spinner"></i></span>List Item</li>
			<li><span class="fa-li"><i class="fas fa-pulse"></i></span>List Item</li>
			<li><span class="fa-li"><i class="fas fa-spinner fa-pulse"></i></span>List Item</li>
			<li><span class="fa-li"><i class="fas fa-square"></i></span>List Item</li>
		</ul>
```

##### Animated Icons
The fa-spin class gets any icon to rotate, and the fa-pulse class gets any icon to rotate with 8 steps
``` html
		<i class="fas fa-spinner fa-spin"></i>
		<i class="fas fa-circle-notch fa-spin"></i>
		<i class="fas fa-sync-alt fa-spin"></i>
		<i class="fas fa-cog fa-spin"></i>
		<i class="fas fa-cog fa-pulse"></i>
		<i class="fas fa-spinner fa-pulse"></i>
```

##### Rotated and Flipped(翻轉) Icons
The fa-rotate-* and fa-flip-* classes are used to rotate and flip icons
``` html
		<i class="fas fa-horse"></i>
		<i class="fas fa-horse fa-rotate-90"></i>
		<i class="fas fa-horse fa-rotate-180"></i>
		<i class="fas fa-horse fa-rotate-270"></i>
		<i class="fas fa-horse fa-flip-horizontal"></i>
		<i class="fas fa-horse fa-flip-vertical"></i>		
```

##### Stacked(堆疊) Icons
To stack multiple icons, use the fa-stack class on the parent, the fa-stack-1x class for the regularly sized icon, and fa-stack-2x for the larger icon.
The fa-inverse class can be used as an alternative icon color. You can also add larger icon classes to the parent to further control the sizing.
``` html
		<span class="fa-stack fa-lg">
			<i class="fas fa-circle fa-stack-2x"></i>
			<i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
		</span>
		fa-twitter (inverse) on fa-circle (solid)<br>
		
		<span class="fa-stack fa-lg">
			<i class="far fa-circle fa-stack-2x"></i>
			<i class="fab fa-twitter fa-stack-1x"></i>
		</span>
		fa-twitter on fa-circle (regular)<br>
		
		<span class="fa-stack fa-lg">
			<i class="fas fa-camera fa-stack-1x"></i>
			<i class="fas fa-ban fa-stack-2x text-danger" style="color:red;"></i>
		</span>
		fa-ban on fa-camera
```

##### Fixed Width Icons(fa-fw 設定固定寬度)
The fa-fw class is used to set icons at a fixed width
``` html
		<p>Fixed Width:</p>
		<!-- .fa-fw {
			text-align: center;
			width: 1.25em;
		} -->
		<div><i class="fas fa-arrows-alt-v fa-fw"></i> Icon 1</div>
		<div><i class="fas fa-band-aid fa-fw"></i> Icon 2</div>
		<div><i class="fab fa-bluetooth-b fa-fw"></i> Icon 3</div>
		
		<p>Without Fixed Width:</p>
		<div><i class="fas fa-arrows-alt-v"></i> Icon 1</div>
		<div><i class="fas fa-band-aid"></i> Icon 2</div>
		<div><i class="fab fa-bluetooth-b"></i> Icon 3</div>
```

##### Bordered and Pulled Icons
The fa-border, fa-pull-right or fa-pull-left classes are used for for pull quotes or article icons
``` html
		<!-- .fa-border {
				border: solid 0.08em #eee;
				border-radius: 0.1em;
				padding: 0.2em 0.25em 0.15em;
		} -->
		<!-- .fa-pull-left {
			margin-right: 0.3em;
			width: auto;
		} -->
		<i class="fas fa-quote-left fa-3x fa-pull-left fa-border"></i>
		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
```



##### 
``` html

```

### 參考資料
+ [Bootstrop 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
+ [Bootswatch](https://bootswatch.com/) : free themes for Bootstrap
+ [Bootstrap Shuffle](https://bootstrapshuffle.com/): Create Bootstrap templates in minutes
+ [Bootsnipp for Bootstrop](https://bootsnipp.com/)
+ [Best Website Examples of Bootstrap](https://www.awwwards.com/websites/bootstrap/)
+ [200+ Best Bootstrap Templates 2021 - Colorlib](https://colorlib.com/wp/cat/bootstrap/)
+ [BootstrapTaste:Best Bootstrap Templates and Themes 2021](https://bootstraptaste.com/)
+ [Bootstrap 4 demo](/ref/bootstrap-1) : local demo bootstrap 4
