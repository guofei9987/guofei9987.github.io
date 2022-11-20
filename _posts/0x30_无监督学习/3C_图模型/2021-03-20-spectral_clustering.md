---
layout: post
title: 【Spectral Clustering】谱聚类
categories:
tags: 0x33_图模型
keywords:
description:
order: 370
---

## 原理

谱聚类的特点
- 对数据分布的适应性强
- 聚类效果优秀
- 复杂度低、计算量小
- 实现简单
- 从图论中演化来的算法

### 基础理论1：无向有权图

把每个样本点看成一个有向无权图上的节点，两个点之间的距离看成这个有向无权图上的点之间的权重。

于是从样本点获得一个 Graph，$G(V, E)$  

同时，从图的视角，我们定义几个概念：

- **节点** $(v_1,v_2,...,v_n)$
- **权重**。 $w_{ij}$ 指的是两个点 v_i,v_j之间的 **距离**。这个距离是你根据任务目标去确定的，例如欧氏距离。性质：
  - $w_{ij}=w_{ji}$
  - $w_{ii}=0$
  - **邻接矩阵**，就是 $w_{ij}$ 组成的矩阵
- **度**。一个节点对应的度，定义为其所有权重之和 $d_i=\sum\limits_{j=1}^{n} w_{ij}$
  - **度矩阵**。节点度组成的对角矩阵 $D=diag(d_1,d_2,...,d_n)$
- **邻接矩阵**：$w_{ij}=\exp(-\dfrac{\mid\mid x_i - x_j \mid \mid_2^2 }{2\sigma^2})$。一般使用上面这个定义，有时候也会按照 TOP-K做个截断，对于一个节点，TOP-K以外的权重都置为0，这样得到的邻接矩阵是稀疏矩阵。


### 基础理论2：拉普拉斯矩阵

拉普拉斯矩阵定义为 $L=D-W$

它有很多良好的性质：
1. L 是一个对称矩阵。这是因为D和W都是对称矩阵。
2. L 对应的特征值都是实数。这是因为L是一个实对称矩阵
3. 对于任意向量 $f$，有 $f^T L f=1/2 \sum\limits_{i,j=1}^n w_{ij}(f_i-f_j)^2$
4. 根据性质3，拉普拉斯矩阵是半正定的。

性质3的证明：  
$f^T L f = f^T D f - f^T W f = \sum\limits_{i=1}^n f_i^2 - \sum\limits_{i,j=1}^n w_{ij} f_i f_j$  
$=1/2(\sum\limits_{i=1}^n d_i f_i^2 -2\sum\limits_{i,j=1}^n w_{ij}f_i f_j +\sum\limits_{j=1}^n d_j f_j^2) =1/2 \sum\limits_{i,j=1}^n w_{i,j=1}^n(f_i - f_j)^2$

### 基础理论3：图切分

我们做图上的聚类，实际上就是要把图 G(V,E) 分割成k个子图。  
这k个子图的点的集合记为$A_1,A_2,...A_k$，它们满足 $A_i\cap A_j = \empty (i \neq j)$,并且 $A_1\cup A_2 \cup ... \cup A_k =V$  

然后我们需要定义一个损失函数，使得“组间距离”最大

我们先定义两个点集之间的“距离”，将其定义为顶点的两两距离之和。写成公司就是：对于$A,B\subset V,A\cap B $，定义$W(A,B)=\sum\limits_{i\in A, j\in B} w_{ij}$  

### 基础理论4：损失函数

共有3种，一一列出：

#### 1. cut

很容易想到，损失函数可以是：  

$cut(A_1,A_2,...,A_k)=1/2 \sum\limits_{i=1}^k(A_i,\bar A_i)$  
其中 $\bar A_i$是 $A_i$ 的补集。  

这么做有个严重的缺点：如果有1个离大家都较远的“游离点”，那么这个游离点会被单独归为一类。

#### 2. RatioCut

为了避免上面的问题，加一个权重。

定义 $\mid A_i \mid $ 为点集A的点的个数

定义 $RatioCut(A_1,A_2,...,A_k)=1/2\sum\limits_{i=1}^k \dfrac{W(A_i,\bar A_i)}{\mid A_i\mid }$

直观理解就是不仅仅让总的组间距离更远，而且还尽量让每个子图的点的个数更多。

为了解 RatioCut 的最大化的条件，做以下推导：


令 $$h_{ij}= \left \{ \begin{array}{ccc}
0 & v_i \not \in A_j\\
\dfrac{1}{\mid A_j \mid} & v_i \in A_j
\end{array}\right.$$

得到，  
$$\begin{align} h_i^TLh_i &
= \frac{1}{2}\sum\limits_{m=1}\sum\limits_{n=1}w_{mn}(h_{im}-h_{in})^2 \\&
=\frac{1}{2}(\sum\limits_{m \in A_i, n \notin A_i}w_{mn}(\frac{1}{\sqrt{|A_i|}} - 0)^2 +  \sum\limits_{m \notin A_i, n \in A_i}w_{mn}(0 - \frac{1}{\sqrt{|A_i|}} )^2\\&
= \frac{1}{2}(\sum\limits_{m \in A_i, n \notin A_i}w_{mn}\frac{1}{|A_i|} +  \sum\limits_{m \notin A_i, n \in A_i}w_{mn}\frac{1}{|A_i|}\\& = \frac{1}{2}(cut(A_i, \overline{A}_i) \frac{1}{|A_i|} + cut(\overline{A}_i, A_i) \frac{1}{|A_i|}) \\&
=  \frac{cut(A_i, \overline{A}_i)}{|A_i|} \end{align}$$

这里面（1）式根据上面的拉普拉斯矩阵性质3得到


然后，$RatioCut(A_1,A_2,...A_k) = \sum\limits_{i=1}^{k}h_i^TLh_i = \sum\limits_{i=1}^{k}(H^TLH)_{ii} = tr(H^TLH)$

注意到 $H^TH=I$，优化问题等价于

$\arg\max tr(H^TLH)$  
$s.t. H^TH=I$

其实这个优化问题也不好解，但是可以用“最大k个特征值”来近似

#### 3. Ncut

类似的，定义为 $NCut(A_1,A_2,...A_k) = \frac{1}{2}\sum\limits_{i=1}^{k}\frac{W(A_i, \overline{A}_i )}{vol(A_i)}$

其中，$vol(A): = \sum\limits_{i \in A}d_i$

可以得到类似的最优化问题

$$\arg\min_H  tr(H^TLH)  s.t. H^TDH=I$$

不过区别是这里的H不是标准正交的了。

## 参考文献

https://www.cnblogs.com/pinard/p/6221564.html
