---
title: PyCharm
categories: Coding
tags:
  - python
  - pycharm
abbrlink: 90b6
date: 2021-03-28 18:32:25
---

## install(windows)

+ download [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows) windows Community version

<div style="width:500px">
	{% asset_img pic1.png pic1 %}
</div>

<div style="width:500px">
	{% asset_img pic1_2.png pic1_2 %}
</div>

<!--more-->

## create new project for all reference(pythonProject-home)
### 選擇 New Project
{% asset_img pic2.png pic2 %}


### 建立 reference projectw 
{% asset_img pic3.png pic3 %}

### Shift-F10 執行
{% asset_img pic4.png pic4 %}


## create new project 
### 選擇 New Project
{% asset_img pic5.png pic5 %}

### 建立 projectw
{% asset_img pic6.png pic6 %}


### 可選擇蓋掉原本視窗(This Window) 或 建立新視窗(Ne Window)
{% asset_img pic7.png pic7 %}

### 刪除 project 環境, venv 目錄(避免一直建立執行環境)
{% asset_img pic8.png pic8 %}

### 更改執行環境的位置(pythonProject-home)
{% asset_img pic9.png pic9 %}
<{% asset_img pic10.png pic10 %}

### Shift-F10 執行
{% asset_img pic11.png pic11 %}


## python 100 days code save to GitHub

### git init + add .gitignore
``` bash
# git init 
cd python_100ds
git init
# create .gitignore
git init
```

### add file and commit 
``` bash
git status
git commit -m "first commit"
```

### push code to GitHub
GitHub repository 要先建立
``` bash
git remote add origin https://github.com/hot5656/python_100ds.git
git push -u origin master
```

## PyCharm feature

### Spell Check

### 分割視窗
檔案標題按 mouse 右鍵 --> Splite Right
{% asset_img pic21.png pic21 %}
{% asset_img pic22.png pic22 %}

### Style Guide for Python
[PEP 8 -- Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)

### Show file history
+ File --> Local History --> Show History
{% asset_img pic23.png pic23 %}
{% asset_img pic24.png pic24 %}
+ Recover : 按 icon for Revert
{% asset_img pic25.png pic25 %}
{% asset_img pic26.png pic26 %}

### 變數改名
+ 選擇變數 --> 滑鼠右鍵 --> Refacor --> Rename
{% asset_img pic31.png pic31 %}

+ 輸入更改內容 --> 按 Preview 
{% asset_img pic32.png pic32 %}

+ 看一下更改位置 --> 按 Do Refactor
{% asset_img pic33.png pic33 %}

### Code 整理 
Code --> Reformat Code
{% asset_img pic34.png pic34 %}

### 找 function source 位置
Go To --> Implementation
{% asset_img pic35.png pic35 %}


### Insatll Python Package
+ File --> Setting
{% asset_img pic41.png pic41 %}

+ Project Interpreter --> +
{% asset_img pic42.png pic42 %}

+ Input Module Name --> Install Package
{% asset_img pic43.png pic43 %}


### 快捷鍵(Hot Key)
#### Debug
``` bash
Shift+F10 : Run main
Shift+F9  : debug Run main 
F7        : Setp In
F8        : Step out
F9        : debug 繼續執行
Ctrl+F8   : toggle the breakpoint.
```

#### Edit
```
Ctrl+F									: basic search
Alt+F7									: find usages
Alt+Shift+(up/down)    	: 程式上移或下移
Double Shift           	: search all files
click+Alt+shift 往下拉  : 多行編輯
```