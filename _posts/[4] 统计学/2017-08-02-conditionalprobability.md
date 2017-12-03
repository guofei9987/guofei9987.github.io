---
layout: post
title: 条件概率,条件期望,条件方差
categories:
tags: 4统计学
keywords:
description:
order: 450
---

本文介绍概念：  
条件概率  
条件期望  
条件方差  

## 条件概率

给定一个`样本空间`S，一个`完全事件集合`$$\varepsilon=\{A \mid A \subset S\}$$,一个`概率测度` $Pr:\varepsilon \to [0,1]$，  
给定事件$B\in \varepsilon,Pr(B)>0$,  
那么，对于$A \in \varepsilon$，定义 **条件概率** 为$Pr(A \mid B)=\dfrac{P(A \cap B)}{P(B)}$  

这种定义的好处是，$Pr(\star \mid B)$符合[概率测度的定义](http://www.guofei.site/2017/08/02/randomvariable.html)  

### 条件PDF

p.d.f是$f(x,y)$  
定义：$f(x\mid y)=\dfrac{f(x,y)}{f(y)}$  


定理： $f(y)=\sum\limits_{y} f(x\mid y)f(y)$

### 条件期望

**联合期望** 定义为：  
$E[g(x_1,x_2)]=\sum\limits_{(x_1,x_2)}g(x_1,x_2)f(x_1,x_2)$  

**条件期望** 定义为：  
$E[g(X_1) \mid X_2=x_2]=\sum\limits_{x_1} g(x_1) f(x_1 \mid x_2)$  
记为$E(g(X_1)\mid X_2)$  

注意:  
条件期望可以视为这样一个函数：$s \in S ,s \to E(g(X_1)\mid X_2(s))$  
$E(g(X_1)\mid X_2)$本身是一个随机变量。  

定理：**全期望定理**(law of total expactation)  
$E_{X_2}[E_{X_1\mid X_2}[g(X_1) \mid X_2]]=\sum\limits_{x_1}g(x_1)f(x_1)$  
也就是说，  
$E[X]=E[E[X \mid Y]]$  

### 条件方差
**方差** 定义为：  
$E[(X-EX)^2]$  

定理：$Var(X)=EX^2-(EX)^2$  

**条件方差** 定义为：  
$Var[X \mid Y]=\sum\limits_i (x_i - E[X \mid Y])^2 f(x_i \mid Y)$  
定理：$Var[X]=E[Var[X \mid Y]]+Var[E[X\mid Y]]$  


## 总结
$f(x\mid y)=f(x,y)/f_Y(y)$  
$Var X =EX^2-(EX)^2$  
$E(X\mid Y)=\sum\limits_x f(x \mid y)$  
$Var(X\mid Y)=\sum\limits_x(x-u_{x\mid y})^2f(x\mid y)$  
$EX=E(E(x\mid y))$  
$VarX=E(Var(X\mid Y))+Var(E(X\mid Y))$  
