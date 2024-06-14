---
title: scikit-learn
abbrlink: ae53
date: 2024-06-13 15:52:32
categories: Coding
tags:
	- python
	- ML
mathjax: true
---

### 基本
- scikit-learn 是一個開源的 python 機器學習庫,提供一系列監督及非監督學習算法
- 提供大量用於分類,迴歸,群集,降維,模型選擇和預處理工具
- 廣泛運用於數據挖掘和數據分析

#### 機器學習數據集
可使用以下數據集作為機器學習使用
##### scikit-learn 內建數據集
scikit-learn 提供一些數據集
- 鳶尾花 Iris
- 手寫數字 Digits
- 葡萄酒 Wine
- 威斯康辛州乳癌 Breast Cancer Wisconsin
- 波士頓房價 Boston House Prices

##### Kaggle 數據集
- Kaggle 是一個數據科學平台
- 數據涵蓋許多不同主題,包含但不限於金融,醫療,影像識別,自然語言處理,音訊分析
- Kaggle 有活躍的社區,你可以參加由Kaggle或其他機構主辦的數據科學競賽,並可以查看其他使用者對數據集的分析和模型
- 對每個數據集,可以找到相關的核心筆記本(kernels),討論和新聞,這些可幫助使用者理解和使用數據集
為了使用 Kaggle 數據集,需註冊一個帳號,你可以直接下載或使用API下載

##### UCI 數據集
- UCI 數據集由加州大學爾灣分校(University of California, Irvine)機器學習儲存庫提供
- 涵蓋醫學,金融,生物學和社會科學等
- 這些數據涉及的領域包含機器學習,統計學,模式識別,數據挖掘等

##### 函數生成數據集(scikit-learn 函數生成數據)

#### install
``` bash
 pip install scikit-learn
```

<!--more-->

### 評估模型
#### 均方誤差(Mean Square Error, MSE)
MSE是觀察值與預測值之間差值平方的平均值,MSE越小,表示模型的預測能力越好,公式如下
$ MSE = \frac{1}{n} \sum_{i-1}^{n}(y_i-\hat{y})$ 
$ y_i是觀察值 \hat{y}是預測值 n是樣本數量 $
``` py
from sklearn.metrics import mean_squared_error
	...
MSE = mean_squared_error(y_true, y_pred)
```

<div style="max-width:500px">
  {% asset_img pic1.png pic1 %}
</div>

#### 均方根誤差(Root Mean Square Error, RMSE)
這是MSE的平方根,與MSE相比,RMSE對較大的誤差有更強的懲罰效果
RMSE = np.sqrt(MSE)

#### 平均絕對誤差(Mean Absolute Error, MAE)
這是預測值與實際值之間的絕對差平均值,這個指標能夠更好的反映預測誤差的實際大小
``` py
from sklearn.metrics import mean_absolute_error
	...
MAE = mean_absolute_error(y_true, y_pred)
```

#### R平方判定係數(Coefficient of Determination RMSE)
R平方判定係數或簡稱判定係數,是一個迴歸模型性能評估指標,用於衡量模型資料變異程度.值介於0~1,越接近1表示模型對資料的擬合程度越好. 

<div style="max-width:500px">
  {% asset_img pic2.png pic2 %}
</div>

$ Adjusted R^2 = 1 - 	\frac{(1-R^2)*(n-1)}{(n-k-1)} $
$ n表示樣品數量,k表示特徵數量,R^2表示判定係數 $

判定係數公式如下:
$$ R^2(y,\hat{y}) = 1 - \frac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2} { \sum _{i=1}^{n}(y_i - \overline{y})^2 } $$

$ n 是數據量, \hat{y}_i 是迴歸函數的預估值,\overline{y} 是所有y的平均值 $
``` py
from sklearn.metrics import r2_score
	...
R2_score = r2_score(y_true, y_pred)
```

``` py
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np

x = [ 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,
     12,13,14,15,16,17,19,21,22,23,24]
y = [100, 88, 75, 60, 50, 55, 55, 56, 58, 58, 61,
      63, 68, 71, 71, 75, 76, 88, 93, 97, 97, 100]

coef = np.polyfit(x, y, 3)
model = np.poly1d(coef)
print(f"MSE:{mean_squared_error(y, model(x)):.3f}")
print(f"R2_Score:{r2_score(y, model(x)):.3f}")
# MSE:14.803
# R2_Score:0.944
```







