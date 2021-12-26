---
layout: post
title: 【概率论】趣味小题
categories:
tags: 0x80_数据结构与算法
order: 530
---


## 随机数生成问题

手里有一个随机整数生成器，拿来制造另一个随机数生成器。

### “大”生成“小”

有个方法很直观，反复调用“大”随机数生成器，直到满足条件即可。

例如，我有 rand5，想生成 rand3

```python
import random

def rand5():
    return int(5 * random.random())


def rand3():
    tmp = rand5()
    while tmp >= 3:
        tmp = rand5()
    return tmp
```

注：
- 算法并不是最优的，但却是最直观的
- 有一些优化方法，例如，如果要用 rand5 生成 rand2，可以先用 rand5 生成 rand4，然后除以2

### “小”生成“大”

例如，我想用 rand5 生成 rand7，那么可以遵循以下流程：
1. 用5进制的形式，生成 rand25，
2. 从 rand25 生成 rand7，这就转化成了 “大”生成“小” 的问题。然后基于上面写的 “大”生成“小” 的优化方法，可以有以下步骤：
    - 从 rand25 生成 rand21
    - rand21 除以3，得到 rand7


```python
import random
import collections


def rand5():
    return int(5 * random.random())


def rand25():
    return rand5() * 5 + rand5()


def rand21():
    tmp = rand25()
    while tmp >= 21:
        tmp = rand25()
    return tmp


def rand7():
    return rand21() // 3
```


## 酒鬼90%几率去酒吧.

### 问题

>有个酒鬼每天都有90%的几率去酒吧喝酒  
而且他只去三家酒吧，去三家酒吧的几率一样大  
今天，警察检查了其中两家酒吧，发现他不在.  
问：他在第三家酒吧的几率有多大？

### 解释

事件A: 在第三个酒吧

事件B: 不在前两个酒吧

$P(A)=0.3,P(B)=0.4,P(B \mid A)=1$  


$P(A\mid B)=P(A) * P(B \mid A) / P(B)=0.3 * 1/0.4=0.75$


### 程序模拟

```py
import numpy as np

def onecase():
    list=[0,0,0]
    drink=np.random.rand()
    if drink>0.1:#0.9概率去酒吧
        bar=np.random.rand()
        if bar<1/3:#去第一家
            list[0]=1
        elif bar<2/3:#去第二家
            list[1]=1
        else:#去第三家
            list[2]=1
    return list

count1=0#分子：满足事件B且满足事件A的计数
count2=0#分母：满足事件B的计数
for i in range(10000):
    list=onecase()
    if list[0]==0:#不在第一家
        if list[1]==0:#不在第二家
            count2+=1
            if list[2]==1:
                count1+=1

count1/count2
```

output：  

```
0.7531826190535276



```
概率是75%
