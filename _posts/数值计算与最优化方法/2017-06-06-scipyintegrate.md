---
layout: post
title: 【数值积分】scipy.integrate.
categories: 
tags: 数值计算与最优化方法
keywords:
description:
---

## 定积分
step1：生成数据  
```py
import numpy as np
def func(x):
    return np.sin(x**2)

import numpy as np
x=np.linspace(-1,1,1000)
y=func(x)
```

step2：计算定积分    
1. 矩形法计算定积分，最不准确但最方便的一种  
```py
S1=(x[1]-x[0])*sum(y)
```

2. 梯形法。比矩形法准一些    
```
S2=np.trapz(y,x)
```
3. 貌似是simpson算法？  
```
from scipy import integrate
S3,err=integrate.quad(func,-1,1)
```

## 二重积分dblquad()
例如，要算这个定积分：  
$$\int_{-0.5}^{0.5}\int_{-\sqrt{1-x^2}}^{\sqrt{1-x^2}} sin((xy)^2)dydx$$  

```py
import numpy as np
from scipy import integrate

def fun(x,y):#被积函数
    return np.sin((x*y)**2)

def bound(x):#用来生成积分上界和下界
    return (1-x**2)**0.5

S,err=integrate.dblquad(fun,-0.5,0.5,lambda x:-bound(x),lambda x:bound(x))
```

或者另一种形式：

```py
import numpy as np
from scipy import integrate


def fun(x,y):#被积函数
    return np.sin((x*y)**2)

def bound1(x):#积分上界
    return -(1-x**2)**0.5
def bound2(x):#积分下界
    return (1-x**2)**0.5

S,err=integrate.dblquad(fun,-0.5,0.5,bound1,bound2)
```

## 三重积分tplquad()

三重积分tplquad，非分方程odeint()  略  
