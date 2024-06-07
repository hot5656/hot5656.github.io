---
title: 機器學習最強入門:基礎數學/機率/統計邁向AI真實數據
abbrlink: 39d2
date: 2024-05-15 15:32:27
categories: Coding
tags:
	- python
	- book
	- ML
mathjax: true
---

### 名詞
#### 一般名詞
+ 人工智慧(Articial Intelligence)
+ 機器學習(Machine Learning)
+ 深入學習(Deep Learning)
+ 神經網路(Neural Network)
+ 卷積神經網路(Convolutional Neural Network)
+ Tensorflow

<!--more-->

#### 機器學習
+ 監督學習(supervised learning):以已知輸入和輸出數據進行學習,找出輸入及輸出之間的關係,一搬將80%(or 70%)數據用於訓練,20%(or 30%)用於測試
		訓練術據是建立迴歸模型,測試數據用來判斷迴歸模型是否足夠好
		常見的演算法有線性迴歸,邏輯迴歸,支援向量(Support Vector Machine-SVM),決策樹和隨機森林
+ 無監督學習(unsupervised learning):沒有目標,主要用於找出數據結構,識別模式和關係
		根據數據特性或規律做群集(clustering)分類是一種典型使用
		常見演算法有分群(或稱 聚類)分析(如 K-means),降維(如 主成分分析-Principal Comonent Analysis-PCA)
+ 強化學習(reinforcement learning):沒有明確訓練資料與標準答案,機器必須在給予環境中自我學習,然後評估行動回饋是正面或負面,進而調整下次行動,進而獲得正確答案
		遊戲AI:圍棋,象棋...
		機器人控制:教導機器人完成複雜動作
		自動駕駛
		能源管理:可應用於智慧電網
		金融交易:開發智慧交易策略

#### 機器學習應用
+ 圖像辨識
+ 自然語言處理:用於理解,生成和翻譯人類語言.使得可進行情感分析,機器翻譯,語音辨識和自然語言回應
+ 推薦系統:依用戶瀏覽及購買歷史,提供產品及服務的推薦
+ 金融領域:檢測欺詐交易,評估信用風險,預測股票價格波動
+ 醫療領域:分析醫療數據,幫助醫生診斷,預測病情發展
+ 物聯網:優化智慧家居,智慧城市,能源管理,設備維護,安全監控
+ 遊戲領域:使遊戲腳色可根據玩家行為自主決策及適應,遊戲測試,優化,自動發現問題即提出改善方案
+ 廣告投射:分析用戶行為,精準投射廣告
+ 工業自動化:應用於機器人和自動化設備,使能夠在無人工干預下,自動完成生產,檢測和維護
+ 客戶諮詢:開發智慧服務機器人,自動回答用戶問題,處理用戶諮詢,提高客戶效率和滿意度
+ 社交媒體:分析用戶行為,用於客戶分類,內容過濾,情感分析,提供更優質的社交體驗
+ 供應鏈管理:預測供應鏈中的需求,供應和運輸,提供有效的庫存管理,物流規劃和風險管理

#### 深度學習
+ 深度學習主要關注使用人工精神網路來模擬人類大腦過程
+ 深度學習在許多領域取的顯著得成果,如語音辨識,圖像辨識,自然語言處理及遊戲
+ 常見的神經網路類型包含
	捲積神經網路(Convlutional Neural Network-CNN):圖像辨識
	循環神經網路(Recurrent Neural Networks-RNNs):時序數據,語音識別,語言建模
	變換器(Transformer):自然語言處理

#### 數學
+ 線性迴歸:依蒐集到的數據,找出與數據最近的一條直線,或稱為最近函數

### 方程式與函數
#### 二元函數
##### {% post_link python-29 '# 二元函數3D圖(Z=X+Y)' %}
##### {% post_link python-29 '# 等高圖' %}

#### sympy
``` bash
pip install sympy
```

##### sympy 說明
``` py
# sympy 說明
import sympy as sp

# simple
x = sp.Symbol('x')
y = sp.Symbol('y')
print(x.name)
print(x + x + 2)
z = 5*x + 6*y + x*y
print(z)
# x
# 2*x + 2
# x*y + 5*x + 6*y

# 多個符號
a, b, c = sp.symbols(('a', 'b', 'c'))
print(a.name, b.name, c.name)
# a b c

# 字串轉為數學表達式
# eq = input("輸入公式:") # x**3 + 2*x**2 + 3*x + 5
# eq = sp.sympify(eq)
# print(eq)
# print(2*eq)
# result = eq.subs({x:1})
# print(result)
# 輸入公式:x**3 + 2*x**2 + 3*x + 5
# x**3 + 2*x**2 + 3*x + 5
# 2*x**3 + 4*x**2 + 6*x + 10
# 11

# 支援數學函數
# pi
# E: 歐拉數e
# sin(x), cos(x), tan(x)
# log(x,n) : 計算 n 為底數的對數,省略n為自然對數
# exp(x): e**x
# root(x,n): x 開n次方,省略n為2次方
eq2 = sp.sin(x**2) + sp.log(8,2)*x + sp.log(sp.exp(3))
result2 = eq2.subs({x:1})
print(result2)
print(result2.evalf())  # 計算值
# 由於 SymPy 主要是用於符號計算的工具，所以當進行符號替換時，會保持符號的形式而不會自動計算出實際值。
# sin(1) + 6
# 6.84147098480790
```

##### 解一元一次方程式
``` py
# 解一元一次方程式
import sympy as sp

# 3x+5 = 8
x = sp.Symbol('x')
eq = 3*x + 5 - 8
ans = sp.solve(eq)
print(ans)
print(type(ans))
# [1]
# <class 'list'>
```

##### 解聯立方程式 
``` py
# 解聯立方程式
# a  +  b = 1
# 5a + b  = 2

from sympy import Symbol, solve
a = Symbol("a")
b = Symbol("b")
# 定義公式要右邊為 0
eq1 = a + b - 1
eq2 = 5*a + b -2
ans = solve((eq1, eq2))
print(type(ans))
print(ans)
print(f"a={ans[a]}")
print(f"b={ans[b]}")
# <class 'dict'>
# {a: 1/4, b: 3/4}
# a=1/4
# b=3/4
```

##### 解一元二次方程式
``` py
# 解一元二次方程式的根
# x**2 - 2x - 8 = 0
# x**2 - 2x + 1 = 0
# x**2 + x + 1 = 0
from sympy import *

# 兩個根
x = Symbol("x")
f = x**2 - 2*x - 8
roots = solve(f)
print(roots)
# [-2, 4]

# 一個根
f = x**2 - 2*x + 1
roots = solve(f)
print(roots)
# [1]

# 無實數根
f = x**2 + x + 1
roots = solve(f)
print(roots)
number_roots = [root.evalf() for root in roots]
print(number_roots)
# [-1/2 - sqrt(3)*I/2, -1/2 + sqrt(3)*I/2]
# [-0.5 - 0.866025403784439*I, -0.5 + 0.866025403784439*I]
```

##### FiniteSet - 建立集合
``` py
# sympy 模組與集合
# sympy FiniteSet 可建立集合
from sympy import FiniteSet
A = FiniteSet(1, 2, 3)
print(A)
# {1, 2, 3}

# 建立集合冪集
a = A.powerset()
print(a)
# FiniteSet(EmptySet, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3})
```

### 聯立方程式
#### 餐廳營利計算
``` py
# 餐廳營利計算
# P(600,0)      600a  + b = 0
# P(1000,12)    1000a + b = 12 --> 1000a + b - 12 = 0
from sympy import Symbol, solve
a = Symbol("a")
b = Symbol("b")
# 定義公式要右邊為 0
eq1 = 600 * a + b
eq2 = 1000 * a + b - 12
ans = solve((eq1, eq2))
# print(ans)
print(f"a={ans[a]}")
print(f"b={ans[b]}")
# print(f"{type(ans[a])}")
# a=3/100
# b=-18
# y = 0.03x - 18

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

points_x = [600, 1000]
points_y = [ px * ans[a] + ans[b] for px in points_x]
plt.plot(points_x, points_y, "-o")

x = range(0, 2500, 10)
y = [ans[a] * y - 18 for y in x]
# x 顯示範圍 0~1000, y 顯示範圍 -20~15
# plt.axis([0,1000, -20, 15])
plt.plot(x,y)
plt.title('餐廳營利對照圖', fontsize=20)
plt.xlabel('人數')
plt.ylabel('利潤/萬元')
plt.grid()

# 列出1500人 利潤
people1 = 1500
frofit1 = people1 * ans[a] + ans[b]
print(f"f({people1}) = {frofit1}")
plt.plot(people1, frofit1, "-o", color='red')
# show 文字
plt.text(people1-170, frofit1+5, f"({people1}, {frofit1})")

# 列出利潤 48 萬
frofit2 = 48
people2 = (frofit2 - ans[b]) / ans[a]
print(f"f({people2}) = {frofit2}")
plt.plot(people2, frofit2, "-o", color='red')
# show 文字
plt.text(people2-170, frofit2+5, f"({people2}, {frofit2})")

plt.show()

# a=3/100
# b=-18
# f(1500) = 27
# f(2200) = 48
```

<div style="max-width:500px">
  {% asset_img pic1.png pic1 %}
</div>

#### 雞兔同籠
``` py
# 雞兔同籠
# x + y = 35
# 2x + 4y = 100
from sympy import Symbol, solve
x = Symbol("x")
y = Symbol("y")
eq1 = x + y - 35
eq2 = 2*x + 4*y -100
ans = solve((eq1, eq2))
print(ans)
print(f"雞={ans[x]}")
print(f"兔={ans[y]}")


import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

x_p = range(0,101)
y1_p = [ 35 - x_no for x_no in x_p]
y2_p = [ (100 - 2*x_no)/4 for x_no in x_p]
plt.plot(x_p, y1_p)
plt.plot(x_p, y2_p)

plt.plot(ans[x], ans[y], "-o")
plt.text(ans[x], ans[y]+5, f"({ans[x]}, {ans[y]})")

plt.xlabel('雞')
plt.ylabel('兔')
plt.grid()

plt.show()

# {x: 20, y: 15}
# 雞=20
# 兔=15
```

<div style="max-width:500px">
  {% asset_img pic2.png pic2 %}
</div>

#### 業務目標計算
``` py
# 業務目標計算
# x + y = 100(天)
# 2x + 4y = 350(萬)
from sympy import Symbol, solve
x = Symbol("x")
y = Symbol("y")
eq1 = x + y - 100
eq2 = 2*x + 4*y - 350
ans = solve((eq1, eq2))
print(ans)
print(f"菜鳥業務={ans[x]}")
print(f"資深業務={ans[y]}")

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

line_x = range(0,101)
line1_y = [ 100 - x_no for x_no in line_x]
line2_y = [ (350 - 2*x_no)/4 for x_no in line_x]
plt.plot(line_x, line1_y)
plt.plot(line_x, line2_y)

plt.plot(ans[x], ans[y], "-o")
plt.text(ans[x], ans[y]+5, f"({ans[x]}, {ans[y]})")

plt.xlabel('菜鳥業務')
plt.ylabel('資深業務')
plt.grid()

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic3.png pic3 %}
</div>

#### 垂直相交線
``` py
# 垂直相交線
# y = x
# y = -x + 2
from sympy import Symbol, solve
x = Symbol("x")
y = Symbol("y")
eq1 = x - y
eq2 = -x + 2 - y
ans = solve((eq1, eq2))
print(ans)


import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

line_x = range(-5,5)
line1_y = [  x_no for x_no in line_x]
line2_y = [ -x_no + 2 for x_no in line_x]
plt.plot(line_x, line1_y)
plt.plot(line_x, line2_y)

plt.plot(ans[x], ans[y], "-o")
plt.text(ans[x]-0.25, ans[y]+0.5, f"({ans[x]}, {ans[y]})")

plt.xlabel('x-axis')
plt.ylabel('y-axis')
plt.grid()

plt.show()
# {x: 1, y: 1}
```

<div style="max-width:500px">
  {% asset_img pic4.png pic4 %}
</div>

#### 求某一點至一條線垂直線
``` py
# 求某一點至一條線垂直線
# y = 0.5x - 0.5
# point (2,3)
# y = -2x + 7

from sympy import Symbol, solve
x = Symbol("x")
y = Symbol("y")
eq1 = 0.5*x - 0.5 - y
eq2 = -2*x + 7 - y
ans = solve((eq1, eq2))
print(ans)

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

line_x = range(-5,6)
line_y = [0.5*x_no - 0.5 for x_no in line_x]
plt.plot(line_x, line_y)

line2_x = range(-5,6)
line2_y = [-2*x_no + 7 for x_no in line2_x ]
plt.plot(line2_x, line2_y)

# point (2,3)
point_x = 2
point_y = 3
plt.plot(point_x, point_y, "-o")
plt.text(point_x-0.25, point_y+0.5, f"({point_x}, {point_y})")

# point connection
plt.plot(ans[x], ans[y], "-o")
plt.text(ans[x]-0.25, ans[y]+0.5, f"({int(ans[x])}, {int(ans[y])})")

plt.xlabel('x-axis')
plt.ylabel('y-axis')
plt.grid()
# x, y軸距長度一致
plt.axis('equal')

plt.show()
# {x: 3.00000000000000, y: 1.00000000000000}
```

<div style="max-width:500px">
  {% asset_img pic5.png pic5 %}
</div>

### 畢氏定理
#### 電影分類

<div style="max-width:500px">
  {% asset_img pic6.png pic6 %}
</div>

``` py
# 電影分類
import math

# 玩命關頭
film = [5, 7, 8, 10, 2]
film_titles = [
    "復仇者聯盟",
    "決戰中途島",
    "冰雪奇緣",
    "雙子殺手"
]
film_features = [
    [2, 8, 8, 5, 6],
    [5, 6, 9, 2, 5],
    [8, 2, 0, 0, 10],
    [5, 8, 8, 8, 3]
]

dists =[]
for p in film_features:
    distance = 0
    for i, item in enumerate(p):
        score = int(item) - int(film[i])
        distance += score * score
    dists.append(math.sqrt(distance))
good_point = 0
good_distance = dists[0]
for index, value in enumerate(dists):
    print(f"{film_titles[index]} : {value:.2f}")
    if index > 0 and dists[index] < good_distance:
        good_point = index
        good_distance = dists[index]

print(f"close movie is {film_titles[good_point]} : {dists[good_point]:.2f}")
# 復仇者聯盟 : 7.14
# 決戰中途島 : 8.66
# 冰雪奇緣 : 16.19
# 雙子殺手 : 2.45
# close movie is 雙子殺手 : 2.45
```

#### 計算兩個向量的歐幾乎里德距離
``` py
# 計算兩個向量的歐幾乎里德距離
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
distance = np.sqrt(np.sum((a-b)**2))
print(f"a and b 距離 : {distance:.2f}")
# a and b 距離 : 5.20
```

### 聯立不等式
#### 開發分析
``` py
# 開發分析
# 商用軟體: 開發費用90萬,包裝介面設計50萬
# App軟體 : 開發費用150萬,包裝介面設計20萬
# 研發成本<=1200萬
# 包裝介面<=350萬
# 每個按鍵獲利50萬,計算最大獲利
# 90x + 150y <= 1200 --> y <= -0.6x + 8
# 50x + 20y  <= 350  --> y <= -2.5x + 17.5
# z = 50x + 50y
# (若獲利 600萬) 50x + 50y = 600 --> y = -x + 12
# (5, 5) --> 50*5 + 50*5 = 500 --> y = -x + 10

from sympy import Symbol, solve

# 求 line1 line2 交叉
x = Symbol("x")
y = Symbol("y")
eq1 = -0.6*x + 8  - y
eq2 = -2.5*x + 17.5 - y
ans = solve((eq1, eq2))
print(ans)

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

line_x = range(0,15)
line1_y = [ -0.6*x_no + 8 for x_no in line_x ]
line2_y = [ -2.5*x_no + 17.5 for x_no in line_x ]
plt.plot(line_x, line1_y)
plt.plot(line_x, line2_y)

# add point connection
plt.plot(ans[x], ans[y], "-o")
plt.text(ans[x]-0.25, ans[y]+0.5, f"({int(ans[x])}, {int(ans[y])})")

line3_x = range(0,15)
# 獲利 600萬
# line3_y = [ -x_no + 12 for x_no in line3_x ]
# 獲利 500萬
line3_y = [ -x_no + 10 for x_no in line3_x ]
plt.plot(line3_x, line3_y, lw='2.0', color="green")

plt.xlabel('商用軟體')
plt.ylabel('App軟體')
# 表格顯示範圍 x:0~20,y:0~20
plt.axis([0, 20, 0, 20])
plt.grid()

plt.show()
# {x: 5.00000000000000, y: 5.00000000000000}
```

<div style="max-width:500px">
  {% asset_img pic7.png pic7 %}
</div>

### 二次函數
<div style="max-width:500px">
  {% asset_img pic8.png pic8 %}
</div>
<div style="max-width:500px">
  {% asset_img pic9.png pic9 %}
</div>

#### 解一元二次方程式的根
``` py
# 解一元二次方程式的根
# x**2 - 2x - 8 = 0
# x**2 - 2x + 1 = 0
# x**2 + x + 1 = 0
from sympy import *

# 兩個根
x = Symbol("x")
f = x**2 - 2*x - 8
roots = solve(f)
print(roots)
# [-2, 4]

# 一個根
f = x**2 - 2*x + 1
roots = solve(f)
print(roots)
# [1]

# 無實數根
f = x**2 + x + 1
roots = solve(f)
print(roots)
number_roots = [root.evalf() for root in roots]
print(number_roots)
# [-1/2 - sqrt(3)*I/2, -1/2 + sqrt(3)*I/2]
# [-0.5 - 0.866025403784439*I, -0.5 + 0.866025403784439*I]

# 算實際值(當含函數式)
f = 3*(x-2)**2 - 2
# solve 函數的輸出是符號表達式。這些表達式可能是涉及根號或其他符號的形式。
# 如果我們需要實際的數值，我們需要進一步轉換這些符號表達式為數值。
roots = solve(f)
print(roots)
number_roots = [root.evalf() for root in roots]
print(number_roots)
# [2 - sqrt(6)/3, sqrt(6)/3 + 2]
# [1.18350341907227, 2.81649658092773]
```

#### 一元二次方程式繪圖並算極值
``` py
# 一元二次方程式繪圖並算極值
# y = 3x**2 - 12x + 10 繪圖,標示兩個根,標極值
# y = -3x**2 + 12x - 9 繪圖,標示兩個根,標極值
# y = x**2 +  x + 1 (無根)
# 根的意義為 y 值為 0
from sympy import *

x = Symbol("x")
# y = 3x**2 - 12x + 10
f = 3*x**2 -12*x + 10
# y = -3x**2 + 12x - 9
# f = -3*x**2 + 12*x - 9
roots = solve(f)
# print(roots)

# y = 3x**2 - 12x + 10
def f(x) :
    return 3*x**2 -12*x + 10
def g(x) :
    return -f(x)

# y = -3x**2 + 12x - 9
def f2(x) :
    return -3*x**2 +12*x - 9

def g2(x) :
    return -f2(x)

import matplotlib.pyplot as plt
import numpy as np
from scipy.optimize import minimize_scalar

# y = 3x**2 - 12x + 10
line_x =  np.linspace(0, 4, 100)
# line_y = [3*x_no**2 - 12*x_no + 10 for x_no in line_x]
# 與前面算式相等
line_y = 3*line_x**2 - 12*line_x + 10
# y = 3x**2 + 12x - 9
# line_x =  np.linspace(0, 4, 100)
# line_y = [-3*x_no**2 + 12*x_no - 9 for x_no in line_x]
# 無根
# line_x =  np.linspace(-4, 4, 100)
# line_y = [x_no**2 +  x_no + 1 for x_no in line_x]
plt.plot(line_x, line_y)

# 標示根
for root in roots:
    x_value = root.evalf()
    # y = 3x**2 - 12x + 10
    y_value = f(x_value)
    # y = -3x**2 + 12x - 9
    # y_value = f2(x_value)
    plt.plot(x_value, y_value, "-o")
    plt.text(x_value - 0.35, y_value + 0.4, f"({x_value:.2f},{y_value:.2f})")

# 標示極值
# y = 3x**2 - 12x + 10
peak = minimize_scalar(f)
# y = -3x**2 + 12x - 9
# peak = minimize_scalar(f2)
if not(np.isinf(peak.fun)):
    # 有最小值
    limit_y = peak.fun
else:
    # y = 3x**2 - 12x + 10
    peak = minimize_scalar(g)
    # y = -3x**2 + 12x - 9
    # peak = minimize_scalar(g2)
    if not(np.isinf(peak.fun)):
        # 有最大值
        limit_y = -peak.fun
if not(np.isinf(peak.fun)):
    plt.plot(peak.x, limit_y, "-o")
    plt.text(peak.x - 0.35, limit_y + 0.4, f"({peak.x:.2f},{limit_y:.2f})")

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic10.png pic10 %}
</div>

#### 一元三次圖形繪製
``` py
# 一元三次圖形繪製
import matplotlib.pyplot as plt
import numpy as np

# 上下圖
# subplot(2,1,1)
# subplot(2,1,2)
plt.figure(figsize=[8,8])
# fig 1
plt.subplot(2,1,1)
line_x =  np.linspace(-1, 1, 100)
line_y = line_x**3 - line_x
plt.plot(line_x, line_y, color="green")
plt.grid()

# fig 2
plt.subplot(2,1,2)
line2_x =  np.linspace(-2, 2, 100)
line2_y = line2_x**3 - line2_x
plt.plot(line2_x, line2_y, color="red")
plt.grid()

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic11.png pic11 %}
</div>

#### 求一元二次方程式,並繪圖
``` py
# 求一元二次方程式,並繪圖
# 匯出 100, 200, 300 的點,及預估 400 的點
# 拜訪次數(1=100次) vs 業績(回收問卷)
# y = ax**2 + bx + c
# x = 1, y =500 --> 500 = a + b +c
# x = 2, y =1000 --> 1000 = 4a + 2b +c
# x = 3, y =2000 --> 2000 = 9a + 3b +c
from sympy import symbols, solve
import numpy as np
import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

def y_count(a, b, c, x):
    return (a*x**2 + b*x + c)

a, b, c = symbols(("a", "b", "c"))
eq1 = a + b + c - 500
eq2 = 4*a + 2*b + c - 1000
eq3 = 9*a + 3*b + c - 2000
ans = solve((eq1, eq2, eq3))
print(ans)
# {a: 250, b: -250, c: 500}

x = np.linspace(0, 5, 50)
y = ans[a]*x**2 + ans[b]*x + ans[c]
plt.plot(x,y)

for i in range(1,5):
    y_axis = y_count(ans[a], ans[b], ans[c], i)
    plt.plot(i, y_axis, "-o", color="green")
    plt.text(i - 0.6, y_axis + 200, f"({i},{y_axis})")

# 計算回收 3000 張問卷,拜訪次數
from sympy import Symbol, solve
count_value = 3000
z = Symbol("z")
eq = ans[a]*z**2 + ans[b]*z + ans[c] - count_value
ans_3000 = solve(eq)
print(ans_3000)
# [1/2 - sqrt(41)/2, 1/2 + sqrt(41)/2]
for ans_item in ans_3000:
    ans_value = ans_item.evalf()
    print(ans_value)
    if (ans_value > 0):
        plt.plot(ans_value, count_value, "-o", color="red")
        plt.text(ans_value - 0.8, count_value + 200, f"({ans_value:.2f},{count_value})")
# -2.70156211871642
# 3.70156211871642

plt.xlabel('拜訪次數(單位=100)')
plt.ylabel('業績')
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic12.png pic12 %}
</div>

#### 二次函數的配方法(標準式)
<div style="max-width:500px">
  {% asset_img pic13.png pic13 %}
</div>

#### 行銷問題分析
``` py
# 行銷問題分析
# 每月行銷次數 增加業績
#     1         10萬
#     2         18萬
#     3         19萬
# y = ax**2 + b*x + c
# a + b + c = 10
# 4a + 2b + c = 18
# 9a + 3b + c = 18

from sympy import Symbol, symbols, solve
a, b, c = symbols(("a", "b", "c"))
eq1 = a + b + c - 10
eq2 = 4*a + 2*b + c - 18
eq3 = 9*a + 3*b + c - 19
ans = solve((eq1, eq2, eq3))
print(ans)
# {a: -7/2, b: 37/2, c: -5}

# x 要放在最前面
def f(x, a, b, c) :
    return (a*x**2 + b*x + c)
def g(x, a, b, c) :
    return -f(x, a, b, c)

import matplotlib.pyplot as plt
import numpy as np
from scipy.optimize import minimize_scalar
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

x = np.linspace(0, 5, 50)
y = ans[a]*x**2 + ans[b]*x + ans[c]
plt.plot(x,y)

# 算最大值
print(ans[a].evalf(), ans[b].evalf(), ans[c].evalf())
# args 不含 x, 要轉成 float 才不會有問題
args = (float(ans[a].evalf()), float(ans[b].evalf()), float(ans[c].evalf()))
peak = minimize_scalar(g, args=args)
limit_y = -peak.fun
print(f"max ({peak.x},{limit_y})")
plt.plot(peak.x,limit_y, "-o")
plt.text(peak.x-0.3,limit_y-2, f"({peak.x:.1f},{limit_y:.1f})")
# -3.50000000000000 18.5000000000000 -5.00000000000000
# max (2.6428571428571432,19.446428571428577)

# 算業績15萬的交叉點
# 15 = -3.5**2 + 18.5*x - 5
ask_y = 15
x2 = Symbol("x2")
eq = -3.5*x2**2 + 18.5*x2 - 20
ans2 = solve(eq)
print(ans2)
for x_value in ans2:
    plt.plot(x_value,ask_y, "-o", color="green")
    plt.text(x_value+0.1,ask_y, f"({x_value:.1f},{ask_y:.1f})")
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic14.png pic14 %}
</div>

### 最小平方法(線性迴歸模型)
<div style="max-width:500px">
  {% asset_img pic15.png pic15 %}
</div>

<div style="max-width:500px">
  {% asset_img pic16.png pic16 %}
</div>

#### Numpy 實作最小平方法
{% post_link python-22 '# polyfit-計算迴歸線' %}

#### 氣溫 vs 銷售量
``` py
# 氣溫 vs 銷售量
# 氣溫x   22, 26, 23, 28, 27, 32, 30
# 銷售量y 15, 35, 21, 62, 48, 101, 86
# 預估氣溫31的銷售量
import numpy as np
x = np.array([22, 26, 23, 28, 27, 32, 30])
y = np.array([15, 35, 21, 62, 48, 101, 86])

a, b = np.polyfit(x, y, 1)
print(f"斜率{a:.2f}")
print(f"截距{b:.2f}")

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 繪迴歸直線
x2 = np.linspace(20, 35, 50)
y2 = a * x2 + b
plt.plot(x2, y2)

# 預估氣溫31的銷售量
x_count = 31
y_count = a*x_count + b
plt.plot(x_count, y_count, "-o", color="red")
plt.text(x_count-1.5, y_count+3, f"({x_count},{int(y_count)})")


for index, x_value in enumerate(x):
    plt.plot(x_value, y[index], "-o", color="green")

plt.xlabel('氣溫')
plt.ylabel('銷售量')

plt.grid()
plt.show()
# 斜率8.89
# 截距-186.30
```

<div style="max-width:500px">
  {% asset_img pic17.png pic17 %}
</div>

###  排列與組合
#### nPr(permutation-排列)
```py
# nPr(permutation-排列):從 n 個位數圖提出r個數字排列
# n*(n-1)*(n-2)...
# 4P3
# [itertools](https://docs.python.org/3/library/itertools.html)
import itertools
n = {1, 2, 3, 4}
r = 3
A = set(itertools.permutations(n, r))
print(f"元素數量 = {len(A)}")
for a in A:
    print(a)
# 元素數量 = 24
# (2, 1, 3)
# (4, 2, 1)
# .....

# 5P2
n2 = {"a", "b", "c", "d", "e"}
r2 = 2
A2 = set(itertools.permutations(n2, r2))
print(f"元素數量 = {len(A2)}")
for a2 in A2:
    print(a2)
# 元素數量 = 20
# ('c', 'b')
# ('e', 'a')
# .....
```

#### 階層觀念
```py
# 階層觀念
# 5 個客戶分別在5個城市,有多少拜訪路徑? 5!
import itertools

n = {"A", "B", "C", "D", "E"}
r = 5
A = set(itertools.permutations(n, r))
print(f"元素數量 = {len(A)}")
for a in A:
    print(a)
# 元素數量 = 120
# ('C', 'D', 'E', 'A', 'B')
# ('B', 'E', 'D', 'A', 'C')
# ......

# 30個城市客戶的路徑
# 假設電腦每秒可計算 10000000000000(10兆) 路徑, 多久可算完
import math

N2 = 30
combinations = math.factorial(N2)
print(f"combinations = {combinations}")
times = 10000000000000
years = combinations/times/60/60/24/365
print(f"計算 {years:.2f} 年")
# combinations = 265252859812191058636308480000000
# 計算 841111300774.32 年
```

#### 重複排列
```py
# 重複排列
# n**r
# 5個數字可重複排列於3個位置 5*5*5=125
import itertools
n = {1, 2, 3, 4, 5}
A = set(itertools.product(n, n , n))
print(f"元素數量 = {len(A)}")
for a in A:
    print(a)
# 元素數量 = 125
# (5, 3, 3)
# (5, 4, 2)
# .....
```

#### 組合(combination)
<div style="max-width:500px">
  {% asset_img pic18.png pic18 %}
</div>

```py
# 組合(combination) - 從5數字中選出3個數字
import itertools

n = {1, 2, 3, 4, 5}
r = 3
A = set(itertools.combinations(n , 3))
print(f"組合 = {len(A)}")
for a in A:
    print(a)
# 組合 = 10
# (2, 4, 5)
# (1, 3, 5)

# 計算2個骰子有多少組合
n2 = {1, 2, 3, 4, 5, 6}
A2 = set(itertools.combinations(n2 , 2))
print(f"骰子組合 = {len(A2)}")
# 骰子組合 = 15
```

### 機率
#### 機率基本概念
##### 計算隨機產生值,並繪出長條圖
``` py
# 隨機整數函數
# import random

# min = 1
# max = 6
# target1 = 1
# target2 = 6
# n = 10000
# counter1 = 0
# counter2 = 0
# for i in range(n):
#     once = random.randint(min, max)
#     if once == target1:
#         counter1 += 1
#     if once == target2:
#         counter2 += 1
# print(f"total{n}, target {target1} {counter1} times, 機率{counter1/n}")
# print(f"total{n}, target {target2} {counter2} times, 機率{counter2/n}")

# 計算隨機產生值,並繪出長條圖
# 隨機整數函數
import random

min = 1
max = 6
n = 10000
dice = [0] * 6
for i in range(n):
    data = random.randint(min, max)
    dice[data-1] += 1
print(dice)

import matplotlib.pyplot as plt
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

listx = range(1,7)
plt.bar(listx, dice)

plt.xlabel('數字', fontsize=14)
plt.ylabel('次數', fontsize=14)
# show 數值
for i in range(len(dice)):
    plt.text(i+1, dice[i], str(dice[i]), ha='center', va='bottom')

plt.show()
# [1618, 1699, 1674, 1692, 1696, 1621]
```

<div style="max-width:500px">
  {% asset_img pic23.png pic23 %}
</div>

##### 機率乘法與加法
``` py
# 機率乘法與加法
# 員工中獎率計算
# 7 支籤,2位中獎可抽獎

# 分數計算
from fractions import Fraction

x = Fraction(2, 7) * Fraction(1 ,6)
y = Fraction(5, 7) * Fraction(2, 6)
p = x + y
print(f"第一位中獎率 {Fraction(2, 7)}")
print(f"第二位中獎率 {p} 轉成浮點數 {float(p)}")
# 第一位中獎率 2/7
# 第二位中獎率 2/7 轉成浮點數 0.2857142857142857
```

##### 餘事件與乘法
``` py
# 餘事件與乘法
# 丟三次骰子,都不出現5的機率
# 不出現5 : (5/6)*(6/5)*(5/6)
# 所以出現5的機率:1-(5/6)*(6/5)*(5/6)
from fractions import Fraction

x = Fraction(5, 6)
p1 = x**3
p2 = 1 - p1
print(f"不出現5的機率 {float(p1)}")
print(f"出現5的機率 {float(p2)}")
# 不出現5的機率 0.5787037037037037
# 出現5的機率 0.4212962962962963
```

#### 條件機率
<div style="max-width:500px">
  {% asset_img pic19.png pic19 %}
</div>
<div style="max-width:500px">
  {% asset_img pic20.png pic20 %}
</div>

#### 貝氏定理
<div style="max-width:500px">
  {% asset_img pic21.png pic21 %}
</div>
<div style="max-width:500px">
  {% asset_img pic22.png pic22 %}
</div>

##### COVID-19 普篩準確度分析
$$P(確診|陽性) = \frac{P(陽性|確診)⋅P(確診)}{P(陽性)} $$
**快篩**
- 靈敏度（敏感度）：99%（即0.99）
- 假陽性率：1%（即0.01）
- 先驗患病率：0.01%（即0.0001）

**PCR**
- 靈敏度（敏感度）：99.99%（即0.9999）
- 假陽性率：0.01%（即0.0001）
- 先驗患病率：0.01%（即0.0001）

**計算快篩陽性確診率**
P(陽性) = 確診＊0.99 + 非確診＊0.01 
				= 0.0001*0.99 + (1-0.0001)*0.01
				= 0.000099 + 0.009999
				= 0.010098
P​(確診|陽性) = 0.99*0.0001/0.010098 = 0.0098

**計算PCR陽性確診率**
P(陽性) = 確診＊0.9999 + 非確診＊0.0001 
				= 0.0001*0.9999 + (1-0.0001)*0.0001
				= 0.00009999 + 0.00009999
				= 0.00019998
P​(確診|陽性) = 0.9999*0.0001/0.00019998 = 0.5
 
**結果**
- 快篩陽性結果確診率：約0.98%
- PCR陽性結果確診率 ：約50%

快篩即使測試具有高靈敏度和特異性，當患病率非常低時，假陽性結果仍會顯著影響快篩測試的後驗概率，而PCR測試在低患病率的情況下能提供更準確的後驗概率。

##### 醫學例子分析
某疾病測試,對有疾病測出有真陽性為99%,對無疾病測出真陰性為99%,假設在某群體中,有疾病的機率為1%
若一個人測出陽性,他有疾病的機率是多少?
$$P(病|陽性) = \frac{P(陽性|病)⋅P(病)}{P(陽性)} $$
P(陽性) = 病＊0.99 + 無病＊0.01 
				= 0.01*0.99 + (1-0.01)*0.01
				= 0.0099 + 0.0099
				= 0.0198
P​(病|陽性) = 0.99*0.01/0.0198 = 0.5

``` py
P_A = 0.01          #疾病率
P_B_given_A = 0.99  #有疾病準確率
# 陽性機率
P_B = 0.01*0.99 + (1 - 0.01)*0.01
#陽性有病機率
P_A_given_B = P_B_given_A * P_A / P_B
print(f"陽性有疾病的機率 {P_A_given_B}")
# 陽性有疾病的機率 0.5
```

##### 垃圾郵件分類實作
$$P(spam∣words) = \frac{P(words∣spam)⋅P(spam)}{P(words)} $$
$$P(ham∣words) = \frac{P(words∣ham)⋅P(ham)}{P(words)} $$
因為 P(words) 在兩個公式中是相同的，因此可以忽略：
這樣，我們只需要比較 P(words∣spam)⋅P(spam) 和 P(words∣ham)⋅P(ham) 的大小即可。

``` py
# 垃圾郵件分類實作
import numpy as np

# 垃圾郵件數據
spam_emails = [
    "Get a free gift card now!",
    "Limited time offer: Claim your prize!",
    "You have won a free iPhone!"
]
# 非垃圾郵件數據
ham_emails = [
    "Meeting rescheduled for tomorrow",
    "Can we discuss the repoet later?",
    "Thank you for your prompt reply."
]

# 單詞計算
def count_words(emails):
    word_count= {}
    for email in emails:
        for word in email.split():
            word = word.lower()
            if word not in word_count:
                word_count[word] = 1
            else:
                word_count[word] += 1
    return word_count


# check email 型別
# 使用 ln(log 底數e)算機率的優點
# 1. 避免數值下溢：當計算多個小機率值的乘積時，避免結果變得極小。
# 2. 計算穩定性：轉換為求和運算使得計算更加穩定。
# 3. 簡化比較：分類時直接比較對數和，比比較原始機率乘積更簡單。
def classify_email(email):
    words = email.lower().split()
    spam_prob = np.log(prior_spam)
    ham_prob = np.log(prior_ham)
    # print(f"spam_prob={prior_spam}{spam_prob}")
    # print(f"ham_prob={prior_ham}{ham_prob}")
    for word in words:
        # word 存在 get word value, 不存在 get 1/ (total_spam_words+2)
        spam_prob += np.log(spam_word_prob.get(word, 1/ (total_spam_words+2)))
        ham_prob += np.log(ham_word_prob.get(word, 1/ (total_ham_words+2)))
    print(f"spam_prob:{spam_prob} ham_prob:{ham_prob}")
    return "垃圾郵件" if spam_prob > ham_prob else "非垃圾郵件"

# 計算每個字的機率, +1 避免機率為零的情況, 分母 +2 而不是+1，是為了更好的平滑效果。
# 這樣做的目的是考慮訓練數據中未出現過的單詞。實際上，+2 是一個常見的變種，
# 但你也可以看到其他變種，如+1 或者+V（單詞表的大小）
def word_probability(word_count, total_count):
    # 使用拉普拉斯平滑
    return {word:(count+1)/(total_count+2) for word, count in word_count.items()}

# 先驗機率 prior probabilities:無條件下的比例
# 條件機率 conditional probabilities:依條件算出的機率(如單詞)
prior_spam = len(spam_emails) / (len(spam_emails) + len(ham_emails))
prior_ham = len(ham_emails) / (len(spam_emails) + len(ham_emails))
print(f"垃圾郵件先驗機率:{prior_spam}")
print(f"正常郵件先驗機率:{prior_ham}")
print("="*70)

# 計算單詞
spam_word_count = count_words(spam_emails)
ham_word_count  = count_words(ham_emails)
print(f"垃圾郵件單詞:{spam_word_count}")
print(f"正常郵件單詞:{ham_word_count}")
print("="*70)

# 計算單詞總數
total_spam_words = sum(spam_word_count.values())
total_ham_words = sum(ham_word_count.values())
print(f"垃圾郵件總單詞:{total_spam_words}")
print(f"正常郵件總單詞:{total_ham_words}")
print("="*70)

# 對郵件進行單詞機率計算
spam_word_prob = word_probability(spam_word_count, total_spam_words)
ham_word_prob = word_probability(ham_word_count, total_ham_words)
print(f"垃圾郵件字典單詞機率:{spam_word_prob}")
print(f"正常郵件字典單詞機率:{ham_word_prob}")
print("="*70)

# 測試分類器
test_email = "Claims your free gift now"
print(f"郵件:{test_email} 分類結果:{classify_email(test_email)}")
test_email = "Can we discuss your decision tomorrow"
print(f"郵件:{test_email} 分類結果:{classify_email(test_email)}")
# spam_prob:-13.1869018985419 ham_prob:-14.451858789480825
# 郵件:Claims your free gift now 分類結果:垃圾郵件
# spam_prob:-17.974393641323946 ham_prob:-14.569641825137209
# 郵件:Can we discuss your decision tomorrow 分類結果:非垃圾郵件
```

#### 蒙地卡羅模擬計算PI
``` py
# 蒙地卡羅模擬計算PI - 𝝿
# 2 * 2 正方形
# 圓面積/矩形面積 = PI / 4
# PI = 4 * hins / 1000000
import random

trials = 1000000
hits = 0
for i in range(trials):
    x = random.random()*2 - 1
    y = random.random()*2 - 1
    if x*x + y*y <= 1:
        hits += 1
PI = 4 * hits / trials
print(f"PI={PI}")
# PI = 3.144032
```

``` py
# 蒙地卡羅模擬計算PI - 𝝿 繪圖
import matplotlib.pyplot as plt
import random
import math

trials = 5000
hits = 0
radius = 50
for i in range(trials) :
    x = random.randint(1, 100)
    y = random.randint(1, 100)
    if math.sqrt((x-50)**2 + (y-50)**2) <= radius:
        plt.plot(x, y, "-o", c="y")
        hits += 1
    else:
        plt.plot(x, y, "-o", c="g")

PI = 4 * hits / trials
print(f"PI={PI}")

plt.axis('equal')
plt.show()
# PI=3.1272
```

<div style="max-width:500px">
  {% asset_img pic24.png pic24 %}
</div>

### 二項式定理
二項式定理主要是講解二項式次方的展開 $(x+y)^n$
#### 二項式展開與規律性
<div style="max-width:500px">
  {% asset_img pic25.png pic25 %}
</div>

#### 找出 $x^{n-k}y^k$ 係數
二項式定理如下:
$$ (x+y)^n =  \sum_{k=0}^n\left( ^n_k\right)x^{n-k}y^k $$
其中 $\left( ^n_k\right)$是二項式係數,表從n個物品中取出k個的方式數,公式如下
$$ \left( ^n_k\right) = \frac{n!}{k!(n-k)} $$
若推算 $(x+y)^5=x^5+5x^4y+10x^3y^2+10x^2y^3+5x^1y^4+y^5$
k=0 --> $\frac{5!}{0!(5-0)!}=\frac{5!}{0!5!}=1$
k=1 --> $\frac{5!}{1!(5-1)!}=\frac{5!}{1!4!}=5$
k=2 --> $\frac{5!}{2!(5-2)!}=\frac{5!}{2!3!}=10$
k=3 --> $\frac{5!}{3!(5-3)!}=\frac{5!}{3!2!}=10$
k=4 --> $\frac{5!}{4!(5-4)!}=\frac{5!}{4!1!}=5$
k=5 --> $\frac{5!}{5!(5-5)!}=\frac{5!}{5!0!}=1$

#### 二項式應用於業務分析
假設推銷成功率為0.75(所以失敗率為0.25)
機率公式如下
$ P(x=k)=\left( ^n_k\right)p^k(1-p)^{n-k}$
##### 5次銷售皆失敗的機率
x 表成功次數
P(x=0) = 1 - 0.75 = 0.25
5次銷售皆失敗的機率
$ P(x=0)=(0.25)^5=0.0009765625=0.09765625\\% $

##### 僅1次銷售成功的機率
$ P(x=1)=\left( ^5_1\right)(0.75)(0.25)^4=5(0.75)(0.25)^4=0.0146484375=1.46484375\\% $
##### 僅2次銷售成功的機率
$ P(x=2)=\left( ^5_2\right)(0.75)^2(0.25)^3=10(0.75)^2(0.25)^3=0.087890625=8.7890625\\% $

#### 業務分析機率計算集繪製長條圖
``` py
# 業務分析機率計算集繪製長條圖
import matplotlib.pyplot as plt
import math
# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

def probability(k):
    num = math.factorial(n)/(math.factorial(k)*math.factorial(n-k))
    return num*success**(k)*fail**(n-k)

n = 5
success = 0.75
# 修改次數及成功率
# n = 10
# success = 0.35
fail = 1 - success
p = []
for k in range(0,n+1):
    if k == 0:
        p.append(fail**n)
    elif k == n:
        p.append(success**n)
    else:
        p.append(probability(k))

# show 機率加總
# total = 0
# for value in p:
#     total += value
#     print(f"{value} {total}")

print(p)
listx = [i for i in range(0,n+1) ]
plt.bar(listx, p)

plt.title(f'銷售機率分析n={n} 成功率:{success}')
plt.xlabel('銷售成功數')
plt.ylabel('機率')

plt.show()
# 0.0009765625 0.0009765625
# 0.0146484375 0.015625
# 0.087890625 0.103515625
# 0.263671875 0.3671875
# 0.3955078125 0.7626953125
# 0.2373046875 1.0
# [0.0009765625, 0.0146484375, 0.087890625, 0.263671875, 0.3955078125, 0.2373046875]

# [0.013462743344628911, 0.0724916949326172, 0.17565295310595708, 0.25221962497265626, 0.2376684927626953, 0.1535704107082031, 0.0689097996767578, 0.02120301528515624, 0.0042813780864257795, 0.0005123016513671872, 2.758547353515623e-05]
```

<div style="max-width:500px">
  {% asset_img pic26.png pic26 %}
</div>

<div style="max-width:500px">
  {% asset_img pic27.png pic27 %}
</div>

#### 使用 numpy binomial 產生業務分析資料繪圖
``` py
# 使用 numpy binomial 產生業務分析資料繪圖
import matplotlib.pyplot as plt
import numpy as np
# pip install seaborn
import seaborn as sns

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

n = 5
success = 0.75
# 修改次數及成功率
# n = 10
# success = 0.35
# numpy.random.binomial 函數用於生成來自二項式分布的隨機樣本
# n 次獨立試驗中，成功 k 次的可能性，每次試驗成功的概率為 𝑝, siz為生成資料數量
samples = np.random.binomial(n=n , p=success, size=1000)
# print(len(samples))
# print(samples)
# kde=True 會劃出核密度估計曲線
sns.histplot(samples, kde=False)
plt.title(f'銷售機率分析 Binomial ={n} 成功率:{success}')
plt.xlabel('銷售成功數')
plt.ylabel('成功次數')
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic28.png pic28 %}
</div>

### 指數
#### 繪製執行時間關係圖(n=1~5)
``` py
# 繪製執行時間關係圖(n=1~5)
# O(1), O(logn), O(n), O(nlogn), O(n*n)
import matplotlib.pyplot as plt
import numpy as np

xpt = np.linspace(1,5,5)
print(xpt)
ypt1 = xpt / xpt
ypt2 = np.log2(xpt)
ypt3 = xpt
ypt4 = xpt*np.log2(xpt)
ypt5 = xpt*xpt
print(ypt1)
print(ypt2)
print(ypt3)
print(ypt4)
print(ypt5)

plt.plot(xpt, ypt1, '-o', label="O(1)")
plt.plot(xpt, ypt2, '-o', label="O(logn)")
plt.plot(xpt, ypt3, '-o', label="O(n)")
plt.plot(xpt, ypt4, '-o', label="O(nlogn)")
plt.plot(xpt, ypt5, '-o', label="O(n*n)")
plt.legend(loc="best")
plt.axis("equal")
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic29.png pic29 %}
</div>

#### 繪製 $y=2^x, y=4^x$
``` py
# 繪製 y=2**x, y=4**x
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 30)
y2 = 2 ** x
y4 = 4 ** x

plt.plot(x, y2, label="2**x")
plt.plot(x, y4, label="4**x")
plt.plot(0, 1, '-o')

plt.legend(loc="best")
plt.axis([-3, 3, 0, 20])
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic30.png pic30 %}
</div>

####  繪製 $y=0.5^x, y=0.25^x$
``` py
# 繪製 y=0.5**x, y=0.25**x(底數小於1)
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-3, 3, 30)
y2 = 0.5 ** x
y4 = 0.25 ** x

plt.plot(x, y2, label="0.25**x")
plt.plot(x, y4, label="0.5**x")
plt.plot(0, 1, '-o')

plt.legend(loc="best")
plt.axis([-3, 3, 0, 20])
plt.grid()
plt.show()
```
<div style="max-width:500px">
  {% asset_img pic31.png pic31 %}
</div>

### 對數
#### 繪對數 2 及 0.5 的圖形
``` py
# 繪對數 2 及 0.5 的圖形
import matplotlib.pyplot as plt
import numpy as np
import math

x1 = np.linspace(0.1, 10, 90)
y1 = [math.log2(x) for x in x1 ]
y2 = [math.log(x, 0.5) for x in x1 ]

print(y1)
print(y2)
plt.plot(x1, y1, label="base=2")
plt.plot(x1, y2, label="base=0.5")

plt.legend(loc="best")
# plt.axis([-3, 3, 0, 20])
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic32.png pic32 %}
</div>

### 歐拉數與邏輯函數 
#### 歐拉數-Euler's Number
$$ 歐拉數 e = \lim_{n \to \infty}\left( 1+\frac{1}{n} \right)^n \approx 2.718281778... $$
##### 繪製歐拉數圖形
``` py
# 繪製歐拉數圖形
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.1, 1000, 100000)
y = [(1+1/x)**x for x in x]
plt.plot(x, y, label="Euler's Number")

plt.legend(loc="best")
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic33.png pic33 %}
</div>

#### 邏輯函數(logistic function)
邏輯函數是一種常見的S(Sigmoid)函數值介於0~1之間,簡單邏輯函數定義如下
$ y = f(x) = \frac{1}{1+e^{-x}} $

##### 繪製邏輯函數
``` py
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-5, 5, 10000)
y = [1/(1+np.e**-x) for x in x]
plt.plot(x, y, label="Logistic function")

plt.axis([-5, 5, 0, 1])
plt.legend()
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic34.png pic34 %}
</div>

##### Sigmoid 函數
<div style="max-width:500px">
  {% asset_img pic35.png pic35 %}
</div>

#### logit 函數
logit是logistic的反函數,它將(0,1)區間數值轉為實數全域,讓我們可以將機率數值轉成實數,進行數學操作
##### Odds
Odds可翻譯為勝率,優勢比或賠率
骰子投出6的機率 $ P = \frac{1}{6} % $
骰子投出6的 $ Odds = \frac{P}{1-P} =  \frac{\frac{1}{6}}{\frac{5}{6}} = \frac{1}{5} $

##### Odds 到 logit
logit 就是 log of Odds(log 底數為 e)
$logit = log(Odds) = log(\frac{P}{1-P}) = ln(\frac{P}{1-P})$
logit 也常被稱為 對數勝率(log odds)
若發生率為 0.7, $logist(0.7) = ln(\frac{0.7}{1-0.7})$

##### 繪製 logit 函數
``` py
# 繪製 0.1 ~ 9.99 的 logit 函數
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0.01, 0.99, 100)
y = [np.log(x/(1-x)) for x in x]
plt.plot(x, y, label="logit function")
plt.plot(0.5, np.log(0.5/(1-0.5)), "-o")
print(np.log(0.5/(1-0.5)))

plt.axis([0, 1, -5, 5])
plt.legend()
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic36.png pic36 %}
</div>

##### 推算出錯率與回購率的關係
無出錯回購率40%
1次出錯回購率15%
求2次出錯回購率?

**無出錯賠率和對數賠率**
P(x=0) = 0.4
Odds(x=0)= 0.4/(1-0.4) = 0.666..
logist(x=0) = ln(0.4/(1-0.4)) = -0.405..

**1次錯賠率和對數賠率**
P(x=1) = 0.15
Odds(x=1)= 0.15/(1-0.15) = 0.176..
logist(x=1) = ln(0.15/(1-0.15)) = -1.734..

**logist模型設定**
假設對數賠率與錯誤次數有關 Log Odds = ax + b
x=0 
b = -0.405
x=1
a + b = -1.734  --> a = -1.329
所以模型是
Log Odds = -1.329x - 0.405

**預測2次錯回購率**
***計算對數賠率***
logist(x=2) = -1.329*2 - 0.405 = -3.063
***轉換為賠率***
$ Odds(x=2)= e^-3.063 = 0.046$
***轉換為回購率***
$ \frac{P}{1-P}=0.046 $
P = 0.046 - 0.046P
$ P = \frac{0.046}{1+0.046} = 0.044 = 4.4\\% $ 

### 三角函數
<div style="max-width:500px">
  {% asset_img pic37.png pic37 %}
</div>

#### 角度弧度的換算
``` py
# 角度弧度的換算
import numpy as np

degrees = [30, 45, 60, 90, 120, 135, 150, 180]
for degree in degrees:
    print(f"角度={degree} 弧度={np.pi*degree/180:.3f}")
# 角度=30 弧度=0.524
# 角度=45 弧度=0.785
# 角度=60 弧度=1.047
# 角度=90 弧度=1.571
# 角度=120 弧度=2.094
# 角度=135 弧度=2.356
# 角度=150 弧度=2.618
# 角度=180 弧度=3.142
```

#### 計算弧長
``` py
# 計算弧長
# 弧度 = 2𝝿r * degree/360
import numpy as np

r = 10
degrees = [30, 60, 90, 120]
for degree in degrees:
    print(f"角度={degree:3d} 弧長={2*np.pi*r*degree/360:.3f}")
# 角度= 30 弧長=5.236
# 角度= 60 弧長=10.472
# 角度= 90 弧長=15.708
# 角度=120 弧長=20.944
```

#### 計算sin(), cos()
``` py
# 計算sin(), cos()
import numpy as np

degrees = [x*30 for x in range(0,13)]
for d in degrees:
    rad = np.radians(d)
    sin = np.sin(rad)
    cos = np.cos(rad)
    print(f"度數:{d:3d}\t弧度:{rad:3.2f}\tsin{d:3d}={sin:3.2f} cos{d:3d}={cos:3.2f}")
# 度數:  0        弧度:0.00       sin  0=0.00 cos  0=1.00
# 度數: 30        弧度:0.52       sin 30=0.50 cos 30=0.87
# 度數: 60        弧度:1.05       sin 60=0.87 cos 60=0.50
# 度數: 90        弧度:1.57       sin 90=1.00 cos 90=0.00
# 度數:120        弧度:2.09       sin120=0.87 cos120=-0.50
# 度數:150        弧度:2.62       sin150=0.50 cos150=-0.87
# 度數:180        弧度:3.14       sin180=0.00 cos180=-1.00
# 度數:210        弧度:3.67       sin210=-0.50 cos210=-0.87
# 度數:240        弧度:4.19       sin240=-0.87 cos240=-0.50
# 度數:270        弧度:4.71       sin270=-1.00 cos270=-0.00
# 度數:300        弧度:5.24       sin300=-0.87 cos300=0.50
# 度數:330        弧度:5.76       sin330=-0.50 cos330=0.87
# 度數:360        弧度:6.28       sin360=-0.00 cos360=1.00
```

#### 角度繪圓
``` py
# 角度繪圓
import matplotlib.pyplot as plt
# import numpy as np
import math

degrees = [x*15 for x in range(0,25)]
x = [math.cos(math.radians(d)) for d in degrees]
y = [math.sin(math.radians(d)) for d in degrees]

plt.scatter(x, y)
plt.plot(x,y)
plt.axis("equal")
plt.grid()
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic38.png pic38 %}
</div>

#### 產生一年的 sin, cos 值
``` py
# 產生一年的 sin, cos 值
import pandas as pd
import numpy as np

dates = pd.date_range(start="2023-01-01", end="2023-12-31")
df = pd.DataFrame(data={'date':dates})
df['day_of_year'] = df['date'].dt.day_of_year
df["sin_day_of_year"] = np.sin(2*np.pi*df["day_of_year"]/365)
df["cos_day_of_year"] = np.cos(2*np.pi*df["day_of_year"]/365)
print(df)
#           date  day_of_year  sin_day_of_year  cos_day_of_year
# 0   2023-01-01            1     1.721336e-02         0.999852
# 1   2023-01-02            2     3.442161e-02         0.999407
# 2   2023-01-03            3     5.161967e-02         0.998667
# 3   2023-01-04            4     6.880243e-02         0.997630
# 4   2023-01-05            5     8.596480e-02         0.996298
# ..         ...          ...              ...              ...
# 360 2023-12-27          361    -6.880243e-02         0.997630
# 361 2023-12-28          362    -5.161967e-02         0.998667
# 362 2023-12-29          363    -3.442161e-02         0.999407
# 363 2023-12-30          364    -1.721336e-02         0.999852
# 364 2023-12-31          365     6.432491e-16         1.000000
```

### 基礎統計與大型訊算子
#### 數據中心指標
平均數(mean)
中位數(median):若中間有兩個數值則取平均值
眾數(mode):數據中出現次數最高次數的數字

``` py
import numpy as np
import statistics as st

x = [66, 57, 25, 80, 60, 15, 120, 39, 80, 50]
x2 = [66, 57, 25, 80, 60, 15, 120, 39, 80, 50, 77]
print(f"加總: {sum(x)}")
print(f"平均數: {sum(x)/len(x)}")
print(f"平均數2: {np.mean(x)}")
# 中位數
print(f"中位數: {np.median(x)}")
print(f"中位數2: {np.median(x2)}")
# bincount 傳回 array lenth 為最大值 +1
# x 陣列必需為正整數陣列, 傳回 array 為 0 ~ max 數字數量
print(f"x bincount : {len(np.bincount(x))}")
print(f"x2 bincount : {len(np.bincount(x2))}")
# argmax 傳回最大值索引
print(f"x argmax : {np.argmax(x)} {x[np.argmax(x)]}")
print(f"x2 argmax : {np.argmax(x2)} {x2[np.argmax(x)]}")
# argmin 傳回最小值索引
print(f"x argmin : {np.argmin(x)} {x[np.argmin(x)]}")
print(f"x2 argmin : {np.argmin(x2)} {x2[np.argmin(x)]}")
# 眾數(mode):出現最高次數的數字
print(f"x mode:{st.mode(x)}")

# 加總: 592
# 平均數: 59.2
# 平均數2: 59.2
# 中位數: 58.5
# 中位數2: 60.0
# x bincount : 121
# x2 bincount : 121
# x argmax : 6 120
# x2 argmax : 6 120
# x argmax : 5 15
# x2 argmax : 5 15
# x mode:80
```

#### 繪製成績分布圖
##### 繪製成績長條圖
``` py
# 繪製成績長條圖
import matplotlib.pyplot as plt
import numpy as np
import statistics as st

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

sc = [60,10,40,80,80,30,80,60,70,90,50,50,50,70,60,80,80,50,60,70,
      70,40,30,70,60,80,20,80,70,50,90,80,40,40,70,60,80,30,20,70]
print(f"平均成績 = {np.mean(sc)}")
print(f"中位數成績 = {np.median(sc)}")
print(f"眾數成績 = {st.mode(sc)}")

hist = [0] * 9
for s in sc :
    n = int(s/10) - 1
    hist[n] += 1
# print(hist)

x = np.arange(len(hist))
plt.bar(x, hist, width=0.5 )

plt.xticks(x, (10,20,30,40,50,60,70,80,90))
plt.title("成績表")
plt.xlabel("分數")
plt.ylabel("學生人數")
plt.show()
# 平均成績 = 59.25
# 中位數成績 = 60.0
# 眾數成績 = 80
```

<div style="max-width:500px">
  {% asset_img pic39.png pic39 %}
</div>

##### 繪製成績直方圖
```py
# 繪製成績直方圖
import matplotlib.pyplot as plt
import numpy as np
import statistics as st

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

sc = [60,10,40,80,80,30,80,60,70,90,50,50,50,70,60,80,80,50,60,70,
      70,40,30,70,60,80,20,80,70,50,90,80,40,40,70,60,80,30,20,70]

plt.hist(sc, 9)

plt.title("成績表")
plt.xlabel("分數")
plt.ylabel("學生人數")
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic40.png pic40 %}
</div>

##### 繪製成績直方圖(兩個成績)
```py
# 繪製成績直方圖(兩個成績)
import matplotlib.pyplot as plt
import numpy as np
import statistics as st

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]

sc1 = [60,10,40,80,80,30,80,60,70,90,50,50,50,70,60,80,80,50,60,70,
      70,40,30,70,60,80,20,80,70,50,90,80,40,40,70,60,80,30,20,70]
sc2 = [50,10,60,80,70,30,80,60,30,90,50,50,50,90,70,60,50,80,50,70,
      60,50,30,70,70,80,10,80,70,50,90,80,40,50,70,60,80,40,20,70]

plt.hist([sc1, sc2], 9)

plt.title("成績表")
plt.xlabel("分數")
plt.ylabel("學生人數")
plt.show()
```

<div style="max-width:500px">
  {% asset_img pic41.png pic41 %}
</div>

#### 數據分散指標
##### 變異數
**變異數**
$$ 變異數 = \frac{1}{n}\sum_{i=1}^{n}(x_i-\overline{x})^2$$
**樣本變異數**
樣本變異數除以(n-1)作為母體便異數的布偏愛(unbiased)估計量
$$ 樣本變異數 = \frac{1}{n}\sum_{i=1}^{n}(x_i-\overline{x})^2$$
**變異數公式**
<div style="max-width:500px">
  {% asset_img pic42.png pic42 %}
</div>

**計算銷售數據變異數**
``` py
import numpy as np
import statistics as st
x = [66, 58, 25, 78, 58, 15, 120, 39, 82, 50]

print(f"Numpy 母體變異數     : {np.var(x):6.2f}")
print(f"Numpy 樣本變異數     : {np.var(x, ddof=1):6.2f}")
print(f"Statistics 母體變異數: {st.pvariance(x):6.2f}")
print(f"Statistics 樣本變異數: {st.variance(x):6.2f}")
# Numpy 母體變異數     : 823.49
# Numpy 樣本變異數     : 914.99
# Statistics 母體變異數: 823.49
# Statistics 樣本變異數: 914.99
```


