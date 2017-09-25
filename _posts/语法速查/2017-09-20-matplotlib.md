---
layout: post
title: 【Python】【matplotlib】绘图
categories: Geek
tags: 语法速查
keywords:
description:
---





## 示例


```py
import matplotlib.pyplot as plt
import numpy as np
x=np.linspace(0,6,1000)
y=np.sin(x)
z=np.cos(x**2)
plt.plot(x,y,label="$sin(x)$",color='red',linewidth=2)
#label 可以用LaTeX
plt.plot(x,z,'b--',label='$cos(x^2)$')

plt.xlabel('Time(s)')
plt.ylabel('Volt')
plt.title('Pyplot')
plt.ylim(-1.2,1.2)
plt.legend()

plt.show()
```

*linestyle&marker可以搭配使用，例如'.-'，例如'+--'*  


## matplotlib.rcParams
*<class 'matplotlib.RcParams'> ， 可以按照dict理解*   
存放了基本配置，这里拣选一部分进行说明：  

|变量|意义|
|--|--|
|savefig.dpi|点击工具栏里save进行保存时的dpi|
|savefig.directory|点击工具栏里save进行保存时的默认目录|


## 区域

```py
import numpy as np
import matplotlib.pyplot as plt


def func1(x):
    return 0.6 * x + 0.3


def func2(x):
    return 0.4 * x * x + 0.1 * x + 0.2


def find_curve_intersects(x, y1, y2):
    d = y1 - y2
    idx = np.where(d[:-1] * d[1:] <= 0)[0]
    xl, x2 = x[idx], x[idx + 1]
    d1, d2 = d[idx], d[idx + 1]
    return -d1 * (x2 - xl) / (d2 - d1) + xl


x = np.linspace(-3, 3, 100)
f1 = func1(x)
f2 = func2(x)
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, f1)
ax.plot(x, f2)

x1, x2 = find_curve_intersects(x,f1, f2)
ax.plot(x1, func1(x1), "o")
ax.plot(x2, func1(x2), "o")

ax.fill_between(x, f1, f2, where=f1 > f2, facecolor='green', alpha=0.5)

from matplotlib import transforms

trans = transforms.blended_transform_factory(ax.transData, ax.transAxes)
ax.fill_between([x1, x2], 0, 1, transform=trans, alpha=0.1)

a = ax.text(0.05, 0.95, "intersection of two curves",
            transform=ax.transAxes,
            verticalalignment="top", fontsize=18,
            bbox={"facecolor": "red", "alpha": 0.4, "pad": 10}
            )

arrow = {"arrowstyle": "fancy,tail_width=0.6",
         "facecolor": "gray",
         "connectionstyle": "arc3,rad=-0.3"}

ax.annotate("intersection",
            xy=(x1, func1(x1)),
            xycoords="data",
            xytext=(0.05, 0.5),
            textcoords="axes fraction",
            arrowprops=arrow)

ax.annotate("intersection",
            xy=(x2, func1(x2)),
            xycoords="data",
            xytext=(0.05, 0.5),
            textcoords="axes fraction",
            arrowprops=arrow)

xm = (x1 + x2) / 2
ym = (func1(xm) - func2(xm)) / 2 + func2(xm)
o = ax.annotate("intersection area",
                xy=(xm, ym), xycoords="data",
                xytext=(30, -30),
                textcoords="offset points",
                bbox={"boxstyle": "round", "facecolor": (1.0, 0.7, 0.7), "edgecolor": "none"},
                fontsize=16,
                arrowprops={"arrowstyle": "->"}
                )

plt.show()
```



## 多图表&多子图

- plt.figure(1)可以转换当前的画布
- plt.sca(ax1)转换到指定的axes


```py
# 一个案例
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 10)

plt.figure(1)
ax1_211 = plt.subplot(221)
ax1_212 = plt.subplot(223)
ax1_122 = plt.subplot(122)

plt.figure(2)
ax2_211 = plt.subplot(211)
ax2_212 = plt.subplot(212)

plt.sca(ax1_211)
plt.plot(x, np.sin(x))
plt.sca(ax1_212)
plt.plot(x, np.cos(x))
plt.sca(ax1_122)
plt.plot(x, x)

plt.sca(ax2_211)
plt.plot(x, x)
plt.plot(x, -x)
plt.sca(ax2_212)
plt.plot(x, np.sin(x))

plt.show()
```
<img src='http://www.guofei.site/public/postimg2/matplotlib1.png'>











































































## 保存

```py
plt.savefig('test.png',dpi=120)
```
