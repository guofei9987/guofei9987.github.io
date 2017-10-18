---
layout: post
title: 【pandas】数据去重、填充、替换.
categories: Geek
tags: 数据清洗
keywords:
description:
---


## 去重

删除重复
有inplace项
```python
data.drop_duplicates(inplace=True)
data.drop_duplicates(subset='column1')#找第一列重复者
data.duplicated(keep='last')#'first','last',False
```

```
data.duplicated()#返回Series，bool类型，存放是否是重复行/列
```

## 删除整行&整列
删除一列
有inplace项
```python
data.drop('animal2', axis='columns', inplace=True)
```

## 替换数据
```python
data.replace([4,5],np.nan,inplace=True)
```

## 填充空数据

```python
a=data.fillna(method='bfill',inplace=True)#bfill,ffill,
```

```python
a=data.fillna(data.mean(),inplace=True)
```



## 计算新列

```python
import pandas as pd
import numpy as np
df=pd.DataFrame(np.arange(16).reshape(-1,4),index=list('abcd'),columns=list('wxyz'))
df.loc[:,'ww']=df.loc[:,'w']*2+df.loc[:,'x']
```



## 改变数据类型

```python
df.loc[:,['ww']].astype('float')#int
```

## 计算Series每个值的频率

value_counts只能针对Series

```
df.loc[:,'x'].value_counts()
```

## 字符串方法
```python
df['index'].str.upper()
df['index'].str.len()
df['index'].str.contains('a')#字符中是否包含a，bool
```


### 字符串加减
```PY
df=pd.DataFrame(['北京','北京市','北京地区'])
df_abc=pd.DataFrame(list('abc'))
df+df_abc*2
```

### 字符串的分裂合并
**只对Series有用**

#### 分裂

```
s=pd.Series(['a|b|cc','x|yy|z'])
s_list=s.str.split('|')
```
- output
```
0    [a, b, cc]
1    [x, yy, z]
```

#### 获取元素
```py
s_list.str[1]
```
- output
```py
0     b
1    yy
```

#### 用其它字符填充
```py
s_comma=s_list.str.join(',')
```
- output
```py
0    a,b,cc
1    x,yy,z
```

#### 正则表达式
```py
s.str.extract('正则表达式')
```

## sort
- sort_values按值排序
- sort_index按index排序

```python
df.sort_values(by=['w','z'],ascending=[False,True],inplace=True)
df.sort_index(ascending=True,inplace=True)
```

## 列变化

### 方法1：map
- map只能针对Series
- 原本的数据没在dict中的，填充为NaN

```python
data['animal'] = data['food'].map(str.lower).map(my_dict)
#my_dict是一个字典，key是data['food']中的元素，values是输出Series中的元素
```

### 方法2：apply

```python
data.apply(func1,axis='columns')#返回Series
```

func1的规则：
输入是一行
```python
def func1(series):
    #series的类型是Series，其内容是DataFrame的一行，
    #return内容就是data.apply这个series中的元素
```


## groupby
```python
df.groupby('key1').max()#生成一个DataFrame，存入分组后每一列的最大值
```

分组求和
```python
df.groupby((df['key1'],df['key2'])).sum()
```
groupby后面可以接的方法：
```
sum mean median max min
count
size
```

例如：  
```py
df.groupby('industryName1').agg(['mean','median','max','min'])
```
