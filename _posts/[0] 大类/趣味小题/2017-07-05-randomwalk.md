---
layout: post
title: 【趣味小题】随机漫步.
categories: 趣文
tags:
keywords:
description:
---

## 问题

某酒鬼随机漫步，每次等概率的走1或-1，共走1000步，每步1米。  
用随机模拟方法回答问题：  
1. 有多大概率在1000步内最远走出30米或-30米，
2. 已知最远走出30米或-30米，平均用多少步完成？

## 解答

这个题目主要考察数据清洗的熟练程度  

```py
import numpy as np
nwalks=5000 #5000次模拟实验
nsteps=1000 #走1000步
steps=np.random.choice([-1,1],size=(nwalks,nsteps))

walks=steps.cumsum(1)#每个时间点的所在位置

walks.max()
walks.min()

hit30_mask=(np.abs(walks)>=30).any(1)#是否走到30步

to30=np.abs(walks[hit30_mask,:])>=30
to30.argmax(1).mean()#平均用时
```
