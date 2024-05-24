---
title: 機器學習最強入門:基礎數學/機率/統計邁向AI真實數據
abbrlink: 39d2
date: 2024-05-15 15:32:27
categories: Coding
tags:
	- python
	- book
	- ML
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