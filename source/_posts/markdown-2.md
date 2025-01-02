---
title: Markdown 使用
categories: Front End
tags:
  - markdown
abbrlink: f48c
date: 2021-03-14 14:36:25
mathjax: true
---

### 分隔線
使用三個連續符號表示（-、*)
``` markdown
***
```
***

``` markdown
---
```
---
<!--more-->

### 標題
``` bash
# 標題 1
## 標題 2
### 標題 3
#### 標題 4
##### 標題 5
###### 標題 6
```

# 標題 1
## <font color=#555555>標題 2</font>
#### 標題 4
##### 標題 5
###### 標題 6
***

### 設定標題 2 的顏色
``` html
<style>
h2 {
  color: orange; 
}
</style>
```

### 清單
一般列表的使用彈性較高，-、+、* 等符號後方加上一個空白後都可以轉為列表，要表示下一個層級可多一個縮排或是兩個空白即可
``` markdown
- 這是清單
+ 這也是清單
* 這同樣是清單
	- 清單子項目
```
- 這是清單
+ 這也是清單
* 這同樣是清單
	- 清單子項目

### 數字清單
數字 + .作為開頭
``` markdown
1. 數字型清單
2. 第二個數字清單
2. 數字清單不需要連續數字
	3. 數字清單子項目
```
1. 數字型清單
2. 第二個數字清單
2. 數字清單不需要連續數字
	3. 數字清單子項目

如果段落文字需要以數字 + . 作為開頭，可以改為 數字 + 反斜線 + .
``` markdown
2020\. 不平靜的一年
```
2020\. 不平靜的一年

### 區塊程式碼
三個連續的反引號（`）開頭及結尾做為區塊的程式碼，並且可以在首行的位置補上該段程式碼的語言類別，藉此輸出具有 Highlight 的程式碼。
``` markdown
	``` c 
	while (condition) {
		statements;
	}
	...
```


``` c 
while (condition) {
	statements;
}
```

### 表格
``` markdown
| thead 1 | thrad 2 | thread 3 |
|---------|---------|----------|
| td      | td      | td       |
```
| thead 1 | thrad 2 | thread 3 |
|---------|---------|----------|
| td      | td      | td       |

``` markdown
| 預設對齊 | 靠左對齊 | 靠右對齊 | 置中對齊 |
|----- | :----- | -----: | :-----: |
| Text1 | Text2 | Text3 | Text4 |
| Text5 | Text6 | Text7 | Text8 |
```
| 預設對齊 | 靠左對齊 | 靠右對齊 | 置中對齊 |
|----- | :----- | -----: | :-----: |
| Text1 | Text2 | Text3 | Text4 |
| Text5 | Text6 | Text7 | Text8 |


### 連結
前者為 [ ]：中括號內需要補上連結的顯示文字。
後者為 ( )：小括號內補上的是連結路徑。
``` markdown
[Google](https://www.google.com.tw/)
```
[Google](https://www.google.com.tw/)

### 圖片
圖片也與連結結構接近，只不過前方多了 !
``` markdown
![picture 1](test.png)
```

### 文字字體
``` bash
**我是粗體**
*我是斜體*
以下空一行(---,***,- - -or* * *)
---
***我是粗斜體***
~~我是刪除線~~
<u>我是底線</u>
```
**我是粗體**
*我是斜體*
以下空一行
---
***我是粗斜體***
~~我是刪除線~~
<u>我是底線</u>


### 文字顏色
``` html
<font color=red>紅色</font>
<font color=yellow>黃色</font>
<font color=green>綠色</font>
<font color=blue>藍色</font>
<font color=purple>紫色</font>
```
<font color=red>紅色</font>
<font color=yellow>黃色</font>
<font color=green>綠色</font>
<font color=blue>藍色</font>
<font color=purple>紫色</font>

### 待辦事項
``` markdown
- [ ] 香蕉
- [x] 玉米
- [x] 蘋果
- [ ] 番茄
```
- [ ] 香蕉
- [x] 玉米
- [x] 蘋果
- [ ] 番茄

### 引用區塊
``` markdown
> 我勸你不要顧惜華貴的金縷衣，
> 我勸你一定要珍惜青春少年時。
> 花開宜折的時候就要抓緊去折，
> 不要等到花謝時只折了個空枝。
> >作者：杜秋娘(第二層)
```
> 我勸你不要顧惜華貴的金縷衣，
> 我勸你一定要珍惜青春少年時。
> 花開宜折的時候就要抓緊去折，
> 不要等到花謝時只折了個空枝。
> >作者：杜秋娘(第二層)

### 行內程式碼
如果要標記一小段行內程式碼，你可以用反引號把它包起來
``` bash
Use the `printf()` function.
``` 
Use the `printf()` function.


### 流程圖
設程式碼為 flow
設定 元素 tag=>type: content
基本型別
+ start
+ end
+ operation
+ subroutine
+ condition
+ inputoutput 

``` bash
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

### 時序圖
styles.styl 要做相對設定
加入 tag div(set class sequence)
設程式碼為 sequence
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

### 數學公式
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

# 矩陣與行列式
$ a =
\left(
\begin{matrix}
	a_x	\\\\
	a_y \\\\
	a_z 
\end{matrix}
\right)
$

$  a × b =
\left|
\begin{matrix}
	i 	& j 	& k		\\\\
	a_x & a_y & a_z \\\\
	b_x & b_y & b_z 
\end{matrix}
\right|
= 
\left(
\begin{matrix}
	a_yb_z - a_zb_y	\\\\
	a_zb_x - a_xb_z \\\\
	a_xb_y - a_yb_x 
\end{matrix}
\right)
$

# \tag{1} 為後面的標示
$$ \begin{matrix} 1 & 2 \\\\ 3 & 4 \end{matrix} \tag{1}$$
$$ \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix} \tag{1'}$$
$$ \begin{bmatrix} 1 & 2 \\\\ 3 & 4 \end{bmatrix} \tag{1-1}$$
$$ \begin{Bmatrix} 1 & 2 \\\\ 3 & 4 \end{Bmatrix} \tag{*}$$
$$ \begin{vmatrix} 1 & 2 \\\\ 3 & 4 \end{vmatrix} $$
$$ \begin{Vmatrix} 1 & 2 \\\\ 3 & 4 \end{Vmatrix} $$
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

矩陣與行列式
$ a =
\left(
\begin{matrix}
	a_x	\\\\
	a_y \\\\
	a_z 
\end{matrix}
\right)
$

$  a × b =
\left|
\begin{matrix}
	i 	& j 	& k		\\\\
	a_x & a_y & a_z \\\\
	b_x & b_y & b_z 
\end{matrix}
\right|
= 
\left(
\begin{matrix}
	a_yb_z - a_zb_y	\\\\
	a_zb_x - a_xb_z \\\\
	a_xb_y - a_yb_x 
\end{matrix}
\right)
$

$$ \begin{matrix} 1 & 2 \\\\ 3 & 4 \end{matrix} \tag{1}$$
$$ \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \end{pmatrix} \tag{1'}$$
$$ \begin{bmatrix} 1 & 2 \\\\ 3 & 4 \end{bmatrix} \tag{1-1}$$
$$ \begin{Bmatrix} 1 & 2 \\\\ 3 & 4 \end{Bmatrix} \tag{*}$$
$$ \begin{vmatrix} 1 & 2 \\\\ 3 & 4 \end{vmatrix} $$
$$ \begin{Vmatrix} 1 & 2 \\\\ 3 & 4 \end{Vmatrix} $$

### Ref
+ [如何在 Markdown 輸入數學公式及符號](https://blog.maxkit.com.tw/2020/02/markdown.html)



