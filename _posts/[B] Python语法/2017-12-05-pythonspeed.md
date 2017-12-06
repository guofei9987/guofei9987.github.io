---
layout: post
title: 【Python】运行效率研究.
categories:
tags: Python语法
keywords:
description:
---


*直接在jupyter里插入%%timeit，便可以主动运行上万次并测速，这比MATLAB效率研究方便太多了*  

## 生成随机数
准备：  
```py
import numpy as np
from scipy.stats import randint
rv=randint(low=0,high=2)
```
1. numpy
```py
%%timeit
a=np.random.randint(low=0,high=2,size=(50,30))
```
>7.15 µs ± 768 ns per loop (mean ± std. dev. of 7 runs, 100000 loops each)

2. scipy.stats
```py
%%timeit
a=rv.rvs(size=(50,30))
```
>1.94 ms ± 58.4 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
