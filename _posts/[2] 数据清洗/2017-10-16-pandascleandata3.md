---
layout: post
title: 【pandas】数据去重、替换、分组.
categories:
tags: 数据清洗
keywords:
description:
---


## 去重

```python
data.drop_duplicates(inplace=True)
data.drop_duplicates(subset='column1')#找第一列重复者
data.duplicated(keep='last')#'first','last',False
```

```py
data.duplicated()#返回Series，bool类型，存放是否是重复行/列
```

## 删除空数据

```py
dropna(how='any')
```

## 删除整行&整列

```python
data.drop('animal2', axis='columns', inplace=True)
```

参数可以是list，以删除多行/多列  


## 替换数据
```python
data.replace([4,5],np.nan,inplace=True)
```

## 填充空数据

可以向上填充/向下填充
```python
a=data.fillna(method='bfill',inplace=True)
#method :bfill,ffill,
```

也可以用值填充
```python
a=data.fillna(data.mean(),inplace=True)
```

值填充时，可以每列不一样
```py
df.fillna({'a':999,'b':888,'c':777,'d':666})
```

线性插值填充

```
df1.interpolate()
```

线性插值填充：把index作为间隔

```
df1.interpolate(method='index')
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

## rank

返回排序的序号
```
import pandas as pd
import numpy as np
df=pd.DataFrame(np.random.rand(16).reshape(-1,4),columns=list('wxyz'))
df.loc[:,'w']=[0,1,1,2]
df
```
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>w</th>
      <th>x</th>
      <th>y</th>
      <th>z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>0.098404</td>
      <td>0.099138</td>
      <td>0.381158</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>0.776177</td>
      <td>0.478243</td>
      <td>0.523116</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>0.397995</td>
      <td>0.040227</td>
      <td>0.362902</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2</td>
      <td>0.997362</td>
      <td>0.072824</td>
      <td>0.709957</td>
    </tr>
  </tbody>
</table>


```py
df.rank(ascending=True,method='average')
```
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>w</th>
      <th>x</th>
      <th>y</th>
      <th>z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1.0</td>
      <td>1.0</td>
      <td>3.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.5</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>3.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2.5</td>
      <td>2.0</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4.0</td>
      <td>4.0</td>
      <td>2.0</td>
      <td>4.0</td>
    </tr>
  </tbody>
</table>

method说明：
- 'average'(default): 相等分组中，按平均值
- 'min': 取最小排名
- 'max': 取最大排名
- 'first': 按照原始数据中出现的顺序分配排名


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
- axis=0，输入一列
- axis=1，输入一行
```python
def func1(series):
    #series的类型是Series，其内容是DataFrame的一行，
    #return内容就是data.apply这个series中的元素
```
