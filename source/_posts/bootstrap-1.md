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

#### Grid options
|	|Extra small | Small|Medium|Large|Extra l|
|--------------|-------|------|-------|-------|------|
| |<576px	|≥576px|≥768px|≥992px|≥1200px|
|Max container width|	None (auto)	|540px	  |720px	  |960px	  |1140px  |
|Class prefix	      |.col-	      |.col-sm-	|.col-md-	|.col-lg-	|.col-xl-|

ps : Gutter width	30px (15px on each side of a column)

### Content
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
