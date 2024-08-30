---
title: (3) 機器學習最強入門:基礎數學/機率/統計邁向AI真實數據
abbrlink: acd3
date: 2024-08-05 15:22:28
categories: Coding
tags:
	- python
	- book
	- ML
mathjax: true
---

### 支援向量機 - 鳶尾花,乳癌,汽車燃料

<!--more-->

#### 支援向量機基礎觀念
##### 基礎觀念
<div style="max-width:500px">
  {% asset_img pic1.png pic1 %}
</div>

##### 最大區間分隔
<div style="max-width:500px">
  {% asset_img pic2.png pic2 %}
</div>

##### 認識支援向量,決策邊界 與 超平面
<div style="max-width:500px">
  {% asset_img pic3.png pic3 %}
</div>

##### 超平面公式(二維為例)
在二維空間中，超平面退化成一條直線。支援向量機 (SVM) 的目標是在二維平面上找到一條最適合的直線，將不同的數據點分類到兩個類別中，同時最大化兩類別之間的邊界。
- 超平面（直線）公式
	在二維空間中，一條直線的方程可以表示為：
	$w_1x_1 + w_2x_2 + b = 0$
	其中：
	- $(x_1,x_2)是二維平面上的一個點$
	- $(w_1,w_2)是權重向量，決定了直線的方向$
	- b 是偏置，用來調整直線的位置
- 決策邊界
	這條直線將平面分為兩部分。在 SVM 中，這個直線是決策邊界，用於區分兩個類別。對於一個數據點$(x_1,x_2)$，我們可以使用決策函數來決定它位於直線的哪一側
	$f(x_1,x_2) = w_1x_1 + w_2x_2 + b$
	- $f(x_1,x_2)>0，則這個點被分類為一類（例如正類，標記為 +1）
	- $f(x_1,x_2)<0，則這個點被分類為一類（例如正類，標記為 -1）
- 支援向量與間隔
	支援向量是離超平面最近的數據點。它們定義了「間隔」，即從超平面到支援向量的最小距離。SVM 的目標是最大化這個間隔，以便增加模型的魄力和對未知數據的泛化能力。
	在二維空間中，間隔是從超平面到支援向量的垂直距離。具體來說，如果我們的數據點是線性可分的，SVM 會找到兩條平行的	虛線：
	- $一條是 w_1x_1 + w_2x_2 + b = 1$
	- $另一條是 w_1x_1 + w_2x_2 + b = -1$

	這兩條虛線之間的距離是$\frac{2}{∥w∥}$，目標是最大化這個距離
	∥w∥ 定義為權重向量中各個分量平方和的平方根：
	$∥w∥=\sqrt{w_1^2+w_2^2...+w_n^2}$
	$其中，𝑤 = (w_1,w_2, ...,w_n) 是SVM模型的權重向量$

#### 支援向量機 - 分類運用的基礎實例
##### 繪製10個數據點
``` py
import numpy as np
import matplotlib.pyplot as plt

# 建立10個點,5個為分類A,5個為分類B
X = np.array([[1, 2.5], [0.5, 2], [2, 2], [1.5, 1], [2.5, 1.3],
              [3, 3.5], [4.5, 3.5], [4, 4], [2.5, 4.5], [3.5, 3] ])
y = np.array(['A','A','A','A','A','B','B','B','B','B',])

# 繪製點,A 'o', B '*'
for i, marker in zip(['A', 'B'], ['o', '*']):
    plt.scatter(X[y==i, 0], X[y==i, 1], marker=marker, label=i )

plt.xlim(0, 5)
plt.ylim(0, 5)
plt.xlabel(r'$x_{1}$', fontsize=14)
plt.ylabel(r'$x_{2}$', fontsize=14)
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic4.png pic4 %}
</div>

##### 支援向量語法
``` py
import numpy as np
from sklearn import svm

# 建立10個點,5個為分類A,5個為分類B
X = np.array([[1, 2.5], [0.5, 2], [2, 2], [1.5, 1], [2.5, 1.3],
              [3, 3.5], [4.5, 3.5], [4, 4], [2.5, 4.5], [3.5, 3] ])
y = np.array(['A','A','A','A','A','B','B','B','B','B',])

# 建立 linear svc+耦合
svc = svm.SVC(kernel='linear')
svc.fit(X, y)

# 支持向量 表 決策邊的向量
print(f'權重係數         :{svc.coef_}')
print(f'截距(偏置)       :{svc.intercept_}')
print(f'支持向量索引     :{svc.support_}')
print(f'支持向量         :\n{svc.support_vectors_}')
print(f'每個類別支援向量數:{svc.n_support_}')

# 權重係數         :[[0.79988954 0.80016569]]
# 截距(偏置)       :[-4.20015648]
# 支持向量索引     :[2 5 9]
# 支持向量         :[[2.  2. ]
#  [3.  3.5]
#  [3.5 3. ]]
# 每個類別支援向量數:[1 2]
#   w1 = 0.79988954
#   w2 = 0.80016569
#   d = -4.20015648
```

##### 推導超平面斜率
$g(x) = w_1x_1 + w_2x_2 + b = 0$
$所以經過點 (0,\frac{-b}{w_2}) and (\frac{-b}{w_1},0)$
$斜率(slope) = \frac{\Delta{y}}{\Delta{x}} = \frac{\frac{-b}{w_2}}{\frac{b}{w_1}} = \frac{-w_1}{w_2} $

##### 繪製超平面和決策邊界
``` py
import numpy as np
from sklearn import svm
import matplotlib.pyplot as plt
from joblib import dump

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

# 建立10個點,5個為分類A,5個為分類B
X = np.array([[1, 2.5], [0.5, 2], [2, 2], [1.5, 1], [2.5, 1.3],
              [3, 3.5], [4.5, 3.5], [4, 4], [2.5, 4.5], [3.5, 3] ])
y = np.array(['A','A','A','A','A','B','B','B','B','B',])

# 繪製點,A 'o', B '*'
for i, marker in zip(['A', 'B'], ['o', '*']):
    plt.scatter(X[y==i, 0], X[y==i, 1], marker=marker, label=i )

# 建立 linear svc+耦合
svc = svm.SVC(kernel='linear')
svc.fit(X, y)

# 權重, 偏置值
w = svc.coef_[0]
slope = -w[0] / w[1]
b = svc.intercept_[0]
# 儲存模型
dump(svc, 'svc28_3.joblib')

# 繪製超平面
xx = np.linspace(0, 5)
# same as yy = (-b - w[0] * xx)/w[1], but use slope
# yy_slope = slope * xx - ( b / w[1])
yy = (-b - w[0] * xx)/w[1]
plt.plot(xx, yy, linewidth=2, color='green')

# 繪製邊界1
sv = svc.support_vectors_[0]
# b = -(w[0]*sv[0] + w[1]*sv[1])
yy_1 = ((w[0]*sv[0] + w[1]*sv[1]) - w[0] * xx)/w[1]
plt.plot(xx, yy_1, 'b--')

# 繪製邊界2
sv = svc.support_vectors_[-1]
yy_2 = ((w[0]*sv[0] + w[1]*sv[1]) - w[0] * xx)/w[1]
plt.plot(xx, yy_2, 'b--')

# xx = np.linspace(0, 5)
# same as yy = (-b - w[0] * xx)/w[1], but use slope
# yy_slope = slope * xx - ( b / w[1])
# yy = (-b - w[0] * xx)/w[1]
# plt.plot(xx, yy, linewidth=2, color='green')

# 用圓圈繪製支援向量
# s=100 設置每個散點的大小
# facecolors='none', 'none' 表示點沒有填充顏色
# edgecolors='k', 設置點的邊界顏色 'k' 是黑色的縮寫
plt.scatter(svc.support_vectors_[:,0], svc.support_vectors_[:,1],
            s=100, facecolors='none', edgecolors='k')

plt.xlim(0, 5)
plt.ylim(0, 5)
plt.title('支援向量機-繪製超平面及決策邊界')
plt.xlabel(r'$x_{1}$', fontsize=14)
plt.ylabel(r'$x_{2}$', fontsize=14)
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic5.png pic5 %}
</div>

##### 數據分類
``` py
from joblib import load

# 載入模型
svc = load('svc28_3.joblib')

while(1):
    x = eval(input("請輸入 x 座標:"))
    y = eval(input("請輸入 y 座標:"))
    print(f"({x},{y}) 分類是:{svc.predict([[x,y]])[0]}")
    z = input(f'是否繼續(y/n) : ')
    if z == 'n' or z == 'N':
        break

# 請輸入 x 座標:3
# 請輸入 y 座標:3
# (3,3) 分類是:B
# 是否繼續(y/n) : y
# 請輸入 x 座標:2
# 請輸入 y 座標:2
# (2,2) 分類是:A
```

##### decision_function()
- decision_function() 支持向量機(SVM),主要用來計算每個樣本到決策邊界(超平面)的距離

###### 計算樣本到決策邊界(超平面)的距離
``` py
# 計算樣本到決策邊界(超平面)的距離
from sklearn import svm

# 特徵數據: 重量,顏色
X = [ [150, 1], [170, 1], [130, 2], [140, 2],
      [200, 3], [210, 3], [180, 3], [220, 3]]

# 標籤數據
y = ['蘋果','蘋果','蘋果','蘋果',
     '橘子','橘子','橘子','橘子']

# 創建並訓練SVM分類器
clf = svm.SVC()
clf.fit(X, y)

# 使用訓練好的分類器來預測新的樣本
print(f"預測[160,1] 是 : {clf.predict([[160,1]])[0]}")
print(f"預測[190,3] 是 : {clf.predict([[190,3]])[0]}")

# 輸出一個數值,表示樣本到超平面的距離
# decision_function() 傳回距超平面的距離
print(f"[160,1] 到超平面的距離 : {clf.decision_function([[160,1]])[0]}")
print(f"[190,3] 到超平面的距離 : {clf.decision_function([[190,3]])[0]}")
print(f"[250,3] 到超平面的距離 : {clf.decision_function([[250,3]])[0]}")

# 預測[160,1] 是 : 蘋果
# 預測[190,3] 是 : 橘子
# [160,1] 到超平面的距離 : 0.3718262578491399
# [190,3] 到超平面的距離 : -0.3712206727264994
# [250,3] 到超平面的距離 : -1.3454929221350937
```

###### 用 decision_function() 繪製邊界線
``` py
# 用 decision_function() 繪製邊界線
import numpy as np
from sklearn import svm
import matplotlib.pyplot as plt
from joblib import dump

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

# 建立10個點,5個為分類A,5個為分類B
X = np.array([[1, 2.5], [0.5, 2], [2, 2], [1.5, 1], [2.5, 1.3],
              [3, 3.5], [4.5, 3.5], [4, 4], [2.5, 4.5], [3.5, 3] ])
y = np.array(['A','A','A','A','A','B','B','B','B','B',])

# 建立線性 SVM 模型
svc = svm.SVC(kernel='linear')
svc.fit(X, y)

# 繪製點,A 'o', B '*'
for i, marker in zip(['A', 'B'], ['o', '*']):
    plt.scatter(X[y==i, 0], X[y==i, 1], marker=marker, label=i )

# 獲取當前的坐標軸對象
ax = plt.gca()

# 建立格點評估模型
# np.linspace() 傳回平均間隔數字
xx = np.linspace(0, 5)  # array 50
yy = np.linspace(0, 5)  # array 50
XX, YY = np.meshgrid(xx, yy)    ## XX: 50*50 YY:50*50
# ravel() 方法將二維陣列壓平成一維陣列
# vstack() 將多個一維陣列在垂直方向上進行堆疊，生成一個新的 2D 陣列
# XX.ravel():2500, YY.ravel():2500
# np.vstack([XX.ravel(), YY.ravel()]) : 2 * 2500
# xy: 2500 * 2
xy = np.vstack([XX.ravel(), YY.ravel()]).T

# 傳回距超平面的距離
Z = svc.decision_function(xy).reshape(XX.shape)

# 繪製決策邊和間隔
# 繪製 2D 等高線, -1 , 0, 1
ax.contour(XX, YY, Z, colors='b', levels=[-1, 0, 1], alpha=0.5,
           linestyles=['--', '-', '--'])

# 用圓圈繪製支援向量
# s=100 設置每個散點的大小
# facecolors='none', 'none' 表示點沒有填充顏色
# edgecolors='k', 設置點的邊界顏色 'k' 是黑色的縮寫
plt.scatter(svc.support_vectors_[:,0], svc.support_vectors_[:,1],
            s=100, facecolors='none', edgecolors='k')

plt.title('支援向量機-繪製超平面及決策邊界')
plt.xlabel(r'$x_{1}$', fontsize=14)
plt.ylabel(r'$x_{2}$', fontsize=14)
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic6.png pic6 %}
</div>

#### 從二維到三維平面
##### make_circles() 環形數據
``` py
# make_circles() 環形數據
from sklearn.datasets import make_circles
import matplotlib.pyplot as plt

# 生成數據
X, y = make_circles(n_samples=200, noise=0.05, random_state=10)

# 繪製數據點,分類A使用圓圈, 分類B使用星型, 加入 Label 參數
for i, marker in zip([0, 1], ['o', '*'] ):
    plt.scatter(X[y == i, 0], X[y == i, 1], marker=marker, label=i)

# label 位置
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic7.png pic7 %}
</div>

##### 增加維度
``` py
# 3維 z = x^2, y^2
from sklearn.datasets import make_circles
import matplotlib.pyplot as plt

# 生成數據
X, y = make_circles(n_samples=200, noise=0.05, random_state=10)
z = X[:,0]**2 + X[:,1]**2

# 3D 繪圖
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

# 繪製數據點,分類A使用圓圈, 分類B使用星型, 加入 Label 參數
for i, marker in zip([0, 1], ['o', '*'] ):
    ax.scatter(X[y == i, 0], X[y == i, 1], z[y==i], marker=marker, label=i)

# label 位置
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic8.png pic8 %}
</div>

##### 3維的超平面公式與係數
二維空間的超平面公式:
	$g(x) = w_1x_1 + w_2x_2 + b  = 0$
三維空間的超平面公式:
	$g(x) = w_1x_1 + w_2x_2 + w_3x_3 + b  = 0$

``` py
# 3維 權重係數和截距
from sklearn.datasets import make_circles
from sklearn import svm
import numpy as np

# 生成數據
X, y = make_circles(n_samples=200, noise=0.05, random_state=10)
z = X[:,0]**2 + X[:,1]**2

features = np.concatenate((X, z.reshape(-1,1)), axis=1)
svc = svm.SVC(kernel='linear')
svc.fit(features, y)

print(f"權重係數  :{svc.coef_}")
print(f"截距(篇置):{svc.intercept_}")
# 權重係數  :[[-0.04930655  0.01521172 0.01523346]]
# 截距(篇置):[5.67719935]
# 權重係數  :[[-0.04930655  0.01521172 -6.89993346]]
# 截距(篇置):[5.67719935]
# 取小數四位
# w1 = -0.0493
# w2 = 0.0152
# w3 = -6.8999
# b = 5.6772
```

$g(x) = w_1x_1 + w_2x_2 + w_3x_3 + b  = 0$
$w_3x_3 = -w_1x_1 - w_2x_2 - b$
$x_3 = \frac{-w_1x_1 - w_2x_2 - b}{w_3}$

##### 繪製3維超平面
``` py
# 繪製3維超平面
from sklearn.datasets import make_circles
from sklearn import svm
import numpy as np
import matplotlib.pyplot as plt

# 生成數據
X, y = make_circles(n_samples=300, noise=0.05, random_state=10)
z = X[:,0]**2 + X[:,1]**2

features = np.concatenate((X, z.reshape(-1,1)), axis=1)
svc = svm.SVC(kernel='linear')
svc.fit(features, y)

# print(f"權重係數  :{svc.coef_}")
# print(f"截距(篇置):{svc.intercept_}")

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 3D 繪圖
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

# 繪製數據點,分類A使用圓圈, 分類B使用星型, 加入 Label 參數
for i, marker in zip([0, 1], ['o', '*'] ):
    ax.scatter(X[y == i, 0], X[y == i, 1], z[y==i], marker=marker, label=i)

# 更改視角
# ax.view_init(elev=30, azim=-60) # default
# elev: -90 ~ 90, azim: -180 ~ 180
ax.view_init(elev=20, azim=-120)
# 在 z 軸方向上抬高 10 度，同時在 xy 平面內旋轉 -60 度。也就是說，
# 觀察者的視角是在 z 軸上方 10 度，並且從 x 軸方向向 y 軸方向旋轉了 -60 度。

features = np.concatenate((X, z.reshape(-1,1)), axis=1)
svc = svm.SVC(kernel='linear')
svc.fit(features, y)

# 計算x3公式
x3 = lambda x, y : (-svc.intercept_[0] - svc.coef_[0][0] *
                    x - svc.coef_[0][1] *y ) / svc.coef_[0][2]

grid = np.linspace(-1.5, 1.5)
xx, yy = np.meshgrid(grid, grid)
ax.plot_surface(xx, yy, x3(xx, yy), color='r', alpha=0.3)

plt.title("支援向量機-繪製3D超平面")
plt.xlabel(r'$x_{1}$', fontsize=14)
plt.ylabel(r'$x_{2}$', fontsize=14)
# label 位置
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic9.png pic9 %}
</div>

``` py
# 繪製3維超平面及類別0(找出錯誤分類)
from sklearn.datasets import make_circles
from sklearn import svm
import numpy as np
import matplotlib.pyplot as plt

# 生成數據
X, y = make_circles(n_samples=300, noise=0.05, random_state=10)
z = X[:, 0]**2 + X[:, 1]**2

# 合併特徵
features = np.concatenate((X, z.reshape(-1, 1)), axis=1)

# 訓練 SVM 模型
svc = svm.SVC(kernel='linear')
svc.fit(features, y)

# 計算超平面
x3 = lambda x, y: (-svc.intercept_[0] - svc.coef_[0][0] *
                    x - svc.coef_[0][1] * y) / svc.coef_[0][2]

# 計算數據點到超平面的距離
distances = svc.decision_function(features)

# 設置顏色（在超平面上的距離為正數的顯示為紅色，為負數的顯示為藍色）
colors = np.where(distances > 0, 'red', 'blue')

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 3D 繪圖
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

# 繪製數據點，使用不同圖形和顏色區分
for i, marker in zip([0, 1], ['o', '*']):
    if (i == 0):
        mask = y == i
        ax.scatter(X[mask, 0], X[mask, 1], z[mask], c=colors[mask], marker=marker, label=f'Class {i}')

# 繪製超平面
grid = np.linspace(-1.5, 1.5)
xx, yy = np.meshgrid(grid, grid)
ax.plot_surface(xx, yy, x3(xx, yy), color='gray', alpha=0.5)

# 更改視角
ax.view_init(elev=20, azim=-120)

# 添加標題和標籤
plt.title("支援向量機-顯示平面上下的數據點")
plt.xlabel(r'$x_{1}$', fontsize=14)
plt.ylabel(r'$x_{2}$', fontsize=14)
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic10.png pic10 %}
</div>

<div style="max-width:500px">
  {% asset_img pic11.png pic11 %}
</div>

#### 核函數
##### linear

<div style="max-width:500px">
  {% asset_img pic12.png pic12 %}
</div>

``` py
import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn import svm

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 建立 50個點, 25個為分類0, 25個為分類1
X,y = make_blobs(n_samples=50, centers=2, random_state=12)

# 建立線性SVM模型
svc = svm.SVC(kernel='linear')
svc.fit(X, y)

# 繪製數據點,分類0使用圓圈, 分類1使用星型
for i, marker in zip([0, 1], ['o', '*'] ):
    plt.scatter(X[y == i, 0], X[y == i, 1], marker=marker, label=str(i))

ax = plt.gca()
xlim = ax.get_xlim()
ylim = ax.get_ylim()

# 建立格點來評估模型
xx = np.linspace(xlim[0], xlim[1], 30)
yy = np.linspace(ylim[0], ylim[1], 30)
XX, YY = np.meshgrid(xx, yy)
xy = np.vstack([XX.ravel(), YY.ravel()]).T
Z = svc.decision_function(xy).reshape(XX.shape)

# 繪製決策邊和超平面
# 繪製 2D 等高線, -1 , 0, 1
ax.contour(XX, YY, Z, colors='b', levels=[-1, 0, 1], alpha=0.5,
           linestyles=['--', '-', '--'])

# 用圓圈繪製支援向量
# s=100 設置每個散點的大小
# facecolors='none', 'none' 表示點沒有填充顏色
# edgecolors='k', 設置點的邊界顏色 'k' 是黑色的縮寫
plt.scatter(svc.support_vectors_[:,0], svc.support_vectors_[:,1],
            s=100, facecolors='none', edgecolors='k')

plt.title("支援向量機-kernel='linear'")
plt.legend()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic13.png pic13 %}
</div>

##### 徑向基函數(Radial basic function) - rbf
