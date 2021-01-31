---
layout: post
title: 【statsmodels】Quantile regression
categories:
tags: 4-1-统计模型
keywords:
description:
order: 409
---

[官网](https://www.statsmodels.org/stable/examples/index.html)和
[代码](https://www.statsmodels.org/stable/examples/notebooks/generated/quantile_regression.html)


## 简介
还没来得及去看论文原文，这个模型用语言描述就是对数据的q分位数进行回归


## 实现
step1. 载入包和数据  
```py
import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
import matplotlib.pyplot as plt
from statsmodels.regression.quantile_regression import QuantReg

data = sm.datasets.engel.load_pandas().data
```
step2. 拟合
```py
mod = smf.quantreg('foodexp ~ income', data)
res = mod.fit(q=0.5)  # q是分位点
```
step3.结果分析
```py
res.summary()
res.params  # 一个series，存放的是每个系数的值
res.conf_int()  # 一个DataFrame，存放的是每个系数上界和下界
```


其它：原文使q取 0.05~0.95 范围内10个数字，拟合10次，画出各分位点拟合图
