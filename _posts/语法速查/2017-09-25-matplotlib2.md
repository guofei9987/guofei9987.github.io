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
