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

<!--more-->

#### install
``` bash
 pip install scikit-learn
```

#### 評估模型
##### 均方誤差(Mean Square Error, MSE)
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

##### 均方根誤差(Root Mean Square Error, RMSE)
這是MSE的平方根,與MSE相比,RMSE對較大的誤差有更強的懲罰效果
RMSE = np.sqrt(MSE)

##### 平均絕對誤差(Mean Absolute Error, MAE)
這是預測值與實際值之間的絕對差平均值,這個指標能夠更好的反映預測誤差的實際大小
``` py
from sklearn.metrics import mean_absolute_error
	...
MAE = mean_absolute_error(y_true, y_pred)
```

##### R平方判定係數(Coefficient of Determination RMSE)
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
- 可用於機器學習任務,如分類,迴歸,聚類等
[UC Irvine Machine Learning Repository](https://archive.ics.uci.edu/)

##### 函數生成數據集(scikit-learn 函數生成數據)
也可以使用 scikit-learn 內建的函數生成下列類型的數據集:
- 線性分佈數據集
- 集群分佈數據集
- 循環分佈數據集

#### scikit-learn 生成數據實作
##### 線性分佈數據
```py
from sklearn.datasets import make_regression
	...
X, y = make_regression(n_samples, n_features, noise, random_state)
```
- n_samples : options,生成樣品數量, default 100
- n_features : options,生成特徵數量, default 100
- noise : option,加入高斯噪聲的標準差, default 0
- random_state : option,隨機生成器的種子,加入此參數確保每次生成數據一致, default None(每次生成數據不同)

``` py
# 產生數據
from sklearn.datasets import make_regression

X, y = make_regression(n_features=1, noise=0, random_state=0)
print("X 的資料格式:")
print(type(X), len(X))
print(f"陣列維度:{X.ndim}")
print(f"陣列外型:{X.shape}")
print(f"陣列大小:{X.size}")
print(f"前5個X的樣本:")
print(X[:5])
print("="*70)

print("y 的資料格式:")
print(type(y), len(y))
print(f"陣列維度:{y.ndim}")
print(f"陣列外型:{y.shape}")
print(f"陣列大小:{y.size}")
print(f"前5個y的樣本:")
print(y[:5])

# X 的資料格式:
# <class 'numpy.ndarray'> 100
# 陣列維度:2
# 陣列外型:(100, 1)
# 陣列大小:100
# 前5個X的樣本:
# X 為 2維 陣列
# [[ 0.12691209]
#  [ 0.44386323]
#  [ 0.76103773]
#  [ 0.95008842]
#  [-0.40317695]]
# ======================================================================
# y 的資料格式:
# <class 'numpy.ndarray'> 100
# 陣列維度:1
# 陣列外型:(100,)
# 陣列大小:100
# 前5個y的樣本:
# y 為 2維 陣列
# [  5.37923312  18.81336721  32.25696819  40.26997723 -17.08885844]
```

``` py
# 對照兩組數據
# 繪製多子圖
from sklearn.datasets import make_regression
import matplotlib.pyplot as plt

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 生成數據
X1, y1 = make_regression(n_features=1, noise=0, random_state=10)
X2, y2 = make_regression(n_features=1, noise=10, random_state=10)

# 建立兩個子圖畫布
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10,5))
# 繪第1個子圖
axs[0].scatter(X1, y1)
axs[0].set_title("Noise = 0")
# 繪第2個子圖
axs[1].scatter(X2, y2)
axs[1].set_title("Noise = 10")
# 設定標籤
for ax in axs:
    ax.set_xlabel("特徵")
    ax.set_ylabel("目標")

# 自動調整子圖間距
plt.tight_layout()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic3.png pic3 %}
</div>

##### 群集分佈數據
``` py
from sklearn.datasets import make_blobs
	...
X,y = make_blobs(n_samples, n_features, centers, random_state)
```
- n_samples : options,生成樣品數量, default 100
- n_features : options,每個樣品特徵數, default 2
- centers : option,整數或是一組[n_cneters, n_feature]的陣列,表示生成數據中心數量或固定中心位置, default 3
- random_state : option,隨機生成器的種子,加入此參數確保每次生成數據一致, default None(每次生成數據不同)

``` py
from sklearn.datasets import make_blobs

X,y = make_blobs(n_samples=500, n_features=2, centers=5, random_state=1)
print(f"輸出 X 的資料格式:")
print(type(X))
print(f"X 前 5 個樣本")
print(X[:5])
print("="*70)

print(f"X[:,0] 前 5 個樣本")
xx = X[:,0]
print(xx[:5])
print("="*70)

print(f"X[:,1] 前 5 個樣本")
xx = X[:,1]
print(xx[:5])
print("="*70)

print(f"y 前 5 個樣本")
print(y[:5])
# 輸出 X 的資料格式:
# <class 'numpy.ndarray'>
# X 前 5 個樣本
#  n_features=2 所以每個樣本有 2 個特徵
# [[-2.33022219  4.78405366]
#  [-2.27930436  1.79758281]
#  [-7.22570502 -3.79313579]
#  [-7.66603898 -7.59715459]
#  [-7.83173733 -3.70122759]]
# ======================================================================
# X[:,0] 前 5 個樣本
# [-2.33022219 -2.27930436 -7.22570502 -7.66603898 -7.83173733]
# ======================================================================
# X[:,1] 前 5 個樣本
# [ 4.78405366  1.79758281 -3.79313579 -7.59715459 -3.70122759]
# ======================================================================
# y 前 5 個樣本
# [0 4 3 2 3]
```

``` py
from sklearn.datasets import make_blobs
import matplotlib.pylab as plt

X1 ,y1 = make_blobs(n_samples=500, n_features=2, centers=5, random_state=1)
X2 ,y2 = make_blobs(n_samples=300, n_features=2, centers=3, random_state=1)

# 建立兩個子圖畫布
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10,5))
# 繪第1個子圖
axs[0].scatter(X1[:,0], X1[:,1], c=y1)
axs[0].set_title("First dataset")
# 繪第2個子圖
axs[1].scatter(X2[:,0], X2[:,1], c=y2)
axs[1].set_title("Second dataset")

plt.show()
``` 

<div style="max-width:500px">
  {% asset_img pic4.png pic4 %}
</div>

##### 交錯半月群集數據
玩具數據集通常指那些簡單,小型的人造數據集
make_moons 就是一個玩具數據集的例子,數據集的兩個類別會在二維空間中形成兩個交錯的半圓形

``` py
from sklearn.datasets import make_moons
	...
X, y = make_moons(n_samples, noise, random_state)
```
- n_samples : options,生成樣品數量, default 100
- noise : option,加入高斯噪聲的標準差, default None
- random_state : option,隨機生成器的種子,加入此參數確保每次生成數據一致, default None(每次生成數據不同)

``` py
from sklearn.datasets import make_moons
import matplotlib.pyplot as plt

X, y = make_moons(n_samples=200, noise=0.05, random_state=0)

print(f"X[:5] = {X[:5]}")
print(f"y={y}")

plt.scatter(X[:,0], X[:,1], c=y)
plt.show()

# X[:5] = [[ 0.81680544  0.5216447 ]
#  [ 1.61859642 -0.37982927]
#  [-0.02126953  0.27372826]
#  [-1.02181041 -0.07543984]
#  [ 1.76654633 -0.17069874]]
# y=[0 1 1 0 1 1 0 1 0 1 0 1 1 1 0 0 0 1 0 0 1 1 0 1 0 1 1 1 1 0 0 0 1 1 0 1 1
#  0 0 1 1 0 0 1 1 0 0 0 1 1 0 1 1 0 1 0 0 1 0 0 1 0 1 0 1 0 0 1 0 0 1 0 1 1
#  1 0 1 0 0 1 1 0 1 1 1 0 0 0 1 1 0 0 1 0 1 1 1 1 0 1 1 1 0 0 0 1 0 0 1 0 0
#  0 0 0 0 1 0 1 1 0 0 0 1 0 1 0 0 1 1 1 0 0 0 1 1 1 1 0 1 0 1 1 0 0 0 0 1 1
#  0 1 1 1 0 0 1 0 1 1 0 0 1 1 0 1 1 1 0 1 1 1 0 0 0 0 1 1 1 0 0 0 1 0 1 1 1
#  0 0 1 0 0 0 0 0 0 1 0 1 1 0 1]
```

<div style="max-width:500px">
  {% asset_img pic5.png pic5 %}
</div>

##### 環形結構分佈的群集數據
make_circles() 可以用來生成兩個環狀結構的數據集,一個圓內部的點和一個圓外部的點

``` py
from sklearn.datasets import make_circles
	...
X, y = make_circles(n_samples, noise, random_state)
```
- n_samples : options,生成樣品數量, default 100
- noise : option,加入高斯噪聲的標準差, default None
- random_state : option,隨機生成器的種子,加入此參數確保每次生成數據一致, default None(每次生成數據不同)

``` py
from sklearn.datasets import make_circles
import matplotlib.pyplot as plt

X, y = make_circles(n_samples=100, noise=0.05, random_state=0)

plt.scatter(X[:,0],  X[:,1], c=y)
plt.show()
```
<div style="max-width:500px">
  {% asset_img pic6.png pic6 %}
</div>

##### n-class 分類數據集

``` py
from sklearn.datasets import make_classification
	...
X, y = make_classification(n_samples=100, n_features=20, n_informative=2, n_redundant=2, n_repeated=0, n_classes=2,  n_clusters_per_class=2, weights=None, hypercube=True, shift=0.0, scale=1.0, shuffle=True, random_state=None)
```
- n_samples : options,生成樣品數量, default 100
- n_features : options,生成特徵數量, default 20
- n_informative : 信息特徵數, default 2
- n_redundant : 冗餘特徵數, default 1
- n_repeated : 重複特徵數, default 0
- n_classes : 數據集中類別數, default 2
- n_clusters_per_class : 每個類別的簇數, default 2
- weights : 每個類別樣品所佔的比例, default None
- hypercube : 如為 True 將簇放置在超立方體的頂點上, 如為 False 將簇放置在隨機多維標準常規中, default True
- shift : 特徵的均值, default 0.0
- scale : 特徵的標準差, default 1.0
- random_state : option,隨機生成器的種子,加入此參數確保每次生成數據一致, default None(每次生成數據不同)

``` py
from sklearn.datasets import make_classification
import matplotlib.pyplot as plt

X, y = make_classification(n_samples=100, n_features=2, n_informative=2, n_redundant=0, n_repeated=0, n_classes=2, random_state=1)

plt.scatter(X[:,0], X[:,1], marker='o', c=y, s=25, edgecolors='k' )
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic7.png pic7 %}
</div>

#### scikit-learn 數據預處理
scikit-learn 數據預處理 有以下幾點
- 數據清洗:消除數據中的噪聲,例如遺漏值,異常值或不一致的數據等
- 數據轉換:將數據轉換成適合模型學習的格式.如某些算法只能處理數值數據,所以我們需要將類別數據進行編碼
- 數據標準化/正規化:消除數據尺度的差異,讓所有的特徵都在尺度範圍內(數據標準化也稱為數據縮放)
- 特徵選擇/提取:有時我們要減少數據的維度以減少運算,或者將原始特徵轉換成更好表示數據的新特徵

##### 標準化數據 StandardScaler
有時使用 make_blobs()產生的數據,特徵資料的差異會很大,可使用StandardScaler()將資料標準化為平均數是0,變異數是1
``` py
from sklearn.preprocessing import StandardScaler
  ...
StandardScaler().fit_transform(data)
```

``` py
# 數據中心點變成 (0,0)
from sklearn.datasets import make_blobs
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

X, y = make_blobs(n_samples=200, n_features=2, centers=2, random_state=0)

X_sta = StandardScaler().fit_transform(X)

# 建立兩個子圖畫布
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10,5))

axs[0].scatter(X[:,0], X[:,1], c=y)
axs[0].set_title("一般數據")
axs[0].grid()

axs[1].scatter(X_sta[:,0], X_sta[:,1], c=y)
axs[1].set_title("標準化數據")
axs[1].grid()

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic8.png pic8 %}
</div>

##### 設定數據區間 MinMaxScaler
MinMaxScaler() 主要將資料縮放的最小值和最大值之間,通常是0到1,也可以是其他任意範圍
``` py
from sklearn.preprocessing import MinMaxScaler
  ...
MinMaxScaler().fit_transform(data)
```

``` py
# 縮放0和1之間數據
from sklearn.datasets import make_blobs
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

X, y = make_blobs(n_samples=200, n_features=2, centers=2, random_state=0)

X_sta = MinMaxScaler().fit_transform(X)

# 建立兩個子圖畫布
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10,5))

axs[0].scatter(X[:,0], X[:,1], c=y)
axs[0].set_title("一般數據")
axs[0].grid()

axs[1].scatter(X_sta[:,0], X_sta[:,1], c=y)
axs[1].set_title("縮放0和1之間數據")
axs[1].grid()

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic9.png pic9 %}
</div>

##### 特殊數據縮放 RobusterScaler
RobusterScaler()是一種特殊數據縮放器,特別適合處理含有異常的數據
對於包含異常值的數據,一般縮放方法,可能會受到異常值的影響
RobusterScaler()工作原理是數值減去中位數摒除以四分位距(IQR)IQR是第3四分位距(75%)和第1四分位距(20%)之間的差

``` py
from sklearn.preprocessing import MinMaRobusterScalerxScaler
  ...
RobusterScaler().fit_transform(data)
```

``` py
# RobustScaler 縮放數據
from sklearn.datasets import make_blobs
from sklearn.preprocessing import RobustScaler
import matplotlib.pyplot as plt

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

X, y = make_blobs(n_samples=200, n_features=2, centers=2, random_state=0)

X_sta = RobustScaler().fit_transform(X)

# 建立兩個子圖畫布
fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(10,5))

axs[0].scatter(X[:,0], X[:,1], c=y)
axs[0].set_title("一般數據")
axs[0].grid()

axs[1].scatter(X_sta[:,0], X_sta[:,1], c=y)
axs[1].set_title("RobustScaler 縮放數據")
axs[1].grid()

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic10.png pic10 %}
</div>

#### 機器學習 scikit-learn 入門
##### 身高與體重資料


#### 分類演算法 - 機器學習模型的性能評估

#### 機器學習必須學會的非數值資料轉換

#### 機器學習演算法

#### 使用隨機數據學習性迴歸










