---
layout: post
title: 【Python】【pandas】合并数据.
categories: Geek
tags: 语法速查
keywords:
description:
---

本博客取材于pandas作者Wes McKinney 在【PYTHON FOR DATA ANALYSIS】中对pandas的一个权威简明的入门级的介绍，图片来自网络，本人进行了归纳整理。    

## 数据准备
案例的数据准备：生成要用到的几个表：  
```py
import pandas as pd
df1=pd.DataFrame({'A':['A0','A1','A2','A3'],
               'B':['B0','B1','B2','B3'],
               'C':['C0','C1','C2','C3'],
               'D':['D0','D1','D2','D3']},
               index=[0,1,2,3])

df2=pd.DataFrame({'A':['A4','A5','A6','A7'],
               'B':['B4','B5','B6','B7'],
               'C':['C4','C5','C6','C7'],
               'D':['D4','D5','D6','D7']},
               index=[4,5,6,7])

df3=pd.DataFrame({'A':['A8','A9','A10','A11'],
               'B':['B8','B9','B10','B11'],
               'C':['C8','C9','C10','C11'],
               'D':['D8','D9','D10','D11']},
               index=[8,9,10,11])
df4=pd.DataFrame({'B':['A8','A9','A10','A11'],
               'D':['B8','B9','B10','B11'],
               'F':['C8','C9','C10','C11']},
               index=[2,3,6,7])
```


## 纵向合并  
特点：匹配columns，匹配不到的的填入nan
```python
result=pd.concat([df1,df2,df3])
```

例子：  
```py
result=pd.concat([df1,df2,df3])
```

效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat.jpg'>


### keys分组键

要在相接的时候在加上一个层次的key来识别数据源自于哪张表，可以增加key参数  

```py
result = pd.concat([df1,df2,df3], keys=['x', 'y', 'z'])
#result=pd.concat({'x':df1,'y':df2,'z':df3})
#也可以用dict来做
```

效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat2.jpg'>


### ignore_index
如果两个表的index没什么实际含义，用ignore_index=True，使两个表对齐整理出一个新的index  

```py
result=pd.concat([df1,df4],ignore_index=True)
```

效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat5.jpg'>

## 横向对齐
```py
result = pd.concat([df1, df4], axis=1)
```
效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat3.jpg'>


### join
join='outer'(默认),把所有未匹配到的也列出来，（上面这个案例）  
join='inner'，只列出左右两列都有的

```py
result = pd.concat([df1, df4], axis=1, join='inner')
```
效果如下：  
<img src='http://www.guofei.site/public/postimg2/concat4.jpg'>


## merge
除了简单合并外，有时需要匹配合并（类似SQL中的join命令）  
数据准备  
```py
left = pd.DataFrame({'key1': ['K0', 'K0', 'K1', 'K2'],
                    'key2': ['K0', 'K1', 'K0', 'K1'],
                    'A': ['A0', 'A1', 'A2', 'A3'],
                    'B': ['B0', 'B1', 'B2', 'B3']})


right = pd.DataFrame({'key1': ['K0', 'K1', 'K1', 'K2'],
                     'key2': ['K0', 'K0', 'K0', 'K0'],
                     'C': ['C0', 'C1', 'C2', 'C3'],
                     'D': ['D0', 'D1', 'D2', 'D3']})
```

### 连接
```
result = pd.merge(left, right, on=['key1', 'key2'])
```
<img src='http://www.guofei.site/public/postimg2/merge1.jpg'>
