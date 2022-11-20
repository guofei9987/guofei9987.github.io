---
layout: post
title: Boltzmann机
categories:
tags: 0x22_上世纪神经网络
keywords:
description:
order: 271
---


## 介绍

1985年由Hintton和Sejnowski等人提出，是在Hopfield神经网络的基础上引入随机机制而形成的。  
随机神经网络将统计力学思想引入神经网络研究中，Boltzmann机是第一个受统计力学启发得到的神经网络。  


### 随机神经网络
BP与Hopfield的训练局部最小的原因：
1. 网络中有非线性映射关系，导致有多个局部最优解
2. 在梯度下降算法汇总，误差和能量函数只能单调变化，不能有上升趋势。


其中，第一条是我们需要的网络特征，因此从第二条入手改进。  


随机神经网络有如下特点：
1. 神经元的输入不能决定其输出是0或1，而是决定概率
2. 在神经网络学习阶段，随机神经网络不基于确定的算法去调整权值，而是按某种概率分布去处理
3. 运行阶段，不是按照确定的网络方程进行状态演变，而是按照某种概率分布进行网络状态的转移。


## 结构
### 网络结构
与Hopfield类似，
1. 完全图，并且权重对称，既$w_{ij}=w_{ji}$且$w_{ii}=0$
2. 每个神经元的输出是0, 1
3. n个神经元分为可视层和隐含层。可视层有分为输入部分和输出部分

受限 Boltzmann 机(Restricted Boltzmann Machine, RBM) 仅保留显层和隐层之间的连接，而把显层之间、隐层之间的连接全部删除。

### 神经元
$s_j=\sum\limits_{i=1}^nx_jw_{ij}-\theta_j,j=1,2,...,n$  
$P(x_j=1)=\dfrac{1}{1+e^{-s_j/T}}$  


其中，T称为 **网络温度(Network Temperature)**  


## 性质
当$T\to +\infty$, 激活函数趋近于水平直线  
当$T\to 0$，激活函数趋近于sign函数，整个网络趋近于离散Hopfield网络  


### 能量函数
$E=-0.5\sum\sum w_{ij}x_i x_j +\sum\theta_i x_i$  
串行的网络运行中，E下降的概率较大。有能量上升的可能性，所以Boltzmann机有跳出局部极小点的能力。  


## 学习
Boltzmann机既可以用于做优化，也可以用于联想记忆。  
但Boltzmann机只会收敛到一个最小值点，因此不能实现Hopfield的多记忆点，但是可以实现概率意义上的联想记忆。


## 受限玻尔兹曼机
上面提过，受限 Boltzmann 机(Restricted Boltzmann Machine, RBM) 仅保留显层和隐层之间的连接，而把显层之间、隐层之间的连接全部删除。  

把 visible layer 记为$v$，把 hidden layer 记为 $h$  

所有隐藏节点$h$之间是条件独立的，所有显层节点$v$是条件独立的。  
也就是说$p(h\mid v)=p(h_1\mid v)p(h_2\mid v)...p(h_n\mid v)$  
$p(v\mid h)=p(v_1\mid h)p(v_2\mid h)...p(v_m\mid h)$

### 实现
```py
from sklearn.neural_network import BernoulliRBM
rbm=BernoulliRBM(n_components=2)

rbm.fit(X)
rbm.transform(X)
rbm.partial_fit(X)
rbm.fit_transform(X)

rbm.score_samples(X) # Compute the pseudo-likelihood of X
```
### DBM(Deep Boltzmann Machine)

隐藏层数增加  

![](https://github.com/guofei9987/pictures_for_blog/blob/master/machine_learning/dbm.png?raw=true)  


如上图所示，深度玻尔兹曼机相当于限制连接的BDM

## 参考文献
《Matlab神经网络原理与实例精解》陈明，清华大学出版社   
《神经网络43个案例》王小川，北京航空航天大学出版社  
《人工神经网络原理》马锐，机械工业出版社  
白话深度学习与TensorFlow，高扬，机械工业出版社  
《TensorFlow实战》中国工信出版集团
