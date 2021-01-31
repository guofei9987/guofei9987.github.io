---
layout: post
title: 【pandas】数据筛选
categories:
tags: 1-2-Pandas与numpy
keywords:
description:
order: 102
---

## sql风格

简单测了一下，sql的where语句基本都支持

```python
df.query('x not in ("1","2") or y>0.1', inplace=True)
```

补充两点
```python
# 1. 前面定义好的变量，可以在语句里用，加一个@
k=3
df.query('x>@k')

# 2. 对于带空格的字段名，用``括起来
# (不过好像会报错)
df.query('x>`a a`')
```

### eval
```python
df.eval('C = A + B', inplace=True)

df.eval('A+B') # 返回 Series
# （貌似）不能同时产生多个字段，所以用起来还是不太方便
```



## 用切片、下标筛选

### 通过下标选取数据：

准备数据
```python
import pandas as pd
df = pd.DataFrame({'col1': [1, 2, 3] * 2, 'col2': ['one', 'two', 'three'] * 2}, index=list('abcdef'))
```

- loc：选取行列（**含头又含尾**）
```python
# loc的输入是index名和columns名
df.loc['a':'b', 'col1']  # 选取one列的数据，返回Series
df.loc[:'b', ['col1']]  # 返回DataFrame
df.loc['a':'b', :]  # 选取ab两行数据，返回DataFrame
# df.loc['a':'b']  # 选取ab两行数据，返回DataFrame
```
- iloc：用数字选取行列（**含头不含尾**）
```python
df.iloc[1, 1]  # 从0开始计数，返回的是这个元素本身的类型
df.iloc[0:2, 1:2]  # 返回DataFrame
df.iloc[0:2, :]  # 返回DataFrame
df.iloc[:, 1]  # 选取所有记录的第一列的值，返回的为一个Series
df.iloc[1, :]  # 选取第一行数据，返回的为一个Series（！！！行也可以组成一个Series）
```
- 选取列
```python
a = df[['col1']] # a是DataFrame
b = df['col1'] # b是Series
df.col1 # 也是Series
```
- 选取行
```python
a=df[0:3] # a是DataFrame，含头不含尾
```

（切片共享内存）

## 用布尔类型筛选

```python
df.loc[df.col1>1,:] # 单个逻辑条件
df.loc[(df.col1 > 1) & (df.col1 < 3), :] # 多个逻辑条件组合
df[df.one >= 2] # 也可以省略 loc
```
分析：
- df.col1是一个Series
- df.col1>1是一个Series，里面存的是bool
- 多个逻辑条件组合，不能用and，而要用&
- bool*1可以变成数字，可以玩一些花招(例如，`(df.col1>1 * 1)+(df.col2<1) * 1=1`)
- df>2是一个DataFrame

### bool生成方式

以下可以取得bool类型的Series，然后用来列筛选，这些Series可以相互之间做bool运算
#### 1.符号
```py
==
!=
<
>
<=
>=
```
#### 2. any
```py
(df>1).any(0) # 列
(df>1).any(1) # 行
```
#### 3. 自定义
```py
func = lambda x: True if x in {'one', 'three'} else False
df.transform({'col2': func})
```

#### 其它
- isnull
```py
df.isnull()
df.notnull()
~df.isnull()
```
- string
```python
selected = df.col2.isin(['one', 'three']) # 返回的是bool类型的Series，因此可以做bool运算
selected = df.col2.str.contains('n|h')
```

### 举例

```py
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(4,-1),index=list('abcd'),columns=list('gfjk'))

df[df>6]=0
```
