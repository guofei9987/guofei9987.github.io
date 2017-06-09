---
layout: post
title: 最优化方法理论篇.
categories: 模型
tags: 数学理论与工具
keywords:
description:
---


## 数学描述
最优化的一般形式：

$$minf(x)$$
$$s.t. \left \{ \begin{array}{ccc}
h_i(x)=0\\
g_j(x) \leq 0
\end{array} \right.$$  


- 若f,h,g都是线性函数，称为线性规划
- 若其中任意一个是非线性函数，称为非线性规划
- 若f是二次函数，h，g是线性函数，称为二次规划
- 若f是向量函数，称为多目标规划
## 凸集分离定理
### 凸集的定义
凸集的定义：  
$X \subset R^n$是一个凸集，当且仅当：
$$\forall x_1,x_2 \in X,\forall \alpha\in[0,1]$$都有$$\alpha x_1+(1-\alpha)x_2 \in X$$

### 超平面的定义

超平面是这样的点集：   
$$X=\{ \mid c^Tx=z\}$$

### 支撑超平面

$$\forall x \in X,c^Tx \leq 0$$,并且$$
