---
layout: post
title: 【插值】scipy.optimize.interpolate.
categories: Geek
tags: 数学理论与工具
keywords:
description:
---

## interp1d

```
import numpy as np
from scipy import interpolate
import pylab as pl

x=np.linspace(0,10,11)
y=np.sin(x)

xnew=np.linspace(0,10,101)

pl.plot(x,y,'ro')
list1=['linear','nearest']
list2=[0,1,2,3]
for kind in list1:
    print(kind)
    f=interpolate.interp1d(x,y,kind=kind)
    #f是一个函数，用这个函数就可以找插值点的函数值了：
    ynew=f(xnew)
    pl.plot(xnew,ynew,label=kind)

pl.legend(loc='lower right')
pl.show()
```

interp1d比Matlab的interp有些优势，生成的是函数，所以不需要在事先设定需要求解的点，而是在需要使用时，调用函数。
