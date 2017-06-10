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
$$\forall x_1,x_2 \in X,\forall \alpha\in[0,1]$$,都有,  
$$\alpha x_1+(1-\alpha)x_2 \in X$$

### 超平面的定义

超平面是这样的点集：   
$$X=\{ x \mid c^Tx=z\}$$

### 支撑超平面

X是凸集，$c^Tx=0$ 是一个超平面。  
如果X的边界点上某个点在超平面上，X所有点在超平面的某一侧，那么称超平面$c^Tx=0$为凸集X的支撑超平面  

另外，边界点的定义：如果点P的任一邻域内既含有属于E的点，又含有不属于E的点，则称P为E的边界点。  

### 凸集分离定理

如果两个凸集没有交集，那么就可以用超平面将其隔开。  

## 凸函数

$f$是定义在凸集$C$上的函数，  
如果$\forall x_1,x_2 \in C,\alpha \in [0,1]$,都有  
$f(\alpha x_1+(1-\alpha)x_2) \leq f(\alpha x_1)+ f((1-\alpha)x_2)$  
那么$f$是凸函数

### 凸函数的判定
1. 凸函数的线性组合也是凸函数。  
如果$f_1,f_2,...f_k$是凸函数，那么$\phi(x)=\sum\limits_{i=1}^k \lambda_i f_i (x)$也是凸函数
2. 如果凸集$D \subset R^n$内，$f(x)$可微，则$f(x)$是D内的凸函数的充分必要条件是，$\forall x,y\in D$,   
$f(y) \geq f(x)+ \nabla f(x)^T (y-x)$  
3. 如果凸集$D \subset R^n$内，$f(x)$二阶可微，则$f(x)$是D内的凸函数的充分必要条件是，$\forall x\in D$,   
$f(x)$的Hesse矩阵半正定。  
$$G(x)=\nabla^2 f(x) =\left [ \begin{array}{ccc}
\dfrac{\partial^2 f}{\partial x_1^2}&\dfrac{\partial^2 f}{\partial x_1 \partial x_2}&...&\dfrac{\partial^2 f}{\partial x_1 \partial x_n}\\
\dfrac{\partial^2 f}{\partial x_1 x_2}&\dfrac{\partial^2 f}{\partial x_2^2}&...&\dfrac{\partial^2 f}{\partial x_2 \partial x_n}\\
...&...&...&...\\
\dfrac{\partial^2 f}{\partial x_n \partial x_1}&\dfrac{\partial^2 f}{\partial x_n \partial x_2}&...&\dfrac{\partial^2 f}{\partial x_n^2}
\end{array}\right ]$$
