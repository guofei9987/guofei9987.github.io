---
layout: post
title: 【Monte】马尔科夫链问题.
categories: 趣文
tags:
keywords:
description:
---
## 问题


初始点$x_0=(10,80)$  
基准点$(0,0),(100,0),(50,100)$  
每次迭代随机选取一个基准点，找到基准点与初始点的中点，把这个中点作为新的初始点。  



## 解答

```py
import numpy as np
from scipy.stats import randint
x0=np.array([10,10])
x1=np.array([[0,0],[100,0],[50,100]])
a=randint(low=0,high=3)
step=10
def onecase(x0=x0,x1=x1,step=10):
    for i in range(step):
        x0=0.5*(x0+x1[a.rvs()])
    return x0

output=[]
for i in range(10000):
    output.append(onecase(x0=x0,x1=x1,step=100))

output=np.array(output)

import matplotlib.pyplot as plt
plt.plot(output[:,0],output[:,1],'.')
plt.show()
```

![下载 (1)](https://i.imgur.com/4pp4ga8.png)


你可以试试改变一下各个初始值，看看图形有没变化  
