---
layout: post
title: 【Matplotlib】3D视图
categories:
tags: 0x70_可视化
keywords:
description:
order: 726
---
全部都是matplotlib的官方案例
## plot_surface:面
```py
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
import numpy as np

fig = plt.figure()
ax = fig.gca(projection='3d')

# Make data.
X = np.arange(-5, 5, 0.25)
Y = np.arange(-5, 5, 0.25)
X, Y = np.meshgrid(X, Y)
R = np.sqrt(X ** 2 + Y ** 2)
Z = np.sin(R)

# Plot the surface.

# surf = ax.plot_surface(X, Y, Z, cmap='autumn',linewidth=0, antialiased=False)
surf = ax.plot_surface(X, Y, Z, cmap='coolwarm', linewidth=0, antialiased=False)

# Customize the z axis.
# ax.set_zlim(-1.01, 1.01)
# ax.zaxis.set_major_locator(LinearLocator(10))
# ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))

# Add a color bar which maps values to colors.
fig.colorbar(surf, shrink=0.5, aspect=5)

plt.show()

# 自动旋转：
# for angle in range(0, 360):
#     ax.view_init(30, angle)
#     plt.draw()
#     plt.pause(.001)
```
![plot_surface](http://matplotlib.org/_images/sphx_glr_surface3d_001.png)  
[plot_surface](http://matplotlib.org/gallery/mplot3d/surface3d.html)[^plot_surface]

## plot：线
```py
import matplotlib as mpl
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import matplotlib.pyplot as plt

mpl.rcParams['legend.fontsize'] = 10

fig = plt.figure()
ax = fig.gca(projection='3d')

# Prepare arrays x, y, z
theta = np.linspace(-4 * np.pi, 4 * np.pi, 100)
z = np.linspace(-2, 2, 100)
r = z**2 + 1
x = r * np.sin(theta)
y = r * np.cos(theta)

ax.plot(x, y, z, label='parametric curve')
ax.legend()

plt.show()
```

![a](http://matplotlib.org/_images/sphx_glr_lines3d_001.png)  
[plot](http://matplotlib.org/gallery/mplot3d/lines3d.html)[^plot]  

## scatter：点

```py
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
n = 100
for c, m, zlow, zhigh in [('r', 'o', -50, -25), ('b', '^', -30, -5)]:
    xs = 23 + 4 * np.random.rand(n)
    ys = 100 * np.random.rand(n)
    zs = zlow + (zhigh - zlow) * np.random.rand(n)
    ax.scatter(xs, ys, zs, c=c, marker=m)

ax.set_xlabel('X Label')
ax.set_ylabel('Y Label')
ax.set_zlabel('Z Label')

plt.show()
```
![scatter](http://matplotlib.org/_images/sphx_glr_scatter3d_001.png)  
[scatter](http://matplotlib.org/gallery/mplot3d/scatter3d.html)[^scatter]  


## 参考文献
[^plot_surface]: [plot_surface](http://matplotlib.org/gallery/mplot3d/surface3d.html)  
[^plot]: [plot](http://matplotlib.org/gallery/mplot3d/lines3d.html)  
[^scatter]: [scatter](http://matplotlib.org/gallery/mplot3d/scatter3d.html)  
