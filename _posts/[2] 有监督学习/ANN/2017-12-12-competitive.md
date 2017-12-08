---
layout: post
title: 【神经网络6】竞争神经网络.
categories:
tags: 2有监督学习
keywords:
description:
order: 256
---

自组织竞争神经网络是一种无监督学习算法

## 结构
<img src='http://www.guofei.site/public/postimg/ann_competitive.png'>

输入层有N个神经元，竞争层有M个神经元  
权值$w_{ij}(i=1,2...,N;j=1,2,...,M)$  
并且满足$\sum\limits_{i=1}^N=1$
### 输入层
用来传递函数，输入是二值向量，取值0, 1
### 输出层
$S_j=\sum\limits_{i=1}^N w_{ij}x_i$  
输出是$$a_k=\left\{ \begin{array}{ccc}1,&S_k>S_j,\forall j \neq k\\
0,&else\end{array}\right.$$

## 学习过程
$w_{ij}=w_{ij}+a(\dfrac{x_i}{m}-w_ij)$,  
其中，  
a是学习参数，$a\in (0,1]$,一般取$a\in [0.01,0.03]$  
m是输入层的输出为1的神经元的个数，$m=\sum\limits_{i=1}^N x_i$  






## 参考文献
《Matlab神经网络原理与实例精解》陈明，清华大学出版社   
《神经网络43个案例》王小川，北京航空航天大学出版社  
《人工神经网络原理》马锐，机械工业出版社  
