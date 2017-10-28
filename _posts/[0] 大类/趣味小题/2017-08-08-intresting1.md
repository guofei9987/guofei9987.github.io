---
layout: post
title: 【趣味小题】酒鬼90%几率去酒吧.
categories: 趣文
tags:
keywords:
description:
---

## 问题

>有个酒鬼每天都有90%的几率去酒吧喝酒  
而且他只去三家酒吧，去三家酒吧的几率一样大  
今天，警察检查了其中两家酒吧，发现他不在.  
问：他在第三家酒吧的几率有多大？

## 解释

事件A: 在第三个酒吧

事件B: 不在前两个酒吧

$P(A)=0.3,P(B)=0.4,P(B \mid A)=1$  


$P(A\mid B)=P(A) * P(B \mid A) / P(B)=0.3 * 1/0.4=0.75$


## 程序模拟

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
