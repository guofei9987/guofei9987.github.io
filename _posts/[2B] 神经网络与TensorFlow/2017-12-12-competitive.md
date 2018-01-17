---
layout: post
title: 【神经网络6】竞争神经网络.
categories:
tags: 2B神经网络与TF
keywords:
description:
order: 256
---
关键词：  
竞争神经网络  
WTA学习法则  


自组织竞争神经网络是一种无监督学习算法

## 神经网络
<img src='http://www.guofei.site/public/postimg/ann_competitive.png'>


输入层记为第I层，输出层记为第J层
### 1. 归一化
$\hat X =\dfrac{X}{\mid \mid X \mid \mid}, \hat W_j=\dfrac{W_j}{\mid\mid W_j\mid\mid}$

### 2. 寻找获胜神经元
寻找获胜神经元，编号为$j^* $  
所谓获胜神经元，指的是 **最相似** 的神经元。  
最相似神经元的编号j满足$$j^* =\arg\min\limits_{j\in \{1,2,...n\}}\mid\mid\hat X-\hat W_j\mid\mid$$  


又因为$\mid\mid \hat X-\hat W_j\mid\mid=\sqrt {(\hat X-\hat W_j)(\hat X-\hat W_j)^T}=\sqrt{2(1-\hat W\hat X^T)}$  
所以，**最相似** 的神经元等价于使得$\hat W\hat X^T$最大的神经元  


所以，只需要寻找$$j^* =\arg\max\limits_{j\in \{1,2,...n\}}\hat X \hat W_j^T$$  

### 3. 网络输出
根据WTA学习规则(Winner Takes All)，获胜神经元输出1，其它神经元输出0  
即：$$y_j(t+1)=\left \{ \begin{array}{ccc}
1&j=j^* \\
0&j\neq j^*
\end{array}\right.$$  
### 4. 权值调整
只有获胜的神经元才调整权值  
即$$W_j(t+1)=\left \{ \begin{array}{ccc}
\hat W_j(t)+\Delta W_j=\hat W_j(t)+\alpha(\hat X-\hat W_j)    &j=j^* \\
W_j(t)&j\neq j^*
\end{array}\right.$$  

其中，$\alpha$是学习率，随着学习的进展，逐渐趋近于0  


这样的学习规则下，权重始终满足这个性质：  
$\mid\mid W_j \mid\mid=1$（简单列式可以证明）  

## 其它trick
整个学习过程中，可能出现这种情况：  
某些神经元从头到尾都没有竞争胜出，叫做 **死神经元** 。如果死神经元过多的话，分类不够精细。  
采用这种策略：每次迭代中，对于那些从未胜出的神经元，设定一个较大的bias，使得这些神经元更加可能胜出，一旦曾经胜出，就把bias设为正常值。  
## 参考文献
《神经网络原理及应用》朱大奇，史慧，科学出版社  
《人工神经网络理论及应用》韩立群，机械工业出版社
《Matlab神经网络原理与实例精解》陈明，清华大学出版社   
《神经网络43个案例》王小川，北京航空航天大学出版社  
《人工神经网络原理》马锐，机械工业出版社  
