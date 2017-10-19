---
layout: post
title: 【Python】【numpy】random随机数生成.
categories: 
tags: 蒙特卡洛方法
keywords:
description:
---


本博客参考了numpy的[官方文档](https://docs.scipy.org/doc/numpy/reference/routines.random.html)

## 随机种子
numpy.random.seed(seed=None)
## shuffle&permutation重新洗牌
```python
np.random.shuffle(arr)#直接改arr，返回none
np.random.permutation(arr)#不改arr，返回重新洗牌后的
```

多维数组：只shuffle第0维
## choice随机选数
numpy.random.choice(a, size=None, replace=True, p=None)


## 生成随机数
```py

numpy.random.randint(low, high=None, size=None, dtype='l')
左闭右开的整数

numpy.random.random_integers(low, high=None, size=None)
开区间的整数

numpy.random.uniform(low=0.0, high=1.0, size=None)
均匀分布

rand#均匀分布

binomial#二项分布

numpy.random.normal(loc=0.0, scale=1.0, size=None)
#正态分布

np.random.beta()

numpy.random.f(dfnum, dfden, size=None)


chisquare
#卡方分布

gamma
#Gamma分布


```
