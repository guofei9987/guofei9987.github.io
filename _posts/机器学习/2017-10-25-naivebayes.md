---
layout: post
title: 【Naive Bayes】理论与实现.
categories:
tags: 机器学习
keywords:
description:
---



## 简介[^wangxiaochuan]

*Naive Bayes Classifier与Bayesian estimation是不同的概念*

朴素贝叶斯分类器(Naive Bayes Classifier,或 NBC)发源于古典数学理论，有着坚实的数学基础，以及稳定的分类效率。同时，NBC模型所需估计的参数很少，对缺失数据不太敏感，算法也比较简单。理论上，NBC模型与其他分类方法相比具有最小的误差率。但是实际上并非总是如此，这是因为NBC模型 **假设属性之间相互独立** ，这个假设在实际应用中往往是不成立的，这给NBC模型的正确分类带来了一定影响。

### 优点

1. 朴素贝叶斯模型发源于古典数学理论，有着坚实的数学基础，以及稳定的分类效率。
2.  NBC模型所需估计的参数很少，对缺失数据不太敏感，算法也比较简单。

### 缺点

1. NBC模型假设属性之间相互独立，这个假设在实际应用中往往是不成立的（可以考虑降维、变量筛选、或用聚类算法先将相关性较大的属性聚类）。在属性个数比较多或者属性之间相关性较大时，NBC模型的分类效率比不上决策树模型。而在属性相关性较小时，NBC模型的性能最为良好。
2. 需要知道先验概率。
3. 分类决策存在错误率

## 模型

### 变量说明
feature vector: $x\in \mathcal X$  
也写成: $(x^{(1)},x^{(2)},..., x^{(n)}) \in (\mathcal {X^{(1)},X^{(2)},...,X^{(n)}})$  
target: $$y\in  \mathcal Y = \{ c_1, c_2,... , c_K\}$$  

### 模型推导

$P(Y=c_k \mid X=x)=\dfrac{P(X=x\mid Y=c_k)}{P(X=x)}=\dfrac{P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)}{P(X=x)}$  


k取不同的值的时候，找到上式取最大时的k，可以判断为新样本所属的第k类  
分母不变，所以只计算比较分子$P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)$  


如果Y可能取值是K个，$x^{(i)}$可能取值有$S^{(i)}$个，那么参数个数为$K\prod S^{(i)}$  
这个数字太大， **附加假设** ：**属性之间相互独立** 。也就是$X^{(1)},X^{(2)},..., X^{(n)}$ **相互独立**。  
参数个数变成$K\sum S^{(i)}$  

附加独立性假设后，分子简化为：  
$P(X_1=x_1,X_2=x_2,...X_n=x_n\mid Y=c_k)=\prod P(X_i=x_i \mid Y=c_k)$  



## 参考资料
[^lihang]: [李航：《统计学习方法》](https://www.weibo.com/u/2060750830?refer_flag=1005055013_)
[^wangxiaochuan]: [王小川授课内容](https://weibo.com/hgsz2003)  
