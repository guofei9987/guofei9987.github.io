---
layout: post
title: 【动态最优化】最优控制
categories:
tags: 5-6-最优化
keywords:
description:
order: 7403
---

## 问题定义
### 最简单的最优控制问题
$\max V =\int_0^T F(t,y,u)dt$  
s.t.  
$\dot y =f(t,y,u)$  
$y(0)=A,Y(T)$自由，($A,T$给定)  
$u(t)\in \mathscr{U}$  

$u(t)$分段连续  
$y(t)$连续，分段可微，有限个不可微点（实际上，$u$的不连续点和$y$的不可微点所在时间$t$一一对应）  




## 参考文献
【美】蒋中一：《动态最优化基础》，中国人民大学出版社  
莫顿，南茜：《动态优化：经济学和管理学中的变分法和最优控制》，中国人民大学出版社  
