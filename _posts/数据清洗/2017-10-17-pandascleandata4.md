---
layout: post
title: 【pandas】index&colums修改.
categories: Geek
tags: 数据清洗
keywords:
description:
---

## index&columns名称修改

### 取index&columns

```py
df.index
df.columns
df.index.values
df.columns.values
df.index.name='idx'#设置index的名称
```

## 1. 用赋值法修改

- data.index可以直接赋值为Series或list
- data.columns可以直接赋值为Series或list

index有map()方法，但没有apply方法，案例：
```python
import pandas as pd
data = pd.DataFrame(np.arange(12).reshape((3, 4)),index=['Ohio', 'Colorado', 'New York'],columns=['one', 'two', 'three', 'four'])
data.index=data.index.map(str.upper)
```

## 2.用rename修改index和Seris
需要知道修改前的字段和修改后的字段
```python
data.rename(index={'Ohio': 'INDIANA'},columns={'three': 'peekaboo'},inplace=True)
```

修改为首字母大写，大写
```python
data.rename(index=str.title, columns=str.upper, inplace=True)
```


### 列变index
```python
a=df.set_index('one')
```
效果：
- 把one这一列变成index，并删除one这一列，结果保存在a中。
- 不改变df
- 不共享内存

### index变列

```python
df.reset_index(inplace=True)
```
使得索引变成一列，0,1,2,3...变成索引

### 自定义索引
reindex
```py
import pandas as pd
df=pd.DataFrame({'one':[1,2,3],'two':[7,6,5]},index=['a','b','c'])


df.reindex(list('abcde'),method='ffill')
#index太多，默认填值为nan，可以ffill，bfill填充

df.reindex(list('abcde'),fill_value=0)
#用指定的数填充
```
|参数|说明|
|--|--|
|index||
|method|ffill,bfill|
|fiil_value||
|limit|向前或向后填充时，最大填充量|
|copy|默认为True，否则不复制|

## 重命名列
```python
df.rename(columns={u'one':'1'}, inplace=True)#字典中可以放多个组
```



## index操作



### 互转
```
reset_index
set_index
```


### 下面是时间序列中，填充index
```python
idx = pd.date_range('09-01-2013', '09-30-2013')

s = pd.Series({'09-02-2013': 2,
               '09-03-2013': 10,
               '09-06-2013': 5,
               '09-07-2013': 1})#数据类型是<DatetimeIndex>


#下面扩展
s.index = pd.DatetimeIndex(s.index)#把原来index从字符串格式str变为时间格式Timestamp
s = s.reindex(idx,fill_value=np.nan)  
#reindex不限于时间序列，idx还可以是list，这样可以扩展非时间序列的数据             
```
？？column能不能这么转

### 插一句，还有一种类型转换astype
```python
 data["medal"].astype("category")#这样，就把字符型，转换为category型了
```
？？参数还可以是其它类型吗
？？字符格式的时间能不能转成时间格式
【未完待续】自己查
