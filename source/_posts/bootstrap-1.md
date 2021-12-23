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
#### Form
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

<!--more-->

### 參考資料
+ [Bootstrop 4](https://getbootstrap.com/docs/4.6/getting-started/introduction/)
+ [Bootswatch](https://bootswatch.com/) : free themes for Bootstrap
+ [Bootsnipp for Bootstrop](https://bootsnipp.com/)
+ [Best Website Examples of Bootstrap](https://www.awwwards.com/websites/bootstrap/)
+ [200+ Best Bootstrap Templates 2021 - Colorlib](https://colorlib.com/wp/cat/bootstrap/)
+ [BootstrapTaste:Best Bootstrap Templates and Themes 2021](https://bootstraptaste.com/)
+ [Bootstrap 4 demo](/ref/bootstrap-1) : local demo bootstrap 4
