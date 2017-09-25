---
layout: post
title: 【Python】【matplotlib】绘图函数
categories: Geek
tags: 语法速查
keywords:
description:
---

## 对数坐标图

根据x, y 轴分别是否为对数，总共4种：

```py
plot()
semilogx()
semilogy()
loglog()
```

程序示例：
```py
import numpy as np
import matplotlib.pyplot as plt
x=np.linspace(1,10,1000)
y=np.sin(x)

plt.subplot(221)
plt.plot(x,y)
plt.subplot(222)
plt.semilogx(x,y)
plt.subplot(223)
plt.semilogy(x,y)
plt.subplot(224)
plt.loglog(x,y)

plt.show()
```

<img src='http://www.guofei.site/public/postimg2/matplotlib3_1.png'>

## 极坐标绘图

仅需要这样：
```py
plt.subplot(111,polar=True)
```

程序示例：
```py
import numpy as np
import matplotlib.pyplot as plt
theta=np.linspace(0,2*np.pi,100)
rho=1-np.sin(theta)
plt.subplot(111,polar=True)
plt.plot(theta,rho)
plt.show()
```
<img src='http://www.guofei.site/public/postimg2/matplotlib3_2.png'>

## bar

就是bar啦！

```py
import numpy as np
import matplotlib.pyplot as plt

x = np.array([1, 2, 3, 4, 5])
y1 = x
y2 = x ** 1.5

width = 0.2
plt.bar(x, y1, width)
plt.bar(x + width, y2, width)
plt.show()
```

这里做了个小技巧，用width作为偏移，画出多个bar
<img src='http://www.guofei.site/public/postimg2/matplotlib3_3.png'>

## scatter

scatter与plot的不同是，scatter可以分别指定每个点的`大小`和`颜色`
```py
import matplotlib.pyplot as plt
from scipy.stats import uniform

rv=uniform(loc=0,scale=1)

x=rv.rvs(size=100)
y=rv.rvs(size=100)

plt.scatter(x,y,s=x*1000,c=y,marker=(5,1))
plt.show()
```
<img src='http://www.guofei.site/public/postimg2/matplotlib3_4.png'>

按照输入顺序，scatter的输入值分别代表：
1. 每个点的X坐标
2. 每个点的Y坐标
3. s参数指定点的大小（值和点的面积成正比）
4. c参数指定点的颜色，可以是数值或数据。
    - 如果是数值则自动调用颜色映射表
    - 如果是(N,3)或(N,4)数组，则代表RGB颜色
5. marker
