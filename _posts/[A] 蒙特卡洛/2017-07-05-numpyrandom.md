---
layout: post
title: 【Python】【numpy】random随机数生成
categories:
tags: A蒙特卡洛方法
keywords:
description:
order: 10022
---


## 最佳实践
np.random.choice 只能针对规整的数组或矩阵进行choice  
random.choice 只能每次抽样一个  
a=random.shuffle;a[:3]会改变原序列  
下面做了个最佳方案
- 有放回抽样
```py
all_papers=[[1,[2]],[3,[4]]]
random.choices(all_papers,k=2)
# random.choice(all_papers) # 单个抽样
```
- 无放回抽样
```py
random.sample(all_papers,k=2)
```

----------------------------------------

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

## 参考文献
[numpy官方文档](https://docs.scipy.org/doc/numpy/reference/routines.random.html)
