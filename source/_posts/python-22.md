---
title: python Numpy
abbrlink: '3e52'
date: 2024-04-12 16:02:15
categories: Coding
tags:
	- python
---

### 數學
#### 內積計算
<div style="max-width:750px">
  {% asset_img pic3.png pic3 %}
</div>

<!--more-->
### some special
#### array create, show information and modify shape
``` py
# array create, show information and modify shape
import numpy as np

# 建立 array np.array(list/tuple, dtype=資料格式(default int64))
np1 = np.array([1,2,3,4]) # list
np2 = np.array((4,5,6,7)) # tuple
print(type(np1), np1)
print(type(np2), np2)

# <class 'numpy.ndarray'> [1 2 3 4]
# <class 'numpy.ndarray'> [4 5 6 7]

# 建立 順序 array
# np.arange([start,] stop [,step] )
na = np.arange(0, 32, 2)
print(na)
# [ 0  2  4  6  8 10 12 14 16 18 20 22 24 26 28 30]

# 建立 等距 array(float)
# np.linespace(start, stop, item number)
na2 = np.linspace(1,16,3)
print(na2)

# create 0 array
# np.zeors((x,..))
a = np.zeros((5))
b = np.zeros((2,3))
print(a)
print(b)
# [0. 0. 0. 0. 0.]
# [[0. 0. 0.]
#  [0. 0. 0.]]

# create 1 array
# np.ones((x,))
a = np.ones((5))
print(a)

# show array information
print('dim:', b.ndim)
print('shape:', b.shape)
print('size:', b.size)
# dim: 2
# shape: (2, 3)
# size: 6

# change array shape
adata = np.arange(1,17)
print(adata)
bdata = adata.reshape(4,4)
bdata[0,0] = 9
print(adata)
print(bdata)
# [ 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16]
# [ 9  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16]
# [[ 9  2  3  4]
#  [ 5  6  7  8]
#  [ 9 10 11 12]
#  [13 14 15 16]]
```

#### random
``` py
# random
import numpy as np

# rand() 依維度 0~1 隨機浮點數
# randn() 依維度 -1~1 常態分佈隨機浮點
# randint() 依維度 隨機整數
# random(3)/random_sample(3)/sample(3) 產生數個 0~1 隨機浮點數: 無差異
# choice(list) 隨機挑選數值
print('產生 2*3 0~1 隨機浮點數\n', np.random.rand(2,3))
print('產生 2*3 -1~1 常態分佈隨機浮點數\n', np.random.randn(2,3))
print('產生 0~4(不含5) 隨機整數\n', np.random.randint(5))
print('產生 6個 2~4(不含5) 隨機整數(不含5) \n', np.random.randint(2,5,[6]))
print('產生 3個 0~1 隨機浮點數\n',
                  np.random.random(3),
                  np.random.random_sample(3),
                  np.random.sample(3))
print('隨機挑選數值', np.random.choice([1,2,3,4,5,6]))
```

#### read csv
``` py
# read csv
import numpy as np
# UnicodeDecodeError: 'cp950' codec can't decode byte 0xbf in position 2: illegal multibyte sequence
# encoding="utf-8"
# field is numpy.float64(default)
na = np.genfromtxt('scores.csv', delimiter=',', skip_header=1, encoding="utf-8")
# nan:not a number
print(type(na), na.shape, na)
print(type(na[0][0]), type(na[0][1]))
# <class 'numpy.ndarray'> (4, 6) [[nan 65. 92. 78. 83. 70.]
#  [nan 90. 72. 76. 93. 56.]
#  [nan 81. 85. 91. 89. 77.]
#  [nan 79. 53. 47. 94. 80.]]
# <class 'numpy.float64'> <class 'numpy.float64'>


# Load data from CSV file
# dtype=str field is string
na2 = np.genfromtxt('scores.csv', delimiter=',', dtype=str, skip_header=1, encoding="utf-8")
print(type(na2), na2.shape, na2)
print(type(na2[0][0]), type(na2[0][1]))
# <class 'numpy.ndarray'> (4, 6) [['王小明' '65' '92' '78' '83' '70']
#  ['李小美' '90' '72' '76' '93' '56']
#  ['陳大同' '81' '85' '91' '89' '77']
#  ['林小玉' '79' '53' '47' '94' '80']]
# <class 'numpy.str_'> <class 'numpy.str_'>
```

#### numpy array 運算
``` py
# numpy array 運算
import numpy as np
a = np.arange(1,10).reshape(3,3)
b = np.arange(10,19).reshape(3,3)
print('a array:\n', a)
print('b array:\n', b)
# a array:
#  [[1 2 3]
#  [4 5 6]
#  [7 8 9]]
# b array:
#  [[10 11 12]
#  [13 14 15]
#  [16 17 18]]

# 對 array 運算
print('a array + 1:\n', a + 1)
print('a array ** 2:\n', a ** 2 )
print('a array < 5:\n', a  < 5 )
# a array + 1:
#  [[ 2  3  4]
#  [ 5  6  7]
#  [ 8  9 10]]
# a array ** 2:
#  [[ 1  4  9]
#  [16 25 36]
#  [49 64 81]]
# a array < 5:
#  [[ True  True  True]
#  [ True False False]
#  [False False False]]

# 取出 array
print('a array row 0:\n', a[0,:])
print('a array col 0:\n', a[:,0])
# a array row 0:
#  [1 2 3]
# a array col 0:
#  [1 4 7]

# array 交互運算(arry 形狀相同)
print('array a+b :\n', a+b)
print('array a*b :\n', a*b)
# array a+b :
#  [[11 13 15]
#  [17 19 21]
#  [23 25 27]]
# array a*b :
#  [[ 10  22  36]
#  [ 52  70  90]
#  [112 136 162]]

# array 內積計算 .dot
# a col == b row
print('a,b 內積:\n', a.dot(b))
# a,b 內積:
#  [[ 84  90  96]
#  [201 216 231]
#  [318 342 366]]
```

#### numpy 常用 計算及統計函式
``` py
# numpy 常用 計算及統計函式
import numpy as np

a = np.arange(1,10).reshape(3,3)
print(a)
print('最大值 max', np.max(a),)
print('最小值 min', np.min(a))
print('col , row 最大值', np.max(a, axis=0), np.max(a,axis=1))
print('總和 sum', np.sum(a))
print('乘積 prod', np.prod(a))
print('平均 mean', np.mean(a))
# 標準差是一個用來衡量一組數據散佈程度或變異程度的統計量。它衡量的是每個數據點與平均值的平均偏差，
# 因此可以幫助我們了解數據的離散程度。標準差越大，表示數據點越分散；標準差越小，表示數據點越集中
# 在平均值附近。
print('標準差 std', np.std(a))
# 變異數是標準差的平方，它也是用來衡量數據集合中數據點的分散程度或變異程度的一種統計量。與標準差類似，
# 它提供了一種了解數據集中數據點分散程度的方式，但是不像標準差那樣，它沒有取平方根。
print('變異數 var', np.var(a))

# [[1 2 3]
#  [4 5 6]
#  [7 8 9]]
# 最大值 max 9
# 最小值 min 1
# col , row 最大值 [7 8 9] [3 6 9]
# 總和 sum 45
# 乘積 prod 362880
# 平均 mean 5.0
# 標準差 std 2.581988897471611
# 變異數 var 6.666666666666667
b = np.random.randint(100 ,size=20)
print('')
print(b)
print('中位數 median', np.median(b))
print('最小元素索引 argmin', np.argmin(b))
print('最大元素索引 argmax', np.argmax(b))
print('陣列元素累加 cumsum', np.cumsum(b))
print('陣列元素累積 cumprod', np.cumprod(b))
# 將 b 中的數據從小到大排序後，找到排在第 80% 位置上的值
print('百分比顯示陣列中的指定值 percentile', np.percentile(b, 80))
print('最大值與最小值的差 ptp', np.ptp(b))

# [48 15  8 34 84 21 83 44 74  1 38 60 86 93 45 86 53 61 58 68]
# 中位數 median 55.5
# 最小元素索引 argmin 9
# 最大元素索引 argmax 13
# 陣列元素累加 cumsum [  48   63   71  105  189  210  293  337  411  412  450  510  596  689
#   734  820  873  934  992 1060]
# 陣列元素累積 cumprod [         48         720        5760      195840    16450560   345461760
#  -1391444992 -1094037504   645603328   645603328 -1236877312 -1198194688
#     34471936 -1089077248 -1763835904 -1366032384   614727680 -1156317184
#   1653080064   740294656]
# 百分比顯示陣列中的值 percentile 83.2
# 最大值與最小值的差 ptp 92
```

#### numpy 排序
``` py
# numpy 排序
import numpy as np

# 一維陣列的排序
# replace=False 不重複
a = np.random.choice(50, size=10, replace=False)
print(a)
print('排序後的陣列', np.sort(a))
print('排序後的索引', np.argsort(a))
# [14 49 15 33 43 29 20 47 31 19]
# 排序後的陣列 [14 15 19 20 29 31 33 43 47 49]
# 排序後的索引 [0 2 9 6 5 8 3 4 7 1]

# 多維陣列的排序
b = np.random.randint(0,10,(3,5))
print('\n',b)
print('直行排序')
print(np.sort(b, axis=0))
print('橫列排序')
print(np.sort(b, axis=1))

#  [[0 5 9 9 8]
#  [5 0 0 0 4]
#  [3 0 6 5 1]]
# 直行排序
# [[0 0 0 0 1]
#  [3 0 6 5 4]
#  [5 5 9 9 8]]
# 橫列排序
# [[0 5 8 9 9]
#  [0 0 0 4 5]
#  [0 1 3 5 6]]
```

#### array 改為二維
``` py
# 假設X代表房子面積,y代表房價
X = np.array([50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150])

# X 改為二維
# -1 表示自動計算行數，而 1 表示每一列中只有一個元素。
# 也就是說，這行代碼將 X 轉換成一個多行、單列的陣列或矩陣。
X = X.reshape(-1, 1)
```

#### 多維陣列轉成list
``` py
index = indices.flatten()
print(index)

# 最接近喜好的索引: [[0 1 3]]
# [0 1 3]
```

#### 1D array 合成 2D array
``` py
distance = [10, 20, 10, 30, 20, 30, 15, 25, 20, 15]
angle = [30, 45, 60, 30, 60, 75, 45, 60, 70, 90]

# 1D array 合成 2D array
X = np.column_stack((distance, angle))
```

#### ravel() - 將二維陣列壓平成一維陣列
``` py
# ravel() 方法將二維陣列壓平成一維陣列
# np.c_ 按列合併多個一維陣列，生成一個新的二維陣
Z = knn.predict(np.c_[xx.ravel(), yy.ravel()])
```

#### np.c_ - 按列合併多個一維陣列，生成一個新的二維陣
``` py
# ravel() 方法將二維陣列壓平成一維陣列
# np.c_ 按列合併多個一維陣列，生成一個新的二維陣
Z = knn.predict(np.c_[xx.ravel(), yy.ravel()])
```

### function
#### [linspace](https://numpy.org/doc/stable/reference/generated/numpy.linspace.html)
``` py
# 傳回平均間隔數字
# numpy.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None, axis=0
x = np.linspace(0, 1000, 101)
```

#### meshgrid
``` py
# 用來生成網格點座標矩陣，通常用於數值計算和可視化中。
# 該函數可以生成多維網格，這在多變量函數的計算和圖形繪製中特別有用。
# np.meshgrid(*xi, copy=True, sparse=False, indexing='xy')
#   *xi: 一個或多個一維數組。
#   copy: 如果為 True（默認值），則返回的數組是輸入數據的副本。否則，返回的數組是引用。
#   sparse: 如果為 True，則在生成的網格中使用稀疏矩陣。這對於處理大型數據集非常有用，因為它可以節省內存。
#   indexing: 'xy'（默認值）表示使用矩陣索引（即直角坐標系），'ij' 表示使用陣列索引。
import numpy as np

x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
# 生成網格
X, Y = np.meshgrid(x, y)
print("X:\n", X)
print("Y:\n", Y)
# X:
#  [[1 2 3]
#  [1 2 3]
#  [1 2 3]]
# Y:
#  [[4 4 4]
#  [5 5 5]
#  [6 6 6]]

# 稀疏矩陣
X2, Y2 = np.meshgrid(x, y, sparse=True)
print("X2:\n", X2)
print("Y2:\n", Y2)
# X2:
#  [[1 2 3]]
# Y2:
#  [[4]
#  [5]
#  [6]]

# 3 矩陣
z = np.array([7, 8, 9])
X3, Y3, Z3= np.meshgrid(x, y, z)
print("X3:\n", X3)
print("Y3:\n", Y3)
print("Y3:\n", Z3)
# X3:
#  [[[1 1 1]
#   [2 2 2]
#   [3 3 3]]
#  [[1 1 1]
#   [2 2 2]
#   [3 3 3]]
#  [[1 1 1]
#   [2 2 2]
#   [3 3 3]]]
# Y3:
#  [[[4 4 4]
#   [4 4 4]
#   [4 4 4]]
#  [[5 5 5]
#   [5 5 5]
#   [5 5 5]]
#  [[6 6 6]
#   [6 6 6]
#   [6 6 6]]]
# Y3:
#  [[[7 8 9]
#   [7 8 9]
#   [7 8 9]]
#  [[7 8 9]
#   [7 8 9]
#   [7 8 9]]
#  [[7 8 9]
#   [7 8 9]
#   [7 8 9]]]

# 3 矩陣 - 稀疏矩陣
# z = np.array([7, 8, 9])
X4, Y4, Z4= np.meshgrid(x, y, z, sparse=True)
print("X4:\n", X4)
print("Y4:\n", Y4)
print("Y4:\n", Z4)
# X4:
#  [[[1]
#   [2]
#   [3]]]
# Y4:
#  [[[4]]
#  [[5]]
#  [[6]]]
# Y4:
#  [[[7 8 9]]]
```

#### [polyfit-計算迴歸線](https://numpy.org/doc/stable/reference/generated/numpy.polyfit.html)
``` py
# Numpy 實作最小平方法
# 拜訪次數 回收問卷
# 100       500
# 200       1000
# 300       2000
# 拜訪次數(1=100次) vs 業績(回收問卷)
import numpy as np
x = np.array([1, 2, 3])
y = np.array([500, 1000, 2000])

# https://numpy.org/doc/stable/reference/generated/numpy.polyfit.html
# numpy.polyfit(x, y, deg, rcond=None, full=False, w=None, cov=False)
# 計算迴歸直線, deg 多項式次數
a, b = np.polyfit(x, y, 1)
print(f"斜率{a:.2f}")
print(f"截距{b:.2f}")

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 繪迴歸直線
x2 = np.linspace(0, 5, 100)
y2 = a * x2 + b
plt.plot(x2, y2)

# 計算 2500張,需拜訪次數
y_count = 2500
x_count = (y_count - b) / a
plt.plot(x_count, y_count, "-o", color="red")
plt.text(x_count-0.9, y_count+50, f"({x_count:.2f},{y_count})")

for index, x_value in enumerate(x):
    plt.plot(x_value, y[index], "-o", color="green")

plt.xlabel('拜訪次數(單位=100)')
plt.ylabel('回收問卷')

plt.grid()
plt.show()
# 斜率750.00
# 截距-333.33
```

<div style="max-width:500px">
  {% asset_img pic4.png pic4 %}
</div>

#### random
##### rand(0~1(不含) 亂數) 
``` py
import numpy as np
# 建立 1 個隨機數
x = np.random.rand()
print(x)
# 0.573581507893057

# 建立 3 個隨機數
x = np.random.rand(3)
print(x)
# [0.50105985 0.28119421 0.30650016]

# 建立 3 *2 個隨機數
x = np.random.rand(3, 2)
print(x)
# [[0.25455927 0.00831485]
#  [0.82411519 0.76705034]
#  [0.42246107 0.2743811 ]]
```

##### randint(low~high(不含) 整數)
``` py
import numpy as np

# 傳回1個 0~4 整數
x = np.random.randint(5)
print(x)
# 2

# 傳回3個 0~9 整數
x = np.random.randint(10, size=3)
print(x)
# [2 3 0]

# 傳回 3*2 個 0~9 整數
x = np.random.randint(0, 10, size=(3,2))
print(x)
# [[2 0]
#  [5 8]
#  [2 5]]
```

``` py
# 擲骰子,繪直方圖
import numpy as np

slides = 6
n = 10000
dice = np.random.randint(1, slides+1, size=n )

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

h = plt.hist(dice, bins=slides)
print(f"x軸 {h[0]}")
print(f"y軸 {h[1]}")

plt.xlabel('點數')
plt.ylabel('出現次數')
plt.title(f"測試{n}次")

plt.show()
# bins y軸 [1650. 1647. 1650. 1736. 1633. 1684.]
# bins x軸 [1.         1.83333333 2.66666667 3.5        4.33333333 5.16666667 6.        ]
```

<div style="max-width:500px">
  {% asset_img pic5.png pic5 %}
</div>

##### seed 每次執行產生相同隨機數
``` py
import numpy as np

x = np.random.randint(10, size=10)
print(x)

# [3 7 0 8 3 1 9 7 0 2]
# [5 2 6 2 9 6 9 3 8 8]
# [5 6 1 4 6 4 7 9 8 3]
```

``` py
import numpy as np

# 設定 seed 可每次執行值都相同
np.random.seed(10)
x = np.random.randint(10, size=10)
print(x)

# [9 4 0 1 9 0 1 8 9 0]
# [9 4 0 1 9 0 1 8 9 0]
# [9 4 0 1 9 0 1 8 9 0]
```

##### shuffle 數據隨機重排, reshape 更改形狀
``` py
# shuffle 重新排列
# reshape 更改形狀
import numpy as np

arr1 = np.arange(9)
print("一維陣列")
print(arr1)
print("一維陣列重新排列")
np.random.shuffle(arr1)
print(arr1)

arr2 = np.arange(9).reshape(3,3)
print("二維陣列")
print(arr2)
print("二維陣列重新排列")
np.random.shuffle(arr2)
print(arr2)

# Z 的 shape same as xx
Z = Z.reshape(xx.shape)

# 一維陣列
# [0 1 2 3 4 5 6 7 8]
# 一維陣列重新排列
# [0 5 3 2 1 8 4 6 7]
# 二維陣列
# [[0 1 2]
#  [3 4 5]
#  [6 7 8]]
# 二維陣列重新排列
# [[3 4 5]
#  [6 7 8]
#  [0 1 2]]
```

##### choice 挑選已有數據
``` py
import numpy as np

fruits = ["Apple", "Orange", "Grapes", "Banana", "Mango"]
fruit1 = np.random.choice(fruits, 3)
print(f"隨意選3種 : {fruit1}")

fruit2 = np.random.choice(fruits, 5)
print(f"隨意選5種(可重複) : {fruit2}")

fruit3 = np.random.choice(fruits, 5, replace=False)
print(f"隨意選5種(不可重複) : {fruit3}")

fruit4 = np.random.choice(fruits, 5, p =[0.8, 0.05, 0.05, 0.05, 0.05])
print(f"依權重選5種(可重複) : {fruit4}")

fruit5 = np.random.choice(fruits, 5, p =[0.05, 0.05, 0.05, 0.05, 0.8])
print(f"依權重選5種(可重複) : {fruit5}")

# 隨意選3種 : ['Mango' 'Grapes' 'Orange']
# 隨意選5種(可重複) : ['Apple' 'Grapes' 'Grapes' 'Orange' 'Grapes']
# 隨意選5種(不可重複) : ['Banana' 'Mango' 'Apple' 'Orange' 'Grapes']
# 依權重選5種(可重複) : ['Grapes' 'Apple' 'Apple' 'Banana' 'Apple']
# 依權重選5種(可重複) : ['Apple' 'Mango' 'Mango' 'Mango' 'Apple']
```

##### 使用隨機數據陣列產生圖像
``` py
# 使用隨機數據陣列產生圖像
import matplotlib.pyplot as plt
import numpy as np

x = np.random.rand(10000)
y = np.random.rand(10000)
# 使用 cmap='hsv' 意味著顏色將按 HSV 顏色空間進行映射，色調從 0 到 1 對應于一個色環，涵蓋所有顏色。
plt.scatter(x, y, c=y, cmap='hsv' )
# 顯示顏色條
plt.colorbar()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic6.png pic6 %}
</div>

#### binomial 生成來自二項式分布的隨機樣本
``` py
import numpy as np

n = 5
success = 0.75
# numpy.random.binomial 函數用於生成來自二項分布的隨機樣本
# n 次獨立試驗中，成功 k 次的可能性，每次試驗成功的概率為 𝑝, siz為生成資料數量
samples = np.random.binomial(n=n , p=success, size=1000)
print(len(samples))
print(samples)
```

#### 矩陣 matrix
``` py
import numpy as np

A = np.matrix([[1,2],
               [3, 4]])
B = np.matrix([[5,6],
               [7,8]])
print(f"A + B = {A + B}")
print(f"A * B = {A * B}")

# 反矩陣
A = np.matrix([[2, 3],
               [5, 7]])
B = np.linalg.inv(A)

# 矩陣 shape()
A = np.array([
    [[1,2],
     [3,4]],
    [[5,6],
     [7,8]],
    [[9,10],
     [11,12]],
    ])
print(f"shape = {np.shape(A)}")

# 轉置矩陣
A = np.array([[0, 2, 4, 6],
              [1, 3, 5, 7]])
B = A.T
print(f"轉置矩陣1 = {B}")
C = np.transpose(A)
print(f"轉置矩陣2 = {C}")

# reshape(-1,1) 將一維陣列轉為二維陣列
height = np.array([1.6, 1.63, 1.71, 1.73, 1.83]).reshape(-1,1)

# np.ravel 將原陣列降為一維,若修改會影響原值
# np.flatten 將原陣列降為一維,若修改不會影響原值
RSS = np.sum((weight - np.ravel(model.predict(height))) ** 2)

# X[:,0], X[:,1] 取 X[0] 
print(X[:5])
print(f"X[:,0] 前 5 個樣本")
xx = X[:,0]
print(xx[:5])
print(f"X[:,1] 前 5 個樣本")
xx = X[:,1]
print(xx[:5])
# X 前 5 個樣本
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
```

#### p.argsort 取出由小到大 array's index
``` py
print(f"importances={importances}")
print(f"importances={ np.argsort(importances)}")
print(f"importances={np.argsort(importances)[-7:]}")

# 獲得最重要7個特徵
# p.argsort 取出由小到大 array's index
indices = np.argsort(importances)[-7:]

# importances=[0.11315613 0.03278781 0.21436292 0.00918877 0.11398391 0.0081099
#  0.05402447 0.19953578 0.01240331 0.00356305 0.11556123 0.04022091
#  0.06567633 0.01742548]
# importances=[ 9  5  3  8 13  1 11  6 12  0  4 10  7  2]
# importances=[ 6 12  0  4 10  7  2]
```

#### np.linspace() - 產生等距數據
``` py
# 建立 等距 array(float)
# np.linespace(start, stop, item number)
na2 = np.linspace(1,16,3)
print(na2)

# vstack() 將多個一維陣列在垂直方向上進行堆疊，生成一個新的 2D 陣列
xx = np.linspace(X.min(), X.max(), 300).reshape(-1, 1)
```

#### other function
``` py
# vstack() 將多個一維陣列在垂直方向上進行堆疊，生成一個新的 2D 陣列
# XX.ravel():2500, YY.ravel():2500
# np.vstack([XX.ravel(), YY.ravel()]) : 2 * 2500
# xy: 2500 * 2
xy = np.vstack([XX.ravel(), YY.ravel()]).T
```

#### other function
``` py
# 判斷是否危極限值
if not(np.isinf(peak.fun)):
# ln()
spam_prob = np.log(prior_spam)
# 生成樣本
samples = np.random.binomial(n, p, size)
# 度數轉成弧度
rad = np.radians(d)
# sin(), cos()
sin = np.sin(rad)
cos = np.cos(rad)

# 平均數
print(f"平均數: {np.mean(x)}")
# 中位數
print(f"中位數: {np.median(x)}")
# bincount 傳回 array lenth 為最大值 +1(x 要全為正整數)
print(f"x bincount : {len(np.bincount(x))}")
# argmax 傳回最大值索引
print(f"x argmax : {np.argmax(x)} {x[np.argmax(x)]}")
# argmin 傳回最小值索引
print(f"x argmin : {np.argmin(x)} {x[np.argmin(x)]}")
# 眾數(mode):出現最高次數的數字
print(f"x mode:{st.mode(x)}")

# 變異數, 標準差, 相關係數
print(f"Numpy 母體變異數     : {np.var(x):6.2f}")
print(f"Numpy 樣本變異數     : {np.var(x, ddof=1):6.2f}")
print(f"Numpy 母體標準差     : {np.std(x):.2f}")
print(f"Numpy 樣本標準差     : {np.std(x, ddof=1):.2f}")
print(f"相關係數 = {np.corrcoef(temperature, rev).round(2)}")

# 建立迴歸模型係數
# 建立迴歸直線函數
coef = np.polyfit(temperature, rev, 1)
reg = np.poly1d(coef)
# 建立二次函數迴歸模型係數
# 建立二次函數迴歸方程式
coef = np.polyfit(temperature, rev, 2)
reg = np.poly1d(coef)

# 向量大小
norm_ab = np.linalg.norm(ab)
# 向量內積
dot_ab_cd = np.dot(ab, cd)
# 向量外積
ab_cross = np.cross(a,b)
```