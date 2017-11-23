---
layout: post
title: 【pandas】描述统计&简单作图.
categories:
tags: 1数据清洗
keywords:
description:
order: 105
---

|方法|说明|
|--|--|
|count|非NaN值得数量|
|describe|描述统计|
|min, max|最值|
|idxmin, idxmax|最值所在位置(loc)|
|quantile|分位数|
|sum||
|mean||
|median|中位数|
|mad|平均绝对离差|
|var||
|std||
|skew|偏度(三阶矩)|
|kurt|峰度(四阶距)|
|cumsum||
|cumprod||
|cummin, cummax|累计最值|
|diff||
|pct_change|变化率（与上一列相比）|
|corr|相关系数矩阵df.corr(),se1.corr(se2),df.corr(se1)|

## 描述统计

```python
df.describe()
df.describe(include='all')
```
返回的是DataFrame格式的描述性统计数据

```py
data.info()#DataFrame的简要情况
df.shape
```

## 运算函数

### 汇总


max, min, min, std, sum  
能返回每一列统计量  
- axis,指定运算轴
- level, 如果是MultiIndex, 指定对应的索引
- skipna,运算是否跳过NaN




#### 最值所在位置


```
import pandas as pd
import numpy as np
df=pd.DataFrame(np.random.rand(16).reshape(-1,4),columns=list('wxyz'))
df.idxmax()
```

### 计算

add, sub,mul,div,mod  
可以通过axis,level,fill_value等参数控制其运算行为。  

### 统计




## count

```py
df.count()
```
返回每列的非NaN的个数

## value_counts

value_counts只能针对Series

```py
df.loc[:,'x'].value_counts()
```
