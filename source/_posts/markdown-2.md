---
title:  Markdown 使用
date: 2021-03-14 14:36:25
categories: 參考
tags: 
	- markdown
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
``` markdown
# 標題 1
## 標題 2
### 標題 3
#### 標題 4
##### 標題 5
###### 標題 6
```

# 標題 1
## 標題 2
### 標題 3
#### 標題 4
##### 標題 5
###### 標題 6
***

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
***我是粗斜體***
~~我是刪除線~~
<u>我是底線</u>
```
**我是粗體**
*我是斜體*
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

### 代辦事項
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




