---
title: wolfram-1
abbrlink: f4ca
date: 2024-01-04 15:26:50
categories:
tags:
---

### WolframAlpha prcatice
#### What is the capital of france?

<!--more-->

<div style="max-width:1000px">
	{% asset_img pic1.png pic1 %}
</div>

#### integrate E^x from 0 to 10
<div style="max-width:1000px">
	{% asset_img pic2.png pic2 %}
</div>

### run wolframcloud
+ new : My file -> New --> change file name
+ run : Shift + Enter

#### simple practice(shift + Enter)
``` bash
print["hello world!"]	
4+5
```

#### command 
``` bash
# shift + Enter :  run
5+ 8

# ; 抑制輸出
5+ 8;
# 不需順序
a = 1;
a + 2
a = 8; # then back run a+2 --> 

# 可選擇執行
# mouse-left shift move mouse enter - run all select
# run all
# Evaluation ->Evaluate all cells

# reset (a blue mean undefine)
# Evaluation -> Quit kernel
# a + 2 --> 2 + a mean a not define
# can delete all output
# Evaluation -> delete al loutput

#split cell and merge cell - wolfram cloud not support
```

``` bash
# cell styles
# Alt+9 : Input
# Alt+7 : Text 
# Alt+1 : Title
# Alt+4 : section
# Alt+5 : subsection
# Alt+6 : Subsubsection
# Alt+0 : support all select - wolfram cloud not support
```


``` bash
# colors and Stylesheet
# format : change size, color, background
# Stylesheet - wolfram cloud not support
```

#### basic arithmetic
``` bash
1 + 3 ---> 4
1/8 --> 1/8
N[1/8] --> 0.125
# last time count
N[%] --> 0.125 

# variable
b = 2 
2 * b --> 4
N[Exp[b]] --> 7.3896 # e 的 2次方
# blue mean undefine

```

``` bash
# "FullForm"完整型式 and "Head" argument
c = 1
	1
FullForm[2-d]
	Plus[2,Times[-1,d]] # -1 * d
Head[2-d]
	Plus
Head[2*c]
	Integer
Head[2*d]
	Times
c
	1
Head[2*c]
	Integer
```

``` bash
# automatic data types
Head[2*c]
	Intege
Head[2]
	Intege
Head[2.0]
	Real
Head[2+1I]
	Complex  # 複數
Head[2.0+0*I]
	Real
Head[2.0+0.0*I]
	Complex  # 複數
Head["Hello .."]
	String 
Head[var]
	Symbol
Head[var test]
	Times 
Head[var*test]
	Times
```

``` bash
# Conversion
Head[2.0]
	Real
Head[ToString[2.0]]
	String
ToString[2.0]
	2.
2.0
	2.
answer = "The answer is " <> ToString[2.0];
answer
	Theansweris2.
Print["The answer is ", 2.0]
	Print["The answer is ", 2.0]
```

``` bash
# syntax seek
# - wolfram cloud only output value, cannot see function
= Calculate the sum of all numbers between 1 and 10
	55
# https://reference.wolframcloud.com/language/ - search
# search plus, sum
```

### Ref
- [WolframAlpha](https://www.wolframalpha.com/) : : 可將 命令翻成 wolfram 語言
+ [WolframCloud](https://www.wolframcloud.com/) : free browser version
+ [Wolfram Mathematica](https://www.wolfram.com/mathematica/) : full version
+ [Search Wolfram](https://search.wolfram.com/) : search wolfram
+ [Wolfram document center](https://reference.wolframcloud.com/language/) : search function