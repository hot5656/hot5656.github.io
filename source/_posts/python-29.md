---
title: matplotlib.pyplot 3D
abbrlink: f913
date: 2024-05-17 15:56:48
categories: Coding
tags:
	- python
---

### Example

<!--more-->

#### 二元函數3D圖(Z=X+Y)
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

#### 等高圖
``` py
# 等高圖
# f(x,y) = sin(..)
import matplotlib.pyplot as plt
import numpy as np

# windows 使用 微軟正黑體
plt.rcParams["font.family"] = ["Microsoft JhengHei"]
# 顯示負號
plt.rcParams["axes.unicode_minus"] = False

x = np.linspace(-5, 5, 30)
y = np.linspace(-5, 5, 30)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

fig = plt.figure(figsize= (10, 6))
ax1 = fig.add_subplot(221, projection='3d')
ax1.plot_wireframe(X, Y, Z, linewidth=0.5, cmap="rainbow") # 繪製 3D 框線
ax1.set_title('3D 網格圖')
# set label
ax1.set_xlabel('X')
ax1.set_ylabel('Y')
ax1.set_zlabel('Z')

ax2 = fig.add_subplot(222, projection='3d')
ax2.plot_surface(X, Y, Z, cmap="rainbow")  # 繪製 3D 表面圖
ax2.set_title('3D 表面圖')
# set label
ax2.set_xlabel('X')
ax2.set_ylabel('Y')
ax2.set_zlabel('Z')

ax3 = fig.add_subplot(223)
countour = ax3.contour(X, Y, Z, cmap="rainbow") # 繪製 3D 框線
ax3.set_title('等高線圖')
# set label
ax3.set_xlabel('X')
ax3.set_ylabel('Y')
fig.colorbar(countour)

ax4 = fig.add_subplot(224)
countourf = ax4.contourf(X, Y, Z, cmap="rainbow")  # 繪製 3D 表面圖
ax4.set_title('填充等高線圖')
# set label
ax4.set_xlabel('X')
ax4.set_ylabel('Y')
fig.colorbar(countourf)

plt.show()
```

<div style="max-width:500px">
  {% asset_img pic2.png pic2 %}
</div>


### Ref
+ [Matplotlib-The mplot3d toolkit](https://matplotlib.org/stable/users/explain/toolkits/mplot3d.html)