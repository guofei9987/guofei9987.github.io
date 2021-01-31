---
layout: post
title: 【模糊论】基本概念
categories:
tags: 5-9-应用数学
keywords:
description:
order: 7420
---


## 模糊论
模糊集合
:    假设有全集Z，可以定义一个模糊集合A，由隶属度函数$u_A(z)$表征。$u_A(z)\in [0,1]$表示z是否在A中的隶属度。

对于普通的集合，$u_A(z)$ 要么是0要么是1，但模糊集合是一个由z和隶属度组成的有序对$$A=\{z,u_A(z)\mid z\in Z \}$$



**普通集合是模糊集合的特殊情况** ，那么普通集合中的一些定义，也可以推广到模糊集合上了。

空集
:    当且仅当Z中的隶属度函数等于0，模糊集合为空集

相等
:    $\forall z\in Z, u_A(z)=u_B(z)$ 叫做两个模糊集合 $A=B$

补集
:    $\forall z\in Z, u_A(z)=1-u_B(z)$ 叫做A和B互为补集

子集
:    $\forall z\in Z, u_A(z)\leq u_B(z)$ 叫做A是B的子集

并集
:    $\forall z\in Z, u_U(z)=\max[u_A(z),u_B(z)]$ 叫做U是A和B的并集，记为$U=A\cup B$

交集
:    $\forall z\in Z, u_U(z)=\min[u_A(z),u_B(z)]$ 叫做U是A和B的交集，记为$U=A\cap B$



常用的隶属度函数有三角形、梯形、直角三角形、S型、钟形等。函数就不写了。
