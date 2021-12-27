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
		+ a + nav-link : set for nav-link
	+ li(dropdown)
		+ nav-item : set basic nav item
		+ dropdown : set support dropdown
		+ a + nav-link : set for nav-link
			+ dropdown-toggle: 
			+ data-toggle="dropdown": dropdown control
		+ div + dropdown-menu : dropdown form
			+ a + dropdown-item : dropdown item
			+ div + dropdown-divider: 分隔線
##### Simple examples
``` html
```


#### Form
+ form
	+ form-inline: form basic setting
	+ input + form-control : inpuit basic setting
	+ button : bttton for form
``` js
<form >
  <div className="form-group">
    <label className="text-muted">Name</label>
    <input
      onChange={handleChange}
      name="name"
      type="text"
      className="form-control"
    />
  </div>
  <button className="btn btn-outline-primary">Create Category</button>
</form>
```


``` js
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


### 參考資料
+ [Bootstrop 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
+ [Bootswatch](https://bootswatch.com/) : free themes for Bootstrap
+ [Bootstrap Shuffle](https://bootstrapshuffle.com/): Create Bootstrap templates in minutes
+ [Bootsnipp for Bootstrop](https://bootsnipp.com/)
+ [Best Website Examples of Bootstrap](https://www.awwwards.com/websites/bootstrap/)
+ [200+ Best Bootstrap Templates 2021 - Colorlib](https://colorlib.com/wp/cat/bootstrap/)
+ [BootstrapTaste:Best Bootstrap Templates and Themes 2021](https://bootstraptaste.com/)
+ [Bootstrap 4 demo](/ref/bootstrap-1) : local demo bootstrap 4
