---
layout: post
title: 【特征选择】
categories:
tags: 3-1-降维
keywords:
description:
order: 341
---
对于当前学习任务的特征，叫做 relevant feature，  
没什么用的特征叫做 irrelevant feature，  
从特定特征集合中选取相关特征子集的过程，成为 feature selection


## 子集搜索
1. 前进法  
每次增加一个feature进入模型，看哪feature对应的评估指标增加最大，如果评估指标不再增加，就停止。
2. 后退法  
每次剔除一个最不重要的feature
3. 逐步法  
每引入一个feature，对已经进入模型的feature组个检验，直到最后。
有可能产生死循环，所以进入和剔除时对显著性水平的要求不同，从而防止死循环。

## 其它特征选取法
主要分三类：
1. 过滤式（filter）
2. 包裹式（wrapper）
3. 嵌入式（embedding）


## 过滤式选择
Relief（Relevant Features）[Kira and Rendell, 1992]是一种经典的过滤式选择法。  
设计思路是，设计一个“相关统计量”来度量特征的重要性。  

以二分类问题为例，$$\{(x_1,y_1),(x_2,y_2),...,(x_m,y_m)\}$$对于某一个样本$x_i$，找到同类样本的最近邻$x_{i,nh}$,异类样本的最近邻$x_{i,nm}$  
第j个feature的相关统计量定义为：  
$\delta^j=\sum\limits_i -diff(x_i^j,x_{i,nh}^j)^2+diff(x_i^j,x_{i,nm}^j)^2$  

找到最大的n个相关统计量（或者大于某个阈值的相关统计量），可以作为 relevant feature

## 包裹式选择

LVW（Las Vegas Wrapper）是一种典型的包裹式特征选择方法  
设计思路是，直接把下一步的学习器作为特征选取标准。带来的缺点是运行速度慢。  

伪代码如下
```py
# 输入：
# 数据集D
# 特征集A
# 学习算法 L
# 停止条件T

E=np.inf
A_output=A
t=0
while t<T:
  随机产生特征子集A_tmp
  E_tmp=CrossValidation(L,D,A_tmp) # 交叉验证得到的算法L的性能
  if E_tmp<=E:
    E=E_tmp
    A_output=A_tmp
    t=0
  else:
    t+=1
```

## 嵌入式
典型的是L1和L2正则化
