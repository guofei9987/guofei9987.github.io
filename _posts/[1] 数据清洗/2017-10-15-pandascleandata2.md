---
layout: post
title: 【pandas】数据筛选.
categories:
tags: 1数据清洗
keywords:
description:
order: 102
---

## 用切片、下标筛选

### 通过下标选取数据：

准备数据
```python
import pandas as pd
d = {'one' : pd.Series([1., 2., 3.], index=['a', 'b', 'c']),'two' : pd.Series([2., 3., 4., 5.], index=['a', 'b', 'c', 'd'])}
df = pd.DataFrame(d)
```

- 选取列
```python
a=df[['one']]#a是DataFrame
b=df['one']#b是Series
```
注意：type不同

- 选取行
```python
a=df[0:3]#a是DataFrame，含头不含尾
```

- 选取行列：loc
loc的输入是index名和columns名
```python
df.loc['a':'b']#选取ab两行数据，返回DataFrame
df.loc['a':'b','one']#选取one列的数据，返回Series
a=df.loc[:'b',['one']]#返回DataFrame
```
注意：用index取数是含头又含尾的


- 用数字选取行列：iloc
含头不含尾
```python
a = df.iloc[1,1]#从0开始计数，返回的是这个元素本身的类型
a = df.iloc[0:2,1:2]#返回DataFrame
a = df.iloc[0:2,:]#返回DataFrame
a = df.iloc[:,1]#选取所有记录的第一列的值，返回的为一个Series
a = df.iloc[1,:]#选取第一行数据，返回的为一个Series！！！行也可以组成一个Series
```


（切片共享内存）

## 用布尔类型筛选

```python
df[df.one >= 2]#单个逻辑条件
df[(df.one >=1 ) & (df.one < 3) ]#多个逻辑条件组合
```
分析：
- df.one是一个Series
- df.one>1是一个Series，里面存的是bool
- 多个逻辑条件组合，不能用and，而要用&
- bool*1可以变成数字，可以玩一些花招(df.one * 1+df.two * 1=1)
- df>2是一个DataFrame

### 其它bool生成方式

以下可以取得bool类型的Series，然后用来列筛选，这些Series可以相互之间做bool运算
#### 1.符号
`== != < >  <=   >=`
#### 2. isin

```python
df2['E'].isin(['two','four'])#返回的是bool类型的Series，因此可以做bool运算
#虽然用布尔方法也能达到同样效果，但如果[]太多的话，还是这个方便一些
```
#### 3. str.contains()
```python
df2[df2.ix[:,'E'].str.contains('tw|ou')]#又是一个特殊用法contains，注意参数，有点特殊
```
#### 4. isnull

选出NaN
```py
df.isnull
df.notnull
~df.isnull
```


### 举例


```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(4,-1),index=list('abcd'),columns=list('gfjk'))

df[df>6]=0
```
