---
layout: post
title: 【线性规划】理论篇.
categories: Geek
tags: 数学理论与工具
keywords:
description:
---

## 定义问题

Canonical form（标准型）：  
$\min z=\sum\limits_{j=1}^n c_j x_j$  
s.t.  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j=b_i,&i=1,2,...m\\
x_j\leq 0&j=1,2,...n
\end{array}\right.$$

把各种形式转化为标准型的方法：
1. 若问题是求目标函数的最大值，$\max z$,那么，  
令$f=-z$转化为最小值  


2. 若不等式约束条件中出现$\sum\limits_{j=1}^na_{ij}x_j \leq b_i$,  
引入 **松弛变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j +x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$



3. 若约束条件中出现$\sum\limits_{j=1}^na_{ij}x_j \geq b_i$,  
引入 **剩余变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j - x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$


4. 如果约束条件中出现$x_j \geq h_j$,  
引入新变量$y_j=x_j-h_j$,用这个约束式子替代：  
$y_j \geq 0$  

5. 如果变量$x_j$的范围没有限制，那么  
引入$y_j',y_j''$,用$x_j=y_j'-y_j''$替代原式，  
约束条件变为:  
$$\left \{ \begin{array}{ccc}
y_j' \geq 0\\
y_j'' \geq 0
\end{array}\right.$$

## 单纯形法
一种对矩阵做变换的方法
## 大M法
单纯形法的改进
## 对偶单纯形法
