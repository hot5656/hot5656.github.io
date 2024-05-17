---
title: matplotlib.pyplot 3D
abbrlink: f913
date: 2024-05-17 15:56:48
categories: Coding
tags:
	- python
---

### Example
#### Z = X + Y
``` py
# Z = X + Y
import matplotlib.pyplot as plt
import numpy as np

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

# 畫單張圖
# fig, ax = plt.subplots(subplot_kw={"projection":"3d"})
# or
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

# 多單張圖
# fig = plt.figure(figsize= (10, 8))
# ax1 = fig.add_subplot(121, projection='3d')
# ax1 = fig.add_subplot(122, projection='3d')

# 建立資料
x = np.arange(start=-4, stop=5)
y = np.arange(start=-4, stop=5)
X, Y = np.meshgrid(x, y)
# 建立子圖
Z = X + Y

# 繪製 3D 圖
ax.scatter(X, Y, Z, color='b')  # 散佈圖
ax.plot_wireframe(X, Y, Z, color='g') # 繪製 3D 框線

# set title
ax.set_title('繪圖3D網格圖', fontsize=16, color='b')
# set label
ax.set_xlabel('X軸', color='g')
ax.set_ylabel('Y軸', color='g')
ax.set_zlabel('Z軸', color='g')

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic1.png pic1 %}
</div>

