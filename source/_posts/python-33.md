---
title: python-33 (2) 機器學習最強入門:基礎數學/機率/統計邁向AI真實數據
abbrlink: '6e92'
date: 2024-06-27 15:05:38
categories: Coding
tags:
	- python
	- book
	- ML
mathjax: true
---

### 邏輯迴歸 - 信用卡,葡萄酒,糖尿病

<!--more-->

#### 邏輯迴歸觀念
邏輯迴歸(logistic Regression)是一種常見的統計分析模型,邏輯迴歸經過一個邏輯(或稱 sigmoid)函數轉換,將輸出限制在0~1之間
##### 應用邏輯函數
線性函數觀念 :
$y = \beta_0 + \beta_1x$
將上述函數玷辱 Sigmoid 函數得到以下結果 :
$ f(x) = \frac{1}{e^{-x}} = \frac{1}{e^{-(\beta_0 + \beta_1x)}} $
有時以下列公式表示邏輯迴歸模型 :
$ P(Y=1|X) = \frac{1}{e^{-(\beta_0 + \beta_1x)}} $
P(Y=1|X) 代表給定變數X下,Y等於1的機率,實務上是使用大概似估計法(Maximum Linkelihood Estimation,MLE)來進行求解

``` py
# 邏輯迴歸運算
import numpy as np

def logistic_regression(beta0, beta1, x):
    return 1/( 1 + np.exp(-(beta0 + beta1 * x)))

beta0 = -6.5                                                                         
beta1 = 0.0002

x_values = [4000, 80000]
for x in x_values:
    print(f"x = {x:5d}, logistic迴歸輸出 {logistic_regression(beta0, beta1, x)}")

# x =  4000, logistic迴歸輸出 0.0033348073074133443
# x = 80000, logistic迴歸輸出 0.9999251537724895
```

#### 邏輯迴歸模型基礎應用
