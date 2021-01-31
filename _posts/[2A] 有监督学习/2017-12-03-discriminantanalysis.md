---
layout: post
title: 【判别分析】理论篇
categories:
tags: 2-1-有监督学习
keywords: model evaluation
description:
order: 230
---


## 问题介绍
每个样本有p个维度$X=(X_1,X_2,...X_p)$  
有k个类别$G_1,G_2,...G_k$  
那么，对于一个新样本，如何判断这个样本属于哪一类呢？


判别分析有很多种，这里介绍两种：距离判别法、贝叶斯判别法

## 距离判别法
### 距离的介绍
[闵可夫斯基距离](http://www.guofei.site/2017/06/04/distance.html#title15)  


马氏距离(Mahalanobis distance)  
- 同一总体两样本之间$d(x,y)=\sqrt{(x-y)^T\Sigma^{-1}(x-y)}$  
其中$\Sigma$是总体的协方差矩阵  
- 一个样本到一个总体的距离  
$d(x,G)=\sqrt{(x-u)^T\Sigma^{-1}(x-u)}$  
其中，$u=EG$  
- 两个等协方差矩阵的总体之间的距离
$d(G_1,G_2)=\sqrt{(u_1-u_2)^T\Sigma^{-1}(u_1-u_2)}$  


### 判别
定义马氏距离后，判别方法就不难想出
#### 1. 两个同方差整体
检验$d(x,G_1)-d(x,G_2)$的符号，便可以确定x属于哪个类
#### 2. 两不等方差整体
step1： 检验方差齐性  
step2： 检验$d(x,G_1)-d(x,G_2)$的符号  
#### 4. 多个整体
$\arg\min\limits_{k\in K} d(x,G_k)$  


## 贝叶斯判别法
### 一般的贝叶斯判别法
假设：  
两个p元总体$G_1,G_2$的概率密度函数是$f_1(x),f_2(x)$  
先验概率$p_1=P(G_1),p_2=P(G_2), (p_1+p_2=1)$  
有：  
$P(G_1 \mid x)=\dfrac{p_1f_1(x)}{p_1f_1(x)+p_2f_2(x)},P(G_2 \mid x)=\dfrac{p_2f_2(x)}{p_1f_1(x)+p_2f_2(x)}$  
比较这两个概率即可。


## 参考资料

https://en.wikipedia.org/wiki/Linear_discriminant_analysis  
《MATLAB数据分析方法》李柏年，机械工业出版社  
《应用多元统计分析》朱建平，科学出版社  
