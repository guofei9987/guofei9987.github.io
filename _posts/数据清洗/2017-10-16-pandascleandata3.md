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
