---
layout: post
title: 数据清洗与特征工程
categories:
tags: 0x13_特征工程
keywords:
description:
order: 100
---

## 初步清洗

**缺失值**
1. 直接使用。有些模型支持缺失值，如决策树
2. 删除特征。如果某个特征大多数都是缺失值，那么可以删除这个特征
3. 补全
    - 均值填充。缺点是填充的值都一样
    - 众数填充
    - 插值法填充
    - 聚类，然后同类均值插补
    - 建模预测。缺点是：如果缺失属性与其他属性无关，那么预测结果无意义。如果高度相关，那么可以删除特征。  
    - 高维映射。优点：最准确的做法，因为完全保留了信息，也不增加任何信息。  
    - 缺失标记：适用于样本量非常大、缺失的变量是离散的，且非常稀疏。缺失值也当做某类取值处理。它类似One-hot Encode



**异常值**
- **极端值**指的是5 Sigma之外的值
- **离群值**指的是3 Sigma之外的值  
- 确认的方法
    - 画box图检查
    - 用5倍std检查
- 解决方法
    - 盖帽法。把3sigma之外的数据定为sigma
    - 取ln。有些异常值是因为它服从对数正态分布，这样取对数就能解决了。
    - 分类建模。把干扰变量变成分类变量（异常为1，不异常为0）  
    - 离散化。例如做成 高、中、低，三种字段。  
    - 剔除
        - 剔除整行
        - 剔除整列

**冗余值**
- drop_duplicates


## 模型反馈

1. 数据清洗有没有问题
2. 数据抽样有没有问题
3. 数据理解有没有问题
    - 主成分分析看一下
    - 聚类看一下
4. 模型选择有没有问题
5. 参数调整有没有问题





## 标准化
标准化[^t4153167]是对列操作  
数据准备：
```py
import pandas as pd
import numpy as np
df = pd.DataFrame(np.random.uniform(size=(20, 3)), columns=list('abc'))
```
### StandardScaler
```py
# （Z-Score）
# 公式为：(X-mean)/std 计算时对每个属性/每列分别进行。
from sklearn import preprocessing as preprocessing

standard_scaler = preprocessing.StandardScaler()
standard_scaler.fit_transform(df)
standard_scaler.fit(df)
standard_scaler.transform(df)
```
### MinMaxScaler
0-1标准化  
使用这种方法的目的包括：  
1. 对于方差非常小的 feature 可以增强其稳定性。
2. 如果是正的稀疏矩阵，可以维持为0的条目。


```py
from sklearn import preprocessing
min_max_scaler = preprocessing.MinMaxScaler()
min_max_scaler.fit_transform(df)
min_max_scaler.fit(df)
min_max_scaler.transform(df)
```

### MaxAbsScaler
列除以该列的最大值。优点是可以保持稀疏矩阵中的0不变。
```py
from sklearn import preprocessing
max_abs_scaler = preprocessing.MaxAbsScaler()
max_abs_scaler.fit_transform(df)
max_abs_scaler.fit(df)
max_abs_scaler.transform(df)
```

### RobustScaler
一种可以防止异常值的Scaler。算法是减去0.5分位数，然后除以0.75-0.25极差。
```py
from sklearn import preprocessing
robust_scaler=preprocessing.RobustScaler(with_centering=True, with_scaling=True, quantile_range=(25.0, 75.0))
robust_scaler.fit_transform(df)
robust_scaler.fit(df)
robust_scaler.transform(df)
```
## 正则化（Normalization）
每个样本变成单位范数

```py
from sklearn import preprocessing
normalizer = preprocessing.Normalizer(norm='l2') # l1, l2, max

normalizer.fit(df)
normalizer.transform(df)
```


## OneHotEncoder
```py
from sklearn import preprocessing
import pandas as pd
df = pd.DataFrame(np.random.randint(low=0, high=3, size=(10, 3)), columns=list('abc'))

onehotencoder = preprocessing.OneHotEncoder()
onehotencoder.fit(df)

onehotencoder.n_values_  # 每个feature有多少种value，例如 array([3, 3, 3])
onehotencoder.feature_indices_  # 第i个feature被映射到 feature_indices_[i] to feature_indices_[i+1]
onehotencoder.transform(df).toarray()  # OneHotEncoder 的结果
```

## PolynomialFeatures
在输入数据存在非线性特征时，这一操作对增加模型的复杂度十分有用。  
例如，特征向量X=(X1, X2)，最高项次数为2，被转化为(1, X1, X2, X1^2, X1X2, X2^2)  
如果最高为n次方，有m个feature，那么转化后得到comb(n+m,m)个feature
（因为$(\sum_{i=1}^m x_i)^n$展开后有comb(m+n+1,n)项）  

```py
from sklearn import preprocessing

polynomial_features = preprocessing.PolynomialFeatures(degree=2) # 最高项的次数为2
# interaction_only=True 只产生相互作用项
polynomial_features.fit_transform(df)
polynomial_features.fit(df)
polynomial_features.transform(df)
```
## FunctionTransformer
自定义预处理器
```py
from sklearn import preprocessing
function_transformer=preprocessing.FunctionTransformer(lambda x:np.log(x+100))
function_transformer.fit_transform(df)
function_transformer.fit(df)
function_transformer.transform(df)
```

## 参考资料
- [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)  
- [关于使用sklearn进行数据预处理](http://www.cnblogs.com/chaosimple/p/4153167.html)  
