---
layout: post
title: 【pandas】描述统计&简单作图
categories:
tags: 1-2-Pandas与numpy
keywords:
description:
order: 105
---

|方法|说明|
|--|--|
|count|非NaN值的数量|
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
df.describe(include='all') # 对分类变量计算unique个数等，对字符串也有处理。
```
返回的是DataFrame格式的描述性统计数据

```py
data.info() # DataFrame的简要情况
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


```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.random.rand(16).reshape(-1,4),columns=list('wxyz'))
df.idxmax()
```

### 计算

add, sub,mul,div,mod  
可以通过axis,level,fill_value等参数控制其运算行为。  

### 统计

### cut

数据准备
```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,2),columns=list('wx'))
df
```
#### 传入bins
- cut
```py
bins=[-np.inf,4,10,np.inf]
pd.cut(df.w,bins)
```
>0    (-inf, 4.0]  
1    (-inf, 4.0]  
2    (-inf, 4.0]  
3    (4.0, 10.0]  
4    (4.0, 10.0]  
5    (4.0, 10.0]  
6    (10.0, inf]  
7    (10.0, inf]  
Name: w, dtype: category  
Categories (3, interval[float64]): [(-inf, 4.0] < (4.0, 10.0] < (10.0, inf]]  

- right=False: 选择右开还是闭，默认闭
- labels=['low','mid','hig']： 给每个标签命名
```py
bins=[-np.inf,4,10,np.inf]
pd.cut(df.w,bins,right=False,labels=['low','mid','hig'])
```
>0    low  
1    low  
2    mid  
3    mid  
4    mid  
5    hig  
6    hig  
7    hig  
Name: w, dtype: category  
Categories (3, object): [low < mid < hig]  

- 传入数字:按照区间等分n份
```py
pd.cut(df.w,4,precision=1)
```

### qcut
- 传入区间：按照分位点切分
```py
from scipy.stats import norm
df=pd.DataFrame(norm().rvs(size=(100)),columns=list('w'))
pd.qcut(df.w,[-1,0.1,0.5,0.8,0.9,1]).value_counts()
```
- 传入数字：按样本数切分，每组样本数相同
```py
pd.qcut(df.w,4)
```
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
