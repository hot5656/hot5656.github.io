---
title: Put Hexo to GitHub
categories: Blog
tags:
  - hexo
  - github
abbrlink: dfd5
date: 2021-03-12 15:40:30
mathjax: true
---

## 基本設定

### Install Hexo

``` bash
npm install -g hexo-cli
```

### Dump version

``` bash
hexo version
```
<!--more-->

### inition Blog

``` bash
hexo init robert_blog
```

### Install all package for Blog

``` bash
cd robert_blog
npm install
```

### GitHub generate a respsitory(使用自己的帳號名稱)

``` bash
hot5656.github.io
``` 
<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

### 編輯部落格下檔案 _config.yml

``` yaml
deploy:
  type: git
  repository: 'https://github.com/hot5656/hot5656.github.io.git'
  branch: master
```

### install hexo-deployer-git(for _config.yml's type: git)

``` bash
npm install hexo-deployer-git --save
```


### 部署上 GitHub
``` bash
hexo d -g
```

### run web browser https://hot5656.github.io/
<div style="width:800px">
	{% asset_img pic3.png pic3 %}
</div>


### 本地執行
``` bash
hexo server
```
[http://localhost:4000/](http://localhost:4000/)
<div style="width:800px">
	{% asset_img pic4.png pic4 %}
</div>

### 建立新文章
``` bash
hexo new win7-1
```

<br>

## 設定檔案編輯(_config.yml)

###  更改匯總
``` yaml
# Site
title: Robert 雜記  # 部落格標題
subtitle: ''        # 副標題
description: ''     # 網站描述 
keywords:           # 網站關鍵字(以逗號隔開)，方便 SEO 
author: Robert Kao  # 姓名或暱稱
language: zh-TW     # 使用的語言
timezone: ''        # 留空以使用系統時間


abbrlink:
  alg: crc16  #support crc16(default) and crc32  
  rep: hex    #support dec(default) and hex

# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://hot5656.github.io/
permalink_defaults:
  author_name: "Robert"
# permalink: :year/:month/:day/:title/
permalink: :author_name/:abbrlink/


post_asset_folder: true

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
# theme: landscape
theme: next

# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repository: 'https://github.com/hot5656/hot5656.github.io.git'
  branch: master

sitemap:
  path: sitemap.xml
  
search:
  # path: search.xml
  path: search.json
  field: post
  content: true

```

###  網頁基本設定
``` yaml
# Site
title: Robert 雜記  # 部落格標題
subtitle: ''        # 副標題
description: ''     # 網站描述 
keywords:           # 網站關鍵字(以逗號隔開)，方便 SEO 
author: Robert Kao  # 姓名或暱稱
language: zh-TW     # 使用的語言
timezone: ''        # 留空以使用系統時間
```

### 設定圖片放於對應的目錄下
``` bash
post_asset_folder: true
```

### 設定 next theme
``` yaml
# theme: landscape
theme: next
```

<br>

## next theme(主題) 設定

###  更改匯總
``` yaml
# Schemes 外觀
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini

# Dark Mode
darkmode: false # 黑暗效果

menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat

local_search:
  enable: enable

motion: # 動畫效果
  enable: true

```

###  Custom file paths
``` yaml
# Define custom file paths.
# Create your custom files in site directory `source/_data` and uncomment needed files below.
custom_file_path:
  #head: source/_data/head.njk
  #header: source/_data/header.njk
  #sidebar: source/_data/sidebar.njk
  #postMeta: source/_data/post-meta.njk
  #postBodyEnd: source/_data/post-body-end.njk
  #footer: source/_data/footer.njk
  #bodyEnd: source/_data/body-end.njk
  #variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  #style: source/_data/styles.styl
```

### 設置菜單
#### 需安裝 hexo-theme-next
```bash
npm install hexo-theme-next --save
# copy next config to local
# windows command
copy node_modules\hexo-theme-next\_config.yml _config.next.yml
# linux command
cp node_modules/hexo-theme-next/_config.yml _config.next.yml
```
or 
```bash
git clone https://github.com/next-theme/hexo-theme-next themes/next
# copy next config to local
# windows command
copy themes\next\_config.yml _config.next.yml
# linux command
cp themes/next/_config.yml _config.next.yml
```



#### _config.next.yml
``` yaml
menu:
  home: / || fa fa-home
  #about: /about/ || fa fa-user
  tags: /tags/ || fa fa-tags
  categories: /categories/ || fa fa-th
  archives: /archives/ || fa fa-archive
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat
```

### 設置頭像
放於 source/images/
``` yaml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  url: /images/head.png #/images/avatar.gif
```

### 刪除歸檔頁 - 嗯..! 目前共有 17 篇文章。 繼續努力。
source\_data\styles.styl
```css
// 刪除歸檔頁 - 嗯..! 目前共有 17 篇文章。 繼續努力。
.archive .collection-title {
	display: none;
}
```

<br>

## 特定功能

### 文章搜尋功能
#### 需安裝 hexo-generator-searchdb
```bash
npm install hexo-generator-searchdb --save
```
#### _config.next.yml
``` yaml
local_search:
  enable: true
```
#### _config.next.yml 增加設定(因github 搜尋 path 僅接受 json format)
```yaml
search:
  # path: search.xml
  path: search.json
  field: post
  content: true
```
#### 必須先做 hexo clean
``` bash
hexo clean
hexo d -g
```
#### 顯示畫面
<div style="width:500px">
	{% asset_img pic5.png pic5 %}
</div>

### 加入 categories 和 tags

#### 修改 scaffolds/post.md
新增文章時,自動加入 categories, tags 項目
``` markdown
categories: 
tags:
```

#### 產生 categories, tags 頁
``` bash
hexo new page categories
hexo new page tags
```
<!--more-->

#### source/categories/index.md 修改
``` markdown
---
title: categories
date: 2021-03-15 12:17:46
type: categories # 不加入不能選擇 categories(next theme)
---
```

#### source/tags/index.md 修改
``` markdown
---
title: tags
date: 2021-03-15 12:17:59
type: tags # 不加入不能選擇 tags(next theme)
---
```

#### 文章設定 categories, tags
可包含多 tag
``` markdown
categories: 程序
tags: 
	- hexo
	- github
```

<br>

### sitemap.xml 製作(應用未加入 ......)
安裝 hexo-generator-sitemap
``` bash
npm install hexo-generator-sitemap --save
```
_config.next.yml (新加入)
``` yaml
sitemap:
  path: sitemap.xml
```
部署至 github
``` bash
# 若有一些異常, 先執行 hexo clean
hexo d -g
```
檢查是否部署完成
[https://hot5656.github.io/sitemap.xml](https://hot5656.github.io/sitemap.xml)
<div style="width:500px">
	{% asset_img pic6.png pic6 %}
</div>

向Google Search Console提交 
[https://search.google.com/search-console/welcome](https://search.google.com/search-console/welcome)
... 待處理


### 設定hexo-abbrlink

#### install hexo-abbrlink
``` bash
npm install hexo-abbrlink --save
```

#### set _config.yml
``` yaml
abbrlink:
  alg: crc16  #support crc16(default) and crc32  
  rep: hex    #support dec(default) and hex

# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://hot5656.github.io/
permalink_defaults:
  author_name: "Robert"
# permalink: :year/:month/:day/:title/
permalink: :author_name/:abbrlink/
```

### 閱讀次數統計（LeanCloud）...待研究

### 客製化設定

#### 設定代碼風格 - _config.next.yml
``` yaml
codeblock:
  # Code Highlight theme
  # All available themes: https://theme-next.js.org/highlight/
  theme:
    # light: default
    # dark: tomorrow-night
    light: gml
    dark: gml
```

#### 設定客製化路徑 - _config.next.yml
``` yaml
# Define custom file paths.
# Create your custom files in site directory `source/_data` and uncomment needed files below.
custom_file_path:
  #head: source/_data/head.njk
  #header: source/_data/header.njk
  #sidebar: source/_data/sidebar.njk
  #postMeta: source/_data/post-meta.njk
  #postBodyEnd: source/_data/post-body-end.njk
  #footer: source/_data/footer.njk
  #bodyEnd: source/_data/body-end.njk
  variable: source/_data/variables.styl # 更改變數值
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl # 更改 css 
```

#### 設定變數 - variables.styl
``` yaml
// 基本色系 - 由淺至深 https://colorhunt.co/palette/252860
$web-color-l1 = #f0e5d8;
$web-color-l2 = #bbdfc8;
$web-color-l3 = #75cfb8;
$web-color-l4 = #ffc478;

// 背景颜色
$body-bg-color = $web-color-l1;
$header-bg-color = $web-color-l1;
$footer-bg-color = $web-color-l1;
// 貼文背景顏色
$content-bg-color = $web-color-l2;
// 選項背景顏色
$menu-item-bg-color = $web-color-l3;
```

#### 設定 styles - styles.styl
``` yaml
// 設定 brand background
.site-brand-container {
	background: $web-color-l4;
}

// 刪除頭像邊框
.site-author-image {
    border: 0;
}

// 設定貼文內 h2 顏色(清楚分項用)
.post-body > h2 {
	color: orange; 
}

// 設定貼文內 tag a顏色(一般 web link 用)
// .post-body a {
// 	color: blue;
// 	border-bottom: 0;
// }
// .post-body a:hover {
// 	text-decoration: underline;
// }

// 設定貼文內 button, tag a 文字顏色(閱讀全文)
//.post-body .post-button a {
//	color: $btn-default-color;
//}

// 設定貼文內 button background 顏色(閱讀全文)
.post-body .btn {
	background: $web-color-l2;
}

// 刪除歸檔頁 - 嗯..! 目前共有 17 篇文章。 繼續努力。
.archive .collection-title {
	display: none;
}

// class 內 rect 
// for 時序圖(sequence) 文字背景
.sequence rect {
  fill: $content-bg-color;
}
```

### 字數統計
#### install by npm
``` bash
npm install hexo-word-counter --save
```

#### _config.yml(新加入)
``` yaml
# symbols_count_time:
symbols_count_time:
  symbols: true
  time: true
  total_symbols: true
  total_time: true
  exclude_codeblock: false
  awl: 4
  wpm: 275
  suffix: "mins."
```

#### _config.next.yml
``` yaml
# Post wordcount display settings
# Dependencies: https://github.com/next-theme/hexo-word-counter
symbols_count_time:
  separated_meta: true
  item_text_total: false
```

### 顯示閱讀百分比
#### _config.next.yml
``` yaml
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: true
  # Scroll percent label in b2t button.
  scrollpercent: true
```

### 更改 menu 說明 (zh-TW 繁體中文)
#### 新增 source/_data/languages.yml
``` yaml
zh-TW:
  menu:
    home: 首頁
    archives: 歸檔列表
    categories: 分類
    tags: 標籤
    about: 關於
    search: 搜尋
    schedule: 時間表
    sitemap: 網站地圖
    commonweal: 公益 404
```

### markdown 支持 流程圖
#### install by npm
``` bash
npm install --save hexo-filter-flowchart
```

#### 畫圖
``` bash
# 設程式碼為 flow
# 設定 元素
st=>start: 開始
in=>inputoutput: 输入
e=>end: 結束
op=>operation: 操作
cond=>condition: 條件
sub=>subroutine: 子程序
out=>inputoutput: 输出
# 畫圖
st(right)->in->op->cond
cond(yes,right)->out->e
cond(no)->sub
```

``` flow
st=>start: 開始
in=>inputoutput: 输入
e=>end: 結束
op=>operation: 操作
cond=>condition: 條件
sub=>subroutine: 子程序
out=>inputoutput: 输出

st(right)->in->op->cond
cond(yes,right)->out->e
cond(no)->sub
```

### markdown 支持 時序圖
#### install by npm
``` bash
npm install --save hexo-filter-sequence
```

#### source/_data/styles.styl
``` css
// class sequence 內 rect 
// for 時序圖(sequence) 文字背景
.sequence rect {
  fill: $content-bg-color;
}
```

#### 範例
``` bash
# 加入 class sequence
<div class="sequence">
# 設程式碼為 sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
</div>
```

<div class="sequence">
```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```
</div>

### markdown 支持 數學公式
#### install by npm
``` bash
# 不用安裝, 只是留下紀錄
# npm install hexo-filter-mathjax --save
```

#### _config.next.yml
``` bash
  mathjax:
    enable: true
```

#### 文章.md
``` bash
mathjax: true
```

#### 範例
```bash
# 下標 _ 改為 \_
# 條件表達式 每列 \\ 改為 \\\\
```

``` bash
# 行內公式
質能方程式$E = mc^2$
# 獨立公式
質能方程式$$E = mc^2$$
# ^ 上標, _ 下標
$$x = a\_{1}^n + a\_{2}^n + a\_{3}^n$$
# 分數使用\frac{分母}{分子} 不過推薦使用\cfrac來代替\frac，顯示公式不會太擠
$$\frac{1}{3} 與\cfrac{1}{3}$$
# {}因為有特殊作用因此當需要顯示大括號時一般使用\lbrace \rbrace來表示
$$f(x, y) = 100 * \lbrace[(x + y) * 3] - 5\rbrace$$
# 開根號 \sqrt[次数]{被开方数}
$$\sqrt[3]{X} \sqrt{5 - x}$$ 
# 極限
$g. \lim\limits_{n \rightarrow a} [f(x)/g(x)]=L/M$
# 條件表達式
$$
y=
\begin{cases}
-x,\quad x\leq 0 \\\\
x,\quad x>0
\end{cases}
$$

\begin{equation}
    f(n) =
    \begin{cases}
    n/2, & \text{if $n$ is even} \\\\
    3n+1, & \text{if $n$ is odd}
    \end{cases}
\end{equation}
```

質能方程式$E = mc^2$  
質能方程式$$E = mc^2$$  
上標,下標  
$$x = a\_{1}^n + a\_{2}^n + a\_{3}^n$$
分數使用  
$$\frac{1}{3} 與\cfrac{1}{3}$$  
括號
$$f(x, y) = 100 * \lbrace[(x + y) * 3] - 5\rbrace$$  
開根號  
$$\sqrt[3]{X} \sqrt{5 - x}$$  
極限  
$\lim\limits_{n \rightarrow a} [f(x)/g(x)]=L/M$
條件表達式  
$$
y=
\begin{cases}
-x,\quad x\leq 0 \\\\
x,\quad x>0
\end{cases}
$$

\begin{equation}
    f(n) =
    \begin{cases}
    n/2, & \text{if $n$ is even} \\\\
    3n+1, & \text{if $n$ is odd}
    \end{cases}
\end{equation}


### 加入 Disqus 留言版 
#### 申請留言版帳號
到 [Disqus](https://disqus.com/) 註冊帳號後並登入
+ I wnat to install Disqus on my site
<div style="width:500px">
	{% asset_img pic21.png pic21 %}
</div>

+ 基本設定
<div style="width:500px">
	{% asset_img pic22.png pic22 %}
</div>

#### set hexo's _config.next.yml
``` yaml
# Disqus
# For more information: https://disqus.com
disqus:
  enable: enable # enable Disqus
  shortname: hot5656-blog # Disqus Website Name for you
  count: true
```


<br>

## md檔 設定

### 顯示圖片(相關的圖片放於對應的目錄下)
``` bash
{% asset_img test.png This is an example image %}
```

### 顯示圖片(設定寬度)
``` bash
<div style="width:500px">
	{% asset_img pic3.png pic3 %}
</div>
```

### 顯示圖片(Markdown 規則-install hexo-image-link)
``` bash
npm install hexo-image-link --save
```

### 顯示圖片(Markdown 規則)
``` bash
![picture 1](hexo/test.png)
```
