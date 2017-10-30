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
...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_{m+p}}\\
\end{array}\right]=p$$  

移动变量位置，使得$$rank \left [ \begin{array}{ccc}
\dfrac{\partial g_1}{\partial x_1}&...&\dfrac{\partial g_1}{\partial x_p}\\
...\\
\dfrac{\partial g_p}{\partial x_1}&...&\dfrac{\partial g_p}{\partial x_p}\\
\end{array}\right]=p$$  
