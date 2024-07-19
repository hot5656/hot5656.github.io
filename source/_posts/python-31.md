---
title: Seaborn
abbrlink: af13
date: 2024-06-05 14:05:29
categories: Coding
tags:
	- python
---


### install
``` bash
pip install seaborn
```

<!--more-->

### example
#### 直方圖
{% post_link python-28 '# 使用 numpy binomial 產生業務分析資料繪圖' %}

#### kdeplot 繪製常態分佈曲線非常方便
{% post_link python-28 '# normal()' %}

#### 箱型圖
{% post_link python-33 '# 特徵箱形圖' %}

#### 熱圖
{% post_link python-33 '# 繪製皮爾遜相關係數熱圖' %}

### 數據
``` py
import seaborn as sns

# load 鐵達尼數據
titanic = sns.load_dataset('titanic')
```
