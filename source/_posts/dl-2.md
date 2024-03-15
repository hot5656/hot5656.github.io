---
title: Deep Learning Prerequisites - The Numpy Stack in Python V2
abbrlink: a843
date: 2024-03-08 14:24:25
categories: Coding
tags:
  - python
  - deep learning
---

### 說明
#### 名詞
##### Application
Linear Regression :線性迴歸
Logistic Regression : 邏輯迴歸
Deep Neural Netowrks : 深度神經網路
K-Means Clustering : k 類聚
Density Estimation : 密度估計
Principal Components Analysis : 主成分分析
Matrix Facorization(Recommender Systems) : 矩陣分解(推薦系統使用)
Support Vector Machine(SVM) : 支援向量機
Markove Models,HMM : 馬可夫模
Game Theory : 賽局理論
Operation Research : 操作研究
Portforlio Optimization : 投資優化
##### Matplotlib
Line Charts:折線圖
Scatterplot:散點圖
Histogram:直方圖
Images:圖像


### 數學
#### dot product/inner product(內積)
<div style="max-width:500px">
  {% asset_img pic1.png pic1 %}
</div>

<!--more-->

#### matrix multiplication
<div style="max-width:500px">
  {% asset_img pic2.png pic2 %}
</div>

<div style="max-width:750px">
  {% asset_img pic3.png pic3 %}
</div>

#### Determinant of a Matrix

### numpy
#### list vs array
``` py
import numpy as np

L = [1, 2, 3]
A = np.array([1, 2, 3])

for e in L:
    print(e)
for e in A:
    print(e)

L.append(4)
L + [5]
# [1, 2, 3, 4, 5]

# array not support
# A.append(4)

A + np.array([4])
# array([5, 6, 7])
A + np.array([4,5,6])
# array([5, 7, 9])
2 * A
# array([2, 4, 6])

#  L + L
[1, 2, 3, 4, 1, 2, 3, 4]

A**2
# array([1, 4, 9])
np.log(A)
np.exp(A)
np.tanh(A)
```

#### dot product
``` py
a = np.array([1,2])
b = np.array([3,4])
dot = 0 
for e, f in zip(a,b):
  dot += e * f
dot
# 11

dot = 0 
for i in range(len(a)):
  dot += a[i] * b[i]
dot
# 11

print(a * b)
print(np.sum(a * b))
print((a * b).sum())
print(np.dot(a,b))
print(a.dot(b))
# new python count dot
print(a @ b)
# [3 8]
# 11
# 11
# 11
# 11
# 11
```

<div style="max-width:300px">
  {% asset_img pic21.png pic21 %}
</div>

``` py
a = np.array([1,2])
b = np.array([3,4])

# ||a||
amag = np.sqrt((a * a).sum())
amag
# 2.23606797749979

# np method
np.linalg.norm(a)
# 2.23606797749979

# 計算 cos 值
consangle = a.dot(b)/(np.linalg.norm(a) * np.linalg.norm(b))
consangle
# 0.9838699100999074

# 算出角度
angle = np.arccos(consangle)
angle
# 0.17985349979247847
```

#### speed test
``` py
import numpy as np
from datetime import datetime
a = np.random.randn(100)
b = np.random.randn(100)
T = 100000
# print(a)
# print(b)

def slow_dot_product(a, b):
  result = 0
  for e,f in zip(a,b):
    result += e*f
  return result

t0 = datetime.now()
for t in range(T):
  slow_dot_product(a,b)
dt1 = datetime.now() - t0

t0 = datetime.now()
for t in range(T):
  a.dot(b)
dt2 = datetime.now() - t0
print("dt1:", dt1.total_seconds(), "dt2:", dt2.total_seconds(), "dt1 / dt2:", dt1.total_seconds()/dt2.total_seconds()) 

# dt1: 2.672156 dt2: 0.090909 dt1 / dt2: 29.393745393745395
```

#### Matrices
``` py
import numpy as np

# determinant 
A = np.array([[1, 2], [3, 4]])
det_A = np.linalg.det(A)
print(det_A)
# -2.0000000000000004

A
# array([[1, 2],
#        [3, 4]])

# inverse of a matrix.
np.linalg.inv(A)
# array([[-2. ,  1. ],
#        [ 1.5, -0.5]])

np.linalg.inv(A).dot(A)
# 傳回單位矩陣
# [[1,0]
#  [0,1]]
# array([[1.00000000e+00, 0.00000000e+00],
#        [1.11022302e-16, 1.00000000e+00]])

# sum along diagonals of the array.
np.trace(A)
# 5 --> 1 + 4

# Extract a diagonal or construct a diagonal array.
np.diag(A)
# array([1, 4])
np.diag([1,4])
# array([[1, 0],
#        [0, 4]])

# eigenvalues and right eigenvectors of a square array.
np.linalg.eig(A)
# EigResult(eigenvalues=array([-0.37228132,  5.37228132]), eigenvectors=array([[-0.82456484, -0.41597356],
#        [ 0.56576746, -0.90937671]]))
Lam, V = np.linalg.eig(A)
print(V)
print(Lam)
print(V[:,0]*Lam[0] == A@ V[:,0])
# [[-0.82456484 -0.41597356]
#  [ 0.56576746 -0.90937671]]
# [-0.37228132  5.37228132]
# [ True False]

# .allclose : Returns True if two arrays are element-wise equal within a tolerance.
V[:,0]*Lam[0],A@ V[:,0]
# (array([ 0.30697009, -0.21062466]), array([ 0.30697009, -0.21062466]))
np.allclose(V[:,0]*Lam[0],A@ V[:,0])
# True
np.allclose(V @ np.diag(Lam), A @ V)
# True
```

#### solving Linear System
<div style="max-width:300px">
  {% asset_img pic22.png pic22 %}
</div>
<div style="max-width:300px">
  {% asset_img pic23.png pic23 %}
</div>
<div style="max-width:300px">
  {% asset_img pic24.png pic24 %}
</div>

``` py
A = np.array([[1, 1], [1.5, 4]])
b = np.array([2200, 5050])
np.linalg.solve(A, b)
# array([1500.,  700.])
np.linalg.inv(A).dot(b)
# array([1500.,  700.])
```


#### Generate Data
``` py
import numpy as np
np.zeros((2,3))
# array([[0., 0., 0.],
#        [0., 0., 0.]])

np.ones((2,3))
# array([[1., 1., 1.],
#        [1., 1., 1.]])
10*np.ones((2,3))
# array([[10., 10., 10.],
#        [10., 10., 10.]])
# 單位矩陣 (Identity matrix)
np.eye(3)
# array([[1., 0., 0.],
#        [0., 1., 0.],
#        [0., 0., 1.]])

# 0~1(not include 1)
np.random.random()
# 0.9701459604234299
np.random.random((2,3))
# array([[0.39755615, 0.69273947, 0.96292757],
#        [0.50830448, 0.99407473, 0.54656248]])
# include + and -
np.random.randn(2,3)
# array([[-0.76089179, -1.99800088,  0.38534243],
#        [-1.44458277, -0.13887983, -0.47981575]])

R2 = np.random.randn(2,3)
print(R2)
print(R2.var())
R2.mean()
# [[ 0.84762111  1.56442554 -1.82187819]
#  [ 1.30684524  0.57278059  0.35319868]]
# 1.2195975775519574
# 0.4704988268525599
R = np.random.randn(10000)
R.mean()
# 平均值近似於0
# 0.009437079797954507
np.mean(R)
# 0.009437079797954507
R.var()
# variance 1
# 0.9801145490034956
R.std()
# 0.9900073479542946

# other
R = np.random.randn(10000,3)
print(R.mean(axis=0).shape)
R.mean(axis=0)
# (3,)
# array([ 0.0078157 , -0.00292329, -0.01298782])
print(R.mean(axis=1).shape)
R.mean(axis=1)
# (10000,)
# array([-0.58203113,  0.82983485, -0.01790977, ..., -0.40049762,
#         0.76699179,  0.52129283])
print(np.cov(R).shape)
np.cov(R)
# (10000, 10000)
# array([[ 1.07905933, -0.73542729, -0.3442147 , ...,  0.72263965,
#          0.15671623,  0.21780096],
#        [-0.73542729,  0.62891153, -0.23245942, ..., -0.75281916,
#         -0.11010413,  0.01141977],
#        [-0.3442147 , -0.23245942,  1.81824629, ...,  0.7216588 ,
#         -0.03793899, -0.65423091],
#        ...,
#        [ 0.72263965, -0.75281916,  0.7216588 , ...,  1.01463039,
#          0.11166935, -0.18004424],
#        [ 0.15671623, -0.11010413, -0.03793899, ...,  0.11166935,
#          0.02284557,  0.02750681],
#        [ 0.21780096,  0.01141977, -0.65423091, ..., -0.18004424,
#          0.02750681,  0.24410679]])
np.cov(R.T)
# array([[ 1.01644249,  0.00987375, -0.01561179],
#        [ 0.00987375,  0.99528132,  0.01308294],
#        [-0.01561179,  0.01308294,  1.01757493]])
np.cov(R, rowvar=False)
# array([[ 1.01644249,  0.00987375, -0.01561179],
#        [ 0.00987375,  0.99528132,  0.01308294],
#        [-0.01561179,  0.01308294,  1.01757493]])

# 亂數整數 0 ~ 10(not include 10)
np.random.randint(0,10, size=(2,3))
# array([[1, 8, 3],
#        [4, 8, 1]])
np.random.choice(10, size=(3,3))
# array([[2, 5, 5],
#        [3, 0, 3],
#        [3, 0, 7]])		 
```

#### Numpy exercise(matrix multiplication delay)
``` py
import numpy as np
a = np.random.randint(0,10, size=(2,3))
b = np.random.randint(0,10, size=(3,4))
print(f"a={a}")
print(f"b={b}")

def matrix_mutiplication(a , b):
  # c = []
  a_colume = len(a[0])
  b_row = len(b)
               
  print(f"a colume = {a_colume}")
  print(f"b row = {b_row}")
  if a_colume != b_row:
    assert False
  c = [[0 for _ in range(len(b[0]))] for _ in range(len(a))]
  for i in range(len(a)):
    for j in range(len(b[0])):
      # print(f"{i}{j}")
      for item in range(b_row):
        # print(f"c[{i},{j}]={c[i][j]} a[{i}][{item}]={a[i][item]} b[{j}][{item}]={b[item][j]}")
        # print(f"c({i},{j})+=a[{i}][{item}]*b[{j}][{item}]")
        c[i][j] += a[i][item]*b[item][j]
  # print(f"c={c}")
  return np.array(c)

my_c = matrix_mutiplication(a , b)

# Matrix multiplication
# Alternatively: c = a @ b
c = np.dot(a, b)
print(f"my_c={my_c}")
print(f"c={c}")
if np.array_equal(my_c,c):
  print("output same...")
else:
  print("output different")
```

``` py
import numpy as np
from datetime import datetime

T = 100

def matrix_mutiplication(a , b):
  a_colume = len(a[0])
  b_row = len(b)
               
  if a_colume != b_row:
    assert False
  c = [[0 for _ in range(len(b[0]))] for _ in range(len(a))]
  for i in range(len(a)):
    for j in range(len(b[0])):
      # print(f"{i}{j}")
      for item in range(b_row):
        c[i][j] += a[i][item]*b[item][j]
  return np.array(c)

t0 = datetime.now()
a = np.random.randint(0,10, size=(10,20))
b = np.random.randint(0,10, size=(20,20))
for t in range(T):
  matrix_mutiplication(a , b)
dt1 = datetime.now() - t0

t0 = datetime.now()
for t in range(T):
  a.dot(b)
dt2 = datetime.now() - t0

# my_c = matrix_mutiplication(a , b)
# c = a.dot(b)
# if np.array_equal(my_c,c):
#   print("output same...")
# else:
#   print("output different")

print("dt1:", dt1.total_seconds(), "dt2:", dt2.total_seconds(), "dt1 / dt2:", dt1.total_seconds()/dt2.total_seconds()) 
# a = np.random.randint(0,10, size=(100,20))
# b = np.random.randint(0,10, size=(20,200))
# T=10 dt1: 3.878952 dt2: 0.003858 dt1 / dt2: 1005.4307931570762
# T=100 : dt1: 30.410566 dt2: 0.038654 dt1 / dt2: 786.7378796502302
# a = np.random.randint(0,10, size=(10,20))
# b = np.random.randint(0,10, size=(20,20))
# T=100 : dt1: 0.486408 dt2: 0.001092 dt1 / dt2: 445.4285714285714
```


### Matplotlib
#### Line chart
``` py
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0,20, 1000)
# x = np.linspace(0,20, 10)
# array([ 0.        ,  2.22222222,  4.44444444,  6.66666667,  8.88888889,
#        11.11111111, 13.33333333, 15.55555556, 17.77777778, 20.        ])

y = np.sin(x) + 0.2 * x
plt.plot(x, y)

plt.plot(x, y)
# run run computer need it
plt.show()

# 加標籤抬頭
plt.plot(x, y)
plt.xlabel('input')
plt.ylabel('output')
plt.title('my Plot');
# Colaboratory 最後一個命令會有一些文字輸出,加;即可不輸出
# Text(0.5, 1.0, 'my Plot')
```
<div style="max-width:400px">
  {% asset_img pic31.png pic31 %}
</div>

<div style="max-width:400px">
  {% asset_img pic32.png pic32 %}
</div>

#### Scatter
``` py
X = np.random.randn(100, 2)
plt.scatter(X[:,0], X[:,1])

X = np.random.randn(200,2)
X[:50] += 3
Y = np.zeros(200)
Y[:50] = 1
#以 Y 分顏色
plt.scatter(X[:,0], X[:,1], c=Y )
```
<div style="max-width:400px">
  {% asset_img pic33.png pic33 %}
</div>

<div style="max-width:400px">
  {% asset_img pic34.png pic34 %}
</div>

#### Histogram
``` py
X = np.random.randn(10000)
plt.hist(X);

# 常態分佈（normal distributation）
# bin 分組數
plt.hist(X, bins=50);

# 平均分布
X = np.random.random(10000)
plt.hist(X, bins=50);
```
<div style="max-width:400px">
  {% asset_img pic35.png pic35 %}
</div>

<div style="max-width:400px">
  {% asset_img pic36.png pic36 %}
</div>

<div style="max-width:400px">
  {% asset_img pic37.png pic37 %}
</div>

#### Images
``` py
```


### Ref
+ [dot product(內積)](https://zh.wikipedia.org/zh-tw/%E7%82%B9%E7%A7%AF)
+ [Matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication)
+ [Deep Learning Prerequisites: The Numpy Stack in Python Extra Resources](https://lazyprogrammer.me/numpy/)
+ [Numpy Tutorial](https://colab.research.google.com/drive/1VdLyfnop7Tt4wx4BmS6WHSSQg3n5wXrX)
+ [Determinant of a Matrix](https://www.mathsisfun.com/algebra/matrix-determinant.html)
+ [NumPy reference](https://numpy.org/doc/stable/reference/index.html)
