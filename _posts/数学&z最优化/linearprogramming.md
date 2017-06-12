---
layout: post
title: 【线性规划】理论篇.
categories: Geek
tags: 数学理论与工具
keywords:
description:
---

Canonical form（标准型）：  
$\min z=\sum\limits_{j=1}^n c_j x_j$  
s.t.$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j=b_i,&i=1,2,...m\\
x_j\leq 0&j=1,2,...n
\end{array}\right.$

把各种形式转化为标准型的方法：
1. 若问题是求目标函数的最大值，$\max z$,那么，令$f=-z$转化为最小值


2. 若不等式约束为$\sum\limits_{j=1}^na_{ij}x_j \leq b_i$,  
引入 **松弛变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j +x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$



3. 若不等式约束为$\sum\limits_{j=1}^na_{ij}x_j \geq b_i$,  
引入 **剩余变量** $x'_ i$，用两个约束式子替代：  
$$\left \{ \begin{array}{ccc}
\sum\limits_{j=1}^na_{ij}x_j - x_i' = b_i\\
x_i' \geq 0
\end{array}\right.$$


4.
