---
layout: post
title: 【pandas】简单的统计.
categories: Geek
tags: 数据清洗
keywords:
description:
---

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

max,min,min,std  
能返回每一列统计量  
- axis,指定运算轴
- level,指定对应的索引
- skipna,运算是否跳过NaN



add, sub,mul,div,mod  
可以通过axis,level,fill_value等参数控制其运算行为。  
