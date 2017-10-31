---
layout: post
title: 【最优化】拉格朗日乘子法.
categories:
tags: 数值计算与最优化
keywords:
description:
---

拉格朗日乘子法（Lagrange Multiplier)是解决有约束条件的优化问题的重要方法  


## 问题
问题的一般形式：  
### 无约束优化问题

$\min f(x)$

### 等式约束优化问题
$\min f(x)$,   
s.t. $h_i(x) = 0; i =1, ..., n $  

可以用拉格朗日乘子法解决  

### 不等式约束优化问题

$\min f(x)$,   
s.t. $g_i(x) <= 0; i =1, ..., n$  
$h_i(x) = 0; i =1, ..., n $  

常用KKT条件

## 一个看似可行的方案

考察这样的问题：  
目标函数$f(x)=f(x_1,x_2,...x_{m+p})$  
约束条件:$$\left \{ \begin{array}{ccc}
g_1(x)=g_1(x_1,x_2,...x_{m+p})\\
...\\
g_p(x)=g_p(x_1,x_2,...x_{m+p})\\
\end{array}\right.$$  


当然要求$$rank \left [ \begin{array}{ccc}
\dfrac{\partial g_1}{\partial x_1}&...&\dfrac{\partial g_1}{\partial x_{m+p}}\\
...&.....&...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_{m+p}}\\
\end{array}\right]=p$$  

移动变量位置，使得$$rank \left [ \begin{array}{ccc}
\dfrac{\partial g_1}{\partial x_1}&...&\dfrac{\partial g_1}{\partial x_p}\\
...&.....&...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_p}\\
\end{array}\right]=p$$  


那么，可以解出$$\left \{ \begin{array}{ccc}
x_{m+1}=\psi_1 (x_1,x_2,...x_m)\\
...\\
x_{m+p}=\psi_p (x_1,x_2,...x_m)\\
\end{array}\right.$$  

带入目标函数，得到  
$\phi((x_1,...,x_m)=f(x_1,...,x_m,\psi_1 (x_1,x_2,...x_m),...,\psi_p (x_1,x_2,...x_m))$  
这就转化为无约束最优化问题。  


**然而，显示的解出约束变量几乎是不可能的**  

## 拉格朗日乘子法

引入辅助函数  
$F(x,\lambda)=f(x)+\sum_{r=1}^p \lambda_r g_r(x)$  
其中，$x=(x_1,...x_{m+p})$  


如果a是极值，那么存在$\lambda$，使得$(a,\lambda)$是$F(x,\lambda)$的临界点  
也就是说$$\left \{ \begin{array}{ccc}
\dfrac{\partial F}{\partial x_k}=0\\
\dfrac{\partial F}{\partial x_k}=g_r=0\\
\end{array}\right.$$  

证明：
