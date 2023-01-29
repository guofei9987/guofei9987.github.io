---
layout: post
title: 【Python】【numpy】random随机
categories:
tags: 0xa0_蒙特卡洛方法
keywords:
description:
order: 10022
---

<!--
## 最佳实践
np.random.choice 只能针对规整的数组或矩阵进行choice  
a=random.shuffle;a[:3]会改变原序列  


```py
# random 可以针对非矩阵
# 有放回抽样
all_papers=[[1,[2]],[3,[4]]]
random.choices(all_papers,k=2)
# random.choice(all_papers) # 单个抽样

# 无放回抽样
random.sample(all_papers,k=2)
``` -->


## 随机种子
```
np.random.seed(seed=None)
```

另一种做法
```py
state = np.random.get_state()
np.random.set_state(state)
```

## shuffle&permutation 洗牌
```python
np.random.shuffle(arr) # 直接改arr，返回 None
np.random.permutation(arr) # 不改arr，返回重新洗牌后的
```

多维数组：只shuffle第0维


## choice 随机抽样
```python
np.random.choice(a, size=None, replace=True, p=None)
# replace=True 为有放回抽样，False 为无放回抽样
# p 是个 array，表示每个元素选中的概率，默认等概率
```

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

## random

```python
import random

random.random() # 0-1 之间的自然数
random.randint(1, 2) # 整数，含头含尾
random.randrange(start=1, stop=10, step=2) # 含头不含尾

```

## 参考文献
[numpy官方文档](https://docs.scipy.org/doc/numpy/reference/routines.random.html)
